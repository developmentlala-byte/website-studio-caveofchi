import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { n as getUpcomingEvents } from "./events_BqFhjy72.mjs";
import { t as fetchStudios } from "./studios_DCfuFo0V.mjs";
//#region src/pages/sitemap.xml.ts
var sitemap_xml_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var PUBLIC_ROUTES = [
	"/",
	"/about",
	"/booking/after-payment",
	"/booking/status",
	"/experiences",
	"/faq",
	"/schedule"
];
function escapeXml(value) {
	return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&apos;");
}
var GET = async ({ site, url }) => {
	const origin = site ?? url.origin;
	const [studios, events] = await Promise.all([fetchStudios(), getUpcomingEvents()]);
	const routes = [
		...PUBLIC_ROUTES,
		...studios.map((studio) => `/studios/${studio.slug}`),
		...events.map((event) => `/experiences/${event.id}`)
	];
	const locations = [...new Set(routes)].map((route) => escapeXml(new URL(route, origin).toString())).map((location) => `<url><loc>${location}</loc></url>`).join("");
	return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${locations}</urlset>`, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
//#endregion
//#region \0virtual:astro:page:src/pages/sitemap.xml@_@ts
var page = () => sitemap_xml_exports;
//#endregion
export { page };
