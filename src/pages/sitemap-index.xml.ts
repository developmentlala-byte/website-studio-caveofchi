import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site, url }) => {
  const sitemapUrl = new URL("/sitemap.xml", site ?? url.origin).toString();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${sitemapUrl}</loc></sitemap>
</sitemapindex>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
