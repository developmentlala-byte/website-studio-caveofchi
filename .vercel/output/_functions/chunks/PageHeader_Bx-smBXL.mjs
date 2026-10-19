import { A as renderTemplate, j as maybeRenderHead } from "./sequence_9PrHO--S.mjs";
import { d as createComponent, u as createAstro } from "./_astro_assets_h7Pf3sRe.mjs";
//#region src/components/layout/PageHeader.astro
createAstro("https://caveofchi.example");
var $$PageHeader = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PageHeader;
	const { eyebrow, title, description } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<section class="page-header" data-astro-cid-5gwfj4eg><div class="container" data-astro-cid-5gwfj4eg><div class="eyebrow" data-astro-cid-5gwfj4eg>${eyebrow}</div><h1 class="heading" data-astro-cid-5gwfj4eg>${title}</h1>${description && renderTemplate`<p class="lead" data-astro-cid-5gwfj4eg>${description}</p>`}</div></section>`;
}, "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/components/layout/PageHeader.astro", void 0);
//#endregion
export { $$PageHeader as t };
