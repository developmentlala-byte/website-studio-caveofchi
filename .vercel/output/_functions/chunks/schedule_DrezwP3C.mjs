import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { A as renderTemplate, N as addAttribute, T as Fragment, j as maybeRenderHead, w as renderComponent } from "./sequence_9PrHO--S.mjs";
import { d as createComponent, u as createAstro } from "./_astro_assets_h7Pf3sRe.mjs";
import { i as renderScript, t as $$BaseLayout } from "./BaseLayout_CQ5aQ8le.mjs";
import { t as $$PageHeader } from "./PageHeader_Bx-smBXL.mjs";
import { a as formatIDR, c as formatTime, l as formatWeekday, o as formatMonthRange, r as formatDayNumber, s as formatSeatsLeft, t as dayKey } from "./format_B1FcpEGF.mjs";
import { t as $$BookButton } from "./BookButton_CSaFJpDG.mjs";
import { n as getUpcomingEvents } from "./events_BqFhjy72.mjs";
//#region src/components/schedule/ScheduleCalendar.astro
createAstro("https://caveofchi.example");
var $$ScheduleCalendar = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ScheduleCalendar;
	const { events } = Astro.props;
	const slots = events.flatMap((event) => {
		return (event.data.sessions.length > 0 ? event.data.sessions : [{
			sessionId: event.data.eventId,
			startsAt: event.data.startsAt,
			durationMinutes: event.data.durationMinutes,
			price: event.data.price,
			capacity: event.data.capacity,
			seatsLeft: event.data.seatsLeft,
			space: event.data.space,
			studioName: event.data.studioName
		}]).map((session) => ({
			event,
			session
		}));
	}).sort((a, b) => a.session.startsAt.getTime() - b.session.startsAt.getTime());
	const grouped = /* @__PURE__ */ new Map();
	for (const slot of slots) {
		const key = dayKey(slot.session.startsAt);
		const group = grouped.get(key);
		if (group) group.push(slot);
		else grouped.set(key, [slot]);
	}
	const days = [...grouped.entries()];
	const range = slots.length ? formatMonthRange(slots[0].session.startsAt, slots[slots.length - 1].session.startsAt) : "";
	return renderTemplate`${maybeRenderHead($$result)}<div class="calendar-card" data-schedule data-astro-cid-iobklc7f><div class="calendar-top" data-astro-cid-iobklc7f><strong data-astro-cid-iobklc7f>${range || "Jadwal"}</strong></div>${days.length === 0 ? renderTemplate`<p class="agenda-empty" data-astro-cid-iobklc7f>Belum ada kelas terjadwal.</p>` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<div class="calendar-pills" role="group" aria-label="Pilih tanggal kelas" data-astro-cid-iobklc7f>${days.map(([key, items], i) => renderTemplate`<button type="button"${addAttribute(["date-pill", { active: i === 0 }], "class:list")}${addAttribute(key, "data-date")}${addAttribute(i === 0 ? "true" : "false", "aria-pressed")} data-astro-cid-iobklc7f><small data-astro-cid-iobklc7f>${formatWeekday(items[0].session.startsAt)}</small><strong data-astro-cid-iobklc7f>${formatDayNumber(items[0].session.startsAt)}</strong></button>`)}</div>${days.map(([key, items], i) => renderTemplate`<div class="agenda"${addAttribute(key, "data-agenda")}${addAttribute(i !== 0, "hidden")} data-astro-cid-iobklc7f>${items.map(({ event, session }) => renderTemplate`<div class="agenda-item" data-astro-cid-iobklc7f><span class="time" data-astro-cid-iobklc7f>${formatTime(session.startsAt)} WIB</span><div data-astro-cid-iobklc7f><strong data-astro-cid-iobklc7f>${event.data.title}</strong><small data-astro-cid-iobklc7f>${session.studioName} · ${formatIDR(session.price)} · <span${addAttribute(session.sessionId, "data-seats-left")} data-astro-cid-iobklc7f>${formatSeatsLeft(session.seatsLeft)}</span></small></div><div class="agenda-action" data-astro-cid-iobklc7f>${renderComponent($$result, "BookButton", $$BookButton, {
		"event": event,
		"session": session,
		"variant": "outline",
		"data-astro-cid-iobklc7f": true
	}, { "default": ($$result) => renderTemplate`Book ↗` })}</div></div>`)}</div>`)}` })}`}</div>${renderScript($$result, "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/components/schedule/ScheduleCalendar.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/components/schedule/ScheduleCalendar.astro", void 0);
//#endregion
//#region src/pages/schedule.astro
var schedule_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Schedule,
	file: () => $$file,
	url: () => $$url
});
var $$Schedule = createComponent(async ($$result, $$props, $$slots) => {
	const events = await getUpcomingEvents();
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": "Schedule — Cave of Chi",
		"description": "Jadwal workshop dan ritual Cave of Chi."
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "PageHeader", $$PageHeader, {
		"eyebrow": "Upcoming gatherings",
		"title": "Save your seat.",
		"description": "Setiap pertemuan dibuat kecil dan personal. Pilih tanggal dan lihat kelas yang bisa kamu ikuti."
	})}${maybeRenderHead($$result)}<section class="section container">${renderComponent($$result, "ScheduleCalendar", $$ScheduleCalendar, { "events": events })}</section>` })}`;
}, "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/pages/schedule.astro", void 0);
var $$file = "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/pages/schedule.astro";
var $$url = "/schedule";
//#endregion
//#region \0virtual:astro:page:src/pages/schedule@_@astro
var page = () => schedule_exports;
//#endregion
export { page };
