export const mediaLibrary = {
  heroes: {
    home: "/assets/media/library/seminars/silik/2026-01-24/silik-2026-01-24-0592.jpg",
    about: "/assets/media/library/seminars/attroun/2025-10-18/attroun-2025-10-18-0018.jpg",
    dialogues: "/assets/media/library/seminars/silik/2026-01-22/silik-2026-01-22-0520.jpg",
    events: "/assets/media/library/seminars/azzam/2025-09-13/azzam-2025-09-13-0013.jpg",
    insights: "/assets/media/library/seminars/silik/2026-01-24/silik-2026-01-24-0419.jpg",
  },
  events: {
    reel: [
      "/assets/media/library/seminars/azzam/2025-09-13/azzam-2025-09-13-0006.jpg",
      "/assets/media/library/seminars/azzam/2025-09-13/azzam-2025-09-13-0038.jpg",
      "/assets/media/library/seminars/attroun/2025-10-18/attroun-2025-10-18-0011.jpg",
      "/assets/media/library/seminars/silik/2026-01-21-first-dinner/silik-2026-01-21-first-dinner-0004.jpg",
      "/assets/media/library/seminars/silik/2026-01-22/silik-2026-01-22-0642.jpg",
      "/assets/media/library/seminars/silik/2026-01-22/silik-2026-01-22-0695.jpg",
      "/assets/media/library/seminars/silik/2026-01-24/silik-2026-01-24-0747.jpg",
      "/assets/media/library/seminars/silik/2026-01-24/silik-2026-01-24-0357.jpg",
      "/assets/media/library/seminars/silik/2026-01-24/silik-2026-01-24-0784.jpg",
      "/assets/media/library/seminars/silik/2026-01-24/silik-2026-01-24-0419.jpg",
    ],
    highlights: [
      {
        id: "first-meeting-2025",
        image: "/assets/media/library/seminars/azzam/2025-09-13/azzam-2025-09-13-0012.jpg",
        href: "https://www.facebook.com/share/16Qz1NFz7w/?mibextid=wwXIfr",
        channel: "facebook",
      },
      {
        id: "azzam-sept-2025",
        image: "/assets/media/library/seminars/azzam/2025-09-13/azzam-2025-09-13-0039.jpg",
        href: "https://youtu.be/eC5fJTXGQsg",
        channel: "youtube",
      },
      {
        id: "attroun-oct-2025",
        image: "/assets/media/library/seminars/attroun/2025-10-18/attroun-2025-10-18-0010.jpg",
        href: "https://youtu.be/hYD4fEoxNv8",
        channel: "youtube",
      },
      {
        id: "silik-dinner-jan-2026",
        image: "/assets/media/library/seminars/silik/2026-01-21-first-dinner/silik-2026-01-21-first-dinner-0002.jpg",
        href: "https://www.facebook.com/people/The-Dialogue-Platform/61578814174457/",
        channel: "facebook",
      },
      {
        id: "silik-seminar-jan-22-2026",
        image: "/assets/media/library/seminars/silik/2026-01-22/silik-2026-01-22-0681.jpg",
        href: "https://youtu.be/NU42C6AANSg",
        channel: "youtube",
      },
      {
        id: "silik-seminar-jan-24-2026",
        image: "/assets/media/library/seminars/silik/2026-01-24/silik-2026-01-24-0784.jpg",
        href: "https://youtube.com/@thedialogueplattform",
        channel: "youtube",
      },
      {
        id: "facebook-community",
        image: "/assets/media/library/seminars/silik/2026-01-24/silik-2026-01-24-0747.jpg",
        href: "https://www.facebook.com/share/16Qz1NFz7w/?mibextid=wwXIfr",
        channel: "facebook",
      },
      {
        id: "facebook-gallery",
        image: "/assets/media/library/seminars/attroun/2025-10-18/attroun-2025-10-18-0019.jpg",
        href: "https://www.facebook.com/TheDialoguePlatform/photos",
        channel: "facebook",
      },
    ],
  },
} as const;

export type EventHighlightId = (typeof mediaLibrary.events.highlights)[number]["id"];
