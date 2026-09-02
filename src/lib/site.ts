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
  adsensePublisherId: "ca-pub-2557590642299552",
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
      name: "Mohammed Haggar",
      photo: "/assets/media/site/board/mohammed-haggar.jpg",
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
      name: "Abduerhman Deiges",
      photo: "/assets/media/site/board/abduerhman-deiges.jpg",
    },
    {
      name: "Abdelhadi Krow",
      photo: "/assets/media/site/board/abdelhadi-krow.jpg",
    },
    {
      name: "Enas Naseir",
      photo: "/assets/media/site/board/enas-naseir.jpg",
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
      href: "https://www.facebook.com/share/16Qz1NFz7w/?mibextid=wwXIfr",
    },
  ],
  facebookPageUrl: "https://www.facebook.com/share/16Qz1NFz7w/?mibextid=wwXIfr",
  facebookCommunityImage: "/assets/media/site/library/seminars/silik/2026-01-24/silik-2026-01-24-0784.jpg",
  exampleDialogues: [
    {
      title: "Between War and Peace with Mubarak Abdelrahman Ardol",
      href: "https://www.youtube.com/watch?v=hcgJB4NKho0",
      thumbnail: "/assets/media/site/library/seminars/ardol/2026-08-29/ardol-2026-08-29-thumbnail.jpg",
    },
    {
      title: "Khalid Omer Yousif with Dr. Bakri Aljack",
      href: "https://www.youtube.com/@thedialogueplattform/search?query=%D8%AE%D8%A7%D9%84%D8%AF%20%D8%B9%D9%85%D8%B1%20%D9%8A%D9%88%D8%B3%D9%81%20%D8%A8%D9%83%D8%B1%D9%8A%20%D8%A7%D9%84%D8%AC%D8%A7%D9%83",
      thumbnail: "/assets/media/youtube/khalid-bakri-dialogue.png",
    },
    {
      title: "Political Dialogue with Dr. Azzam Abdallah Ibrahim",
      href: "https://youtu.be/eC5fJTXGQsg",
      thumbnail: "https://i.ytimg.com/vi/eC5fJTXGQsg/hqdefault.jpg",
    },
    {
      title: "Conflict, Trust, and Peace with Moneim Suleiman Atroun",
      href: "https://youtu.be/NU42C6AANSg",
      thumbnail: "https://i.ytimg.com/vi/NU42C6AANSg/hqdefault.jpg",
    },
    {
      title: "Community Dialogue with Hassan and Moneim Atroun",
      href: "https://www.youtube.com/@thedialogueplattform/search?query=%D8%AD%D8%B3%D9%86%20%D9%85%D9%86%D8%B9%D9%85%20%D8%B9%D8%B7%D8%B1%D9%88%D9%86",
      thumbnail: "/assets/media/youtube/community-dialogue-hassan-atroun.png",
    },
    {
      title: "Direct Community Exchange with Gada Ayoub and Atroun",
      href: "https://www.youtube.com/@thedialogueplattform/search?query=%D8%BA%D8%A7%D8%AF%D8%A9%20%D8%A3%D9%8A%D9%88%D8%A8%20%D9%85%D9%86%D8%B9%D9%85%20%D8%B9%D8%B7%D8%B1%D9%88%D9%86",
      thumbnail: "/assets/media/youtube/gada-ayoub-atroun-dialogue.png",
    },
    {
      title: "Humanitarian Situation Seminar in Jabal Awliya",
      href: "https://www.youtube.com/@thedialogueplattform/search?query=%D8%A7%D9%84%D9%88%D8%B6%D8%B9%20%D8%A7%D9%84%D8%A5%D9%86%D8%B3%D8%A7%D9%86%D9%8A%20%D8%AC%D8%A8%D8%A7%D9%84%20%D8%A7%D9%84%D8%A3%D9%88%D9%84%D9%8A%D8%A7%D8%A1",
      thumbnail: "/assets/media/youtube/humanitarian-situation-seminar.png",
    },
  ],
};

export const mainRoutes = ["/", "/portfolio", "/about", "/dialogues", "/events", "/news", "/funding", "/scholarships", "/insights", "/contact"] as const;
