import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { A as renderTemplate, w as renderComponent } from "./sequence_9PrHO--S.mjs";
import { d as createComponent } from "./_astro_assets_h7Pf3sRe.mjs";
import { t as $$BaseLayout } from "./BaseLayout_CQ5aQ8le.mjs";
import { n as $$Intro, r as $$CommunityBand, t as $$RitualBand } from "./RitualBand_Byl9kEH2.mjs";
import { t as $$PageHeader } from "./PageHeader_Bx-smBXL.mjs";
//#region src/pages/about.astro
var about_exports = /* @__PURE__ */ __exportAll({
	default: () => $$About,
	file: () => $$file,
	url: () => $$url
});
var $$About = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": "Our Story — Cave of Chi",
		"description": "Kenali Cave of Chi, sanctuary kreatif untuk merasa, membuat, dan terhubung."
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "PageHeader", $$PageHeader, {
		"eyebrow": "Our story",
		"title": "Space to slow down.",
		"description": "Sebuah ruang untuk berkarya, merasakan, dan terhubung dengan diri sendiri maupun orang lain."
	})}${renderComponent($$result, "Intro", $$Intro, {})}${renderComponent($$result, "RitualBand", $$RitualBand, {})}${renderComponent($$result, "CommunityBand", $$CommunityBand, {})}` })}`;
}, "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/pages/about.astro", void 0);
var $$file = "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/pages/about.astro";
var $$url = "/about";
//#endregion
//#region \0virtual:astro:page:src/pages/about@_@astro
var page = () => about_exports;
//#endregion
export { page };
