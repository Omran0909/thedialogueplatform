import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with The Dialogue Platform. We collaborate with public institutions, research bodies, and foundations on dialogue and public engagement.",
};

export default function ContactPage() {
  return (
    <div className="max-w-content mx-auto px-6 pt-32 pb-32">
      <h1 className="text-4xl sm:text-5xl font-normal text-text-primary leading-[1.1] mb-10">
        Contact
      </h1>
      <p className="text-base text-text-secondary leading-relaxed max-w-[600px] mb-12">
        The Dialogue Platform is oriented towards collaborations with public institutions, research bodies, and foundations who are exploring long-term approaches to dialogue and public engagement.
      </p>

      <div className="border border-white/10 rounded-lg p-8 bg-white/[0.02] max-w-[600px]">
        <p className="text-text-secondary text-sm mb-2">Enquiries</p>
        <a
          href="mailto:contact@thedialogueplatform.com"
          className="text-accent text-lg hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
        >
          contact@thedialogueplatform.com
        </a>
        <p className="text-text-secondary text-sm mt-6 leading-relaxed">
          Please include a brief description of your organisation, the context in which you are considering dialogue work, and any time constraints or decision points you are working towards.
        </p>
      </div>
    </div>
  );
}
