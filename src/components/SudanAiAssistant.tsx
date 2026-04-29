"use client";

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n/config";

type AssistantSource = {
  title: string;
  url: string;
};

type AssistantMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  sources?: AssistantSource[];
};

type AssistantCopy = {
  badge: string;
  title: string;
  description: string;
  quickStartLabel: string;
  starterPrompts: string[];
  inputPlaceholder: string;
  sendLabel: string;
  thinkingLabel: string;
  unavailableMessage: string;
  welcomeMessage: string;
  sourcesLabel: string;
  note: string;
};

type SudanAiAssistantProps = {
  locale: Locale;
  copy: AssistantCopy;
};

const PROMPT_BUTTON_COUNT = 4;

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function pickRandomPrompts(prompts: string[], count: number) {
  const pool = [...prompts];
  for (let index = pool.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [pool[index], pool[swapIndex]] = [pool[swapIndex], pool[index]];
  }
  return pool.slice(0, Math.max(0, Math.min(count, pool.length)));
}

export function SudanAiAssistant({ locale, copy }: SudanAiAssistantProps) {
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: makeId(),
      role: "assistant",
      text: copy.welcomeMessage,
    },
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [visiblePrompts, setVisiblePrompts] = useState<string[]>(() =>
    pickRandomPrompts(copy.starterPrompts, PROMPT_BUTTON_COUNT),
  );
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const openLabel = locale === "ar" ? "افتح المساعد" : locale === "no" ? "Åpne assistenten" : "Open assistant";
  const closeLabel = locale === "ar" ? "إغلاق المساعد" : locale === "no" ? "Lukk assistenten" : "Close assistant";
  const launcherLabel = locale === "ar" ? "مساعد الحوار" : locale === "no" ? "Dialogassistent" : "Dialogue Assistant";

  const apiHistory = useMemo(
    () =>
      messages
        .slice(-8)
        .map((message) => ({ role: message.role, content: message.text }))
        .filter((message) => message.content.trim().length > 0),
    [messages],
  );

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) {
      return;
    }
    container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
  }, [messages, isOpen, isSending]);

  useEffect(() => {
    setVisiblePrompts(pickRandomPrompts(copy.starterPrompts, PROMPT_BUTTON_COUNT));
  }, [copy.starterPrompts, locale]);

  const rotateStarterPrompts = useCallback(
    (lastPrompt?: string) => {
      setVisiblePrompts((previous) => {
        const normalizedLastPrompt = (lastPrompt ?? "").trim().toLowerCase();
        const filteredPool = copy.starterPrompts.filter((prompt) => {
          if (!normalizedLastPrompt) {
            return true;
          }
          return prompt.trim().toLowerCase() !== normalizedLastPrompt;
        });
        const pool = filteredPool.length >= PROMPT_BUTTON_COUNT ? filteredPool : copy.starterPrompts;
        const pickCount = Math.min(PROMPT_BUTTON_COUNT, pool.length);
        if (pickCount === 0) {
          return [];
        }

        for (let attempt = 0; attempt < 6; attempt += 1) {
          const next = pickRandomPrompts(pool, pickCount);
          if (next.join("||") !== previous.join("||")) {
            return next;
          }
        }

        return pickRandomPrompts(pool, pickCount);
      });
    },
    [copy.starterPrompts],
  );

  async function sendPrompt(rawPrompt?: string) {
    const prompt = (rawPrompt ?? input).trim();
    if (!prompt || isSending) {
      return;
    }

    const userMessage: AssistantMessage = {
      id: makeId(),
      role: "user",
      text: prompt,
    };

    setMessages((previous) => [...previous, userMessage]);
    rotateStarterPrompts(prompt);
    setInput("");
    setIsSending(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          locale,
          message: prompt,
          history: apiHistory,
        }),
      });

      const payload = (await response.json()) as {
        ok?: boolean;
        answer?: string;
        sources?: AssistantSource[];
        message?: string;
      };

      if (!response.ok || !payload.ok || !payload.answer) {
        throw new Error(copy.unavailableMessage);
      }

      const assistantMessage: AssistantMessage = {
        id: makeId(),
        role: "assistant",
        text: payload.answer,
        sources: payload.sources ?? [],
      };
      setMessages((previous) => [...previous, assistantMessage]);
    } catch {
      setMessages((previous) => [
        ...previous,
        {
          id: makeId(),
          role: "assistant",
          text: copy.unavailableMessage,
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendPrompt();
  }

  return (
    <div className="fixed bottom-4 right-4 z-[70] flex w-[min(420px,calc(100vw-1.5rem))] flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {isOpen ? (
        <div className="w-full overflow-hidden rounded-[28px] border border-[#0b3a5d1f] bg-white shadow-[0_24px_60px_-28px_rgba(8,47,76,0.82)]">
          <div className="bg-[linear-gradient(150deg,#0b3a5d_0%,#154f74_58%,#f2a33a_136%)] p-5 text-white">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em]">
                  {copy.badge}
                </p>
                <h2 className="mt-3 text-xl leading-tight sm:text-2xl">{copy.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/90">{copy.description}</p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label={closeLabel}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/12 text-xl font-semibold text-white transition hover:bg-white/20"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80">{copy.quickStartLabel}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {visiblePrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => void sendPrompt(prompt)}
                  disabled={isSending}
                  className="rounded-full border border-white/35 bg-white/10 px-3 py-2 text-left text-[11px] font-semibold leading-relaxed text-white transition hover:bg-white/18 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {prompt}
                </button>
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-white/80">{copy.note}</p>
          </div>

          <div className="bg-[linear-gradient(180deg,#fffdfa_0%,#f8f3e8_100%)] p-4">
            <div ref={messagesContainerRef} className="h-[320px] overflow-y-auto rounded-2xl border border-line/80 bg-white/76 p-4">
              <div className="space-y-3">
                {messages.map((message) => (
                  <article
                    key={message.id}
                    className={`max-w-[92%] rounded-2xl border px-4 py-3 ${
                      message.role === "user"
                        ? "ml-auto border-[#0b3a5d20] bg-[#0b3a5d] text-white"
                        : "border-[#f2a33a4a] bg-[#fff4df] text-text-primary"
                    }`}
                  >
                    <p className="whitespace-pre-line text-sm leading-relaxed">{message.text}</p>
                    {message.role === "assistant" && message.sources && message.sources.length > 0 ? (
                      <div className="mt-3 border-t border-[#d9c8ac] pt-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text-secondary">{copy.sourcesLabel}</p>
                        <ul className="mt-2 space-y-1">
                          {message.sources.map((source) => (
                            <li key={`${message.id}-${source.url}`}>
                              <a
                                href={source.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs font-medium text-accent underline decoration-accent/45 underline-offset-2 hover:text-[#0b3a5d]"
                              >
                                {source.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </article>
                ))}
                {isSending ? (
                  <article className="max-w-[92%] rounded-2xl border border-[#f2a33a4a] bg-[#fff4df] px-4 py-3 text-sm text-text-secondary">
                    {copy.thinkingLabel}
                  </article>
                ) : null}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={copy.inputPlaceholder}
                className="min-w-0 flex-1 rounded-full border border-line bg-white px-4 py-3 text-sm text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
              <button
                type="submit"
                disabled={isSending || input.trim().length === 0}
                className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d3f4c] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {copy.sendLabel}
              </button>
            </form>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-label={isOpen ? closeLabel : openLabel}
        className="inline-flex items-center gap-3 rounded-full bg-[linear-gradient(135deg,#0b3a5d_0%,#17506c_65%,#f2a33a_135%)] px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_40px_-24px_rgba(8,47,76,0.95)] transition hover:translate-y-[-1px] hover:shadow-[0_24px_44px_-24px_rgba(8,47,76,0.95)]"
      >
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-base" aria-hidden="true">
          AI
        </span>
        <span>{isOpen ? closeLabel : launcherLabel}</span>
      </button>
    </div>
  );
}

export type { AssistantCopy };
