const API_URL = import.meta.env.PUBLIC_API_URL?.replace(/\/+$/, "");

export async function fetchPublicCollection(
  resource: string,
  options: { cache?: RequestCache } = {},
): Promise<unknown[]> {
  if (!API_URL) {
    throw new Error("PUBLIC_API_URL wajib diisi untuk mengambil data publik.");
  }

  const results: unknown[] = [];
  let page = 1;
  let lastPage = 1;

  do {
    const url = new URL(`${API_URL}/public/${resource}`);
    url.searchParams.set("page", String(page));
    url.searchParams.set("per_page", "100");

    const headers = new Headers({ Accept: "application/json" });
    if (url.hostname.endsWith(".ngrok-free.dev")) {
      headers.set("ngrok-skip-browser-warning", "true");
    }

    const response = await fetch(url, {
      headers,
      cache: options.cache,
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      throw new Error(
        `[api/${resource}] Request failed with HTTP ${response.status} ${response.statusText}.`,
      );
    }

    const payload: unknown = await response.json();
    if (
      typeof payload !== "object" ||
      payload === null ||
      !("success" in payload) ||
      payload.success !== true ||
      !("data" in payload) ||
      !Array.isArray(payload.data) ||
      !("meta" in payload) ||
      typeof payload.meta !== "object" ||
      payload.meta === null ||
      !("last_page" in payload.meta) ||
      typeof payload.meta.last_page !== "number" ||
      !Number.isInteger(payload.meta.last_page) ||
      payload.meta.last_page < 1
    ) {
      throw new Error(`[api/${resource}] API returned an invalid paginated response.`);
    }

    results.push(...payload.data);
    lastPage = payload.meta.last_page;
    page += 1;

    if (lastPage > 100) {
      throw new Error(`[api/${resource}] API pagination exceeded the 100-page safety limit.`);
    }
  } while (page <= lastPage);

  return results;
}

export function resolvePublicAssetUrl(value: string | null): string | null {
  if (value === null) return null;
  if (!API_URL) {
    throw new Error("PUBLIC_API_URL wajib diisi untuk mengambil URL aset publik.");
  }

  const apiUrl = new URL(API_URL);
  const apiPath = apiUrl.pathname
    .replace(/\/+$/, "")
    .replace(/\/api$/, "");
  const url = new URL(value, `${apiUrl.origin}${apiPath}/`);
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error("URL aset dari API harus menggunakan HTTP atau HTTPS.");
  }

  const isLocalHost = ["localhost", "127.0.0.1", "::1"].includes(url.hostname);
  const isNgrokHost = url.hostname.endsWith(".ngrok-free.dev");
  if ((isLocalHost || isNgrokHost) && url.pathname.startsWith("/storage/")) {
    const assetPath =
      apiPath && url.pathname.startsWith(`${apiPath}/`)
        ? url.pathname.slice(apiPath.length)
        : url.pathname;
    return `/asset-proxy${assetPath}${url.search}`;
  }

  return url.toString();
}
