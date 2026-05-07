"use client";

import { FormEvent, TouchEvent, WheelEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  introTitle: string;
  introMessage: string;
  introCta: string;
  introCapabilities: string[];
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

const PROMPT_BUTTON_COUNT = 3;

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
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const [visiblePrompts, setVisiblePrompts] = useState<string[]>(() =>
    pickRandomPrompts(copy.starterPrompts, PROMPT_BUTTON_COUNT),
  );
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const lastAutoScrolledMessageRef = useRef<string | null>(null);
  const openLabel = locale === "ar" ? "افتح المساعد" : locale === "no" ? "Åpne assistenten" : "Open assistant";
  const closeLabel = locale === "ar" ? "إغلاق المساعد" : locale === "no" ? "Lukk assistenten" : "Close assistant";
  const launcherLabel = locale === "ar" ? "مساعد الحوار" : locale === "no" ? "Dialogassistent" : "Dialogue Assistant";
  const hasConversation = messages.length > 1 || isSending;
  const showIntro = !hasStartedChat && !hasConversation;

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
    if (!container || !isOpen || messages.length === 0) {
      return;
    }

    const latestMessage = messages[messages.length - 1];
    const frame = window.requestAnimationFrame(() => {
      if (latestMessage.role === "user") {
        container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
        return;
      }

      if (latestMessage.role === "assistant" && messages.length > 1 && !isSending) {
        const target = container.querySelector<HTMLElement>(`[data-assistant-message-id="${latestMessage.id}"]`);
        if (!target || lastAutoScrolledMessageRef.current === latestMessage.id) {
          return;
        }

        lastAutoScrolledMessageRef.current = latestMessage.id;
        const containerRect = container.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const targetTop = container.scrollTop + targetRect.top - containerRect.top - 12;
        container.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
      }
    });

    return () => window.cancelAnimationFrame(frame);
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

    setHasStartedChat(true);
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

  function stopAssistantScroll(event: WheelEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) {
    event.stopPropagation();
  }

  function containAssistantWheel(event: WheelEvent<HTMLDivElement>) {
    event.stopPropagation();
    const target = event.target instanceof Element ? event.target : null;
    if (!target?.closest("[data-assistant-scroll]")) {
      event.preventDefault();
    }
  }

  return (
    <div className="pointer-events-none fixed inset-x-2 bottom-3 z-[70] flex max-h-[calc(100dvh-1.5rem)] flex-col items-end gap-3 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:max-h-[calc(100dvh-3rem)] sm:w-[min(430px,calc(100vw-3rem))]">
      {isOpen ? (
        <div
          onWheel={containAssistantWheel}
          onTouchMove={stopAssistantScroll}
          className="assistant-panel-enter pointer-events-auto flex h-[min(760px,calc(100dvh-6.5rem))] w-full flex-col overflow-hidden overscroll-contain rounded-[28px] border border-[#0b3a5d24] bg-white shadow-[0_28px_70px_-34px_rgba(8,47,76,0.9)] sm:h-[min(760px,calc(100dvh-8rem))]"
        >
          {showIntro ? (
            <div
              dir={locale === "ar" ? "rtl" : "ltr"}
              className="assistant-intro-shell flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain bg-[radial-gradient(circle_at_14%_0%,rgba(242,163,58,0.18),transparent_28%),linear-gradient(180deg,#ffffff_0%,#f2f7fb_100%)] p-5 sm:p-6"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="relative inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[conic-gradient(from_35deg,#0b3a5d_0_34%,#f2a33a_34%_62%,#e9f2f7_62%_78%,#2f7f6f_78%_100%)] shadow-[0_16px_30px_-22px_rgba(8,47,76,0.8)]">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-semibold text-[#0b3a5d]">
                      AI
                    </span>
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-2xl font-semibold tracking-tight text-[#1f2a30]">{copy.introTitle}</h2>
                      <span className="rounded-md border border-[#0b3a5d] px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#0b3a5d]">
                        Beta
                      </span>
                    </div>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary">{copy.badge}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label={closeLabel}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#0b3a5d1f] bg-white/80 text-2xl leading-none text-[#0b3a5d] transition hover:bg-[#edf5fb]"
                >
                  <span aria-hidden="true">&minus;</span>
                </button>
              </div>

              <div className="mt-5 rounded-[26px] border border-[#0b3a5d10] bg-white/90 p-5 shadow-[0_18px_38px_-32px_rgba(8,47,76,0.8)]">
                <div className="flex items-center gap-2 text-sm font-semibold text-text-secondary">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#0b3a5d0f] text-[#0b3a5d]" aria-hidden="true">
                    &rarr;
                  </span>
                  <span>{copy.title}</span>
                </div>
                <p className="mt-4 text-2xl leading-snug text-[#1f2a30] sm:text-3xl">{copy.introMessage}</p>
              </div>

              <div className="mt-5 rounded-[28px] border border-[#d8e5f1] bg-[#eaf3ff] p-4 sm:p-5">
                <button
                  type="button"
                  onClick={() => setHasStartedChat(true)}
                  className="w-full rounded-full bg-[#0b57d0] px-5 py-4 text-base font-semibold text-white shadow-[0_18px_32px_-24px_rgba(11,87,208,0.9)] transition hover:bg-[#0a4db9] focus-visible:outline-[#0b57d0]"
                >
                  {copy.introCta}
                </button>

                <div className="mt-4 grid gap-2">
                  {copy.introCapabilities.map((item) => (
                    <div key={item} className="rounded-2xl border border-white/70 bg-white/75 px-4 py-3 text-sm leading-relaxed text-[#23323c]">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-secondary">{copy.quickStartLabel}</p>
                <div className="assistant-prompt-strip mt-2 flex gap-2 overflow-x-auto pb-1">
                  {visiblePrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => void sendPrompt(prompt)}
                      disabled={isSending}
                      className="max-w-[280px] shrink-0 truncate rounded-full border border-[#0b3a5d24] bg-white px-3 py-2 text-left text-[11px] font-semibold leading-relaxed text-[#0b3a5d] transition hover:bg-[#fff4df] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div
                className={`shrink-0 bg-[linear-gradient(150deg,#0b3a5d_0%,#154f74_58%,#f2a33a_136%)] text-white ${
                  hasConversation ? "max-h-[38%] overflow-hidden p-3 sm:p-4" : "max-h-[48%] overflow-hidden p-4 sm:p-5"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em]">
                      {copy.badge}
                    </p>
                    <h2 className={`${hasConversation ? "mt-2 text-base sm:text-lg" : "mt-3 text-lg sm:text-xl"} leading-tight`}>
                      {copy.title}
                    </h2>
                    <p className={`${hasConversation ? "mt-1 line-clamp-2 text-[11px]" : "mt-2 text-xs sm:text-sm"} leading-relaxed text-white/90`}>
                      {copy.description}
                    </p>
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

                <p className={`${hasConversation ? "mt-3" : "mt-4"} text-[10px] font-semibold uppercase tracking-[0.14em] text-white/80`}>
                  {copy.quickStartLabel}
                </p>
                <div className={`${hasConversation ? "assistant-prompt-strip mt-2 flex-nowrap overflow-x-auto pb-1" : "mt-2 flex-wrap"} flex gap-2`}>
                  {visiblePrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => void sendPrompt(prompt)}
                      disabled={isSending}
                      className={`rounded-full border border-white/35 bg-white/10 px-3 py-2 text-left text-[11px] font-semibold leading-relaxed text-white transition hover:bg-white/18 disabled:cursor-not-allowed disabled:opacity-70 ${
                        hasConversation ? "max-w-[260px] shrink-0 truncate" : ""
                      }`}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
                {!hasConversation ? <p className="mt-3 text-[11px] leading-relaxed text-white/80">{copy.note}</p> : null}
              </div>

              <div className="flex min-h-0 flex-1 flex-col bg-[linear-gradient(180deg,#fffdfa_0%,#f8f3e8_100%)] p-3 sm:p-4">
                <div
                  ref={messagesContainerRef}
                  data-assistant-scroll
                  onWheel={stopAssistantScroll}
                  onTouchMove={stopAssistantScroll}
                  className={`assistant-message-scroll flex-1 overflow-x-hidden overflow-y-auto overscroll-contain rounded-2xl border border-line/80 bg-white/80 p-3 shadow-inner shadow-[#0b3a5d0f] sm:p-4 ${
                    hasConversation ? "min-h-[360px] sm:min-h-[420px]" : "min-h-[240px] sm:min-h-[300px]"
                  }`}
                >
                  <div className="space-y-3">
                    {messages.map((message) => (
                      <article
                        key={message.id}
                        data-assistant-message-id={message.id}
                        dir="auto"
                        className={`assistant-message-bubble min-w-0 max-w-[92%] overflow-hidden rounded-2xl border px-4 py-3 ${
                          message.role === "user"
                            ? "ml-auto border-[#0b3a5d20] bg-[#0b3a5d] text-white"
                            : "border-[#f2a33a4a] bg-[#fff4df] text-text-primary"
                        }`}
                      >
                        <p className="assistant-message-text whitespace-pre-line text-sm leading-relaxed">{message.text}</p>
                        {message.role === "assistant" && message.sources && message.sources.length > 0 ? (
                          <div className="mt-3 min-w-0 border-t border-[#d9c8ac] pt-3">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text-secondary">{copy.sourcesLabel}</p>
                            <ul className="mt-2 space-y-1">
                              {message.sources.map((source) => (
                                <li key={`${message.id}-${source.url}`} className="min-w-0">
                                  <a
                                    href={source.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="assistant-source-link block max-w-full text-xs font-medium text-accent underline decoration-accent/45 underline-offset-2 hover:text-[#0b3a5d]"
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
                      <article className="assistant-message-bubble min-w-0 max-w-[92%] overflow-hidden rounded-2xl border border-[#f2a33a4a] bg-[#fff4df] px-4 py-3 text-sm text-text-secondary">
                        {copy.thinkingLabel}
                      </article>
                    ) : null}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="mt-3 flex shrink-0 gap-2">
                  <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder={copy.inputPlaceholder}
                    className="min-w-0 flex-1 rounded-full border border-line bg-white px-4 py-2.5 text-sm text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                  />
                  <button
                    type="submit"
                    disabled={isSending || input.trim().length === 0}
                    className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d3f4c] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {copy.sendLabel}
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-label={isOpen ? closeLabel : openLabel}
        className="pointer-events-auto inline-flex items-center gap-3 rounded-full bg-[linear-gradient(135deg,#0b3a5d_0%,#17506c_65%,#f2a33a_135%)] px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_40px_-24px_rgba(8,47,76,0.95)] transition hover:translate-y-[-1px] hover:shadow-[0_24px_44px_-24px_rgba(8,47,76,0.95)]"
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
