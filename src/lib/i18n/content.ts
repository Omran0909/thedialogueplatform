import type { Locale } from "@/lib/i18n/config";

type Card = {
  title: string;
  description: string;
};

type Content = {
  metadata: {
    siteDescription: string;
    keywords: string[];
  };
  home: {
    heroBadge: string;
    collaborationLine: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    trustSectionTitle: string;
    trustSectionDescription: string;
    trustPillars: Card[];
    capabilitiesTitle: string;
    capabilities: Card[];
    examplesTitle: string;
    examplesDescription: string;
    exampleCardDescription: string;
    watchOnYoutube: string;
    channelsTitle: string;
    channelsDescription: string;
    contactCta: string;
    directContactTitle: string;
    directContactDescription: string;
  };
  about: {
    title: string;
    heroTitle: string;
    intro: string;
    principlesTitle: string;
    principles: Card[];
    partnersTitle: string;
    partnerLabel: string;
    partnerDescription: string;
  };
  dialogues: {
    title: string;
    heroTitle: string;
    formats: Card[];
    expectTitle: string;
    expectations: string[];
  };
  events: {
    title: string;
    heroTitle: string;
    eventTypes: Card[];
    calendarLabel: string;
    calendarDescription: string;
    cta: string;
  };
  insights: {
    title: string;
    heroTitle: string;
    insightTypes: Card[];
    publicationLabel: string;
    publicationDescription: string;
  };
  contact: {
    title: string;
    intro: string;
    directLabel: string;
    collaborationLine: string;
    firstMessageLabel: string;
    firstMessageTopics: string[];
    channelsTitle: string;
  };
};

