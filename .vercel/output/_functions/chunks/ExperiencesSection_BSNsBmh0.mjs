import { A as renderTemplate, N as addAttribute, T as Fragment, j as maybeRenderHead, w as renderComponent } from "./sequence_9PrHO--S.mjs";
import { d as createComponent, u as createAstro } from "./_astro_assets_h7Pf3sRe.mjs";
import { i as renderScript, r as getCategoryLabel } from "./BaseLayout_CQ5aQ8le.mjs";
import { a as formatIDR, c as formatTime, i as formatDuration, n as formatDateShort, s as formatSeatsLeft } from "./format_B1FcpEGF.mjs";
import { t as $$BookButton } from "./BookButton_CSaFJpDG.mjs";
//#region src/components/events/EventCard.astro
createAstro("https://caveofchi.example");
var $$EventCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$EventCard;
	const { event } = Astro.props;
	const d = event.data;
	const sessions = (d.sessions.length > 0 ? d.sessions : [{
		sessionId: d.eventId,
		startsAt: d.startsAt,
		space: d.space,
		price: d.price,
		capacity: d.capacity,
		seatsLeft: d.seatsLeft,
		durationMinutes: d.durationMinutes,
		studioName: d.studioName
	}]).filter((session) => session.startsAt.getTime() >= Date.now()).sort((a, b) => a.startsAt.getTime() - b.startsAt.getTime());
	const featuredSession = sessions.find((session) => session.seatsLeft > 0) ?? sessions[0];
	const sessionOptions = sessions.map((session) => ({
		sessionId: session.sessionId,
		startsAt: session.startsAt.toISOString(),
		durationMinutes: session.durationMinutes || d.durationMinutes,
		price: session.price,
		seatsLeft: session.seatsLeft,
		studioSlug: session.space,
		studioName: session.studioName
	}));
	const prices = sessions.map((session) => session.price);
	const hasPriceRange = new Set(prices).size > 1;
	const displayPrice = hasPriceRange ? Math.min(...prices) : featuredSession?.price;
	const priceLabel = hasPriceRange ? "Starting from" : "Per peserta";
	return renderTemplate`${maybeRenderHead($$result)}<article class="event-card" data-event-card${addAttribute(event.id, "data-event-slug")}${addAttribute(d.title, "data-event-title")}${addAttribute(JSON.stringify(sessionOptions), "data-sessions")}${addAttribute(d.category ?? "uncategorized", "data-category")} data-astro-cid-5gqkqg5w><div class="event-image" data-astro-cid-5gqkqg5w>${d.imageUrl && renderTemplate`<img${addAttribute(d.imageUrl, "src")} alt="" width="640" height="474" loading="lazy" data-astro-cid-5gqkqg5w>`}<span class="event-category" data-astro-cid-5gqkqg5w>${getCategoryLabel(d.category)}</span></div><div class="event-info" data-astro-cid-5gqkqg5w><div class="event-sub" data-featured-studio data-astro-cid-5gqkqg5w>${featuredSession?.studioName ?? d.studioName}${featuredSession && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`&nbsp; • &nbsp;${formatDuration(featuredSession.durationMinutes || d.durationMinutes)}` })}`}</div><h3 data-astro-cid-5gqkqg5w><a${addAttribute(`/experiences/${event.id}`, "href")} data-astro-cid-5gqkqg5w>${d.title}</a></h3><div class="event-details" data-astro-cid-5gqkqg5w><span data-featured-date data-astro-cid-5gqkqg5w>${featuredSession ? `${formatDateShort(featuredSession.startsAt)} · ${formatTime(featuredSession.startsAt)} WIB` : "Jadwal segera hadir"}</span><span data-featured-seats data-astro-cid-5gqkqg5w>${featuredSession ? formatSeatsLeft(featuredSession.seatsLeft) : "Belum ada sesi tersedia"}</span></div><div class="event-footer" data-astro-cid-5gqkqg5w><div class="event-price" data-astro-cid-5gqkqg5w><small data-astro-cid-5gqkqg5w>${priceLabel}</small><span data-featured-price data-astro-cid-5gqkqg5w>${displayPrice !== void 0 ? formatIDR(displayPrice) : "–"}</span></div>${featuredSession ? renderTemplate`${renderComponent($$result, "BookButton", $$BookButton, {
		"event": event,
		"session": featuredSession,
		"data-astro-cid-5gqkqg5w": true
	}, { "default": ($$result) => renderTemplate`${featuredSession.seatsLeft > 0 ? "Reserve seat ↗" : "Kuota habis"}` })}` : renderTemplate`<button type="button" class="book unavailable" disabled data-astro-cid-5gqkqg5w>Belum tersedia</button>`}</div></div></article>`;
}, "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/components/events/EventCard.astro", void 0);
//#endregion
//#region src/components/events/EventBrowser.astro
createAstro("https://caveofchi.example");
var $$EventBrowser = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$EventBrowser;
	const { events, studios, showIntro = true } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div data-event-browser data-astro-cid-37anys3t>${showIntro && renderTemplate`<div class="section-head event-head" data-astro-cid-37anys3t><div class="event-head-main" data-astro-cid-37anys3t><div class="eyebrow" data-astro-cid-37anys3t>03 / Curated for curious souls</div><h2 class="heading" data-astro-cid-37anys3t>Find your <em class="script" data-astro-cid-37anys3t>ritual.</em></h2><p class="head-lead" data-astro-cid-37anys3t>Pilih sesuatu yang ingin kamu coba. Tak perlu punya pengalaman sebelumnya.</p></div><div class="head-badge" data-astro-cid-37anys3t><span class="head-badge-dot" aria-hidden="true" data-astro-cid-37anys3t></span>All workshops are beginner friendly</div></div>`}${events.length > 0 && studios.length > 0 && renderTemplate`<div class="filter-row studio-filter-row" role="group" aria-label="Filter studio" data-astro-cid-37anys3t><button type="button" class="filter active" data-studio-filter="all" aria-pressed="true" data-astro-cid-37anys3t>Semua studio</button>${studios.map((studio) => renderTemplate`<button type="button" class="filter"${addAttribute(studio.slug, "data-studio-filter")} aria-pressed="false" data-astro-cid-37anys3t>${studio.name}</button>`)}</div>`}<div class="event-grid" data-astro-cid-37anys3t>${events.map((event) => renderTemplate`${renderComponent($$result, "EventCard", $$EventCard, {
		"event": event,
		"data-astro-cid-37anys3t": true
	})}`)}</div><p class="empty-state" data-empty${addAttribute(events.length > 0, "hidden")} data-astro-cid-37anys3t>Belum ada event publik mendatang dari sistem.</p></div>${renderScript($$result, "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/components/events/EventBrowser.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/components/events/EventBrowser.astro", void 0);
//#endregion
//#region src/components/events/ExperiencesSection.astro
createAstro("https://caveofchi.example");
var $$ExperiencesSection = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ExperiencesSection;
	const { events, studios, showAllLink = false, showIntro = true } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<section class="section experiences" id="experiences" data-astro-cid-6yk2o5uf><div class="container" data-astro-cid-6yk2o5uf><!-- <div class="eyebrow">03 / Curated for curious souls</div> --><!-- <div class="section-head">
      <div>
        <h2 class="heading">Find your <em class="script">ritual.</em></h2>
        <p>Pilih sesuatu yang ingin kamu coba. Tak perlu punya pengalaman sebelumnya.</p>
      </div>
      <span class="tag"><span class="dot"></span> All workshops are beginner friendly</span>
    </div> -->${renderComponent($$result, "EventBrowser", $$EventBrowser, {
		"events": events,
		"studios": studios,
		"showIntro": showIntro,
		"data-astro-cid-6yk2o5uf": true
	})}${showAllLink && renderTemplate`<a class="see-all" href="/experiences" data-astro-cid-6yk2o5uf>Lihat semua experiences →</a>`}</div></section>`;
}, "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/components/events/ExperiencesSection.astro", void 0);
//#endregion
export { $$ExperiencesSection as t };
