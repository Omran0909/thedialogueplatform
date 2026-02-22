import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { withLocale, type Locale } from "@/lib/i18n/config";
import { layoutText } from "@/lib/i18n/layout-text";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { formatPartners } from "@/lib/i18n/helpers";

const navLinks = [
  { path: "/about", key: "about" },
  { path: "/dialogues", key: "dialogues" },
  { path: "/events", key: "events" },
  { path: "/insights", key: "insights" },
  { path: "/contact", key: "contact" },
] as const;

type LayoutProps = {
  children: React.ReactNode;
  locale: Locale;
};

export function Layout({ children, locale }: LayoutProps) {
  const text = layoutText[locale];
  const partners = formatPartners(locale);

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
                width={40}
                height={40}
                className="rounded-md object-contain"
                priority
              />
              <div className="leading-tight">
                <span className="block text-sm font-semibold">{siteConfig.name}</span>
                <span className="hidden text-xs text-text-secondary sm:block">{text.siteTagline}</span>
              </div>
            </Link>

            <div className="hidden items-end gap-3 md:flex md:flex-col">
              <div className="flex items-center gap-6">
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
              <LanguageSwitcher locale={locale} text={text.language} />
            </div>

            <details className="group relative md:hidden">
              <summary className="cursor-pointer list-none rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-[#0b3a5d]">
                {text.menu}
              </summary>
              <div className="absolute right-0 mt-3 w-72 rounded-xl border border-line bg-surface p-3 shadow-lg">
                <div className="flex flex-col gap-2">
                  {navLinks.map(({ path, key }) => (
                    <Link
                      key={path}
                      href={withLocale(locale, path)}
                      className="rounded-md px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-accent-soft hover:text-text-primary"
                    >
                      {text.nav[key]}
                    </Link>
                  ))}
                  <a
                    href={siteConfig.socialChannels[0].href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md px-3 py-2 text-sm font-semibold text-[#0b3a5d] transition-colors hover:bg-[#fff4df]"
                  >
                    {text.officialChannels}
                  </a>
                  <div className="mt-2 border-t border-line/80 pt-3">
                    <LanguageSwitcher locale={locale} text={text.language} />
                  </div>
                </div>
              </div>
            </details>
          </div>
        </div>
      </header>

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
              <div className="mt-3 flex flex-col gap-2">
                {siteConfig.socialChannels.map((channel) => (
                  <a
                    key={channel.href}
                    href={channel.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-fit text-sm text-accent transition-colors hover:text-text-primary"
                  >
                    {channel.label}
                  </a>
                ))}
                {siteConfig.membershipFormUrl ? (
                  <a
                    href={siteConfig.membershipFormUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-fit text-sm font-semibold text-[#d4871f] transition-colors hover:text-[#0b3a5d]"
                  >
                    {locale === "ar" ? "استمارة العضوية" : locale === "no" ? "Medlemsskjema" : "Membership form"}
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
