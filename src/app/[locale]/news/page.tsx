import Image from "next/image";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/AnimatedBlock";
import { SudanAiAssistant, type AssistantCopy } from "@/components/SudanAiAssistant";
import { SudanNewsFeed, type NewsFeedCopy } from "@/components/SudanNewsFeed";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { mediaLibrary } from "@/lib/media";

type PageProps = {
  params: {
    locale: string;
  };
};

const hubCopy: Record<
  Locale,
  {
    badge: string;
    title: string;
    description: string;
    assistant: AssistantCopy;
    feed: NewsFeedCopy;
  }
> = {
  en: {
    badge: "Dialogue Intelligence Hub",
    title: "AI guidance and real-time Sudan updates in one place",
    description: "",
    assistant: {
      badge: "Dialogue AI Desk",
      title: "Ask our AI assistant about The Dialogue Platform and Sudan updates.",
      description:
        "Start a direct conversation about our dialogue work, events, board activities, and public resources. You can also request real-time Sudan context with source-linked answers.",
      quickStartLabel: "Start with one click",
      starterPrompts: [
        "Latest humanitarian updates in Sudan and what they mean for civilians",
        "What is changing in Sudan this week across diplomacy and aid?",
        "What is The Dialogue Platform and how can institutions collaborate with you?",
        "Summarize recent statements on Sudan from the UN, AU, EU, and US",
        "Give me a short summary of your latest events and where to watch them",
        "What are the latest displacement and relief trends in Sudan?",
        "How can municipalities partner with The Dialogue Platform?",
        "Show the most recent Sudan policy and sanctions developments",
      ],
      inputPlaceholder: "Type your question...",
      sendLabel: "Send",
      thinkingLabel: "Analyzing and preparing an answer...",
      unavailableMessage: "AI is temporarily unavailable ....",
      welcomeMessage:
        "Welcome. I can answer questions about The Dialogue Platform, our dialogue practice, and latest Sudan updates with links when available.",
      sourcesLabel: "Sources",
      note: "Tip: ask time-based questions such as “What changed today?” for the freshest updates.",
    },
    feed: {
      statusLabel: "Live Sudan monitor",
      statusDescription:
        "Automatic feed from trusted international coverage across diplomacy, humanitarian work, policy, research, and global public statements.",
      refreshLabel: "Refresh now",
      lastUpdatedLabel: "Updated",
      loadingLabel: "Loading latest Sudan headlines...",
      latestLabel: "Latest news",
      briefingLabel: "Today's Sudan Briefing",
      briefingEmpty: "No verified updates have arrived in the last 24 hours yet.",
      briefingCoverageLabel: "Coverage",
      briefingSourceMixLabel: "Top sources",
      briefingThemesLabel: "Main themes",
      notificationLabel: "Live stream",
      dragHint: "Hold and drag",
      visualLabel: "Latest image",
      openStoryLabel: "Story source",
      openSourceLabel: "Source",
      reportCenterLabel: "Daily report center",
      reportDescription: "Generate and download a concise daily Sudan briefing as PDF, then re-open previous reports from the archive.",
      downloadReportLabel: "Download PDF",
      archiveLabel: "Report archive",
      archiveEmptyLabel: "No archived reports yet. Your first report appears after the next verified updates.",
      unavailableMessage: "Live Sudan news is temporarily unavailable. Please try again in a moment.",
    },
  },
  no: {
    badge: "Dialog Intelligenshub",
    title: "AI-veiledning og sanntidsoppdateringer om Sudan på ett sted.",
    description:
      "Denne huben kombinerer AI-assistenten til The Dialogue Platform med kontinuerlig oppdatert Sudan-dekning fra pålitelige internasjonale kilder.",
    assistant: {
      badge: "Dialog AI-desk",
      title: "Spør AI-assistenten om The Dialogue Platform og oppdateringer fra Sudan.",
      description:
        "Start en direkte samtale om dialogarbeidet vårt, arrangementer, styrearbeid og åpne ressurser. Du kan også be om sanntidskontekst om Sudan med kildehenvisninger.",
      quickStartLabel: "Start med ett klikk",
      starterPrompts: [
        "Siste humanitære oppdateringer i Sudan og hva dette betyr for sivile",
        "Hva har endret seg i Sudan denne uken innen diplomati og bistand?",
        "Hva er The Dialogue Platform, og hvordan kan institusjoner samarbeide med dere?",
        "Oppsummer nye uttalelser om Sudan fra FN, AU, EU og USA",
        "Gi meg en kort oppsummering av de siste arrangementene og hvor jeg kan se dem",
        "Hva er de siste trendene innen fordrivelse og nødhjelp i Sudan?",
        "Hvordan kan kommuner samarbeide med The Dialogue Platform?",
        "Vis de nyeste utviklingene om Sudan innen politikk og sanksjoner",
      ],
      inputPlaceholder: "Skriv spørsmålet ditt...",
      sendLabel: "Send",
      thinkingLabel: "Analyserer og forbereder svar...",
      unavailableMessage: "AI is temporarily unavailable ....",
      welcomeMessage:
        "Velkommen. Jeg kan svare på spørsmål om The Dialogue Platform, dialogarbeidet vårt og siste oppdateringer fra Sudan med kildelenker når mulig.",
      sourcesLabel: "Kilder",
      note: "Tips: bruk tidsavgrensede spørsmål som «Hva har skjedd i dag?» for ferskest mulig svar.",
    },
    feed: {
      statusLabel: "Live Sudan-overvåkning",
      statusDescription:
        "Automatisk feed fra pålitelig internasjonal dekning av diplomati, humanitær situasjon, politikk, forskning og offentlige uttalelser.",
      refreshLabel: "Oppdater nå",
      lastUpdatedLabel: "Oppdatert",
      loadingLabel: "Laster inn siste Sudan-nyheter...",
      latestLabel: "Siste nyheter",
      briefingLabel: "Dagens Sudan-brief",
      briefingEmpty: "Ingen verifiserte oppdateringer har kommet inn de siste 24 timene ennå.",
      briefingCoverageLabel: "Dekning",
      briefingSourceMixLabel: "Toppkilder",
      briefingThemesLabel: "Hovedtema",
      notificationLabel: "Direktestrøm",
      dragHint: "Hold og dra",
      visualLabel: "Siste bilde",
      openStoryLabel: "Sakskilde",
      openSourceLabel: "Kilde",
      reportCenterLabel: "Daglig rapportsenter",
      reportDescription: "Generer og last ned en kort daglig Sudan-brief som PDF, og åpne tidligere rapporter fra arkivet.",
      downloadReportLabel: "Last ned PDF",
      archiveLabel: "Rapportarkiv",
      archiveEmptyLabel: "Ingen arkiverte rapporter ennå. Første rapport vises etter neste verifiserte oppdateringer.",
      unavailableMessage: "Live nyheter om Sudan er midlertidig utilgjengelige. Prøv igjen om litt.",
    },
  },
  ar: {
    badge: "مركز الذكاء الحواري",
    title: "إرشاد ذكي وتحديثات السودان المباشرة في مكان واحد.",
    description:
      "يجمع هذا المركز بين مساعد منصة الحوار الذكي وتغطية السودان المتجددة باستمرار من مصادر دولية موثوقة.",
    assistant: {
      badge: "مكتب الذكاء الاصطناعي",
      title: "اسأل مساعدنا الذكي عن منصة الحوار وآخر التطورات في السودان.",
      description:
        "ابدأ محادثة مباشرة حول عمل المنصة وفعالياتها ونشاط مجلس الإدارة ومواردها العامة. ويمكنك أيضاً طلب تحديثات السودان اللحظية مع روابط للمصادر.",
      quickStartLabel: "ابدأ بنقرة واحدة",
      starterPrompts: [
        "آخر المستجدات الإنسانية في السودان وما أثرها على المدنيين",
        "ما الذي تغيّر في السودان هذا الأسبوع دبلوماسياً وإنسانياً؟",
        "ما هي منصة الحوار وكيف يمكن للمؤسسات التعاون معكم؟",
        "لخّص أحدث التصريحات عن السودان من الأمم المتحدة والاتحاد الأفريقي والاتحاد الأوروبي والولايات المتحدة",
        "قدّم لي ملخصاً قصيراً لأحدث فعالياتكم وروابط المتابعة",
        "ما أحدث اتجاهات النزوح والاستجابة الإنسانية في السودان؟",
        "كيف يمكن للبلديات التعاون مع منصة الحوار؟",
        "اعرض أحدث تطورات السياسات والعقوبات المتعلقة بالسودان",
      ],
      inputPlaceholder: "اكتب سؤالك هنا...",
      sendLabel: "إرسال",
      thinkingLabel: "جارٍ التحليل وإعداد الإجابة...",
      unavailableMessage: "AI is temporarily unavailable ....",
      welcomeMessage:
        "مرحباً بك. يمكنني الإجابة عن أسئلتك حول منصة الحوار، ومنهجنا في الحوار، وآخر تحديثات السودان مع روابط للمصادر عند توفرها.",
      sourcesLabel: "المصادر",
      note: "نصيحة: اسأل بأسئلة مرتبطة بالزمن مثل «ما الذي تغيّر اليوم؟» للحصول على أحدث نتيجة.",
    },
    feed: {
      statusLabel: "مراقبة السودان المباشرة",
      statusDescription:
        "تغذية تلقائية من مصادر دولية موثوقة تغطي الدبلوماسية والوضع الإنساني والسياسات والأبحاث والتصريحات العامة.",
      refreshLabel: "تحديث الآن",
      lastUpdatedLabel: "آخر تحديث",
      loadingLabel: "جارٍ تحميل أحدث عناوين السودان...",
      latestLabel: "أحدث الأخبار",
      briefingLabel: "إحاطة السودان اليوم",
      briefingEmpty: "لا توجد تحديثات موثوقة جديدة خلال آخر 24 ساعة حتى الآن.",
      briefingCoverageLabel: "التغطية",
      briefingSourceMixLabel: "أبرز المصادر",
      briefingThemesLabel: "المحاور الرئيسية",
      notificationLabel: "تدفق مباشر",
      dragHint: "اضغط واسحب",
      visualLabel: "أحدث صورة",
      openStoryLabel: "مصدر الخبر",
      openSourceLabel: "المصدر",
      reportCenterLabel: "مركز التقرير اليومي",
      reportDescription: "أنشئ تقريراً يومياً موجزاً عن السودان بصيغة PDF وقم بتحميله، ثم ارجع إلى التقارير السابقة من الأرشيف.",
      downloadReportLabel: "تنزيل PDF",
      archiveLabel: "أرشيف التقارير",
      archiveEmptyLabel: "لا توجد تقارير مؤرشفة بعد. سيظهر أول تقرير بعد وصول التحديثات الموثوقة التالية.",
      unavailableMessage: "تغطية أخبار السودان المباشرة غير متاحة حالياً. حاول مرة أخرى بعد قليل.",
    },
  },
};