export const content: Record<Locale, Content> = {
  en: {
    metadata: {
      siteDescription:
        "The Dialogue Platform builds trust and peace through inclusive, structured dialogue in collaboration with Nansen Peace Center and Lillestrom Municipality.",
      keywords: [
        "dialogue",
        "public dialogue",
        "peacebuilding",
        "trust building",
        "governance",
        "public engagement",
        "institutional design",
        "municipalities",
        "stakeholder dialogue",
        "Nansen Peace Center",
        "Lillestrom Municipality",
      ],
    },
    home: {
      heroBadge: "Trust and Peace Through Dialogue",
      collaborationLine: "In collaboration with",
      title: "Building inclusive dialogue systems that strengthen trust, cooperation, and peace.",
      description:
        "The Dialogue Platform helps institutions transform complex public conversations into shared understanding, practical decisions, and durable civic relationships.",
      primaryCta: "Explore dialogue formats",
      secondaryCta: "Learn our mission",
      trustSectionTitle: "Why this platform exists",
      trustSectionDescription:
        "Communities need trustworthy spaces where disagreement can be handled constructively, institutions can listen with integrity, and decisions can be made without leaving people behind. We design dialogue as a long-term civic practice that builds confidence, reduces polarization, and supports peaceful democratic life.",
      trustPillars: [
        {
          title: "Inclusive Participation",
          description:
            "We design dialogues where diverse voices are heard safely and respectfully, including groups often excluded from decision spaces.",
        },
        {
          title: "Institutional Accountability",
          description: "Every process is connected to clear mandates, transparent ownership, and documented follow-up.",
        },
        {
          title: "Peace-Oriented Outcomes",
          description:
            "We focus on reducing polarization, strengthening social cohesion, and supporting long-term trust between people and institutions.",
        },
      ],
      capabilitiesTitle: "Core capabilities",
      capabilities: [
        {
          title: "Mandate Clarity",
          description: "Define what each dialogue can influence, decide, and escalate inside your institution.",
        },
        {
          title: "Facilitation Architecture",
          description:
            "Build participant composition and facilitation structures that create meaningful and balanced participation.",
        },
        {
          title: "Decision Traceability",
          description: "Create a transparent chain from dialogue input to real decisions, ownership, and implementation.",
        },
      ],
      examplesTitle: "Example Dialogues",
      examplesDescription: "Explore real dialogue sessions and practical examples from our field work.",
      exampleCardDescription: "View the full video dialogue example.",
      watchOnYoutube: "Watch on YouTube",
      channelsTitle: "Follow our official channels",
      channelsDescription: "Stay connected with upcoming dialogue stories, field examples, and public updates.",
      contactCta: "Contact us",
      directContactTitle: "Direct contact",
      directContactDescription:
        "We welcome municipalities, civic actors, schools, and institutions that want to strengthen trust and build peaceful collaboration through dialogue.",
    },
    about: {
      title: "About",
      heroTitle: "A dialogue platform dedicated to building trust and peace in public life.",
      intro:
        "The Dialogue Platform helps institutions navigate difficult conversations with legitimacy, transparency, and care. In collaboration with Nansen Peace Center and Lillestrom Municipality, our focus is to build civic trust, support peaceful coexistence, and strengthen democratic dialogue across communities.",
      principlesTitle: "Principles",
      principles: [
        {
          title: "Dialogue with clear purpose",
          description: "Each process is designed with explicit intent, scope, and shared expectations from the start.",
        },
        {
          title: "Inclusion with dignity",
          description: "We create conditions where people can participate safely, especially where trust has been damaged.",
        },
        {
          title: "Peace-focused practice",
          description: "We prioritize social cohesion, mutual respect, and constructive collaboration across differences.",
        },
      ],
      partnersTitle: "Collaboration partners",
      partnerLabel: "Partner",
      partnerDescription:
        "This collaboration supports practical, inclusive dialogue work that bridges communities and informs institutional decision-making.",
    },
    dialogues: {
      title: "Dialogues",
      heroTitle: "Structured dialogues designed for inclusion, trust, and concrete outcomes.",
      formats: [
        {
          title: "Public Assemblies",
          description: "Large-group forums for legitimacy-building and shared understanding around complex issues.",
        },
        {
          title: "Targeted Working Groups",
          description: "Focused sessions where institutions and stakeholders test options and identify practical pathways.",
        },
        {
          title: "Youth and Community Dialogues",
          description: "Inclusive formats designed to engage voices that are often missing from formal decision arenas.",
        },
        {
          title: "Cross-Institution Labs",
          description: "Collaborative spaces that align departments and partners around coordinated action.",
        },
      ],
      expectTitle: "What participants can expect",
      expectations: [
        "Clear purpose and boundaries for each session.",
        "Facilitation practices that protect respectful disagreement.",
        "Transparent documentation linking dialogue insights to institutional action.",
      ],
    },
    events: {
      title: "Events",
      heroTitle: "Convenings designed to strengthen relationships and civic confidence.",
      eventTypes: [
        {
          title: "Community Trust Forums",
          description: "Structured dialogues where institutions and residents engage around shared local concerns.",
        },
        {
          title: "Facilitator Practice Labs",
          description: "Capacity-building sessions for teams running dialogue in conflict-sensitive contexts.",
        },
        {
          title: "Institutional Briefings",
          description: "Decision-focused briefings that translate dialogue outcomes into practical next steps.",
        },
      ],
      calendarLabel: "Calendar status",
      calendarDescription:
        "New event dates are published as partner schedules are confirmed. If your institution wants to host a trust-focused dialogue workshop, we can scope it with you.",
      cta: "Discuss an event",
    },
    insights: {
      title: "Insights",
      heroTitle: "Practical knowledge for institutions working to build trust through dialogue.",
      insightTypes: [
        {
          title: "Dialogue Briefs",
          description: "Short briefs that help leaders understand major themes, tensions, and opportunities quickly.",
        },
        {
          title: "Trust and Peace Notes",
          description: "Reflections on what helps communities move from mistrust toward constructive engagement.",
        },
        {
          title: "Practice Playbooks",
          description: "Reusable process guides for institutions working with complex and sensitive public conversations.",
        },
      ],
      publicationLabel: "Publication status",
      publicationDescription:
        "Current insight publications are being prepared with transparent references to dialogue contexts, participants, and decision implications.",
    },
    contact: {
      title: "Let’s build inclusive dialogue and trust together.",
      intro:
        "We work with institutions, municipalities, and civil society partners to strengthen trust, social cohesion, and peace through dialogue.",
      directLabel: "Direct contact",
      collaborationLine: "In collaboration with Nansen Peace Center and Lillestrom Municipality, we support practical dialogue work that builds long-term civic trust.",
      firstMessageLabel: "Useful first message",
      firstMessageTopics: [
        "Designing dialogue processes for trust and peace",
        "Facilitation architecture for sensitive or contested issues",
        "Institutional learning and follow-up implementation",
      ],
      channelsTitle: "Official channels",
    },
  },
  no: {
    metadata: {
      siteDescription:
        "The Dialogue Platform bygger tillit og fred gjennom inkluderende, strukturert dialog i samarbeid med Nansen fredssenter og Lillestrom kommune.",
      keywords: [
        "dialog",
        "samfunnsdialog",
        "fredsbygging",
        "tillitsbygging",
        "styring",
        "medvirkning",
        "institusjonell utvikling",
        "kommuner",
        "Nansen fredssenter",
        "Lillestrom kommune",
      ],
    },
    home: {
      heroBadge: "Tillit og fred gjennom dialog",
      collaborationLine: "I samarbeid med",
      title: "Vi bygger inkluderende dialogsystemer som styrker tillit, samarbeid og fred.",
      description:
        "Plattformen hjelper institusjoner med å gjøre komplekse offentlige samtaler om til felles forståelse, praktiske beslutninger og varige relasjoner.",
      primaryCta: "Utforsk dialogformater",
      secondaryCta: "Les om vårt oppdrag",
      trustSectionTitle: "Hvorfor denne plattformen finnes",
      trustSectionDescription:
        "Lokalsamfunn trenger trygge arenaer der uenighet kan håndteres konstruktivt, institusjoner kan lytte med integritet, og beslutninger kan tas uten å utelate mennesker. Vi utvikler dialog som en langsiktig samfunnspraksis som bygger tillit, reduserer polarisering og støtter fredelig demokratisk deltakelse.",
      trustPillars: [
        {
          title: "Inkluderende deltakelse",
          description:
            "Vi designer dialoger der ulike stemmer blir hørt på en trygg og respektfull måte, også grupper som ofte blir ekskludert.",
        },
        {
          title: "Institusjonelt ansvar",
          description: "Hver prosess kobles til tydelige mandat, ansvarslinjer og dokumentert oppfølging.",
        },
        {
          title: "Fredsorienterte resultater",
          description:
            "Vi arbeider for mindre polarisering, sterkere sosial samhørighet og langsiktig tillit mellom mennesker og institusjoner.",
        },
      ],
      capabilitiesTitle: "Kjernekapasiteter",
      capabilities: [
        {
          title: "Mandatavklaring",
          description: "Avklar hva hver dialog kan påvirke, beslutte og løfte videre i institusjonen.",
        },
        {
          title: "Fasiliteringsarkitektur",
          description: "Bygg deltakersammensetning og fasilitering som gir balansert og meningsfull deltakelse.",
        },
        {
          title: "Sporbar beslutningstaking",
          description: "Skap en tydelig kobling fra dialoginnspill til beslutninger, ansvar og gjennomføring.",
        },
      ],
      examplesTitle: "Eksempler på dialoger",
      examplesDescription: "Utforsk reelle dialoger og praktiske eksempler fra vårt arbeid.",
      exampleCardDescription: "Se hele dialogeksemplet i videoformat.",
      watchOnYoutube: "Se på YouTube",
      channelsTitle: "Følg våre offisielle kanaler",
      channelsDescription: "Hold deg oppdatert på dialoghistorier, eksempler fra feltet og offentlige oppdateringer.",
      contactCta: "Kontakt oss",
      directContactTitle: "Direkte kontakt",
      directContactDescription:
        "Vi ønsker samarbeid med kommuner, skoler, sivilsamfunn og institusjoner som vil styrke tillit og fredelig samarbeid gjennom dialog.",
    },
    about: {
      title: "Om oss",
      heroTitle: "En dialogplattform som er dedikert til å bygge tillit og fred i samfunnslivet.",
      intro:
        "Plattformen hjelper institusjoner med krevende samtaler på en legitim, åpen og omsorgsfull måte. I samarbeid med Nansen fredssenter og Lillestrom kommune bygger vi samfunnstillit, støtter fredelig sameksistens og styrker demokratisk dialog.",
      principlesTitle: "Prinsipper",
      principles: [
        {
          title: "Dialog med tydelig formål",
          description: "Hver prosess utformes med klart formål, avgrensning og felles forventninger fra start.",
        },
        {
          title: "Inkludering med verdighet",
          description: "Vi skaper rammer for trygg deltakelse, spesielt der tilliten er svekket.",
        },
        {
          title: "Fredsorientert praksis",
          description: "Vi prioriterer sosial samhørighet, gjensidig respekt og konstruktivt samarbeid på tvers av ulikheter.",
        },
      ],
      partnersTitle: "Samarbeidspartnere",
      partnerLabel: "Partner",
      partnerDescription:
        "Samarbeidet støtter praktisk og inkluderende dialogarbeid som bygger broer mellom lokalsamfunn og styrker beslutningsprosesser.",
    },
    dialogues: {
      title: "Dialoger",
      heroTitle: "Strukturerte dialoger utviklet for inkludering, tillit og konkrete resultater.",
      formats: [
        {
          title: "Offentlige forsamlinger",
          description: "Store dialogarenaer for legitimitet og felles forståelse av komplekse spørsmål.",
        },
        {
          title: "Målrettede arbeidsgrupper",
          description: "Fokuserte økter der institusjoner og interessenter prøver ut alternativer.",
        },
        {
          title: "Ungdoms- og lokalsamfunnsdialoger",
          description: "Inkluderende formater som løfter frem stemmer som ofte mangler i formelle prosesser.",
        },
        {
          title: "Tverrinstitusjonelle laboratorier",
          description: "Samarbeidsarenaer som samler ulike enheter rundt koordinert handling.",
        },
      ],
      expectTitle: "Hva deltakere kan forvente",
      expectations: [
        "Tydelig formål og avgrensning for hver samling.",
        "Fasilitering som beskytter respektfull uenighet.",
        "Åpen dokumentasjon som kobler innsikter til institusjonelle tiltak.",
      ],
    },
    events: {
      title: "Arrangementer",
      heroTitle: "Samlinger som styrker relasjoner og tillit i lokalsamfunnet.",
      eventTypes: [
        {
          title: "Lokale tillitsforum",
          description: "Strukturerte samtaler der institusjoner og innbyggere møtes om felles utfordringer.",
        },
        {
          title: "Fasiliteringslaboratorier",
          description: "Kompetansebygging for team som leder dialog i krevende kontekster.",
        },
        {
          title: "Institusjonelle orienteringer",
          description: "Beslutningsnære oppsummeringer som omsetter dialogresultater til tiltak.",
        },
      ],
      calendarLabel: "Kalenderstatus",
      calendarDescription:
        "Nye datoer publiseres når partnernes planer er klare. Dersom din institusjon vil arrangere en tillitsfokusert dialogworkshop, kan vi planlegge den sammen.",
      cta: "Diskuter et arrangement",
    },
    insights: {
      title: "Innsikt",
      heroTitle: "Praktisk kunnskap for institusjoner som vil bygge tillit gjennom dialog.",
      insightTypes: [
        {
          title: "Dialognotater",
          description: "Korte oppsummeringer som hjelper ledere å forstå hovedtemaer og muligheter raskt.",
        },
        {
          title: "Notater om tillit og fred",
          description: "Refleksjoner om hva som hjelper lokalsamfunn fra mistillit til konstruktiv samhandling.",
        },
        {
          title: "Praksisveivisere",
          description: "Gjenbrukbare prosessverktøy for institusjoner med komplekse offentlige samtaler.",
        },
      ],
      publicationLabel: "Publiseringsstatus",
      publicationDescription:
        "Nye publikasjoner forberedes med tydelige referanser til kontekst, deltakelse og implikasjoner for beslutninger.",
    },
    contact: {
      title: "La oss bygge inkluderende dialog og tillit sammen.",
      intro:
        "Vi samarbeider med institusjoner, kommuner og sivilsamfunn for å styrke tillit, sosial sammenhengskraft og fred gjennom dialog.",
      directLabel: "Direkte kontakt",
      collaborationLine:
        "I samarbeid med Nansen fredssenter og Lillestrom kommune støtter vi praktisk dialogarbeid som bygger langsiktig samfunnstillit.",
      firstMessageLabel: "Nyttig første henvendelse",
      firstMessageTopics: [
        "Utforming av dialogprosesser for tillit og fred",
        "Fasiliteringsarkitektur for sensitive eller omstridte tema",
        "Institusjonell læring og oppfølging",
      ],
      channelsTitle: "Offisielle kanaler",
    },
  },
  ar: {
    metadata: {
      siteDescription:
        "تعمل منصة الحوار على بناء الثقة والسلام من خلال حوارات شاملة ومنظمة بالتعاون مع مركز نانسن للسلام وبلدية ليلستروم.",
      keywords: [
        "الحوار",
        "الحوار المجتمعي",
        "بناء السلام",
        "بناء الثقة",
        "الحوكمة",
        "المشاركة العامة",
        "التصميم المؤسسي",
        "البلديات",
        "مركز نانسن للسلام",
        "بلدية ليلستروم",
      ],
    },
    home: {
      heroBadge: "الثقة والسلام عبر الحوار",
      collaborationLine: "بالتعاون مع",
      title: "نبني أنظمة حوار شاملة تعزز الثقة والتعاون والسلام.",
      description:
        "تساعد منصة الحوار المؤسسات على تحويل النقاشات العامة المعقدة إلى فهم مشترك وقرارات عملية وعلاقات مجتمعية مستدامة.",
      primaryCta: "استكشف صيغ الحوار",
      secondaryCta: "تعرّف إلى رسالتنا",
      trustSectionTitle: "لماذا وُجدت هذه المنصة",
      trustSectionDescription:
        "تحتاج المجتمعات إلى مساحات موثوقة يمكن فيها إدارة الاختلاف بشكل بنّاء، وأن تستمع المؤسسات بصدق، وأن تُتخذ القرارات دون إقصاء أحد. نحن نصمم الحوار كممارسة مدنية طويلة الأمد تبني الثقة وتخفف الاستقطاب وتدعم الحياة الديمقراطية السلمية.",
      trustPillars: [
        {
          title: "مشاركة شاملة",
          description: "نصمم حوارات تُسمِع الأصوات المتنوعة بأمان واحترام، بما في ذلك الفئات التي غالباً ما تُستبعد.",
        },
        {
          title: "مساءلة مؤسسية",
          description: "ترتبط كل عملية بحوار بمسؤوليات واضحة وتفويض محدد وتوثيق دقيق للمتابعة.",
        },
        {
          title: "نتائج موجهة للسلام",
          description: "نركز على خفض الاستقطاب وتعزيز التماسك الاجتماعي وبناء ثقة طويلة الأمد بين الناس والمؤسسات.",
        },
      ],
      capabilitiesTitle: "القدرات الأساسية",
      capabilities: [
        {
          title: "وضوح التفويض",
          description: "تحديد ما يمكن لكل حوار التأثير فيه أو اتخاذ قرار بشأنه أو رفعه إلى مستويات أعلى.",
        },
        {
          title: "هندسة التيسير",
          description: "بناء تركيبة المشاركين وأساليب التيسير بما يضمن مشاركة متوازنة وفعالة.",
        },
        {
          title: "قابلية تتبّع القرار",
          description: "إنشاء رابط واضح بين مخرجات الحوار والقرارات الفعلية والمسؤوليات والتنفيذ.",
        },
      ],
      examplesTitle: "نماذج حوارية",
      examplesDescription: "اطّلع على جلسات حوارية حقيقية ونماذج تطبيقية من عملنا الميداني.",
      exampleCardDescription: "شاهد نموذج الحوار الكامل عبر الفيديو.",
      watchOnYoutube: "شاهد على يوتيوب",
      channelsTitle: "تابع قنواتنا الرسمية",
      channelsDescription: "ابقَ على اطلاع على قصص الحوار وأمثلة الممارسة والتحديثات العامة.",
      contactCta: "تواصل معنا",
      directContactTitle: "تواصل مباشر",
      directContactDescription:
        "نرحب بالتعاون مع البلديات والمدارس والجهات المدنية والمؤسسات الراغبة في تعزيز الثقة وبناء تعاون سلمي عبر الحوار.",
    },
    about: {
      title: "من نحن",
      heroTitle: "منصة حوار مكرسة لبناء الثقة والسلام في الحياة العامة.",
      intro:
        "تساعد منصة الحوار المؤسسات على إدارة المحادثات الصعبة بقدر عالٍ من الشرعية والشفافية والعناية. وبالتعاون مع مركز نانسن للسلام وبلدية ليلستروم، نركز على تعزيز الثقة المجتمعية ودعم التعايش السلمي وتطوير الحوار الديمقراطي.",
      principlesTitle: "مبادئنا",
      principles: [
        {
          title: "حوار له غاية واضحة",
          description: "كل عملية تُصمم بهدف محدد ونطاق واضح وتوقعات مشتركة منذ البداية.",
        },
        {
          title: "شمول يحفظ الكرامة",
          description: "نهيئ ظروفاً آمنة للمشاركة، خصوصاً في البيئات التي تضررت فيها الثقة.",
        },
        {
          title: "ممارسة موجهة للسلام",
          description: "نعطي الأولوية للتماسك الاجتماعي والاحترام المتبادل والتعاون البنّاء عبر الاختلافات.",
        },
      ],
      partnersTitle: "شركاء التعاون",
      partnerLabel: "شريك",
      partnerDescription:
        "يسهم هذا التعاون في دعم ممارسات حوارية عملية وشاملة تبني جسوراً بين المجتمعات وتدعم اتخاذ القرار المؤسسي.",
    },
    dialogues: {
      title: "الحوارات",
      heroTitle: "حوارات منظمة مصممة للشمول والثقة وتحقيق نتائج ملموسة.",
      formats: [
        {
          title: "الملتقيات العامة",
          description: "مساحات حوارية واسعة لبناء الشرعية وصناعة فهم مشترك للقضايا المعقدة.",
        },
        {
          title: "مجموعات العمل المتخصصة",
          description: "جلسات مركزة تختبر الخيارات وتحدد مسارات عملية للتنفيذ.",
        },
        {
          title: "حوارات الشباب والمجتمع",
          description: "صيغ شاملة تفتح المجال للأصوات التي غالباً ما تغيب عن المسارات الرسمية.",
        },
        {
          title: "مختبرات بين المؤسسات",
          description: "مساحات تعاون تُنسق جهود الجهات المختلفة حول عمل مشترك.",
        },
      ],
      expectTitle: "ما الذي يمكن أن يتوقعه المشاركون",
      expectations: [
        "وضوح الهدف والحدود لكل جلسة.",
        "تيسير يحمي الاختلاف المحترم ويمنع الاستقطاب.",
        "توثيق شفاف يربط مخرجات الحوار بالإجراءات المؤسسية.",
      ],
    },
    events: {
      title: "الفعاليات",
      heroTitle: "فعاليات مصممة لتعزيز العلاقات والثقة المدنية.",
      eventTypes: [
        {
          title: "منتديات الثقة المجتمعية",
          description: "حوارات منظمة تجمع المؤسسات والسكان حول القضايا المحلية المشتركة.",
        },
        {
          title: "مختبرات الميسّرين",
          description: "برامج بناء قدرات للفرق التي تقود الحوار في السياقات الحساسة.",
        },
        {
          title: "إحاطات مؤسسية",
          description: "عروض موجزة موجهة للقرار تُحوّل نتائج الحوار إلى خطوات عملية.",
        },
      ],
      calendarLabel: "حالة الجدول",
      calendarDescription:
        "يتم نشر المواعيد الجديدة فور اعتماد جداول الشركاء. إذا رغبت مؤسستك في استضافة ورشة حوارية تركز على بناء الثقة، يمكننا تصميمها معاً.",
      cta: "ناقش فعالية",
    },
    insights: {
      title: "المعارف",
      heroTitle: "معرفة عملية للمؤسسات الساعية إلى بناء الثقة عبر الحوار.",
      insightTypes: [
        {
          title: "موجزات الحوار",
          description: "موجزات قصيرة تساعد القيادات على فهم القضايا والفرص الرئيسية بسرعة.",
        },
        {
          title: "ملاحظات الثقة والسلام",
          description: "تحليلات حول ما يساعد المجتمعات على الانتقال من انعدام الثقة إلى التعاون البنّاء.",
        },
        {
          title: "أدلة الممارسة",
          description: "أدوات عملية قابلة للتكرار للمؤسسات التي تعمل في الحوارات العامة المعقدة.",
        },
      ],
      publicationLabel: "حالة النشر",
      publicationDescription:
        "يجري إعداد منشورات جديدة مع مراجع واضحة لسياق الحوار والمشاركين والآثار المتصلة بالقرار.",
    },
    contact: {
      title: "لنبنِ معاً حواراً شاملاً وثقة مستدامة.",
      intro:
        "نتعاون مع المؤسسات والبلديات ومنظمات المجتمع المدني لتعزيز الثقة والتماسك الاجتماعي والسلام من خلال الحوار.",
      directLabel: "تواصل مباشر",
      collaborationLine:
        "بالتعاون مع مركز نانسن للسلام وبلدية ليلستروم، ندعم ممارسات حوارية عملية تبني ثقة مدنية طويلة الأمد.",
      firstMessageLabel: "ما الذي يفيد في الرسالة الأولى",
      firstMessageTopics: [
        "تصميم عمليات حوار لبناء الثقة والسلام",
        "هندسة التيسير للقضايا الحساسة أو محل الخلاف",
        "التعلم المؤسسي وآليات المتابعة",
      ],
      channelsTitle: "القنوات الرسمية",
    },
  },
};
