import Image from "next/image";
import { notFound } from "next/navigation";
import { HoverCard, Reveal } from "@/components/AnimatedBlock";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getContent } from "@/lib/i18n/get-content";
import { siteConfig } from "@/lib/site";
import { mediaLibrary } from "@/lib/media";

type PageProps = {
  params: {
    locale: string;
  };
};

type PartnerDetail = {
  name: string;
  focus: string;
  contribution: string;
};

const aboutExtras: Record<
  Locale,
  {
    opennessLabel: string;
    opennessMessage: string;
    boardTitle: string;
    boardIntro: string;
    boardMemberLabel: string;
    partnerDetails: Record<"nansen" | "lillestrom", PartnerDetail>;
  }
> = {
  en: {
    opennessLabel: "Open to all perspectives",
    opennessMessage:
      "The Dialogue Platform is open to all points of view. We facilitate respectful disagreement and ensure participants can express concerns, priorities, and lived experience with dignity.",
    boardTitle: "Board and leadership",
    boardIntro: "Our board combines civic engagement, community trust work, and practical dialogue experience.",
    boardMemberLabel: "Board member",
    partnerDetails: {
      nansen: {
        name: "Nansen Peace Center",
        focus: "Methodology and peace practice",
        contribution:
          "Nansen Peace Center contributes conflict-sensitive dialogue methods, facilitator training, and peacebuilding experience that strengthen the quality and safety of each process.",
      },
      lillestrom: {
        name: "Lillestrom Municipality",
        focus: "Municipal anchoring and implementation",
        contribution:
          "Lillestrom Municipality anchors dialogue in local governance, helps connect resident voices to decision pathways, and supports practical implementation across municipal services.",
      },
    },
  },
  no: {
    opennessLabel: "Åpen for alle perspektiver",
    opennessMessage:
      "The Dialogue Platform er åpen for alle synspunkter. Vi legger til rette for respektfull uenighet og trygg deltakelse, slik at erfaringer, bekymringer og prioriteringer blir hørt med verdighet.",
    boardTitle: "Styret og ledelse",
    boardIntro: "Styret kombinerer samfunnsengasjement, tillitsarbeid og praktisk erfaring fra dialogprosesser.",
    boardMemberLabel: "Styremedlem",
    partnerDetails: {
      nansen: {
        name: "Nansen fredssenter",
        focus: "Metodikk og fredsarbeid",
        contribution:
          "Nansen fredssenter bidrar med konfliktsensitiv dialogmetodikk, opplæring av fasilitatorer og fredsfaglig erfaring som styrker kvaliteten og tryggheten i prosessene.",
      },
      lillestrom: {
        name: "Lillestrom kommune",
        focus: "Kommunal forankring og gjennomføring",
        contribution:
          "Lillestrom kommune forankrer dialogen i lokal styring, kobler innbyggerstemmer til beslutningslinjer og støtter praktisk oppfølging på tvers av kommunale tjenester.",
      },
    },
  },
  ar: {
    opennessLabel: "منفتحة على جميع وجهات النظر",
    opennessMessage:
      "منصة الحوار مفتوحة لجميع وجهات النظر. نُيسّر الاختلاف باحترام ونضمن مشاركة آمنة تُمكّن الناس من التعبير عن أولوياتهم وتجاربهم ومخاوفهم بكرامة.",
    boardTitle: "مجلس الإدارة والقيادة",
    boardIntro: "يجمع مجلسنا بين الخبرة المجتمعية وبناء الثقة والممارسة العملية في إدارة الحوارات.",
    boardMemberLabel: "عضو مجلس الإدارة",
    partnerDetails: {
      nansen: {
        name: "مركز نانسن للسلام",
        focus: "المنهجية والممارسة السلمية",
        contribution:
          "يسهم مركز نانسن للسلام بمنهجيات حوار تراعي حساسية النزاعات، وتدريب الميسّرين، وخبرة راسخة في بناء السلام تعزز جودة كل عملية وسلامتها.",
      },
      lillestrom: {
        name: "بلدية ليلستروم",
        focus: "الترسيخ البلدي والتنفيذ",
        contribution:
          "تربط بلدية ليلستروم الحوار بمسارات الحوكمة المحلية، وتصل أصوات السكان بمسارات القرار، وتدعم التنفيذ العملي عبر الخدمات البلدية.",
      },
    },
  },
};

export default function AboutPage({ params }: PageProps) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const localized = getContent(locale);
  const extra = aboutExtras[locale];

  return (
    <div className="mx-auto max-w-content px-6 pb-24">
      <section className="section-padding pt-12 sm:pt-16">
        <div className="hero-media min-h-[360px] bg-[linear-gradient(145deg,#0b3657_0%,#1e5873_72%,#f2a33a_120%)]">
          <Image
            src={mediaLibrary.heroes.about}
            alt="Dialogue participants collaborating"
            fill
            className="hero-image-motion object-cover"
            style={{ objectPosition: mediaLibrary.heroFocus.about }}
          />
          <div className="relative flex min-h-[360px] flex-col justify-end p-8 sm:p-10">
            <Reveal>
              <span className="eyebrow border-white/20 bg-white/15 text-white">{localized.about.title}</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-5 max-w-3xl text-4xl leading-tight text-white sm:text-5xl">{localized.about.heroTitle}</h1>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-line/80">
        <Reveal>
          <p className="max-w-prose text-base leading-relaxed text-text-secondary">{localized.about.intro}</p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-8 rounded-2xl border border-accent/20 bg-accent-soft/55 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">{extra.opennessLabel}</p>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">{extra.opennessMessage}</p>
          </div>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="text-3xl text-text-primary sm:text-4xl">{localized.about.principlesTitle}</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {localized.about.principles.map((principle, index) => (
            <HoverCard key={principle.title} delay={index * 0.08}>
              <article className="surface-card h-full p-6">
                <h3 className="text-xl text-text-primary">{principle.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{principle.description}</p>
              </article>
            </HoverCard>
          ))}
        </div>
      </section>

      <section className="section-padding border-t border-line/80">
        <Reveal>
          <h2 className="text-3xl text-text-primary sm:text-4xl">{localized.about.partnersTitle}</h2>
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {siteConfig.partnerProfiles.map((partner, index) => {
            const detail = extra.partnerDetails[partner.id];
            return (
              <HoverCard key={partner.id} delay={index * 0.1}>
                <article className="surface-card h-full p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-text-secondary">{localized.about.partnerLabel}</p>
                  <a href={partner.href} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-lg bg-white p-3">
                    <Image src={partner.logo} alt={detail.name} width={220} height={56} className="h-12 w-auto object-contain" />
                  </a>
                  <h3 className="mt-4 text-2xl text-text-primary">{detail.name}</h3>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-accent">{detail.focus}</p>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">{detail.contribution}</p>
                </article>
              </HoverCard>
            );
          })}
        </div>
      </section>

      <section className="section-padding border-t border-line/80">
        <Reveal>
          <h2 className="text-3xl text-text-primary sm:text-4xl">{extra.boardTitle}</h2>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-text-secondary">{extra.boardIntro}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="surface-card mt-8 p-6 sm:p-8">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {siteConfig.boardMembers.map((member) => (
                <li key={member.name} className="rounded-2xl border border-line/80 bg-white/80 p-4 shadow-[0_14px_30px_-24px_rgba(8,55,88,0.85)]">
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-full border border-[#e1d8c8] bg-[#f6f2e8]">
                      <Image src={member.photo} alt={member.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{member.name}</p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-accent">{extra.boardMemberLabel}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
