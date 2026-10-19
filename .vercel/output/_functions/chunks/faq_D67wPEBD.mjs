import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { A as renderTemplate, N as addAttribute, j as maybeRenderHead, w as renderComponent } from "./sequence_9PrHO--S.mjs";
import { d as createComponent } from "./_astro_assets_h7Pf3sRe.mjs";
import { t as $$BaseLayout } from "./BaseLayout_CQ5aQ8le.mjs";
import { t as $$PageHeader } from "./PageHeader_Bx-smBXL.mjs";
//#region src/data/faq.ts
var FAQ = [
	{
		q: "Apakah pemula boleh ikut kelas?",
		a: "Tentu. Mayoritas workshop dirancang ramah pemula. Fasilitator akan membimbing langkah demi langkah."
	},
	{
		q: "Apa yang perlu saya bawa?",
		a: "Detail perlengkapan akan disampaikan pada informasi setiap pengalaman. Jika tidak ada keterangan khusus, semua alat utama sudah disediakan."
	},
	{
		q: "Bagaimana cara memesan tempat?",
		a: "Pilih pengalaman yang ingin diikuti, tekan tombol reservasi, lalu isi data peserta. Pada mode demo, proses ini hanya simulasi dan tidak membuat pemesanan sungguhan."
	},
	{
		q: "Apakah saya bisa mengadakan private class?",
		a: "Bisa. Hubungi tim Cave of Chi untuk mendiskusikan tanggal, jumlah peserta, dan format kegiatan yang sesuai."
	}
];
//#endregion
//#region src/components/faq/FaqList.astro
var $$FaqList = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<div class="faq-list" data-astro-cid-f6s5ah4t>${FAQ.map((item, index) => renderTemplate`<details${addAttribute(index === 0, "open")} data-astro-cid-f6s5ah4t><summary data-astro-cid-f6s5ah4t>${item.q}</summary><p data-astro-cid-f6s5ah4t>${item.a}</p></details>`)}</div>`;
}, "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/components/faq/FaqList.astro", void 0);
//#endregion
//#region src/pages/faq.astro
var faq_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Faq,
	file: () => $$file,
	url: () => $$url
});
var $$Faq = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": "FAQ — Cave of Chi",
		"description": "Jawaban atas pertanyaan umum tentang pengalaman dan reservasi di Cave of Chi."
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "PageHeader", $$PageHeader, {
		"eyebrow": "A few helpful things",
		"title": "Frequently asked.",
		"description": "Informasi praktis sebelum kamu datang dan menikmati pengalaman di Cave of Chi."
	})}${maybeRenderHead($$result)}<section class="section container">${renderComponent($$result, "FaqList", $$FaqList, {})}</section>` })}`;
}, "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/pages/faq.astro", void 0);
var $$file = "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/pages/faq.astro";
var $$url = "/faq";
//#endregion
//#region \0virtual:astro:page:src/pages/faq@_@astro
var page = () => faq_exports;
//#endregion
export { page };
