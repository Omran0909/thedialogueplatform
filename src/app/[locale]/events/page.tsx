import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HoverCard, Reveal } from "@/components/AnimatedBlock";
import { isLocale, withLocale, type Locale } from "@/lib/i18n/config";
import { getContent } from "@/lib/i18n/get-content";
import { siteConfig } from "@/lib/site";

type PageProps = {
  params: {
    locale: string;
  };
};

const eventsExtras: Record<
  Locale,
  {
    opennessLabel: string;
    opennessMessage: string;
    timelineTitle: string;
    timelineIntro: string;
    timeline: Array<{ date: string; title: string; description: string }>;
    communityTitle: string;
    communityDescription: string;
    communityCta: string;
  }
> = {
  en: {
    opennessLabel: "Open participation",
    opennessMessage:
      "Our dialogue spaces are open to all points of view. We facilitate respectful exchange so disagreement becomes constructive learning instead of division.",
    timelineTitle: "Events timeline (2025-2026)",
    timelineIntro:
      "The Dialogue Platform held its first meeting on 8 February 2025. Since then, the platform has continued with recurring sessions and partner-supported events.",
    timeline: [
      {
        date: "8 February 2025",
        title: "First Dialogue Platform meeting",
        description: "Foundational launch meeting focused on trust, peacebuilding, and inclusive public dialogue.",
      },
      {
        date: "2025",
        title: "Community dialogue sessions",
        description: "Follow-up sessions throughout the year with institutions, residents, and civil society voices.",
      },
      {
        date: "2026",
        title: "Ongoing public events",
        description: "Current events and dialogue activities continue across 2026, with updates posted on official channels.",
      },
    ],
    communityTitle: "From our Facebook community",
    communityDescription:
      "This media comes from our official Facebook presence and reflects the people and conversations behind the platform.",
    communityCta: "Visit Facebook channel",
  },
  no: {
    opennessLabel: "Åpen deltakelse",
    opennessMessage:
      "Våre dialogarenaer er åpne for alle synspunkter. Vi legger til rette for respektfull meningsutveksling slik at uenighet blir til læring, ikke polarisering.",
    timelineTitle: "Tidslinje for arrangementer (2025-2026)",
    timelineIntro:
      "The Dialogue Platform holdt sitt første møte 8. februar 2025. Siden den gang har plattformen videreført jevnlige samlinger og partnerstøttede arrangementer.",
    timeline: [
      {
        date: "8. februar 2025",
        title: "Første møte i The Dialogue Platform",
        description: "Oppstartsmøte med fokus på tillit, fredsbygging og inkluderende samfunnsdialog.",
      },
      {
        date: "2025",
        title: "Løpende dialogsamlinger",
        description: "Oppfølgingsmøter gjennom året med institusjoner, innbyggere og sivilsamfunn.",
      },
      {
        date: "2026",
        title: "Pågående offentlige arrangementer",
        description: "Arrangementer og dialogaktiviteter fortsetter i 2026 med oppdateringer i offisielle kanaler.",
      },
    ],
    communityTitle: "Fra vårt Facebook-fellesskap",
    communityDescription:
      "Dette mediet kommer fra vår offisielle Facebook-tilstedeværelse og viser menneskene og samtalene bak plattformen.",
    communityCta: "Besøk Facebook-kanalen",
  },
  ar: {
    opennessLabel: "مشاركة مفتوحة",
    opennessMessage:
      "مساحات الحوار لدينا مفتوحة لجميع وجهات النظر. نُيسّر تبادلاً محترماً للآراء بحيث يتحول الاختلاف إلى تعلم بنّاء لا إلى انقسام.",
    timelineTitle: "الجدول الزمني للفعاليات (2025-2026)",
    timelineIntro:
      "عقدت منصة الحوار أول اجتماع لها في 8 فبراير 2025. ومنذ ذلك الحين تستمر المنصة في جلسات دورية وفعاليات مدعومة من الشركاء.",
    timeline: [
      {
        date: "8 فبراير 2025",
        title: "الاجتماع الأول لمنصة الحوار",
        description: "اجتماع تأسيسي ركز على بناء الثقة والسلام وتعزيز الحوار العام الشامل.",
      },
      {
        date: "2025",
        title: "جلسات حوار مجتمعية",
        description: "جلسات متابعة على مدار العام بمشاركة المؤسسات والسكان ومنظمات المجتمع المدني.",
      },
      {
        date: "2026",
        title: "فعاليات عامة مستمرة",
        description: "تتواصل الفعاليات والأنشطة الحوارية خلال 2026 مع تحديثات عبر القنوات الرسمية.",
      },
    ],
    communityTitle: "من مجتمعنا على فيسبوك",
    communityDescription:
      "هذه المادة من حضورنا الرسمي على فيسبوك، وتعكس الأشخاص والحوارات التي تقف خلف المنصة.",
    communityCta: "زيارة قناة فيسبوك",
  },
};

