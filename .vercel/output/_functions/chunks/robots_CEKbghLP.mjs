import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
//#region src/pages/robots.txt.ts
var robots_txt_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var GET = ({ site }) => {
	const lines = ["User-agent: *", "Allow: /"];
	if (site) lines.push(`Sitemap: ${new URL("/sitemap-index.xml", site)}`);
	return new Response(`${lines.join("\n")}\n`, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
//#endregion
//#region \0virtual:astro:page:src/pages/robots.txt@_@ts
var page = () => robots_txt_exports;
//#endregion
export { page };
