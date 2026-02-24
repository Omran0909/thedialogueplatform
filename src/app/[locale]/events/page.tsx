import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HoverCard, Reveal } from "@/components/AnimatedBlock";
import { isLocale, withLocale, type Locale } from "@/lib/i18n/config";
import { getContent } from "@/lib/i18n/get-content";
import { siteConfig } from "@/lib/site";
import { mediaLibrary, type EventHighlightId } from "@/lib/media";
import { buildEventIcsDataUri, buildGoogleCalendarUrl, calendarEvents, getLocalizedCalendarEvent } from "@/lib/events-calendar";

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
    previousEventsTitle: string;
    previousEventsDescription: string;
    openEventCta: string;
    youtubeLabel: string;
    facebookLabel: string;
    mediaReelTitle: string;
    mediaReelDescription: string;
    highlights: Record<EventHighlightId, { date: string; title: string; description: string }>;
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
    previousEventsTitle: "Previous events and media highlights",
    previousEventsDescription:
      "A selection of our recent seminars and public meetings, with links to official YouTube and Facebook coverage.",
    openEventCta: "Open event update",
    youtubeLabel: "YouTube",
    facebookLabel: "Facebook",
    mediaReelTitle: "From our own media archive",
    mediaReelDescription:
      "This reel shows the selected best photos from the 24 January 2026 seminar with Khalid Silik and Bakry Aljackm.",
    highlights: {
      "first-meeting-2025": {
        date: "8 February 2025",
        title: "First meeting of The Dialogue Platform",
        description: "Our first public meeting in Lillestrom introduced the mission: trust, peace, and inclusive dialogue.",
      },
      "azzam-sept-2025": {
        date: "13 September 2025",
        title: "Azzam seminar session",
        description: "A community-centred seminar focused on dialogue culture, participation, and shared understanding.",
      },
      "attroun-oct-2025": {
        date: "18 October 2025",
        title: "Attroun seminar gathering",
        description: "A dialogue event exploring trust-building through practical facilitation and local cooperation.",
      },
      "silik-dinner-jan-2026": {
        date: "21 January 2026",
        title: "First dinner meeting with Khalid Silik",
        description: "An intimate gathering to strengthen relationships and prepare the next seminar dialogues.",
      },
      "silik-seminar-jan-22-2026": {
        date: "22 January 2026",
        title: "Khalid Silik seminar (Day 1)",
        description: "Participants discussed peace-centred dialogue methods and civic trust priorities.",
      },
      "silik-seminar-jan-24-2026": {
        date: "24 January 2026",
        title: "Khalid Silik seminar (Day 2)",
        description: "Continued sessions and reflections with the community and institutional stakeholders.",
      },
      "facebook-community": {
        date: "Official channel",
        title: "Facebook community updates",
        description: "Regular updates from our events, meetings, and dialogue milestones.",
      },
      "facebook-gallery": {
        date: "Photo archive",
        title: "Facebook photos",
        description: "Selected visual documentation from seminars and community dialogue activities.",
      },
    },
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
      "The Dialogue Platform hadde sitt første møte 8. februar 2025. Siden den gang har plattformen videreført jevnlige samlinger og partnerstøttede arrangementer.",
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
    previousEventsTitle: "Tidligere arrangementer og medieinnslag",
    previousEventsDescription:
      "Et utvalg av nyere seminarer og møter, med lenker til offisiell dekning på YouTube og Facebook.",
    openEventCta: "Åpne arrangement",
    youtubeLabel: "YouTube",
    facebookLabel: "Facebook",
    mediaReelTitle: "Fra vårt eget mediearkiv",
    mediaReelDescription:
      "Denne bildefremvisningen viser utvalgte beste bilder fra seminaret 24. januar 2026 med Khalid Silik og Bakry Aljackm.",
    highlights: {
      "first-meeting-2025": {
        date: "8. februar 2025",
        title: "Første møte i The Dialogue Platform",
        description: "Vårt første offentlige møte i Lillestrom introduserte arbeidet med tillit, fred og inkluderende dialog.",
      },
      "azzam-sept-2025": {
        date: "13. september 2025",
        title: "Azzam-seminar",
        description: "Et samfunnsnært seminar med fokus på dialogkultur, deltakelse og felles forståelse.",
      },
      "attroun-oct-2025": {
        date: "18. oktober 2025",
        title: "Attroun-seminar",
        description: "Et dialogarrangement om tillitsbygging gjennom praktisk fasilitering og lokalt samarbeid.",
      },
      "silik-dinner-jan-2026": {
        date: "21. januar 2026",
        title: "Første middagssamling med Khalid Silik",
        description: "En mindre samling for å styrke relasjoner og forberede de neste seminarene.",
      },
      "silik-seminar-jan-22-2026": {
        date: "22. januar 2026",
        title: "Khalid Silik-seminar (dag 1)",
        description: "Deltakerne drøftet dialogmetoder for fredsbygging og prioriteringer for lokal tillit.",
      },
      "silik-seminar-jan-24-2026": {
        date: "24. januar 2026",
        title: "Khalid Silik-seminar (dag 2)",
        description: "Videreførte sesjoner og refleksjoner med lokalsamfunn og institusjonelle aktører.",
      },
      "facebook-community": {
        date: "Offisiell kanal",
        title: "Oppdateringer fra Facebook",
        description: "Løpende oppdateringer fra møter, arrangementer og milepæler i dialogarbeidet.",
      },
      "facebook-gallery": {
        date: "Bildearkiv",
        title: "Facebook-bilder",
        description: "Utvalgt visuell dokumentasjon fra seminarer og dialogaktiviteter.",
      },
    },
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
    previousEventsTitle: "فعاليات سابقة ومواد إعلامية",
    previousEventsDescription: "مجموعة مختارة من الندوات واللقاءات السابقة مع روابط التغطية الرسمية على يوتيوب وفيسبوك.",
    openEventCta: "عرض الفعالية",
    youtubeLabel: "يوتيوب",
    facebookLabel: "فيسبوك",
    mediaReelTitle: "من أرشيفنا الإعلامي الخاص",
    mediaReelDescription: "يعرض هذا الشريط أفضل الصور المختارة من ندوة 24 يناير 2026 مع خالد سيليك وبكري الجاكم.",
    highlights: {
      "first-meeting-2025": {
        date: "8 فبراير 2025",
        title: "أول اجتماع لمنصة الحوار",
        description: "انطلق أول لقاء عام في ليلستروم للتأكيد على رسالة المنصة: الثقة والسلام والحوار الشامل.",
      },
      "azzam-sept-2025": {
        date: "13 سبتمبر 2025",
        title: "ندوة عزام",
        description: "ندوة مجتمعية ركزت على ثقافة الحوار والمشاركة والفهم المشترك.",
      },
      "attroun-oct-2025": {
        date: "18 أكتوبر 2025",
        title: "ندوة عترون",
        description: "فعالية حوارية تناولت بناء الثقة عبر التيسير العملي والتعاون المحلي.",
      },
      "silik-dinner-jan-2026": {
        date: "21 يناير 2026",
        title: "لقاء العشاء الأول مع خالد سيليك",
        description: "لقاء تعارفي لتعزيز العلاقات والتحضير لندوات الحوار التالية.",
      },
      "silik-seminar-jan-22-2026": {
        date: "22 يناير 2026",
        title: "ندوة خالد سيليك (اليوم الأول)",
        description: "ناقش المشاركون منهجيات حوار تبني السلام وتدعم الثقة المجتمعية.",
      },
      "silik-seminar-jan-24-2026": {
        date: "24 يناير 2026",
        title: "ندوة خالد سيليك (اليوم الثاني)",
        description: "استكمال الجلسات والنقاشات مع المجتمع والشركاء المؤسسيين.",
      },
      "facebook-community": {
        date: "قناة رسمية",
        title: "تحديثات مجتمع فيسبوك",
        description: "متابعة مستمرة للفعاليات والاجتماعات ومحطات العمل الحواري.",
      },
      "facebook-gallery": {
        date: "أرشيف الصور",
        title: "صور فيسبوك",
        description: "توثيق بصري مختار من الندوات والأنشطة الحوارية.",
      },
    },
    communityTitle: "من مجتمعنا على فيسبوك",
    communityDescription:
      "هذه المادة من حضورنا الرسمي على فيسبوك، وتعكس الأشخاص والحوارات التي تقف خلف المنصة.",
    communityCta: "زيارة قناة فيسبوك",
  },
};

