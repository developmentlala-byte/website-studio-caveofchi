import {
  parsePublicBookingEvents,
  type PublicBookingEvent,
} from "@/lib/api/booking-events";

export async function fetchBookingEvents(): Promise<PublicBookingEvent[]> {
  const response = await fetch("/api/booking-events.json", {
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(
      `[booking] Request event publik gagal dengan HTTP ${response.status} ${response.statusText}.`,
    );
  }

  const payload: unknown = await response.json();
  return parsePublicBookingEvents(payload);
}