export default function NewsPage({ params }: PageProps) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const copy = hubCopy[locale];

  return (
    <div className="mx-auto max-w-content px-6 pb-24">
      <section className="section-padding pt-12 sm:pt-16">
        <div className="hero-media min-h-[320px] bg-[linear-gradient(145deg,#0b3657_0%,#1e5873_72%,#f2a33a_125%)]">
          <Image
            src={mediaLibrary.heroes.news}
            alt="Dialogue intelligence hub"
            fill
            className="hero-image-motion object-cover"
            style={{ objectPosition: mediaLibrary.heroFocus.news }}
          />
          <div className="relative flex min-h-[320px] flex-col justify-end p-8 sm:p-10">
            <Reveal>
              <span className="eyebrow border-white/20 bg-white/15 text-white">{copy.badge}</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-5 max-w-3xl text-4xl leading-tight text-white sm:text-5xl">{copy.title}</h1>
            </Reveal>
            {copy.description ? (
              <Reveal delay={0.16}>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/90 sm:text-base">{copy.description}</p>
              </Reveal>
            ) : null}
          </div>
        </div>
      </section>

      <SudanAiAssistant locale={locale} copy={copy.assistant} />
      <SudanNewsFeed locale={locale} copy={copy.feed} />
    </div>
  );
}
