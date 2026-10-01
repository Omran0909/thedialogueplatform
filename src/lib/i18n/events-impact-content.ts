import type { Locale } from "@/lib/i18n/config";

export type FeaturedDialogueEvent = {
  id: string;
  date: string;
  location: string;
  title: string;
  description: string;
  image: string;
  href: string;
  cta: string;
};

export type ImpactMetric = {
  value?: number;
  display?: string;
  prefix?: string;
  suffix?: string;
  label: string;
  detail: string;
};

export type EventsImpactContent = {
  featuredEyebrow: string;
  featuredTitle: string;
  featuredIntro: string;
  archiveCta: string;
  featuredEvents: FeaturedDialogueEvent[];
  impactEyebrow: string;
  impactTitle: string;
  impactIntro: string;
  impactMetrics: ImpactMetric[];
  impactSourceNote: string;
};

export const eventsImpactContent: Record<Locale, EventsImpactContent> = {
  en: {
    featuredEyebrow: "Selected dialogue moments",
    featuredTitle: "Events built around difficult questions",
    featuredIntro:
      "Each gathering creates a structured space for listening, disagreement, reflection, and the patient work of rebuilding trust.",
    archiveCta: "Explore the complete events archive",
    featuredEvents: [
      {
        id: "ardol-2026",
        date: "29 August 2026",
        location: "Husebylåven · Lillestrøm",
        title: "Between Peace and Arms: Where Is Sudan Heading?",
        description:
          "A public dialogue with Mubarak Abdelrahman Ardol on war, peace, national consensus, and pathways toward an inclusive national project.",
        image: "/assets/media/site/library/seminars/ardol/2026-08-29/ardol-2026-08-29-thumbnail.jpg",
        href: "https://www.youtube.com/watch?v=u951a5Zcg6o",
        cta: "Watch part two",
      },
      {
        id: "peace-prospects-2026",
        date: "24 January 2026",
        location: "Lillestrøm · Norway",
        title: "From War's Ashes to Prospects for Peace in Sudan",
        description:
          "A seminar with Khalid Omar Youssef and Bakri Al-Jak on Sudan's future, political and civil forces, and possibilities for peaceful processes.",
        image: "/assets/media/site/library/seminars/silik/2026-01-24/silik-2026-01-24-0626.jpg",
        href: "#calendar-event-seminar-2026-01-24",
        cta: "View event details",
      },
      {
        id: "attroun-2025",
        date: "October / November 2025",
        location: "Dialogue production · Norway",
        title: "Why Do Conflicts Recur?",
        description:
          "A long-form conversation with Munim Suleiman Attroun about recurring conflict, identity, fragmentation, trust, and peacebuilding.",
        image: "https://i.ytimg.com/vi/hYD4fEoxNv8/hqdefault.jpg",
        href: "https://youtu.be/hYD4fEoxNv8",
        cta: "Watch the dialogue",
      },
    ],
    impactEyebrow: "Platform-reported overview",
    impactTitle: "Impact in numbers",
    impactIntro: "Documented first-year activity and community reach, updated October 2026.",
    impactMetrics: [
      {
        value: 11,
        prefix: "≈",
        label: "Dialogue meetings",
        detail: "Meetings and dialogue activities during the pilot and first year.",
      },
      {
        value: 380,
        suffix: "+",
        label: "Direct participants",
        detail: "People reached directly across the platform's first year.",
      },
      {
        display: "35–75",
        label: "People per meeting",
        detail: "The typical reported attendance range for physical gatherings.",
      },
      {
        value: 2500,
        suffix: "+",
        label: "Early online followers",
        detail: "Audience reached during the platform's early digital growth.",
      },
      {
        value: 40000,
        prefix: "≈",
        label: "Dialogue video views",
        detail: "Combined internal reach for two major long-form productions.",
      },
      {
        value: 52000,
        prefix: "≈",
        label: "Community group reach",
        detail: "Facebook community associated with the platform, not formal membership.",
      },
    ],
    impactSourceNote:
      "Figures are reported by The Dialogue Platform and should be read as approximate. Social-media community counts do not represent formal organizational membership.",
  },
  no: {
    featuredEyebrow: "Utvalgte dialogøyeblikk",
    featuredTitle: "Arrangementer bygget rundt vanskelige spørsmål",
    featuredIntro:
      "Hver samling skaper et strukturert rom for lytting, uenighet, refleksjon og det langsiktige arbeidet med å gjenoppbygge tillit.",
    archiveCta: "Utforsk hele arrangementsarkivet",
    featuredEvents: [
      {
        id: "ardol-2026",
        date: "29. august 2026",
        location: "Husebylåven · Lillestrøm",
        title: "Mellom fred og våpen: Hvor går Sudan?",
        description:
          "En offentlig dialog med Mubarak Abdelrahman Ardol om krig, fred, nasjonal enighet og veier mot et inkluderende nasjonalt prosjekt.",
        image: "/assets/media/site/library/seminars/ardol/2026-08-29/ardol-2026-08-29-thumbnail.jpg",
        href: "https://www.youtube.com/watch?v=u951a5Zcg6o",
        cta: "Se del to",
      },
      {
        id: "peace-prospects-2026",
        date: "24. januar 2026",
        location: "Lillestrøm · Norge",
        title: "Fra krigens ruiner til utsikter for fred i Sudan",
        description:
          "Et seminar med Khalid Omar Youssef og Bakri Al-Jak om Sudans framtid, politiske og sivile krefter og muligheter for fredelige prosesser.",
        image: "/assets/media/site/library/seminars/silik/2026-01-24/silik-2026-01-24-0626.jpg",
        href: "#calendar-event-seminar-2026-01-24",
        cta: "Se arrangementsdetaljer",
      },
      {
        id: "attroun-2025",
        date: "Oktober / november 2025",
        location: "Dialogproduksjon · Norge",
        title: "Hvorfor gjentar konflikter seg?",
        description:
          "En lengre samtale med Munim Suleiman Attroun om tilbakevendende konflikt, identitet, fragmentering, tillit og fredsbygging.",
        image: "https://i.ytimg.com/vi/hYD4fEoxNv8/hqdefault.jpg",
        href: "https://youtu.be/hYD4fEoxNv8",
        cta: "Se dialogen",
      },
    ],
    impactEyebrow: "Plattformrapportert oversikt",
    impactTitle: "Virkning i tall",
    impactIntro: "Dokumentert aktivitet fra første driftsår og samfunnsrekkevidde, oppdatert oktober 2026.",
    impactMetrics: [
      {
        value: 11,
        prefix: "≈",
        label: "Dialogmøter",
        detail: "Møter og dialogaktiviteter i pilot- og første driftsår.",
      },
      {
        value: 380,
        suffix: "+",
        label: "Direkte deltakere",
        detail: "Personer nådd direkte gjennom plattformens første år.",
      },
      {
        display: "35–75",
        label: "Personer per møte",
        detail: "Typisk rapportert deltakelse på fysiske samlinger.",
      },
      {
        value: 2500,
        suffix: "+",
        label: "Tidlige nettfølgere",
        detail: "Publikum nådd i plattformens tidlige digitale vekst.",
      },
      {
        value: 40000,
        prefix: "≈",
        label: "Visninger av dialogvideoer",
        detail: "Samlet intern rekkevidde for to større langformatproduksjoner.",
      },
      {
        value: 52000,
        prefix: "≈",
        label: "Rekkevidde i fellesskapsgruppe",
        detail: "Facebook-fellesskap knyttet til plattformen, ikke formelt medlemskap.",
      },
    ],
    impactSourceNote:
      "Tallene er rapportert av The Dialogue Platform og må leses som omtrentlige. Følgere i sosiale medier er ikke det samme som formelt medlemskap.",
  },
  ar: {
    featuredEyebrow: "محطات حوارية مختارة",
    featuredTitle: "فعاليات تنطلق من الأسئلة الصعبة",
    featuredIntro:
      "تخلق كل فعالية مساحة منظمة للاستماع والاختلاف والتأمل والعمل المتدرج على إعادة بناء الثقة.",
    archiveCta: "استكشف الأرشيف الكامل للفعاليات",
    featuredEvents: [
      {
        id: "ardol-2026",
        date: "29 أغسطس 2026",
        location: "هوسبي لوفن · ليستروم",
        title: "بين السلام والسلاح: السودان إلى أين؟",
        description:
          "حوار عام مع مبارك عبد الرحمن أردول حول الحرب والسلام والتوافق الوطني ومسارات الوصول إلى مشروع وطني جامع.",
        image: "/assets/media/site/library/seminars/ardol/2026-08-29/ardol-2026-08-29-thumbnail.jpg",
        href: "https://www.youtube.com/watch?v=u951a5Zcg6o",
        cta: "شاهد الجزء الثاني",
      },
      {
        id: "peace-prospects-2026",
        date: "24 يناير 2026",
        location: "ليستروم · النرويج",
        title: "من رماد الحرب إلى آفاق السلام في السودان",
        description:
          "ندوة مع خالد عمر يوسف وبكري الجاك حول مستقبل السودان والقوى السياسية والمدنية وإمكانات العملية السياسية السلمية.",
        image: "/assets/media/site/library/seminars/silik/2026-01-24/silik-2026-01-24-0626.jpg",
        href: "#calendar-event-seminar-2026-01-24",
        cta: "عرض تفاصيل الفعالية",
      },
      {
        id: "attroun-2025",
        date: "أكتوبر / نوفمبر 2025",
        location: "إنتاج حواري · النرويج",
        title: "لماذا تتكرر النزاعات؟",
        description:
          "حوار مطول مع منعم سليمان عطرون حول تكرار الصراع والهوية والتشظي والثقة وبناء السلام.",
        image: "https://i.ytimg.com/vi/hYD4fEoxNv8/hqdefault.jpg",
        href: "https://youtu.be/hYD4fEoxNv8",
        cta: "شاهد الحوار",
      },
    ],
    impactEyebrow: "نظرة عامة بحسب أرقام المنصة",
    impactTitle: "الأثر بالأرقام",
    impactIntro: "نشاط موثق خلال العام الأول ومدى الوصول المجتمعي، محدث في أكتوبر 2026.",
    impactMetrics: [
      {
        value: 11,
        prefix: "≈",
        label: "لقاء ونشاط حواري",
        detail: "لقاءات وأنشطة حوارية خلال المرحلة التجريبية والعام الأول.",
      },
      {
        value: 380,
        suffix: "+",
        label: "مشارك مباشر",
        detail: "أشخاص شاركوا مباشرة خلال العام الأول للمنصة.",
      },
      {
        display: "35–75",
        label: "مشاركاً في اللقاء",
        detail: "النطاق المعتاد المبلغ عنه للحضور في اللقاءات الحضورية.",
      },
      {
        value: 2500,
        suffix: "+",
        label: "متابع رقمي مبكر",
        detail: "جمهور تم الوصول إليه خلال النمو الرقمي المبكر للمنصة.",
      },
      {
        value: 40000,
        prefix: "≈",
        label: "مشاهدة لمحتوى حواري",
        detail: "إجمالي الوصول الداخلي لإنتاجين حواريين مطولين.",
      },
      {
        value: 52000,
        prefix: "≈",
        label: "وصول عبر المجموعة المجتمعية",
        detail: "مجتمع فيسبوك مرتبط بالمنصة، وليس عضوية تنظيمية رسمية.",
      },
    ],
    impactSourceNote:
      "الأرقام واردة وفق تقارير منصة الحوار ويجب قراءتها بوصفها تقريبية. أعداد مجتمعات التواصل الاجتماعي لا تمثل عضوية تنظيمية رسمية.",
  },
};
