import { i as resolvePublicAssetUrl, r as fetchPublicCollection } from "./events_BqFhjy72.mjs";
//#region src/lib/api/studios.ts
var API_URL = "https://throwing-winnings-movable.ngrok-free.dev/api".replace(/\/+$/, "");
function toStudio(value) {
	if (typeof value !== "object" || value === null || Array.isArray(value)) throw new Error("[studios] Setiap studio API harus berupa object.");
	const studio = value;
	const images = studio.images ?? [];
	if (typeof studio.id !== "number" || typeof studio.name !== "string" || studio.name.trim() === "" || typeof studio.slug !== "string" || studio.slug.trim() === "" || typeof studio.code !== "string" || studio.code.trim() === "" || studio.short_description !== null && typeof studio.short_description !== "string" || studio.description !== null && typeof studio.description !== "string" || studio.cover_image_url !== null && typeof studio.cover_image_url !== "string" || typeof studio.max_capacity !== "number" || !Array.isArray(images)) throw new Error("[studios] Respons API studio tidak sesuai kontrak.");
	const normalizedImages = images.map((image) => {
		if (typeof image !== "object" || image === null || Array.isArray(image)) throw new Error("[studios] Setiap gambar studio API harus berupa object.");
		const item = image;
		if (typeof item.url !== "string" || item.alt_text !== null && typeof item.alt_text !== "string" || typeof item.sort_order !== "number") throw new Error("[studios] Data galeri gambar studio tidak sesuai kontrak.");
		return {
			url: resolvePublicAssetUrl(item.url) ?? item.url,
			altText: item.alt_text,
			sortOrder: item.sort_order
		};
	});
	return {
		id: studio.id,
		name: studio.name,
		slug: studio.slug,
		code: studio.code,
		shortDescription: studio.short_description,
		description: studio.description,
		coverImageUrl: resolvePublicAssetUrl(studio.cover_image_url),
		images: normalizedImages,
		maxCapacity: studio.max_capacity
	};
}
async function fetchStudios() {
	if (!API_URL) throw new Error("PUBLIC_API_URL wajib diisi. Studio tidak akan dimuat dari data demo.");
	return (await fetchPublicCollection("studios", { cache: "no-store" })).map(toStudio);
}
//#endregion
export { fetchStudios as t };
