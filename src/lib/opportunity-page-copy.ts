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
        "Denne live-katalogen samler bare offisielle kilder fra myndigheter, universiteter, stiftelser, FN og andre verifiserte institusjoner. Tidsstemplene viser siste kildekontroll fra The Dialogue Platform, ikke nødvendigvis den opprinnelige publiseringsdatoen. The Dialogue Platform mottar ikke søknader eller betalinger; søk alltid direkte ved den opprinnelige kilden.",
      snapshotLabel: "Siste kildekontroll",
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
        "يعرض هذا الدليل المباشر فقط مصادر رسمية صادرة عن الحكومات والجامعات والمؤسسات والجهات المانحة والأمم المتحدة أو الجهات التي تم التحقق منها مؤسسياً. وتُظهر الطوابع الزمنية آخر فحص للمصدر من قبل منصة الحوار، وليس بالضرورة تاريخ النشر الأصلي للفرصة. منصة الحوار لا تستقبل الطلبات ولا الرسوم؛ قدّموا دائماً عبر المصدر الأصلي مباشرة.",
      snapshotLabel: "آخر فحص للمصدر",
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
      "This live directory curates only official government, university, foundation, UN, and institutionally verified sources. Timestamps reflect The Dialogue Platform's latest source check, not necessarily the original publication date of a programme. The Dialogue Platform does not collect applications or fees; always apply at the original source.",
    snapshotLabel: "Latest source check",
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
      title: "Verifiserte finansieringsveier for organisasjoner, institusjoner og samfunnsnyttige initiativer",
      description:
        "Denne demoversjonen samler legitime finansieringsportaler, utlysninger og programruter fra myndigheter, bistandsetater, stiftelser, regionale institusjoner, FN og andre betrodde organisasjoner. Oppføringene dekker organisasjoner, universiteter, forskningsmiljøer, lokalsamfunnsgrupper og andre kvalifiserte initiativer på tvers av land og sektorer, og hver oppføring peker til den opprinnelige kilden slik at søkere kan kontrollere krav og søke direkte.",
      feed,
      supportTitle: "Slik bruker dere seksjonen best",
      supportCards: [
        {
          title: "Sjekk kravene først",
          description:
            "Les alltid hvem som kan søke, hvilke land eller institusjonstyper som er kvalifisert, og om utlysningen krever registrering, partnerstruktur eller tematisk relevans.",
        },
        {
          title: "Hold organisasjonsmappen klar",
          description:
            "Ha registreringsbevis, styringsstruktur, bankopplysninger, tidligere resultater, etterlevelsesdokumenter og en kort organisasjonsprofil klare for opplasting.",
        },
        {
          title: "Søk bare ved den opprinnelige kilden",
          description:
            "Bruk alltid den offisielle portalen eller programlenken i oppføringen. Ikke betal agenter eller mellomledd for tilgang, registrering eller raskere behandling.",
        },
      ],
      crossLink: {
        title: "Legg til stipend- og akademiske muligheter",
        description:
          "Mange organisasjoner arbeider samtidig med studenter, forskere, forelesere og fagpersoner. Derfor bruker stipendseksjonen den samme verifiserte modellen med direkte lenker til kilden.",
        href: "/scholarships",
        cta: "Åpne stipendseksjonen",
      },
    };
  }

  if (locale === "ar") {
    return {
      badge: "مكتب التمويل المباشر",
      title: "مسارات تمويل موثقة للمنظمات والمؤسسات والمبادرات ذات النفع العام",
      description:
        "تجمع هذه النسخة التجريبية بوابات التمويل والدعوات الرسمية ومسارات البرامج الصادرة عن الحكومات ووكالات التمويل والمؤسسات المانحة والجهات الإقليمية والأمم المتحدة وغيرها من الجهات الموثوقة. وتشمل الفرص منظمات وجامعات وفرقاً بحثية ومبادرات مجتمعية وغيرها من الجهات المؤهلة عبر بلدان وقطاعات متعددة، مع رابط مباشر إلى المصدر الأصلي حتى يتمكن المتقدم من مراجعة الشروط والتقديم بنفسه.",
      feed,
      supportTitle: "كيف تستخدمون هذا القسم بشكل أفضل",
      supportCards: [
        {
          title: "تحققوا من الأهلية أولاً",
          description:
            "اقرأوا دائماً من يحق له التقديم، وما هي الدول أو أنواع المؤسسات المؤهلة، وما إذا كانت الفرصة تتطلب تسجيلاً قانونياً أو شركاء أو نطاقاً موضوعياً محدداً.",
        },
        {
          title: "جهزوا ملف المؤسسة",
          description:
            "احتفظوا بوثائق التسجيل والحوكمة والمعلومات البنكية ونتائج العمل السابقة ووثائق الامتثال وملف تعريفي مختصر عن الجهة في صيغة جاهزة للرفع.",
        },
        {
          title: "قدّموا فقط عبر المصدر الأصلي",
          description:
            "استخدموا دائماً البوابة الرسمية أو رابط البرنامج الأصلي الموجود في الفرصة. لا تدفعوا لوكلاء أو وسطاء مقابل الوصول أو التسجيل أو تسريع المعاملة.",
        },
      ],
      crossLink: {
        title: "أضيفوا أيضاً مسارات المنح والفرص الأكاديمية",
        description:
          "كثير من المنظمات تعمل كذلك مع الطلاب والباحثين والمحاضرين والمهنيين، لذلك يستخدم قسم المنح نفس منهج التحقق والربط المباشر بالمصدر.",
        href: "/scholarships",
        cta: "افتح قسم المنح الدراسية",
      },
    };
  }

  return {
    badge: "Direct Funding Desk",
    title: "Verified funding routes for organisations, institutions, and public-interest initiatives",
    description:
      "This demo brings together legitimate funding portals, open calls, and programme routes from governments, donor agencies, foundations, regional institutions, the UN, and other trusted organisations. The listings cover organisations, universities, research teams, community groups, and other eligible initiatives across countries and sectors, and every entry points to the original source so applicants can review eligibility and apply directly.",
    feed,
    supportTitle: "How to use this section well",
    supportCards: [
      {
        title: "Check eligibility before you prepare",
        description:
          "Always read who can apply, which countries or institution types are eligible, and whether the opportunity requires registration, partners, or a specific thematic fit.",
      },
      {
        title: "Keep your organisational file ready",
        description:
          "Have registration documents, governance details, bank information, prior results, compliance papers, and a short institutional profile ready to upload.",
      },
      {
        title: "Apply only through the original source",
        description:
          "Use the official portal or programme link in the listing every time. Do not pay agents or intermediaries for access, registration, or faster processing.",
      },
    ],
    crossLink: {
      title: "Add scholarships and academic pathways too",
      description:
        "Many organisations also support students, lecturers, researchers, and professionals. The scholarships section follows the same verified-source, direct-application approach.",
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
      title: "Verifiserte stipend- og akademiske veier for globale søkere",
      description:
        "Denne demoversjonen samler legitime stipendkilder og akademiske muligheter for studenter, forskere, forelesere, fagpersoner og flyktningsøkere. Oppføringene peker til offisielle sider fra universiteter, myndigheter, stiftelser, EU, FN og andre programmer slik at folk kan kontrollere kravene og søke direkte.",
      feed,
      supportTitle: "Hva søkere bør forberede",
      supportCards: [
        {
          title: "Bygg en komplett akademisk søknadsmappe",
          description:
            "Hold vitnemål, karakterutskrifter, CV, motivasjonsbrev, anbefalingsbrev, språkbevis og eventuelle forskningsskisser eller profesjonelle attester klare i digital form.",
        },
        {
          title: "Les kriteriene ved kilden",
          description:
            "Sjekk alltid statsborgerskap, bosted, gradsnivå, fagfelt, språkkrav og institusjonelle betingelser på den offisielle siden for programmet.",
        },
        {
          title: "Unngå stipendsvindel",
          description:
            "Legitime stipend krever ikke betaling for nominasjon, shortlist eller garantert opptak. Hvis noen ber om penger for tilgang, gå tilbake til den offisielle lenken i oppføringen.",
        },
      ],
      crossLink: {
        title: "Tilbake til finansiering for organisasjoner",
        description:
          "Hvis behovet gjelder organisasjonsutvikling, forskning, lokalsamfunnsprosjekter eller institusjonell finansiering, ligger de verifiserte rutene i finansieringsseksjonen.",
        href: "/funding",
        cta: "Åpne finansiering",
      },
    };
  }

  if (locale === "ar") {
    return {
      badge: "مكتب الفرص الأكاديمية",
      title: "مسارات منح وفرص أكاديمية موثقة للمتقدمين من مختلف الخلفيات",
      description:
        "تجمع هذه النسخة التجريبية مصادر منح وفرص أكاديمية شرعية للطلاب والباحثين والمحاضرين والمهنيين وكذلك المتقدمين من اللاجئين. جميع الروابط تقود إلى صفحات رسمية صادرة عن جامعات أو حكومات أو مؤسسات مانحة أو جهات أوروبية أو أممية أو برامج معترف بها حتى يتمكن المتقدم من التحقق والتقديم مباشرة.",
      feed,
      supportTitle: "ما الذي ينبغي على المتقدم تحضيره",
      supportCards: [
        {
          title: "ابنوا ملفاً أكاديمياً كاملاً",
          description:
            "احتفظوا بالشهادات والسجلات الأكاديمية والسيرة الذاتية ورسالة الدافع وخطابات التوصية وإثبات اللغة وأي مقترح بحث أو خبرة مهنية ذات صلة بصيغة رقمية جاهزة.",
        },
        {
          title: "اقرأوا المعايير من المصدر",
          description:
            "تحققوا دائماً من الجنسية أو بلد الإقامة ومستوى الدرجة والتخصص ومتطلبات اللغة والشروط المؤسسية من الصفحة الرسمية الخاصة بالبرنامج.",
        },
        {
          title: "تجنبوا الاحتيال في المنح",
          description:
            "المنح الشرعية لا تطلب رسوماً مقابل الترشيح أو الإدراج في القائمة القصيرة أو ضمان القبول. إذا طلب أحد المال، عودوا إلى الرابط الرسمي الموجود في الفرصة.",
        },
      ],
      crossLink: {
        title: "العودة إلى تمويل المنظمات والمؤسسات",
        description:
          "إذا كان الاحتياج يتعلق بتمويل المنظمات أو المشاريع المجتمعية أو البحث المؤسسي أو المبادرات العامة، فالمسارات الموثقة موجودة في قسم التمويل.",
        href: "/funding",
        cta: "افتح التمويل",
      },
    };
  }

  return {
    badge: "Academic Opportunity Desk",
    title: "Verified scholarships and academic pathways for global applicants",
    description:
      "This demo gathers legitimate scholarship and academic opportunity sources for students, researchers, lecturers, professionals, and refugee applicants. Listings point to official university, government, foundation, EU, UN, and programme pages so people can verify eligibility and apply directly.",
    feed,
    supportTitle: "What applicants should prepare",
    supportCards: [
      {
        title: "Build a complete academic file",
        description:
          "Keep certificates, transcripts, CV, motivation letter, recommendation letters, language scores, and any relevant research proposal or professional records ready in digital form.",
      },
      {
        title: "Read the official criteria at source",
        description:
          "Always check citizenship, residency, degree level, subject area, language requirements, and institutional conditions on the official programme page.",
      },
      {
        title: "Avoid scholarship scams and agents",
        description:
          "Legitimate scholarships do not charge people for nomination, shortlisting, or guaranteed admission. If anyone asks for money, return to the official link in the listing.",
      },
    ],
    crossLink: {
      title: "Go back to organisation and institutional funding",
      description:
        "If the need is organisational growth, research support, public-interest programming, or institutional funding, the sister funding section follows the same verified-source rule.",
      href: "/funding",
      cta: "Open funding",
    },
  };
}
