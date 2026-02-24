import Image from "next/image";
import { notFound } from "next/navigation";
import { HoverCard, Reveal } from "@/components/AnimatedBlock";
import { SudanAiAssistant, type AssistantCopy } from "@/components/SudanAiAssistant";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getContent } from "@/lib/i18n/get-content";
import { mediaLibrary } from "@/lib/media";

type PageProps = {
  params: {
    locale: string;
  };
};

const assistantCopy: Record<Locale, AssistantCopy> = {
  en: {
    badge: "Dialogue AI Desk",
    title: "Ask our AI assistant about The Dialogue Platform and Sudan updates.",
    description:
      "Start a direct conversation about our dialogue work, events, and public resources. You can also ask for latest Sudan context updates and get source-linked summaries.",
    quickStartLabel: "Start with one click",
    starterPrompts: [
      "Latest humanitarian updates in Sudan and what they mean for civilians",
      "What do you know about Sudan right now?",
      "What is The Dialogue Platform and how can institutions collaborate with you?",
      "Give me a short summary of your latest events and where to watch them",
    ],
    inputPlaceholder: "Type your question...",
    sendLabel: "Send",
    thinkingLabel: "Analyzing and preparing an answer...",
    unavailableMessage: "AI is temporarily unavailable ....",
    welcomeMessage:
      "Welcome. I can answer questions about The Dialogue Platform, our dialogue practice, and latest Sudan updates with links when available.",
    sourcesLabel: "Sources",
    note: "For live Sudan updates, ask a time-based question (for example: “What changed this week?”).",
  },
  no: {
    badge: "Dialog AI-desk",
    title: "Spør AI-assistenten om The Dialogue Platform og oppdateringer fra Sudan.",
    description:
      "Start en direkte samtale om dialogarbeidet vårt, arrangementer og offentlige ressurser. Du kan også be om siste oppdateringer om situasjonen i Sudan med kilder.",
    quickStartLabel: "Start med ett klikk",
    starterPrompts: [
      "Siste humanitære oppdateringer i Sudan og hva dette betyr for sivile",
      "Hva vet du om situasjonen i Sudan akkurat nå?",
      "Hva er The Dialogue Platform, og hvordan kan institusjoner samarbeide med dere?",
      "Gi meg en kort oppsummering av de siste arrangementene og hvor jeg kan se dem",
    ],
    inputPlaceholder: "Skriv spørsmålet ditt...",
    sendLabel: "Send",
    thinkingLabel: "Analyserer og forbereder svar...",
    unavailableMessage: "AI is temporarily unavailable ....",
    welcomeMessage:
      "Velkommen. Jeg kan svare på spørsmål om The Dialogue Platform, dialogarbeidet vårt og siste oppdateringer fra Sudan med kildelenker når mulig.",
    sourcesLabel: "Kilder",
    note: "For ferske Sudan-oppdateringer: still tidsavgrensede spørsmål, for eksempel «Hva har skjedd denne uken?»",
  },
  ar: {
    badge: "مكتب الذكاء الاصطناعي",
    title: "اسأل مساعدنا الذكي عن منصة الحوار وآخر التطورات في السودان.",
    description:
      "ابدأ محادثة مباشرة حول عمل المنصة وفعالياتها ومواردها العامة. ويمكنك أيضاً طلب آخر التحديثات عن الوضع في السودان مع روابط للمصادر.",
    quickStartLabel: "ابدأ بنقرة واحدة",
    starterPrompts: [
      "آخر المستجدات الإنسانية في السودان وما أثرها على المدنيين",
      "ماذا تعرف عن الوضع الحالي في السودان؟",
      "ما هي منصة الحوار وكيف يمكن للمؤسسات التعاون معكم؟",
      "قدّم لي ملخصاً قصيراً لأحدث فعالياتكم وروابط المتابعة",
    ],
    inputPlaceholder: "اكتب سؤالك هنا...",
    sendLabel: "إرسال",
    thinkingLabel: "جارٍ التحليل وإعداد الإجابة...",
    unavailableMessage: "AI is temporarily unavailable ....",
    welcomeMessage:
      "مرحباً بك. يمكنني الإجابة عن أسئلتك حول منصة الحوار، ومنهجنا في الحوار، وآخر تحديثات السودان مع روابط للمصادر عند توفرها.",
    sourcesLabel: "المصادر",
    note: "للحصول على تحديثات مباشرة عن السودان، اسأل سؤالاً مرتبطاً بالوقت مثل: «ما الذي تغيّر هذا الأسبوع؟».",
  },
};

export default function InsightsPage({ params }: PageProps) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const localized = getContent(locale);

  return (
    <div className="mx-auto max-w-content px-6 pb-24">
      <section className="section-padding pt-12 sm:pt-16">
        <div className="hero-media min-h-[320px] bg-[linear-gradient(145deg,#0b3657_0%,#1e5873_70%,#f2a33a_122%)]">
          <Image
            src={mediaLibrary.heroes.insights}
            alt="Dialogue notes and participant materials"
            fill
            className="hero-image-motion object-cover"
            style={{ objectPosition: mediaLibrary.heroFocus.insights }}
          />
          <div className="relative flex min-h-[320px] flex-col justify-end p-8 sm:p-10">
            <Reveal>
              <span className="eyebrow border-white/20 bg-white/15 text-white">{localized.insights.title}</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-5 max-w-3xl text-4xl leading-tight text-white sm:text-5xl">{localized.insights.heroTitle}</h1>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-line/80">
        <div className="grid gap-4 md:grid-cols-3">
          {localized.insights.insightTypes.map((insight, index) => (
            <HoverCard key={insight.title} delay={index * 0.08}>
              <article className="surface-card h-full p-6">
                <h2 className="text-xl text-text-primary">{insight.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{insight.description}</p>
              </article>
            </HoverCard>
          ))}
        </div>
      </section>

      <section className="section-padding border-t border-line/80">
        <Reveal>
          <div className="surface-card p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-text-secondary">{localized.insights.publicationLabel}</p>
            <p className="mt-4 max-w-prose text-base leading-relaxed text-text-secondary">{localized.insights.publicationDescription}</p>
          </div>
        </Reveal>
      </section>

      <SudanAiAssistant locale={locale} copy={assistantCopy[locale]} />
    </div>
  );
}
