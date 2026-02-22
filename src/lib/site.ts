const fallbackSiteUrl = "https://thedialogueplatform.com";

const normalizedUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.startsWith("http")
    ? process.env.NEXT_PUBLIC_SITE_URL
    : process.env.NEXT_PUBLIC_SITE_URL
      ? `https://${process.env.NEXT_PUBLIC_SITE_URL}`
      : fallbackSiteUrl;

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
    "Omran Adam",
    "Hind Suliman",
    "Mohammed Haggar",
    "Adam Bsher",
    "Gada Ayoub",
    "Abduerhman Deiges",
    "ABDELHADI Krow",
  ] as const,
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
  facebookCommunityImage: "/assets/media/library/seminars/silik/2026-01-24/silik-2026-01-24-0784.jpg",
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
