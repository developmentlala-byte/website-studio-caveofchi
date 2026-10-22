import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site, url }) => {
  const origin = site ?? new URL(url.origin);
  const lines = ["User-agent: *", "Allow: /"];
  lines.push(`Sitemap: ${new URL("/sitemap-index.xml", origin)}`);

  return new Response(`${lines.join("\n")}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
