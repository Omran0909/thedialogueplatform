import type { OpportunityFeedCopy } from "@/components/OpportunityFeed";
import type { Locale } from "@/lib/i18n/config";

type SupportCard = {
  title: string;
  description: string;
};

type CrossLink = {
  title: string;
  description: string;
  href: "/funding" | "/scholarships" | "/contact";
  cta: string;
};

export type OpportunityPageCopy = {
  badge: string;
  title: string;
  description: string;
  feed: OpportunityFeedCopy;
  supportTitle: string;
  supportCards: SupportCard[];
  crossLink: CrossLink;
};

function buildFeedCopy(locale: Locale): OpportunityFeedCopy {
  if (locale === "no") {
    return {
      statusLabel: "Verifiserte muligheter",
      statusDescription:
        "Denne demosiden viser bare offisielle kilder eller UN-verifiserte inngangspunkter. Ingen søknader går gjennom The Dialogue Platform, og ingen mellomledd skal kreve penger for å koble deg til disse mulighetene.",
      snapshotLabel: "Demoversjon kontrollert",
      openLabel: "Åpen",
      rollingLabel: "Løpende",
      seasonalLabel: "Sesongbasert",
      closedLabel: "Stengt",
      kindCallLabel: "Utlysning",
      kindPortalLabel: "Offisiell portal",
      kindProgrammeLabel: "Program",
      audienceLabel: "Målgruppe",
      geographyLabel: "Geografi",
      deadlineLabel: "Søknadsfrist",
      sourceLabel: "Kilde",
      verificationLabel: "Verifisering",
      openSourceLabel: "Åpne kilden",
      latestLabel: "Fremhevede muligheter",
      streamLabel: "Direktestrøm",
      relativePublishedLabel: "Publisert",
      relativeVerifiedLabel: "Verifisert",
      relativeUpdatedLabel: "Oppdatert",
      noDeadlineLabel: "Se kilden for frist",
    };
  }

  if (locale === "ar") {
    return {
      statusLabel: "فرص موثقة",
      statusDescription:
        "تعرض هذه النسخة التجريبية فقط المصادر الرسمية أو المسارات التي تم التحقق منها من الأمم المتحدة. لا تتم أي طلبات عبر منصة الحوار، ولا ينبغي لأي وسيط أن يطلب مالاً مقابل الوصول إلى هذه الفرص.",
      snapshotLabel: "تم التحقق من النسخة التجريبية",
      openLabel: "مفتوح",
      rollingLabel: "مستمر",
      seasonalLabel: "موسمي",
      closedLabel: "مغلق",
      kindCallLabel: "دعوة",
      kindPortalLabel: "بوابة رسمية",
      kindProgrammeLabel: "برنامج",
      audienceLabel: "الفئة المستهدفة",
      geographyLabel: "النطاق الجغرافي",
      deadlineLabel: "آخر موعد",
      sourceLabel: "المصدر",
      verificationLabel: "التحقق",
      openSourceLabel: "افتح المصدر",
      latestLabel: "الفرص المميزة",
      streamLabel: "التدفق المباشر",
      relativePublishedLabel: "نُشر",
      relativeVerifiedLabel: "تم التحقق",
      relativeUpdatedLabel: "تم التحديث",
      noDeadlineLabel: "راجع المصدر لمعرفة الموعد",
    };
  }

  return {
    statusLabel: "Verified opportunities",
    statusDescription:
      "This demo shows only official sources or UN-verified entry points. No applications run through The Dialogue Platform, and no intermediary should charge money to connect people to these opportunities.",
    snapshotLabel: "Demo snapshot reviewed",
    openLabel: "Open",
    rollingLabel: "Rolling",
    seasonalLabel: "Seasonal",
    closedLabel: "Closed",
    kindCallLabel: "Open call",
    kindPortalLabel: "Official portal",
    kindProgrammeLabel: "Programme",
    audienceLabel: "Audience",
    geographyLabel: "Geography",
    deadlineLabel: "Deadline",
    sourceLabel: "Source",
    verificationLabel: "Verification",
    openSourceLabel: "Open source",
    latestLabel: "Featured opportunities",
    streamLabel: "Live stream",
    relativePublishedLabel: "Published",
    relativeVerifiedLabel: "Verified",
    relativeUpdatedLabel: "Updated",
    noDeadlineLabel: "Check source for deadline",
  };
}

