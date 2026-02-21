import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site";

type ContactPayload = {
  name: string;
  email: string;
  organization?: string;
  subject?: string;
  message: string;
  locale?: string;
  page?: string;
};

type DeliveryMode = "email" | "sheet" | "sheet_and_email";

type DeliveryResult =
  | { ok: true }
  | { ok: false; reason: string };

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#039;");
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getDeliveryMode(): DeliveryMode {
  const value = clean(process.env.CONTACT_DELIVERY_MODE).toLowerCase();
  if (value === "sheet" || value === "sheet_and_email") {
    return value;
  }
  return "email";
}

function parseMaybeJson(raw: string) {
  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function getString(data: Record<string, unknown> | null, key: string) {
  const value = data?.[key];
  return typeof value === "string" ? value : "";
}

function isTruthyStatus(data: Record<string, unknown> | null, key: string) {
  const value = data?.[key];
  return value === true || value === "true";
}

async function sendViaResend(payload: ContactPayload, recipient: string): Promise<DeliveryResult> {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey || /replace_with|changeme|placeholder/i.test(resendKey)) {
    return { ok: false, reason: "missing_resend_key" };
  }

  const subject = payload.subject || "New contact request";
  const from = process.env.CONTACT_FROM_EMAIL || "The Dialogue Platform <onboarding@resend.dev>";
  const safe = {
    name: escapeHtml(payload.name),
    email: escapeHtml(payload.email),
    organization: escapeHtml(payload.organization || "Not provided"),
    subject: escapeHtml(subject),
    message: escapeHtml(payload.message),
    locale: escapeHtml(payload.locale || "Not provided"),
    page: escapeHtml(payload.page || "Not provided"),
  };

  const html = `
    <h2>New contact request - The Dialogue Platform</h2>
    <p><strong>Name:</strong> ${safe.name}</p>
    <p><strong>Email:</strong> ${safe.email}</p>
    <p><strong>Organization:</strong> ${safe.organization}</p>
    <p><strong>Subject:</strong> ${safe.subject}</p>
    <p><strong>Locale:</strong> ${safe.locale}</p>
    <p><strong>Page:</strong> ${safe.page}</p>
    <p><strong>Message:</strong></p>
    <p>${safe.message.replaceAll("\n", "<br/>")}</p>
  `.trim();

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [recipient],
      reply_to: payload.email,
      subject: `[Website] ${subject}`,
      html,
      text: `Name: ${payload.name}\nEmail: ${payload.email}\nOrganization: ${payload.organization || "Not provided"}\nSubject: ${subject}\nLocale: ${payload.locale || "Not provided"}\nPage: ${payload.page || "Not provided"}\n\n${payload.message}`,
    }),
  });

  if (!response.ok) {
    const reason = await response.text();
    return { ok: false, reason: reason || "resend_failed" };
  }

  return { ok: true };
}

async function sendViaGoogleSheets(payload: ContactPayload, recipient: string): Promise<DeliveryResult> {
  const webhook = clean(process.env.GOOGLE_SHEETS_WEBHOOK_URL);
  if (!webhook) {
    return { ok: false, reason: "missing_google_sheets_webhook_url" };
  }

  const response = await fetch(webhook, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      submittedAt: new Date().toISOString(),
      source: "thedialogueplatform-contact-form",
      recipient,
      ...payload,
    }),
  });

  const raw = await response.text();
  const data = parseMaybeJson(raw);

  if (!response.ok) {
    return {
      ok: false,
      reason: getString(data, "message") || raw || `Google Sheets webhook HTTP ${response.status}`,
    };
  }

  const okValue = data?.ok;
  const successValue = data?.success;
  const explicitlyRejected = okValue === false || successValue === false || successValue === "false";
  if (explicitlyRejected) {
    return { ok: false, reason: getString(data, "message") || "Google Sheets webhook rejected the submission." };
  }

  const hasSignal = typeof okValue !== "undefined" || typeof successValue !== "undefined";
  const accepted = okValue === true || isTruthyStatus(data, "success");
  if (data && hasSignal && !accepted) {
    return { ok: false, reason: getString(data, "message") || "Google Sheets webhook did not confirm delivery." };
  }

  return { ok: true };
}

