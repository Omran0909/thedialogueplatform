const fallbackSiteUrl = "https://thedialogueplatform.com";
const defaultMembershipFormUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSfdsTvaqb3tEJHiPyAyYruARtH7hLGNiAwNHOFsTzIMCIjrXg/viewform?usp=header";

const normalizedUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.startsWith("http")
    ? process.env.NEXT_PUBLIC_SITE_URL
    : process.env.NEXT_PUBLIC_SITE_URL
      ? `https://${process.env.NEXT_PUBLIC_SITE_URL}`
      : fallbackSiteUrl;

function toGoogleFormEmbedUrl(url: string) {
  const trimmed = url.trim();

  if (!trimmed) {
    return "";
  }

  try {
    const parsed = new URL(trimmed);
    const isGoogleForm = parsed.hostname.includes("docs.google.com") && parsed.pathname.includes("/forms/");

    if (!isGoogleForm) {
      return trimmed;
    }

    const normalizedPath = parsed.pathname.replace(/\/+$/, "");

    if (normalizedPath.endsWith("/viewform")) {
      parsed.pathname = normalizedPath;
      parsed.searchParams.set("embedded", "true");
      return parsed.toString();
    }

    return trimmed;
  } catch {
    return trimmed;
  }
}

const membershipFormUrl = process.env.NEXT_PUBLIC_MEMBERSHIP_FORM_URL?.trim() || defaultMembershipFormUrl;

