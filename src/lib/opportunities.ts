import type { Locale } from "@/lib/i18n/config";

export type OpportunityStatus = "open" | "rolling" | "seasonal" | "closed";

export type OpportunityKind = "call" | "portal" | "programme";

export type OpportunityTimestampKind = "published" | "verified" | "updated";

export type OpportunityItem = {
  id: string;
  title: string;
  url: string;
  source: string;
  sourceUrl?: string;
  summary: string;
  audience: string;
  geography: string;
  verificationNote: string;
  timestamp: string;
  timestampKind: OpportunityTimestampKind;
  deadline?: string;
  status: OpportunityStatus;
  kind: OpportunityKind;
  tags: string[];
};

type LocalizedString = Record<Locale, string>;
type LocalizedTags = Record<Locale, string[]>;

type OpportunityEntry = Omit<
  OpportunityItem,
  "title" | "source" | "summary" | "audience" | "geography" | "verificationNote" | "tags"
> & {
  title: LocalizedString;
  source: LocalizedString;
  summary: LocalizedString;
  audience: LocalizedString;
  geography: LocalizedString;
  verificationNote: LocalizedString;
  tags: LocalizedTags;
};

function text(en: string, no: string, ar: string): LocalizedString {
  return { en, no, ar };
}

function tags(en: string[], no: string[], ar: string[]): LocalizedTags {
  return { en, no, ar };
}

function localizeEntry(entry: OpportunityEntry, locale: Locale): OpportunityItem {
  return {
    ...entry,
    title: entry.title[locale],
    source: entry.source[locale],
    summary: entry.summary[locale],
    audience: entry.audience[locale],
    geography: entry.geography[locale],
    verificationNote: entry.verificationNote[locale],
    tags: entry.tags[locale],
  };
}

export const opportunitiesSnapshotAt = "2026-04-22T09:00:00Z";

