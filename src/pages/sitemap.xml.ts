import type { APIRoute } from "astro";
import { fetchStudios } from "@/lib/api/studios";
import { getUpcomingEvents } from "@/lib/events";

const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/booking/after-payment",
  "/booking/status",
  "/experiences",
  "/faq",
  "/schedule",
];

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export const GET: APIRoute = async ({ site, url }) => {
  const origin = site ?? url.origin;
  const [studios, events] = await Promise.all([
    fetchStudios(),
    getUpcomingEvents(),
  ]);
  const routes = [
    ...PUBLIC_ROUTES,
    ...studios.map((studio) => `/studios/${studio.slug}`),
    ...events.map((event) => `/experiences/${event.id}`),
  ];
  const locations = [...new Set(routes)]
    .map((route) => escapeXml(new URL(route, origin).toString()))
    .map((location) => `<url><loc>${location}</loc></url>`)
    .join("");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${locations}</urlset>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
};
