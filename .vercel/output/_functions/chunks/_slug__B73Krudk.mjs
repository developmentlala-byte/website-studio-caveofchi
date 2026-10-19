import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { A as renderTemplate, N as addAttribute, j as maybeRenderHead, w as renderComponent } from "./sequence_9PrHO--S.mjs";
import { d as createComponent, u as createAstro } from "./_astro_assets_h7Pf3sRe.mjs";
import { t as $$BaseLayout } from "./BaseLayout_CQ5aQ8le.mjs";
import { t as $$Gallery } from "./Gallery_BiULGSdl.mjs";
import { c as formatTime, n as formatDateShort } from "./format_B1FcpEGF.mjs";
import { n as getUpcomingEvents } from "./events_BqFhjy72.mjs";
import { t as fetchStudios } from "./studios_DCfuFo0V.mjs";
//#region src/pages/studios/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://caveofchi.example");
var $$Slug = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slug;
	const studio = (await fetchStudios()).find((item) => item.slug === Astro.params.slug);
	if (!studio) Astro.response.status = 404;
	const studioEvents = (studio ? await getUpcomingEvents() : []).flatMap((event) => {
		const sessions = event.data.sessions.filter((session) => session.space === studio?.slug);
		return sessions.length > 0 ? [{
			event,
			sessions
		}] : [];
	});
	const gallery = [...studio?.coverImageUrl ? [{
		url: studio.coverImageUrl,
		altText: studio.name
	}] : [], ...studio?.images ?? []].filter((image, index, images) => images.findIndex((candidate) => candidate.url === image.url) === index);
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": studio ? `${studio.name} — Cave of Chi` : "Studio tidak ditemukan — Cave of Chi",
		"description": studio?.shortDescription ?? studio?.description ?? "Studio tidak ditemukan.",
		"data-astro-cid-emzxvc7c": true
	}, { "default": ($$result) => renderTemplate`${studio ? renderTemplate`${maybeRenderHead($$result)}<article class="studio-detail section container" data-astro-cid-emzxvc7c><a class="back-link" href="/#spaces" data-astro-cid-emzxvc7c>← Semua studio</a><div class="eyebrow" data-astro-cid-emzxvc7c>${studio.code} · Kapasitas ${studio.maxCapacity} orang</div><h1 class="heading" data-astro-cid-emzxvc7c>${studio.name}</h1>${studio.shortDescription && renderTemplate`<p class="lead" data-astro-cid-emzxvc7c>${studio.shortDescription}</p>`}${renderComponent($$result, "Gallery", $$Gallery, {
		"images": gallery,
		"label": studio.name,
		"data-astro-cid-emzxvc7c": true
	})}${studio.description && renderTemplate`<div class="description" data-astro-cid-emzxvc7c>${studio.description.split("\n\n").map((paragraph) => renderTemplate`<p data-astro-cid-emzxvc7c>${paragraph}</p>`)}</div>`}<dl class="facts" data-astro-cid-emzxvc7c><div data-astro-cid-emzxvc7c><dt data-astro-cid-emzxvc7c>Kode studio</dt><dd data-astro-cid-emzxvc7c>${studio.code}</dd></div><div data-astro-cid-emzxvc7c><dt data-astro-cid-emzxvc7c>Kapasitas</dt><dd data-astro-cid-emzxvc7c>${studio.maxCapacity} orang</dd></div></dl><section class="studio-events" aria-labelledby="studio-events-title" data-astro-cid-emzxvc7c><h2 id="studio-events-title" data-astro-cid-emzxvc7c>Event di ${studio.name}</h2>${studioEvents.length > 0 ? renderTemplate`<div class="event-list" data-astro-cid-emzxvc7c>${studioEvents.map(({ event, sessions }) => renderTemplate`<article class="event-item" data-astro-cid-emzxvc7c><div data-astro-cid-emzxvc7c><h3 data-astro-cid-emzxvc7c><a${addAttribute(`/experiences/${event.id}`, "href")} data-astro-cid-emzxvc7c>${event.data.title}</a></h3><p data-astro-cid-emzxvc7c>${event.data.subtitle}</p><ul data-astro-cid-emzxvc7c>${sessions.map((session) => renderTemplate`<li data-astro-cid-emzxvc7c>${formatDateShort(session.startsAt)} · ${formatTime(session.startsAt)} WIB</li>`)}</ul></div><a class="event-link"${addAttribute(`/experiences/${event.id}`, "href")}${addAttribute(`Lihat ${event.data.title}`, "aria-label")} data-astro-cid-emzxvc7c>↗</a></article>`)}</div>` : renderTemplate`<p class="empty-events" data-astro-cid-emzxvc7c>Belum ada event mendatang di studio ini.</p>`}</section></article>` : renderTemplate`<section class="studio-detail section container" data-astro-cid-emzxvc7c><h1 class="heading" data-astro-cid-emzxvc7c>Studio tidak ditemukan</h1><p class="lead" data-astro-cid-emzxvc7c>Studio ini mungkin sudah tidak tersedia.</p><a class="back-link" href="/#spaces" data-astro-cid-emzxvc7c>← Semua studio</a></section>`}` })}`;
}, "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/pages/studios/[slug].astro", void 0);
var $$file = "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/pages/studios/[slug].astro";
var $$url = "/studios/[slug]";
//#endregion
//#region \0virtual:astro:page:src/pages/studios/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };
