export const mediaLibrary = {
  heroes: {
    home: "/assets/media/site/library/seminars/silik/2026-01-24/silik-2026-01-24-0343.jpg",
    about: "/assets/media/site/library/seminars/silik/2026-01-24/silik-2026-01-24-0784.jpg",
    dialogues: "/assets/media/site/library/seminars/silik/2026-01-24/silik-2026-01-24-0747.jpg",
    events: "/assets/media/site/library/seminars/silik/2026-01-24/silik-2026-01-24-0791.jpg",
    insights: "/assets/media/site/library/seminars/silik/2026-01-24/silik-2026-01-24-0237.jpg",
    contact: "/assets/media/site/library/seminars/silik/2026-01-24/silik-2026-01-24-0394.jpg",
  },
  heroFocus: {
    home: "50% 28%",
    about: "50% 24%",
    dialogues: "50% 38%",
    events: "50% 40%",
    insights: "50% 26%",
    contact: "50% 36%",
  },
  events: {
    reel: [
      "/assets/media/site/library/seminars/silik/2026-01-24/silik-2026-01-24-0343.jpg",
      "/assets/media/site/library/seminars/silik/2026-01-24/silik-2026-01-24-0357.jpg",
      "/assets/media/site/library/seminars/silik/2026-01-24/silik-2026-01-24-0380.jpg",
      "/assets/media/site/library/seminars/silik/2026-01-24/silik-2026-01-24-0394.jpg",
      "/assets/media/site/library/seminars/silik/2026-01-24/silik-2026-01-24-0419.jpg",
      "/assets/media/site/library/seminars/silik/2026-01-24/silik-2026-01-24-0425.jpg",
      "/assets/media/site/library/seminars/silik/2026-01-24/silik-2026-01-24-0431.jpg",
      "/assets/media/site/library/seminars/silik/2026-01-24/silik-2026-01-24-0551.jpg",
      "/assets/media/site/library/seminars/silik/2026-01-24/silik-2026-01-24-0747.jpg",
      "/assets/media/site/library/seminars/silik/2026-01-24/silik-2026-01-24-0784.jpg",
    ],
    highlights: [
      {
        id: "first-meeting-2025",
        image: "/assets/media/site/library/seminars/silik/2026-01-24/silik-2026-01-24-0343.jpg",
        href: "https://www.facebook.com/share/16Qz1NFz7w/?mibextid=wwXIfr",
        channel: "facebook",
      },
      {
        id: "azzam-sept-2025",
        image: "/assets/media/site/library/seminars/silik/2026-01-24/silik-2026-01-24-0394.jpg",
        href: "https://youtu.be/eC5fJTXGQsg",
        channel: "youtube",
      },
      {
        id: "attroun-oct-2025",
        image: "/assets/media/site/library/seminars/silik/2026-01-24/silik-2026-01-24-0425.jpg",
        href: "https://youtu.be/hYD4fEoxNv8",
        channel: "youtube",
      },
      {
        id: "silik-dinner-jan-2026",
        image: "/assets/media/site/library/seminars/silik/2026-01-24/silik-2026-01-24-0431.jpg",
        href: "https://www.facebook.com/share/16Qz1NFz7w/?mibextid=wwXIfr",
        channel: "facebook",
      },
      {
        id: "silik-seminar-jan-22-2026",
        image: "/assets/media/site/library/seminars/silik/2026-01-24/silik-2026-01-24-0551.jpg",
        href: "https://youtu.be/NU42C6AANSg",
        channel: "youtube",
      },
      {
        id: "silik-seminar-jan-24-2026",
        image: "/assets/media/site/library/seminars/silik/2026-01-24/silik-2026-01-24-0626.jpg",
        href: "https://youtube.com/@thedialogueplattform",
        channel: "youtube",
      },
      {
        id: "facebook-community",
        image: "/assets/media/site/library/seminars/silik/2026-01-24/silik-2026-01-24-0747.jpg",
        href: "https://www.facebook.com/share/16Qz1NFz7w/?mibextid=wwXIfr",
        channel: "facebook",
      },
      {
        id: "facebook-gallery",
        image: "/assets/media/site/library/seminars/silik/2026-01-24/silik-2026-01-24-0784.jpg",
        href: "https://www.facebook.com/share/16Qz1NFz7w/?mibextid=wwXIfr",
        channel: "facebook",
      },
    ],
  },
} as const;

export type EventHighlightId = (typeof mediaLibrary.events.highlights)[number]["id"];
