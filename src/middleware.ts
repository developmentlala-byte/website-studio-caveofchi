import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (_, next) => {
  const response = await next();
  response.headers.set("Cache-Control", "no-store");

  return response;
});
