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

async function sendViaResend(payload: ContactPayload, recipient: string) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return { ok: false, reason: "missing_resend_key" as const };
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
    return { ok: false, reason };
  }

  return { ok: true };
}

async function sendViaFormSubmit(payload: ContactPayload, recipient: string) {
  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
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

  if (!response.ok) {
    const reason = await response.text();
    return { ok: false, reason };
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

  try {
    const resend = await sendViaResend(payload, recipient);
    if (resend.ok) {
      return NextResponse.json({ ok: true, message: "Message sent successfully." });
    }

    const fallback = await sendViaFormSubmit(payload, recipient);
    if (fallback.ok) {
      return NextResponse.json({
        ok: true,
        message: "Message sent successfully.",
      });
    }

    console.error("Contact form delivery failed", { resend, fallback });
    return NextResponse.json(
      { ok: false, message: `Delivery failed. You can still email us directly at ${recipient}.` },
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

