import { A as renderTemplate, D as renderSlot, N as addAttribute, j as maybeRenderHead } from "./sequence_9PrHO--S.mjs";
import { d as createComponent, u as createAstro } from "./_astro_assets_h7Pf3sRe.mjs";
import { c as formatTime, n as formatDateShort } from "./format_B1FcpEGF.mjs";
//#region src/components/booking/BookButton.astro
createAstro("https://caveofchi.example");
var $$BookButton = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$BookButton;
	const { event, variant = "solid", session } = Astro.props;
	const d = event.data;
	const sessionId = session?.sessionId ?? d.eventId;
	const startsAt = session?.startsAt ?? d.startsAt;
	const price = session?.price ?? d.price;
	const seatsLeft = session?.seatsLeft ?? d.seatsLeft;
	const soldOut = seatsLeft <= 0;
	const meta = `${session?.studioName ?? d.studioName} · ${formatDateShort(startsAt)} · ${formatTime(startsAt)} WIB`;
	return renderTemplate`${maybeRenderHead($$result)}<button type="button"${addAttribute(["book", variant], "class:list")} data-book${addAttribute(sessionId, "data-session-id")}${addAttribute(event.id, "data-event-slug")}${addAttribute(session?.space ?? d.space, "data-studio-slug")}${addAttribute(d.title, "data-title")}${addAttribute(meta, "data-meta")}${addAttribute(price, "data-price")}${addAttribute(seatsLeft, "data-seats")}${addAttribute(variant === "outline" ? "Book ↗" : "Reserve seat ↗", "data-available-label")}${addAttribute(soldOut, "disabled")} data-astro-cid-kl5t4fso>${soldOut ? "Kuota habis" : renderTemplate`${renderSlot($$result, $$slots["default"], renderTemplate`Reserve seat ↗`)}`}</button>`;
}, "C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/components/booking/BookButton.astro", void 0);
//#endregion
export { $$BookButton as t };
