import type { Locale } from "@/lib/i18n/config";

export type LayoutText = {
  nav: {
    about: string;
    dialogues: string;
    events: string;
    news: string;
    funding: string;
    scholarships: string;
    insights: string;
    contact: string;
  };
  menu: string;
  officialChannels: string;
  siteTagline: string;
  footer: {
    mission: string;
    collaborationPrefix: string;
    technicalPartnerPrefix: string;
    navigate: string;
    channels: string;
    contact: string;
    legalRegistration: string;
    organizationNumber: string;
    registeredIn: string;
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
      news: "Dialogue Hub",
      funding: "Funding",
      scholarships: "Scholarships",
      insights: "Insights",
      contact: "Contact",
    },
    menu: "Menu",
    officialChannels: "Official channels",
    siteTagline: "Trust and Peace Through Dialogue",
    footer: {
      mission: "Building trust and peace through inclusive dialogue design and institutional collaboration.",
      collaborationPrefix: "In collaboration with",
      technicalPartnerPrefix: "Technology partner",
      navigate: "Navigate",
      channels: "Official Channels",
      contact: "Contact",
      legalRegistration: "Legal registration",
      organizationNumber: "Org. no.",
      registeredIn: "Registered in",
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
      news: "Dialoghub",
      funding: "Finansiering",
      scholarships: "Stipender",
      insights: "Innsikt",
      contact: "Kontakt",
    },
    menu: "Meny",
    officialChannels: "Offisielle kanaler",
    siteTagline: "Tillit og fred gjennom dialog",
    footer: {
      mission: "Vi bygger tillit og fred gjennom inkluderende dialogdesign og institusjonelt samarbeid.",
      collaborationPrefix: "I samarbeid med",
      technicalPartnerPrefix: "Teknologipartner",
      navigate: "Naviger",
      channels: "Offisielle kanaler",
      contact: "Kontakt",
      legalRegistration: "Juridisk registrering",
      organizationNumber: "Org.nr.",
      registeredIn: "Registrert i",
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
      news: "مركز الحوار الذكي",
      funding: "التمويل",
      scholarships: "المنح الدراسية",
      insights: "المعارف",
      contact: "تواصل",
    },
    menu: "القائمة",
    officialChannels: "القنوات الرسمية",
    siteTagline: "بناء الثقة والسلام عبر الحوار",
    footer: {
      mission: "نبني الثقة والسلام من خلال تصميم حوارات شاملة وتعاون مؤسسي فعّال.",
      collaborationPrefix: "بالتعاون مع",
      technicalPartnerPrefix: "الشريك التقني",
      navigate: "التنقل",
      channels: "القنوات الرسمية",
      contact: "التواصل",
      legalRegistration: "التسجيل القانوني",
      organizationNumber: "رقم المنظمة",
      registeredIn: "مسجلة في",
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
