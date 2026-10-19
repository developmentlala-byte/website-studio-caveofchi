import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { A as renderTemplate, N as addAttribute, T as Fragment, j as maybeRenderHead, w as renderComponent, z as unescapeHTML } from "./sequence_9PrHO--S.mjs";
import { d as createComponent, u as createAstro } from "./_astro_assets_h7Pf3sRe.mjs";
import { r as getCategoryLabel, t as $$BaseLayout } from "./BaseLayout_CQ5aQ8le.mjs";
import { t as $$Gallery } from "./Gallery_BiULGSdl.mjs";
import { a as formatIDR, c as formatTime, i as formatDuration, n as formatDateShort, s as formatSeatsLeft } from "./format_B1FcpEGF.mjs";
import { t as $$BookButton } from "./BookButton_CSaFJpDG.mjs";
import { t as getEventBySlug } from "./events_BqFhjy72.mjs";
//#region src/pages/experiences/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://caveofchi.example");
var $$Slug = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slug;
	const event = await getEventBySlug(Astro.params.slug ?? "");
	if (!event) Astro.response.status = 404;
	const data = event?.data;
	const sessions = data ? data.sessions.length > 0 ? data.sessions : [{
		sessionId: data.eventId,
		startsAt: data.startsAt,
		durationMinutes: data.durationMinutes,
		price: data.price,
		capacity: data.capacity,
		seatsLeft: data.seatsLeft,
		space: data.space,
		studioName: data.studioName
	}] : [];
	const gallery = data ? [...data.imageUrl ? [{
		url: data.imageUrl,
		altText: `Suasana ${data.title}`
	}] : [], ...data.images].filter((image, index, images) => images.findIndex((candidate) => candidate.url === image.url) === index) : [];
	const isPast = data ? data.startsAt.getTime() < Date.now() : false;
	const endsAt = data ? new Date(data.startsAt.getTime() + data.durationMinutes * 6e4) : null;
	const jsonLd = data && endsAt ? JSON.stringify({
		"@context": "https://schema.org",
		"@type": "Event",
		name: data.title,
		description: data.subtitle,
		startDate: data.startsAt.toISOString(),
		endDate: endsAt.toISOString(),
		eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
		location: {
			"@type": "Place",
			name: data.studioName
		},
		offers: {
			"@type": "Offer",
			price: data.price,
			priceCurrency: "IDR"
		}
	}).replace(/</g, "\\u003c") : null;
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": data ? `${data.title} — Cave of Chi` : "Event tidak ditemukan — Cave of Chi",
		"description": data?.subtitle ?? "Event tidak ditemukan.",
		"data-astro-cid-5cf5d5us": true
	}, { "default": ($$result) => renderTemplate`${data && event ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "slot": "head" }, { "default": ($$result) => renderTemplate`${jsonLd && renderTemplate`<script type="application/ld+json">${unescapeHTML(jsonLd)}<\/script>`}` })}${maybeRenderHead($$result)}<article class="detail section container" data-astro-cid-5cf5d5us><a class="back-link" href="/experiences" data-astro-cid-5cf5d5us>← Semua experiences</a><div class="eyebrow" data-astro-cid-5cf5d5us>${getCategoryLabel(data.category)}</div><h1 class="heading" data-astro-cid-5cf5d5us>${data.title}</h1><p class="lead" data-astro-cid-5cf5d5us>${data.subtitle}</p>${renderComponent($$result, "Gallery", $$Gallery, {
		"images": gallery,
		"label": data.title,
		"data-astro-cid-5cf5d5us": true
	})}<dl class="facts" data-astro-cid-5cf5d5us><div data-astro-cid-5cf5d5us><dt data-astro-cid-5cf5d5us>Jadwal</dt><dd data-astro-cid-5cf5d5us>${sessions.length} sesi</dd></div><div data-astro-cid-5cf5d5us><dt data-astro-cid-5cf5d5us>Durasi</dt><dd data-astro-cid-5cf5d5us>${formatDuration(data.durationMinutes)}</dd></div><div data-astro-cid-5cf5d5us><dt data-astro-cid-5cf5d5us>Tempat</dt><dd data-astro-cid-5cf5d5us>${data.studioName}</dd></div><div data-astro-cid-5cf5d5us><dt data-astro-cid-5cf5d5us>Mulai dari</dt><dd data-astro-cid-5cf5d5us>${formatIDR(Math.min(...sessions.map((session) => session.price)))}</dd></div></dl>${data.description?.split("\n\n").map((paragraph) => renderTemplate`<p class="description" data-astro-cid-5cf5d5us>${paragraph}</p>`)}${data.included.length > 0 && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<h2 data-astro-cid-5cf5d5us>Sudah termasuk</h2><ul data-astro-cid-5cf5d5us>${data.included.map((item) => renderTemplate`<li data-astro-cid-5cf5d5us>${item}</li>`)}</ul>` })}`}<h2 data-astro-cid-5cf5d5us>Jadwal &amp; ketersediaan</h2><div class="detail-sessions" data-astro-cid-5cf5d5us>${sessions.map((session) => renderTemplate`<div class="detail-session" data-astro-cid-5cf5d5us><div class="session-info" data-astro-cid-5cf5d5us><strong data-astro-cid-5cf5d5us>${formatDateShort(session.startsAt)} · ${formatTime(session.startsAt)} WIB</strong><small data-astro-cid-5cf5d5us>${session.studioName} · ${formatDuration(session.durationMinutes)} · <span${addAttribute(session.sessionId, "data-seats-left")} data-astro-cid-5cf5d5us>${formatSeatsLeft(session.seatsLeft)}</span></small></div><div class="session-offer" data-astro-cid-5cf5d5us><strong data-astro-cid-5cf5d5us>${formatIDR(session.price)}</strong>${isPast ? renderTemplate`<span class="micro" data-astro-cid-5cf5d5us>Event ini sudah berlangsung.</span>` : renderTemplate`${renderComponent($$result, "BookButton", $$BookButton, {
		"event": event,
		"session": session,
		"data-astro-cid-5cf5d5us": true
	}, { "default": ($$result) => renderTemplate`Pesan ↗` })}`}</div></div>`)}</div></article>` })}` : renderTemplate`<section class="detail section container" data-astro-cid-5cf5d5us><h1 class="heading" data-astro-cid-5cf5d5us>Event tidak ditemukan</h1><p class="lead" data-astro-cid-5cf5d5us>Event ini mungkin sudah tidak tersedia.</p><a class="back-link" href="/experiences" data-astro-cid-5cf5d5us>← Semua experiences</a></section>`}` })}`;
}, "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/pages/experiences/[slug].astro", void 0);
var $$file = "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/pages/experiences/[slug].astro";
var $$url = "/experiences/[slug]";
//#endregion
//#region \0virtual:astro:page:src/pages/experiences/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };
