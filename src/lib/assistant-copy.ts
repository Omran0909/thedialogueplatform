import type { AssistantCopy } from "@/components/SudanAiAssistant";
import type { Locale } from "@/lib/i18n/config";

export const assistantCopy: Record<Locale, AssistantCopy> = {
  en: {
    badge: "Dialogue AI Desk",
    title: "Ask The Dialogue Platform assistant.",
    description:
      "Ask about our work, events, funding and scholarship opportunities, collaboration routes, or latest Sudan updates with source links when available.",
    quickStartLabel: "Start with one click",
    starterPrompts: [
      "What is The Dialogue Platform and how can institutions collaborate?",
      "Show funding opportunities for NGOs and civil-society organisations",
      "Find scholarships for refugees, students, and researchers",
      "What opportunities are closing soon?",
      "How can I report a suspicious or broken opportunity link?",
      "Summarize your latest events and where to watch them",
      "Latest humanitarian updates in Sudan and what they mean for civilians",
      "How can municipalities partner with The Dialogue Platform?",
    ],
    inputPlaceholder: "Type your question...",
    sendLabel: "Send",
    thinkingLabel: "Analyzing and preparing an answer...",
    unavailableMessage: "AI is temporarily unavailable. Please try again shortly.",
    welcomeMessage:
      "Welcome. I can help you navigate The Dialogue Platform, find official funding and scholarship sources, and answer Sudan update questions with links when available.",
    sourcesLabel: "Sources",
    note: "Tip: ask specific questions such as “funding for NGOs in Africa” or “scholarships for refugee students”.",
  },
  no: {
    badge: "Dialog AI-desk",
    title: "Spør assistenten til The Dialogue Platform.",
    description:
      "Spør om arbeidet vårt, arrangementer, finansiering, stipend, samarbeid eller siste oppdateringer fra Sudan med kildelenker når tilgjengelig.",
    quickStartLabel: "Start med ett klikk",
    starterPrompts: [
      "Hva er The Dialogue Platform, og hvordan kan institusjoner samarbeide?",
      "Vis finansieringsmuligheter for frivillige organisasjoner og sivilsamfunn",
      "Finn stipend for flyktninger, studenter og forskere",
      "Hvilke muligheter stenger snart?",
      "Hvordan rapporterer jeg en mistenkelig eller ødelagt mulighetslenke?",
      "Oppsummer de siste arrangementene og hvor jeg kan se dem",
      "Siste humanitære oppdateringer i Sudan og hva dette betyr for sivile",
      "Hvordan kan kommuner samarbeide med The Dialogue Platform?",
    ],
    inputPlaceholder: "Skriv spørsmålet ditt...",
    sendLabel: "Send",
    thinkingLabel: "Analyserer og forbereder svar...",
    unavailableMessage: "AI er midlertidig utilgjengelig. Prøv igjen om litt.",
    welcomeMessage:
      "Velkommen. Jeg kan hjelpe deg med The Dialogue Platform, offisielle finansierings- og stipendkilder, og spørsmål om Sudan med kildelenker når mulig.",
    sourcesLabel: "Kilder",
    note: "Tips: still konkrete spørsmål som «finansiering for NGO-er i Afrika» eller «stipend for flyktningstudenter».",
  },
  ar: {
    badge: "مكتب الذكاء الاصطناعي",
    title: "اسأل مساعد منصة الحوار.",
    description:
      "اسأل عن عملنا وفعالياتنا وفرص التمويل والمنح الدراسية ومسارات التعاون وآخر تطورات السودان مع روابط للمصادر عند توفرها.",
    quickStartLabel: "ابدأ بنقرة واحدة",
    starterPrompts: [
      "ما هي منصة الحوار وكيف يمكن للمؤسسات التعاون معها؟",
      "اعرض فرص تمويل للمنظمات والمجتمع المدني",
      "اعثر على منح دراسية للاجئين والطلاب والباحثين",
      "ما الفرص التي ستغلق قريباً؟",
      "كيف أبلغ عن رابط مشبوه أو معطل؟",
      "لخص أحدث فعالياتكم وروابط المشاهدة",
      "آخر المستجدات الإنسانية في السودان وما أثرها على المدنيين",
      "كيف يمكن للبلديات التعاون مع منصة الحوار؟",
    ],
    inputPlaceholder: "اكتب سؤالك هنا...",
    sendLabel: "إرسال",
    thinkingLabel: "جارٍ التحليل وإعداد الإجابة...",
    unavailableMessage: "المساعد الذكي غير متاح مؤقتاً. حاول مرة أخرى بعد قليل.",
    welcomeMessage:
      "مرحباً بك. يمكنني مساعدتك في تصفح منصة الحوار والعثور على مصادر رسمية للتمويل والمنح الدراسية والإجابة عن أسئلة السودان مع روابط للمصادر عند توفرها.",
    sourcesLabel: "المصادر",
    note: "نصيحة: اسأل أسئلة محددة مثل «تمويل للمنظمات في أفريقيا» أو «منح للاجئين».",
  },
};
