import type { Locale } from "@/lib/i18n/config";

type CalendarEventText = {
  title: string;
  shortDescription: string;
  fullDescription: string;
};

type CalendarEventLink = {
  type: "youtube" | "facebook";
  href: string;
};

export type CalendarEvent = {
  id: string;
  phase: "upcoming" | "past";
  start: string;
  end: string;
  location: string;
  links: CalendarEventLink[];
  text: Record<Locale, CalendarEventText>;
};

export const calendarEvents: CalendarEvent[] = [
  {
    id: "launch-2025-02-08",
    phase: "past",
    start: "2025-02-08T17:30:00+01:00",
    end: "2025-02-08T20:00:00+01:00",
    location: "Lillestrom, Norway",
    links: [
      { type: "facebook", href: "https://www.facebook.com/share/16Qz1NFz7w/?mibextid=wwXIfr" },
      { type: "youtube", href: "https://youtu.be/eC5fJTXGQsg" },
    ],
    text: {
      en: {
        title: "Founding Meeting: The Dialogue Platform",
        shortDescription: "Official platform launch and first trust-focused dialogue session.",
        fullDescription:
          "The founding meeting introduced The Dialogue Platform mission and brought community participants together to discuss trust, peacebuilding, and inclusive participation in Lillestrom.",
      },
      no: {
        title: "Stiftelsesmote: The Dialogue Platform",
        shortDescription: "Offisiell lansering og forste tillitsfokuserte dialogsamling.",
        fullDescription:
          "Stiftelsesmøtet presenterte plattformens oppdrag og samlet lokalsamfunnsdeltakere til samtale om tillit, fredsbygging og inkluderende deltakelse i Lillestrom.",
      },
      ar: {
        title: "الاجتماع التأسيسي لمنصة الحوار",
        shortDescription: "إطلاق المنصة رسمياً وأول جلسة حوارية تركّز على الثقة.",
        fullDescription:
          "قدّم الاجتماع التأسيسي رسالة منصة الحوار وجمع مشاركين من المجتمع لمناقشة الثقة وبناء السلام والمشاركة الشاملة في ليلستروم.",
      },
    },
  },
  {
    id: "seminar-2025-09-13",
    phase: "past",
    start: "2025-09-13T18:00:00+02:00",
    end: "2025-09-13T20:30:00+02:00",
    location: "Lillestrom, Norway",
    links: [
      { type: "youtube", href: "https://youtu.be/hYD4fEoxNv8" },
      { type: "facebook", href: "https://www.facebook.com/share/16Qz1NFz7w/?mibextid=wwXIfr" },
    ],
    text: {
      en: {
        title: "Community Dialogue Seminar",
        shortDescription: "Cross-community seminar focused on dialogue culture and practical trust-building.",
        fullDescription:
          "Participants explored how institutions and residents can collaborate through structured facilitation, shared listening, and practical follow-up commitments.",
      },
      no: {
        title: "Seminar om samfunnsdialog",
        shortDescription: "Tverrfaglig seminar om dialogkultur og praktisk tillitsbygging.",
        fullDescription:
          "Deltakerne utforsket hvordan institusjoner og innbyggere kan samarbeide gjennom strukturert fasilitering, aktiv lytting og konkrete oppfølgingspunkter.",
      },
      ar: {
        title: "ندوة الحوار المجتمعي",
        shortDescription: "ندوة مجتمعية ركزت على ثقافة الحوار وبناء الثقة عملياً.",
        fullDescription:
          "ناقش المشاركون كيف يمكن للمؤسسات والسكان التعاون عبر التيسير المنظم والاستماع المتبادل وربط الحوار بخطوات متابعة واضحة.",
      },
    },
  },
  {
    id: "seminar-2025-10-18",
    phase: "past",
    start: "2025-10-18T17:30:00+02:00",
    end: "2025-10-18T21:00:00+02:00",
    location: "Masan Aktivitetssenter, Lillestrom",
    links: [
      { type: "youtube", href: "https://youtu.be/NU42C6AANSg" },
      { type: "facebook", href: "https://www.facebook.com/share/16Qz1NFz7w/?mibextid=wwXIfr" },
    ],
    text: {
      en: {
        title: "Public Seminar: Trust and Peace Dialogue",
        shortDescription: "Public seminar session with dialogue facilitation and civic participation.",
        fullDescription:
          "This seminar focused on recurring conflict patterns and practical ways communities can strengthen trust and peace through respectful, inclusive dialogue.",
      },
      no: {
        title: "Apent seminar: Dialog for tillit og fred",
        shortDescription: "Offentlig seminar med dialogfasilitering og bred deltakelse.",
        fullDescription:
          "Seminaret tok opp gjentakende konfliktmønstre og praktiske metoder for å styrke tillit og fred gjennom inkluderende og respektfull dialog.",
      },
      ar: {
        title: "ندوة عامة: حوار من أجل الثقة والسلام",
        shortDescription: "ندوة عامة حول التيسير الحواري والمشاركة المدنية.",
        fullDescription:
          "ركّزت الندوة على أسباب تكرار النزاعات وطرق عملية لتعزيز الثقة والسلام عبر حوار شامل ومحترم.",
      },
    },
  },
  {
    id: "seminar-2026-01-22",
    phase: "past",
    start: "2026-01-22T18:00:00+01:00",
    end: "2026-01-22T21:00:00+01:00",
    location: "Lillestrom, Norway",
    links: [
      { type: "youtube", href: "https://youtu.be/eC5fJTXGQsg" },
      { type: "facebook", href: "https://www.facebook.com/share/16Qz1NFz7w/?mibextid=wwXIfr" },
    ],
    text: {
      en: {
        title: "Khalid Silik Seminar - Day 1",
        shortDescription: "Day one focused on institutional trust and peace-oriented dialogue design.",
        fullDescription:
          "The first session gathered community members and facilitators to map key trust challenges and identify practical dialogue pathways for institutions.",
      },
      no: {
        title: "Khalid Silik-seminar - dag 1",
        shortDescription: "Første dag med fokus på institusjonell tillit og fredsorientert dialogdesign.",
        fullDescription:
          "Første samling samlet deltakere og fasilitatorer for å kartlegge sentrale tillitsutfordringer og finne praktiske dialogløp for institusjoner.",
      },
      ar: {
        title: "ندوة خالد سيليك - اليوم الأول",
        shortDescription: "اليوم الأول ركّز على الثقة المؤسسية وتصميم الحوار الموجّه للسلام.",
        fullDescription:
          "جمعت الجلسة الأولى المشاركين والميسّرين لتحديد تحديات الثقة الرئيسية وصياغة مسارات حوار عملية يمكن للمؤسسات تطبيقها.",
      },
    },
  },
  {
    id: "seminar-2026-01-24",
    phase: "past",
    start: "2026-01-24T17:00:00+01:00",
    end: "2026-01-24T20:30:00+01:00",
    location: "Lillestrom, Norway",
    links: [
      { type: "youtube", href: "https://youtu.be/hYD4fEoxNv8" },
      { type: "facebook", href: "https://www.facebook.com/share/16Qz1NFz7w/?mibextid=wwXIfr" },
    ],
    text: {
      en: {
        title: "Khalid Silik Seminar - Day 2",
        shortDescription: "Follow-up sessions and consolidated reflections from participants.",
        fullDescription:
          "The second seminar day documented lessons, participant feedback, and practical recommendations for future trust-building dialogue programs.",
      },
      no: {
        title: "Khalid Silik-seminar - dag 2",
        shortDescription: "Oppfølgingssesjoner og samlede refleksjoner fra deltakerne.",
        fullDescription:
          "Andre seminardag dokumenterte læringspunkter, tilbakemeldinger og anbefalinger for videre tillitsbyggende dialogarbeid.",
      },
      ar: {
        title: "ندوة خالد سيليك - اليوم الثاني",
        shortDescription: "جلسات متابعة وخلاصات عملية من المشاركين.",
        fullDescription:
          "وثّق اليوم الثاني الدروس المستفادة وآراء المشاركين والتوصيات العملية لتطوير برامج الحوار القادمة.",
      },
    },
  },
  {
    id: "upcoming-2026-03-21",
    phase: "upcoming",
    start: "2026-03-21T17:30:00+01:00",
    end: "2026-03-21T20:00:00+01:00",
    location: "Lillestrom, Norway",
    links: [
      { type: "youtube", href: "https://youtube.com/@thedialogueplattform" },
      { type: "facebook", href: "https://www.facebook.com/share/16Qz1NFz7w/?mibextid=wwXIfr" },
    ],
    text: {
      en: {
        title: "Institution and Community Trust Workshop",
        shortDescription: "Upcoming workshop on practical trust architecture between institutions and residents.",
        fullDescription:
          "This scheduled workshop will focus on dialogue design, inclusion mechanisms, and follow-up methods that help institutions sustain trust over time.",
      },
      no: {
        title: "Workshop om tillit mellom institusjoner og lokalsamfunn",
        shortDescription: "Kommende workshop om praktisk tillitsarkitektur mellom institusjoner og innbyggere.",
        fullDescription:
          "Den planlagte workshopen vil fokusere på dialogdesign, inkluderingsmekanismer og oppfølging som bidrar til varig tillit.",
      },
      ar: {
        title: "ورشة الثقة بين المؤسسات والمجتمع",
        shortDescription: "ورشة قادمة حول بناء الثقة عملياً بين المؤسسات والسكان.",
        fullDescription:
          "ستركز الورشة المقبلة على تصميم الحوار وآليات الشمول وأساليب المتابعة التي تساعد المؤسسات على ترسيخ الثقة.",
      },
    },
  },
  {
    id: "upcoming-2026-04-18",
    phase: "upcoming",
    start: "2026-04-18T17:30:00+02:00",
    end: "2026-04-18T20:00:00+02:00",
    location: "Lillestrom, Norway",
    links: [
      { type: "youtube", href: "https://youtu.be/NU42C6AANSg" },
      { type: "facebook", href: "https://www.facebook.com/share/16Qz1NFz7w/?mibextid=wwXIfr" },
    ],
    text: {
      en: {
        title: "Youth and Civic Dialogue Session",
        shortDescription: "Upcoming session focused on youth voices and civic inclusion.",
        fullDescription:
          "This event is planned to deepen participation from younger community voices and connect their priorities to institutional follow-up pathways.",
      },
      no: {
        title: "Ungdoms- og samfunnsdialog",
        shortDescription: "Kommende samling med fokus på ungdomsstemmer og samfunnsdeltakelse.",
        fullDescription:
          "Arrangementet er planlagt for å styrke deltakelsen fra yngre stemmer og koble deres prioriteringer til institusjonell oppfølging.",
      },
      ar: {
        title: "جلسة حوار للشباب والمجتمع",
        shortDescription: "جلسة قادمة تركّز على أصوات الشباب والشمول المجتمعي.",
        fullDescription:
          "تهدف هذه الفعالية إلى تعميق مشاركة فئة الشباب وربط أولوياتهم بمسارات متابعة مؤسسية واضحة.",
      },
    },
  },
  {
    id: "upcoming-2026-05-23",
    phase: "upcoming",
    start: "2026-05-23T18:00:00+02:00",
    end: "2026-05-23T20:30:00+02:00",
    location: "Lillestrom, Norway",
    links: [
      { type: "youtube", href: "https://youtube.com/@thedialogueplattform" },
      { type: "facebook", href: "https://www.facebook.com/share/16Qz1NFz7w/?mibextid=wwXIfr" },
    ],
    text: {
      en: {
        title: "Public Dialogue Briefing and Follow-up",
        shortDescription: "Upcoming briefing that links dialogue findings to institutional next steps.",
        fullDescription:
          "This session will consolidate lessons from recent dialogues and publish practical follow-up priorities for partners and participating institutions.",
      },
      no: {
        title: "Offentlig dialogbrief med oppfolging",
        shortDescription: "Kommende orientering som kobler dialogfunn til neste institusjonelle steg.",
        fullDescription:
          "Samlingen vil oppsummere læringspunkter fra nylige dialoger og synliggjøre praktiske prioriteringer for videre oppfølging.",
      },
      ar: {
        title: "إحاطة حوارية عامة مع متابعة",
        shortDescription: "إحاطة قادمة تربط مخرجات الحوار بالخطوات المؤسسية التالية.",
        fullDescription:
          "ستجمع هذه الجلسة خلاصات الحوارات الأخيرة وتنشر أولويات المتابعة العملية للشركاء والمؤسسات المشاركة.",
      },
    },
  },
];

