import { A as renderTemplate, D as renderSlot, M as renderHead, N as addAttribute, P as createRenderInstruction, j as maybeRenderHead, w as renderComponent } from "./sequence_9PrHO--S.mjs";
import { d as createComponent, i as createImageAsset, n as $$Image, u as createAstro } from "./_astro_assets_h7Pf3sRe.mjs";
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/runtime/server/render/script.js
/**
* Relies on the `renderScript: true` compiler option
* @experimental
*/
async function renderScript(result, id) {
	const inlined = result.inlinedScripts.get(id);
	let content = "";
	if (inlined != null) {
		if (inlined) content = `<script type="module">${inlined}<\/script>`;
	} else {
		const resolved = await result.resolve(id);
		content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"><\/script>`;
	}
	return createRenderInstruction({
		type: "script",
		id,
		content
	});
}
//#endregion
//#region src/components/layout/AnnouncementBar.astro
var $$AnnouncementBar = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<div class="top-note" data-astro-cid-zi7eklj6>A little slower, a little closer. &nbsp;✳&nbsp; Welcome to our creative sanctuary</div>`;
}, "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/components/layout/AnnouncementBar.astro", void 0);
//#endregion
//#region src/assets/images/logo-cave-of-chi.png
var logo_cave_of_chi_default = createImageAsset({
	"src": "/_astro/logo-cave-of-chi.B6r6MUZh.png",
	"width": 424,
	"height": 446,
	"format": "png"
}, "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/assets/images/logo-cave-of-chi.png", false);
//#endregion
//#region src/components/layout/Brand.astro
createAstro("https://caveofchi.example");
var $$Brand = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Brand;
	const { size = "md" } = Astro.props;
	const height = {
		md: 48,
		lg: 88
	}[size] * 2;
	return renderTemplate`${maybeRenderHead($$result)}<a${addAttribute(["brand", size], "class:list")} href="/" data-astro-cid-2abpm7aj>${renderComponent($$result, "Image", $$Image, {
		"src": logo_cave_of_chi_default,
		"alt": "Cave of Chi — Art. Space. Energy.",
		"height": height,
		"class": "brand-logo",
		"loading": "eager",
		"fetchpriority": "high",
		"decoding": "async",
		"data-astro-cid-2abpm7aj": true
	})}</a>`;
}, "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/components/layout/Brand.astro", void 0);
//#endregion
//#region src/lib/site.ts
var SITE = {
	name: "Cave of Chi",
	tagline: "Art. Space. Energy.",
	description: "Cave of Chi — sanctuary kreatif untuk workshop, ritual mindful, dan koneksi bermakna.",
	instagram: "@caveofchi"
};
var CATEGORIES = {
	creative: "Creative Studio",
	wellness: "Healing & Wellness",
	social: "Gather & Connect"
};
function isEventCategory(value) {
	return Object.hasOwn(CATEGORIES, value);
}
function getCategoryLabel(category) {
	if (category && isEventCategory(category)) return CATEGORIES[category];
	return "Live Event";
}
var NAV_LINKS = [
	{
		label: "Our Story",
		href: "/about"
	},
	{
		label: "The Caves",
		href: "/#spaces"
	},
	{
		label: "Experiences",
		href: "/experiences"
	},
	{
		label: "Schedule",
		href: "/schedule"
	},
	{
		label: "Community",
		href: "/about#community"
	}
];
//#endregion
//#region src/components/layout/SiteHeader.astro
createAstro("https://caveofchi.example");
var $$SiteHeader = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$SiteHeader;
	const { variant = "overlay" } = Astro.props;
	const path = Astro.url.pathname;
	const isCurrent = (href) => !href.includes("#") && (href === path || path.startsWith(href + "/"));
	return renderTemplate`${maybeRenderHead($$result)}<header${addAttribute(["header", variant], "class:list")} data-astro-cid-vwn3tmth>${renderComponent($$result, "Brand", $$Brand, { "data-astro-cid-vwn3tmth": true })}<nav class="nav" id="site-nav" aria-label="Navigasi utama" data-astro-cid-vwn3tmth>${NAV_LINKS.map((l) => renderTemplate`<a${addAttribute(l.href, "href")}${addAttribute(isCurrent(l.href) ? "page" : void 0, "aria-current")} data-astro-cid-vwn3tmth>${l.label}</a>`)}<a class="nav-book" href="/experiences" data-book data-astro-cid-vwn3tmth>Book an experience ↗</a></nav><button class="menu-btn" type="button" aria-label="Buka navigasi" aria-expanded="false" aria-controls="site-nav" data-astro-cid-vwn3tmth>☰</button></header>${renderScript($$result, "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/components/layout/SiteHeader.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/components/layout/SiteHeader.astro", void 0);
//#endregion
//#region src/components/layout/SiteFooter.astro
var $$SiteFooter = createComponent(($$result, $$props, $$slots) => {
	const year = (/* @__PURE__ */ new Date()).getFullYear();
	return renderTemplate`${maybeRenderHead($$result)}<footer class="footer" data-astro-cid-qup6pdxl><div class="container" data-astro-cid-qup6pdxl><div class="footer-upper" data-astro-cid-qup6pdxl><div data-astro-cid-qup6pdxl>${renderComponent($$result, "Brand", $$Brand, {
		"size": "lg",
		"data-astro-cid-qup6pdxl": true
	})}<p class="footer-caption" data-astro-cid-qup6pdxl>An invitation to slow down, create and connect.</p></div><div class="footer-links" data-astro-cid-qup6pdxl><div data-astro-cid-qup6pdxl><strong data-astro-cid-qup6pdxl>Discover</strong>${NAV_LINKS.filter((l) => l.label !== "Community").map((l) => renderTemplate`<a${addAttribute(l.href, "href")} data-astro-cid-qup6pdxl>${l.label === "Our Story" ? "Our story" : l.label === "The Caves" ? "The caves" : l.label}</a>`)}</div><div data-astro-cid-qup6pdxl><strong data-astro-cid-qup6pdxl>Connect</strong><a href="/about#community" data-astro-cid-qup6pdxl>Our community</a><span data-astro-cid-qup6pdxl>Instagram: ${SITE.instagram}</span><span data-astro-cid-qup6pdxl>WhatsApp: coming soon</span><span data-astro-cid-qup6pdxl>Location: to be announced</span></div></div></div><div class="footer-bottom" data-astro-cid-qup6pdxl><span data-astro-cid-qup6pdxl>© ${year} Cave of Chi • Art. Space. Energy.</span><span class="footer-note" data-astro-cid-qup6pdxl>Concept website · generated moodboard visuals · booking simulation only</span><a href="#main" data-astro-cid-qup6pdxl>Back to top ↑</a></div></div></footer>`;
}, "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/components/layout/SiteFooter.astro", void 0);
//#endregion
//#region src/components/booking/BookingModal.astro
var $$BookingModal = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<dialog id="booking-dialog" aria-labelledby="booking-title" aria-describedby="booking-description" data-astro-cid-ht5j4v5u><div class="modal" data-astro-cid-ht5j4v5u><header class="modal-header" data-astro-cid-ht5j4v5u><div data-astro-cid-ht5j4v5u><span class="eyebrow" data-astro-cid-ht5j4v5u>Cave of Chi / Booking</span><h2 id="booking-title" data-bind="heading" data-astro-cid-ht5j4v5u>Booking baru</h2><p id="booking-description" data-bind="description" data-astro-cid-ht5j4v5u>Pilih event dan sesi, lalu isi data pemesan.</p></div><button type="button" class="close-modal" data-close aria-label="Tutup booking" data-astro-cid-ht5j4v5u>×</button></header><ol class="stepper" aria-label="Langkah booking" data-astro-cid-ht5j4v5u><li class="active" data-step-indicator="1" data-astro-cid-ht5j4v5u><span data-astro-cid-ht5j4v5u>1</span><b data-astro-cid-ht5j4v5u>Sesi & data</b></li><li data-step-indicator="2" data-astro-cid-ht5j4v5u><span data-astro-cid-ht5j4v5u>2</span><b data-astro-cid-ht5j4v5u>Konfirmasi</b></li><li data-step-indicator="3" data-astro-cid-ht5j4v5u><span data-astro-cid-ht5j4v5u>3</span><b data-astro-cid-ht5j4v5u>Selesai</b></li></ol><form data-form data-astro-cid-ht5j4v5u><section class="step-content" data-step-panel="1" data-astro-cid-ht5j4v5u><div class="selection-column" data-astro-cid-ht5j4v5u><div class="field" data-astro-cid-ht5j4v5u><label for="bk-event-search" data-astro-cid-ht5j4v5u>Event</label><input id="bk-event-search" type="search" autocomplete="off" placeholder="Cari nama event" aria-label="Cari event" data-event-search data-astro-cid-ht5j4v5u></div><div class="choice-list event-list" role="listbox" aria-label="Event" data-events data-astro-cid-ht5j4v5u></div><p class="load-message" role="status" data-events-status data-astro-cid-ht5j4v5u>Memuat event...</p><button type="button" class="retry-button" data-retry hidden data-astro-cid-ht5j4v5u>Coba lagi</button><div class="field" data-astro-cid-ht5j4v5u><div class="session-heading" data-astro-cid-ht5j4v5u><span class="label" data-astro-cid-ht5j4v5u>Sesi</span><span class="micro" data-session-count data-astro-cid-ht5j4v5u></span></div><div class="choice-list session-list" role="listbox" aria-label="Sesi" data-sessions data-astro-cid-ht5j4v5u></div></div></div><aside class="customer-column" data-astro-cid-ht5j4v5u><h3 data-astro-cid-ht5j4v5u>Data pemesan</h3><div class="field" data-astro-cid-ht5j4v5u><label for="bk-name" data-astro-cid-ht5j4v5u>Nama customer</label><input id="bk-name" name="name" type="text" autocomplete="name" placeholder="Nama lengkap" required maxlength="150" data-astro-cid-ht5j4v5u></div><div class="field" data-astro-cid-ht5j4v5u><label for="bk-email" data-astro-cid-ht5j4v5u>Email</label><input id="bk-email" name="email" type="email" autocomplete="email" placeholder="nama@email.com" required maxlength="254" data-astro-cid-ht5j4v5u></div><div class="field" data-astro-cid-ht5j4v5u><label for="bk-phone" data-astro-cid-ht5j4v5u>Nomor telepon</label><input id="bk-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="081234567890" required maxlength="30" data-astro-cid-ht5j4v5u></div><div class="field" data-astro-cid-ht5j4v5u><label for="bk-qty" data-astro-cid-ht5j4v5u>Jumlah slot</label><div class="qty-control" data-astro-cid-ht5j4v5u><button type="button" data-step="-1" aria-label="Kurangi slot" data-astro-cid-ht5j4v5u>−</button><input id="bk-qty" name="quantity" type="number" min="1" max="20" value="1" data-astro-cid-ht5j4v5u><button type="button" data-step="1" aria-label="Tambah slot" data-astro-cid-ht5j4v5u>+</button></div><span class="micro" data-max-quantity data-astro-cid-ht5j4v5u></span></div><dl class="price-summary" data-astro-cid-ht5j4v5u><div data-astro-cid-ht5j4v5u><dt data-astro-cid-ht5j4v5u>Pembayaran</dt><dd data-astro-cid-ht5j4v5u>Midtrans</dd></div><div data-astro-cid-ht5j4v5u><dt data-astro-cid-ht5j4v5u>Harga / slot</dt><dd data-bind="unit-price" data-astro-cid-ht5j4v5u>–</dd></div><div class="total" data-astro-cid-ht5j4v5u><dt data-astro-cid-ht5j4v5u>Total</dt><dd data-bind="total" data-astro-cid-ht5j4v5u>–</dd></div></dl></aside></section><section class="step-content confirmation" data-step-panel="2" hidden data-astro-cid-ht5j4v5u><div class="confirm-section" data-astro-cid-ht5j4v5u><h3 data-astro-cid-ht5j4v5u>Event & sesi</h3><dl data-astro-cid-ht5j4v5u><div data-astro-cid-ht5j4v5u><dt data-astro-cid-ht5j4v5u>Event</dt><dd data-bind="event-name" data-astro-cid-ht5j4v5u></dd></div><div data-astro-cid-ht5j4v5u><dt data-astro-cid-ht5j4v5u>Studio</dt><dd data-bind="studio-name" data-astro-cid-ht5j4v5u></dd></div><div data-astro-cid-ht5j4v5u><dt data-astro-cid-ht5j4v5u>Tanggal</dt><dd data-bind="session-date" data-astro-cid-ht5j4v5u></dd></div><div data-astro-cid-ht5j4v5u><dt data-astro-cid-ht5j4v5u>Waktu</dt><dd data-bind="session-time" data-astro-cid-ht5j4v5u></dd></div></dl></div><div class="confirm-section" data-astro-cid-ht5j4v5u><h3 data-astro-cid-ht5j4v5u>Pemesan</h3><dl data-astro-cid-ht5j4v5u><div data-astro-cid-ht5j4v5u><dt data-astro-cid-ht5j4v5u>Nama</dt><dd data-bind="customer-name" data-astro-cid-ht5j4v5u></dd></div><div data-astro-cid-ht5j4v5u><dt data-astro-cid-ht5j4v5u>Email</dt><dd data-bind="customer-email" data-astro-cid-ht5j4v5u></dd></div><div data-astro-cid-ht5j4v5u><dt data-astro-cid-ht5j4v5u>Telepon</dt><dd data-bind="customer-phone" data-astro-cid-ht5j4v5u></dd></div></dl></div><div class="confirm-section" data-astro-cid-ht5j4v5u><h3 data-astro-cid-ht5j4v5u>Pembayaran</h3><dl data-astro-cid-ht5j4v5u><div data-astro-cid-ht5j4v5u><dt data-astro-cid-ht5j4v5u>Jumlah slot</dt><dd data-bind="quantity" data-astro-cid-ht5j4v5u></dd></div><div data-astro-cid-ht5j4v5u><dt data-astro-cid-ht5j4v5u>Harga / slot</dt><dd data-bind="confirm-unit-price" data-astro-cid-ht5j4v5u></dd></div><div class="total" data-astro-cid-ht5j4v5u><dt data-astro-cid-ht5j4v5u>Total</dt><dd data-bind="confirm-total" data-astro-cid-ht5j4v5u></dd></div></dl><p class="payment-note" data-astro-cid-ht5j4v5u>Slot ditahan sementara selama proses pembayaran. Pembayaran diverifikasi otomatis oleh Midtrans.</p></div></section><section class="success-panel" data-step-panel="3" hidden data-astro-cid-ht5j4v5u><div class="success-icon" aria-hidden="true" data-astro-cid-ht5j4v5u>✓</div><p class="eyebrow" data-astro-cid-ht5j4v5u>Booking berhasil dibuat</p><p class="micro" data-astro-cid-ht5j4v5u>Kode booking</p><strong class="booking-code" data-bind="booking-code" data-astro-cid-ht5j4v5u></strong><span class="booking-status" data-bind="payment-status" data-astro-cid-ht5j4v5u></span><p class="success-total" data-astro-cid-ht5j4v5u>Total <strong data-bind="success-total" data-astro-cid-ht5j4v5u></strong></p><p class="hold-message" data-bind="hold-message" data-astro-cid-ht5j4v5u></p><a class="payment-link" data-payment-link target="_blank" rel="noopener noreferrer" data-astro-cid-ht5j4v5u>Buka halaman pembayaran ↗</a></section><p class="form-error" role="alert" data-error hidden data-astro-cid-ht5j4v5u></p></form><footer class="modal-footer" data-astro-cid-ht5j4v5u><div class="footer-total" data-astro-cid-ht5j4v5u><span data-astro-cid-ht5j4v5u>Total</span><strong data-bind="footer-total" data-astro-cid-ht5j4v5u>Pilih sesi untuk melihat total.</strong></div><div class="footer-actions" data-astro-cid-ht5j4v5u><button type="button" class="secondary-button" data-action="cancel" data-astro-cid-ht5j4v5u>Batal</button><button type="button" class="secondary-button" data-action="back" hidden data-astro-cid-ht5j4v5u>Ubah sesi</button><button type="button" class="primary-button" data-action="next" disabled data-astro-cid-ht5j4v5u>Lanjut</button><button type="button" class="primary-button" data-action="confirm" hidden data-astro-cid-ht5j4v5u>Konfirmasi booking</button><button type="button" class="primary-button" data-action="done" hidden data-astro-cid-ht5j4v5u>Selesai</button></div></footer></div></dialog>${renderScript($$result, "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/components/booking/BookingModal.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/components/booking/BookingModal.astro", void 0);
//#endregion
//#region src/layouts/BaseLayout.astro
createAstro("https://caveofchi.example");
var $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$BaseLayout;
	const { title, description, ogImage = "/og-default.svg", headerVariant = "solid", noindex = false } = Astro.props;
	const canonical = Astro.site ? new URL(Astro.url.pathname, Astro.site) : null;
	const ogUrl = Astro.site ? new URL(ogImage, Astro.site) : null;
	return renderTemplate`<html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#f7f1ea"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400..700;1,400..700&family=DM+Sans:wght@400..700&display=swap" rel="stylesheet"><title>${title}</title><meta name="description"${addAttribute(description, "content")}>${canonical && renderTemplate`<link rel="canonical"${addAttribute(canonical, "href")}>`}<link rel="icon" type="image/svg+xml" href="/favicon.svg">${noindex && renderTemplate`<meta name="robots" content="noindex">`}<meta property="og:type" content="website"><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}>${canonical && renderTemplate`<meta property="og:url"${addAttribute(canonical, "content")}>`}${ogUrl && renderTemplate`<meta property="og:image"${addAttribute(ogUrl, "content")}>`}<meta name="twitter:card" content="summary_large_image">${renderSlot($$result, $$slots["head"])}${renderHead($$result)}</head><body><a class="skip-link" href="#main">Lewati ke konten</a><div class="grain" aria-hidden="true"></div>${renderComponent($$result, "AnnouncementBar", $$AnnouncementBar, {})}${renderComponent($$result, "SiteHeader", $$SiteHeader, { "variant": headerVariant })}<main id="main">${renderSlot($$result, $$slots["default"])}</main>${renderComponent($$result, "SiteFooter", $$SiteFooter, {})}${renderComponent($$result, "BookingModal", $$BookingModal, {})}</body></html>`;
}, "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/layouts/BaseLayout.astro", void 0);
//#endregion
export { renderScript as i, SITE as n, getCategoryLabel as r, $$BaseLayout as t };