async function sendViaFormSubmit(payload: ContactPayload, recipient: string, origin: string, referer: string): Promise<DeliveryResult> {
  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: origin,
      Referer: referer,
      "User-Agent": "TheDialoguePlatform/1.0",
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      organization: payload.organization || "Not provided",
      subject: payload.subject || "New contact request",
      message: payload.message,
      locale: payload.locale || "Not provided",
      page: payload.page || "Not provided",
      _captcha: "false",
      _template: "table",
      _subject: `[Website] ${payload.subject || "New contact request"} (${payload.name})`,
    }),
  });

  const raw = await response.text();
  const data = parseMaybeJson(raw);

  if (!response.ok) {
    return { ok: false, reason: getString(data, "message") || raw || `FormSubmit HTTP ${response.status}` };
  }

  const isSuccess = isTruthyStatus(data, "success");
  if (!isSuccess) {
    return { ok: false, reason: getString(data, "message") || "FormSubmit rejected delivery." };
  }

  return { ok: true };
}

export async function POST(request: Request) {
  let input: Record<string, unknown>;

  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request payload." }, { status: 400 });
  }

  const payload: ContactPayload = {
    name: clean(input.name),
    email: clean(input.email),
    organization: clean(input.organization),
    subject: clean(input.subject),
    message: clean(input.message),
    locale: clean(input.locale),
    page: clean(input.page),
  };

  if (!payload.name || !payload.email || !payload.message) {
    return NextResponse.json({ ok: false, message: "Name, email, and message are required." }, { status: 400 });
  }

  if (!isEmail(payload.email)) {
    return NextResponse.json({ ok: false, message: "Please provide a valid email address." }, { status: 400 });
  }

  const recipient = siteConfig.contactEmail;
  const deliveryMode = getDeliveryMode();
  const canonicalOrigin = new URL(siteConfig.url).origin;
  const pagePath = payload.page?.startsWith("/") ? payload.page : "/contact";
  const canonicalReferer = `${canonicalOrigin}${pagePath}`;

  try {
    if (deliveryMode !== "email") {
      const sheets = await sendViaGoogleSheets(payload, recipient);
      if (sheets.ok && deliveryMode === "sheet") {
        return NextResponse.json({ ok: true, message: "Message sent successfully." });
      }

      if (!sheets.ok && deliveryMode === "sheet") {
        console.error("Contact form Google Sheets delivery failed", { sheets });
        return NextResponse.json(
          { ok: false, message: `Submission logging failed. Please email us directly at ${recipient}.` },
          { status: 502 },
        );
      }

      if (!sheets.ok) {
        console.error("Google Sheets logging failed, falling back to email delivery", { sheets });
      }
    }

    const resend = await sendViaResend(payload, recipient);
    if (resend.ok) {
      return NextResponse.json({ ok: true, message: "Message sent successfully." });
    }

    const fallback = await sendViaFormSubmit(payload, recipient, canonicalOrigin, canonicalReferer);
    if (fallback.ok) {
      return NextResponse.json({
        ok: true,
        message: "Message sent successfully.",
      });
    }

    console.error("Contact form delivery failed", { resend, fallback });
    const requiresActivation = typeof fallback.reason === "string" && /activation|activate form/i.test(fallback.reason);
    const deliveryMessage = requiresActivation
      ? `Email relay is awaiting one-time activation in ${recipient}. Open the FormSubmit activation email, or add RESEND_API_KEY in Vercel for direct delivery.`
      : `Delivery failed. You can still email us directly at ${recipient}.`;

    return NextResponse.json(
      { ok: false, message: deliveryMessage },
      { status: 502 },
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { ok: false, message: `Delivery failed. You can still email us directly at ${recipient}.` },
      { status: 500 },
    );
  }
}