function formatGoogleDate(iso: string) {
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function escapeIcsField(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function getEventText(event: CalendarEvent, locale: Locale): CalendarEventText {
  return event.text[locale] ?? event.text.en;
}

export function buildGoogleCalendarUrl(event: CalendarEvent, locale: Locale) {
  const eventText = getEventText(event, locale);
  const seminarLinks = event.links.map((link) => link.href).join("\n");
  const details = `${eventText.fullDescription}\n\nLinks:\n${seminarLinks}`;

  const query = new URLSearchParams({
    action: "TEMPLATE",
    text: eventText.title,
    dates: `${formatGoogleDate(event.start)}/${formatGoogleDate(event.end)}`,
    details,
    location: event.location,
  });

  return `https://calendar.google.com/calendar/render?${query.toString()}`;
}

export function buildEventIcs(event: CalendarEvent, locale: Locale) {
  const eventText = getEventText(event, locale);
  const seminarLinks = event.links.map((link) => link.href).join("\n");
  const description = `${eventText.fullDescription}\n\nLinks:\n${seminarLinks}`;
  const stamp = formatGoogleDate(new Date().toISOString());

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//The Dialogue Platform//Events Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${escapeIcsField(`dialogue-${event.id}@thedialogueplatform.com`)}`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${formatGoogleDate(event.start)}`,
    `DTEND:${formatGoogleDate(event.end)}`,
    `SUMMARY:${escapeIcsField(eventText.title)}`,
    `DESCRIPTION:${escapeIcsField(description)}`,
    `LOCATION:${escapeIcsField(event.location)}`,
    event.links[0] ? `URL:${escapeIcsField(event.links[0].href)}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ]
    .filter(Boolean)
    .join("\r\n");
}

export function buildEventIcsDataUri(event: CalendarEvent, locale: Locale) {
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(buildEventIcs(event, locale))}`;
}

export function buildCalendarFeed(events: CalendarEvent[], locale: Locale = "en") {
  const stamp = formatGoogleDate(new Date().toISOString());
  const eventsBody = events
    .map((event) => {
      const eventText = getEventText(event, locale);
      const seminarLinks = event.links.map((link) => link.href).join("\n");
      const description = `${eventText.fullDescription}\n\nLinks:\n${seminarLinks}`;

      return [
        "BEGIN:VEVENT",
        `UID:${escapeIcsField(`dialogue-${event.id}@thedialogueplatform.com`)}`,
        `DTSTAMP:${stamp}`,
        `DTSTART:${formatGoogleDate(event.start)}`,
        `DTEND:${formatGoogleDate(event.end)}`,
        `SUMMARY:${escapeIcsField(eventText.title)}`,
        `DESCRIPTION:${escapeIcsField(description)}`,
        `LOCATION:${escapeIcsField(event.location)}`,
        event.links[0] ? `URL:${escapeIcsField(event.links[0].href)}` : "",
        "END:VEVENT",
      ]
        .filter(Boolean)
        .join("\r\n");
    })
    .join("\r\n");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//The Dialogue Platform//Events Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    eventsBody,
    "END:VCALENDAR",
    "",
  ].join("\r\n");
}

export function getLocalizedCalendarEvent(event: CalendarEvent, locale: Locale) {
  return getEventText(event, locale);
}
