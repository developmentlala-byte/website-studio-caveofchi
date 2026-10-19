import { dt as defineMiddleware, t as sequence } from "./chunks/sequence_9PrHO--S.mjs";
//#region src/middleware.ts
var onRequest$1 = defineMiddleware(async (_context, next) => {
	const response = await next();
	response.headers.set("Cache-Control", "no-store");
	return response;
});
//#endregion
//#region \0virtual:astro:middleware
var onRequest = sequence(onRequest$1);
//#endregion
export { onRequest };
