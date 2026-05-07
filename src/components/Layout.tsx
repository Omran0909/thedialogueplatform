"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";
import { withLocale, type Locale } from "@/lib/i18n/config";
import { layoutText } from "@/lib/i18n/layout-text";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { formatPartners } from "@/lib/i18n/helpers";

const navLinks = [
  { path: "/about", key: "about" },
  { path: "/dialogues", key: "dialogues" },
  { path: "/events", key: "events" },
  { path: "/news", key: "news" },
  { path: "/funding", key: "funding" },
  { path: "/scholarships", key: "scholarships" },
  { path: "/insights", key: "insights" },
  { path: "/contact", key: "contact" },
] as const;

const SITE_NOTICE_DISMISSED_KEY = "tdp-site-notice-funding-scholarships-v2";

const siteNotice = {
  en: {
    badge: "Site notice",
    message:
      "We have broadened the funding and scholarships sections so visitors can find legitimate, direct-source opportunities from governments, donor agencies, foundations, universities, UN bodies, and other trusted institutions.",
    note: "This is an experimental version. We welcome your feedback to help us improve it.",
    fundingCta: "Funding",
    scholarshipsCta: "Scholarships",
    feedbackCta: "Send feedback",
    closeLabel: "Close notice",
  },
  no: {
    badge: "Nettsidevarsel",
    message:
      "Vi har utvidet finansierings- og stipendseksjonene slik at besøkende kan finne legitime muligheter direkte fra kilden fra myndigheter, bistandsetater, stiftelser, universiteter, FN og andre betrodde institusjoner.",
    note: "Dette er en prøveversjon. Vi tar gjerne imot tilbakemeldinger for å forbedre den videre.",
    fundingCta: "Finansiering",
    scholarshipsCta: "Stipender",
    feedbackCta: "Send tilbakemelding",
    closeLabel: "Lukk varsel",
  },
  ar: {
    badge: "تنبيه داخل الموقع",
    message:
      "قمنا بتوسيع قسمي التمويل والمنح الدراسية بحيث يتمكن الزوار من الوصول إلى فرص شرعية وموثقة من المصدر مباشرة صادرة عن الحكومات ووكالات التمويل والمؤسسات المانحة والجامعات والجهات الأممية وغيرها من الجهات الموثوقة.",
    note: "ملاحظة: هذه نسخة تجريبية، ونرحّب بملاحظاتكم واقتراحاتكم للمساعدة في تحسينها وتطويرها.",
    fundingCta: "قسم التمويل",
    scholarshipsCta: "قسم المنح الدراسية",
    feedbackCta: "أرسل ملاحظاتك",
    closeLabel: "إغلاق التنبيه",
  },
} as const;

type LayoutProps = {
  children: React.ReactNode;
  locale: Locale;
};

