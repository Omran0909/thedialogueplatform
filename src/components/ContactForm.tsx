"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/site";

type ContactFormProps = {
  locale: Locale;
};

type Copy = {
  title: string;
  description: string;
  name: string;
  email: string;
  organization: string;
  subject: string;
  message: string;
  submit: string;
  sending: string;
  success: string;
  error: string;
  fallback: string;
  requiredHint: string;
  directEmailPrompt: string;
  directEmailAction: string;
};

const copy: Record<Locale, Copy> = {
  en: {
    title: "Send us a direct request",
    description: "Use this form to contact the team. Messages are forwarded to our official email inbox.",
    name: "Name",
    email: "Email",
    organization: "Organization",
    subject: "Subject",
    message: "Message",
    submit: "Send request",
    sending: "Sending...",
    success: "Thank you. Your message has been sent.",
    error: "We could not send your message. Please try again or email us directly.",
    fallback: "Your email app is opening with this message ready to send.",
    requiredHint: "* Required fields",
    directEmailPrompt: "Prefer email or sending an attachment?",
    directEmailAction: "Email us directly",
  },
  no: {
    title: "Send oss en direkte henvendelse",
    description: "Bruk skjemaet for å kontakte teamet. Meldinger sendes til vår offisielle e-postinnboks.",
    name: "Navn",
    email: "E-post",
    organization: "Organisasjon",
    subject: "Emne",
    message: "Melding",
    submit: "Send henvendelse",
    sending: "Sender...",
    success: "Takk. Meldingen din er sendt.",
    error: "Vi kunne ikke sende meldingen. Prøv igjen eller kontakt oss direkte på e-post.",
    fallback: "E-postprogrammet ditt åpnes med meldingen klar til å sendes.",
    requiredHint: "* Obligatoriske felt",
    directEmailPrompt: "Vil du heller sende e-post eller et vedlegg?",
    directEmailAction: "Send e-post direkte",
  },
  ar: {
    title: "أرسل لنا طلباً مباشراً",
    description: "استخدم هذا النموذج للتواصل مع الفريق. يتم إرسال الرسائل إلى بريدنا الرسمي مباشرة.",
    name: "الاسم",
    email: "البريد الإلكتروني",
    organization: "الجهة",
    subject: "الموضوع",
    message: "الرسالة",
    submit: "إرسال الطلب",
    sending: "جارٍ الإرسال...",
    success: "شكراً لك. تم إرسال رسالتك بنجاح.",
    error: "تعذر إرسال الرسالة. حاول مرة أخرى أو تواصل معنا عبر البريد الإلكتروني مباشرة.",
    fallback: "سيتم فتح تطبيق البريد الإلكتروني والرسالة جاهزة للإرسال.",
    requiredHint: "* حقول مطلوبة",
    directEmailPrompt: "هل تفضل البريد الإلكتروني أو إرسال مرفق؟",
    directEmailAction: "راسلنا مباشرة",
  },
};

const initialFields = {
  name: "",
  email: "",
  organization: "",
  subject: "",
  message: "",
};

export function ContactForm({ locale }: ContactFormProps) {
  const text = copy[locale];
  const pathname = usePathname();
  const [fields, setFields] = useState(initialFields);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "fallback" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const isDisabled = useMemo(() => status === "loading", [status]);

  function updateField(name: keyof typeof initialFields, value: string) {
    setFields((previous) => ({ ...previous, [name]: value }));
  }

  function openEmailFallback() {
    const subject = fields.subject || "Website contact request";
    const body = [
      `${text.name}: ${fields.name}`,
      `${text.email}: ${fields.email}`,
      fields.organization ? `${text.organization}: ${fields.organization}` : "",
      "",
      fields.message,
    ]
      .filter(Boolean)
      .join("\n");

    setStatus("fallback");
    setStatusMessage(text.fallback);
    window.location.href = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...fields,
          locale,
          page: pathname,
        }),
      });

      const payload = (await response.json()) as { ok?: boolean; message?: string };
      if (!response.ok || !payload.ok) {
        openEmailFallback();
        return;
      }

      setStatus("success");
      setStatusMessage(payload.message || text.success);
      setFields(initialFields);
    } catch {
      openEmailFallback();
    }
  }

  return (
    <div className="surface-card p-6 sm:p-8">
      <h2 className="text-2xl text-text-primary sm:text-3xl">{text.title}</h2>
      <p className="mt-3 max-w-prose text-sm leading-relaxed text-text-secondary">{text.description}</p>

      <div className="mt-5 flex flex-col gap-4 rounded-lg border border-accent/30 bg-[#fff8ec] p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-lg font-semibold text-white" aria-hidden="true">
            @
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text-secondary">{text.directEmailPrompt}</p>
            <a href={`mailto:${siteConfig.contactEmail}`} className="mt-1 block whitespace-nowrap text-xs font-semibold text-accent hover:underline sm:text-base">
              {siteConfig.contactEmail}
            </a>
          </div>
        </div>
        <a
          href={`mailto:${siteConfig.contactEmail}`}
          className="inline-flex shrink-0 items-center justify-center rounded-full border border-accent px-5 py-2.5 text-sm font-semibold text-accent transition hover:bg-accent hover:text-white"
        >
          {text.directEmailAction}
        </a>
      </div>

      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm text-text-secondary">
            <span>{text.name} *</span>
            <input
              type="text"
              required
              value={fields.name}
              onChange={(event) => updateField("name", event.target.value)}
              className="rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-text-secondary">
            <span>{text.email} *</span>
            <input
              type="email"
              required
              value={fields.email}
              onChange={(event) => updateField("email", event.target.value)}
              className="rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-text-secondary">
            <span>{text.organization}</span>
            <input
              type="text"
              value={fields.organization}
              onChange={(event) => updateField("organization", event.target.value)}
              className="rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-text-secondary">
            <span>{text.subject}</span>
            <input
              type="text"
              value={fields.subject}
              onChange={(event) => updateField("subject", event.target.value)}
              className="rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
          </label>
        </div>

        <label className="flex flex-col gap-2 text-sm text-text-secondary">
          <span>{text.message} *</span>
          <textarea
            required
            rows={6}
            value={fields.message}
            onChange={(event) => updateField("message", event.target.value)}
            className="rounded-xl border border-line bg-white px-4 py-3 text-sm text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </label>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <p className="text-xs text-text-secondary">{text.requiredHint}</p>
          <button
            type="submit"
            disabled={isDisabled}
            className="rounded-full bg-[#f2a33a] px-6 py-2.5 text-sm font-semibold text-[#0f2940] transition hover:bg-[#f8b75b] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isDisabled ? text.sending : text.submit}
          </button>
        </div>

        {status !== "idle" ? (
          <p
            role="status"
            aria-live="polite"
            className={`rounded-lg px-4 py-3 text-sm ${
              status === "success"
                ? "bg-[#d7efe8] text-[#0c5b47]"
                : status === "fallback"
                  ? "bg-[#fff0cf] text-[#704608]"
                  : "bg-[#f8dfdf] text-[#8d3434]"
            }`}
          >
            {statusMessage}
            {status === "error" || status === "fallback" ? (
              <a href={`mailto:${siteConfig.contactEmail}`} className="ms-2 font-semibold underline underline-offset-2">
                {siteConfig.contactEmail}
              </a>
            ) : null}
          </p>
        ) : null}
      </form>
    </div>
  );
}
