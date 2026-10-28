import type { APIRoute } from "astro";
import { fetchPublicBookingEvents } from "@/lib/api/events";

export const GET: APIRoute = async () => {
  const events = await fetchPublicBookingEvents();

  return new Response(JSON.stringify(events), {
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/json; charset=utf-8",
    },
  });
};
