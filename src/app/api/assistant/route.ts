import { NextResponse } from "next/server";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/site";

type AssistantHistoryItem = {
  role: "user" | "assistant";
  content: string;
};

type AssistantPayload = {
  locale?: string;
  message?: string;
  history?: AssistantHistoryItem[];
};

type AssistantSource = {
  title: string;
  url: string;
};

const MAX_MESSAGE_LENGTH = 1500;
const MAX_HISTORY = 8;

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeLocale(value: string): Locale {
  return isLocale(value) ? value : "en";
}

function extractOutputText(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    return "";
  }

  const withOutputText = payload as { output_text?: unknown };
  if (typeof withOutputText.output_text === "string" && withOutputText.output_text.trim().length > 0) {
    return withOutputText.output_text.trim();
  }

  const withOutput = payload as { output?: unknown };
  if (!Array.isArray(withOutput.output)) {
    return "";
  }

  const chunks: string[] = [];
  for (const item of withOutput.output) {
    if (!item || typeof item !== "object") {
      continue;
    }

    const messageItem = item as { type?: unknown; content?: unknown };
    if (messageItem.type !== "message" || !Array.isArray(messageItem.content)) {
      continue;
    }

    for (const contentPart of messageItem.content) {
      if (!contentPart || typeof contentPart !== "object") {
        continue;
      }
      const textPart = contentPart as { type?: unknown; text?: unknown };
      if (textPart.type === "output_text" && typeof textPart.text === "string") {
        chunks.push(textPart.text);
      }
    }
  }

  return chunks.join("\n").trim();
}

function extractSources(payload: unknown): AssistantSource[] {
  if (!payload || typeof payload !== "object") {
    return [];
  }

  const withOutput = payload as { output?: unknown };
  if (!Array.isArray(withOutput.output)) {
    return [];
  }

  const sourceMap = new Map<string, string>();

  for (const item of withOutput.output) {
    if (!item || typeof item !== "object") {
      continue;
    }

    const messageItem = item as { type?: unknown; content?: unknown };
    if (messageItem.type !== "message" || !Array.isArray(messageItem.content)) {
      continue;
    }

    for (const contentPart of messageItem.content) {
      if (!contentPart || typeof contentPart !== "object") {
        continue;
      }

      const partWithAnnotations = contentPart as { annotations?: unknown };
      if (!Array.isArray(partWithAnnotations.annotations)) {
        continue;
      }

      for (const annotation of partWithAnnotations.annotations) {
        if (!annotation || typeof annotation !== "object") {
          continue;
        }

        const citation = annotation as { type?: unknown; url?: unknown; title?: unknown };
        if (citation.type !== "url_citation" || typeof citation.url !== "string") {
          continue;
        }

        const normalizedUrl = citation.url.trim();
        if (!normalizedUrl) {
          continue;
        }

        const fallbackTitle = (() => {
          try {
            return new URL(normalizedUrl).hostname;
          } catch {
            return normalizedUrl;
          }
        })();

        sourceMap.set(normalizedUrl, typeof citation.title === "string" && citation.title.trim() ? citation.title.trim() : fallbackTitle);
      }
    }
  }

  return Array.from(sourceMap.entries())
    .slice(0, 6)
    .map(([url, title]) => ({ title, url }));
}

function buildSystemPrompt(locale: Locale) {
  const languageInstruction =
    locale === "ar"
      ? "Respond primarily in Arabic."
      : locale === "no"
        ? "Respond primarily in Norwegian (Bokmal)."
        : "Respond primarily in English.";

  return [
    "You are the official AI assistant for The Dialogue Platform.",
    languageInstruction,
    "Keep answers accurate, practical, and concise.",
    "When the user asks about Sudan updates, humanitarian conditions, conflict status, or latest developments, use web search and include the date of the update.",
    "When possible, include 2-6 source links.",
    "If uncertain, say what is uncertain instead of guessing.",
    "Use a neutral, peace-oriented, and inclusive tone.",
    `Platform context: ${siteConfig.name} builds trust and peace through dialogue in collaboration with ${siteConfig.partners.join(" and ")}.`,
    `Official channels: ${siteConfig.socialChannels.map((channel) => `${channel.label}: ${channel.href}`).join(" | ")}.`,
  ].join(" ");
}

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: AssistantPayload;

  try {
    payload = (await request.json()) as AssistantPayload;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request payload." }, { status: 400 });
  }

  const locale = normalizeLocale(clean(payload.locale));
  const message = clean(payload.message);
  const history = Array.isArray(payload.history) ? payload.history : [];

  if (!message) {
    return NextResponse.json({ ok: false, message: "Message is required." }, { status: 400 });
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ ok: false, message: "Message is too long." }, { status: 400 });
  }

  const openAiKey = clean(process.env.OPENAI_API_KEY);
  if (!openAiKey) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "AI assistant is not configured yet. Add OPENAI_API_KEY in Vercel project environment variables, then redeploy.",
      },
      { status: 503 },
    );
  }

  const normalizedHistory = history
    .slice(-MAX_HISTORY)
    .map((item) => ({
      role: item.role === "assistant" ? "assistant" : "user",
      content: clean(item.content),
    }))
    .filter((item) => item.content.length > 0);

  const input = [
    { role: "system", content: buildSystemPrompt(locale) },
    ...normalizedHistory,
    { role: "user", content: message },
  ];

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openAiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_ASSISTANT_MODEL || "gpt-4.1-mini",
        input,
        tools: [{ type: "web_search_preview" }],
        tool_choice: "auto",
        temperature: 0.2,
        max_output_tokens: 700,
      }),
    });

    const raw = (await response.json()) as unknown;

    if (!response.ok) {
      const messageFromApi =
        raw && typeof raw === "object" && "error" in raw ? String((raw as { error?: unknown }).error) : "Assistant API request failed.";
      return NextResponse.json({ ok: false, message: messageFromApi }, { status: 502 });
    }

    const answer = extractOutputText(raw);
    const sources = extractSources(raw);

    return NextResponse.json({
      ok: true,
      answer: answer || "I could not produce a clear answer for this request. Please try again with a more specific question.",
      sources,
    });
  } catch {
    return NextResponse.json({ ok: false, message: "Assistant request failed. Please try again." }, { status: 502 });
  }
}