const fundingOpportunityEntries: OpportunityEntry[] = [
  {
    id: "un-partner-portal",
    title: text(
      "UN Partner Portal partnership opportunities",
      "Partnerskapsmuligheter i UN Partner Portal",
      "فرص الشراكة في بوابة شركاء الأمم المتحدة",
    ),
    url: "https://www.unpartnerportal.org/landing/opportunities/",
    source: text("UN Partner Portal", "UN Partner Portal", "بوابة شركاء الأمم المتحدة"),
    summary: text(
      "Official inter-agency portal where NGOs, community-based organisations, and academic institutions can access direct partnership opportunities from participating UN agencies.",
      "Offisiell portal på tvers av FN-systemet der frivillige organisasjoner, lokalsamfunnsorganisasjoner og akademiske institusjoner kan få direkte tilgang til partnerskapsmuligheter fra deltakende FN-organer.",
      "بوابة رسمية مشتركة بين وكالات الأمم المتحدة تتيح للمنظمات غير الحكومية والمنظمات المجتمعية والمؤسسات الأكاديمية الوصول مباشرة إلى فرص الشراكة الصادرة عن الوكالات المشاركة.",
    ),
    audience: text(
      "NGOs, community organisations, academic institutions, and eligible civil-society partners applying directly to UN agencies.",
      "Frivillige organisasjoner, lokalsamfunnsorganisasjoner, akademiske institusjoner og andre kvalifiserte sivilsamfunnspartnere som søker direkte til FN-organer.",
      "المنظمات غير الحكومية والمنظمات المجتمعية والمؤسسات الأكاديمية وشركاء المجتمع المدني المؤهلون الذين يتقدمون مباشرة إلى وكالات الأمم المتحدة.",
    ),
    geography: text("Global", "Globalt", "عالمي"),
    verificationNote: text(
      "Official UN partnership platform used by agencies including UNHCR, UNICEF, WFP, WHO, IOM, and UN Women.",
      "Offisiell FN-plattform for partnerskap brukt av blant annet UNHCR, UNICEF, WFP, WHO, IOM og UN Women.",
      "منصة رسمية للشراكات داخل الأمم المتحدة تستخدمها جهات مثل المفوضية السامية لشؤون اللاجئين واليونيسف وبرنامج الأغذية العالمي ومنظمة الصحة العالمية والمنظمة الدولية للهجرة وهيئة الأمم المتحدة للمرأة.",
    ),
    timestamp: opportunitiesSnapshotAt,
    timestampKind: "verified",
    status: "open",
    kind: "portal",
    tags: tags(
      ["UN", "Partnerships", "NGOs", "Academic institutions"],
      ["FN", "Partnerskap", "Frivillige organisasjoner", "Akademiske institusjoner"],
      ["الأمم المتحدة", "شراكات", "منظمات غير حكومية", "مؤسسات أكاديمية"],
    ),
  },
  {
    id: "eu-funding-tenders-portal",
    title: text(
      "EU Funding & Tenders Portal",
      "EUs portal for finansiering og anbud",
      "بوابة الاتحاد الأوروبي للتمويل والمناقصات",
    ),
    url: "https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/home",
    source: text("European Commission", "Europakommisjonen", "المفوضية الأوروبية"),
    summary: text(
      "Official European Commission portal for grants, tenders, prizes, and research or civil-society funding opportunities across EU programmes.",
      "Europakommisjonens offisielle portal for tilskudd, anbud, priser og finansieringsmuligheter innen forskning og sivilsamfunn på tvers av EU-programmer.",
      "البوابة الرسمية للمفوضية الأوروبية الخاصة بالمنح والمناقصات والجوائز وفرص التمويل في مجالات البحث والمجتمع المدني عبر برامج الاتحاد الأوروبي.",
    ),
    audience: text(
      "Organisations, universities, municipalities, research teams, businesses, and public-interest institutions seeking EU-managed opportunities.",
      "Organisasjoner, universiteter, kommuner, forskningsmiljøer, bedrifter og samfunnsnyttige institusjoner som søker EU-forvaltede muligheter.",
      "المنظمات والجامعات والبلديات والفرق البحثية والشركات والمؤسسات ذات النفع العام التي تبحث عن فرص يديرها الاتحاد الأوروبي.",
    ),
    geography: text(
      "Europe and international programmes",
      "Europa og internasjonale programmer",
      "أوروبا وبرامج دولية",
    ),
    verificationNote: text(
      "Official European Commission entry point for browsing funding and tender opportunities managed through the Funding & Tenders Portal.",
      "Offisiell inngang fra Europakommisjonen for å bla i finansierings- og anbudsmuligheter som administreres gjennom portalen.",
      "نقطة الدخول الرسمية من المفوضية الأوروبية لتصفح فرص التمويل والمناقصات التي تُدار عبر هذه البوابة.",
    ),
    timestamp: opportunitiesSnapshotAt,
    timestampKind: "verified",
    status: "rolling",
    kind: "portal",
    tags: tags(
      ["European Union", "Grants", "Tenders", "Research"],
      ["EU", "Tilskudd", "Anbud", "Forskning"],
      ["الاتحاد الأوروبي", "منح", "مناقصات", "بحث"],
    ),
  },
  {
    id: "grants-gov-search",
    title: text(
      "Grants.gov Search Grants",
      "Grants.gov søk etter tilskudd",
      "البحث عن المنح في Grants.gov",
    ),
    url: "https://www.grants.gov/search-grants.htm",
    source: text("Grants.gov", "Grants.gov", "Grants.gov"),
    summary: text(
      "Official U.S. federal grants search portal with filters for eligibility, agency, status, and applicant type, including some opportunities open to international and nonprofit applicants.",
      "Offisiell amerikansk portal for søk i føderale tilskudd, med filtre for kvalifikasjon, etat, status og søkertype, inkludert enkelte muligheter som er åpne for internasjonale og ideelle søkere.",
      "البوابة الرسمية للبحث في المنح الفيدرالية الأمريكية، مع فلاتر للأهلية والجهة المانحة والحالة ونوع المتقدم، وتشمل بعض الفرص المفتوحة لجهات دولية وغير ربحية.",
    ),
    audience: text(
      "Nonprofits, universities, public entities, researchers, and eligible organisations searching U.S. federal opportunities.",
      "Ideelle organisasjoner, universiteter, offentlige enheter, forskere og andre kvalifiserte organisasjoner som søker etter føderale amerikanske muligheter.",
      "المنظمات غير الربحية والجامعات والجهات العامة والباحثون والمنظمات المؤهلة التي تبحث عن فرص فيدرالية أمريكية.",
    ),
    geography: text(
      "United States and eligible international applicants by call",
      "USA og internasjonale søkere når utlysningen tillater det",
      "الولايات المتحدة والمتقدمون الدوليون المؤهلون بحسب كل فرصة",
    ),
    verificationNote: text(
      "Official U.S. government grants portal for finding and applying to federal funding opportunities.",
      "Offisiell amerikansk myndighetsportal for å finne og søke på føderale finansieringsmuligheter.",
      "البوابة الرسمية لحكومة الولايات المتحدة للعثور على فرص التمويل الفيدرالي والتقديم لها.",
    ),
    timestamp: opportunitiesSnapshotAt,
    timestampKind: "verified",
    status: "open",
    kind: "portal",
    tags: tags(
      ["United States", "Federal grants", "Nonprofits", "Universities"],
      ["USA", "Føderale tilskudd", "Ideelle organisasjoner", "Universiteter"],
      ["الولايات المتحدة", "منح فيدرالية", "منظمات غير ربحية", "جامعات"],
    ),
  },
  {
    id: "sam-assistance-listings",
    title: text(
      "SAM.gov Assistance Listings",
      "SAM.gov oversikt over støtteordninger",
      "قوائم المساعدات في SAM.gov",
    ),
    url: "https://sam.gov/assistance-listings",
    source: text("SAM.gov", "SAM.gov", "SAM.gov"),
    summary: text(
      "Official U.S. federal assistance catalogue covering grants, loans, scholarships, insurance, and other assistance programmes across agencies.",
      "Offisiell amerikansk katalog over føderale støtteordninger som dekker tilskudd, lån, stipend, forsikringsordninger og andre støtteprogrammer på tvers av etater.",
      "الدليل الرسمي لبرامج المساعدات الفيدرالية الأمريكية، ويشمل المنح والقروض والمنح الدراسية والتأمين وغيرها من برامج الدعم عبر الجهات الحكومية المختلفة.",
    ),
    audience: text(
      "Individuals, nonprofits, public bodies, and institutions reviewing official federal assistance programmes before applying through the right source.",
      "Enkeltpersoner, ideelle organisasjoner, offentlige organer og institusjoner som vil vurdere offisielle føderale støtteprogrammer før de søker gjennom riktig kanal.",
      "الأفراد والمنظمات غير الربحية والجهات العامة والمؤسسات التي تراجع برامج المساعدات الفيدرالية الرسمية قبل التقديم عبر الجهة الصحيحة.",
    ),
    geography: text(
      "United States and programme-specific eligibility territories",
      "USA og områder som omfattes av det enkelte programmet",
      "الولايات المتحدة والمناطق المؤهلة بحسب كل برنامج",
    ),
    verificationNote: text(
      "Official U.S. government assistance listings catalogue that points users to eligible programme routes and partner application systems.",
      "Offisiell amerikansk katalog over støtteordninger som peker brukere videre til kvalifiserte programmer og tilhørende søknadssystemer.",
      "فهرس رسمي لبرامج المساعدات الحكومية الأمريكية يوجّه المستخدمين إلى المسارات الصحيحة للتقديم والأنظمة المعتمدة لكل برنامج.",
    ),
    timestamp: opportunitiesSnapshotAt,
    timestampKind: "verified",
    status: "rolling",
    kind: "portal",
    tags: tags(
      ["United States", "Assistance", "Scholarships", "Government"],
      ["USA", "Støtteordninger", "Stipender", "Myndigheter"],
      ["الولايات المتحدة", "مساعدات", "منح دراسية", "حكومة"],
    ),
  },
  {
    id: "ukri-funding-finder",
    title: text(
      "UKRI Apply for Funding",
      "UKRI søk om finansiering",
      "التقديم على التمويل عبر UKRI",
    ),
    url: "https://www.ukri.org/apply-for-funding/",
    source: text("UK Research and Innovation", "UK Research and Innovation", "هيئة الأبحاث والابتكار في المملكة المتحدة"),
    summary: text(
      "Official funding route for UKRI opportunities across research councils and Innovate UK, including current calls, guidance, and eligibility checks.",
      "Offisiell finansieringsinngang for muligheter i UKRI på tvers av forskningsråd og Innovate UK, med aktive utlysninger, veiledning og kvalifikasjonskrav.",
      "المسار الرسمي لفرص التمويل التابعة لـ UKRI عبر مجالس الأبحاث وInnovate UK، ويتضمن الدعوات الحالية والإرشادات وشروط الأهلية.",
    ),
    audience: text(
      "Universities, researchers, approved organisations, innovation teams, and eligible collaborators looking for UK research and innovation funding.",
      "Universiteter, forskere, godkjente organisasjoner, innovasjonsteam og kvalifiserte samarbeidspartnere som søker britisk forsknings- og innovasjonsfinansiering.",
      "الجامعات والباحثون والمنظمات المعتمدة وفرق الابتكار والشركاء المؤهلون الذين يبحثون عن تمويل بريطاني للبحث والابتكار.",
    ),
    geography: text(
      "United Kingdom with programme-specific international eligibility",
      "Storbritannia med internasjonal kvalifikasjon der programmet tillater det",
      "المملكة المتحدة مع أهلية دولية بحسب كل برنامج",
    ),
    verificationNote: text(
      "Official UKRI funding page linking directly to current funding opportunities and application guidance.",
      "Offisiell finansieringsside fra UKRI med direkte lenker til aktuelle muligheter og søknadsveiledning.",
      "صفحة التمويل الرسمية لـ UKRI، وتربط مباشرة بالفرص الحالية وإرشادات التقديم.",
    ),
    timestamp: opportunitiesSnapshotAt,
    timestampKind: "verified",
    status: "open",
    kind: "portal",
    tags: tags(
      ["United Kingdom", "Research", "Innovation", "Universities"],
      ["Storbritannia", "Forskning", "Innovasjon", "Universiteter"],
      ["المملكة المتحدة", "بحث", "ابتكار", "جامعات"],
    ),
  },
  {
    id: "wellcome-funding-schemes",
    title: text(
      "Wellcome funding opportunities",
      "Finansieringsmuligheter fra Wellcome",
      "فرص التمويل من Wellcome",
    ),
    url: "https://wellcome.org/grant-funding/schemes",
    source: text("Wellcome", "Wellcome", "Wellcome"),
    summary: text(
      "Official opportunity finder for Wellcome research funding, with filters for career stage, status, and programme area across health and wellbeing research.",
      "Offisiell oversikt over forskningsfinansiering fra Wellcome, med filtre for karrieretrinn, status og programområde innen helse og trivsel.",
      "أداة رسمية لاستعراض فرص تمويل الأبحاث من Wellcome، مع فلاتر للمرحلة المهنية والحالة ومجال البرنامج عبر أبحاث الصحة والرفاه.",
    ),
    audience: text(
      "Researchers and eligible host organisations looking for foundation funding in health, science, and related disciplines.",
      "Forskere og kvalifiserte vertsinstitusjoner som søker stiftelsesfinansiering innen helse, vitenskap og relaterte fagfelt.",
      "الباحثون والمؤسسات المضيفة المؤهلة التي تبحث عن تمويل مؤسسي في مجالات الصحة والعلوم والتخصصات المرتبطة بها.",
    ),
    geography: text(
      "Global, subject to scheme eligibility",
      "Globalt, avhengig av ordningens kvalifikasjonskrav",
      "عالمي، وفق أهلية كل مسار تمويلي",
    ),
    verificationNote: text(
      "Official Wellcome funding schemes page showing open, upcoming, and closed opportunities with eligibility details.",
      "Offisiell oversiktsside fra Wellcome som viser åpne, kommende og stengte muligheter med detaljer om kvalifikasjon.",
      "الصفحة الرسمية لمسارات التمويل في Wellcome، وتعرض الفرص المفتوحة والقادمة والمغلقة مع تفاصيل الأهلية.",
    ),
    timestamp: opportunitiesSnapshotAt,
    timestampKind: "verified",
    status: "seasonal",
    kind: "portal",
    tags: tags(
      ["Foundation funding", "Research", "Health", "Global"],
      ["Stiftelsesfinansiering", "Forskning", "Helse", "Globalt"],
      ["تمويل مؤسسي", "بحث", "صحة", "عالمي"],
    ),
  },
  {
    id: "nih-explore-opportunities",
    title: text(
      "NIH Explore Grant Opportunities",
      "NIH oversikt over tilskuddsmuligheter",
      "استكشاف فرص المنح عبر NIH",
    ),
    url: "https://www.grants.nih.gov/funding/explore-nih-opportunities",
    source: text(
      "National Institutes of Health",
      "National Institutes of Health",
      "المعاهد الوطنية للصحة",
    ),
    summary: text(
      "Official NIH search route for grant opportunities, with NIH-specific filters that connect applicants to current notices published through Grants.gov.",
      "Offisiell NIH-inngang for søk etter tilskuddsmuligheter, med NIH-spesifikke filtre som leder søkere til aktuelle kunngjøringer publisert via Grants.gov.",
      "المسار الرسمي لـ NIH للبحث عن فرص المنح، ويشمل فلاتر خاصة بالمعاهد الوطنية للصحة تربط المتقدمين بالإعلانات الحالية المنشورة عبر Grants.gov.",
    ),
    audience: text(
      "Researchers, universities, medical institutions, and eligible organisations pursuing biomedical and health-related funding.",
      "Forskere, universiteter, medisinske institusjoner og kvalifiserte organisasjoner som søker finansiering innen biomedisin og helse.",
      "الباحثون والجامعات والمؤسسات الطبية والمنظمات المؤهلة التي تسعى إلى تمويل في مجالات الطب الحيوي والصحة.",
    ),
    geography: text(
      "United States with programme-specific foreign applicant eligibility",
      "USA med utenlandsk kvalifikasjon der programmet tillater det",
      "الولايات المتحدة مع أهلية للمتقدمين الأجانب بحسب كل برنامج",
    ),
    verificationNote: text(
      "Official NIH funding page explaining that Grants.gov is the single official source for NIH grant opportunity notices.",
      "Offisiell finansieringsside fra NIH som forklarer at Grants.gov er den eneste offisielle kilden for kunngjøringer om NIH-tilskudd.",
      "صفحة التمويل الرسمية لـ NIH وتوضح أن Grants.gov هو المصدر الرسمي الوحيد لإعلانات فرص منح المعاهد الوطنية للصحة.",
    ),
    timestamp: opportunitiesSnapshotAt,
    timestampKind: "verified",
    status: "rolling",
    kind: "portal",
    tags: tags(
      ["NIH", "Biomedical research", "Universities", "Health funding"],
      ["NIH", "Biomedisinsk forskning", "Universiteter", "Helsefinansiering"],
      ["NIH", "بحث طبي حيوي", "جامعات", "تمويل صحي"],
    ),
  },
];

