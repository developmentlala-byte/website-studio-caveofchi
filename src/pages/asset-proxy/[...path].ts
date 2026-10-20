import type { APIRoute } from "astro";

const API_URL = import.meta.env.PUBLIC_API_URL?.replace(/\/+$/, "");

export const GET: APIRoute = async ({ params, request }) => {
  if (!API_URL || !params.path) {
    return new Response("Asset proxy is not configured.", { status: 500 });
  }

  const path = params.path.split("/");
  if (
    path[0] !== "storage" ||
    path.some((segment) => !segment || segment === "." || segment === "..")
  ) {
    return new Response("Invalid asset path.", { status: 400 });
  }

  const apiUrl = new URL(API_URL);
  const apiPath = apiUrl.pathname
    .replace(/\/+$/, "")
    .replace(/\/api$/, "");
  const target = new URL(apiUrl.origin);
  target.pathname = `${apiPath}/${path
    .map((segment) => encodeURIComponent(segment))
    .join("/")}`;
  target.search = new URL(request.url).search;

  const headers = new Headers();
  if (apiUrl.hostname.endsWith(".ngrok-free.dev")) {
    headers.set("ngrok-skip-browser-warning", "true");
  }

  let upstream: Response;
  try {
    upstream = await fetch(target, {
      headers,
      signal: AbortSignal.timeout(15_000),
    });
  } catch (error) {
    console.error("Public asset proxy request failed.", error);
    return new Response("Unable to load asset.", { status: 502 });
  }

  if (!upstream.ok || !upstream.body) {
    return new Response(null, { status: upstream.status || 502 });
  }

  const responseHeaders = new Headers({
    "cache-control": "public, max-age=3600, stale-while-revalidate=86400",
  });
  const contentType = upstream.headers.get("content-type");
  if (contentType) responseHeaders.set("content-type", contentType);

  return new Response(upstream.body, {
    status: upstream.status,
    headers: responseHeaders,
  });
};
