import { notFound } from "next/navigation";
import { HoverCard, Reveal } from "@/components/AnimatedBlock";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getContent } from "@/lib/i18n/get-content";
import { layoutText } from "@/lib/i18n/layout-text";
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
    <div className="mx-auto max-w-content px-6 pb-24 section-padding pt-12 sm:pt-16">
      <Reveal>
        <span className="eyebrow">{layout.nav.contact}</span>
        <h1 className="mt-6 max-w-3xl text-4xl leading-tight text-text-primary sm:text-5xl">{localized.contact.title}</h1>
        <p className="mt-5 max-w-prose text-base leading-relaxed text-text-secondary">{localized.contact.intro}</p>
      </Reveal>

      <section className="section-padding border-t border-line/80 mt-12 grid gap-5 lg:grid-cols-2">
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

      <section className="section-padding border-t border-line/80">
        <Reveal>
          <ContactForm locale={locale} />
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
