import type { Metadata } from "next";
import { HoverCard, Reveal } from "@/components/AnimatedBlock";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact The Dialogue Platform for collaboration on trust-building and peace-focused dialogue processes.",
};

const collaborationTopics = [
  "Designing dialogue processes for trust and peace",
  "Facilitation architecture for sensitive or contested issues",
  "Institutional learning and follow-up implementation",
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-content px-6 pb-24 section-padding pt-12 sm:pt-16">
      <Reveal>
        <span className="eyebrow">Contact</span>
        <h1 className="mt-6 max-w-3xl text-4xl leading-tight text-text-primary sm:text-5xl">
          Let&apos;s build inclusive dialogue and trust together.
        </h1>
        <p className="mt-5 max-w-prose text-base leading-relaxed text-text-secondary">
          We work with institutions, municipalities, and civil society partners to strengthen trust, social cohesion,
          and peace through dialogue. Reach out to start a conversation about your context.
        </p>
      </Reveal>

      <section className="section-padding border-t border-line/80 mt-12 grid gap-5 lg:grid-cols-2">
        <HoverCard>
          <div className="surface-card h-full p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-text-secondary">Direct contact</p>
            <a href={`mailto:${siteConfig.contactEmail}`} className="mt-4 block text-xl font-semibold text-accent hover:underline">
              {siteConfig.contactEmail}
            </a>
            {siteConfig.contactPhone ? <p className="mt-2 text-sm text-text-secondary">Phone: {siteConfig.contactPhone}</p> : null}
            <p className="mt-5 text-sm leading-relaxed text-text-secondary">
              In collaboration with {siteConfig.partners.join(" and ")}, we support practical dialogue work that
              builds long-term civic trust.
            </p>
          </div>
        </HoverCard>

        <HoverCard delay={0.08}>
          <div className="surface-card h-full p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-text-secondary">Useful first message</p>
            <ul className="mt-4 space-y-4">
              {collaborationTopics.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-text-secondary">
                  <span className="mt-2 h-2 w-2 rounded-full bg-accent" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </HoverCard>
      </section>

      <section className="section-padding border-t border-line/80">
        <Reveal>
          <h2 className="text-3xl text-text-primary sm:text-4xl">Official channels</h2>
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
          </div>
        </Reveal>
      </section>
    </div>
  );
}
