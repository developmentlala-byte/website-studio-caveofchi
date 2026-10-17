import { getCollection, type CollectionEntry } from "astro:content";
import { dayKey } from "@/lib/format";

export type CaveEvent = CollectionEntry<"events">;

const byDate = (a: CaveEvent, b: CaveEvent) =>
  a.data.startsAt.getTime() - b.data.startsAt.getTime();

export async function getUpcomingEvents(limit?: number) {
  const now = Date.now();
  const all = await getCollection(
    "events",
    ({ data }) => data.startsAt.getTime() >= now,
  );
  const sorted = all.sort(byDate);
  return limit === undefined ? sorted : sorted.slice(0, Math.max(0, limit));
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