export const siteConfig = {
  name: "The Dialogue Platform",
  url: normalizedUrl,
  adsensePublisherId: "ca-pub-1442521269895561",
  description:
    "The Dialogue Platform builds trust and peace through inclusive, structured dialogue in collaboration with Nansen Peace Center and Lillestrom Municipality.",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@thedialogueplatform.com",
  contactPhone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "",
  legal: {
    name: "DIALOG PLATTFORM",
    organizationNumber: "935 674 220",
    registrationAuthority: "Enhetsregisteret",
    country: "Norway",
  },
  partners: ["Nansen Peace Center", "Lillestrom Municipality"],
  technologyPartner: {
    id: "tekai",
    name: "TekAi",
    href: "https://www.tekai.ai",
    logo: "/assets/partners/tekai.png",
  },
  partnerProfiles: [
    {
      id: "nansen",
      name: "Nansen Peace Center",
      href: "https://peace.no",
      logo: "/assets/partners/nansen-peace-center.svg",
    },
    {
      id: "lillestrom",
      name: "Lillestrom Municipality",
      href: "https://www.lillestrom.kommune.no",
      logo: "/assets/partners/lillestrom-municipality.svg",
    },
    {
      id: "tekai",
      name: "TekAi",
      href: "https://www.tekai.ai",
      logo: "/assets/partners/tekai.png",
    },
  ] as const,
  boardMembers: [
    {
      name: "Omran Adam",
      photo: "/assets/media/site/board/omran-adam.jpg",
    },
    {
      name: "Hind Suliman",
      photo: "/assets/media/site/board/hind-suliman.jpg",
    },
    {
      name: "Eman Hassan",
      photo: "/assets/media/site/board/eman-hassan.jpg",
    },
    {
      name: "Adam Bsher",
      photo: "/assets/media/site/board/adam-bsher.jpg",
    },
    {
      name: "Gada Ayoub",
      photo: "/assets/media/site/board/gada-ayoub.jpg",
    },
    {
      name: "Abdelhadi Krow",
      photo: "/assets/media/site/board/abdelhadi-krow.jpg",
    },
  ] as const,
  membershipFormUrl,
  membershipEmbedUrl: toGoogleFormEmbedUrl(membershipFormUrl),
  socialChannels: [
    {
      label: "YouTube",
      href: "https://youtube.com/@thedialogueplattform",
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/TheDialoguePlatform",
    },
  ],
  facebookPageUrl: "https://www.facebook.com/TheDialoguePlatform",
  facebookCommunityImage: "/assets/media/site/library/seminars/silik/2026-01-24/silik-2026-01-24-0784.jpg",
  exampleDialogues: [
      {
          title: "الجزء الثاني | جلسة حوارية مع الباشمهندس مبارك أردول | بين الحرب والسلام: السودان إلى أين؟",
          href: "https://www.youtube.com/watch?v=u951a5Zcg6o",
          thumbnail: "https://i.ytimg.com/vi/u951a5Zcg6o/hqdefault.jpg",
          publishedAt: "2026-09-07",
          details: {
              en: "Part two from the 29 August 2026 Oslo dialogue with Mubarak Abdelrahman Ardol on Sudan's war, peace pathways, political settlement, and a shared national project.",
              no: "Del to fra dialogen i Oslo 29. august 2026 med Mubarak Abdelrahman Ardol om krigen i Sudan, fredsveier, politisk løsning og et felles nasjonalt prosjekt.",
              ar: "الجزء الثاني من جلسة أوسلو في 29 أغسطس 2026 مع مبارك عبد الرحمن أردول حول الحرب في السودان ومسارات السلام والتسوية السياسية ومشروع وطني جامع."
          }
      },
      {
          title: "الجزء الأول | جلسة حوارية مع الباشمهندس مبارك أردول | بين الحرب والسلام: السودان إلى أين؟",
          href: "https://www.youtube.com/watch?v=hcgJB4NKho0",
          thumbnail: "https://i.ytimg.com/vi/hcgJB4NKho0/hqdefault.jpg",
          publishedAt: "2026-09-02",
          details: {
              en: "Part one of the season-opening Ardol dialogue, introducing the discussion on the war in Sudan, peace options, and the search for a broad national consensus.",
              no: "Del en av sesongåpningen med Ardol, med innledning til samtalen om krigen i Sudan, fredsmuligheter og bred nasjonal enighet.",
              ar: "الجزء الأول من جلسة أردول الافتتاحية للموسم، وفيه بدأ النقاش حول الحرب في السودان وخيارات السلام وإمكانية التوافق الوطني الواسع."
          }
      },
      {
          title: "الجزء الثاني | جلسة حوارية مع المهندس خالد عمر يوسف والدكتور بكري الجاك",
          href: "https://www.youtube.com/watch?v=S6cG3trzoio",
          thumbnail: "https://i.ytimg.com/vi/S6cG3trzoio/hqdefault.jpg",
          publishedAt: "2026-04-11",
          details: {
              en: "A second-part dialogue with Khalid Omar Yousif and Dr. Bakri Aljak, continuing the conversation on Sudan's political moment, conflict, and possible civic pathways.",
              no: "Andre del av samtalen med Khalid Omar Yousif og Dr. Bakri Aljak om Sudans politiske situasjon, konflikt og mulige samfunnsveier videre.",
              ar: "الجزء الثاني من الحوار مع خالد عمر يوسف والدكتور بكري الجاك حول الراهن السياسي السوداني والحرب والمسارات المدنية الممكنة."
          }
      },
      {
          title: "الجزء الأول | جلسة حوارية مع المهندس خالد عمر يوسف والدكتور بكري الجاك",
          href: "https://www.youtube.com/watch?v=OjW3uPlhzBI",
          thumbnail: "https://i.ytimg.com/vi/OjW3uPlhzBI/hqdefault.jpg",
          publishedAt: "2026-03-05",
          details: {
              en: "The opening part of the Khalid Omar Yousif and Dr. Bakri Aljak dialogue, focused on where Sudan is heading and how public dialogue can support trust.",
              no: "Første del av samtalen med Khalid Omar Yousif og Dr. Bakri Aljak om hvor Sudan går, og hvordan offentlig dialog kan styrke tillit.",
              ar: "الجزء الأول من الحوار مع خالد عمر يوسف والدكتور بكري الجاك حول اتجاهات السودان ودور الحوار العام في بناء الثقة."
          }
      },
      {
          title: "Part 2 - Khalid Omar Yousif, Deputy Chairman of the Sudanese Congress Party | Where Is Sudan Heading?",
          href: "https://www.youtube.com/watch?v=KdL5PjP0lfg",
          thumbnail: "https://i.ytimg.com/vi/KdL5PjP0lfg/hqdefault.jpg",
          publishedAt: "2026-02-25",
          details: {
              en: "Part two of the English-language Khalid Omar Yousif session, exploring Sudan's future, democratic politics, peace, and civic responsibility.",
              no: "Andre del av den engelskspråklige Khalid Omar Yousif-samtalen om Sudans framtid, demokratisk politikk, fred og samfunnsansvar.",
              ar: "الجزء الثاني من جلسة خالد عمر يوسف باللغة الإنجليزية حول مستقبل السودان والسياسة الديمقراطية والسلام والمسؤولية المدنية."
          }
      },
      {
          title: "Part 1 - Khalid Omar Yousif, Deputy Chairman of the Sudanese Congress Party | Where Is Sudan Heading?",
          href: "https://www.youtube.com/watch?v=FjQanNn8K_E",
          thumbnail: "https://i.ytimg.com/vi/FjQanNn8K_E/hqdefault.jpg",
          publishedAt: "2026-02-01",
          details: {
              en: "Part one of the English-language Khalid Omar Yousif session on Sudan's direction, political choices, and the role of structured civic dialogue.",
              no: "Første del av den engelskspråklige Khalid Omar Yousif-samtalen om Sudans retning, politiske valg og strukturert samfunnsdialog.",
              ar: "الجزء الأول من جلسة خالد عمر يوسف باللغة الإنجليزية حول اتجاه السودان والخيارات السياسية ودور الحوار المدني المنظم."
          }
      },
      {
          title: "المنتدى الحواري | حوار صريح بين الأستاذ مجدي حسن ومنعم سليمان عطرون",
          href: "https://www.youtube.com/watch?v=GkUWu4vekUw",
          thumbnail: "https://i.ytimg.com/vi/GkUWu4vekUw/hqdefault.jpg",
          publishedAt: "2026-01-10",
          details: {
              en: "A direct dialogue between Majdi Hassan and Moneim Suleiman Atroun on recurring conflict, political responsibility, and the conditions for constructive Sudanese dialogue.",
              no: "En direkte samtale mellom Majdi Hassan og Moneim Suleiman Atroun om gjentakende konflikt, politisk ansvar og konstruktiv sudanesisk dialog.",
              ar: "حوار مباشر بين الأستاذ مجدي حسن ومنعم سليمان عطرون حول تكرار النزاعات والمسؤولية السياسية وشروط الحوار السوداني البنّاء."
          }
      },
      {
          title: "المنتدى الحواري | حوار صريح بين الأستاذة غادة أيوب ومنعم سليمان عطرون",
          href: "https://www.youtube.com/watch?v=DcJITUQ4IDE",
          thumbnail: "https://i.ytimg.com/vi/DcJITUQ4IDE/hqdefault.jpg",
          publishedAt: "2026-01-03",
          details: {
              en: "A candid exchange between Gada Ayoub and Moneim Suleiman Atroun about Sudanese public life, conflict patterns, and the need for accountable dialogue.",
              no: "En åpen samtale mellom Gada Ayoub og Moneim Suleiman Atroun om sudanesisk offentlig liv, konfliktmønstre og ansvarlig dialog.",
              ar: "حوار صريح بين الأستاذة غادة أيوب ومنعم سليمان عطرون حول الحياة العامة السودانية وأنماط النزاع والحاجة إلى حوار مسؤول."
          }
      },
      {
          title: "ندوة حول الوضع الإنساني في جبال النوبة - بالتعاون بين المنتدى الحواري ومنظمة صوت تونقولي",
          href: "https://www.youtube.com/watch?v=2WVMUUNpYsU",
          thumbnail: "https://i.ytimg.com/vi/2WVMUUNpYsU/hqdefault.jpg",
          publishedAt: "2025-12-29",
          details: {
              en: "A seminar on the humanitarian situation in the Nuba Mountains, produced with Voice of Tunguli to highlight community needs and public responsibility.",
              no: "Et seminar om den humanitære situasjonen i Nuba-fjellene, laget sammen med Voice of Tunguli for å løfte behov og samfunnsansvar.",
              ar: "ندوة حول الوضع الإنساني في جبال النوبة بالتعاون مع منظمة صوت تونقولي لتسليط الضوء على احتياجات المجتمع والمسؤولية العامة."
          }
      }
  ],
};

export const mainRoutes = ["/", "/portfolio", "/about", "/dialogues", "/events", "/news", "/funding", "/scholarships", "/insights", "/contact"] as const;