const calendarSectionCopy: Record<
  Locale,
  {
    heading: string;
    description: string;
    monthViewLabel: string;
    monthViewDescription: string;
    subscribeCta: string;
    downloadFeedCta: string;
    subscribeHint: string;
    upcomingLabel: string;
    pastLabel: string;
    openDetails: string;
    timeLabel: string;
    seminarLinksLabel: string;
    addGoogleCta: string;
    downloadIcsCta: string;
    noUpcoming: string;
    noPast: string;
  }
> = {
  en: {
    heading: "Live events calendar",
    description:
      "Track upcoming and previous dialogue events in one place. Open any date to read what happened and jump directly to seminar coverage links.",
    monthViewLabel: "Calendar navigator",
    monthViewDescription: "Select a date to jump to the full event details and media links.",
    subscribeCta: "Subscribe for calendar updates",
    downloadFeedCta: "Download full calendar feed (.ics)",
    subscribeHint: "Subscribing lets your calendar app receive new events and future schedule changes.",
    upcomingLabel: "Next events",
    pastLabel: "Previous events archive",
    openDetails: "Open details",
    timeLabel: "Time",
    seminarLinksLabel: "Seminar links",
    addGoogleCta: "Add to Google Calendar",
    downloadIcsCta: "Download this event (.ics)",
    noUpcoming: "No upcoming events published yet.",
    noPast: "No archived events available yet.",
  },
  no: {
    heading: "Live arrangementskalender",
    description:
      "Følg kommende og tidligere dialogarrangementer på ett sted. Åpne en dato for å lese hva som skjedde og gå direkte til seminarlenker.",
    monthViewLabel: "Kalendernavigasjon",
    monthViewDescription: "Velg en dato for å åpne full beskrivelse og medielenker.",
    subscribeCta: "Abonner på kalenderoppdateringer",
    downloadFeedCta: "Last ned full kalenderfeed (.ics)",
    subscribeHint: "Abonnement gjør at kalenderappen kan motta nye arrangementer og senere endringer.",
    upcomingLabel: "Neste arrangementer",
    pastLabel: "Tidligere arrangementer",
    openDetails: "Vis detaljer",
    timeLabel: "Tid",
    seminarLinksLabel: "Seminarlenker",
    addGoogleCta: "Legg til i Google Kalender",
    downloadIcsCta: "Last ned denne hendelsen (.ics)",
    noUpcoming: "Ingen kommende arrangementer er publisert ennå.",
    noPast: "Ingen tidligere arrangementer er registrert ennå.",
  },
  ar: {
    heading: "تقويم الفعاليات المباشر",
    description:
      "تابع الفعاليات القادمة والسابقة في مكان واحد. افتح أي تاريخ لقراءة ما حدث والوصول مباشرة إلى روابط الندوات.",
    monthViewLabel: "التنقل داخل التقويم",
    monthViewDescription: "اختر تاريخاً للانتقال إلى وصف الفعالية الكامل وروابط الوسائط.",
    subscribeCta: "الاشتراك في تحديثات التقويم",
    downloadFeedCta: "تنزيل ملف التقويم الكامل (.ics)",
    subscribeHint: "الاشتراك يتيح لتطبيق التقويم لديك استقبال الفعاليات الجديدة وأي تغييرات لاحقة.",
    upcomingLabel: "الفعاليات القادمة",
    pastLabel: "أرشيف الفعاليات السابقة",
    openDetails: "عرض التفاصيل",
    timeLabel: "الوقت",
    seminarLinksLabel: "روابط الندوة",
    addGoogleCta: "إضافة إلى تقويم Google",
    downloadIcsCta: "تنزيل الفعالية الحالية (.ics)",
    noUpcoming: "لا توجد فعاليات قادمة منشورة حالياً.",
    noPast: "لا توجد فعاليات سابقة متاحة حالياً.",
  },
};

