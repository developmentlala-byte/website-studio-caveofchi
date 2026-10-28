import type { APIRoute } from "astro";
import { fetchStudios } from "@/lib/api/studios";
import { getUpcomingEvents } from "@/lib/events";

const PUBLIC_ROUTES = [
  "/",
  "/about",
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
    .map((route) => {
      const defaultUrl = escapeXml(new URL(route, origin).toString());
      const englishPath = route === "/" ? "/en" : `/en${route}`;
      const englishUrl = escapeXml(new URL(englishPath, origin).toString());
      return [
        `<url><loc>${defaultUrl}</loc>`,
        `<xhtml:link rel="alternate" hreflang="id" href="${defaultUrl}" />`,
        `<xhtml:link rel="alternate" hreflang="en" href="${englishUrl}" />`,
        `<xhtml:link rel="alternate" hreflang="x-default" href="${defaultUrl}" />`,
        `</url>`,
        `<url><loc>${englishUrl}</loc>`,
        `<xhtml:link rel="alternate" hreflang="id" href="${defaultUrl}" />`,
        `<xhtml:link rel="alternate" hreflang="en" href="${englishUrl}" />`,
        `<xhtml:link rel="alternate" hreflang="x-default" href="${defaultUrl}" />`,
        `</url>`,
      ].join("");
    })
    .join("");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${locations}</urlset>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
};
