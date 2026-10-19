import * as mod from "zod/v4";
//#region src/lib/api/public.ts
var API_URL$1 = "https://throwing-winnings-movable.ngrok-free.dev/api".replace(/\/+$/, "");
async function fetchPublicCollection(resource, options = {}) {
	if (!API_URL$1) throw new Error("PUBLIC_API_URL wajib diisi untuk mengambil data publik.");
	const results = [];
	let page = 1;
	let lastPage = 1;
	do {
		const url = new URL(`${API_URL$1}/public/${resource}`);
		url.searchParams.set("page", String(page));
		url.searchParams.set("per_page", "100");
		const headers = new Headers({ Accept: "application/json" });
		if (url.hostname.endsWith(".ngrok-free.dev")) headers.set("ngrok-skip-browser-warning", "true");
		const response = await fetch(url, {
			headers,
			cache: options.cache,
			signal: AbortSignal.timeout(1e4)
		});
		if (!response.ok) throw new Error(`[api/${resource}] Request failed with HTTP ${response.status} ${response.statusText}.`);
		const payload = await response.json();
		if (typeof payload !== "object" || payload === null || !("success" in payload) || payload.success !== true || !("data" in payload) || !Array.isArray(payload.data) || !("meta" in payload) || typeof payload.meta !== "object" || payload.meta === null || !("last_page" in payload.meta) || typeof payload.meta.last_page !== "number" || !Number.isInteger(payload.meta.last_page) || payload.meta.last_page < 1) throw new Error(`[api/${resource}] API returned an invalid paginated response.`);
		results.push(...payload.data);
		lastPage = payload.meta.last_page;
		page += 1;
		if (lastPage > 100) throw new Error(`[api/${resource}] API pagination exceeded the 100-page safety limit.`);
	} while (page <= lastPage);
	return results;
}
function resolvePublicAssetUrl(value) {
	if (value === null) return null;
	if (!API_URL$1) throw new Error("PUBLIC_API_URL wajib diisi untuk mengambil URL aset publik.");
	const apiOrigin = new URL(API_URL$1).origin;
	const url = new URL(value, `${apiOrigin}/`);
	if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error("URL aset dari API harus menggunakan HTTP atau HTTPS.");
	return url.toString();
}
//#endregion
//#region src/lib/api/events.ts
var API_URL = "https://throwing-winnings-movable.ngrok-free.dev/api".replace(/\/+$/, "");
function toEvent(value) {
	if (typeof value !== "object" || value === null || Array.isArray(value)) throw new Error("[events] Setiap event API harus berupa object.");
	const event = value;
	if (typeof event.slug !== "string" || event.slug.trim() === "") throw new Error("[events] Setiap event API harus memiliki slug.");
	const normalized = {
		...event,
		slug: event.slug
	};
	const images = event.images ?? [];
	if (!Array.isArray(images)) throw new Error("[events] Galeri gambar event API harus berupa array.");
	normalized.images = images.map((image) => {
		if (typeof image !== "object" || image === null || Array.isArray(image)) throw new Error("[events] Setiap gambar event API harus berupa object.");
		const item = image;
		if (typeof item.url !== "string" || item.alt_text !== null && typeof item.alt_text !== "string" || typeof item.sort_order !== "number") throw new Error("[events] Data galeri gambar event tidak sesuai kontrak.");
		return {
			url: resolvePublicAssetUrl(item.url) ?? item.url,
			altText: item.alt_text,
			sortOrder: item.sort_order
		};
	});
	if (event.imageUrl === null) delete normalized.imageUrl;
	else if (typeof event.imageUrl === "string") normalized.imageUrl = resolvePublicAssetUrl(event.imageUrl);
	else if ("imageUrl" in event) throw new Error("[events] URL gambar event dari API harus berupa string.");
	return {
		...normalized,
		slug: event.slug
	};
}
async function fetchEvents() {
	if (!API_URL) throw new Error("PUBLIC_API_URL wajib diisi. Event tidak akan dimuat dari data demo.");
	return (await fetchPublicCollection("events", { cache: "no-store" })).map(toEvent);
}
//#endregion
//#region src/lib/events.ts
var eventDataSchema = mod.object({
	eventId: mod.string(),
	slug: mod.string(),
	title: mod.string(),
	subtitle: mod.string(),
	description: mod.string().optional(),
	category: mod.enum([
		"creative",
		"wellness",
		"social"
	]).nullable().optional(),
	space: mod.string().min(1),
	studioName: mod.string().min(1),
	price: mod.number().int().nonnegative(),
	startsAt: mod.coerce.date(),
	durationMinutes: mod.number().int().positive(),
	capacity: mod.number().int().positive(),
	seatsLeft: mod.number().int().nonnegative(),
	imageUrl: mod.url({ protocol: /^https?$/ }).optional(),
	images: mod.array(mod.object({
		url: mod.url({ protocol: /^https?$/ }),
		altText: mod.string().nullable(),
		sortOrder: mod.number().int().nonnegative()
	})).default([]),
	included: mod.array(mod.string()).default([]),
	sessions: mod.array(mod.object({
		sessionId: mod.string(),
		startsAt: mod.coerce.date(),
		durationMinutes: mod.number().int().positive(),
		price: mod.number().int().nonnegative(),
		capacity: mod.number().int().positive(),
		seatsLeft: mod.number().int().nonnegative(),
		space: mod.string().min(1),
		studioName: mod.string().min(1)
	})).default([])
});
var byDate = (a, b) => a.data.startsAt.getTime() - b.data.startsAt.getTime();
async function getUpcomingEvents(limit) {
	const now = Date.now();
	const sorted = (await fetchEvents()).map((event) => {
		const data = eventDataSchema.parse(event);
		return {
			id: data.slug,
			data
		};
	}).filter((event) => event.data.startsAt.getTime() >= now).sort(byDate);
	return limit === void 0 ? sorted : sorted.slice(0, Math.max(0, limit));
}
async function getEventBySlug(slug) {
	return (await getUpcomingEvents()).find((event) => event.id === slug);
}
//#endregion
export { resolvePublicAssetUrl as i, getUpcomingEvents as n, fetchPublicCollection as r, getEventBySlug as t };
