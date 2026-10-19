import { A as renderTemplate, N as addAttribute, T as Fragment, j as maybeRenderHead, w as renderComponent } from "./sequence_9PrHO--S.mjs";
import { d as createComponent, u as createAstro } from "./_astro_assets_h7Pf3sRe.mjs";
import { i as renderScript } from "./BaseLayout_CQ5aQ8le.mjs";
//#region src/components/common/Gallery.astro
createAstro("https://caveofchi.example");
var $$Gallery = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Gallery;
	const { images, label, ratio = "3 / 2" } = Astro.props;
	const total = images.length;
	const cover = images[0];
	return renderTemplate`${cover && renderTemplate`${maybeRenderHead($$result)}<div class="gallery" data-gallery role="group"${addAttribute(`Galeri ${label}`, "aria-label")}${addAttribute(`--ratio:${ratio}`, "style")} data-astro-cid-t4phoku3><div class="stage" data-stage-wrap data-astro-cid-t4phoku3><img class="stage-img" data-stage${addAttribute(cover.url, "src")}${addAttribute(cover.altText || label, "alt")} loading="eager" fetchpriority="high" decoding="async" data-astro-cid-t4phoku3>${total > 1 && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<button type="button" class="nav prev" data-prev aria-label="Foto sebelumnya" data-astro-cid-t4phoku3><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-astro-cid-t4phoku3><path d="M15 5l-7 7 7 7" data-astro-cid-t4phoku3></path></svg></button><button type="button" class="nav next" data-next aria-label="Foto berikutnya" data-astro-cid-t4phoku3><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-astro-cid-t4phoku3><path d="M9 5l7 7-7 7" data-astro-cid-t4phoku3></path></svg></button><span class="count" aria-live="polite" data-astro-cid-t4phoku3><span data-current data-astro-cid-t4phoku3>1</span> / ${total}</span>` })}`}</div>${total > 1 && renderTemplate`<ul class="thumbs" aria-label="Pilih foto" data-astro-cid-t4phoku3>${images.map((img, i) => renderTemplate`<li data-astro-cid-t4phoku3><button type="button" class="thumb"${addAttribute(img.url, "data-src")}${addAttribute(img.altText || `Foto ${label} ${i + 1}`, "data-alt")}${addAttribute(`Lihat foto ${i + 1}`, "aria-label")}${addAttribute(i === 0 ? "true" : void 0, "aria-current")} data-astro-cid-t4phoku3><img${addAttribute(img.url, "src")} alt="" loading="lazy" decoding="async" data-astro-cid-t4phoku3></button></li>`)}</ul>`}</div>`}${renderScript($$result, "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/components/common/Gallery.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/components/common/Gallery.astro", void 0);
//#endregion
export { $$Gallery as t };