const scholarshipOpportunityEntries: OpportunityEntry[] = [
  {
    id: "unhcr-opportunities-dashboard",
    title: text(
      "UNHCR Opportunities scholarship platform",
      "UNHCR Opportunities stipendplattform",
      "منصة UNHCR Opportunities للمنح",
    ),
    url: "https://services.unhcr.org/opportunities/",
    source: text("UNHCR Opportunities", "UNHCR Opportunities", "UNHCR Opportunities"),
    summary: text(
      "Official UNHCR search platform for verified scholarships, academic programmes, and training routes for refugees, asylum-seekers, and stateless people.",
      "Offisiell søkeplattform fra UNHCR for verifiserte stipend, akademiske programmer og opplæringsveier for flyktninger, asylsøkere og statsløse personer.",
      "منصة البحث الرسمية التابعة للمفوضية السامية لشؤون اللاجئين للمنح الموثقة والبرامج الأكاديمية ومسارات التدريب الخاصة باللاجئين وطالبي اللجوء وعديمي الجنسية.",
    ),
    audience: text(
      "Refugees, asylum-seekers, and stateless applicants looking for verified higher-education and training opportunities.",
      "Flyktninger, asylsøkere og statsløse søkere som ser etter verifiserte muligheter innen høyere utdanning og opplæring.",
      "اللاجئون وطالبو اللجوء وعديمو الجنسية الذين يبحثون عن فرص موثقة في التعليم العالي والتدريب.",
    ),
    geography: text("Global", "Globalt", "عالمي"),
    verificationNote: text(
      "Official UNHCR platform dedicated to verified opportunities and direct application routes.",
      "Offisiell plattform fra UNHCR med fokus på verifiserte muligheter og direkte søknadsveier.",
      "منصة رسمية من المفوضية السامية لشؤون اللاجئين مخصصة للفرص الموثقة ومسارات التقديم المباشر.",
    ),
    timestamp: opportunitiesSnapshotAt,
    timestampKind: "verified",
    status: "rolling",
    kind: "portal",
    tags: tags(
      ["UNHCR", "Scholarships", "Refugees", "Verified"],
      ["UNHCR", "Stipender", "Flyktninger", "Verifisert"],
      ["المفوضية", "منح دراسية", "لاجئون", "موثقة"],
    ),
  },
  {
    id: "dafi-programme",
    title: text(
      "DAFI tertiary scholarship programme",
      "DAFI-programmet for høyere utdanning",
      "برنامج DAFI للمنح في التعليم العالي",
    ),
    url: "https://www.unhcr.org/dafi-scholarships.html",
    source: text("UNHCR", "UNHCR", "المفوضية السامية لشؤون اللاجئين"),
    summary: text(
      "Long-running UNHCR scholarship programme supporting refugee students with tuition and related study costs through country-level application channels.",
      "Langvarig stipendprogram fra UNHCR som støtter flyktningstudenter med skolepenger og relaterte studiekostnader gjennom landsbaserte søknadsprosesser.",
      "برنامج منح طويل الأمد من المفوضية السامية لشؤون اللاجئين يدعم الطلاب اللاجئين في الرسوم الدراسية والتكاليف المرتبطة بالدراسة عبر قنوات التقديم على مستوى كل بلد.",
    ),
    audience: text(
      "Refugee students applying through UNHCR country processes in locations where the DAFI programme operates.",
      "Flyktningstudenter som søker gjennom UNHCRs landsprosesser i steder der DAFI-programmet er aktivt.",
      "الطلاب اللاجئون الذين يتقدمون عبر إجراءات المفوضية في البلدان التي يعمل فيها برنامج DAFI.",
    ),
    geography: text(
      "Multiple countries where DAFI is active",
      "Flere land der DAFI er aktivt",
      "عدة بلدان يعمل فيها برنامج DAFI",
    ),
    verificationNote: text(
      "Official UNHCR programme page with current programme information, annual reporting, and country-level references.",
      "Offisiell programside fra UNHCR med oppdatert programinformasjon, årsrapporter og henvisninger på landnivå.",
      "الصفحة الرسمية لبرنامج DAFI لدى المفوضية، وتحتوي على معلومات محدثة وتقارير سنوية ومراجع خاصة بكل بلد.",
    ),
    timestamp: opportunitiesSnapshotAt,
    timestampKind: "verified",
    status: "seasonal",
    kind: "programme",
    tags: tags(
      ["UNHCR", "Higher education", "Refugees", "Student support"],
      ["UNHCR", "Høyere utdanning", "Flyktninger", "Studentstøtte"],
      ["المفوضية", "تعليم عالٍ", "لاجئون", "دعم طلابي"],
    ),
  },
  {
    id: "erasmus-mundus-programmes",
    title: text(
      "Erasmus Mundus joint master's programmes",
      "Erasmus Mundus felles masterprogrammer",
      "برامج Erasmus Mundus المشتركة للماجستير",
    ),
    url: "https://education.ec.europa.eu/study-in-europe/programmes-and-fields/programmes-by-theme",
    source: text("European Education Area", "Det europeiske utdanningsområdet", "المنطقة الأوروبية للتعليم"),
    summary: text(
      "Official European Commission guide to Erasmus Mundus joint master's programmes, including scholarship-backed study routes offered through university consortia.",
      "Offisiell veiledning fra Europakommisjonen til Erasmus Mundus-fellesmastere, inkludert studieløp med stipend gjennom universitetssamarbeid.",
      "الدليل الرسمي للمفوضية الأوروبية لبرامج Erasmus Mundus المشتركة للماجستير، بما في ذلك المسارات الدراسية المدعومة بمنح عبر اتحادات جامعية.",
    ),
    audience: text(
      "Students worldwide with a bachelor's degree seeking international master's study across participating universities.",
      "Studenter over hele verden med bachelorgrad som søker internasjonale masterstudier ved deltakende universiteter.",
      "الطلاب من مختلف أنحاء العالم الحاصلون على درجة البكالوريوس والراغبون في دراسة ماجستير دولية عبر الجامعات المشاركة.",
    ),
    geography: text(
      "Global applicants, multi-country study routes",
      "Globale søkere, studieløp på tvers av flere land",
      "متقدمون من جميع أنحاء العالم، ومسارات دراسة عبر عدة دول",
    ),
    verificationNote: text(
      "Official European Commission study portal stating that Erasmus Mundus is open to students worldwide and includes scholarship support.",
      "Offisiell studieside fra Europakommisjonen som forklarer at Erasmus Mundus er åpent for studenter over hele verden og inkluderer stipendstøtte.",
      "البوابة الدراسية الرسمية للمفوضية الأوروبية، وتوضح أن Erasmus Mundus مفتوح للطلاب من جميع أنحاء العالم ويشمل دعماً بالمنح.",
    ),
    timestamp: opportunitiesSnapshotAt,
    timestampKind: "verified",
    status: "seasonal",
    kind: "programme",
    tags: tags(
      ["European Union", "Master's", "International study", "Scholarships"],
      ["EU", "Master", "Internasjonale studier", "Stipender"],
      ["الاتحاد الأوروبي", "ماجستير", "دراسة دولية", "منح"],
    ),
  },
  {
    id: "daad-scholarship-database",
    title: text(
      "DAAD scholarship database",
      "DAADs stipenddatabase",
      "قاعدة بيانات منح DAAD",
    ),
    url: "https://www2.daad.de/deutschland/stipendium/datenbank/en/21148-scholarship-database/",
    source: text("DAAD", "DAAD", "DAAD"),
    summary: text(
      "Official scholarship database for international students and researchers searching DAAD programmes and selected external funding offers for Germany.",
      "Offisiell stipenddatabase for internasjonale studenter og forskere som søker DAAD-programmer og utvalgte eksterne finansieringsmuligheter i Tyskland.",
      "قاعدة البيانات الرسمية لمنح DAAD للطلاب والباحثين الدوليين الذين يبحثون عن برامج DAAD وبعض فرص التمويل الخارجية للدراسة في ألمانيا.",
    ),
    audience: text(
      "International students, graduates, doctoral candidates, and researchers looking for scholarships in Germany.",
      "Internasjonale studenter, kandidater, doktorgradsstudenter og forskere som leter etter stipend i Tyskland.",
      "الطلاب والخريجون وطلاب الدكتوراه والباحثون الدوليون الذين يبحثون عن منح دراسية في ألمانيا.",
    ),
    geography: text(
      "Global applicants, Germany-focused opportunities",
      "Globale søkere, muligheter med fokus på Tyskland",
      "متقدمون من جميع أنحاء العالم، وفرص تركز على ألمانيا",
    ),
    verificationNote: text(
      "Official DAAD scholarship database with searchable programme filters and direct programme details.",
      "Offisiell stipenddatabase fra DAAD med søkbare filtre og direkte programdetaljer.",
      "قاعدة البيانات الرسمية لمنح DAAD مع فلاتر بحث وتفاصيل مباشرة لكل برنامج.",
    ),
    timestamp: opportunitiesSnapshotAt,
    timestampKind: "verified",
    status: "rolling",
    kind: "portal",
    tags: tags(
      ["Germany", "DAAD", "Students", "Researchers"],
      ["Tyskland", "DAAD", "Studenter", "Forskere"],
      ["ألمانيا", "DAAD", "طلاب", "باحثون"],
    ),
  },
  {
    id: "chevening-apply",
    title: text(
      "Chevening apply page",
      "Chevenings søknadsside",
      "صفحة التقديم في Chevening",
    ),
    url: "https://www.chevening.org/apply/",
    source: text("Chevening", "Chevening", "Chevening"),
    summary: text(
      "Official country-based application route for Chevening scholarships and fellowships, with award availability and application status by citizenship country.",
      "Offisiell landsbasert søknadsvei for Chevening-stipend og fellowships, med informasjon om tilgjengelige utmerkelser og søknadsstatus per statsborgerskapsland.",
      "المسار الرسمي للتقديم حسب البلد لمنح وزمالات Chevening، مع بيان توافر الفرص وحالة التقديم بحسب بلد الجنسية.",
    ),
    audience: text(
      "Emerging leaders applying for eligible UK master's scholarships or fellowships through the official Chevening route.",
      "Fremvoksende ledere som søker kvalifiserte britiske masterstipend eller fellowships gjennom den offisielle Chevening-ruten.",
      "القادة الواعدون الذين يتقدمون إلى منح الماجستير أو الزمالات البريطانية المؤهلة عبر المسار الرسمي لـ Chevening.",
    ),
    geography: text(
      "More than 160 countries and territories",
      "Mer enn 160 land og territorier",
      "أكثر من 160 دولة وإقليماً",
    ),
    verificationNote: text(
      "Official Chevening application page showing awards by country or territory and whether the current cycle is open or closed.",
      "Offisiell søknadsside fra Chevening som viser hvilke priser som finnes per land eller territorium, og om nåværende runde er åpen eller stengt.",
      "صفحة التقديم الرسمية لـ Chevening، وتوضح الفرص المتاحة حسب الدولة أو الإقليم وما إذا كانت الدورة الحالية مفتوحة أو مغلقة.",
    ),
    timestamp: opportunitiesSnapshotAt,
    timestampKind: "verified",
    status: "seasonal",
    kind: "programme",
    tags: tags(
      ["United Kingdom", "Master's", "Leadership", "Government scholarship"],
      ["Storbritannia", "Master", "Lederskap", "Offentlig stipend"],
      ["المملكة المتحدة", "ماجستير", "قيادة", "منحة حكومية"],
    ),
  },
  {
    id: "fulbright-foreign-student",
    title: text(
      "Fulbright Foreign Student Program apply page",
      "Søknadsside for Fulbright Foreign Student Program",
      "صفحة التقديم لبرنامج Fulbright للطلاب الأجانب",
    ),
    url: "https://foreign.fulbrightonline.org/apply",
    source: text("Foreign Fulbright Program", "Foreign Fulbright Program", "برنامج فولبرايت للطلاب الأجانب"),
    summary: text(
      "Official application guidance for non-U.S. citizens applying to the Fulbright Foreign Student Program through Fulbright Commissions, Foundations, or U.S. Embassies.",
      "Offisiell søknadsveiledning for ikke-amerikanske borgere som søker til Fulbright Foreign Student Program gjennom Fulbright-kommisjoner, stiftelser eller amerikanske ambassader.",
      "إرشادات التقديم الرسمية لغير المواطنين الأمريكيين المتقدمين إلى برنامج Fulbright للطلاب الأجانب عبر لجان Fulbright أو المؤسسات أو السفارات الأمريكية.",
    ),
    audience: text(
      "Graduate students, researchers, artists, and professionals applying from participating countries for study or research in the United States.",
      "Masterstudenter, forskere, kunstnere og fagpersoner som søker fra deltakende land om studier eller forskning i USA.",
      "طلاب الدراسات العليا والباحثون والفنانون والمهنيون الذين يتقدمون من الدول المشاركة للدراسة أو البحث في الولايات المتحدة.",
    ),
    geography: text(
      "More than 160 countries",
      "Mer enn 160 land",
      "أكثر من 160 دولة",
    ),
    verificationNote: text(
      "Official Fulbright page describing eligibility, application routes, and country-based processing through the formal Fulbright network.",
      "Offisiell Fulbright-side som forklarer kvalifikasjon, søknadsruter og landsbasert behandling gjennom det formelle Fulbright-nettverket.",
      "الصفحة الرسمية لبرنامج Fulbright، وتشرح الأهلية ومسارات التقديم وآلية المعالجة حسب البلد عبر شبكة Fulbright الرسمية.",
    ),
    timestamp: opportunitiesSnapshotAt,
    timestampKind: "verified",
    status: "seasonal",
    kind: "programme",
    tags: tags(
      ["United States", "Fulbright", "Graduate study", "Research"],
      ["USA", "Fulbright", "Graduate studier", "Forskning"],
      ["الولايات المتحدة", "Fulbright", "دراسات عليا", "بحث"],
    ),
  },
  {
    id: "study-in-europe-scholarships",
    title: text(
      "Study in Europe scholarships, grants, and financial support",
      "Study in Europe: stipend, tilskudd og økonomisk støtte",
      "الدراسة في أوروبا: المنح والدعم المالي",
    ),
    url: "https://education.ec.europa.eu/study-in-europe/planning-your-studies/scholarships-and-funding",
    source: text("European Education Area", "Det europeiske utdanningsområdet", "المنطقة الأوروبية للتعليم"),
    summary: text(
      "Official European Commission guide to scholarship and funding routes for international students across European higher-education systems.",
      "Offisiell veiledning fra Europakommisjonen om stipend og finansieringsveier for internasjonale studenter i europeiske høyere utdanningssystemer.",
      "الدليل الرسمي للمفوضية الأوروبية حول مسارات المنح والتمويل للطلاب الدوليين عبر أنظمة التعليم العالي في أوروبا.",
    ),
    audience: text(
      "International students comparing scholarship and funding options across European countries, institutions, and EU-backed programmes.",
      "Internasjonale studenter som sammenligner stipend- og finansieringsmuligheter på tvers av europeiske land, institusjoner og EU-støttede programmer.",
      "الطلاب الدوليون الذين يقارنون بين خيارات المنح والتمويل عبر الدول الأوروبية والمؤسسات والبرامج المدعومة من الاتحاد الأوروبي.",
    ),
    geography: text(
      "Europe, open to global applicants by programme",
      "Europa, åpent for globale søkere avhengig av program",
      "أوروبا، ومفتوح للمتقدمين عالمياً بحسب البرنامج",
    ),
    verificationNote: text(
      "Official European Commission study portal pointing users to country profiles, Erasmus routes, and research-funding references.",
      "Offisiell studieside fra Europakommisjonen som peker brukere videre til landprofiler, Erasmus-ruter og henvisninger til forskningsfinansiering.",
      "البوابة الدراسية الرسمية للمفوضية الأوروبية، وتوجّه المستخدمين إلى ملفات الدول ومسارات Erasmus ومراجع التمويل البحثي.",
    ),
    timestamp: opportunitiesSnapshotAt,
    timestampKind: "verified",
    status: "rolling",
    kind: "portal",
    tags: tags(
      ["Europe", "Scholarships", "International students", "Official guidance"],
      ["Europa", "Stipender", "Internasjonale studenter", "Offisiell veiledning"],
      ["أوروبا", "منح دراسية", "طلاب دوليون", "إرشاد رسمي"],
    ),
  },
  {
    id: "euraxess-jobs-and-opportunities",
    title: text(
      "EURAXESS jobs and opportunities",
      "EURAXESS jobber og muligheter",
      "الوظائف والفرص عبر EURAXESS",
    ),
    url: "https://euraxess.ec.europa.eu/jobs",
    source: text("EURAXESS", "EURAXESS", "EURAXESS"),
    summary: text(
      "Official European Commission-backed platform for research jobs, funding opportunities, fellowships, and hosting offers across Europe and beyond.",
      "Offisiell plattform støttet av Europakommisjonen for forskningsjobber, finansieringsmuligheter, fellowships og vertsinstitusjoner i Europa og utover.",
      "منصة رسمية مدعومة من المفوضية الأوروبية للوظائف البحثية وفرص التمويل والزمالات وعروض الاستضافة في أوروبا وخارجها.",
    ),
    audience: text(
      "Researchers, doctoral candidates, postdoctoral applicants, universities, and research institutions looking for direct research-career opportunities.",
      "Forskere, doktorgradsstudenter, postdoktorsøkere, universiteter og forskningsinstitusjoner som leter etter direkte karrieremuligheter i forskning.",
      "الباحثون وطلبة الدكتوراه والمتقدمون إلى ما بعد الدكتوراه والجامعات والمؤسسات البحثية التي تبحث عن فرص مباشرة في المسار الأكاديمي والبحثي.",
    ),
    geography: text(
      "Europe and international research mobility routes",
      "Europa og internasjonale mobilitetsveier i forskning",
      "أوروبا ومسارات التنقل البحثي الدولية",
    ),
    verificationNote: text(
      "Official EURAXESS jobs and opportunities portal with funding, hosting, and researcher mobility routes.",
      "Offisiell EURAXESS-portal for jobber og muligheter med finansiering, vertskap og mobilitetsruter for forskere.",
      "بوابة EURAXESS الرسمية للوظائف والفرص، وتشمل التمويل والاستضافة ومسارات تنقل الباحثين.",
    ),
    timestamp: opportunitiesSnapshotAt,
    timestampKind: "verified",
    status: "rolling",
    kind: "portal",
    tags: tags(
      ["Researchers", "Postdoctoral", "Fellowships", "Europe"],
      ["Forskere", "Postdoktor", "Fellowships", "Europa"],
      ["باحثون", "ما بعد الدكتوراه", "زمالات", "أوروبا"],
    ),
  },
];

export function getFundingOpportunities(locale: Locale): OpportunityItem[] {
  return fundingOpportunityEntries.map((entry) => localizeEntry(entry, locale));
}

export function getScholarshipOpportunities(locale: Locale): OpportunityItem[] {
  return scholarshipOpportunityEntries.map((entry) => localizeEntry(entry, locale));
}
