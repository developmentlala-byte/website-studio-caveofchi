import { z } from "astro/zod";
import { fetchEvents } from "@/lib/api/events";
import { dayKey } from "@/lib/format";

const eventDataSchema = z.object({
  eventId: z.string().nullable().optional(),
  slug: z.string(),
  title: z.string(),
  subtitle: z.string(),
  description: z.string().optional(),
  category: z.enum(["creative", "wellness", "social"]).nullable().optional(),
  space: z.string().min(1).nullable().optional(),
  studioName: z.string().min(1).nullable().optional(),
  price: z.number().int().nonnegative().nullable().optional(),
  startsAt: z.coerce.date().nullable().optional(),
  durationMinutes: z.number().int().positive().nullable().optional(),
  capacity: z.number().int().positive().nullable().optional(),
  seatsLeft: z.number().int().nonnegative().nullable().optional(),
  imageUrl: z.url({ protocol: /^https?$/ }).optional(),
  images: z.array(z.object({
    url: z.url({ protocol: /^https?$/ }),
    altText: z.string().nullable(),
    sortOrder: z.number().int().nonnegative(),
  })).default([]),
  included: z.array(z.string()).default([]),
  sessions: z.array(z.object({
    sessionId: z.string(),
    startsAt: z.coerce.date(),
    durationMinutes: z.number().int().positive(),
    price: z.number().int().nonnegative(),
    capacity: z.number().int().positive(),
    seatsLeft: z.number().int().nonnegative(),
    space: z.string().min(1),
    studioName: z.string().min(1),
    registrationOpensAt: z.coerce.date().nullable(),
    registrationClosesAt: z.coerce.date().nullable(),
    isBookable: z.boolean(),
    salesStatus: z.enum(["coming_soon", "open", "sold_out", "closed"]),
  })).default([]),
});

export type CaveEvent = {
  id: string;
  data: z.infer<typeof eventDataSchema>;
};

const byDate = (a: CaveEvent, b: CaveEvent) =>
  (a.data.sessions[0]?.startsAt.getTime() ?? Number.POSITIVE_INFINITY) -
  (b.data.sessions[0]?.startsAt.getTime() ?? Number.POSITIVE_INFINITY);

export async function getUpcomingEvents(limit?: number) {
  const now = Date.now();
  const all = (await fetchEvents())
    .map((event) => {
      const data = eventDataSchema.parse(event);
      data.sessions = data.sessions.filter(
        (session) => session.startsAt.getTime() >= now,
      );
      return { id: data.slug, data };
    })
    .filter((event) => event.data.sessions.length > 0 || !event.data.startsAt);
  const sorted = all.sort(byDate);
  return limit === undefined ? sorted : sorted.slice(0, Math.max(0, limit));
}

export async function getEventBySlug(slug: string): Promise<CaveEvent | undefined> {
  return (await getUpcomingEvents()).find((event) => event.id === slug);
}

export function groupByDay(events: CaveEvent[]): [string, CaveEvent[]][] {
  const map = new Map<string, CaveEvent[]>();
  for (const e of events) {
    if (!e.data.startsAt) continue;
    const key = dayKey(e.data.startsAt);
    const group = map.get(key);
    if (group) group.push(e);
    else map.set(key, [e]);
  }
  return [...map.entries()];
}
