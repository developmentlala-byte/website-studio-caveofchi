import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { A as renderTemplate, w as renderComponent } from "./sequence_9PrHO--S.mjs";
import { d as createComponent } from "./_astro_assets_h7Pf3sRe.mjs";
import { t as $$BaseLayout } from "./BaseLayout_CQ5aQ8le.mjs";
import { t as $$PageHeader } from "./PageHeader_Bx-smBXL.mjs";
import { n as getUpcomingEvents } from "./events_BqFhjy72.mjs";
import { t as $$ExperiencesSection } from "./ExperiencesSection_BSNsBmh0.mjs";
import { t as fetchStudios } from "./studios_DCfuFo0V.mjs";
//#region src/pages/experiences/index.astro
var experiences_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const [events, studios] = await Promise.all([getUpcomingEvents(), fetchStudios()]);
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": "Experiences — Cave of Chi",
		"description": "Semua workshop dan ritual mendatang di Cave of Chi."
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "PageHeader", $$PageHeader, {
		"eyebrow": "Experiences",
		"title": "Find your ritual.",
		"description": "Workshop kreatif, ritual healing, dan pertemuan komunitas."
	})}${renderComponent($$result, "ExperiencesSection", $$ExperiencesSection, {
		"events": events,
		"studios": studios,
		"showIntro": false
	})}` })}`;
}, "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/pages/experiences/index.astro", void 0);
var $$file = "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/pages/experiences/index.astro";
var $$url = "/experiences";
//#endregion
//#region \0virtual:astro:page:src/pages/experiences/index@_@astro
var page = () => experiences_exports;
//#endregion
export { page };
