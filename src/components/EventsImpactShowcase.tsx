"use client";

import Image from "next/image";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { EventsImpactContent, ImpactMetric } from "@/lib/i18n/events-impact-content";

type EventsImpactShowcaseProps = {
  locale: Locale;
  content: EventsImpactContent;
};

const localeCodes: Record<Locale, string> = {
  en: "en-US",
  no: "nb-NO",
  ar: "ar-SA",
};

function AnimatedMetric({ metric, locale }: { metric: ImpactMetric; locale: Locale }) {
  const elementRef = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(elementRef, { once: true, amount: 0.65 });
  const prefersReducedMotion = useReducedMotion();
  const [currentValue, setCurrentValue] = useState(0);
  const numberFormatter = new Intl.NumberFormat(localeCodes[locale]);

  useEffect(() => {
    if (metric.value === undefined || !isInView) {
      return;
    }

    if (prefersReducedMotion) {
      setCurrentValue(metric.value);
      return;
    }

    const controls = animate(0, metric.value, {
      duration: 1.45,
      ease: "easeOut",
      onUpdate: (latest) => setCurrentValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [isInView, metric.value, prefersReducedMotion]);

  const finalValue = metric.display ?? `${metric.prefix ?? ""}${numberFormatter.format(metric.value ?? 0)}${metric.suffix ?? ""}`;
  const visibleValue =
    metric.display ?? `${metric.prefix ?? ""}${numberFormatter.format(currentValue)}${metric.suffix ?? ""}`;

  return (
    <p ref={elementRef} className="text-4xl font-semibold text-white sm:text-5xl">
      <span aria-hidden="true">{visibleValue}</span>
    </p>
  );
}

export function EventsImpactShowcase({ locale, content }: EventsImpactShowcaseProps) {
  const isRtl = locale === "ar";

  return (
    <div className="relative w-[100dvw] ltr:left-1/2 ltr:-translate-x-1/2 rtl:right-1/2 rtl:translate-x-1/2">
      <section className="overflow-hidden bg-[#071f33] text-white" aria-labelledby="featured-dialogues-title">
        <div className="mx-auto max-w-content px-6 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between"
          >
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f5b45f]">{content.featuredEyebrow}</p>
              <h2 id="featured-dialogues-title" className="mt-4 text-3xl leading-tight text-white sm:text-5xl">
                {content.featuredTitle}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75">{content.featuredIntro}</p>
            </div>
            <a
              href="#events-archive"
              className="inline-flex w-fit items-center gap-3 border-b border-[#f2a33a] pb-2 text-sm font-semibold text-white transition-colors hover:text-[#f5b45f]"
            >
              {content.archiveCta}
              <span aria-hidden="true" className={isRtl ? "rotate-180" : ""}>
                →
              </span>
            </a>
          </motion.div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {content.featuredEvents.map((event, index) => {
              const isExternal = event.href.startsWith("http");

              return (
                <motion.article
                  key={event.id}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.1 }}
                  className="group overflow-hidden rounded-lg bg-[#fffdf8] text-[#1f2a30] shadow-[0_24px_60px_-34px_rgba(0,0,0,0.85)]"
                >
                  <a
                    href={event.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                    className="flex h-full flex-col"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#123c59]">
                      <Image
                        src={event.image}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(min-width: 1024px) 33vw, 100vw"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-[#071f33]/88 px-5 py-3 text-white">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em]">{event.location}</p>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8a4500]">{event.date}</p>
                      <h3 className="mt-3 text-2xl leading-tight text-[#17252d]">{event.title}</h3>
                      <p className="mt-4 text-sm leading-relaxed text-[#5e6c73]">{event.description}</p>
                      <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#0b3a5d]">
                        {event.cta}
                        <span aria-hidden="true" className={isRtl ? "rotate-180" : ""}>
                          ↗
                        </span>
                      </span>
                    </div>
                  </a>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0b3a5d] text-white" aria-labelledby="impact-title">
        <Image
          src="/assets/media/site/library/seminars/ardol/2026-08-29/ardol-2026-08-29-audience-02.jpg"
          alt=""
          fill
          className="object-cover opacity-15"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#082f4c]/88" aria-hidden="true" />
        <div className="relative mx-auto max-w-content px-6 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f5b45f]">{content.impactEyebrow}</p>
            <h2 id="impact-title" className="mt-4 text-4xl text-white sm:text-5xl">
              {content.impactTitle}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/75">{content.impactIntro}</p>
          </motion.div>

          <div className="mt-12 grid border-y border-white/25 sm:grid-cols-2 lg:grid-cols-3">
            {content.impactMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.07 }}
                className="border-b border-white/20 px-5 py-8 sm:px-7 lg:min-h-[220px] lg:border-e lg:[&:nth-child(3n)]:border-e-0 lg:[&:nth-last-child(-n+3)]:border-b-0"
              >
                <AnimatedMetric metric={metric} locale={locale} />
                <h3 className="mt-4 text-xl text-white">{metric.label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{metric.detail}</p>
              </motion.div>
            ))}
          </div>

          <p className="mx-auto mt-7 max-w-4xl text-center text-xs leading-relaxed text-white/65">{content.impactSourceNote}</p>
        </div>
      </section>
    </div>
  );
}
