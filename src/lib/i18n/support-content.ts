import type { Locale } from "@/lib/i18n/config";

type SupportOption = {
  title: string;
  description: string;
  subject: string;
};

type PartnershipPath = {
  title: string;
  description: string;
};

type SupportContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heroTitle: string;
  heroDescription: string;
  partnerCta: string;
  donateCta: string;
  brochureCta: string;
  missionEyebrow: string;
  missionTitle: string;
  missionDescription: string;
  missionQuote: string;
  donateEyebrow: string;
  donateTitle: string;
  donateDescription: string;
  donationOptions: SupportOption[];
  donationButton: string;
  donationNote: string;
  partnerEyebrow: string;
  partnerTitle: string;
  partnerDescription: string;
  partnershipPaths: PartnershipPath[];
  partnerButton: string;
  principlesEyebrow: string;
  principlesTitle: string;
  principles: PartnershipPath[];
  brochureEyebrow: string;
  brochureTitle: string;
  brochureDescription: string;
  brochureButton: string;
  finalTitle: string;
  finalDescription: string;
  contactButton: string;
};

export const supportContent: Record<Locale, SupportContent> = {
  en: {
    metaTitle: "Support independent dialogue",
    metaDescription:
      "Partner with or support The Dialogue Platform, a free and independent civic space for every voice without exclusion.",
    eyebrow: "Support independent dialogue",
    heroTitle: "A free platform needs independent support.",
    heroDescription:
      "The Dialogue Platform is a free and independent civic space for every voice, without exclusion. To remain free for participants, we must remain independent in how we choose topics, welcome voices, and facilitate disagreement.",
    partnerCta: "Partner with us",
    donateCta: "Donate",
    brochureCta: "View the brochure",
    missionEyebrow: "Why support matters",
    missionTitle: "Independence protects the conversation.",
    missionDescription:
      "Open dialogue needs practical foundations: accessible venues, careful preparation, professional facilitation, translation, documentation, and public digital access. Independent support allows us to provide these things without charging participants or selling influence over the conversation.",
    missionQuote: "Support keeps the door open. It does not decide who may enter or what they may say.",
    donateEyebrow: "Individual and institutional giving",
    donateTitle: "Choose how you want to support",
    donateDescription:
      "Every contribution helps us create more spaces where people can listen, question, disagree, and build trust.",
    donationOptions: [
      {
        title: "One-time gift",
        description: "Help fund a venue, accessible participation, recording, translation, or another immediate need.",
        subject: "One-time donation to The Dialogue Platform",
      },
      {
        title: "Ongoing independence support",
        description: "Provide steady support for year-round preparation, facilitation, outreach, and digital access.",
        subject: "Ongoing support for The Dialogue Platform",
      },
      {
        title: "Institutional contribution",
        description: "Support a programme or dialogue series while respecting editorial and facilitation independence.",
        subject: "Institutional contribution to The Dialogue Platform",
      },
    ],
    donationButton: "Start a donation",
    donationNote:
      "Secure payment details are shared directly by the registered organisation. This page will be updated when a direct online payment provider is enabled.",
    partnerEyebrow: "Partner with us",
    partnerTitle: "Build the conditions for honest dialogue",
    partnerDescription:
      "We welcome partners who respect editorial independence, participant dignity, and the right of different voices to be present.",
    partnershipPaths: [
      {
        title: "Programme partner",
        description: "Co-develop a dialogue series, civic learning programme, or public forum.",
      },
      {
        title: "Institutional partner",
        description: "Connect community voices with municipalities, universities, civil society, or public services.",
      },
      {
        title: "Media and access partner",
        description: "Help document, translate, distribute, or make events accessible to wider audiences.",
      },
      {
        title: "Philanthropic partner",
        description: "Provide flexible support that protects continuity and independence across the year.",
      },
    ],
    partnerButton: "Discuss a partnership",
    principlesEyebrow: "Our safeguards",
    principlesTitle: "What independence means in practice",
    principles: [
      {
        title: "No purchased influence",
        description: "A contribution never buys access, editorial control, or a preferred conclusion.",
      },
      {
        title: "Open participation",
        description: "We work to keep dialogue accessible and welcome different perspectives without exclusion.",
      },
      {
        title: "Clear boundaries",
        description: "Partnership roles, responsibilities, and public recognition are agreed transparently.",
      },
    ],
    brochureEyebrow: "Partnership brochure",
    brochureTitle: "A concise guide to our mission and support routes",
    brochureDescription:
      "Download the professional six-page brochure for colleagues, funders, municipalities, community organisations, and potential partners.",
    brochureButton: "Download brochure (PDF)",
    finalTitle: "Help keep the conversation open",
    finalDescription:
      "Tell us how you would like to contribute. We will respond with the appropriate partnership or secure giving details.",
    contactButton: "Contact The Dialogue Platform",
  },
  no: {
    metaTitle: "Støtt uavhengig dialog",
    metaDescription:
      "Bli partner med eller støtt The Dialogue Platform, en gratis og uavhengig samfunnsarena for alle stemmer uten ekskludering.",
    eyebrow: "Støtt uavhengig dialog",
    heroTitle: "En gratis plattform trenger uavhengig støtte.",
    heroDescription:
      "The Dialogue Platform er en gratis og uavhengig samfunnsarena for alle stemmer, uten ekskludering. For å forbli gratis for deltakerne må vi være uavhengige i valg av temaer, hvem vi inviterer, og hvordan vi legger til rette for uenighet.",
    partnerCta: "Bli partner med oss",
    donateCta: "Gi støtte",
    brochureCta: "Se brosjyren",
    missionEyebrow: "Hvorfor støtte er viktig",
    missionTitle: "Uavhengighet beskytter samtalen.",
    missionDescription:
      "Åpen dialog trenger praktiske rammer: tilgjengelige lokaler, grundige forberedelser, profesjonell fasilitering, oversettelse, dokumentasjon og digital tilgang. Uavhengig støtte gjør dette mulig uten deltakeravgift eller salg av innflytelse over samtalen.",
    missionQuote: "Støtte holder døren åpen. Den bestemmer ikke hvem som får komme inn eller hva de får si.",
    donateEyebrow: "Bidrag fra enkeltpersoner og institusjoner",
    donateTitle: "Velg hvordan du vil støtte",
    donateDescription:
      "Hvert bidrag hjelper oss med å skape flere rom der mennesker kan lytte, spørre, være uenige og bygge tillit.",
    donationOptions: [
      {
        title: "Engangsgave",
        description: "Bidra til lokale, tilgjengelig deltakelse, opptak, oversettelse eller et annet konkret behov.",
        subject: "Engangsgave til The Dialogue Platform",
      },
      {
        title: "Løpende støtte til uavhengighet",
        description: "Gi stabil støtte til forberedelse, fasilitering, formidling og digital tilgang gjennom året.",
        subject: "Løpende støtte til The Dialogue Platform",
      },
      {
        title: "Institusjonelt bidrag",
        description: "Støtt et program eller en dialogserie med respekt for redaksjonell og metodisk uavhengighet.",
        subject: "Institusjonelt bidrag til The Dialogue Platform",
      },
    ],
    donationButton: "Start et bidrag",
    donationNote:
      "Sikre betalingsopplysninger deles direkte av den registrerte organisasjonen. Siden oppdateres når en direkte betalingsløsning på nett er aktivert.",
    partnerEyebrow: "Bli partner med oss",
    partnerTitle: "Bygg rammene for ærlig dialog",
    partnerDescription:
      "Vi ønsker partnere som respekterer redaksjonell uavhengighet, deltakernes verdighet og retten til at ulike stemmer er til stede.",
    partnershipPaths: [
      {
        title: "Programpartner",
        description: "Utvikle en dialogserie, et samfunnslæringsprogram eller et offentlig forum sammen med oss.",
      },
      {
        title: "Institusjonell partner",
        description: "Koble samfunnsstemmer med kommuner, universiteter, sivilsamfunn eller offentlige tjenester.",
      },
      {
        title: "Medie- og tilgjengelighetspartner",
        description: "Bidra med dokumentasjon, oversettelse, distribusjon eller bedre tilgjengelighet.",
      },
      {
        title: "Filantropisk partner",
        description: "Gi fleksibel støtte som beskytter kontinuitet og uavhengighet gjennom året.",
      },
    ],
    partnerButton: "Snakk med oss om partnerskap",
    principlesEyebrow: "Våre sikkerhetsmekanismer",
    principlesTitle: "Hva uavhengighet betyr i praksis",
    principles: [
      {
        title: "Ingen kjøpt innflytelse",
        description: "Et bidrag kjøper aldri tilgang, redaksjonell kontroll eller en foretrukket konklusjon.",
      },
      {
        title: "Åpen deltakelse",
        description: "Vi arbeider for tilgjengelig dialog og ønsker ulike perspektiver velkommen uten ekskludering.",
      },
      {
        title: "Tydelige grenser",
        description: "Roller, ansvar og offentlig omtale i partnerskap avtales åpent og tydelig.",
      },
    ],
    brochureEyebrow: "Partnerskapsbrosjyre",
    brochureTitle: "En kort guide til formålet og støttemulighetene våre",
    brochureDescription:
      "Last ned den profesjonelle sekssidersbrosjyren for kolleger, givere, kommuner, organisasjoner og mulige partnere.",
    brochureButton: "Last ned brosjyren (PDF)",
    finalTitle: "Hjelp oss med å holde samtalen åpen",
    finalDescription:
      "Fortell hvordan du ønsker å bidra. Vi svarer med riktig partnerskapsinformasjon eller sikre betalingsopplysninger.",
    contactButton: "Kontakt The Dialogue Platform",
  },
  ar: {
    metaTitle: "ادعم الحوار المستقل",
    metaDescription:
      "شارك أو ادعم منصة الحوار، وهي مساحة مدنية مجانية ومستقلة لكل الأصوات دون إقصاء.",
    eyebrow: "ادعم الحوار المستقل",
    heroTitle: "المنصة المجانية تحتاج إلى دعم مستقل.",
    heroDescription:
      "منصة الحوار مساحة مدنية مجانية ومستقلة لكل الأصوات دون إقصاء. ولكي تبقى مجانية للمشاركين، يجب أن تظل مستقلة في اختيار الموضوعات واستضافة الأصوات المختلفة وإدارة الاختلاف.",
    partnerCta: "شارك معنا",
    donateCta: "تبرع",
    brochureCta: "اطلع على الكتيب",
    missionEyebrow: "لماذا يهم الدعم",
    missionTitle: "الاستقلالية تحمي الحوار.",
    missionDescription:
      "يحتاج الحوار المفتوح إلى أسس عملية: أماكن ميسرة، وتحضير دقيق، وتيسير مهني، وترجمة، وتوثيق، وإتاحة رقمية للجمهور. يساعدنا الدعم المستقل على توفير ذلك من دون فرض رسوم على المشاركين أو بيع التأثير على مسار الحوار.",
    missionQuote: "الدعم يبقي الباب مفتوحاً، لكنه لا يحدد من يدخل أو ماذا يقول.",
    donateEyebrow: "دعم الأفراد والمؤسسات",
    donateTitle: "اختر الطريقة المناسبة لدعمك",
    donateDescription:
      "يساعدنا كل إسهام على إنشاء مساحات أكثر يستطيع فيها الناس الاستماع وطرح الأسئلة والاختلاف وبناء الثقة.",
    donationOptions: [
      {
        title: "تبرع لمرة واحدة",
        description: "ساهم في تكلفة المكان أو المشاركة الميسرة أو التصوير أو الترجمة أو حاجة مباشرة أخرى.",
        subject: "تبرع لمرة واحدة إلى منصة الحوار",
      },
      {
        title: "دعم مستمر للاستقلالية",
        description: "قدم دعماً منتظماً للتحضير والتيسير والتواصل والإتاحة الرقمية على مدار العام.",
        subject: "دعم مستمر لمنصة الحوار",
      },
      {
        title: "مساهمة مؤسسية",
        description: "ادعم برنامجاً أو سلسلة حوارات مع احترام الاستقلالية التحريرية واستقلالية التيسير.",
        subject: "مساهمة مؤسسية لمنصة الحوار",
      },
    ],
    donationButton: "ابدأ المساهمة",
    donationNote:
      "تشارك المنظمة المسجلة تفاصيل الدفع الآمنة مباشرة. وسيتم تحديث هذه الصفحة عند تفعيل مزود دفع إلكتروني مباشر.",
    partnerEyebrow: "شارك معنا",
    partnerTitle: "ساهم في تهيئة شروط الحوار الصادق",
    partnerDescription:
      "نرحب بالشركاء الذين يحترمون الاستقلالية التحريرية وكرامة المشاركين وحق الأصوات المختلفة في الحضور.",
    partnershipPaths: [
      {
        title: "شريك برامجي",
        description: "شارك في تطوير سلسلة حوارات أو برنامج تعلم مدني أو منتدى عام.",
      },
      {
        title: "شريك مؤسسي",
        description: "اربط أصوات المجتمع بالبلديات أو الجامعات أو المجتمع المدني أو الخدمات العامة.",
      },
      {
        title: "شريك إعلامي وإتاحة",
        description: "ساهم في التوثيق أو الترجمة أو النشر أو إتاحة الفعاليات لجمهور أوسع.",
      },
      {
        title: "شريك خيري",
        description: "قدم دعماً مرناً يحمي الاستمرارية والاستقلالية على مدار العام.",
      },
    ],
    partnerButton: "ناقش شراكة معنا",
    principlesEyebrow: "ضماناتنا",
    principlesTitle: "ماذا تعني الاستقلالية عملياً",
    principles: [
      {
        title: "لا تأثير مقابل المال",
        description: "لا تشتري أي مساهمة حق الوصول أو التحكم التحريري أو نتيجة مفضلة.",
      },
      {
        title: "مشاركة مفتوحة",
        description: "نعمل لإتاحة الحوار ونرحب بوجهات النظر المختلفة دون إقصاء.",
      },
      {
        title: "حدود واضحة",
        description: "يتم الاتفاق بوضوح وشفافية على الأدوار والمسؤوليات والإعلان عن الشراكات.",
      },
    ],
    brochureEyebrow: "كتيب الشراكة",
    brochureTitle: "دليل موجز لرسالتنا ومسارات الدعم",
    brochureDescription:
      "حمّل الكتيب المهني المكون من ست صفحات لمشاركته مع الزملاء والمانحين والبلديات والمنظمات والشركاء المحتملين.",
    brochureButton: "تحميل الكتيب (PDF)",
    finalTitle: "ساعدنا في إبقاء الحوار مفتوحاً",
    finalDescription:
      "أخبرنا كيف ترغب في المساهمة، وسنرسل لك مسار الشراكة المناسب أو تفاصيل الدفع الآمنة.",
    contactButton: "تواصل مع منصة الحوار",
  },
};
