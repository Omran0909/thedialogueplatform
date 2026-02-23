import { buildCalendarFeed, calendarEvents } from "@/lib/events-calendar";

export const dynamic = "force-static";

export function GET() {
  const body = buildCalendarFeed(calendarEvents, "en");

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      "Content-Disposition": 'inline; filename="the-dialogue-platform-events.ics"',
    },
  });
}
