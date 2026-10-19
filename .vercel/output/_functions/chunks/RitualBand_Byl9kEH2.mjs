import { A as renderTemplate, j as maybeRenderHead, w as renderComponent, z as unescapeHTML } from "./sequence_9PrHO--S.mjs";
import { d as createComponent, i as createImageAsset, n as $$Image } from "./_astro_assets_h7Pf3sRe.mjs";
//#region src/components/home/CommunityBand.astro
var $$CommunityBand = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section class="community section" id="community" data-astro-cid-yc7cauba><div class="container community-inner" data-astro-cid-yc7cauba><svg class="community-star" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" aria-hidden="true" data-astro-cid-yc7cauba>${unescapeHTML("<path d=\"M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9\"/>")}</svg><div class="eyebrow" data-astro-cid-yc7cauba>06 / A space to belong</div><h2 class="heading" data-astro-cid-yc7cauba>A community<br data-astro-cid-yc7cauba>of <em class="script-cst-color" data-astro-cid-yc7cauba>becoming.</em></h2><p class="community-lead" data-astro-cid-yc7cauba>We believe beautiful things happen when people gather with intention. Temukan teman baru, berkolaborasi, dan bertumbuh bersama di ruang yang menerima setiap versi dirimu.</p><div class="pillars" data-astro-cid-yc7cauba>${[
		{
			title: "Make",
			text: "Ruang eksplorasi untuk mencipta sesuatu dengan tangan sendiri, tanpa tekanan.",
			svg: "<path d=\"M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9\"/>"
		},
		{
			title: "Restore",
			text: "Ritual mindful untuk memulihkan energi dan menemukan jeda dari keseharian.",
			svg: "<circle cx=\"12\" cy=\"12\" r=\"8\"/>"
		},
		{
			title: "Belong",
			text: "Komunitas hangat yang menyambut setiap orang apa adanya.",
			svg: "<path d=\"M12 3.5 20.5 12 12 20.5 3.5 12Z\"/>"
		}
	].map((p) => renderTemplate`<div class="pillar" data-astro-cid-yc7cauba><svg class="pillar-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-astro-cid-yc7cauba>${unescapeHTML(p.svg)}</svg><h3 data-astro-cid-yc7cauba>${p.title}</h3><p data-astro-cid-yc7cauba>${p.text}</p></div>`)}</div></div></section>`;
}, "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/components/home/CommunityBand.astro", void 0);
//#endregion
//#region src/components/home/Intro.astro
var $$Intro = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section class="intro section" id="story" data-astro-cid-nwktezpe><div class="container intro-inner" data-astro-cid-nwktezpe><div class="intro-head" data-astro-cid-nwktezpe><div class="eyebrow" data-astro-cid-nwktezpe>01 / The idea behind our space</div><h2 class="heading" data-astro-cid-nwktezpe>More than<br data-astro-cid-nwktezpe>a <em class="script-cst-color" data-astro-cid-nwktezpe>place.</em><br data-astro-cid-nwktezpe>A feeling.</h2></div><div class="intro-body" data-astro-cid-nwktezpe><p data-astro-cid-nwktezpe>Cave of Chi lahir dari keyakinan sederhana: terkadang yang kita butuhkan hanyalah sebuah ruang untuk kembali terhubung—dengan diri sendiri, dengan karya, dan dengan orang-orang baru.</p><p data-astro-cid-nwktezpe>Dari merangkai bunga sampai sound healing, setiap pengalaman dirancang terasa personal, hangat, dan jauh dari hiruk-pikuk keseharian.</p><div class="intro-stats" data-astro-cid-nwktezpe>${[
		{
			value: "02",
			label: "Intimate caves"
		},
		{
			value: "10",
			label: "Seats per studio*"
		},
		{
			value: "∞",
			label: "Ways to connect"
		}
	].map((s) => renderTemplate`<div class="stat" data-astro-cid-nwktezpe><strong data-astro-cid-nwktezpe>${s.value}</strong><span data-astro-cid-nwktezpe>${s.label}</span></div>`)}</div><p class="intro-note" data-astro-cid-nwktezpe>*Kapasitas konsep awal, disesuaikan dengan jenis aktivitas.</p></div></div></section>`;
}, "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/components/home/Intro.astro", void 0);
//#endregion
//#region src/assets/images/sound.webp
var sound_default = createImageAsset({
	"src": "/_astro/sound.mM7RqIjD.webp",
	"width": 624,
	"height": 624,
	"format": "webp"
}, "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/assets/images/sound.webp", false);
//#endregion
//#region src/data/ritual.ts
var RITUAL_STEPS = [
	{
		title: "01. Arrive",
		text: "Datang, disambut, temukan ritme yang nyaman."
	},
	{
		title: "02. Create",
		text: "Belajar, eksplorasi, dan hadir di momen."
	},
	{
		title: "03. Connect",
		text: "Berbagi karya dan cerita dengan komunitas."
	},
	{
		title: "04. Return",
		text: "Bawa pulang pengalaman, bukan hanya benda."
	}
];
//#endregion
//#region src/components/home/RitualBand.astro
var $$RitualBand = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section class="ritual" data-astro-cid-twrjtmpy><div class="ritual-photo" data-astro-cid-twrjtmpy>${renderComponent($$result, "Image", $$Image, {
		"src": sound_default,
		"widths": [
			640,
			960,
			1280
		],
		"sizes": "(max-width: 740px) 100vw, 50vw",
		"alt": "Suasana sound healing dengan singing bowl dan gong di dalam cave bercahaya lilin",
		"loading": "lazy",
		"data-astro-cid-twrjtmpy": true
	})}</div><div class="ritual-copy" data-astro-cid-twrjtmpy><div class="eyebrow" data-astro-cid-twrjtmpy>05 / The Cave of Chi way</div><h2 data-astro-cid-twrjtmpy>Come as<br data-astro-cid-twrjtmpy>you <em class="script-cstt-color" data-astro-cid-twrjtmpy>are.</em></h2><p data-astro-cid-twrjtmpy>Tidak perlu jadi seniman untuk berkarya. Tidak perlu tahu apa-apa tentang meditasi untuk mulai. Di sini, rasa penasaran sudah cukup untuk memulai.</p><div class="ritual-steps" data-astro-cid-twrjtmpy>${RITUAL_STEPS.map((s) => renderTemplate`<div data-astro-cid-twrjtmpy><strong data-astro-cid-twrjtmpy>${s.title}</strong><small data-astro-cid-twrjtmpy>${s.text}</small></div>`)}</div></div></section>`;
}, "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/components/home/RitualBand.astro", void 0);
//#endregion
export { $$Intro as n, $$CommunityBand as r, $$RitualBand as t };
