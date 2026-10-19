import { z } from "astro/zod";
import { fetchEvents } from "@/lib/api/events";
import { dayKey } from "@/lib/format";

const eventDataSchema = z.object({
  eventId: z.string(),
  slug: z.string(),
  title: z.string(),
  subtitle: z.string(),
  description: z.string().optional(),
  category: z.enum(["creative", "wellness", "social"]).nullable().optional(),
  space: z.string().min(1),
  studioName: z.string().min(1),
  price: z.number().int().nonnegative(),
  startsAt: z.coerce.date(),
  durationMinutes: z.number().int().positive(),
  capacity: z.number().int().positive(),
  seatsLeft: z.number().int().nonnegative(),
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
  })).default([]),
});

export type CaveEvent = {
  id: string;
  data: z.infer<typeof eventDataSchema>;
};

const byDate = (a: CaveEvent, b: CaveEvent) =>
  a.data.startsAt.getTime() - b.data.startsAt.getTime();

export async function getUpcomingEvents(limit?: number) {
  const now = Date.now();
  const all = (await fetchEvents())
    .map((event) => {
      const data = eventDataSchema.parse(event);
      return { id: data.slug, data };
    })
    .filter((event) => event.data.startsAt.getTime() >= now);
  const sorted = all.sort(byDate);
  return limit === undefined ? sorted : sorted.slice(0, Math.max(0, limit));
}

export async function getEventBySlug(slug: string): Promise<CaveEvent | undefined> {
  return (await getUpcomingEvents()).find((event) => event.id === slug);
}

export function groupByDay(events: CaveEvent[]): [string, CaveEvent[]][] {
  const map = new Map<string, CaveEvent[]>();
  for (const e of events) {
    const key = dayKey(e.data.startsAt);
    const group = map.get(key);
    if (group) group.push(e);
    else map.set(key, [e]);
  }
  return [...map.entries()];
}
