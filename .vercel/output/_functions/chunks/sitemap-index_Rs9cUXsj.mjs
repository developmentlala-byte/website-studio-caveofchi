import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
//#region src/pages/sitemap-index.xml.ts
var sitemap_index_xml_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var GET = ({ site, url }) => {
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${new URL("/sitemap.xml", site ?? url.origin).toString()}</loc></sitemap>
</sitemapindex>`;
	return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
//#endregion
//#region \0virtual:astro:page:src/pages/sitemap-index.xml@_@ts
var page = () => sitemap_index_xml_exports;
//#endregion
export { page };
