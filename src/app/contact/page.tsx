import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with The Dialogue Platform for collaboration on public dialogue and institutional governance design.",
};

const collaborationTopics = [
  "New institutional dialogue programme design",
  "Facilitation architecture for contested topics",
  "Synthesis and governance integration support",
];

export default function ContactPage() {
  const hasContactChannels = Boolean(siteConfig.contactEmail || siteConfig.contactPhone);

  return (
    <div className="mx-auto max-w-content px-6 section-padding">
      <span className="eyebrow">Contact</span>
      <h1 className="mt-6 max-w-3xl text-4xl leading-tight text-text-primary sm:text-5xl">
        Plan a collaboration with The Dialogue Platform.
      </h1>
      <p className="mt-6 max-w-prose text-base leading-relaxed text-text-secondary">
        We collaborate with public institutions, universities, and foundations building durable dialogue capacity. If
        you are exploring a new programme, we can help scope the right process architecture.
      </p>

      <section className="section-padding border-t border-line/80 mt-16 grid gap-6 lg:grid-cols-2">
        <div className="surface-card p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-text-secondary">Current status</p>
          {hasContactChannels ? (
            <div className="mt-4 space-y-2 text-sm text-text-secondary">
              {siteConfig.contactEmail ? (
                <p>
                  Email: <a href={`mailto:${siteConfig.contactEmail}`} className="text-accent underline">{siteConfig.contactEmail}</a>
                </p>
              ) : null}
              {siteConfig.contactPhone ? <p>Phone: {siteConfig.contactPhone}</p> : null}
            </div>
          ) : (
            <p className="mt-4 text-base leading-relaxed text-text-secondary">
              Contact email and phone are intentionally hidden for now. Add them later via environment variables:
              <code className="ml-1 rounded bg-accent-soft px-2 py-1 text-xs text-accent">NEXT_PUBLIC_CONTACT_EMAIL</code>
              and
              <code className="ml-1 rounded bg-accent-soft px-2 py-1 text-xs text-accent">NEXT_PUBLIC_CONTACT_PHONE</code>.
            </p>
          )}
        </div>

        <div className="surface-card p-8">
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
      </section>
    </div>
  );
}
