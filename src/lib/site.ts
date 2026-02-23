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
  description:
    "The Dialogue Platform builds trust and peace through inclusive, structured dialogue in collaboration with Nansen Peace Center and Lillestrom Municipality.",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "dialogplattformen@gmail.com",
  contactPhone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "",
  partners: ["Nansen Peace Center", "Lillestrom Municipality"],
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
      title: "Example Dialogue 01",
      href: "https://youtu.be/eC5fJTXGQsg",
      thumbnail: "https://i.ytimg.com/vi/eC5fJTXGQsg/hqdefault.jpg",
    },
    {
      title: "Example Dialogue 02",
      href: "https://youtu.be/hYD4fEoxNv8",
      thumbnail: "https://i.ytimg.com/vi/hYD4fEoxNv8/hqdefault.jpg",
    },
    {
      title: "Example Dialogue 03",
      href: "https://youtu.be/NU42C6AANSg",
      thumbnail: "https://i.ytimg.com/vi/NU42C6AANSg/hqdefault.jpg",
    },
  ],
};

export const mainRoutes = ["/", "/about", "/dialogues", "/events", "/insights", "/contact"] as const;
