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
    },
    {
      title: "الجزء الأول | جلسة حوارية مع الباشمهندس مبارك أردول | بين الحرب والسلام: السودان إلى أين؟",
      href: "https://www.youtube.com/watch?v=hcgJB4NKho0",
      thumbnail: "https://i.ytimg.com/vi/hcgJB4NKho0/hqdefault.jpg",
    },
    {
      title: "الجزء الثاني | جلسة حوارية مع المهندس خالد عمر يوسف والدكتور بكري الجاك",
      href: "https://www.youtube.com/watch?v=S6cG3trzoio",
      thumbnail: "https://i.ytimg.com/vi/S6cG3trzoio/hqdefault.jpg",
    },
    {
      title: "الجزء الأول | جلسة حوارية مع المهندس خالد عمر يوسف والدكتور بكري الجاك",
      href: "https://www.youtube.com/watch?v=OjW3uPlhzBI",
      thumbnail: "https://i.ytimg.com/vi/OjW3uPlhzBI/hqdefault.jpg",
    },
    {
      title: "Part 2 - Khalid Omar Yousif, Deputy Chairman of the Sudanese Congress Party | Where Is Sudan Heading?",
      href: "https://www.youtube.com/watch?v=KdL5PjP0lfg",
      thumbnail: "https://i.ytimg.com/vi/KdL5PjP0lfg/hqdefault.jpg",
    },
    {
      title: "Part 1 - Khalid Omar Yousif, Deputy Chairman of the Sudanese Congress Party | Where Is Sudan Heading?",
      href: "https://www.youtube.com/watch?v=FjQanNn8K_E",
      thumbnail: "https://i.ytimg.com/vi/FjQanNn8K_E/hqdefault.jpg",
    },
    {
      title: "المنتدى الحواري | حوار صريح بين الأستاذ مجدي حسن ومنعم سليمان عطرون",
      href: "https://www.youtube.com/watch?v=GkUWu4vekUw",
      thumbnail: "https://i.ytimg.com/vi/GkUWu4vekUw/hqdefault.jpg",
    },
    {
      title: "المنتدى الحواري | حوار صريح بين الأستاذة غادة أيوب ومنعم سليمان عطرون",
      href: "https://www.youtube.com/watch?v=DcJITUQ4IDE",
      thumbnail: "https://i.ytimg.com/vi/DcJITUQ4IDE/hqdefault.jpg",
    },
    {
      title: "ندوة حول الوضع الإنساني في جبال النوبة - بالتعاون بين المنتدى الحواري ومنظمة صوت تونقولي",
      href: "https://www.youtube.com/watch?v=2WVMUUNpYsU",
      thumbnail: "https://i.ytimg.com/vi/2WVMUUNpYsU/hqdefault.jpg",
    },
  ],
};

export const mainRoutes = ["/", "/portfolio", "/about", "/dialogues", "/events", "/news", "/funding", "/scholarships", "/insights", "/contact"] as const;