export default function EventsPage({ params }: PageProps) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const localized = getContent(locale);
  const extra = eventsExtras[locale];

  return (
    <div className="mx-auto max-w-content px-6 pb-24">
      <section className="section-padding pt-12 sm:pt-16">
        <div className="hero-media min-h-[320px] bg-[#163842]">
          <Image
            src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=2000&q=80"
            alt="Public event with collaborative discussion"
            fill
            className="object-cover"
          />
          <div className="relative flex min-h-[320px] flex-col justify-end p-8 sm:p-10">
            <Reveal>
              <span className="eyebrow border-white/20 bg-white/15 text-white">{localized.events.title}</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-5 max-w-3xl text-4xl leading-tight text-white sm:text-5xl">{localized.events.heroTitle}</h1>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-line/80">
        <Reveal>
          <div className="rounded-2xl border border-accent/20 bg-accent-soft/55 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">{extra.opennessLabel}</p>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">{extra.opennessMessage}</p>
          </div>
        </Reveal>
      </section>

      <section className="section-padding border-t border-line/80">
        <Reveal>
          <h2 className="text-3xl text-text-primary sm:text-4xl">{extra.timelineTitle}</h2>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-text-secondary">{extra.timelineIntro}</p>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {extra.timeline.map((item, index) => (
            <HoverCard key={`${item.date}-${item.title}`} delay={index * 0.08}>
              <article className="surface-card h-full p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{item.date}</p>
                <h3 className="mt-3 text-xl text-text-primary">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{item.description}</p>
              </article>
            </HoverCard>
          ))}
        </div>
      </section>

      <section className="section-padding border-t border-line/80">
        <Reveal>
          <h2 className="text-3xl text-text-primary sm:text-4xl">{extra.communityTitle}</h2>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-text-secondary">{extra.communityDescription}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="surface-card mt-8 overflow-hidden">
            <div className="grid gap-0 lg:grid-cols-[1.2fr_1fr]">
              <div className="relative min-h-[280px]">
                <Image src={siteConfig.facebookCommunityImage} alt="The Dialogue Platform Facebook community" fill className="object-cover" />
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-text-secondary">Facebook</p>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                  {siteConfig.name} - Lillestrom. Updates about meetings, community dialogue activities, and public engagement milestones.
                </p>
                <a
                  href={siteConfig.socialChannels[1].href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0d3f4c]"
                >
                  {extra.communityCta}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section-padding border-t border-line/80">
        <div className="grid gap-4 md:grid-cols-3">
          {localized.events.eventTypes.map((eventType, index) => (
            <HoverCard key={eventType.title} delay={index * 0.08}>
              <article className="surface-card h-full p-6">
                <h2 className="text-xl text-text-primary">{eventType.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{eventType.description}</p>
              </article>
            </HoverCard>
          ))}
        </div>
      </section>

      <section className="section-padding border-t border-line/80">
        <Reveal>
          <div className="surface-card p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-text-secondary">{localized.events.calendarLabel}</p>
            <p className="mt-4 max-w-prose text-base leading-relaxed text-text-secondary">{localized.events.calendarDescription}</p>
            <Link
              href={withLocale(locale, "/contact")}
              className="mt-6 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0d3f4c]"
            >
              {localized.events.cta}
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
