import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { A as renderTemplate, j as maybeRenderHead, w as renderComponent } from "./sequence_9PrHO--S.mjs";
import { d as createComponent } from "./_astro_assets_h7Pf3sRe.mjs";
import { t as $$BaseLayout } from "./BaseLayout_CQ5aQ8le.mjs";
//#region src/pages/404.astro
var _404_exports = /* @__PURE__ */ __exportAll({
	default: () => $$404,
	file: () => $$file,
	url: () => $$url
});
var $$404 = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": "Halaman tidak ditemukan — Cave of Chi",
		"description": "Halaman yang kamu cari tidak tersedia.",
		"noindex": true,
		"data-astro-cid-ibpinaeu": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="not-found section container" data-astro-cid-ibpinaeu><div class="eyebrow" data-astro-cid-ibpinaeu>404 / Page not found</div><h1 class="heading" data-astro-cid-ibpinaeu>Let's find<br data-astro-cid-ibpinaeu><em class="script" data-astro-cid-ibpinaeu>our way back.</em></h1><a href="/" data-astro-cid-ibpinaeu>Kembali ke beranda <span aria-hidden="true" data-astro-cid-ibpinaeu>↗</span></a></section>` })}`;
}, "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/pages/404.astro", void 0);
var $$file = "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/pages/404.astro";
var $$url = "/404";
//#endregion
//#region \0virtual:astro:page:src/pages/404@_@astro
var page = () => _404_exports;
//#endregion
export { page };
