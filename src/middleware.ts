import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const localeMatch = context.url.pathname.match(/^\/en(?=\/|$)/);
  const locale = localeMatch ? "en" : "id";
  context.locals.locale = locale;
  context.locals.localePath = `${context.url.pathname}${context.url.search}`;

  if (locale === "en") {
    const path = context.url.pathname.replace(/^\/en(?=\/|$)/, "") || "/";
    const target = new URL(`${path}${context.url.search}`, context.url);
    const response = await next(target);
    response.headers.set("Cache-Control", "no-store");

    return response;
  }

  const response = await next();
  response.headers.set("Cache-Control", "no-store");

  return response;
});