export default function EventsPage({ params }: PageProps) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const localized = getContent(locale);
  const extra = eventsExtras[locale];
  const calendarCopy = calendarSectionCopy[locale];
  const reelImages = [...mediaLibrary.events.reel, ...mediaLibrary.events.reel];
  const localeCode = locale === "no" ? "nb-NO" : locale === "ar" ? "ar-SA" : "en-US";
  const sortedCalendarEvents = [...calendarEvents].sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
  const upcomingCalendarEvents = sortedCalendarEvents.filter((event) => event.phase === "upcoming");
  const pastCalendarEvents = sortedCalendarEvents.filter((event) => event.phase === "past").reverse();
  const monthYearFormatter = new Intl.DateTimeFormat(localeCode, { month: "long", year: "numeric", timeZone: "Europe/Oslo" });
  const monthDayFormatter = new Intl.DateTimeFormat(localeCode, { day: "2-digit", timeZone: "Europe/Oslo" });
  const weekdayFormatter = new Intl.DateTimeFormat(localeCode, { weekday: "short", timeZone: "Europe/Oslo" });
  const dayLabelFormatter = new Intl.DateTimeFormat(localeCode, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Oslo",
  });
  const timeFormatter = new Intl.DateTimeFormat(localeCode, {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Oslo",
  });
  const monthGroups = Array.from(
    sortedCalendarEvents
      .reduce(
        (groups, event) => {
          const date = new Date(event.start);
          const key = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;

          if (!groups.has(key)) {
            groups.set(key, { key, label: monthYearFormatter.format(date), events: [] as typeof sortedCalendarEvents });
          }

          groups.get(key)?.events.push(event);
          return groups;
        },
        new Map<string, { key: string; label: string; events: typeof sortedCalendarEvents }>(),
      )
      .values(),
  ).reverse();
  const calendarFeedUrl = new URL("/events.ics", siteConfig.url).toString();
  const calendarSubscriptionUrl = calendarFeedUrl.replace(/^https?:\/\//, "webcal://");

  return (
    <div className="mx-auto max-w-content px-6 pb-24">
      <section className="section-padding pt-12 sm:pt-16">
        <div className="hero-media min-h-[320px] bg-[linear-gradient(145deg,#0b3657_0%,#1e5873_72%,#f2a33a_125%)]">
          <Image
            src={mediaLibrary.heroes.events}
            alt="Dialogue event participants"
            fill
            className="hero-image-motion object-cover"
            style={{ objectPosition: mediaLibrary.heroFocus.events }}
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
          <h2 className="text-3xl text-text-primary sm:text-4xl">{extra.mediaReelTitle}</h2>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-text-secondary">{extra.mediaReelDescription}</p>
        </Reveal>
        <div className="event-reel mt-8 rounded-2xl border border-line/80 bg-surface/70 p-3">
          <div className="event-reel-track">
            {reelImages.map((image, index) => (
              <figure key={`${image}-${index}`} className="event-reel-item">
                <Image src={image} alt="Dialogue Platform event moment" width={320} height={210} className="h-[170px] w-[270px] object-cover" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-line/80">
        <Reveal>
          <h2 className="text-3xl text-text-primary sm:text-4xl">{extra.previousEventsTitle}</h2>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-text-secondary">{extra.previousEventsDescription}</p>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {mediaLibrary.events.highlights.map((item, index) => {
            const details = extra.highlights[item.id];
            const channelLabel = item.channel === "youtube" ? extra.youtubeLabel : extra.facebookLabel;

            return (
              <HoverCard key={item.id} delay={index * 0.06}>
                <a href={item.href} target="_blank" rel="noreferrer" className="surface-card group block h-full overflow-hidden">
                  <div className="relative h-52">
                    <Image src={item.image} alt={details.title} fill className="object-cover transition duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-black/35 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white">
                      {channelLabel}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{details.date}</p>
                    <h3 className="mt-2 text-lg text-text-primary">{details.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">{details.description}</p>
                    <p className="mt-4 text-sm font-semibold text-accent">{extra.openEventCta}</p>
                  </div>
                </a>
              </HoverCard>
            );
          })}
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
                  className="mt-6 inline-flex rounded-full bg-[#f2a33a] px-6 py-3 text-sm font-semibold text-[#0f2940] transition-colors hover:bg-[#f8b75b]"
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
          <div className="surface-card overflow-hidden p-0">
            <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
              <div className="calendar-shell border-b border-line/80 p-6 sm:p-8 lg:border-b-0 lg:border-r">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">{calendarCopy.monthViewLabel}</p>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{calendarCopy.monthViewDescription}</p>

                <div className="mt-6 space-y-4">
                  {monthGroups.map((monthGroup) => (
                    <article key={monthGroup.key} className="calendar-month-card rounded-xl border border-line/80 bg-surface/80 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary">{monthGroup.label}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {monthGroup.events.map((event) => {
                          const startDate = new Date(event.start);
                          const eventText = getLocalizedCalendarEvent(event, locale);

                          return (
                            <a
                              key={event.id}
                              href={`#calendar-event-${event.id}`}
                              title={eventText.title}
                              className="calendar-date-chip inline-flex min-w-[64px] flex-col items-center rounded-lg border border-accent/25 bg-accent-soft/70 px-3 py-2 text-center text-accent transition hover:-translate-y-0.5 hover:border-accent/45"
                            >
                              <span className="text-sm font-semibold leading-none">{monthDayFormatter.format(startDate)}</span>
                              <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-text-secondary">
                                {weekdayFormatter.format(startDate)}
                              </span>
                            </a>
                          );
                        })}
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">{localized.events.calendarLabel}</p>
                <h2 className="mt-3 text-3xl text-text-primary sm:text-4xl">{calendarCopy.heading}</h2>
                <p className="mt-4 text-base leading-relaxed text-text-secondary">{calendarCopy.description}</p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={calendarSubscriptionUrl}
                    className="inline-flex rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0d3f4c]"
                  >
                    {calendarCopy.subscribeCta}
                  </a>
                  <a
                    href={calendarFeedUrl}
                    className="inline-flex rounded-full border border-accent/30 bg-accent-soft/70 px-5 py-3 text-sm font-semibold text-accent transition-colors hover:border-accent/50"
                  >
                    {calendarCopy.downloadFeedCta}
                  </a>
                  <Link
                    href={withLocale(locale, "/contact")}
                    className="inline-flex rounded-full border border-line/90 bg-white/70 px-5 py-3 text-sm font-semibold text-text-primary transition-colors hover:bg-white"
                  >
                    {localized.events.cta}
                  </Link>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-text-secondary">{calendarCopy.subscribeHint}</p>

                <div className="mt-8 space-y-8">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{calendarCopy.upcomingLabel}</p>
                    <div className="mt-3 space-y-3">
                      {upcomingCalendarEvents.length > 0 ? (
                        upcomingCalendarEvents.map((event) => {
                          const eventText = getLocalizedCalendarEvent(event, locale);
                          const startDate = new Date(event.start);
                          const endDate = new Date(event.end);

                          return (
                            <details
                              key={event.id}
                              id={`calendar-event-${event.id}`}
                              className="calendar-event-card rounded-xl border border-line/80 bg-white/70 px-4 py-4"
                            >
                              <summary className="flex cursor-pointer list-none items-start justify-between gap-3">
                                <div>
                                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                                    {dayLabelFormatter.format(startDate)}
                                  </p>
                                  <h3 className="mt-2 text-lg text-text-primary">{eventText.title}</h3>
                                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{eventText.shortDescription}</p>
                                </div>
                                <span className="rounded-full border border-line/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-text-secondary">
                                  {calendarCopy.openDetails}
                                </span>
                              </summary>

                              <div className="mt-4 border-t border-line/70 pt-4">
                                <p className="text-sm leading-relaxed text-text-secondary">{eventText.fullDescription}</p>
                                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.1em] text-text-secondary">
                                  {calendarCopy.timeLabel}: {timeFormatter.format(startDate)} - {timeFormatter.format(endDate)}
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                  {event.links.map((link) => (
                                    <a
                                      key={`${event.id}-${link.type}-${link.href}`}
                                      href={link.href}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="rounded-full border border-accent/30 bg-accent-soft/55 px-3 py-1 text-xs font-semibold text-accent transition-colors hover:border-accent/50"
                                    >
                                      {calendarCopy.seminarLinksLabel}: {link.type === "youtube" ? extra.youtubeLabel : extra.facebookLabel}
                                    </a>
                                  ))}
                                </div>
                                <div className="mt-3 flex flex-wrap gap-2">
                                  <a
                                    href={buildGoogleCalendarUrl(event, locale)}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-full bg-[#0b3a5d] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#0c4a75]"
                                  >
                                    {calendarCopy.addGoogleCta}
                                  </a>
                                  <a
                                    href={buildEventIcsDataUri(event, locale)}
                                    download={`${event.id}.ics`}
                                    className="rounded-full border border-accent/30 bg-[#fff4e1] px-4 py-2 text-xs font-semibold text-accent transition-colors hover:border-accent/50"
                                  >
                                    {calendarCopy.downloadIcsCta}
                                  </a>
                                </div>
                              </div>
                            </details>
                          );
                        })
                      ) : (
                        <p className="rounded-xl border border-line/70 bg-white/70 px-4 py-3 text-sm text-text-secondary">{calendarCopy.noUpcoming}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{calendarCopy.pastLabel}</p>
                    <div className="mt-3 space-y-3">
                      {pastCalendarEvents.length > 0 ? (
                        pastCalendarEvents.map((event) => {
                          const eventText = getLocalizedCalendarEvent(event, locale);
                          const startDate = new Date(event.start);
                          const endDate = new Date(event.end);

                          return (
                            <details
                              key={event.id}
                              id={`calendar-event-${event.id}`}
                              className="calendar-event-card rounded-xl border border-line/80 bg-white/70 px-4 py-4"
                            >
                              <summary className="flex cursor-pointer list-none items-start justify-between gap-3">
                                <div>
                                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                                    {dayLabelFormatter.format(startDate)}
                                  </p>
                                  <h3 className="mt-2 text-lg text-text-primary">{eventText.title}</h3>
                                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{eventText.shortDescription}</p>
                                </div>
                                <span className="rounded-full border border-line/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-text-secondary">
                                  {calendarCopy.openDetails}
                                </span>
                              </summary>

                              <div className="mt-4 border-t border-line/70 pt-4">
                                <p className="text-sm leading-relaxed text-text-secondary">{eventText.fullDescription}</p>
                                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.1em] text-text-secondary">
                                  {calendarCopy.timeLabel}: {timeFormatter.format(startDate)} - {timeFormatter.format(endDate)}
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                  {event.links.map((link) => (
                                    <a
                                      key={`${event.id}-${link.type}-${link.href}`}
                                      href={link.href}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="rounded-full border border-accent/30 bg-accent-soft/55 px-3 py-1 text-xs font-semibold text-accent transition-colors hover:border-accent/50"
                                    >
                                      {calendarCopy.seminarLinksLabel}: {link.type === "youtube" ? extra.youtubeLabel : extra.facebookLabel}
                                    </a>
                                  ))}
                                </div>
                                <div className="mt-3 flex flex-wrap gap-2">
                                  <a
                                    href={buildGoogleCalendarUrl(event, locale)}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-full bg-[#0b3a5d] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#0c4a75]"
                                  >
                                    {calendarCopy.addGoogleCta}
                                  </a>
                                  <a
                                    href={buildEventIcsDataUri(event, locale)}
                                    download={`${event.id}.ics`}
                                    className="rounded-full border border-accent/30 bg-[#fff4e1] px-4 py-2 text-xs font-semibold text-accent transition-colors hover:border-accent/50"
                                  >
                                    {calendarCopy.downloadIcsCta}
                                  </a>
                                </div>
                              </div>
                            </details>
                          );
                        })
                      ) : (
                        <p className="rounded-xl border border-line/70 bg-white/70 px-4 py-3 text-sm text-text-secondary">{calendarCopy.noPast}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
