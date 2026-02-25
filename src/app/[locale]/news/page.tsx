import Image from "next/image";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/AnimatedBlock";
import { SudanNewsFeed, type NewsFeedCopy } from "@/components/SudanNewsFeed";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { mediaLibrary } from "@/lib/media";

type PageProps = {
  params: {
    locale: string;
  };
};

const newsPageCopy: Record<
  Locale,
  {
    badge: string;
    title: string;
    description: string;
    feed: NewsFeedCopy;
  }
> = {
  en: {
    badge: "News",
    title: "Latest Sudan world news with verified source links.",
    description:
      "This section tracks broad Sudan coverage from international outlets, including diplomacy, humanitarian updates, research, policy, and public statements, ordered by publication time.",
    feed: {
      statusLabel: "Live Sudan monitor",
      statusDescription:
        "Automatic feed from international coverage with broad topic scope. Stories are filtered for legitimacy and balance, then stream in one continuous direction.",
      refreshLabel: "Refresh now",
      lastUpdatedLabel: "Updated",
      loadingLabel: "Loading latest Sudan headlines...",
      latestLabel: "Latest by time",
      notificationLabel: "Upward live stream",
      dragHint: "Hold and drag",
      visualLabel: "Latest image",
      openStoryLabel: "Story source",
      openSourceLabel: "Source",
      unavailableMessage: "Live Sudan news is temporarily unavailable. Please try again in a moment.",
    },
  },
  no: {
    badge: "Nyheter",
    title: "Siste verdensnyheter om Sudan med verifiserte kildelenker.",
    description:
      "Denne seksjonen følger bred dekning av Sudan fra internasjonale medier, inkludert diplomati, humanitære oppdateringer, forskning, politikk og offentlige uttalelser, sortert etter publiseringstid.",
    feed: {
      statusLabel: "Live Sudan-overvåkning",
      statusDescription:
        "Automatisk feed fra internasjonal dekning med bredt temaomfang. Nyhetene filtreres for legitime kilder og balanse, og ruller i én kontinuerlig retning.",
      refreshLabel: "Oppdater nå",
      lastUpdatedLabel: "Oppdatert",
      loadingLabel: "Laster inn siste Sudan-nyheter...",
      latestLabel: "Siste etter tid",
      notificationLabel: "Direktestrøm oppover",
      dragHint: "Hold og dra",
      visualLabel: "Siste bilde",
      openStoryLabel: "Sakskilde",
      openSourceLabel: "Kilde",
      unavailableMessage: "Live nyheter om Sudan er midlertidig utilgjengelige. Prøv igjen om litt.",
    },
  },
  ar: {
    badge: "الأخبار",
    title: "آخر أخبار السودان العالمية مع روابط مصدر موثوقة.",
    description:
      "يتابع هذا القسم تغطية واسعة عن السودان من وسائل إعلام دولية، تشمل الدبلوماسية والوضع الإنساني والأبحاث والسياسات والتصريحات الرسمية، مرتبة حسب وقت النشر.",
    feed: {
      statusLabel: "مراقبة السودان المباشرة",
      statusDescription:
        "تغذية تلقائية من تغطية دولية واسعة الموضوعات. يتم تصفية الأخبار لمصادر موثوقة ومتوازنة وتتحرك في اتجاه واحد بشكل مستمر.",
      refreshLabel: "تحديث الآن",
      lastUpdatedLabel: "آخر تحديث",
      loadingLabel: "جارٍ تحميل أحدث عناوين السودان...",
      latestLabel: "الأحدث زمنياً",
      notificationLabel: "تدفق مباشر للأعلى",
      dragHint: "اضغط واسحب",
      visualLabel: "أحدث صورة",
      openStoryLabel: "مصدر الخبر",
      openSourceLabel: "المصدر",
      unavailableMessage: "تغطية أخبار السودان المباشرة غير متاحة حالياً. حاول مرة أخرى بعد قليل.",
    },
  },
};

export default function NewsPage({ params }: PageProps) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const copy = newsPageCopy[locale];

  return (
    <div className="mx-auto max-w-content px-6 pb-24">
      <section className="section-padding pt-12 sm:pt-16">
        <div className="hero-media min-h-[320px] bg-[linear-gradient(145deg,#0b3657_0%,#1e5873_72%,#f2a33a_125%)]">
          <Image
            src={mediaLibrary.heroes.events}
            alt="Global headlines and public dialogue context"
            fill
            className="hero-image-motion object-cover"
            style={{ objectPosition: mediaLibrary.heroFocus.events }}
          />
          <div className="relative flex min-h-[320px] flex-col justify-end p-8 sm:p-10">
            <Reveal>
              <span className="eyebrow border-white/20 bg-white/15 text-white">{copy.badge}</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-5 max-w-3xl text-4xl leading-tight text-white sm:text-5xl">{copy.title}</h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/90 sm:text-base">{copy.description}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <SudanNewsFeed locale={locale} copy={copy.feed} />
    </div>
  );
}
