import Image from "next/image";
import { notFound } from "next/navigation";
import { HoverCard, Reveal } from "@/components/AnimatedBlock";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getContent } from "@/lib/i18n/get-content";
import { layoutText } from "@/lib/i18n/layout-text";
import { mediaLibrary } from "@/lib/media";
import { siteConfig } from "@/lib/site";
import { ContactForm } from "@/components/ContactForm";

type PageProps = {
  params: {
    locale: string;
  };
};

export default function ContactPage({ params }: PageProps) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const localized = getContent(locale);
  const layout = layoutText[locale];

  return (
    <div className="mx-auto max-w-content px-6 pb-24">
      <section className="section-padding pt-12 sm:pt-16">
        <div className="hero-media min-h-[320px] bg-[linear-gradient(145deg,#0b3657_0%,#1e5873_70%,#f2a33a_122%)]">
          <Image
            src={mediaLibrary.heroes.contact}
            alt="Dialogue Platform team and participants in conversation"
            fill
            className="hero-image-motion object-cover"
            style={{ objectPosition: mediaLibrary.heroFocus.contact }}
          />
          <div className="relative flex min-h-[320px] flex-col justify-end p-8 sm:p-10">
            <Reveal>
              <span className="eyebrow border-white/20 bg-white/15 text-white">{layout.nav.contact}</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-5 max-w-3xl text-4xl leading-tight text-white sm:text-5xl">{localized.contact.title}</h1>
            </Reveal>
            {localized.contact.intro ? (
              <Reveal delay={0.18}>
                <p className="mt-4 max-w-prose text-base leading-relaxed text-white/90">{localized.contact.intro}</p>
              </Reveal>
            ) : null}
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-line/80 grid gap-5 lg:grid-cols-2">
        <HoverCard>
          <div className="surface-card h-full p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-text-secondary">{localized.contact.directLabel}</p>
            <a href={`mailto:${siteConfig.contactEmail}`} className="mt-4 block text-xl font-semibold text-accent hover:underline">
              {siteConfig.contactEmail}
            </a>
            {siteConfig.contactPhone ? <p className="mt-2 text-sm text-text-secondary">{siteConfig.contactPhone}</p> : null}
            <p className="mt-5 text-sm leading-relaxed text-text-secondary">{localized.contact.collaborationLine}</p>
          </div>
        </HoverCard>

        <HoverCard delay={0.08}>
          <div className="surface-card h-full p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-text-secondary">{localized.contact.firstMessageLabel}</p>
            <ul className="mt-4 space-y-4">
              {localized.contact.firstMessageTopics.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-text-secondary">
                  <span className="mt-2 h-2 w-2 rounded-full bg-accent" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </HoverCard>
      </section>

      <section id="membership" className="section-padding border-t border-line/80">
        <Reveal>
          <ContactForm locale={locale} />
        </Reveal>
      </section>

      <section className="section-padding border-t border-line/80">
        <Reveal>
          <div className="surface-card overflow-hidden">
            <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_1.2fr]">
              <div className="bg-[linear-gradient(165deg,#0b3657_0%,#0f4c71_58%,#f2a33a_140%)] p-8 sm:p-10">
                <p className="eyebrow border-white/20 bg-white/12 text-white">{locale === "ar" ? "العضوية" : locale === "no" ? "Medlemskap" : "Membership"}</p>
                <h2 className="mt-5 text-3xl leading-tight text-white sm:text-4xl">
                  {locale === "ar"
                    ? "كن جزءاً من منصة الحوار"
                    : locale === "no"
                      ? "Bli medlem i The Dialogue Platform"
                      : "Become a member of The Dialogue Platform"}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/90">
                  {locale === "ar"
                    ? "يمكنك التسجيل عبر نموذج العضوية مباشرة من الموقع. إذا لم يظهر النموذج، استخدم رابط التسجيل المباشر."
                    : locale === "no"
                      ? "Registrer deg via medlemsskjemaet direkte på nettsiden. Dersom skjemaet ikke vises, bruk direkte lenke."
                      : "Register through the membership form directly on the website. If the form does not load, use the direct registration link."}
                </p>
                {siteConfig.membershipFormUrl ? (
                  <a
                    href={siteConfig.membershipFormUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex rounded-full bg-[#f2a33a] px-5 py-2.5 text-sm font-semibold text-[#0f2940] transition-colors hover:bg-[#f8b75b]"
                  >
                    {locale === "ar" ? "فتح رابط التسجيل" : locale === "no" ? "Åpne registreringslenke" : "Open registration link"}
                  </a>
                ) : (
                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-[#ffdca8]">
                    {locale === "ar"
                      ? "أضف رابط نموذج العضوية في متغير NEXT_PUBLIC_MEMBERSHIP_FORM_URL"
                      : locale === "no"
                        ? "Legg til medlemslenken i NEXT_PUBLIC_MEMBERSHIP_FORM_URL"
                        : "Add your membership form URL in NEXT_PUBLIC_MEMBERSHIP_FORM_URL"}
                  </p>
                )}
              </div>

              <div className="bg-[#f7f4ed] p-4 sm:p-6">
                {siteConfig.membershipEmbedUrl ? (
                  <iframe
                    src={siteConfig.membershipEmbedUrl}
                    title="Dialogue Platform membership form"
                    className="h-[620px] w-full rounded-xl border border-line/80 bg-white"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-[620px] items-center justify-center rounded-xl border border-dashed border-line/80 bg-white px-6 text-center text-sm text-text-secondary">
                    {locale === "ar"
                      ? "سيظهر نموذج العضوية هنا تلقائياً بعد إضافة رابط Google Form."
                      : locale === "no"
                        ? "Medlemsskjemaet vises her automatisk etter at Google Form-lenken er lagt inn."
                        : "The membership form will appear here automatically after adding the Google Form link."}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section-padding border-t border-line/80">
        <Reveal>
          <h2 className="text-3xl text-text-primary sm:text-4xl">{localized.contact.channelsTitle}</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {siteConfig.socialChannels.map((channel) => (
              <a
                key={channel.href}
                href={channel.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-accent px-5 py-2 text-sm font-semibold text-accent transition hover:bg-accent hover:text-white"
              >
                {channel.label}
              </a>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  );
}
