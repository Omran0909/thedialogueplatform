import Image from "next/image";
import { notFound } from "next/navigation";
import { HoverCard, Reveal } from "@/components/AnimatedBlock";
import { isLocale } from "@/lib/i18n/config";
import { getContent } from "@/lib/i18n/get-content";
import { mediaLibrary } from "@/lib/media";

type PageProps = {
  params: {
    locale: string;
  };
};

export default function DialoguesPage({ params }: PageProps) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const localized = getContent(params.locale);

  return (
    <div className="mx-auto max-w-content px-6 pb-24">
      <section className="section-padding pt-12 sm:pt-16">
        <div className="hero-media min-h-[320px] bg-[linear-gradient(145deg,#0b3657_0%,#1e5873_72%,#f2a33a_125%)]">
          <Image
            src={mediaLibrary.heroes.dialogues}
            alt="Participants in a structured dialogue"
            fill
            className="hero-image-motion object-cover"
            style={{ objectPosition: mediaLibrary.heroFocus.dialogues }}
          />
          <div className="relative flex min-h-[320px] flex-col justify-end p-8 sm:p-10">
            <Reveal>
              <span className="eyebrow border-white/20 bg-white/15 text-white">{localized.dialogues.title}</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-5 max-w-3xl text-4xl leading-tight text-white sm:text-5xl">{localized.dialogues.heroTitle}</h1>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-line/80">
        <div className="grid gap-4 md:grid-cols-2">
          {localized.dialogues.formats.map((format, index) => (
            <HoverCard key={format.title} delay={index * 0.07}>
              <article className="surface-card h-full p-6">
                <h2 className="text-2xl text-text-primary">{format.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{format.description}</p>
              </article>
            </HoverCard>
          ))}
        </div>
      </section>

      <section className="section-padding border-t border-line/80">
        <Reveal>
          <div className="surface-card p-8">
            <h2 className="text-3xl text-text-primary sm:text-4xl">{localized.dialogues.expectTitle}</h2>
            <ul className="mt-6 space-y-4">
              {localized.dialogues.expectations.map((expectation) => (
                <li key={expectation} className="flex gap-3 text-sm leading-relaxed text-text-secondary">
                  <span className="mt-2 h-2 w-2 rounded-full bg-accent" aria-hidden />
                  <span>{expectation}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