export function getFundingPageCopy(locale: Locale): OpportunityPageCopy {
  const feed = buildFeedCopy(locale);

  if (locale === "no") {
    return {
      badge: "Direkte finansieringsdesk",
      title: "Legitime finansieringskilder for lokalsamfunn og organisasjoner",
      description:
        "Bygget som en demoversjon for å hjelpe flyktningledede initiativer, lokalsamfunnsgrupper og små organisasjoner å gå direkte til bekreftede givere, portaler og utlysninger uten uærlige mellomledd.",
      feed,
      supportTitle: "Slik stiller organisasjonen sterkere",
      supportCards: [
        {
          title: "Hold dokumentene klare",
          description:
            "Samle registreringsbevis, styringsstruktur, styreliste, bankinformasjon, referanser og en kort organisasjonsprofil før dere søker.",
        },
        {
          title: "Søk direkte ved kilden",
          description:
            "Bruk alltid lenken i den offisielle utlysningen eller portalen. Ikke betal tredjeparter for tilgang til søknadsskjemaer eller kontakt med givere.",
        },
        {
          title: "Vis lokal troverdighet",
          description:
            "Forklar tydelig hvem dere når, hvordan dere dokumenterer resultater, og hvordan midlene faktisk kommer fram til mennesker på bakken.",
        },
      ],
      crossLink: {
        title: "Legg til akademiske muligheter",
        description:
          "Flyktningledere, lærere og studenter trenger ofte stipendinformasjon parallelt med organisasjonsfinansiering. Derfor er stipendseksjonen bygd i samme stil.",
        href: "/scholarships",
        cta: "Åpne stipendseksjonen",
      },
    };
  }

  if (locale === "ar") {
    return {
      badge: "مكتب التمويل المباشر",
      title: "مصادر تمويل شرعية للمبادرات المجتمعية والمنظمات",
      description:
        "تم تصميم هذه النسخة التجريبية لمساعدة المبادرات التي يقودها اللاجئون والمنظمات الصغيرة على الوصول مباشرة إلى الجهات المانحة والبوابات الرسمية والدعوات الموثقة دون وسطاء غير أمناء.",
      feed,
      supportTitle: "كيف تصبح المنظمة أكثر جاهزية",
      supportCards: [
        {
          title: "جهزوا ملفاتكم الأساسية",
          description:
            "اجمعوا شهادة التسجيل، وهيكل الحوكمة، وقائمة المجلس، والمعلومات البنكية، وخطابات المرجعية، وملفاً تعريفياً مختصراً عن المنظمة قبل التقديم.",
        },
        {
          title: "قدّموا مباشرة من المصدر",
          description:
            "استخدموا دائماً الرابط الموجود في الدعوة الرسمية أو البوابة الأصلية. لا تدفعوا لأي وسيط مقابل الوصول إلى الاستمارات أو المانحين.",
        },
        {
          title: "أثبتوا المصداقية المحلية",
          description:
            "اشرحوا بوضوح من تخدمون، وكيف توثقون النتائج، وكيف تصل الأموال فعلياً إلى الناس على الأرض.",
        },
      ],
      crossLink: {
        title: "أضيفوا أيضاً فرصاً أكاديمية",
        description:
          "غالباً ما يحتاج القادة والطلاب والمعلمون في المخيمات إلى فرص منح دراسية بالتوازي مع فرص التمويل المؤسسي، لذلك تم بناء قسم المنح بنفس المنهج.",
        href: "/scholarships",
        cta: "افتح قسم المنح الدراسية",
      },
    };
  }

  return {
    badge: "Direct Funding Desk",
    title: "Legitimate funding routes for grassroots and community organisations",
    description:
      "Built as a live demo to help refugee-led initiatives, community groups, and smaller organisations reach verified donors, portals, and calls directly without dishonest intermediaries.",
    feed,
    supportTitle: "How to make your organisation application-ready",
    supportCards: [
      {
        title: "Keep your core documents ready",
        description:
          "Prepare registration papers, governance structure, board list, bank details, references, and a short organisational profile before you open any application form.",
      },
      {
        title: "Apply only at the original source",
        description:
          "Use the official call link or portal every time. Do not pay third parties for access to forms, donor contact, or faster processing.",
      },
      {
        title: "Prove local accountability",
        description:
          "Show who you serve, how you document results, and how funds reach people on the ground rather than being absorbed by intermediaries.",
      },
    ],
    crossLink: {
      title: "Add academic pathways as well",
      description:
        "Refugee leaders, lecturers, students, and researchers often need scholarship routes alongside organisational funding. The scholarship section uses the same verified-source approach.",
      href: "/scholarships",
      cta: "Open scholarships",
    },
  };
}