export function Layout({ children, locale }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNoticeVisible, setIsNoticeVisible] = useState(true);
  const pathname = usePathname();
  const text = layoutText[locale];
  const notice = siteNotice[locale];
  const partners = formatPartners(locale);
  const channelActionText = locale === "ar" ? "افتح القناة" : locale === "no" ? "Åpne kanal" : "Open channel";
  const membershipLabel = locale === "ar" ? "استمارة العضوية" : locale === "no" ? "Medlemsskjema" : "Membership form";
  const membershipDescription =
    locale === "ar"
      ? "انضم إلى شبكة المنصة وتابع الفعاليات والفرص الجديدة."
      : locale === "no"
        ? "Bli med i plattformens nettverk og få oppdateringer om aktiviteter."
        : "Join the platform network and receive updates about activities.";

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(SITE_NOTICE_DISMISSED_KEY) === "true") {
        setIsNoticeVisible(false);
      }
    } catch {
      // Ignore storage access errors.
    }
  }, []);

  const dismissNotice = () => {
    setIsNoticeVisible(false);
    try {
      window.localStorage.setItem(SITE_NOTICE_DISMISSED_KEY, "true");
    } catch {
      // Ignore storage access errors.
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 border-b border-line/80 bg-background/90 backdrop-blur-md">
        <div className="h-[3px] bg-[linear-gradient(90deg,#0b3a5d_0%,#1f5f7d_55%,#f2a33a_100%)]" />
        <div className="mx-auto max-w-content px-6 py-4">
          <div className="flex items-start justify-between gap-4">
            <Link
              href={withLocale(locale, "/")}
              className="flex items-center gap-3 rounded-md text-text-primary"
              aria-label={`${siteConfig.name} home`}
            >
              <Image
                src="/assets/logo.png"
                alt={siteConfig.name}
                width={44}
                height={44}
                className="rounded-md object-contain"
                priority
              />
              <div className="leading-tight">
                <span className="block text-sm font-semibold">{siteConfig.name}</span>
                <span className="hidden text-xs text-text-secondary sm:block">{text.siteTagline}</span>
              </div>
            </Link>

            <div className="hidden items-end gap-3 md:flex md:flex-col">
              <div className="flex flex-wrap items-center justify-end gap-5">
                {navLinks.map(({ path, key }) => (
                  <Link
                    key={path}
                    href={withLocale(locale, path)}
                    className="rounded-sm text-sm font-medium text-text-secondary transition-colors hover:text-[#0b3a5d]"
                  >
                    {text.nav[key]}
                  </Link>
                ))}
                <a
                  href={siteConfig.socialChannels[0].href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[#0b3a5d] bg-[linear-gradient(115deg,#eef6ff_0%,#fff4df_100%)] px-4 py-2 text-sm font-semibold text-[#0b3a5d] transition-colors hover:bg-[#0b3a5d] hover:text-white"
                >
                  {text.officialChannels}
                </a>
              </div>
              <LanguageSwitcher locale={locale} />
            </div>

            <div className="relative md:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="cursor-pointer list-none rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-[#0b3a5d]"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-nav"
              >
                {text.menu}
              </button>
              <div
                id="mobile-nav"
                className={`absolute right-0 mt-3 w-72 rounded-xl border border-line bg-surface p-3 shadow-lg transition ${
                  isMobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                <div className="flex flex-col gap-2">
                  {navLinks.map(({ path, key }) => (
                    <Link
                      key={path}
                      href={withLocale(locale, path)}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="rounded-md px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-accent-soft hover:text-text-primary"
                    >
                      {text.nav[key]}
                    </Link>
                  ))}
                  <a
                    href={siteConfig.socialChannels[0].href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-md px-3 py-2 text-sm font-semibold text-[#0b3a5d] transition-colors hover:bg-[#fff4df]"
                  >
                    {text.officialChannels}
                  </a>
                  <div className="mt-2 border-t border-line/80 pt-3">
                    <LanguageSwitcher locale={locale} onLocaleChanged={() => setIsMobileMenuOpen(false)} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {isNoticeVisible ? (
        <section className="border-b border-line/70 bg-[linear-gradient(180deg,#fbf7ef_0%,#f7f0e3_100%)]">
          <div className="mx-auto max-w-content px-6 py-4">
            <div className="rounded-2xl border border-[#e2d1b2] bg-[linear-gradient(145deg,rgba(255,255,255,0.92)_0%,rgba(255,244,223,0.88)_100%)] p-4 shadow-[0_16px_34px_-30px_rgba(8,47,76,0.72)] sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="max-w-4xl flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">{notice.badge}</p>
                  <p className="mt-2 text-sm leading-relaxed text-text-primary sm:text-[15px]">{notice.message}</p>
                  <p className="mt-2 text-xs leading-relaxed text-text-secondary sm:text-sm">{notice.note}</p>
                </div>

                <button
                  type="button"
                  onClick={dismissNotice}
                  aria-label={notice.closeLabel}
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#0b3a5d]/15 bg-white/75 text-lg font-semibold leading-none text-[#0b3a5d] transition hover:border-[#0b3a5d]/35 hover:bg-white"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href={withLocale(locale, "/funding")}
                  className="rounded-full border border-[#0b3a5d]/20 bg-white/80 px-4 py-2 text-sm font-semibold text-[#0b3a5d] transition hover:border-[#0b3a5d]/35 hover:bg-white"
                >
                  {notice.fundingCta}
                </Link>
                <Link
                  href={withLocale(locale, "/scholarships")}
                  className="rounded-full border border-[#0b3a5d]/20 bg-white/80 px-4 py-2 text-sm font-semibold text-[#0b3a5d] transition hover:border-[#0b3a5d]/35 hover:bg-white"
                >
                  {notice.scholarshipsCta}
                </Link>
                <Link
                  href={withLocale(locale, "/contact")}
                  className="rounded-full bg-[#0b3a5d] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0d456e]"
                >
                  {notice.feedbackCta}
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <main className="flex-1">{children}</main>

      <footer className="mt-20 border-t border-line/80 bg-[linear-gradient(180deg,#f8f5ee_0%,#f3efe6_100%)]">
        <div className="mx-auto max-w-content px-6 py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm font-semibold text-text-primary">{siteConfig.name}</p>
              <p className="mt-2 text-sm text-text-secondary">{text.footer.mission}</p>
              <p className="mt-3 text-xs text-text-secondary">
                {text.footer.collaborationPrefix} {partners}.
              </p>
              <a
                href={siteConfig.technologyPartner.href}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-3 rounded-2xl border border-[#0b3a5d]/10 bg-white/75 p-2 pr-4 transition hover:border-[#0b3a5d]/30 hover:bg-white"
              >
                <span className="relative flex h-12 w-20 shrink-0 overflow-hidden rounded-xl border border-[#0b3a5d]/10 bg-[linear-gradient(145deg,#eef7fd_0%,#fff4df_100%)]">
                  <Image
                    src={siteConfig.technologyPartner.logo}
                    alt=""
                    fill
                    className="object-cover brightness-125 contrast-125 saturate-125"
                    sizes="80px"
                  />
                </span>
                <span>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-text-secondary">
                    {text.footer.technicalPartnerPrefix}
                  </span>
                  <span className="block text-sm font-semibold text-[#0b3657]">{siteConfig.technologyPartner.name}</span>
                </span>
              </a>
            </div>

            <div>
              <p className="text-sm font-semibold text-text-primary">{text.footer.navigate}</p>
              <div className="mt-3 flex flex-col gap-2">
                {navLinks.map(({ path, key }) => (
                  <Link
                    key={path}
                    href={withLocale(locale, path)}
                    className="w-fit text-sm text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {text.nav[key]}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-text-primary">{text.footer.channels}</p>
              <div className="mt-3 grid gap-3">
                {siteConfig.socialChannels.map((channel) => (
                  <a
                    key={channel.href}
                    href={channel.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group rounded-xl border border-line/80 bg-[linear-gradient(145deg,#f8fcff_0%,#fff3df_100%)] px-4 py-3 transition hover:border-[#0b3a5d]/35 hover:shadow-[0_14px_26px_-22px_rgba(8,47,76,0.9)]"
                  >
                    <p className="text-sm font-semibold text-[#0b3a5d]">{channel.label}</p>
                    <p className="mt-1 text-xs text-text-secondary">{channelActionText}</p>
                  </a>
                ))}
                {siteConfig.membershipFormUrl ? (
                  <a
                    href={siteConfig.membershipFormUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-[#f2a33a]/40 bg-[#fff4df] px-4 py-3 transition hover:border-[#0b3a5d]/30 hover:shadow-[0_14px_26px_-22px_rgba(8,47,76,0.9)]"
                  >
                    <p className="text-sm font-semibold text-[#d4871f]">{membershipLabel}</p>
                    <p className="mt-1 text-xs text-text-secondary">{membershipDescription}</p>
                  </a>
                ) : null}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-text-primary">{text.footer.contact}</p>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="mt-3 block w-fit text-sm text-accent underline-offset-4 hover:underline"
              >
                {siteConfig.contactEmail}
              </a>
            </div>
          </div>

          <p className="mt-10 border-t border-line/80 pt-6 text-xs text-text-secondary">
            {siteConfig.name} 2025
          </p>
        </div>
      </footer>
    </div>
  );
}
