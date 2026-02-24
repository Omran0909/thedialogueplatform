import type { Locale } from "@/lib/i18n/config";

export type LayoutText = {
  nav: {
    about: string;
    dialogues: string;
    events: string;
    news: string;
    insights: string;
    contact: string;
  };
  menu: string;
  officialChannels: string;
  siteTagline: string;
  footer: {
    mission: string;
    collaborationPrefix: string;
    navigate: string;
    channels: string;
    contact: string;
  };
  language: {
    label: string;
    choose: string;
    en: string;
    no: string;
    ar: string;
  };
};

export const layoutText: Record<Locale, LayoutText> = {
  en: {
    nav: {
      about: "About",
      dialogues: "Dialogues",
      events: "Events",
      news: "News",
      insights: "Insights",
      contact: "Contact",
    },
    menu: "Menu",
    officialChannels: "Official channels",
    siteTagline: "Trust and Peace Through Dialogue",
    footer: {
      mission: "Building trust and peace through inclusive dialogue design and institutional collaboration.",
      collaborationPrefix: "In collaboration with",
      navigate: "Navigate",
      channels: "Official Channels",
      contact: "Contact",
    },
    language: {
      label: "Language",
      choose: "Choose language",
      en: "English",
      no: "Norwegian",
      ar: "Arabic",
    },
  },
  no: {
    nav: {
      about: "Om oss",
      dialogues: "Dialoger",
      events: "Arrangementer",
      news: "Nyheter",
      insights: "Innsikt",
      contact: "Kontakt",
    },
    menu: "Meny",
    officialChannels: "Offisielle kanaler",
    siteTagline: "Tillit og fred gjennom dialog",
    footer: {
      mission: "Vi bygger tillit og fred gjennom inkluderende dialogdesign og institusjonelt samarbeid.",
      collaborationPrefix: "I samarbeid med",
      navigate: "Naviger",
      channels: "Offisielle kanaler",
      contact: "Kontakt",
    },
    language: {
      label: "Språk",
      choose: "Velg språk",
      en: "Engelsk",
      no: "Norsk",
      ar: "Arabisk",
    },
  },
  ar: {
    nav: {
      about: "من نحن",
      dialogues: "الحوارات",
      events: "الفعاليات",
      news: "الأخبار",
      insights: "المعارف",
      contact: "تواصل",
    },
    menu: "القائمة",
    officialChannels: "القنوات الرسمية",
    siteTagline: "بناء الثقة والسلام عبر الحوار",
    footer: {
      mission: "نبني الثقة والسلام من خلال تصميم حوارات شاملة وتعاون مؤسسي فعّال.",
      collaborationPrefix: "بالتعاون مع",
      navigate: "التنقل",
      channels: "القنوات الرسمية",
      contact: "التواصل",
    },
    language: {
      label: "اللغة",
      choose: "اختر اللغة",
      en: "الإنجليزية",
      no: "النرويجية",
      ar: "العربية",
    },
  },
};