export function getScholarshipsPageCopy(locale: Locale): OpportunityPageCopy {
  const feed = buildFeedCopy(locale);

  if (locale === "no") {
    return {
      badge: "Akademisk mulighetsdesk",
      title: "Verifiserte stipend- og utdanningsveier for flyktninger og akademikere",
      description:
        "Denne demoversjonen samler legitime stipendkilder, UNHCR-verifiserte portaler og utdanningsveier for studenter, lærere, forskere og fagpersoner som trenger direkte adgang til troverdige søknader.",
      feed,
      supportTitle: "Hva søkere bør forberede",
      supportCards: [
        {
          title: "Bygg et komplett akademisk dossier",
          description:
            "Hold vitnemål, karakterutskrifter, identitets- og flyktningdokumenter, CV, motivasjonsbrev og anbefalingsbrev klare i digital form.",
        },
        {
          title: "Sjekk språk- og nivåkrav tidlig",
          description:
            "Mange programmer krever engelsk, fransk eller annen dokumentert språkkunnskap samt spesifikke karakter- eller gradsnivåer.",
        },
        {
          title: "Unngå svindel",
          description:
            "Legitime stipend krever ikke betaling for å bli satt på liste, få rask behandling eller få et tilbud. Følg alltid den offisielle lenken i oppføringen.",
        },
      ],
      crossLink: {
        title: "Tilbake til organisasjonsfinansiering",
        description:
          "Om behovet gjelder lokalsamfunnsprosjekter, kvinnegrupper, ungdomsarbeid eller organisasjonsvekst, ligger de verifiserte finansieringsrutene i søsterseksjonen.",
        href: "/funding",
        cta: "Åpne finansiering",
      },
    };
  }

  if (locale === "ar") {
    return {
      badge: "مكتب الفرص الأكاديمية",
      title: "مسارات منح وتعليم موثقة للاجئين والأكاديميين",
      description:
        "تجمع هذه النسخة التجريبية مصادر منح شرعية وبوابات موثقة من المفوضية ومسارات تعليمية للطلاب والمعلمين والباحثين والمهنيين الذين يحتاجون إلى وصول مباشر لفرص موثوقة.",
      feed,
      supportTitle: "ما الذي يجب أن يجهزه المتقدم",
      supportCards: [
        {
          title: "ابنوا ملفاً أكاديمياً كاملاً",
          description:
            "احفظوا الشهادات والسجلات الأكاديمية ووثائق الهوية واللجوء والسيرة الذاتية ورسالة الدافع وخطابات التوصية بصيغة رقمية جاهزة.",
        },
        {
          title: "تحققوا مبكراً من شروط اللغة والمستوى",
          description:
            "العديد من البرامج تشترط إثبات اللغة الإنجليزية أو الفرنسية أو غيرها، إضافة إلى معدلات أو مستويات أكاديمية محددة.",
        },
        {
          title: "تجنبوا الاحتيال",
          description:
            "المنح الشرعية لا تطلب رسوماً لإدراج الاسم أو تسريع المعالجة أو ضمان القبول. اتبعوا دائماً الرابط الرسمي الموجود في الفرصة.",
        },
      ],
      crossLink: {
        title: "العودة إلى تمويل المنظمات",
        description:
          "إذا كان الاحتياج يتعلق بمشاريع المجتمع المحلي أو مجموعات النساء أو الشباب أو نمو المنظمات، فالمسارات التمويلية الموثقة موجودة في القسم الشقيق.",
        href: "/funding",
        cta: "افتح التمويل",
      },
    };
  }

  return {
    badge: "Academic Opportunity Desk",
    title: "Verified scholarships and education pathways for refugees and academics",
    description:
      "This demo gathers legitimate scholarship sources, UNHCR-verified portals, and education pathways for students, lecturers, researchers, and professionals who need direct access to credible applications.",
    feed,
    supportTitle: "What applicants should prepare",
    supportCards: [
      {
        title: "Build a complete academic file",
        description:
          "Keep certificates, transcripts, identity and refugee-status documents, CV, motivation letter, and recommendation letters ready in digital form.",
      },
      {
        title: "Check language and level requirements early",
        description:
          "Many programmes require proof of English, French, or other language skills, as well as specific degree levels or grade thresholds.",
      },
      {
        title: "Avoid scholarship scams",
        description:
          "Legitimate scholarships do not charge people to be shortlisted, fast-tracked, or guaranteed admission. Always follow the official link in the listing.",
      },
    ],
    crossLink: {
      title: "Go back to organisational funding",
      description:
        "If the need is for community projects, women's groups, youth initiatives, or organisational growth, the sister section holds the verified funding routes.",
      href: "/funding",
      cta: "Open funding",
    },
  };
}
