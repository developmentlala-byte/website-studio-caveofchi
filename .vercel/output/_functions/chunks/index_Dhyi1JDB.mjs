import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { A as renderTemplate, N as addAttribute, T as Fragment, j as maybeRenderHead, w as renderComponent, z as unescapeHTML } from "./sequence_9PrHO--S.mjs";
import { d as createComponent, u as createAstro } from "./_astro_assets_h7Pf3sRe.mjs";
import { i as renderScript, n as SITE, t as $$BaseLayout } from "./BaseLayout_CQ5aQ8le.mjs";
import { n as $$Intro, r as $$CommunityBand, t as $$RitualBand } from "./RitualBand_Byl9kEH2.mjs";
import { a as formatIDR, c as formatTime, l as formatWeekday, o as formatMonthRange, r as formatDayNumber, s as formatSeatsLeft, t as dayKey } from "./format_B1FcpEGF.mjs";
import { t as $$BookButton } from "./BookButton_CSaFJpDG.mjs";
import { n as getUpcomingEvents } from "./events_BqFhjy72.mjs";
import { t as $$ExperiencesSection } from "./ExperiencesSection_BSNsBmh0.mjs";
import { t as fetchStudios } from "./studios_DCfuFo0V.mjs";
//#region src/components/home/FaqSection.astro
var $$FaqSection = createComponent(($$result, $$props, $$slots) => {
	const FAQS = [
		{
			q: "Apakah pemula boleh ikut kelas?",
			a: "Tentu. Mayoritas workshop dirancang ramah pemula. Fasilitator akan membimbing langkah demi langkah."
		},
		{
			q: "Apa yang sudah termasuk di harga kelas?",
			a: "Harga sudah mencakup material, pendampingan fasilitator, dan minuman hangat selama sesi. Detail tiap kelas bisa dilihat di halaman experiences."
		},
		{
			q: "Bolehkah membuat private class?",
			a: "Bisa. Untuk kelompok kecil, ulang tahun, atau acara tim, kamu bisa request private class dan kami akan membantu mengatur jadwalnya."
		},
		{
			q: "Apakah pembayaran bisa dilakukan di website?",
			a: "Untuk versi demo ini, pembayaran belum aktif. Nantinya kamu bisa reserve dan membayar langsung lewat website."
		}
	];
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: FAQS.map((f) => ({
			"@type": "Question",
			name: f.q,
			acceptedAnswer: {
				"@type": "Answer",
				text: f.a
			}
		}))
	};
	return renderTemplate`${maybeRenderHead($$result)}<section class="faq section" id="faq" data-astro-cid-os3yafxb><div class="container faq-inner" data-astro-cid-os3yafxb><div class="faq-head" data-astro-cid-os3yafxb><div class="eyebrow" data-astro-cid-os3yafxb>Before your first visit</div><h2 class="heading" data-astro-cid-os3yafxb>A few<br data-astro-cid-os3yafxb><em class="script-cstt-color" data-astro-cid-os3yafxb>good things</em><br data-astro-cid-os3yafxb>to know.</h2></div><div class="faq-list" data-astro-cid-os3yafxb>${FAQS.map((f, i) => renderTemplate`<details name="faq"${addAttribute(i === 0, "open")} data-astro-cid-os3yafxb><summary data-astro-cid-os3yafxb><span data-astro-cid-os3yafxb>${f.q}</span><span class="faq-icon" aria-hidden="true" data-astro-cid-os3yafxb></span></summary><p data-astro-cid-os3yafxb>${f.a}</p></details>`)}</div></div><script type="application/ld+json">${unescapeHTML(JSON.stringify(jsonLd))}<\/script></section>`;
}, "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/components/home/FaqSection.astro", void 0);
//#endregion
//#region src/components/home/Hero.astro
createAstro("https://caveofchi.example");
var $$Hero = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Hero;
	const { studios } = Astro.props;
	const studiosWithImages = studios.filter((studio) => studio.coverImageUrl !== null);
	const primaryStudio = studiosWithImages[0];
	const asideStudio = studiosWithImages[1] ?? primaryStudio;
	const studioNames = studios.map((studio) => studio.name).join(" • ");
	return renderTemplate`${maybeRenderHead($$result)}<section class="hero" aria-label="Selamat datang di Cave of Chi" data-astro-cid-i3irphx7><div class="hero-media" data-astro-cid-i3irphx7><div class="hero-primary" data-astro-cid-i3irphx7>${primaryStudio && renderTemplate`<img${addAttribute(primaryStudio.coverImageUrl, "src")}${addAttribute(`Interior ${primaryStudio.name}`, "alt")} width="1280" height="800" loading="eager" fetchpriority="high" data-astro-cid-i3irphx7>`}</div><div class="hero-aside" data-astro-cid-i3irphx7>${asideStudio && renderTemplate`<img${addAttribute(asideStudio.coverImageUrl, "src")}${addAttribute(`Interior ${asideStudio.name}`, "alt")} width="720" height="800" loading="eager" data-astro-cid-i3irphx7>`}</div></div><div class="hero-content" data-astro-cid-i3irphx7><div class="hero-copy" data-astro-cid-i3irphx7><div class="eyebrow hero-kicker" data-astro-cid-i3irphx7>A creative social sanctuary</div><h1 data-astro-cid-i3irphx7>Cave<br data-astro-cid-i3irphx7><em data-astro-cid-i3irphx7>of Chi.</em></h1><p data-astro-cid-i3irphx7>A space to make, to feel, and to belong. Temukan jeda dari rutinitas, lewat karya, ritual, dan koneksi yang bermakna.</p><a class="cta-light" href="/experiences" data-book data-astro-cid-i3irphx7>Explore our experiences <span aria-hidden="true" data-astro-cid-i3irphx7>↗</span></a></div><div class="hero-aside-label" aria-hidden="true" data-astro-cid-i3irphx7>The art of being present</div><div class="hero-bottom" aria-hidden="true" data-astro-cid-i3irphx7><span class="scroll-indicator" data-astro-cid-i3irphx7>Scroll to discover</span>${studioNames && renderTemplate`<span data-astro-cid-i3irphx7>${studioNames}</span>`}</div></div></section>`;
}, "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/components/home/Hero.astro", void 0);
//#endregion
//#region src/components/home/StudiosShowcase.astro
createAstro("https://caveofchi.example");
var $$StudiosShowcase = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$StudiosShowcase;
	const { studios } = Astro.props;
	const showcaseStudios = studios.map((studio) => {
		return {
			...studio,
			ribbon: studio.code,
			eyebrow: `Kapasitas ${studio.maxCapacity} orang`,
			alt: `Interior ${studio.name}`,
			text: studio.shortDescription || studio.description || ""
		};
	});
	const studioCount = showcaseStudios.length;
	const studioCountWord = [
		"Zero",
		"One",
		"Two",
		"Three",
		"Four",
		"Five",
		"Six",
		"Seven",
		"Eight",
		"Nine",
		"Ten"
	][studioCount] ?? String(studioCount);
	return renderTemplate`${maybeRenderHead($$result)}<section class="studios" id="spaces" data-astro-cid-o4wqqta3><div class="container" data-astro-cid-o4wqqta3><div class="section-head" data-astro-cid-o4wqqta3><div data-astro-cid-o4wqqta3><div class="eyebrow" data-astro-cid-o4wqqta3>${String(studioCount).padStart(2, "0")} / Meet our ${studioCount === 1 ? "space" : "spaces"}</div><h2 class="heading" data-astro-cid-o4wqqta3>${studioCountWord} ${studioCount === 1 ? "cave" : "caves"}.<br data-astro-cid-o4wqqta3><em class="script" data-astro-cid-o4wqqta3>${studioCountWord} energies.</em></h2></div><p data-astro-cid-o4wqqta3>${studioCount === 1 ? "Satu ruang intim untuk hadir, berkarya, dan terhubung sepenuhnya." : "Setiap ruang punya karakter berbeda, dengan niat yang sama: menciptakan tempat untuk hadir seutuhnya."}</p></div><div class="studio-grid" data-astro-cid-o4wqqta3>${showcaseStudios.map((s) => renderTemplate`<article class="studio-card" data-astro-cid-o4wqqta3>${s.coverImageUrl && renderTemplate`<img${addAttribute(s.coverImageUrl, "src")}${addAttribute(s.alt, "alt")} width="960" height="640" loading="lazy" data-astro-cid-o4wqqta3>`}<div class="studio-ribbon" data-astro-cid-o4wqqta3>${s.ribbon}</div><div class="studio-card-content" data-astro-cid-o4wqqta3><div data-astro-cid-o4wqqta3><div class="eyebrow" data-astro-cid-o4wqqta3>${s.eyebrow}</div><h3 data-astro-cid-o4wqqta3><a${addAttribute(`/studios/${s.slug}`, "href")} data-astro-cid-o4wqqta3>${s.name}</a></h3><p data-astro-cid-o4wqqta3>${s.text}</p></div><a class="circle-arrow"${addAttribute(`/studios/${s.slug}`, "href")}${addAttribute(`Lihat detail ${s.name}`, "aria-label")} data-astro-cid-o4wqqta3>↗</a></div></article>`)}</div>${studioCount === 0 && renderTemplate`<p class="empty-studios" data-astro-cid-o4wqqta3>Studio belum tersedia saat ini.</p>`}</div></section>`;
}, "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/components/home/StudiosShowcase.astro", void 0);
//#endregion
//#region src/components/home/UpcomingSchedule.astro
createAstro("https://caveofchi.example");
var $$UpcomingSchedule = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$UpcomingSchedule;
	const { events } = Astro.props;
	const grouped = /* @__PURE__ */ new Map();
	for (const event of events) {
		const sessions = event.data.sessions.length > 0 ? event.data.sessions : [{
			startsAt: event.data.startsAt,
			sessionId: event.data.eventId,
			durationMinutes: event.data.durationMinutes,
			title: event.data.title,
			price: event.data.price,
			capacity: event.data.capacity,
			seatsLeft: event.data.seatsLeft,
			space: event.data.space,
			studioName: event.data.studioName
		}];
		for (const session of sessions) {
			const date = session.startsAt;
			const key = dayKey(date);
			let day = grouped.get(key);
			if (!day) {
				day = {
					id: `day-${key}`,
					date,
					dow: formatWeekday(date),
					day: formatDayNumber(date),
					sessions: []
				};
				grouped.set(key, day);
			}
			day.sessions.push({
				time: `${formatTime(date)} WIB`,
				title: event.data.title,
				cave: session.studioName,
				price: formatIDR(session.price),
				event,
				session
			});
		}
	}
	const DAYS = [...grouped.values()];
	const monthRange = DAYS.length > 0 ? formatMonthRange(DAYS[0].date, DAYS[DAYS.length - 1].date) : "Jadwal mendatang";
	return renderTemplate`${maybeRenderHead($$result)}<section class="schedule section" id="schedule" data-astro-cid-wbgmfqwu><div class="container schedule-inner" data-astro-cid-wbgmfqwu><div class="schedule-copy" data-astro-cid-wbgmfqwu><div class="eyebrow" data-astro-cid-wbgmfqwu>04 / Upcoming gatherings</div><h2 class="heading" data-astro-cid-wbgmfqwu>Save your<br data-astro-cid-wbgmfqwu><em class="script" data-astro-cid-wbgmfqwu>seat.</em></h2><p data-astro-cid-wbgmfqwu>Setiap pertemuan dibuat kecil dan personal. Pilih tanggal yang sesuai, lalu kelas yang ingin kamu coba.</p><span class="tag" data-astro-cid-wbgmfqwu><span class="dot" data-astro-cid-wbgmfqwu></span> Kapasitas mengikuti ketersediaan setiap sesi</span></div><div class="calendar" data-calendar data-astro-cid-wbgmfqwu><div class="calendar-head" data-astro-cid-wbgmfqwu><h3 data-astro-cid-wbgmfqwu>${monthRange}</h3><span data-astro-cid-wbgmfqwu>Jadwal API</span></div>${DAYS.length > 0 ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<div class="calendar-days" role="tablist" aria-label="Pilih tanggal" data-astro-cid-wbgmfqwu>${DAYS.map((d, i) => renderTemplate`<button type="button" role="tab" class="day"${addAttribute(`tab-${d.id}`, "id")}${addAttribute(`panel-${d.id}`, "aria-controls")}${addAttribute(i === 0 ? "true" : "false", "aria-selected")}${addAttribute(i === 0 ? 0 : -1, "tabindex")} data-astro-cid-wbgmfqwu><small data-astro-cid-wbgmfqwu>${d.dow}</small><strong data-astro-cid-wbgmfqwu>${d.day}</strong></button>`)}</div>${DAYS.map((d, i) => renderTemplate`<div role="tabpanel" class="sessions"${addAttribute(`panel-${d.id}`, "id")}${addAttribute(`tab-${d.id}`, "aria-labelledby")}${addAttribute(i !== 0, "hidden")} data-astro-cid-wbgmfqwu>${d.sessions.map((s) => renderTemplate`<div class="session" data-astro-cid-wbgmfqwu><span class="time" data-astro-cid-wbgmfqwu>${s.time}</span><div class="info" data-astro-cid-wbgmfqwu><strong data-astro-cid-wbgmfqwu>${s.title}</strong><small data-astro-cid-wbgmfqwu>${s.cave} · ${s.price} · <span${addAttribute(s.session.sessionId, "data-seats-left")} data-astro-cid-wbgmfqwu>${formatSeatsLeft(s.session.seatsLeft)}</span></small></div>${renderComponent($$result, "BookButton", $$BookButton, {
		"event": s.event,
		"session": s.session,
		"variant": "outline",
		"data-astro-cid-wbgmfqwu": true
	}, { "default": ($$result) => renderTemplate`Book ↗` })}</div>`)}</div>`)}` })}` : renderTemplate`<p class="empty" data-astro-cid-wbgmfqwu>Belum ada sesi publik mendatang dari sistem.</p>`}</div></div></section>${renderScript($$result, "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/components/home/UpcomingSchedule.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/components/home/UpcomingSchedule.astro", void 0);
//#endregion
//#region src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const [events, studios] = await Promise.all([getUpcomingEvents(), fetchStudios()]);
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": "Cave of Chi — Art. Space. Energy.",
		"description": SITE.description,
		"headerVariant": "overlay"
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Hero", $$Hero, { "studios": studios })}${renderComponent($$result, "Intro", $$Intro, {})}${renderComponent($$result, "StudiosShowcase", $$StudiosShowcase, { "studios": studios })}${renderComponent($$result, "ExperiencesSection", $$ExperiencesSection, {
		"events": events,
		"studios": studios,
		"showAllLink": true
	})}${renderComponent($$result, "UpcomingSchedule", $$UpcomingSchedule, { "events": events })}${renderComponent($$result, "RitualBand", $$RitualBand, {})}${renderComponent($$result, "CommunityBand", $$CommunityBand, {})}${renderComponent($$result, "FaqSection", $$FaqSection, {})}` })}`;
}, "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/pages/index.astro", void 0);
var $$file = "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/pages/index.astro";
//#endregion
//#region \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };
