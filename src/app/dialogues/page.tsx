import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dialogues",
  description:
    "Structured dialogue formats: assemblies, working groups, interviews, and online sessions as coherent parts of a single architecture.",
};

export default function DialoguesPage() {
  return (
    <div className="max-w-content mx-auto px-6 pt-32 pb-32">
      <h1 className="text-4xl sm:text-5xl font-normal text-text-primary leading-[1.1] mb-10">
        Dialogues
      </h1>
      <p className="text-base text-text-secondary leading-relaxed max-w-[600px]">
        Dialogues in the platform are defined by their purpose, composition, and relationship to decision-making. Each format is documented so that participants, facilitators, and institutional sponsors share a clear understanding of why they are meeting and what can be expected from the process. The platform supports assemblies, working groups, interviews, and online sessions as coherent parts of a single architecture, with outputs structured as insights—patterns, tensions, and hypotheses—that can be revisited, contested, and connected to policy and program work.
      </p>
    </div>
  );
}
