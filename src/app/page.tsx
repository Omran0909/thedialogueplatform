import Image from "next/image";
import Link from "next/link";
import { HoverCard, Reveal } from "@/components/AnimatedBlock";
import { siteConfig } from "@/lib/site";

const trustPillars = [
  {
    title: "Inclusive Participation",
    description:
      "We design dialogues where diverse voices are heard safely and respectfully, including groups often excluded from decision spaces.",
  },
  {
    title: "Institutional Accountability",
    description:
      "Every process is connected to clear mandates, transparent ownership, and documented follow-up.",
  },
  {
    title: "Peace-Oriented Outcomes",
    description:
      "We focus on reducing polarization, strengthening social cohesion, and supporting long-term trust between people and institutions.",
  },
];

const focusAreas = [
  {
    title: "Mandate Clarity",
    description:
      "Define what each dialogue can influence, decide, and escalate inside your institution.",
  },
  {
    title: "Facilitation Architecture",
    description:
      "Build participant composition and facilitation structures that create meaningful and balanced participation.",
  },
  {
    title: "Decision Traceability",
    description:
      "Create a transparent chain from dialogue input to real decisions, ownership, and implementation.",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-content px-6 pb-24">
      <section className="section-padding pt-12 sm:pt-16">
        <div className="hero-media noise-mask min-h-[540px] bg-[#0e2f38]">
          <Image
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=2000&q=80"
            alt="People in a dialogue circle"
            fill
            priority
            className="object-cover"
          />

          <div className="relative flex min-h-[540px] flex-col justify-between p-8 sm:p-12">
            <div className="float-ornament inline-flex w-fit rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Trust and Peace Through Dialogue
            </div>

            <div className="max-w-3xl">
              <Reveal>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/85">
                  In collaboration with {siteConfig.partners.join(" and ")}
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="mt-4 text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
                  Building inclusive dialogue systems that strengthen trust, cooperation, and peace.
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
                  The Dialogue Platform helps institutions transform complex public conversations into shared
                  understanding, practical decisions, and durable civic relationships.
                </p>
              </Reveal>
              <Reveal delay={0.3} className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/dialogues"
                  className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#123c49] transition hover:bg-[#dff2ef]"
                >
                  Explore dialogue formats
                </Link>
                <Link
                  href="/about"
                  className="rounded-full border border-white/35 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Learn our mission
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-line/80">
        <Reveal>
          <h2 className="text-3xl text-text-primary sm:text-4xl">Why this platform exists</h2>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-text-secondary">
            Our context is simple and urgent: communities need trustworthy spaces where disagreement can be handled
            constructively, institutions can listen with integrity, and decisions can be made without leaving people
            behind. We design dialogue as a long-term civic practice that builds confidence, reduces polarization, and
            supports peaceful democratic life.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {trustPillars.map((pillar, index) => (
            <HoverCard key={pillar.title} delay={index * 0.08}>
              <article className="surface-card h-full p-6">
                <h3 className="text-xl text-text-primary">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{pillar.description}</p>
              </article>
            </HoverCard>
          ))}
        </div>
      </section>

      <section className="section-padding border-t border-line/80">
        <Reveal>
          <h2 className="text-3xl text-text-primary sm:text-4xl">Core capabilities</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {focusAreas.map((item, index) => (
            <HoverCard key={item.title} delay={index * 0.07}>
              <article className="surface-card h-full p-6">
                <h3 className="text-xl text-text-primary">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{item.description}</p>
              </article>
            </HoverCard>
          ))}
        </div>
      </section>

      <section className="section-padding border-t border-line/80">
        <Reveal>
          <h2 className="text-3xl text-text-primary sm:text-4xl">Example Dialogues</h2>
          <p className="mt-4 max-w-prose text-base text-text-secondary">
            Explore real dialogue sessions and practical examples from our field work.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {siteConfig.exampleDialogues.map((video, index) => (
            <HoverCard key={video.href} delay={index * 0.08}>
              <a
                href={video.href}
                target="_blank"
                rel="noreferrer"
                className="surface-card group block overflow-hidden"
              >
                <div className="relative h-52">
                  <Image src={video.thumbnail} alt={video.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                  <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#183740]">
                    <span className="h-2 w-2 rounded-full bg-red-600" aria-hidden />
                    Watch on YouTube
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-base font-semibold text-text-primary">{video.title}</p>
                  <p className="mt-2 text-sm text-text-secondary">View the full video dialogue example.</p>
                </div>
              </a>
            </HoverCard>
          ))}
        </div>
      </section>

      <section className="section-padding border-t border-line/80">
        <Reveal>
          <div className="surface-card overflow-hidden p-8 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center">
              <div>
                <h2 className="text-3xl text-text-primary sm:text-4xl">Follow our official channels</h2>
                <p className="mt-3 max-w-prose text-base leading-relaxed text-text-secondary">
                  Stay connected with upcoming dialogue stories, field examples, and public updates.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {siteConfig.socialChannels.map((channel) => (
                    <a
                      key={channel.href}
                      href={channel.href}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-accent px-5 py-2 text-sm font-semibold text-accent transition hover:bg-accent hover:text-white"
                    >
                      {channel.label}
                    </a>
                  ))}
                  <Link
                    href="/contact"
                    className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#0d3f4c]"
                  >
                    Contact us
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-line/80 bg-[#eaf3f1] p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-text-secondary">Direct contact</p>
                <a href={`mailto:${siteConfig.contactEmail}`} className="mt-4 block text-lg font-semibold text-accent hover:underline">
                  {siteConfig.contactEmail}
                </a>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                  We welcome municipalities, civic actors, schools, and institutions that want to strengthen trust and
                  build peaceful collaboration through dialogue.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
