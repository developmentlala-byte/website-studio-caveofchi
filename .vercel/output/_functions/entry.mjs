import { A as ForbiddenRewrite, H as LocalsReassigned, S as ClientAddressNotAvailable, U as MiddlewareNoDataOrNextCalled, V as LocalsNotAnObject, W as MiddlewareNotAResponse, Z as NoManifestAvailable, b as AstroResponseHeadersReassigned, f as removeLeadingForwardSlash, g as stripRequestBase, ht as isAstroError, i as collapseDuplicateTrailingSlashes, l as joinPaths, lt as StaticClientAddressNotAvailable, m as removeTrailingForwardSlash, mt as AstroError, o as hasFileExtension, ot as ReservedSlotName, pt as i18nNoLocaleFoundInPath, r as collapseDuplicateSlashes, rt as PrerenderClientAddressNotAvailable, s as isInternalPath, st as ResponseSentError, t as appendForwardSlash, u as prependForwardSlash, v as ActionNotFoundError, x as CacheNotEnabled, y as ActionsReturnedInvalidDataError } from "./chunks/path_DAMKkdMr.mjs";
import { $ as normalizeThePath, B as renderEndpoint, C as renderJSX, E as chunkToString, F as isRenderInstruction, G as getCustom500Route, H as createManifestMemo, I as normalizeCspResourceEntry, J as isRoute3xx, K as getDefaultStatusCode, L as pushDirective, O as renderSlotToString, Q as normalizeTheLocale, S as renderPage, V as createAsyncManifestMemo, W as getCustom404Route, X as isRoute500, Y as isRoute404, Z as getErrorRoutePath, _ as DEFAULT_404_ROUTE, a as getRouteGenerator, at as STATUS_CODE_PAGES, b as readBodyWithLimit, c as getOriginPathname, ct as originPathnameSymbol, d as validateAndDecodePathname, dt as defineMiddleware, et as pathHasLocale, f as getLogger, ft as decodeKey, g as astroToRuntimeLogger, h as AstroIntegrationLogger, i as getRouteCache, it as REROUTABLE_STATUS_CODES, k as isRenderTemplateResult, l as setOriginPathname, lt as responseSentSymbol$1, n as getParams, nt as ASTRO_GENERATOR, o as getEnvironment, ot as clientAddressSymbol, p as getResolvedLogger, pt as generateCspDigest, q as routeHasHtmlExtension, r as getProps, rt as REDIRECT_STATUS_CODES, s as copyRequest, st as fetchStateSymbol, t as sequence, tt as ASTRO_ERROR_HEADER, u as MultiLevelEncodingError, ut as shouldAppendForwardSlash, v as SERVER_ISLAND_COMPONENT, y as BodySizeLimitError } from "./chunks/sequence_9PrHO--S.mjs";
import { n as matchPattern } from "./chunks/remote_Cuezg7Gg.mjs";
import { parse, stringify } from "devalue";
import colors from "piccolore";
import { parseCookie, stringifySetCookie } from "cookie";
import { escape } from "html-escaper";
//#endregion
//#region node_modules/.pnpm/@astrojs+vercel@11.0.15_ast_55bed0da02332a0def509b057158e94a/node_modules/@astrojs/vercel/dist/serverless/constants.js
/**
* The edge function calls the node server at /_render,
* with the original path as the value of this header.
*/
var ASTRO_PATH_HEADER = "x-astro-path";
var ASTRO_PATH_PARAM = "x_astro_path";
/**
* ISR functions receive the target path through the `x_astro_path` query
* parameter instead of a header. Because that parameter travels on the URL, it
* is accompanied by this token so the entrypoint can confirm the path override
* came from Astro's own build-time route rewrite rather than from an arbitrary
* caller. The value is the per-build `middlewareSecret`.
*/
var ASTRO_PATH_TOKEN_PARAM = "x_astro_path_token";
/**
* The edge function calls the node server at /_render,
* with the locals serialized into this header.
*/
var ASTRO_LOCALS_HEADER = "x-astro-locals";
var ASTRO_MIDDLEWARE_SECRET_HEADER = "x-astro-middleware-secret";
//#endregion
//#region \0virtual:astro-vercel:config
var middlewareSecret = "3a401fd7-93f6-4702-846a-74bbf4f9a941";
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/middleware/noop-middleware.js
var NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
	return await next();
};
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/app/manifest.js
function deserializeManifest(serializedManifest, routesList) {
	const routes = [];
	if (serializedManifest.routes) for (const serializedRoute of serializedManifest.routes) routes.push({
		...serializedRoute,
		routeData: deserializeRouteData(serializedRoute.routeData)
	});
	if (routesList) for (const route of routesList?.routes) routes.push({
		file: "",
		links: [],
		scripts: [],
		styles: [],
		routeData: route
	});
	const assets = new Set(serializedManifest.assets);
	const componentMetadata = new Map(serializedManifest.componentMetadata);
	const inlinedScripts = new Map(serializedManifest.inlinedScripts);
	const clientDirectives = new Map(serializedManifest.clientDirectives);
	const key = decodeKey(serializedManifest.key);
	return {
		middleware() {
			return { onRequest: NOOP_MIDDLEWARE_FN };
		},
		...serializedManifest,
		rootDir: new URL(serializedManifest.rootDir),
		srcDir: new URL(serializedManifest.srcDir),
		publicDir: new URL(serializedManifest.publicDir),
		outDir: new URL(serializedManifest.outDir),
		cacheDir: new URL(serializedManifest.cacheDir),
		buildClientDir: new URL(serializedManifest.buildClientDir),
		buildServerDir: new URL(serializedManifest.buildServerDir),
		assets,
		componentMetadata,
		inlinedScripts,
		clientDirectives,
		routes,
		key
	};
}
function deserializeRouteData(rawRouteData) {
	return {
		route: rawRouteData.route,
		type: rawRouteData.type,
		pattern: new RegExp(rawRouteData.pattern),
		params: rawRouteData.params,
		component: rawRouteData.component,
		pathname: rawRouteData.pathname || void 0,
		segments: rawRouteData.segments,
		prerender: rawRouteData.prerender,
		redirect: rawRouteData.redirect,
		redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
		fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
			return deserializeRouteData(fallback);
		}),
		isIndex: rawRouteData.isIndex,
		origin: rawRouteData.origin,
		distURL: rawRouteData.distURL
	};
}
function deserializeRouteInfo(rawRouteInfo) {
	return {
		styles: rawRouteInfo.styles,
		file: rawRouteInfo.file,
		links: rawRouteInfo.links,
		scripts: rawRouteInfo.scripts,
		routeData: deserializeRouteData(rawRouteInfo.routeData)
	};
}
//#endregion
//#region \0virtual:astro:renderers
var renderers = [];
[
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "page",
			"component": "_server-islands.astro",
			"params": ["name"],
			"segments": [[{
				"content": "_server-islands",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "name",
				"dynamic": true,
				"spread": false
			}]],
			"pattern": "^\\/_server-islands\\/([^/]+?)$",
			"prerender": false,
			"isIndex": false,
			"fallbackRoutes": [],
			"route": "/_server-islands/[name]",
			"origin": "internal",
			"distURL": [],
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/_image",
			"component": "node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/assets/endpoint/generic.js",
			"params": [],
			"pathname": "/_image",
			"pattern": "^\\/_image$",
			"segments": [[{
				"content": "_image",
				"dynamic": false,
				"spread": false
			}]],
			"type": "endpoint",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"isIndex": false,
			"origin": "internal",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/404",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/404$",
			"segments": [[{
				"content": "404",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/404.astro",
			"pathname": "/404",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/about",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/about$",
			"segments": [[{
				"content": "about",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/about.astro",
			"pathname": "/about",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/booking/after-payment",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/booking\\/after-payment$",
			"segments": [[{
				"content": "booking",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "after-payment",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/booking/after-payment.astro",
			"pathname": "/booking/after-payment",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/booking/status",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/booking\\/status$",
			"segments": [[{
				"content": "booking",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "status",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/booking/status.astro",
			"pathname": "/booking/status",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/experiences/[slug]",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/experiences\\/([^/]+?)$",
			"segments": [[{
				"content": "experiences",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "slug",
				"dynamic": true,
				"spread": false
			}]],
			"params": ["slug"],
			"component": "src/pages/experiences/[slug].astro",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/experiences",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/experiences$",
			"segments": [[{
				"content": "experiences",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/experiences/index.astro",
			"pathname": "/experiences",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/faq",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/faq$",
			"segments": [[{
				"content": "faq",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/faq.astro",
			"pathname": "/faq",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/robots.txt",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/robots\\.txt$",
			"segments": [[{
				"content": "robots.txt",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/robots.txt.ts",
			"pathname": "/robots.txt",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/schedule",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/schedule$",
			"segments": [[{
				"content": "schedule",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/schedule.astro",
			"pathname": "/schedule",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/sitemap-index.xml",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/sitemap-index\\.xml$",
			"segments": [[{
				"content": "sitemap-index.xml",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/sitemap-index.xml.ts",
			"pathname": "/sitemap-index.xml",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/sitemap.xml",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/sitemap\\.xml$",
			"segments": [[{
				"content": "sitemap.xml",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/sitemap.xml.ts",
			"pathname": "/sitemap.xml",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/studios/[slug]",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/studios\\/([^/]+?)$",
			"segments": [[{
				"content": "studios",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "slug",
				"dynamic": true,
				"spread": false
			}]],
			"params": ["slug"],
			"component": "src/pages/studios/[slug].astro",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/$",
			"segments": [],
			"params": [],
			"component": "src/pages/index.astro",
			"pathname": "/",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "never" }
		}
	}
].map(deserializeRouteInfo);
//#endregion
//#region \0virtual:astro:pages
var _page0 = () => import("./chunks/generic_BB6LIMQd.mjs");
var _page1 = () => import("./chunks/404_CQ1fIncQ.mjs");
var _page2 = () => import("./chunks/about_mmrSvcZT.mjs");
var _page3 = () => import("./chunks/after-payment_CKRha0gQ.mjs");
var _page4 = () => import("./chunks/status_BiZo8UAf.mjs");
var _page5 = () => import("./chunks/_slug__B557qNy3.mjs");
var _page6 = () => import("./chunks/index_B3HyPTDR.mjs");
var _page7 = () => import("./chunks/faq_D67wPEBD.mjs");
var _page8 = () => import("./chunks/robots_CEKbghLP.mjs");
var _page9 = () => import("./chunks/schedule_DrezwP3C.mjs");
var _page10 = () => import("./chunks/sitemap-index_Rs9cUXsj.mjs");
var _page11 = () => import("./chunks/sitemap_CGdGXWfW.mjs");
var _page12 = () => import("./chunks/_slug__B73Krudk.mjs");
var _page13 = () => import("./chunks/index_Dhyi1JDB.mjs");
var pageMap = /* @__PURE__ */ new Map([
	["node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
	["src/pages/404.astro", _page1],
	["src/pages/about.astro", _page2],
	["src/pages/booking/after-payment.astro", _page3],
	["src/pages/booking/status.astro", _page4],
	["src/pages/experiences/[slug].astro", _page5],
	["src/pages/experiences/index.astro", _page6],
	["src/pages/faq.astro", _page7],
	["src/pages/robots.txt.ts", _page8],
	["src/pages/schedule.astro", _page9],
	["src/pages/sitemap-index.xml.ts", _page10],
	["src/pages/sitemap.xml.ts", _page11],
	["src/pages/studios/[slug].astro", _page12],
	["src/pages/index.astro", _page13]
]);
//#endregion
//#region \0virtual:astro:manifest
var _manifest = deserializeManifest({"rootDir":"file:///C:/project-lala/BMS/mahalu.studio.management/WEBSITE/","cacheDir":"file:///C:/project-lala/BMS/mahalu.studio.management/WEBSITE/node_modules/.astro/","outDir":"file:///C:/project-lala/BMS/mahalu.studio.management/WEBSITE/dist/","srcDir":"file:///C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/","publicDir":"file:///C:/project-lala/BMS/mahalu.studio.management/WEBSITE/public/","buildClientDir":"file:///C:/project-lala/BMS/mahalu.studio.management/WEBSITE/dist/client/","buildServerDir":"file:///C:/project-lala/BMS/mahalu.studio.management/WEBSITE/dist/server/","adapterName":"@astrojs/vercel","assetsDir":"_astro","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","distURL":[],"_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/_image","component":"node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/assets/endpoint/generic.js","params":[],"pathname":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"type":"endpoint","prerender":false,"fallbackRoutes":[],"distURL":[],"isIndex":false,"origin":"internal","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.20QyAfUF.css"},{"type":"inline","content":".not-found[data-astro-cid-ibpinaeu]{min-height:55vh}.not-found[data-astro-cid-ibpinaeu] .heading[data-astro-cid-ibpinaeu]{margin:18px 0 30px}.not-found[data-astro-cid-ibpinaeu] a[data-astro-cid-ibpinaeu]{color:var(--umber);gap:14px;font-size:12px;display:inline-flex}\n"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.20QyAfUF.css"},{"type":"external","src":"_astro/RitualBand.B6DvGhl4.css"},{"type":"inline","content":".page-header[data-astro-cid-5gwfj4eg]{padding:var(--space-6) 0 var(--space-4);background:var(--paper-light)}.page-header[data-astro-cid-5gwfj4eg] .heading[data-astro-cid-5gwfj4eg]{margin:14px 0;font-size:clamp(56px,7vw,91px)}.lead[data-astro-cid-5gwfj4eg]{max-width:480px;color:var(--muted);font-size:14px;line-height:1.8}@media (width<=740px){.page-header[data-astro-cid-5gwfj4eg]{padding-top:var(--space-5)}}\n"}],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.20QyAfUF.css"},{"type":"inline","content":".booking-page[data-astro-cid-rbosskag]{min-height:60vh}.booking-page[data-astro-cid-rbosskag] .heading[data-astro-cid-rbosskag]{margin:12px 0}.lead[data-astro-cid-rbosskag]{max-width:650px;color:var(--muted);line-height:1.8}.booking-details[data-astro-cid-rbosskag]{border:1px solid var(--line);border-radius:var(--radius-md);grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin:30px 0;padding:20px;display:grid}.booking-details[data-astro-cid-rbosskag][hidden]{display:none}.booking-details[data-astro-cid-rbosskag] div[data-astro-cid-rbosskag]{min-width:0}.booking-details[data-astro-cid-rbosskag] dt[data-astro-cid-rbosskag]{color:var(--muted);margin-bottom:5px;font-size:10px}.booking-details[data-astro-cid-rbosskag] dd[data-astro-cid-rbosskag]{color:var(--umber);overflow-wrap:anywhere;margin:0;font-size:13px;font-weight:600}.status-actions[data-astro-cid-rbosskag]{flex-wrap:wrap;align-items:center;gap:16px;display:flex}.status-actions[data-astro-cid-rbosskag] button[data-astro-cid-rbosskag]{border-radius:var(--radius-sm);background:var(--umber);min-height:42px;color:var(--paper-light);cursor:pointer;border:0;padding:10px 16px}.status-actions[data-astro-cid-rbosskag] a[data-astro-cid-rbosskag]{color:var(--umber);font-size:12px}.status-actions[data-astro-cid-rbosskag] .receipt-link[data-astro-cid-rbosskag]{border-radius:var(--radius-sm);background:var(--umber);min-height:42px;color:var(--paper-light);align-items:center;padding:10px 16px;display:inline-flex}@media (width<=600px){.booking-details[data-astro-cid-rbosskag]{grid-template-columns:1fr;padding:16px}}\n"}],"routeData":{"route":"/booking/after-payment","isIndex":false,"type":"page","pattern":"^\\/booking\\/after-payment$","segments":[[{"content":"booking","dynamic":false,"spread":false}],[{"content":"after-payment","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/booking/after-payment.astro","pathname":"/booking/after-payment","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.20QyAfUF.css"},{"type":"inline","content":".booking-page[data-astro-cid-rbosskag]{min-height:60vh}.booking-page[data-astro-cid-rbosskag] .heading[data-astro-cid-rbosskag]{margin:12px 0}.lead[data-astro-cid-rbosskag]{max-width:650px;color:var(--muted);line-height:1.8}.booking-details[data-astro-cid-rbosskag]{border:1px solid var(--line);border-radius:var(--radius-md);grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin:30px 0;padding:20px;display:grid}.booking-details[data-astro-cid-rbosskag][hidden]{display:none}.booking-details[data-astro-cid-rbosskag] div[data-astro-cid-rbosskag]{min-width:0}.booking-details[data-astro-cid-rbosskag] dt[data-astro-cid-rbosskag]{color:var(--muted);margin-bottom:5px;font-size:10px}.booking-details[data-astro-cid-rbosskag] dd[data-astro-cid-rbosskag]{color:var(--umber);overflow-wrap:anywhere;margin:0;font-size:13px;font-weight:600}.status-actions[data-astro-cid-rbosskag]{flex-wrap:wrap;align-items:center;gap:16px;display:flex}.status-actions[data-astro-cid-rbosskag] button[data-astro-cid-rbosskag]{border-radius:var(--radius-sm);background:var(--umber);min-height:42px;color:var(--paper-light);cursor:pointer;border:0;padding:10px 16px}.status-actions[data-astro-cid-rbosskag] a[data-astro-cid-rbosskag]{color:var(--umber);font-size:12px}.status-actions[data-astro-cid-rbosskag] .receipt-link[data-astro-cid-rbosskag]{border-radius:var(--radius-sm);background:var(--umber);min-height:42px;color:var(--paper-light);align-items:center;padding:10px 16px;display:inline-flex}@media (width<=600px){.booking-details[data-astro-cid-rbosskag]{grid-template-columns:1fr;padding:16px}}\n"}],"routeData":{"route":"/booking/status","isIndex":false,"type":"page","pattern":"^\\/booking\\/status$","segments":[[{"content":"booking","dynamic":false,"spread":false}],[{"content":"status","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/booking/status.astro","pathname":"/booking/status","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".gallery[data-astro-cid-t4phoku3]{gap:10px;min-width:0;display:grid}.stage[data-astro-cid-t4phoku3]{aspect-ratio:var(--ratio,3 / 2);border-radius:var(--radius-md);background:var(--sand);touch-action:pan-y;position:relative;overflow:hidden}.stage-img[data-astro-cid-t4phoku3]{object-fit:cover;object-position:center;width:100%;height:100%;transition:opacity .22s;display:block}.stage-img[data-astro-cid-t4phoku3].is-changing{opacity:0}.nav[data-astro-cid-t4phoku3]{background:color-mix(in srgb, var(--paper-light) 92%, transparent);width:36px;height:36px;color:var(--umber);cursor:pointer;border:0;border-radius:50%;place-items:center;padding:0;transition:background .2s;display:grid;position:absolute;top:50%;transform:translateY(-50%)}.nav[data-astro-cid-t4phoku3]:hover{background:var(--paper-light)}.nav[data-astro-cid-t4phoku3]:focus-visible{outline:2px solid var(--paper-light);outline-offset:2px}.prev[data-astro-cid-t4phoku3]{left:12px}.next[data-astro-cid-t4phoku3]{right:12px}.count[data-astro-cid-t4phoku3]{background:color-mix(in srgb, var(--paper-light) 92%, transparent);color:var(--umber);font-size:var(--fs-label);font-weight:var(--fw-label);letter-spacing:.04em;font-variant-numeric:tabular-nums;border-radius:99px;padding:4px 10px;position:absolute;bottom:12px;left:12px}.thumbs[data-astro-cid-t4phoku3]{scroll-snap-type:x proximity;scrollbar-width:none;grid-auto-columns:minmax(64px,1fr);grid-auto-flow:column;gap:8px;margin:0;padding:0;list-style:none;display:grid;overflow-x:auto}.thumbs[data-astro-cid-t4phoku3]::-webkit-scrollbar{display:none}.thumb[data-astro-cid-t4phoku3]{aspect-ratio:4/3;border-radius:var(--radius-sm);background:var(--sand);cursor:pointer;scroll-snap-align:start;border:0;width:100%;padding:0;display:block;position:relative;overflow:hidden}.thumb[data-astro-cid-t4phoku3] img[data-astro-cid-t4phoku3]{object-fit:cover;width:100%;height:100%;transition:opacity .2s;display:block}.thumb[data-astro-cid-t4phoku3]:hover img[data-astro-cid-t4phoku3]{opacity:.85}.thumb[data-astro-cid-t4phoku3][aria-current=true] img[data-astro-cid-t4phoku3]{opacity:1}.thumb[data-astro-cid-t4phoku3]:after{content:\"\";background:var(--umber);height:3px;transition:transform .22s;position:absolute;inset:auto 0 0;transform:scaleX(0)}.thumb[data-astro-cid-t4phoku3][aria-current=true]:after{transform:scaleX(1)}.thumb[data-astro-cid-t4phoku3]:focus-visible{outline:2px solid var(--umber);outline-offset:2px}@media (width<=740px){.stage[data-astro-cid-t4phoku3]{border-radius:var(--radius-sm)}.thumbs[data-astro-cid-t4phoku3]{grid-auto-columns:64px}.nav[data-astro-cid-t4phoku3]{width:32px;height:32px}}@media (prefers-reduced-motion:reduce){.stage-img[data-astro-cid-t4phoku3],.nav[data-astro-cid-t4phoku3],.thumb[data-astro-cid-t4phoku3] img[data-astro-cid-t4phoku3],.thumb[data-astro-cid-t4phoku3]:after{transition:none}}\n"},{"type":"external","src":"_astro/BaseLayout.20QyAfUF.css"},{"type":"inline","content":".book[data-astro-cid-kl5t4fso]{border-radius:var(--radius-sm);cursor:pointer;letter-spacing:.07em;text-transform:uppercase;border:1px solid #0000;justify-content:center;align-items:center;min-height:40px;padding:10px 13px;font-size:10px;transition:background .18s,color .18s;display:inline-flex}.solid[data-astro-cid-kl5t4fso]{background:var(--umber);color:var(--paper-light)}.solid[data-astro-cid-kl5t4fso]:hover:not(:disabled){background:var(--clay)}.outline[data-astro-cid-kl5t4fso]{border-color:var(--line);color:var(--umber);background:0 0}.outline[data-astro-cid-kl5t4fso]:hover:not(:disabled){border-color:var(--umber);background:var(--umber);color:var(--paper-light)}.book[data-astro-cid-kl5t4fso]:disabled{opacity:.5;cursor:not-allowed}@media (prefers-reduced-motion:reduce){.book[data-astro-cid-kl5t4fso]{transition:none}}\n.back-link[data-astro-cid-5cf5d5us]{color:var(--muted);margin-bottom:28px;font-size:12px;display:inline-block}.detail[data-astro-cid-5cf5d5us] .heading[data-astro-cid-5cf5d5us]{margin:12px 0}.lead[data-astro-cid-5cf5d5us]{color:var(--muted);margin:0 0 24px}.facts[data-astro-cid-5cf5d5us]{border-block:1px solid var(--line);grid-template-columns:repeat(4,1fr);gap:16px;margin:26px 0;padding:20px 0;display:grid}.facts[data-astro-cid-5cf5d5us] div[data-astro-cid-5cf5d5us]{gap:5px;display:grid}.facts[data-astro-cid-5cf5d5us] dt[data-astro-cid-5cf5d5us]{color:var(--muted);text-transform:uppercase;font-size:10px}.facts[data-astro-cid-5cf5d5us] dd[data-astro-cid-5cf5d5us]{color:var(--umber);margin:0;font-size:13px}.description[data-astro-cid-5cf5d5us]{max-width:720px;color:var(--muted);line-height:1.8}.detail[data-astro-cid-5cf5d5us] h2[data-astro-cid-5cf5d5us]{color:var(--umber);font-family:var(--font-heading);font-size:28px;font-weight:500}.detail-sessions[data-astro-cid-5cf5d5us]{border-top:1px solid var(--line)}.detail-session[data-astro-cid-5cf5d5us]{border-bottom:1px solid var(--line);justify-content:space-between;align-items:center;gap:16px;padding:18px 0;display:flex}.session-info[data-astro-cid-5cf5d5us],.session-offer[data-astro-cid-5cf5d5us]{gap:7px;display:grid}.session-info[data-astro-cid-5cf5d5us] strong[data-astro-cid-5cf5d5us],.session-offer[data-astro-cid-5cf5d5us] strong[data-astro-cid-5cf5d5us]{color:var(--umber);font-size:13px}.session-info[data-astro-cid-5cf5d5us] small[data-astro-cid-5cf5d5us]{color:var(--muted);font-size:11px}.session-offer[data-astro-cid-5cf5d5us]{justify-items:end}.detail[data-astro-cid-5cf5d5us] ul[data-astro-cid-5cf5d5us]{color:var(--muted);margin-bottom:24px;line-height:1.9}@media (width<=740px){.facts[data-astro-cid-5cf5d5us]{grid-template-columns:1fr 1fr}.detail-session[data-astro-cid-5cf5d5us]{flex-direction:column;align-items:start}.session-offer[data-astro-cid-5cf5d5us]{grid-template-columns:1fr auto;place-items:center start;width:100%}}\n"}],"routeData":{"route":"/experiences/[slug]","isIndex":false,"type":"page","pattern":"^\\/experiences\\/([^/]+?)$","segments":[[{"content":"experiences","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/experiences/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.20QyAfUF.css"},{"type":"external","src":"_astro/ExperiencesSection.BQfrS3iU.css"},{"type":"inline","content":".page-header[data-astro-cid-5gwfj4eg]{padding:var(--space-6) 0 var(--space-4);background:var(--paper-light)}.page-header[data-astro-cid-5gwfj4eg] .heading[data-astro-cid-5gwfj4eg]{margin:14px 0;font-size:clamp(56px,7vw,91px)}.lead[data-astro-cid-5gwfj4eg]{max-width:480px;color:var(--muted);font-size:14px;line-height:1.8}@media (width<=740px){.page-header[data-astro-cid-5gwfj4eg]{padding-top:var(--space-5)}}\n.book[data-astro-cid-kl5t4fso]{border-radius:var(--radius-sm);cursor:pointer;letter-spacing:.07em;text-transform:uppercase;border:1px solid #0000;justify-content:center;align-items:center;min-height:40px;padding:10px 13px;font-size:10px;transition:background .18s,color .18s;display:inline-flex}.solid[data-astro-cid-kl5t4fso]{background:var(--umber);color:var(--paper-light)}.solid[data-astro-cid-kl5t4fso]:hover:not(:disabled){background:var(--clay)}.outline[data-astro-cid-kl5t4fso]{border-color:var(--line);color:var(--umber);background:0 0}.outline[data-astro-cid-kl5t4fso]:hover:not(:disabled){border-color:var(--umber);background:var(--umber);color:var(--paper-light)}.book[data-astro-cid-kl5t4fso]:disabled{opacity:.5;cursor:not-allowed}@media (prefers-reduced-motion:reduce){.book[data-astro-cid-kl5t4fso]{transition:none}}\n"}],"routeData":{"route":"/experiences","isIndex":true,"type":"page","pattern":"^\\/experiences$","segments":[[{"content":"experiences","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/experiences/index.astro","pathname":"/experiences","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.20QyAfUF.css"},{"type":"inline","content":".page-header[data-astro-cid-5gwfj4eg]{padding:var(--space-6) 0 var(--space-4);background:var(--paper-light)}.page-header[data-astro-cid-5gwfj4eg] .heading[data-astro-cid-5gwfj4eg]{margin:14px 0;font-size:clamp(56px,7vw,91px)}.lead[data-astro-cid-5gwfj4eg]{max-width:480px;color:var(--muted);font-size:14px;line-height:1.8}@media (width<=740px){.page-header[data-astro-cid-5gwfj4eg]{padding-top:var(--space-5)}}\n.faq-list[data-astro-cid-f6s5ah4t]{max-width:850px;margin:0 auto var(--space-6)}details[data-astro-cid-f6s5ah4t]{border-bottom:1px solid var(--line)}summary[data-astro-cid-f6s5ah4t]{color:var(--umber);cursor:pointer;font-family:var(--font-heading);padding:21px 38px 21px 0;font-size:24px;list-style:none;position:relative}summary[data-astro-cid-f6s5ah4t]::-webkit-details-marker{display:none}summary[data-astro-cid-f6s5ah4t]:after{content:\"+\";font-family:var(--font-body);font-size:20px;position:absolute;right:4px}details[data-astro-cid-f6s5ah4t][open] summary[data-astro-cid-f6s5ah4t]:after{content:\"−\"}details[data-astro-cid-f6s5ah4t] p[data-astro-cid-f6s5ah4t]{max-width:700px;color:var(--muted);margin:0;padding:0 32px 22px 0;font-size:13px;line-height:1.8}\n"}],"routeData":{"route":"/faq","isIndex":false,"type":"page","pattern":"^\\/faq$","segments":[[{"content":"faq","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/faq.astro","pathname":"/faq","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/robots.txt","isIndex":false,"type":"endpoint","pattern":"^\\/robots\\.txt$","segments":[[{"content":"robots.txt","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/robots.txt.ts","pathname":"/robots.txt","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.20QyAfUF.css"},{"type":"inline","content":".page-header[data-astro-cid-5gwfj4eg]{padding:var(--space-6) 0 var(--space-4);background:var(--paper-light)}.page-header[data-astro-cid-5gwfj4eg] .heading[data-astro-cid-5gwfj4eg]{margin:14px 0;font-size:clamp(56px,7vw,91px)}.lead[data-astro-cid-5gwfj4eg]{max-width:480px;color:var(--muted);font-size:14px;line-height:1.8}@media (width<=740px){.page-header[data-astro-cid-5gwfj4eg]{padding-top:var(--space-5)}}\n.book[data-astro-cid-kl5t4fso]{border-radius:var(--radius-sm);cursor:pointer;letter-spacing:.07em;text-transform:uppercase;border:1px solid #0000;justify-content:center;align-items:center;min-height:40px;padding:10px 13px;font-size:10px;transition:background .18s,color .18s;display:inline-flex}.solid[data-astro-cid-kl5t4fso]{background:var(--umber);color:var(--paper-light)}.solid[data-astro-cid-kl5t4fso]:hover:not(:disabled){background:var(--clay)}.outline[data-astro-cid-kl5t4fso]{border-color:var(--line);color:var(--umber);background:0 0}.outline[data-astro-cid-kl5t4fso]:hover:not(:disabled){border-color:var(--umber);background:var(--umber);color:var(--paper-light)}.book[data-astro-cid-kl5t4fso]:disabled{opacity:.5;cursor:not-allowed}@media (prefers-reduced-motion:reduce){.book[data-astro-cid-kl5t4fso]{transition:none}}\n.calendar-card[data-astro-cid-iobklc7f]{border:1px solid var(--line);border-radius:var(--radius-md);background:var(--paper-light);overflow:hidden}.calendar-top[data-astro-cid-iobklc7f]{background:var(--umber);color:var(--paper-light);font-family:var(--font-heading);padding:18px 22px;font-size:24px}.calendar-pills[data-astro-cid-iobklc7f]{border-bottom:1px solid var(--line);gap:8px;padding:18px 22px;display:flex;overflow-x:auto}.date-pill[data-astro-cid-iobklc7f]{border:1px solid var(--line);border-radius:var(--radius-sm);min-width:64px;color:var(--muted);cursor:pointer;background:0 0;gap:5px;padding:11px;display:grid}.date-pill[data-astro-cid-iobklc7f] small[data-astro-cid-iobklc7f]{text-transform:uppercase;font-size:9px}.date-pill[data-astro-cid-iobklc7f] strong[data-astro-cid-iobklc7f]{color:var(--umber);font-family:var(--font-heading);font-size:25px;font-weight:500}.date-pill[data-astro-cid-iobklc7f].active{border-color:var(--umber);background:var(--umber);color:var(--paper-light)}.date-pill[data-astro-cid-iobklc7f].active strong[data-astro-cid-iobklc7f]{color:var(--paper-light)}.agenda[data-astro-cid-iobklc7f]{padding-inline:22px}.agenda-item[data-astro-cid-iobklc7f]{border-bottom:1px solid var(--line);align-items:center;gap:20px;padding:20px 0;display:flex}.agenda-item[data-astro-cid-iobklc7f]:last-child{border-bottom:0}.agenda-item[data-astro-cid-iobklc7f] .time[data-astro-cid-iobklc7f]{min-width:78px;color:var(--clay);font-size:12px;font-weight:600}.agenda-item[data-astro-cid-iobklc7f]>div[data-astro-cid-iobklc7f]:nth-child(2){gap:4px;display:grid}.agenda-item[data-astro-cid-iobklc7f] strong[data-astro-cid-iobklc7f]{color:var(--umber);font-family:var(--font-heading);font-size:21px;font-weight:500}.agenda-item[data-astro-cid-iobklc7f] small[data-astro-cid-iobklc7f]{color:var(--muted);font-size:10px}.agenda-action[data-astro-cid-iobklc7f]{margin-left:auto}.agenda-empty[data-astro-cid-iobklc7f]{color:var(--muted);padding:24px}@media (width<=600px){.agenda[data-astro-cid-iobklc7f],.calendar-pills[data-astro-cid-iobklc7f]{padding-inline:14px}.agenda-item[data-astro-cid-iobklc7f]{flex-wrap:wrap;align-items:start;gap:10px 14px}.agenda-action[data-astro-cid-iobklc7f]{margin-left:92px}}\n"}],"routeData":{"route":"/schedule","isIndex":false,"type":"page","pattern":"^\\/schedule$","segments":[[{"content":"schedule","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/schedule.astro","pathname":"/schedule","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/sitemap-index.xml","isIndex":false,"type":"endpoint","pattern":"^\\/sitemap-index\\.xml$","segments":[[{"content":"sitemap-index.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/sitemap-index.xml.ts","pathname":"/sitemap-index.xml","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/sitemap.xml","isIndex":false,"type":"endpoint","pattern":"^\\/sitemap\\.xml$","segments":[[{"content":"sitemap.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/sitemap.xml.ts","pathname":"/sitemap.xml","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.20QyAfUF.css"},{"type":"inline","content":".gallery[data-astro-cid-t4phoku3]{gap:10px;min-width:0;display:grid}.stage[data-astro-cid-t4phoku3]{aspect-ratio:var(--ratio,3 / 2);border-radius:var(--radius-md);background:var(--sand);touch-action:pan-y;position:relative;overflow:hidden}.stage-img[data-astro-cid-t4phoku3]{object-fit:cover;object-position:center;width:100%;height:100%;transition:opacity .22s;display:block}.stage-img[data-astro-cid-t4phoku3].is-changing{opacity:0}.nav[data-astro-cid-t4phoku3]{background:color-mix(in srgb, var(--paper-light) 92%, transparent);width:36px;height:36px;color:var(--umber);cursor:pointer;border:0;border-radius:50%;place-items:center;padding:0;transition:background .2s;display:grid;position:absolute;top:50%;transform:translateY(-50%)}.nav[data-astro-cid-t4phoku3]:hover{background:var(--paper-light)}.nav[data-astro-cid-t4phoku3]:focus-visible{outline:2px solid var(--paper-light);outline-offset:2px}.prev[data-astro-cid-t4phoku3]{left:12px}.next[data-astro-cid-t4phoku3]{right:12px}.count[data-astro-cid-t4phoku3]{background:color-mix(in srgb, var(--paper-light) 92%, transparent);color:var(--umber);font-size:var(--fs-label);font-weight:var(--fw-label);letter-spacing:.04em;font-variant-numeric:tabular-nums;border-radius:99px;padding:4px 10px;position:absolute;bottom:12px;left:12px}.thumbs[data-astro-cid-t4phoku3]{scroll-snap-type:x proximity;scrollbar-width:none;grid-auto-columns:minmax(64px,1fr);grid-auto-flow:column;gap:8px;margin:0;padding:0;list-style:none;display:grid;overflow-x:auto}.thumbs[data-astro-cid-t4phoku3]::-webkit-scrollbar{display:none}.thumb[data-astro-cid-t4phoku3]{aspect-ratio:4/3;border-radius:var(--radius-sm);background:var(--sand);cursor:pointer;scroll-snap-align:start;border:0;width:100%;padding:0;display:block;position:relative;overflow:hidden}.thumb[data-astro-cid-t4phoku3] img[data-astro-cid-t4phoku3]{object-fit:cover;width:100%;height:100%;transition:opacity .2s;display:block}.thumb[data-astro-cid-t4phoku3]:hover img[data-astro-cid-t4phoku3]{opacity:.85}.thumb[data-astro-cid-t4phoku3][aria-current=true] img[data-astro-cid-t4phoku3]{opacity:1}.thumb[data-astro-cid-t4phoku3]:after{content:\"\";background:var(--umber);height:3px;transition:transform .22s;position:absolute;inset:auto 0 0;transform:scaleX(0)}.thumb[data-astro-cid-t4phoku3][aria-current=true]:after{transform:scaleX(1)}.thumb[data-astro-cid-t4phoku3]:focus-visible{outline:2px solid var(--umber);outline-offset:2px}@media (width<=740px){.stage[data-astro-cid-t4phoku3]{border-radius:var(--radius-sm)}.thumbs[data-astro-cid-t4phoku3]{grid-auto-columns:64px}.nav[data-astro-cid-t4phoku3]{width:32px;height:32px}}@media (prefers-reduced-motion:reduce){.stage-img[data-astro-cid-t4phoku3],.nav[data-astro-cid-t4phoku3],.thumb[data-astro-cid-t4phoku3] img[data-astro-cid-t4phoku3],.thumb[data-astro-cid-t4phoku3]:after{transition:none}}\n.back-link[data-astro-cid-emzxvc7c]{color:var(--muted);margin-bottom:28px;font-size:12px;display:inline-block}.studio-detail[data-astro-cid-emzxvc7c] .heading[data-astro-cid-emzxvc7c]{margin:12px 0}.lead[data-astro-cid-emzxvc7c]{max-width:760px;color:var(--muted);margin:0 0 26px;line-height:1.8}.description[data-astro-cid-emzxvc7c]{max-width:760px;color:var(--muted);margin-top:30px;line-height:1.8}.facts[data-astro-cid-emzxvc7c]{border-block:1px solid var(--line);gap:48px;margin:28px 0 44px;padding:22px 0;display:flex}.facts[data-astro-cid-emzxvc7c] div[data-astro-cid-emzxvc7c]{gap:5px;display:grid}.facts[data-astro-cid-emzxvc7c] dt[data-astro-cid-emzxvc7c]{color:var(--muted);text-transform:uppercase;font-size:10px}.facts[data-astro-cid-emzxvc7c] dd[data-astro-cid-emzxvc7c]{color:var(--umber);margin:0;font-size:13px}.studio-events[data-astro-cid-emzxvc7c] h2[data-astro-cid-emzxvc7c]{color:var(--umber);font-family:var(--font-heading);font-size:32px;font-weight:500}.event-list[data-astro-cid-emzxvc7c]{border-top:1px solid var(--line)}.event-item[data-astro-cid-emzxvc7c]{border-bottom:1px solid var(--line);justify-content:space-between;align-items:center;gap:20px;padding:20px 0;display:flex}.event-item[data-astro-cid-emzxvc7c] h3[data-astro-cid-emzxvc7c]{color:var(--umber);font-family:var(--font-heading);margin:0;font-size:24px;font-weight:500}.event-item[data-astro-cid-emzxvc7c] p[data-astro-cid-emzxvc7c],.event-item[data-astro-cid-emzxvc7c] ul[data-astro-cid-emzxvc7c],.empty-events[data-astro-cid-emzxvc7c]{color:var(--muted);font-size:12px;line-height:1.7}.event-item[data-astro-cid-emzxvc7c] ul[data-astro-cid-emzxvc7c]{flex-wrap:wrap;gap:8px 22px;margin:8px 0 0;padding-left:18px;display:flex}.event-link[data-astro-cid-emzxvc7c]{border:1px solid var(--line);width:42px;height:42px;color:var(--umber);border-radius:50%;flex:none;place-items:center;display:grid}@media (width<=740px){.facts[data-astro-cid-emzxvc7c]{gap:24px}}\n"}],"routeData":{"route":"/studios/[slug]","isIndex":false,"type":"page","pattern":"^\\/studios\\/([^/]+?)$","segments":[[{"content":"studios","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/studios/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.20QyAfUF.css"},{"type":"external","src":"_astro/RitualBand.B6DvGhl4.css"},{"type":"external","src":"_astro/index.Bsl8ivfc.css"},{"type":"external","src":"_astro/ExperiencesSection.BQfrS3iU.css"},{"type":"inline","content":".book[data-astro-cid-kl5t4fso]{border-radius:var(--radius-sm);cursor:pointer;letter-spacing:.07em;text-transform:uppercase;border:1px solid #0000;justify-content:center;align-items:center;min-height:40px;padding:10px 13px;font-size:10px;transition:background .18s,color .18s;display:inline-flex}.solid[data-astro-cid-kl5t4fso]{background:var(--umber);color:var(--paper-light)}.solid[data-astro-cid-kl5t4fso]:hover:not(:disabled){background:var(--clay)}.outline[data-astro-cid-kl5t4fso]{border-color:var(--line);color:var(--umber);background:0 0}.outline[data-astro-cid-kl5t4fso]:hover:not(:disabled){border-color:var(--umber);background:var(--umber);color:var(--paper-light)}.book[data-astro-cid-kl5t4fso]:disabled{opacity:.5;cursor:not-allowed}@media (prefers-reduced-motion:reduce){.book[data-astro-cid-kl5t4fso]{transition:none}}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}}],"serverLike":true,"middlewareMode":"classic","site":"https://caveofchi.example","base":"/","trailingSlash":"never","compressHTML":"jsx","componentMetadata":[["C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/pages/booking/after-payment.astro",{"propagation":"none","containsHead":true}],["C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/pages/booking/status.astro",{"propagation":"none","containsHead":true}],["C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/pages/404.astro",{"propagation":"none","containsHead":true}],["C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/pages/about.astro",{"propagation":"none","containsHead":true}],["C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/pages/experiences/[slug].astro",{"propagation":"none","containsHead":true}],["C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/pages/experiences/index.astro",{"propagation":"none","containsHead":true}],["C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/pages/faq.astro",{"propagation":"none","containsHead":true}],["C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/pages/schedule.astro",{"propagation":"none","containsHead":true}],["C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/pages/studios/[slug].astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(function(){let e=(e,t)=>{let n=async()=>{await(await e())()},r=typeof t.value==`object`?t.value:void 0,i={timeout:r==null?void 0:r.timeout};`requestIdleCallback`in window?window.requestIdleCallback(n,i):setTimeout(n,i.timeout||200)};(self.Astro||(self.Astro={})).idle=e,window.dispatchEvent(new Event(`astro:idle`))})();"],["load","(function(){let e=async e=>{await(await e())()};(self.Astro||(self.Astro={})).load=e,window.dispatchEvent(new Event(`astro:load`))})();"],["media","(function(){let e=(e,t)=>{let n=async()=>{await(await e())()};if(t.value){let e=matchMedia(t.value);e.matches?n():e.addEventListener(`change`,n,{once:!0})}};(self.Astro||(self.Astro={})).media=e,window.dispatchEvent(new Event(`astro:media`))})();"],["only","(function(){let e=async e=>{await(await e())()};(self.Astro||(self.Astro={})).only=e,window.dispatchEvent(new Event(`astro:only`))})();"],["visible","(function(){let e=(e,t,n)=>{let r=async()=>{await(await e())()},i=typeof t.value==`object`?t.value:void 0,a={rootMargin:i==null?void 0:i.rootMargin},o=new IntersectionObserver(e=>{for(let t of e)if(t.isIntersecting){o.disconnect(),r();break}},a);for(let e of n.children)o.observe(e)};(self.Astro||(self.Astro={})).visible=e,window.dispatchEvent(new Event(`astro:visible`))})();"]],"entryModules":{"\u0000virtual:astro:middleware":"virtual_astro_middleware.mjs","\u0000virtual:astro:server-island-manifest":"chunks/_virtual_astro_server-island-manifest_C1Q2srgE.mjs","\u0000virtual:astro:session-driver":"chunks/_virtual_astro_session-driver_C-PI1Pas.mjs","\u0000virtual:astro:actions/noop-entrypoint":"chunks/noop-entrypoint_Z3zFhrGC.mjs","@astrojs/vercel/entrypoint":"entry.mjs","\u0000virtual:astro:page:src/pages/404@_@astro":"chunks/404_CQ1fIncQ.mjs","\u0000virtual:astro:page:src/pages/experiences/[slug]@_@astro":"chunks/_slug__B557qNy3.mjs","\u0000virtual:astro:page:src/pages/studios/[slug]@_@astro":"chunks/_slug__B73Krudk.mjs","\u0000virtual:astro:page:src/pages/about@_@astro":"chunks/about_mmrSvcZT.mjs","\u0000virtual:astro:page:src/pages/booking/after-payment@_@astro":"chunks/after-payment_CKRha0gQ.mjs","\u0000virtual:astro:page:src/pages/faq@_@astro":"chunks/faq_D67wPEBD.mjs","\u0000virtual:astro:page:node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_BB6LIMQd.mjs","\u0000virtual:astro:page:src/pages/experiences/index@_@astro":"chunks/index_B3HyPTDR.mjs","\u0000virtual:astro:page:src/pages/index@_@astro":"chunks/index_Dhyi1JDB.mjs","\u0000virtual:astro:page:src/pages/robots.txt@_@ts":"chunks/robots_CEKbghLP.mjs","\u0000virtual:astro:page:src/pages/schedule@_@astro":"chunks/schedule_DrezwP3C.mjs","C:/project-lala/BMS/mahalu.studio.management/WEBSITE/node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_hH8vuSFC.mjs","\u0000virtual:astro:page:src/pages/sitemap-index.xml@_@ts":"chunks/sitemap-index_Rs9cUXsj.mjs","\u0000virtual:astro:page:src/pages/sitemap.xml@_@ts":"chunks/sitemap_CGdGXWfW.mjs","\u0000virtual:astro:page:src/pages/booking/status@_@astro":"chunks/status_BiZo8UAf.mjs","C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/components/booking/BookingModal.astro?astro&type=script&index=0&lang.ts":"_astro/BookingModal.astro_astro_type_script_index_0_lang.CsnFij9Y.js","C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/components/booking/BookingStatus.astro?astro&type=script&index=0&lang.ts":"_astro/BookingStatus.astro_astro_type_script_index_0_lang.0wvpgxjm.js","C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/components/events/EventBrowser.astro?astro&type=script&index=0&lang.ts":"_astro/EventBrowser.astro_astro_type_script_index_0_lang.COlytxNq.js","C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/components/common/Gallery.astro?astro&type=script&index=0&lang.ts":"_astro/Gallery.astro_astro_type_script_index_0_lang.nh3hXXZn.js","C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/components/schedule/ScheduleCalendar.astro?astro&type=script&index=0&lang.ts":"_astro/ScheduleCalendar.astro_astro_type_script_index_0_lang.ByrMKq5I.js","C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/components/layout/SiteHeader.astro?astro&type=script&index=0&lang.ts":"_astro/SiteHeader.astro_astro_type_script_index_0_lang.ByUiL9hc.js","C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/components/home/UpcomingSchedule.astro?astro&type=script&index=0&lang.ts":"_astro/UpcomingSchedule.astro_astro_type_script_index_0_lang.C7fD4Q4I.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/components/events/EventBrowser.astro?astro&type=script&index=0&lang.ts","document.querySelectorAll(`[data-event-browser]`).forEach(e=>{let t=e.querySelectorAll(`[data-studio-filter]`),n=e.querySelectorAll(`[data-event-card]`),r=e.querySelector(`[data-empty]`),i=`all`,a=e=>typeof e==`object`&&!!e&&`sessionId`in e&&typeof e.sessionId==`string`&&`startsAt`in e&&typeof e.startsAt==`string`&&Number.isFinite(Date.parse(e.startsAt))&&`durationMinutes`in e&&typeof e.durationMinutes==`number`&&`price`in e&&typeof e.price==`number`&&`seatsLeft`in e&&typeof e.seatsLeft==`number`&&`studioSlug`in e&&typeof e.studioSlug==`string`&&`studioName`in e&&typeof e.studioName==`string`,o=e=>{try{let t=JSON.parse(e.dataset.sessions??`[]`);if(!Array.isArray(t)||!t.every(a))throw Error(`Sesi event harus berupa array dengan format yang valid.`);return t}catch(e){return console.error(`[events] Gagal membaca data sesi kartu event.`,e),[]}},s=e=>{let t=new Date(e);return`${new Intl.DateTimeFormat(`id-ID`,{timeZone:`Asia/Jakarta`,weekday:`short`,day:`numeric`,month:`short`}).format(t)} · ${new Intl.DateTimeFormat(`id-ID`,{timeZone:`Asia/Jakarta`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).format(t).replace(`.`,`:`)} WIB`},c=e=>{let t=Math.floor(e/60),n=e%60;return t===0?`${e} menit`:n===0?`${t} jam`:`${t} jam ${n} menit`},l=e=>`Rp ${new Intl.NumberFormat(`id-ID`).format(e)}`,u=e=>{let t=o(e).filter(e=>i===`all`||e.studioSlug===i);if(e.hidden=t.length===0,e.hidden)return!1;let n=t.find(e=>e.seatsLeft>0)??t[0];if(!n)return!1;let r=e.querySelector(`[data-featured-studio]`),a=e.querySelector(`[data-featured-date]`),u=e.querySelector(`[data-featured-seats]`),d=e.querySelector(`[data-featured-price]`),f=e.querySelector(`[data-book]`);if(r&&(r.textContent=`${n.studioName} · ${c(n.durationMinutes)}`),a&&(a.textContent=s(n.startsAt)),u&&(u.textContent=`Sisa ${n.seatsLeft} kursi`),d&&(d.textContent=l(n.price)),f){let e=n.seatsLeft<=0;f.dataset.sessionId=n.sessionId,f.dataset.studioSlug=n.studioSlug,f.dataset.price=String(n.price),f.dataset.seats=String(n.seatsLeft),f.disabled=e,f.textContent=e?`Kuota habis`:`Reserve seat ↗`}return!0},d=()=>{let e=0;n.forEach(t=>{u(t)&&e++}),r&&(r.hidden=e>0,e===0&&i!==`all`?r.textContent=`Tidak ada event yang sesuai dengan filter yang dipilih.`:e===0&&(r.textContent=`Belum ada event publik mendatang dari sistem.`))};document.addEventListener(`booking-events-updated`,e=>{if(!(e instanceof CustomEvent)||!Array.isArray(e.detail)){console.error(`[events] Respons pembaruan event booking tidak valid.`);return}let t=new Map;for(let n of e.detail){if(typeof n!=`object`||!n||!(`slug`in n)||typeof n.slug!=`string`||!(`title`in n)||typeof n.title!=`string`||!(`sessions`in n)||!Array.isArray(n.sessions)||!n.sessions.every(a)){console.error(`[events] Data pembaruan event booking tidak sesuai format.`);return}t.set(n.slug,{title:n.title,sessions:n.sessions})}n.forEach(e=>{let n=t.get(e.dataset.eventSlug??``);if(e.dataset.sessions=JSON.stringify(n?.sessions??[]),n){e.dataset.eventTitle=n.title;let t=e.querySelector(`h3 a`);t&&(t.textContent=n.title)}}),d()}),t.forEach(e=>e.addEventListener(`click`,()=>{i=e.dataset.studioFilter??`all`,t.forEach(t=>{let n=t===e;t.classList.toggle(`active`,n),t.setAttribute(`aria-pressed`,String(n))}),d()}))});"],["C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/components/common/Gallery.astro?astro&type=script&index=0&lang.ts","document.querySelectorAll(`[data-gallery]`).forEach(e=>{let t=e.querySelector(`[data-stage-wrap]`),n=e.querySelector(`[data-stage]`),r=Array.from(e.querySelectorAll(`.thumb`)),i=e.querySelector(`[data-current]`);if(!t||!n||r.length<2)return;let a=0,o=0,s=e=>{a=(e+r.length)%r.length;let t=r[a],s=t.dataset.src??``,c=++o;r.forEach((e,t)=>{t===a?e.setAttribute(`aria-current`,`true`):e.removeAttribute(`aria-current`)}),i&&(i.textContent=String(a+1)),t.scrollIntoView({inline:`center`,block:`nearest`,behavior:`smooth`}),n.classList.add(`is-changing`);let l=new Image;l.decoding=`async`,l.onload=()=>{c===o&&(n.src=s,n.alt=t.dataset.alt??``,n.classList.remove(`is-changing`))},l.onerror=()=>{c===o&&n.classList.remove(`is-changing`)},l.src=s};r.forEach((e,t)=>e.addEventListener(`click`,()=>s(t))),e.querySelector(`[data-prev]`)?.addEventListener(`click`,()=>s(a-1)),e.querySelector(`[data-next]`)?.addEventListener(`click`,()=>s(a+1)),e.addEventListener(`keydown`,e=>{e.key===`ArrowLeft`&&s(a-1),e.key===`ArrowRight`&&s(a+1)});let c=0;t.addEventListener(`touchstart`,e=>{c=e.touches[0].clientX},{passive:!0}),t.addEventListener(`touchend`,e=>{let t=e.changedTouches[0].clientX-c;Math.abs(t)>40&&s(a+(t<0?1:-1))},{passive:!0}),r.forEach(e=>{let t=new Image;t.decoding=`async`,t.src=e.dataset.src??``})});"],["C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/components/schedule/ScheduleCalendar.astro?astro&type=script&index=0&lang.ts","document.querySelectorAll(`[data-schedule]`).forEach(e=>{let t=e.querySelectorAll(`[data-date]`),n=e.querySelectorAll(`[data-agenda]`);t.forEach(e=>e.addEventListener(`click`,()=>{t.forEach(t=>{let n=t===e;t.classList.toggle(`active`,n),t.setAttribute(`aria-pressed`,String(n))}),n.forEach(t=>t.hidden=t.dataset.agenda!==e.dataset.date)}))});"],["C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/components/layout/SiteHeader.astro?astro&type=script&index=0&lang.ts","var e=document.querySelector(`.menu-btn`),t=document.querySelector(`#site-nav`);if(e&&t){let n=n=>{t.classList.toggle(`open`,n),e.setAttribute(`aria-expanded`,String(n))};e.addEventListener(`click`,()=>n(!t.classList.contains(`open`))),t.addEventListener(`click`,e=>{e.target instanceof Element&&e.target.closest(`a`)&&n(!1)}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&n(!1)})}"],["C:/project-lala/BMS/mahalu.studio.management/WEBSITE/src/components/home/UpcomingSchedule.astro?astro&type=script&index=0&lang.ts","document.querySelectorAll(`[data-calendar]`).forEach(e=>{let t=Array.from(e.querySelectorAll(`[role=\"tab\"]`)),n=Array.from(e.querySelectorAll(`[role=\"tabpanel\"]`)),r=(e,r=!1)=>{t.forEach(t=>{let n=t===e;t.setAttribute(`aria-selected`,n?`true`:`false`),t.tabIndex=n?0:-1}),n.forEach(t=>{t.hidden=t.id!==e.getAttribute(`aria-controls`)}),r&&e.focus()};t.forEach((e,n)=>{e.addEventListener(`click`,()=>r(e)),e.addEventListener(`keydown`,e=>{e.key===`ArrowRight`?(e.preventDefault(),r(t[(n+1)%t.length],!0)):e.key===`ArrowLeft`&&(e.preventDefault(),r(t[(n-1+t.length)%t.length],!0))})})});"]],"assets":["/_astro/BaseLayout.20QyAfUF.css","/_astro/BookingModal.astro_astro_type_script_index_0_lang.CsnFij9Y.js","/_astro/BookingStatus.astro_astro_type_script_index_0_lang.0wvpgxjm.js","/_astro/ExperiencesSection.BQfrS3iU.css","/_astro/RitualBand.B6DvGhl4.css","/_astro/format.Dxpd6Fg0.js","/_astro/index.Bsl8ivfc.css","/_astro/logo-cave-of-chi.B6r6MUZh.png","/_astro/sound.mM7RqIjD.webp","/favicon.ico","/favicon.svg","/og-default.svg"],"buildFormat":"directory","checkOrigin":true,"actionBodySizeLimit":1048576,"serverIslandBodySizeLimit":1048576,"allowedDomains":[],"key":"JlsJa57Vda5f8QcgaIPB4+Vgyrit52SmWt+d95Py8TY=","image":{},"devToolbar":{"enabled":false,"debugInfoOutput":""},"logLevel":"info","shouldInjectCspMetaTags":false});
var manifestRoutes = _manifest.routes;
var manifest = Object.assign(_manifest, {
	renderers,
	actions: () => import("./chunks/noop-entrypoint_Z3zFhrGC.mjs"),
	middleware: () => import("./virtual_astro_middleware.mjs"),
	sessionDriver: () => import("./chunks/_virtual_astro_session-driver_C-PI1Pas.mjs"),
	serverIslandMappings: () => import("./chunks/_virtual_astro_server-island-manifest_C1Q2srgE.mjs"),
	routes: manifestRoutes,
	pageMap
});
/**
* The ambient manifest: the explicitly registered one, else the virtual
* module's. Throws lazily when neither is available, so merely importing a
* module that uses this never fails — only actually handling a request does.
*/
function getAmbientManifest() {
	const manifest$1 = manifest;
	if (!manifest$1) throw new AstroError(NoManifestAvailable);
	return manifest$1;
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/app/render-options.js
/**
* Symbol used to attach `ResolvedRenderOptions` to a `Request` object so
* that they can flow through the `FetchHandler` signature (which only takes
* a request) into the request handler chain. This is an internal implementation
* detail between `BaseApp` and the default handler pipeline.
*/
var renderOptionsSymbol = Symbol.for("astro.renderOptions");
/**
* Reads `ResolvedRenderOptions` that were attached to a request via
* `renderOptionsSymbol`. Returns `undefined` if no options are attached.
*/
function getRenderOptions(request) {
	return Reflect.get(request, renderOptionsSymbol);
}
/**
* Attaches `ResolvedRenderOptions` to a request via `renderOptionsSymbol` so
* that downstream handlers can read them.
*/
function setRenderOptions(request, options) {
	Reflect.set(request, renderOptionsSymbol, options);
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/app/origin-check.js
/**
* Content types that can be passed when sending a request via a form
*
* https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/enctype
* @private
*/
var FORM_CONTENT_TYPES = [
	"application/x-www-form-urlencoded",
	"multipart/form-data",
	"text/plain"
];
var SAFE_METHODS = [
	"GET",
	"HEAD",
	"OPTIONS"
];
/**
* Determines whether a request should be rejected because it is a cross-site
* submission for a route rendered on demand.
*
* This encapsulates the shared logic used by both the origin-check middleware
* and the Astro Actions dispatch, so the check is applied consistently
* regardless of where the request is handled.
*
* @private
*/
function isForbiddenCrossOriginRequest(request, url, isPrerendered) {
	if (isPrerendered) return false;
	if (SAFE_METHODS.includes(request.method)) return false;
	const contentType = request.headers.get("content-type");
	if (contentType && !hasFormLikeHeader(contentType)) return false;
	switch (request.headers.get("sec-fetch-site")) {
		case "":
		case null: break;
		case "same-origin":
		case "none": return false;
		default: return true;
	}
	const origin = request.headers.get("origin");
	if (!origin) return false;
	return origin !== url.origin;
}
/**
* Builds the 403 response returned when a cross-site submission is rejected.
*
* @private
*/
function createCrossOriginForbiddenResponse(request) {
	return new Response(`Cross-site ${request.method} form submissions are forbidden`, { status: 403 });
}
/**
* Returns middleware that rejects cross-origin form submissions.
*
* @private
*/
function createOriginCheckMiddleware() {
	return defineMiddleware((context, next) => {
		const { request, url, isPrerendered } = context;
		if (isForbiddenCrossOriginRequest(request, url, isPrerendered)) return createCrossOriginForbiddenResponse(request);
		return next();
	});
}
function hasFormLikeHeader(contentType) {
	if (contentType) {
		for (const FORM_CONTENT_TYPE of FORM_CONTENT_TYPES) if (contentType.toLowerCase().includes(FORM_CONTENT_TYPE)) return true;
	}
	return false;
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/fetch/features.js
/**
* Bit flags for features that handler functions register as "used" when a
* custom `src/fetch.ts` fetch handler is in play. After the first request
* (dev) or at runtime (prod SSR), we compare against the manifest to warn
* about features the user configured but forgot to include in their custom
* fetch handler.
*/
var FetchFeatures = {
	redirects: 1,
	sessions: 2,
	actions: 4,
	middleware: 8,
	i18n: 16,
	cache: 32
};
/** All feature bits ORed together. Keep next to `FetchFeatures` so
*  new flags are hard to forget. */
var ALL_FETCH_FEATURES = FetchFeatures.redirects | FetchFeatures.sessions | FetchFeatures.actions | FetchFeatures.middleware | FetchFeatures.i18n | FetchFeatures.cache;
var usedFeatures = /* @__PURE__ */ new WeakMap();
/** ORs a feature bit into the manifest's used-features bitmask. */
function markFeatureUsed(manifest, feature) {
	const entry = usedFeatures.get(manifest);
	if (entry) entry.bits |= feature;
	else usedFeatures.set(manifest, { bits: feature });
}
/** The used-features bitmask for a manifest; `0` when nothing was marked. */
function getUsedFeatures(manifest) {
	return usedFeatures.get(manifest)?.bits ?? 0;
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/routing/invalid-encoding.js
/**
* Returns an empty `400 Bad Request` response when the request path was
* encoded too many times to fully decode (`state.invalidEncoding`), or
* `undefined` otherwise.
*
* Every entry point that routes the request or runs middleware calls this
* first, so composable pipelines reject the request the same way
* `handleRequest` does regardless of which handlers they include.
*/
function rejectInvalidEncoding(state) {
	if (state.invalidEncoding) return new Response(null, {
		status: 400,
		statusText: "Bad Request"
	});
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/actions/consts.js
var ACTION_QUERY_PARAMS = {
	actionName: "_action",
	actionPayload: "_astroActionPayload"
};
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/actions/runtime/client.js
var codeToStatusMap = {
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	PAYMENT_REQUIRED: 402,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	METHOD_NOT_ALLOWED: 405,
	NOT_ACCEPTABLE: 406,
	PROXY_AUTHENTICATION_REQUIRED: 407,
	REQUEST_TIMEOUT: 408,
	CONFLICT: 409,
	GONE: 410,
	LENGTH_REQUIRED: 411,
	PRECONDITION_FAILED: 412,
	CONTENT_TOO_LARGE: 413,
	URI_TOO_LONG: 414,
	UNSUPPORTED_MEDIA_TYPE: 415,
	RANGE_NOT_SATISFIABLE: 416,
	EXPECTATION_FAILED: 417,
	MISDIRECTED_REQUEST: 421,
	UNPROCESSABLE_CONTENT: 422,
	LOCKED: 423,
	FAILED_DEPENDENCY: 424,
	TOO_EARLY: 425,
	UPGRADE_REQUIRED: 426,
	PRECONDITION_REQUIRED: 428,
	TOO_MANY_REQUESTS: 429,
	REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
	UNAVAILABLE_FOR_LEGAL_REASONS: 451,
	INTERNAL_SERVER_ERROR: 500,
	NOT_IMPLEMENTED: 501,
	BAD_GATEWAY: 502,
	SERVICE_UNAVAILABLE: 503,
	GATEWAY_TIMEOUT: 504,
	HTTP_VERSION_NOT_SUPPORTED: 505,
	VARIANT_ALSO_NEGOTIATES: 506,
	INSUFFICIENT_STORAGE: 507,
	LOOP_DETECTED: 508,
	NETWORK_AUTHENTICATION_REQUIRED: 511
};
var statusToCodeMap = Object.fromEntries(Object.entries(codeToStatusMap).map(([key, value]) => [value, key]));
var ActionError = class ActionError extends Error {
	type = "AstroActionError";
	code = "INTERNAL_SERVER_ERROR";
	status = 500;
	constructor(params) {
		super(params.message);
		this.code = params.code;
		this.status = ActionError.codeToStatus(params.code);
		if (params.stack) this.stack = params.stack;
	}
	static codeToStatus(code) {
		return codeToStatusMap[code];
	}
	static statusToCode(status) {
		return statusToCodeMap[status] ?? "INTERNAL_SERVER_ERROR";
	}
	static fromJson(body) {
		if (isInputError(body)) return new ActionInputError(body.issues);
		if (isActionError(body)) return new ActionError(body);
		return new ActionError({ code: "INTERNAL_SERVER_ERROR" });
	}
};
function isActionError(error) {
	return typeof error === "object" && error != null && "type" in error && error.type === "AstroActionError";
}
function isInputError(error) {
	return typeof error === "object" && error != null && "type" in error && error.type === "AstroActionInputError" && "issues" in error && Array.isArray(error.issues);
}
var ActionInputError = class extends ActionError {
	type = "AstroActionInputError";
	issues;
	fields;
	constructor(issues) {
		super({
			message: `Failed to validate: ${JSON.stringify(issues, null, 2)}`,
			code: "BAD_REQUEST"
		});
		this.issues = issues;
		this.fields = {};
		for (const issue of issues) if (issue.path.length > 0) {
			const key = issue.path[0].toString();
			this.fields[key] ??= [];
			this.fields[key]?.push(issue.message);
		}
	}
};
function deserializeActionResult(res) {
	if (res.type === "error") {
		let json;
		try {
			json = JSON.parse(res.body);
		} catch {
			return {
				data: void 0,
				error: new ActionError({
					message: res.body,
					code: "INTERNAL_SERVER_ERROR"
				})
			};
		}
		if (Object.assign({
			"ASSETS_PREFIX": void 0,
			"BASE_URL": "/",
			"DEV": false,
			"MODE": "production",
			"PROD": true,
			"PUBLIC_API_URL": "https://throwing-winnings-movable.ngrok-free.dev/api",
			"PUBLIC_DEMO_MODE": "true",
			"SITE": "https://caveofchi.example",
			"SSR": true
		}, { OS: "Windows_NT" })?.PROD) return {
			error: ActionError.fromJson(json),
			data: void 0
		};
		else {
			const error = ActionError.fromJson(json);
			error.stack = actionResultErrorStack.get();
			return {
				error,
				data: void 0
			};
		}
	}
	if (res.type === "empty") return {
		data: void 0,
		error: void 0
	};
	return {
		data: parse(res.body, { URL: (href) => new URL(href) }),
		error: void 0
	};
}
var actionResultErrorStack = (function actionResultErrorStackFn() {
	let errorStack;
	return {
		set(stack) {
			errorStack = stack;
		},
		get() {
			return errorStack;
		}
	};
})();
function getActionQueryString(name) {
	return `?${new URLSearchParams({ [ACTION_QUERY_PARAMS.actionName]: name }).toString()}`;
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/actions/utils.js
function hasActionPayload(locals) {
	return "_actionPayload" in locals;
}
function createGetActionResult(locals) {
	return (actionFn) => {
		if (!hasActionPayload(locals) || actionFn.toString() !== getActionQueryString(locals._actionPayload.actionName)) return;
		return deserializeActionResult(locals._actionPayload.actionResult);
	};
}
function createCallAction(context) {
	return (baseAction, input) => {
		Reflect.set(context, ACTION_API_CONTEXT_SYMBOL, true);
		return baseAction.bind(context)(input);
	};
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/cookies/cookies.js
var DELETED_EXPIRATION = /* @__PURE__ */ new Date(0);
var DELETED_VALUE = "deleted";
var responseSentSymbol = Symbol.for("astro.responseSent");
var identity = (value) => value;
var AstroCookie = class {
	value;
	constructor(value) {
		this.value = value;
	}
	json() {
		if (this.value === void 0) throw new Error(`Cannot convert undefined to an object.`);
		return JSON.parse(this.value);
	}
	number() {
		return Number(this.value);
	}
	boolean() {
		if (this.value === "false") return false;
		if (this.value === "0") return false;
		return Boolean(this.value);
	}
};
var AstroCookies = class {
	#request;
	#requestValues;
	#outgoing;
	#consumed;
	#logger;
	constructor(request, logger) {
		this.#request = request;
		this.#requestValues = null;
		this.#outgoing = null;
		this.#consumed = false;
		this.#logger = logger;
	}
	/**
	* Astro.cookies.delete(key) is used to delete a cookie. Using this method will result
	* in a Set-Cookie header added to the response.
	* @param key The cookie to delete
	* @param options Options related to this deletion, such as the path of the cookie.
	*/
	delete(key, options) {
		this.#ensureOutgoingMap().set(key, [
			DELETED_VALUE,
			stringifySetCookie({
				...options,
				name: key,
				value: DELETED_VALUE,
				expires: DELETED_EXPIRATION,
				maxAge: void 0
			}),
			false
		]);
	}
	/**
	* Astro.cookies.get(key) is used to get a cookie value. The cookie value is read from the
	* request. If you have set a cookie via Astro.cookies.set(key, value), the value will be taken
	* from that set call, overriding any values already part of the request.
	* @param key The cookie to get.
	* @returns An object containing the cookie value as well as convenience methods for converting its value.
	*/
	get(key, options = void 0) {
		if (this.#outgoing?.has(key)) {
			let [serializedValue, , isSetValue] = this.#outgoing.get(key);
			if (isSetValue) return new AstroCookie(serializedValue);
			else return;
		}
		const decode = options?.decode ?? decodeURIComponent;
		const values = this.#ensureParsed();
		if (key in values) {
			const value = values[key];
			if (value !== void 0) {
				let decodedValue;
				try {
					decodedValue = decode(value);
				} catch (_error) {
					decodedValue = value;
				}
				return new AstroCookie(decodedValue);
			}
		}
	}
	/**
	* Astro.cookies.has(key) returns a boolean indicating whether this cookie is either
	* part of the initial request or set via Astro.cookies.set(key)
	* @param key The cookie to check for.
	* @param _options This parameter is no longer used.
	* @returns
	*/
	has(key, _options) {
		if (this.#outgoing?.has(key)) {
			let [, , isSetValue] = this.#outgoing.get(key);
			return isSetValue;
		}
		return this.#ensureParsed()[key] !== void 0;
	}
	/**
	* Astro.cookies.set(key, value) is used to set a cookie's value. If provided
	* an object it will be stringified via JSON.stringify(value). Additionally you
	* can provide options customizing how this cookie will be set, such as setting httpOnly
	* in order to prevent the cookie from being read in client-side JavaScript.
	* @param key The name of the cookie to set.
	* @param value A value, either a string or other primitive or an object.
	* @param options Options for the cookie, such as the path and security settings.
	*/
	set(key, value, options) {
		if (this.#consumed) this.#logger.warn("SKIP_FORMAT", "Astro.cookies.set() was called after the cookies had already been sent to the browser.\nThis may have happened if this method was called in an imported component.\nPlease make sure that Astro.cookies.set() is only called in the frontmatter of the main page.");
		let serializedValue;
		if (typeof value === "string") serializedValue = value;
		else {
			let toStringValue = value.toString();
			if (toStringValue === Object.prototype.toString.call(value)) serializedValue = JSON.stringify(value);
			else serializedValue = toStringValue;
		}
		const { encode, ...attributes } = options ?? {};
		this.#ensureOutgoingMap().set(key, [
			serializedValue,
			stringifySetCookie({
				...attributes,
				name: key,
				value: serializedValue
			}, { encode }),
			true
		]);
		if (this.#request[responseSentSymbol]) throw new AstroError({ ...ResponseSentError });
	}
	/**
	* Merges a new AstroCookies instance into the current instance. Any new cookies
	* will be added to the current instance, overwriting any existing cookies with the same name.
	*/
	merge(cookies) {
		const outgoing = cookies.#outgoing;
		if (outgoing) for (const [key, value] of outgoing) this.#ensureOutgoingMap().set(key, value);
	}
	/**
	* Astro.cookies.header() returns an iterator for the cookies that have previously
	* been set by either Astro.cookies.set() or Astro.cookies.delete().
	* This method is primarily used by adapters to set the header on outgoing responses.
	* @returns
	*/
	*headers() {
		if (this.#outgoing == null) return;
		for (const [, value] of this.#outgoing) yield value[1];
	}
	/**
	* Marks the cookies as consumed and returns the header values.
	* After consumption, any subsequent `set()` calls will warn.
	*/
	consume() {
		this.#consumed = true;
		return this.headers();
	}
	/**
	* @deprecated Use the instance method `cookies.consume()` instead.
	* Kept for backward compatibility with adapters.
	*/
	static consume(cookies) {
		return cookies.consume();
	}
	#ensureParsed() {
		if (!this.#requestValues) this.#parse();
		if (!this.#requestValues) this.#requestValues = Object.create(null);
		return this.#requestValues;
	}
	#ensureOutgoingMap() {
		if (!this.#outgoing) this.#outgoing = /* @__PURE__ */ new Map();
		return this.#outgoing;
	}
	#parse() {
		const raw = this.#request.headers.get("cookie");
		if (!raw) return;
		this.#requestValues = parseCookie(raw, { decode: identity });
	}
};
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/cookies/response.js
var astroCookiesSymbol = Symbol.for("astro.cookies");
function attachCookiesToResponse(response, cookies) {
	Reflect.set(response, astroCookiesSymbol, cookies);
}
function getCookiesFromResponse(response) {
	let cookies = Reflect.get(response, astroCookiesSymbol);
	if (cookies != null) return cookies;
	else return;
}
function* getSetCookiesFromResponse(response) {
	const cookies = getCookiesFromResponse(response);
	if (!cookies) return [];
	for (const headerValue of cookies.consume()) yield headerValue;
	return [];
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/routing/pattern.js
function getPattern(segments, base, addTrailingSlash) {
	const pathname = segments.map((segment) => {
		if (segment.length === 1 && segment[0].spread) return "(?:\\/(.*?))?";
		else return "\\/" + segment.map((part) => {
			if (part.spread) return "(.*?)";
			else if (part.dynamic) return "([^/]+?)";
			else return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		}).join("");
	}).join("");
	const trailing = addTrailingSlash && segments.length ? getTrailingSlashPattern(addTrailingSlash) : "$";
	let initial = "\\/";
	if (addTrailingSlash === "never" && base !== "/" && pathname !== "") initial = "";
	return new RegExp(`^${pathname || initial}${trailing}`);
}
function getTrailingSlashPattern(addTrailingSlash) {
	if (addTrailingSlash === "always") return "\\/$";
	if (addTrailingSlash === "never") return "$";
	return "\\/?$";
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/render/slots.js
function getFunctionExpression(slot) {
	if (!slot) return;
	const expressions = slot?.expressions?.filter((e) => isRenderInstruction(e) === false || isRenderTemplateResult(e));
	if (expressions?.length !== 1) return;
	const expression = expressions[0];
	if (isRenderTemplateResult(expression)) return getFunctionExpression(expression);
	return expression;
}
var Slots = class {
	#result;
	#slots;
	#logger;
	constructor(result, slots, logger) {
		this.#result = result;
		this.#slots = slots;
		this.#logger = logger;
		if (slots) for (const key of Object.keys(slots)) {
			if (this[key] !== void 0) throw new AstroError({
				...ReservedSlotName,
				message: ReservedSlotName.message(key)
			});
			Object.defineProperty(this, key, {
				get() {
					return true;
				},
				enumerable: true
			});
		}
	}
	has(name) {
		if (!this.#slots) return false;
		return Boolean(this.#slots[name]);
	}
	async render(name, args = []) {
		if (!this.#slots || !this.has(name)) return;
		const result = this.#result;
		if (!Array.isArray(args)) this.#logger.warn(null, `Expected second parameter to be an array, received a ${typeof args}. If you're trying to pass an array as a single argument and getting unexpected results, make sure you're passing your array as an item of an array. Ex: Astro.slots.render('default', [["Hello", "World"]])`);
		else if (args.length > 0) {
			const slotValue = this.#slots[name];
			const component = typeof slotValue === "function" ? await slotValue(result) : await slotValue;
			const expression = getFunctionExpression(component);
			if (expression) {
				const slot = async () => typeof expression === "function" ? expression(...args) : expression;
				return await renderSlotToString(result, slot).then((res) => {
					return res;
				});
			}
			if (typeof component === "function") return await renderJSX(result, component(...args)).then((res) => res != null ? String(res) : res);
		}
		const content = await renderSlotToString(result, this.#slots[name]);
		return chunkToString(result, content);
	}
};
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/i18n/fallback.js
/**
* Compute fallback route for failed responses.
* Pure function - no APIContext, no Response objects, no URL objects.
*
* This function determines whether a failed request should be redirected or rewritten
* to a fallback locale based on the i18n configuration.
*/
function computeFallbackRoute(options) {
	const { pathname, responseStatus, fallback, fallbackType, locales, defaultLocale, strategy } = options;
	if (responseStatus !== 404) return { type: "none" };
	if (!fallback || Object.keys(fallback).length === 0) return { type: "none" };
	const segments = pathname.split("/");
	const urlLocale = segments.find((segment) => {
		for (const locale of locales) if (typeof locale === "string") {
			if (locale === segment) return true;
		} else if (locale.path === segment) return true;
		return false;
	});
	if (!urlLocale) return { type: "none" };
	if (!Object.keys(fallback).includes(urlLocale)) return { type: "none" };
	const fallbackLocale = fallback[urlLocale];
	const pathFallbackLocale = getPathByLocale(fallbackLocale, locales);
	const localeIndex = segments.indexOf(urlLocale);
	let newPathname;
	if (pathFallbackLocale === defaultLocale && strategy === "pathname-prefix-other-locales") {
		segments.splice(localeIndex, 1);
		newPathname = segments.join("/") || "/";
	} else {
		segments[localeIndex] = pathFallbackLocale;
		newPathname = segments.join("/");
	}
	return {
		type: fallbackType,
		pathname: newPathname
	};
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/i18n/router.js
/**
* Router for i18n routing strategy decisions.
* Determines whether to continue, redirect, or return 404 based on pathname and locale.
*
* This is a pure class that returns decision objects (not HTTP Responses).
* The middleware layer is responsible for converting decisions to HTTP responses.
*/
var I18nRouter = class {
	#strategy;
	#defaultLocale;
	#locales;
	#base;
	#domains;
	constructor(options) {
		this.#strategy = options.strategy;
		this.#defaultLocale = options.defaultLocale;
		this.#locales = options.locales;
		this.#base = options.base === "/" ? "/" : removeTrailingForwardSlash(options.base || "");
		this.#domains = options.domains;
	}
	/**
	* Evaluate routing strategy for a pathname.
	* Returns decision object (not HTTP Response).
	*/
	match(pathname, context) {
		if (this.shouldSkipProcessing(pathname, context)) return { type: "continue" };
		switch (this.#strategy) {
			case "manual": return { type: "continue" };
			case "pathname-prefix-always": return this.matchPrefixAlways(pathname, context);
			case "domains-prefix-always":
				if (this.localeHasntDomain(context.currentLocale, context.currentDomain)) return { type: "continue" };
				return this.matchPrefixAlways(pathname, context);
			case "pathname-prefix-other-locales": return this.matchPrefixOtherLocales(pathname, context);
			case "domains-prefix-other-locales":
				if (this.localeHasntDomain(context.currentLocale, context.currentDomain)) return { type: "continue" };
				return this.matchPrefixOtherLocales(pathname, context);
			case "pathname-prefix-always-no-redirect": return this.matchPrefixAlwaysNoRedirect(pathname, context);
			case "domains-prefix-always-no-redirect":
				if (this.localeHasntDomain(context.currentLocale, context.currentDomain)) return { type: "continue" };
				return this.matchPrefixAlwaysNoRedirect(pathname, context);
			default: return { type: "continue" };
		}
	}
	/**
	* Check if i18n processing should be skipped for this request
	*/
	shouldSkipProcessing(pathname, context) {
		for (const page of STATUS_CODE_PAGES) if (pathname.includes(page)) return true;
		if (pathname.includes("/_server-islands/")) return true;
		if (context.isReroute) return true;
		if (context.routeType && context.routeType !== "page" && context.routeType !== "fallback") return true;
		return false;
	}
	/**
	* Strategy: pathname-prefix-always
	* All locales must have a prefix, including the default locale.
	*/
	matchPrefixAlways(pathname, context) {
		if (pathname === this.#base + "/" || pathname === this.#base) return {
			type: "redirect",
			location: `${this.#base === "/" ? "" : this.#base}/${this.#defaultLocale}`
		};
		if (!context.allowUnprefixedPath && !pathHasLocale(pathname, this.#locales)) return { type: "notFound" };
		return { type: "continue" };
	}
	/**
	* Strategy: pathname-prefix-other-locales
	* Default locale has no prefix, other locales must have a prefix.
	*/
	matchPrefixOtherLocales(pathname, _context) {
		let pathnameContainsDefaultLocale = false;
		for (const segment of pathname.split("/")) if (normalizeTheLocale(segment) === normalizeTheLocale(this.#defaultLocale)) {
			pathnameContainsDefaultLocale = true;
			break;
		}
		if (pathnameContainsDefaultLocale) return {
			type: "notFound",
			location: pathname.replace(`/${this.#defaultLocale}`, "")
		};
		return { type: "continue" };
	}
	/**
	* Strategy: pathname-prefix-always-no-redirect
	* Like prefix-always but allows root to serve instead of redirecting
	*/
	matchPrefixAlwaysNoRedirect(pathname, context) {
		if (pathname === this.#base + "/" || pathname === this.#base) return { type: "continue" };
		if (!context.allowUnprefixedPath && !pathHasLocale(pathname, this.#locales)) return { type: "notFound" };
		return { type: "continue" };
	}
	/**
	* Check if the current locale doesn't belong to the configured domain.
	* Used for domain-based routing strategies.
	*/
	localeHasntDomain(currentLocale, currentDomain) {
		if (!this.#domains || !currentDomain) return false;
		if (!currentLocale) return false;
		const localesForDomain = this.#domains[currentDomain];
		if (!localesForDomain) return true;
		return !localesForDomain.includes(currentLocale);
	}
};
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/i18n/handler.js
/**
* Pure compile from explicit values — used by `astro:i18n`'s manual-mode
* middleware wrapper (`src/i18n/middleware.ts`), which receives the values as
* arguments rather than reading a manifest.
*/
function compileI18n(i18n, base, trailingSlash, format) {
	return {
		config: i18n,
		base,
		trailingSlash,
		format,
		router: new I18nRouter({
			strategy: i18n.strategy,
			defaultLocale: i18n.defaultLocale,
			locales: i18n.locales,
			base,
			domains: i18n.domainLookupTable ? Object.keys(i18n.domainLookupTable).reduce((acc, domain) => {
				const locale = i18n.domainLookupTable[domain];
				if (!acc[domain]) acc[domain] = [];
				acc[domain].push(locale);
				return acc;
			}, {}) : void 0
		})
	};
}
var i18nMemo = createManifestMemo((manifest) => {
	const config = manifest.i18n;
	return config && config.strategy !== "manual" ? compileI18n(config, manifest.base, manifest.trailingSlash, manifest.buildFormat) : null;
});
/**
* The compiled i18n post-processor for a manifest, or `null` when i18n is
* unset or the routing strategy is `manual`.
*/
function getI18n(manifest) {
	return i18nMemo.get(manifest);
}
/**
* Post-processes a rendered `Response` against the compiled i18n
* configuration, as an explicit step in `handleRequest` after the middleware
* chain returns. The manual-strategy public API (`astro:i18n.middleware(...)`)
* wraps this in a middleware-shaped closure.
*/
async function finalizeI18n(compiled, state, response) {
	markFeatureUsed(state.manifest, FetchFeatures.i18n);
	const i18n = compiled.config;
	if (state.skipErrorReroute && typeof i18n.fallback === "undefined") return response;
	if (state.responseRouteType !== "page" && state.responseRouteType !== "fallback") return response;
	const url = state.url;
	const currentLocale = state.computeCurrentLocale();
	const routeData = state.routeData;
	const isPrerendered = routeData.prerender;
	const routerContext = {
		currentLocale,
		currentDomain: url.hostname,
		routeType: state.responseRouteType,
		isReroute: false,
		allowUnprefixedPath: routeData.origin === "external" && !routeData.segments?.[0]?.some((part) => part.dynamic)
	};
	const routeDecision = compiled.router.match(url.pathname, routerContext);
	switch (routeDecision.type) {
		case "redirect": {
			let location = routeDecision.location;
			if (shouldAppendForwardSlash(compiled.trailingSlash, compiled.format)) location = appendForwardSlash(location);
			return new Response(null, {
				status: routeDecision.status ?? 302,
				headers: { Location: location }
			});
		}
		case "notFound": {
			if (isPrerendered) {
				const prerenderedRes = new Response(response.body, {
					status: 404,
					headers: response.headers
				});
				state.skipErrorReroute = true;
				if (routeDecision.location) prerenderedRes.headers.set("Location", routeDecision.location);
				return prerenderedRes;
			}
			const headers = new Headers();
			if (routeDecision.location) headers.set("Location", routeDecision.location);
			return new Response(null, {
				status: 404,
				headers
			});
		}
	}
	if (i18n.fallback && i18n.fallbackType) {
		const effectiveStatus = state.responseRouteType === "fallback" ? 404 : response.status;
		const fallbackDecision = computeFallbackRoute({
			pathname: url.pathname,
			responseStatus: effectiveStatus,
			currentLocale,
			fallback: i18n.fallback,
			fallbackType: i18n.fallbackType,
			locales: i18n.locales,
			defaultLocale: i18n.defaultLocale,
			strategy: i18n.strategy,
			base: compiled.base
		});
		switch (fallbackDecision.type) {
			case "redirect": return new Response(null, {
				status: 302,
				headers: { Location: fallbackDecision.pathname + url.search }
			});
			case "rewrite": try {
				return await state.rewrite(fallbackDecision.pathname + url.search);
			} catch {
				break;
			}
		}
	}
	return response;
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/i18n/index.js
/**
* Given a locale (code), it returns its corresponding path
* @param locale
* @param locales
*/
function getPathByLocale(locale, locales) {
	for (const loopLocale of locales) if (typeof loopLocale === "string") {
		if (loopLocale === locale) return loopLocale;
	} else for (const code of loopLocale.codes) if (code === locale) return loopLocale.path;
	throw new AstroError(i18nNoLocaleFoundInPath);
}
/**
* Returns an array of only locales, by picking the `code`
* @param locales
*/
function getAllCodes(locales) {
	const result = [];
	for (const loopLocale of locales) if (typeof loopLocale === "string") result.push(loopLocale);
	else result.push(...loopLocale.codes);
	return result;
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/i18n/utils.js
/**
* Parses the value of the `Accept-Language` header:
*
* More info: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language
*
* Complex example: `fr-CH, fr;q=0.9, en;q=0.8, de;q=0.7, *;q=0.5`
*
*/
function parseLocale(header) {
	if (header === "*") return [{
		locale: header,
		qualityValue: void 0
	}];
	const result = [];
	const localeValues = header.split(",").map((str) => str.trim());
	for (const localeValue of localeValues) {
		const split = localeValue.split(";").map((str) => str.trim());
		const localeName = split[0];
		const qualityValue = split[1];
		if (!split) continue;
		if (qualityValue && qualityValue.startsWith("q=")) {
			const qualityValueAsFloat = Number.parseFloat(qualityValue.slice(2));
			if (Number.isNaN(qualityValueAsFloat) || qualityValueAsFloat > 1) result.push({
				locale: localeName,
				qualityValue: void 0
			});
			else result.push({
				locale: localeName,
				qualityValue: qualityValueAsFloat
			});
		} else result.push({
			locale: localeName,
			qualityValue: void 0
		});
	}
	return result;
}
function sortAndFilterLocales(browserLocaleList, locales) {
	const normalizedLocales = getAllCodes(locales).map(normalizeTheLocale);
	return browserLocaleList.filter((browserLocale) => {
		if (browserLocale.locale !== "*") return normalizedLocales.includes(normalizeTheLocale(browserLocale.locale));
		return true;
	}).sort((a, b) => {
		const qa = a.locale === "*" ? a.qualityValue ?? 0 : a.qualityValue ?? 1;
		return (b.locale === "*" ? b.qualityValue ?? 0 : b.qualityValue ?? 1) - qa;
	});
}
/**
* Set the current locale by parsing the value passed from the `Accept-Header`.
*
* If multiple locales are present in the header, they are sorted by their quality value and the highest is selected as current locale.
*
*/
function computePreferredLocale(request, locales) {
	const acceptHeader = request.headers.get("Accept-Language");
	let result = void 0;
	if (acceptHeader) {
		const firstResult = sortAndFilterLocales(parseLocale(acceptHeader), locales).at(0);
		if (firstResult && firstResult.locale !== "*") {
			outer: for (const currentLocale of locales) if (typeof currentLocale === "string") {
				if (normalizeTheLocale(currentLocale) === normalizeTheLocale(firstResult.locale)) {
					result = currentLocale;
					break;
				}
			} else for (const currentCode of currentLocale.codes) if (normalizeTheLocale(currentCode) === normalizeTheLocale(firstResult.locale)) {
				result = currentCode;
				break outer;
			}
		}
	}
	return result;
}
function computePreferredLocaleList(request, locales) {
	const acceptHeader = request.headers.get("Accept-Language");
	let result = [];
	if (acceptHeader) {
		const browserLocaleList = sortAndFilterLocales(parseLocale(acceptHeader), locales);
		if (browserLocaleList.length === 1 && browserLocaleList.at(0).locale === "*") return getAllCodes(locales);
		else if (browserLocaleList.length > 0) {
			for (const browserLocale of browserLocaleList) for (const loopLocale of locales) if (typeof loopLocale === "string") {
				if (normalizeTheLocale(loopLocale) === normalizeTheLocale(browserLocale.locale)) result.push(loopLocale);
			} else for (const code of loopLocale.codes) if (normalizeTheLocale(code) === normalizeTheLocale(browserLocale.locale)) result.push(code);
		}
	}
	return result;
}
function computeCurrentLocale(pathname, locales, defaultLocale) {
	for (const segment of pathname.split("/").map(normalizeThePath)) for (const locale of locales) if (typeof locale === "string") {
		if (!segment.includes(locale)) continue;
		if (normalizeTheLocale(locale) === normalizeTheLocale(segment)) return locale;
	} else if (locale.path === segment) return locale.codes.at(0);
	else for (const code of locale.codes) if (normalizeTheLocale(code) === normalizeTheLocale(segment)) return code;
	for (const locale of locales) if (typeof locale === "string") {
		if (locale === defaultLocale) return locale;
	} else if (locale.path === defaultLocale) return locale.codes.at(0);
}
/**
* Check if any of the route's resolved param values match a configured locale.
* This handles dynamic routes like `[locale]` or `[...path]` where the locale
* isn't in a static segment of the route pathname.
*/
function computeCurrentLocaleFromParams(params, locales) {
	const byNormalizedCode = /* @__PURE__ */ new Map();
	const byPath = /* @__PURE__ */ new Map();
	for (const locale of locales) if (typeof locale === "string") byNormalizedCode.set(normalizeTheLocale(locale), locale);
	else {
		byPath.set(locale.path, locale.codes[0]);
		for (const code of locale.codes) byNormalizedCode.set(normalizeTheLocale(code), code);
	}
	for (const value of Object.values(params)) {
		if (!value) continue;
		const pathMatch = byPath.get(value);
		if (pathMatch) return pathMatch;
		const codeMatch = byNormalizedCode.get(normalizeTheLocale(value));
		if (codeMatch) return codeMatch;
	}
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/app/prepare-response.js
/**
* Appends cookies written via `Astro.cookie.set()` to the `Set-Cookie` header
* and marks the response as sent.
*
* This is a pure function with no dependencies on the app; it is shared by
* `handleRequest` and the various error handlers.
*/
function prepareResponse(response, { addCookieHeader }) {
	if (addCookieHeader) for (const setCookieHeaderValue of getSetCookiesFromResponse(response)) response.headers.append("set-cookie", setCookieHeaderValue);
	Reflect.set(response, responseSentSymbol$1, true);
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/pages/handler.js
var EMPTY_SLOTS = Object.freeze({});
/**
* Handles dispatch of a matched route (endpoint / redirect / page / fallback)
* at the bottom of the middleware chain. This is a pure dispatch layer — it
* renders whatever route the `FetchState` currently points to without any
* rewrite logic. Rewrites are handled upstream: `executeRewrite()` for
* `Astro.rewrite()` and `handleMiddleware` for `next(payload)`.
*
* `handlePages` is the `next` callback that `handleMiddleware` invokes at
* the end of the middleware chain. Error handlers and the container also
* use it directly for the same dispatch behavior.
*/
async function handlePages(state, ctx) {
	const { logger, streaming } = state;
	state.resetResponseMetadata();
	let response;
	const componentInstance = await state.loadComponentInstance();
	switch (state.routeData.type) {
		case "endpoint":
			response = await renderEndpoint(componentInstance, ctx, state.routeData.prerender, logger, state);
			break;
		case "page": {
			const props = await state.getProps();
			const actionApiContext = state.getActionAPIContext();
			const result = await state.createResult(componentInstance, actionApiContext);
			try {
				response = await renderPage(result, componentInstance?.default, props, state.slots ?? EMPTY_SLOTS, streaming, state.routeData);
			} catch (e) {
				result.cancelled = true;
				throw e;
			}
			state.responseRouteType = "page";
			if (isRoute404(state.routeData.route) || isRoute500(state.routeData.route)) state.skipErrorReroute = true;
			break;
		}
		case "redirect": return new Response(null, {
			status: 404,
			headers: { [ASTRO_ERROR_HEADER]: "true" }
		});
		case "fallback":
			state.responseRouteType = "fallback";
			return new Response(null, { status: 500 });
	}
	const responseCookies = getCookiesFromResponse(response);
	if (responseCookies) state.cookies.merge(responseCookies);
	state.response = response;
	return response;
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/routing/match.js
/** Find matching route from pathname */
function matchRoute$1(pathname, manifest) {
	if (isRoute404(pathname)) {
		const errorRoute = manifest.routes.find((route) => isRoute404(route.route));
		if (errorRoute) return errorRoute;
	}
	if (isRoute500(pathname)) {
		const errorRoute = manifest.routes.find((route) => isRoute500(route.route));
		if (errorRoute) return errorRoute;
	}
	return manifest.routes.find((route) => {
		return route.pattern.test(pathname) || route.fallbackRoutes.some((fallbackRoute) => fallbackRoute.pattern.test(pathname));
	});
}
/**
* Determines if the given route matches a 404 or 500 error page.
*
* @param {RouteData} route - The route data to check.
* @returns {boolean} `true` if the route matches a 404 or 500 error page; otherwise, `false`.
*/
function isRoute404or500(route) {
	return isRoute404(route.route) || isRoute500(route.route);
}
/**
* Determines if a given route is associated with the server island component.
*
* @param {RouteData} route - The route data object to evaluate.
* @return {boolean} Returns true if the route's component is the server island component; otherwise, false.
*/
function isRouteServerIsland(route) {
	return route.component === SERVER_ISLAND_COMPONENT;
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/routing/astro-designed-error-pages.js
function ensure404Route(manifest) {
	if (!manifest.routes.some((route) => isRoute404(route.route))) manifest.routes.push(DEFAULT_404_ROUTE);
	return manifest;
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/routing/priority.js
/**
* Comparator for sorting routes in resolution order.
*
* The routes are sorted in by the following rules in order, following the first rule that
* applies:
* - More specific routes are sorted before less specific routes. Here, "specific" means
*   the number of segments in the route, so a parent route is always sorted after its children.
*   For example, `/foo/bar` is sorted before `/foo`.
*   Index routes, originating from a file named `index.astro`, are considered to have one more
*   segment than the URL they represent.
* - Static routes are sorted before dynamic routes.
*   For example, `/foo/bar` is sorted before `/foo/[bar]`.
* - Dynamic routes with single parameters are sorted before dynamic routes with rest parameters.
*   For example, `/foo/[bar]` is sorted before `/foo/[...bar]`.
* - Prerendered routes are sorted before non-prerendered routes.
* - Endpoints are sorted before pages.
*   For example, a file `/foo.ts` is sorted before `/bar.astro`.
* - If both routes are equal regarding all previous conditions, they are sorted alphabetically.
*   For example, `/bar` is sorted before `/foo`.
*   The definition of "alphabetically" is dependent on the default locale of the running system.
*/
function routeComparator(a, b) {
	const commonLength = Math.min(a.segments.length, b.segments.length);
	for (let index = 0; index < commonLength; index++) {
		const aSegment = a.segments[index];
		const bSegment = b.segments[index];
		const aIsStatic = aSegment.every((part) => !part.dynamic && !part.spread);
		const bIsStatic = bSegment.every((part) => !part.dynamic && !part.spread);
		if (aIsStatic && bIsStatic) {
			const aContent = aSegment.map((part) => part.content).join("");
			const bContent = bSegment.map((part) => part.content).join("");
			if (aContent !== bContent) return aContent.localeCompare(bContent);
		}
		if (aIsStatic !== bIsStatic) return aIsStatic ? -1 : 1;
		const aAllDynamic = aSegment.every((part) => part.dynamic);
		if (aAllDynamic !== bSegment.every((part) => part.dynamic)) return aAllDynamic ? 1 : -1;
		const aHasSpread = aSegment.some((part) => part.spread);
		if (aHasSpread !== bSegment.some((part) => part.spread)) return aHasSpread ? 1 : -1;
	}
	const aLength = a.segments.length;
	const bLength = b.segments.length;
	if (aLength !== bLength) {
		const aEndsInRest = a.segments.at(-1)?.some((part) => part.spread);
		const bEndsInRest = b.segments.at(-1)?.some((part) => part.spread);
		if (aEndsInRest !== bEndsInRest && Math.abs(aLength - bLength) === 1) {
			if (aLength > bLength && aEndsInRest) return 1;
			if (bLength > aLength && bEndsInRest) return -1;
		}
		return aLength > bLength ? -1 : 1;
	}
	if (a.type === "endpoint" !== (b.type === "endpoint")) return a.type === "endpoint" ? -1 : 1;
	return a.route.localeCompare(b.route);
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/routing/router.js
/**
* Matches request pathnames against a route list with base and trailing slash rules.
*/
var Router = class {
	#routes;
	#base;
	#baseWithoutTrailingSlash;
	#buildFormat;
	#trailingSlash;
	constructor(routes, options) {
		this.#routes = [...routes].sort(routeComparator);
		this.#base = normalizeBase(options.base);
		this.#baseWithoutTrailingSlash = removeTrailingForwardSlash(this.#base);
		this.#buildFormat = options.buildFormat;
		this.#trailingSlash = options.trailingSlash;
	}
	/**
	* Match an input pathname against the route list.
	* If allowWithoutBase is true, a non-base-prefixed path is still considered.
	*/
	match(inputPathname, { allowWithoutBase = false } = {}) {
		const normalized = getRedirectForPathname(inputPathname);
		if (normalized.redirect) return {
			type: "redirect",
			location: normalized.redirect,
			status: 301
		};
		if (this.#base !== "/") {
			const baseWithSlash = `${this.#baseWithoutTrailingSlash}/`;
			if (this.#trailingSlash === "always" && (normalized.pathname === this.#baseWithoutTrailingSlash || normalized.pathname === this.#base)) return {
				type: "redirect",
				location: baseWithSlash,
				status: 301
			};
			if (this.#trailingSlash === "never" && normalized.pathname === baseWithSlash) return {
				type: "redirect",
				location: this.#baseWithoutTrailingSlash,
				status: 301
			};
		}
		const baseResult = stripBase(normalized.pathname, this.#base, this.#baseWithoutTrailingSlash, this.#trailingSlash);
		if (!baseResult) {
			if (!allowWithoutBase) return {
				type: "none",
				reason: "outside-base"
			};
		}
		let pathname = baseResult ?? normalized.pathname;
		if (this.#buildFormat === "file") pathname = normalizeFileFormatPathname(pathname);
		const route = this.#routes.find((candidate) => {
			if (candidate.pattern.test(pathname)) return true;
			return candidate.fallbackRoutes.some((fallbackRoute) => fallbackRoute.pattern.test(pathname));
		});
		if (!route) return {
			type: "none",
			reason: "no-match"
		};
		return {
			type: "match",
			route,
			params: getParams(route, pathname),
			pathname
		};
	}
	/**
	* Returns all routes that match the given pathname, in priority order.
	* Used when the first match (e.g. a prerendered route) cannot serve
	* the request and subsequent matches need to be tried.
	*/
	matchAll(inputPathname, { allowWithoutBase = false } = {}) {
		const normalized = getRedirectForPathname(inputPathname);
		if (normalized.redirect) return [];
		const baseResult = stripBase(normalized.pathname, this.#base, this.#baseWithoutTrailingSlash, this.#trailingSlash);
		if (!baseResult && !allowWithoutBase) return [];
		let pathname = baseResult ?? normalized.pathname;
		if (this.#buildFormat === "file") pathname = normalizeFileFormatPathname(pathname);
		return this.#routes.filter((candidate) => {
			if (candidate.pattern.test(pathname)) return true;
			return candidate.fallbackRoutes.some((fallbackRoute) => fallbackRoute.pattern.test(pathname));
		});
	}
};
/**
* Normalize a base path to a leading-slash form.
*/
function normalizeBase(base) {
	if (!base) return "/";
	if (base === "/") return base;
	return prependForwardSlash(base);
}
/**
* Provide a redirect target for pathnames that need correction.
* - Ensures a leading slash.
* - Collapses multiple leading slashes into a single slash redirect.
*/
function getRedirectForPathname(pathname) {
	let value = prependForwardSlash(pathname);
	if (value.startsWith("//")) return {
		pathname: value,
		redirect: `/${value.replace(/^\/+/, "")}`
	};
	return { pathname: value };
}
/**
* Strip the configured base from the pathname and account for trailing slash policies.
* Returns null if the pathname is outside the base or should be redirected elsewhere.
*/
function stripBase(pathname, base, baseWithoutTrailingSlash, trailingSlash) {
	if (base === "/") return pathname;
	const baseWithSlash = `${baseWithoutTrailingSlash}/`;
	if (pathname === baseWithoutTrailingSlash || pathname === base) return trailingSlash === "always" ? null : "/";
	if (pathname === baseWithSlash) return trailingSlash === "never" ? null : "/";
	if (pathname.startsWith(baseWithSlash)) return pathname.slice(baseWithoutTrailingSlash.length);
	return null;
}
/**
* Normalize file-format pathnames by removing .html and /index.html suffixes.
*/
function normalizeFileFormatPathname(pathname) {
	if (pathname.endsWith("/index.html")) {
		const trimmed = pathname.slice(0, -11);
		return trimmed === "" ? "/" : trimmed;
	}
	if (pathname.endsWith(".html")) {
		const trimmed = pathname.slice(0, -5);
		return trimmed === "" ? "/" : trimmed;
	}
	return pathname;
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/routing/route-table.js
function compileRouteTable(manifest, routes) {
	const routesList = ensure404Route({ routes });
	const router = new Router(routesList.routes, {
		base: manifest.base,
		trailingSlash: manifest.trailingSlash,
		buildFormat: manifest.buildFormat
	});
	return {
		routes: routesList.routes,
		router
	};
}
var routeTables = createManifestMemo((manifest) => compileRouteTable(manifest, (manifest.routes ?? []).map((route) => route.routeData)));
/**
* The route table for a manifest: the derived route list (with the default
* 404 ensured) and the compiled router. All route reads — matching, rewrites,
* custom-404 fallbacks, `manifestData` accessors — go through this single
* entry so dev HMR updates are visible to every consumer at once.
*/
function getRouteTable(manifest) {
	return routeTables.get(manifest);
}
/**
* Atomically replaces the route table for a manifest (dev `astro:routes-updated`).
* Runs `ensure404Route` on the new list, compiles a fresh `Router`, and swaps
* the memo entry in one step, so no consumer can observe a half-updated table.
*/
function updateRouteTable(manifest, routes) {
	routeTables.set(manifest, compileRouteTable(manifest, [...routes]));
}
/**
* Low-level route matching against the manifest routes. Returns the matched
* `RouteData` or `undefined`. Does not filter prerendered routes or check
* public assets — use the app-level match for that.
*/
function matchRoute(manifest, pathname) {
	const match = getRouteTable(manifest).router.match(pathname, { allowWithoutBase: true });
	if (match.type !== "match") return void 0;
	return match.route;
}
/**
* Returns all routes matching the given pathname, in priority order. Used when
* the first match cannot serve the request (e.g. a prerendered dynamic route
* that doesn't cover this specific path) and the caller needs to try
* subsequent matches.
*/
function matchAllRoutes(manifest, pathname) {
	return getRouteTable(manifest).router.matchAll(pathname, { allowWithoutBase: true });
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/cache/provider.js
var cacheProviderMemo = createAsyncManifestMemo(async (manifest) => {
	if (manifest.cacheProvider) {
		const factory = (await manifest.cacheProvider())?.default || null;
		return factory ? factory(manifest.cacheConfig?.options) : null;
	}
	return null;
});
/** Resolves the cache provider from the manifest, `null` when none. */
function getCacheProvider(manifest) {
	return cacheProviderMemo.get(manifest);
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/cache/runtime/utils.js
/**
* Generate default cache response headers from CacheOptions.
* Used when the provider doesn't supply its own `setHeaders()`.
*/
function defaultSetHeaders(options) {
	const headers = new Headers();
	const directives = [];
	if (options.maxAge !== void 0) directives.push(`max-age=${options.maxAge}`);
	if (options.swr !== void 0) directives.push(`stale-while-revalidate=${options.swr}`);
	if (directives.length > 0) headers.set("CDN-Cache-Control", directives.join(", "));
	if (options.tags && options.tags.length > 0) headers.set("Cache-Tag", options.tags.join(", "));
	if (options.lastModified) headers.set("Last-Modified", options.lastModified.toUTCString());
	if (options.etag) headers.set("ETag", options.etag);
	return headers;
}
function isLiveDataEntry(value) {
	return value != null && typeof value === "object" && "id" in value && "data" in value && "cacheHint" in value;
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/cache/runtime/cache.js
var APPLY_HEADERS = Symbol.for("astro:cache:apply");
var IS_ACTIVE = Symbol.for("astro:cache:active");
var AstroCache = class {
	#options = {};
	#tags = /* @__PURE__ */ new Set();
	#disabled = false;
	#provider;
	enabled = true;
	constructor(provider) {
		this.#provider = provider;
	}
	set(input) {
		if (input === false) {
			this.#disabled = true;
			this.#tags.clear();
			this.#options = {};
			return;
		}
		this.#disabled = false;
		let options;
		if (isLiveDataEntry(input)) {
			if (!input.cacheHint) return;
			options = input.cacheHint;
		} else options = input;
		if ("maxAge" in options && options.maxAge !== void 0) this.#options.maxAge = options.maxAge;
		if ("swr" in options && options.swr !== void 0) this.#options.swr = options.swr;
		if ("etag" in options && options.etag !== void 0) this.#options.etag = options.etag;
		if (options.lastModified !== void 0) {
			if (!this.#options.lastModified || options.lastModified > this.#options.lastModified) this.#options.lastModified = options.lastModified;
		}
		if (options.tags) for (const tag of options.tags) this.#tags.add(tag);
	}
	get tags() {
		return [...this.#tags];
	}
	/**
	* Get the current cache options (read-only snapshot).
	* Includes all accumulated options: maxAge, swr, tags, etag, lastModified.
	*/
	get options() {
		return {
			...this.#options,
			tags: this.tags
		};
	}
	async invalidate(input) {
		if (!this.#provider) throw new AstroError(CacheNotEnabled);
		let options;
		if (isLiveDataEntry(input)) options = { tags: input.cacheHint?.tags ?? [] };
		else options = input;
		return this.#provider.invalidate(options);
	}
	/** @internal */
	[APPLY_HEADERS](response, request) {
		if (this.#disabled) return;
		const finalOptions = {
			...this.#options,
			tags: this.tags
		};
		if (finalOptions.maxAge === void 0 && !finalOptions.tags?.length) return;
		const headers = this.#provider?.setHeaders?.(finalOptions, request) ?? defaultSetHeaders(finalOptions);
		for (const [key, value] of headers) response.headers.set(key, value);
		if (!response.headers.has("Cache-Control") && !response.headers.has("Expires") && (response.headers.has("Last-Modified") || response.headers.has("ETag"))) response.headers.set("Cache-Control", "no-cache");
	}
	/** @internal */
	get [IS_ACTIVE]() {
		return !this.#disabled && (this.#options.maxAge !== void 0 || this.#tags.size > 0);
	}
};
/**
* Apply cache headers to a response.
*/
function applyCacheHeaders(cache, response, request) {
	if (APPLY_HEADERS in cache) cache[APPLY_HEADERS](response, request);
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/cache/runtime/noop.js
/**
* A no-op cache implementation used in dev mode when cache is configured.
* The API is available so user code doesn't need conditional checks,
* but nothing is actually cached.
*/
var EMPTY_OPTIONS = Object.freeze({ tags: [] });
var NoopAstroCache = class {
	enabled = false;
	set() {}
	get tags() {
		return [];
	}
	get options() {
		return EMPTY_OPTIONS;
	}
	async invalidate() {}
};
var hasWarned = false;
/**
* A no-op cache used when cache is not configured.
* Logs a warning on first use instead of throwing, so libraries
* can call cache methods without needing try/catch.
* `invalidate()` still throws since it implies the caller
* expects purging to actually work.
*/
var DisabledAstroCache = class {
	enabled = false;
	#logger;
	constructor(logger) {
		this.#logger = logger;
	}
	#warn() {
		if (!hasWarned) {
			hasWarned = true;
			this.#logger?.warn("cache", "`cache.set()` was called but caching is not enabled. Configure a cache provider in your Astro config under `cache` to enable caching.");
		}
	}
	set() {
		this.#warn();
	}
	get tags() {
		return [];
	}
	get options() {
		return EMPTY_OPTIONS;
	}
	async invalidate() {
		throw new AstroError(CacheNotEnabled);
	}
};
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/routing/parts.js
var ROUTE_DYNAMIC_SPLIT = /\[(.+?\(.+?\)|.+?)\]/;
var ROUTE_SPREAD = /^\.{3}.+$/;
function getParts(part, file) {
	const result = [];
	part.split(ROUTE_DYNAMIC_SPLIT).map((str, i) => {
		if (!str) return;
		const dynamic = i % 2 === 1;
		const [, content] = dynamic ? /([^(]+)$/.exec(str) || [null, null] : [null, str];
		if (!content || dynamic && !/^(?:\.\.\.)?[\w$]+$/.test(content)) throw new Error(`Invalid route ${file} — parameter name must match /^[a-zA-Z0-9_$]+$/`);
		result.push({
			content,
			dynamic,
			spread: dynamic && ROUTE_SPREAD.test(content)
		});
	});
	return result;
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/cache/runtime/route-matching.js
/**
* Compile config-level cache route patterns into RegExps.
* The result is memoized on the pipeline — this function is only called once,
* on the first request that needs route matching.
* Returns compiled patterns sorted by Astro's standard route priority (most specific first).
*/
function compileCacheRoutes(routes, base, trailingSlash) {
	const compiled = Object.entries(routes).map(([path, options]) => {
		const segments = removeLeadingForwardSlash(path).split("/").filter(Boolean).map((s) => getParts(s, path));
		return {
			pattern: getPattern(segments, base, trailingSlash),
			options,
			segments,
			route: path
		};
	});
	compiled.sort((a, b) => routeComparator({
		segments: a.segments,
		route: a.route,
		type: "page"
	}, {
		segments: b.segments,
		route: b.route,
		type: "page"
	}));
	return compiled;
}
/**
* Called per-request to find the first matching cache rule for a given pathname.
*/
function matchCacheRoute(pathname, compiledRoutes) {
	for (const route of compiledRoutes) if (route.pattern.test(pathname)) return route.options;
	return null;
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/cache/handler.js
var CACHE_KEY = "cache";
/**
* Registers a cache provider on the given `FetchState`. When
* `state.resolve('cache')` is first called, the appropriate cache
* implementation is created (disabled, noop for dev, or real).
*
* Returns synchronously when cache is not configured or in dev mode.
*/
function provideCache(state) {
	const manifest = state.manifest;
	if (!manifest.cacheConfig) {
		state.provide(CACHE_KEY, { create: () => new DisabledAstroCache(state.logger) });
		return;
	}
	if (getEnvironment(manifest).runtimeMode === "development") {
		state.provide(CACHE_KEY, { create: () => new NoopAstroCache() });
		return;
	}
	return provideCacheAsync(state, manifest);
}
async function provideCacheAsync(state, manifest) {
	const cacheProvider = await getCacheProvider(manifest);
	state.provide(CACHE_KEY, { create() {
		const cache = new AstroCache(cacheProvider);
		if (manifest.cacheConfig?.routes) {
			const matched = matchCacheRoute(state.pathname, getCompiledCacheRoutes(manifest));
			if (matched) cache.set(matched);
		}
		return cache;
	} });
}
/**
* Wraps a render callback with cache provider logic. Handles both
* runtime caching (onRequest) and CDN-based providers (headers only).
*
* - When a cache provider with `onRequest` is configured, the callback
*   is wrapped so the provider can serve from cache or fall through.
* - When only CDN headers are needed, the callback runs directly and
*   cache headers are applied to the response.
* - When no cache provider is configured, the callback runs as-is.
*
* Cache headers (`CDN-Cache-Control`, `Cache-Tag`) are stripped from
* the final response after the runtime provider has read them.
*/
async function handleCache(state, next) {
	markFeatureUsed(state.manifest, FetchFeatures.cache);
	if (!state.manifest.cacheProvider) return next();
	const cache = state.resolve(CACHE_KEY);
	const cacheProvider = await getCacheProvider(state.manifest);
	if (cacheProvider?.onRequest) {
		const response = await cacheProvider.onRequest({
			request: state.request,
			url: new URL(state.request.url),
			waitUntil: state.renderOptions.waitUntil,
			logger: {
				info(msg) {
					state.logger.info("cache", msg);
				},
				warn(msg) {
					state.logger.warn("cache", msg);
				},
				error(msg) {
					state.logger.error("cache", msg);
				}
			}
		}, async () => {
			const res = await next();
			applyCacheHeaders(cache, res, state.request);
			return res;
		});
		response.headers.delete("CDN-Cache-Control");
		response.headers.delete("Cache-Tag");
		return response;
	}
	const response = await next();
	applyCacheHeaders(cache, response, state.request);
	return response;
}
var compiledCacheRoutesMemo = createManifestMemo((manifest) => manifest.cacheConfig?.routes ? compileCacheRoutes(manifest.cacheConfig.routes, manifest.base, manifest.trailingSlash) : []);
/**
* Config-level cache routes compiled from `manifest.cacheConfig`, derived
* lazily on the first cache-seeded request.
*/
function getCompiledCacheRoutes(manifest) {
	return compiledCacheRoutesMemo.get(manifest);
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/session/provider-disabled.js
function provideSession(state) {
	markFeatureUsed(state.manifest, FetchFeatures.sessions);
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/app/validate-headers.js
/**
* Parses a potentially comma-separated multi-value header (as produced by
* proxy chains) and returns the first value, trimmed of whitespace.
* Returns `undefined` when the header is absent or empty.
*/
function getFirstForwardedValue$1(multiValueHeader) {
	return multiValueHeader?.toString().split(",").map((e) => e.trim())[0];
}
/**
* Sanitize a hostname by rejecting any with path separators.
* Prevents path injection attacks. Invalid hostnames return undefined.
*/
function sanitizeHost(hostname) {
	if (!hostname) return void 0;
	if (/[/\\]/.test(hostname)) return void 0;
	return hostname;
}
/**
* Parse a host string into hostname and port components. Returns `undefined`
* for a host that carries more than a single `hostname:port` pair (e.g.
* `example.com:8080:8080`), which is not a valid host and would otherwise be
* accepted by inspecting only the first two segments.
*/
function parseHost(host) {
	const parts = host.split(":");
	if (parts.length > 2) return void 0;
	return {
		hostname: parts[0],
		port: parts[1]
	};
}
/**
* Check if a host matches any of the allowed domain patterns.
* Assumes hostname and port are already sanitized/parsed.
*/
function matchesAllowedDomains(hostname, protocol, port, allowedDomains) {
	const urlString = `${protocol}://${port ? `${hostname}:${port}` : hostname}`;
	if (!URL.canParse(urlString)) return false;
	const testUrl = new URL(urlString);
	return allowedDomains.some((pattern) => matchPattern(testUrl, pattern));
}
/**
* Validate a host against allowedDomains.
* Returns the host only if it matches an allowed pattern; otherwise, undefined.
* This prevents SSRF attacks by ensuring the Host header is trusted.
*/
function validateHost(host, protocol, allowedDomains) {
	if (!host || host.length === 0) return void 0;
	if (!allowedDomains || allowedDomains.length === 0) return void 0;
	const sanitized = sanitizeHost(host);
	if (!sanitized) return void 0;
	const parsed = parseHost(sanitized);
	if (!parsed) return void 0;
	const { hostname, port } = parsed;
	if (matchesAllowedDomains(hostname, protocol, port, allowedDomains)) return sanitized;
}
/**
* Validate forwarded headers (proto, host, port) against allowedDomains.
* Returns validated values or undefined for rejected headers.
* Uses strict defaults: http/https only for proto, rejects port if not in allowedDomains.
*/
function validateForwardedHeaders(forwardedProtocol, forwardedHost, forwardedPort, allowedDomains) {
	const result = {};
	if (forwardedProtocol) {
		if (allowedDomains && allowedDomains.length > 0) {
			if (allowedDomains.some((pattern) => pattern.protocol !== void 0)) try {
				const testUrl = new URL(`${forwardedProtocol}://example.com`);
				if (allowedDomains.some((pattern) => matchPattern(testUrl, { protocol: pattern.protocol }))) result.protocol = forwardedProtocol;
			} catch {}
			else if (/^https?$/.test(forwardedProtocol)) result.protocol = forwardedProtocol;
		}
	}
	if (forwardedPort && allowedDomains && allowedDomains.length > 0) {
		if (allowedDomains.some((pattern) => pattern.port !== void 0)) {
			if (allowedDomains.some((pattern) => pattern.port === forwardedPort)) result.port = forwardedPort;
		}
	}
	if (forwardedHost && forwardedHost.length > 0 && allowedDomains && allowedDomains.length > 0) {
		const protoForValidation = result.protocol || "https";
		const sanitized = sanitizeHost(forwardedHost);
		const parsed = sanitized ? parseHost(sanitized) : void 0;
		if (sanitized && parsed) {
			const { hostname, port: portFromHost } = parsed;
			if (matchesAllowedDomains(hostname, protoForValidation, result.port || portFromHost, allowedDomains)) result.host = sanitized;
		}
	}
	return result;
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/output-filename.js
function getOutputFilename(buildFormat, name, routeData) {
	if (routeData.type === "endpoint") return name;
	if (name === "/" || name === "") return name === "" ? "index.html" : "/index.html";
	if (buildFormat === "file" || STATUS_CODE_PAGES.has(name)) return `${removeTrailingForwardSlash(name || "index")}.html`;
	if (buildFormat === "preserve" && !routeData.isIndex) return `${removeTrailingForwardSlash(name || "index")}.html`;
	return `${removeTrailingForwardSlash(name)}/index.html`;
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/errors/default-handler.js
/**
* The default error strategy used in production SSR. Attempts to render the
* matching error route (404.astro / 500.astro), falling back to a plain
* response with the given status. Handles prerendered error pages via
* `prerenderedErrorPageFetch`.
*/
async function renderDefaultError(manifest, request, { status, response: originalResponse, skipMiddleware = false, error, pathname, ...resolvedRenderOptions }) {
	const resolvedPathname = pathname ?? new FetchState(manifest, request).pathname;
	const routeTable = getRouteTable(manifest);
	const errorRouteData = matchRoute$1(getErrorRoutePath(resolvedPathname, status, routeTable.routes, manifest.i18n?.locales, manifest.trailingSlash === "always"), routeTable);
	const url = new URL(request.url);
	if (errorRouteData) {
		if (errorRouteData.prerender) {
			const allowedDomains = manifest.allowedDomains;
			const safeOrigin = validateHost(url.host, url.protocol.replace(":", ""), allowedDomains) ? url.origin : `${url.protocol}//localhost`;
			const statusURL = new URL(`${removeTrailingForwardSlash(manifest.base)}${getOutputFilename(manifest.buildFormat, errorRouteData.route, errorRouteData)}`, safeOrigin);
			if (statusURL.toString() !== request.url && resolvedRenderOptions.prerenderedErrorPageFetch) try {
				const newResponse = mergeResponses(await resolvedRenderOptions.prerenderedErrorPageFetch(statusURL.toString()), originalResponse, {
					status,
					removeContentEncodingHeaders: true
				});
				prepareResponse(newResponse, resolvedRenderOptions);
				return newResponse;
			} catch {
				const response = mergeResponses(new Response(null, { status }), originalResponse);
				prepareResponse(response, resolvedRenderOptions);
				return response;
			}
		}
		const mod = await getEnvironment(manifest).getComponentByRoute(manifest, errorRouteData);
		const errorState = new FetchState(manifest, request);
		errorState.skipMiddleware = skipMiddleware;
		errorState.clientAddress = resolvedRenderOptions.clientAddress;
		errorState.routeData = errorRouteData;
		errorState.pathname = resolvedPathname;
		errorState.status = status;
		errorState.componentInstance = mod;
		errorState.locals = resolvedRenderOptions.locals ?? {};
		errorState.initialProps = { error };
		try {
			await provideSession(errorState);
			await provideCache(errorState);
			const response = await handleMiddleware(errorState, handlePages);
			if (rewroteToEmptyErrorResponse(skipMiddleware, errorRouteData, errorState.routeData, response)) return renderDefaultError(manifest, request, {
				...resolvedRenderOptions,
				status,
				error,
				response: originalResponse,
				skipMiddleware: true,
				pathname: resolvedPathname
			});
			const newResponse = mergeResponses(response, originalResponse);
			prepareResponse(newResponse, resolvedRenderOptions);
			return newResponse;
		} catch {
			if (skipMiddleware === false) return renderDefaultError(manifest, request, {
				...resolvedRenderOptions,
				status,
				error,
				response: originalResponse,
				skipMiddleware: true,
				pathname: resolvedPathname
			});
		} finally {
			await errorState.finalizeAll();
		}
	}
	const response = mergeResponses(new Response(null, { status }), originalResponse);
	prepareResponse(response, resolvedRenderOptions);
	return response;
}
function mergeResponses(newResponse, originalResponse, override) {
	let newResponseHeaders = newResponse.headers;
	if (override?.removeContentEncodingHeaders) {
		newResponseHeaders = new Headers(newResponseHeaders);
		newResponseHeaders.delete("Content-Encoding");
		newResponseHeaders.delete("Content-Length");
	}
	if (!originalResponse) {
		if (override !== void 0) return new Response(newResponse.body, {
			status: override.status,
			statusText: newResponse.statusText,
			headers: newResponseHeaders
		});
		return newResponse;
	}
	const status = override?.status ? override.status : originalResponse.status === 200 ? newResponse.status : originalResponse.status;
	try {
		originalResponse.headers.delete("Content-type");
		originalResponse.headers.delete("Content-Length");
		originalResponse.headers.delete("Transfer-Encoding");
	} catch {}
	const newHeaders = new Headers();
	const seen = /* @__PURE__ */ new Set();
	for (const [name, value] of originalResponse.headers) {
		newHeaders.append(name, value);
		seen.add(name.toLowerCase());
	}
	for (const [name, value] of newResponseHeaders) {
		const lower = name.toLowerCase();
		if (!seen.has(lower) || lower === "set-cookie") newHeaders.append(name, value);
	}
	const mergedResponse = new Response(newResponse.body, {
		status,
		statusText: status === 200 ? newResponse.statusText : originalResponse.statusText,
		headers: newHeaders
	});
	const originalCookies = getCookiesFromResponse(originalResponse);
	const newCookies = getCookiesFromResponse(newResponse);
	if (originalCookies) {
		if (newCookies) originalCookies.merge(newCookies);
		attachCookiesToResponse(mergedResponse, originalCookies);
	} else if (newCookies) attachCookiesToResponse(mergedResponse, newCookies);
	return mergedResponse;
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/errors/build-handler.js
/**
* The error strategy used during static build / prerendering.
*
* - For 500 errors, returns the original response if present, otherwise
*   throws so the build surfaces the underlying error to the developer.
* - For other errors (e.g. 404), delegates to `renderDefaultError` with
*   `prerenderedErrorPageFetch` cleared (the build pipeline can't fetch
*   prerendered pages the way production SSR can).
*/
async function renderBuildError(manifest, request, options) {
	if (options.status === 500) {
		if (options.response) return options.response;
		throw options.error;
	}
	return renderDefaultError(manifest, request, {
		...options,
		prerenderedErrorPageFetch: void 0
	});
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/errors/dev-handler.js
/**
* The dev-server error strategy. Renders custom 404/500 routes if the user
* has them, otherwise throws so Vite's dev overlay is shown. Shared between
* the Vite dev server and the non-runnable dev pipeline; only
* `shouldInjectCspMetaTags` differs between them (carried by the
* environment record's `injectCspMetaTagsOnErrorPages` static).
*/
async function renderDevError(manifest, request, { skipMiddleware = false, error, status, response: _response, pathname, ...resolvedRenderOptions }, { shouldInjectCspMetaTags }) {
	if (isAstroError(error) && [MiddlewareNoDataOrNextCalled.name, MiddlewareNotAResponse.name].includes(error.name)) throw error;
	const resolvedPathname = pathname ?? new FetchState(manifest, request).pathname;
	const renderRoute = async (routeData) => {
		try {
			const preloadedComponent = await getEnvironment(manifest).getComponentByRoute(manifest, routeData);
			const errorState = new FetchState(manifest, request);
			errorState.skipMiddleware = skipMiddleware;
			errorState.clientAddress = resolvedRenderOptions.clientAddress;
			errorState.shouldInjectCspMetaTags = shouldInjectCspMetaTags ? !!manifest.csp : false;
			errorState.routeData = routeData;
			errorState.pathname = resolvedPathname;
			errorState.status = status;
			errorState.componentInstance = preloadedComponent;
			errorState.locals = resolvedRenderOptions.locals ?? {};
			errorState.initialProps = { error };
			await provideCache(errorState);
			const response = await handleMiddleware(errorState, handlePages);
			if (rewroteToEmptyErrorResponse(skipMiddleware, routeData, errorState.routeData, response)) return renderDevError(manifest, request, {
				...resolvedRenderOptions,
				status,
				error,
				skipMiddleware: true,
				pathname: resolvedPathname
			}, { shouldInjectCspMetaTags });
			if (error) getLogger(manifest).error("router", error.stack || error.message);
			return response;
		} catch (_err) {
			if (skipMiddleware === false) return renderDevError(manifest, request, {
				...resolvedRenderOptions,
				status: 500,
				skipMiddleware: true,
				error: _err,
				pathname: resolvedPathname
			}, { shouldInjectCspMetaTags });
			throw _err;
		}
	};
	if (status === 404) {
		const custom404 = getCustom404Route(getRouteTable(manifest));
		if (custom404) return renderRoute(custom404);
	}
	const custom500 = getCustom500Route(getRouteTable(manifest));
	if (!custom500) throw error;
	else return renderRoute(custom500);
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/errors/handler.js
/**
* Renders the error page (404.astro / 500.astro or a plain response) for a
* request, dispatching to the strategy the manifest's environment selects:
* production/container default, dev (overlay + custom error routes, with or
* without CSP meta-tag injection), or build (500s throw so the build fails).
*/
function renderErrorPage(manifest, request, options) {
	const env = getEnvironment(manifest);
	switch (env.errorStrategy) {
		case "dev": return renderDevError(manifest, request, options, { shouldInjectCspMetaTags: env.injectCspMetaTagsOnErrorPages });
		case "build": return renderBuildError(manifest, request, options);
		case "default": return renderDefaultError(manifest, request, options);
	}
}
/**
* Dispatches an internal error render for a request flowing through the
* handler chain: through the facade's late-bound `renderError` hook when the
* state was built by `BaseApp.render`'s fast path (preserving instance
* overrides/reassignments, e.g. cloudflare's prerender-error propagation),
* else through the environment's strategy via {@link renderErrorPage}.
*/
function renderErrorFromState(state, request, options) {
	if (state.renderError) return state.renderError(request, options);
	return renderErrorPage(state.manifest, request, options);
}
/**
* Whether a middleware rewrite (`ctx.rewrite()` / `next(payload)`) issued while
* rendering the error page dead-ended in another empty reroutable (404/500)
* response. The rewrite swaps the state's routeData away from the error route,
* so returning that render as-is would produce a blank page; the error handler
* should instead retry rendering the error page without middleware.
*
* @param skipMiddleware Whether middleware was already skipped for this render.
* @param errorRouteData The error route matched before middleware ran.
* @param renderedRouteData The route data on the state after middleware ran.
* @param response The response produced by the middleware-driven render.
*/
function rewroteToEmptyErrorResponse(skipMiddleware, errorRouteData, renderedRouteData, response) {
	return skipMiddleware === false && renderedRouteData !== errorRouteData && response.body === null && REROUTABLE_STATUS_CODES.includes(response.status);
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/middleware/callMiddleware.js
/**
* Utility function that is in charge of calling the middleware.
*
* It accepts a `R` generic, which usually is the `Response` returned.
* It is a generic because endpoints can return a different payload.
*
* When calling a middleware, we provide a `next` function, this function might or
* might not be called.
*
* A middleware, to behave correctly, can:
* - return a `Response`;
* - call `next`;
*
* Failing doing so will result an error. A middleware can call `next` and do not return a
* response. A middleware cannot call `next` and return a new `Response` from scratch (maybe with a redirect).
*
* ```js
* const onRequest = async (context, next) => {
*   const response = await next(context);
*   return response;
* }
* ```
*
* ```js
* const onRequest = async (context, next) => {
*   context.locals = "foo";
*   next();
* }
* ```
*
* @param onRequest The function called which accepts a `context` and a `resolve` function
* @param apiContext The API context
* @param responseFunction A callback function that should return a promise with the response
*/
async function callMiddleware(onRequest, apiContext, responseFunction) {
	let nextCalled = false;
	let responseFunctionPromise = void 0;
	const next = async (payload) => {
		nextCalled = true;
		responseFunctionPromise = responseFunction(apiContext, payload);
		return responseFunctionPromise;
	};
	const middlewarePromise = onRequest(apiContext, next);
	return await Promise.resolve(middlewarePromise).then(async (value) => {
		if (nextCalled) {
			/**
			* Then we check if a value is returned. If so, we need to return the value returned by the
			* middleware.
			* e.g.
			* ```js
			* 	const response = await next();
			* 	const new Response(null, { status: 500, headers: response.headers });
			* ```
			*/
			if (typeof value !== "undefined") {
				if (value instanceof Response === false) throw new AstroError(MiddlewareNotAResponse);
				return value;
			} else if (responseFunctionPromise) return responseFunctionPromise;
			else throw new AstroError(MiddlewareNotAResponse);
		} else if (typeof value === "undefined")
 /**
		* There might be cases where `next` isn't called and the middleware **must** return
		* something.
		*
		* If not thing is returned, then we raise an Astro error.
		*/
		throw new AstroError(MiddlewareNoDataOrNextCalled);
		else if (value instanceof Response === false) throw new AstroError(MiddlewareNotAResponse);
		else return value;
	});
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/middleware/load.js
var resolvedMiddleware = /* @__PURE__ */ new WeakMap();
var middlewareMemo = createAsyncManifestMemo(async (manifest) => {
	let handler;
	if (manifest.middleware) {
		const internalMiddlewares = [(await manifest.middleware()).onRequest ?? NOOP_MIDDLEWARE_FN];
		if (manifest.checkOrigin) internalMiddlewares.unshift(createOriginCheckMiddleware());
		handler = sequence(...internalMiddlewares);
	} else handler = NOOP_MIDDLEWARE_FN;
	resolvedMiddleware.set(manifest, handler);
	return handler;
});
/**
* Resolves the middleware from the manifest and returns the `onRequest`
* function (prefixed with the origin-check middleware when configured). If
* `onRequest` isn't there, it returns a no-op function.
*/
function getMiddleware(manifest) {
	return middlewareMemo.get(manifest);
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/middleware/astro-middleware.js
/**
* Runs Astro's middleware chain (origin check + user `onRequest`) for a
* single render, reading the composed middleware from the manifest and
* per-request data (componentInstance, slots, props, API contexts) off the
* supplied `FetchState`. The actual route dispatch (endpoint / redirect /
* page / fallback) is supplied by the caller as `renderRouteCallback` —
* typically `handlePages`.
*/
async function handleMiddleware(state, renderRouteCallback) {
	markFeatureUsed(state.manifest, FetchFeatures.middleware);
	await state.getProps();
	const apiContext = state.getAPIContext();
	state.counter++;
	if (state.counter === 4) return new Response("Loop Detected", {
		status: 508,
		statusText: "Astro detected a loop where you tried to call the rewriting logic more than four times."
	});
	const next = async (ctx, payload) => {
		if (payload) {
			state.logger.debug("router", "Called rewriting to:", payload);
			applyRewriteToState(state, payload, await getEnvironment(state.manifest).tryRewrite(state.manifest, payload, state.request));
		}
		return renderRouteCallback(state, ctx);
	};
	let response;
	if (state.skipMiddleware) response = await next(apiContext);
	else {
		const middleware = await getMiddleware(state.manifest);
		response = await callMiddleware(sequence(middleware), apiContext, next);
	}
	attachCookiesToResponse(response, state.cookies);
	state.response = response;
	return response;
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/util/normalized-url.js
/**
* Creates a normalized URL from a request URL string.
* Decodes and validates the pathname, collapses duplicate slashes.
*/
function createNormalizedUrl(requestUrl) {
	return normalizeUrl(new URL(requestUrl));
}
/**
* Assigns `url.pathname` only when the value differs.
* The setter re-parses the whole URL, so a no-op write is still expensive.
*/
function setPathname(url, pathname) {
	if (url.pathname !== pathname) url.pathname = pathname;
}
/**
* Normalizes an already-parsed URL in place: decodes and validates the
* pathname, collapses duplicate slashes. Returns the same URL object.
*
* Collapse runs after the decode is written back: the pathname setter
* rewrites `\` to `/`, so a decoded backslash only becomes `//` once assigned.
*/
function normalizeUrl(url) {
	try {
		setPathname(url, validateAndDecodePathname(url.pathname));
	} catch {
		try {
			setPathname(url, decodeURI(url.pathname));
		} catch {}
	}
	setPathname(url, collapseDuplicateSlashes(url.pathname));
	return url;
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/rewrites/handler.js
/**
* Validates and applies a rewrite target to the given `FetchState`.
*
* - Validates that SSR→prerender rewrites are not attempted (except
*   for i18n fallback routes).
* - Mutates `state` to reflect the new route: request, URL, cookies,
*   params, pathname, component instance, etc.
* - Invalidates cached API contexts so they're re-derived from the
*   new route.
*
* Called by both `executeRewrite()` (user-triggered `Astro.rewrite`)
* and `handleMiddleware` (middleware `next(payload)`).
*/
function applyRewriteToState(state, payload, { routeData, componentInstance, newUrl, pathname }, { mergeCookies = false } = {}) {
	const oldPathname = state.pathname;
	const isI18nFallback = routeData.fallbackRoutes && routeData.fallbackRoutes.length > 0;
	if (state.manifest.serverLike && !state.routeData.prerender && routeData.prerender && !isI18nFallback) throw new AstroError({
		...ForbiddenRewrite,
		message: ForbiddenRewrite.message(state.pathname, pathname, routeData.component),
		hint: ForbiddenRewrite.hint(routeData.component)
	});
	state.routeData = routeData;
	state.componentInstance = componentInstance;
	if (payload instanceof Request) state.request = payload;
	else state.request = copyRequest(newUrl, state.request, routeData.prerender, state.logger, state.routeData.route);
	state.url = createNormalizedUrl(state.request.url);
	if (mergeCookies) {
		const newCookies = new AstroCookies(state.request, state.logger);
		if (state.cookies) newCookies.merge(state.cookies);
		state.cookies = newCookies;
	}
	state.params = getParams(routeData, pathname);
	state.pathname = pathname;
	state.isRewriting = true;
	state.status = 200;
	setOriginPathname(state.request, oldPathname, state.manifest.trailingSlash, state.manifest.buildFormat);
	state.invalidateContexts();
}
/**
* Executes a user-triggered rewrite (`Astro.rewrite(...)` /
* `ctx.rewrite(...)`) against a `FetchState`. Resolves the rewrite
* target via the environment's `tryRewrite`, validates it, mutates the
* `FetchState` to reflect the new route, and re-runs the middleware
* and page dispatch to produce the new response.
*/
async function executeRewrite(state, payload) {
	state.logger.debug("router", "Calling rewrite: ", payload);
	applyRewriteToState(state, payload, await getEnvironment(state.manifest).tryRewrite(state.manifest, payload, state.request), { mergeCookies: true });
	return handleMiddleware(state, handlePages);
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/i18n/domain.js
/**
* For domain-based i18n routing strategies, derives the locale-prefixed
* pathname from the request's `Host` header rather than its URL. For example,
* a request for `/foo` served from `https://example.fr` resolves to `/fr/foo`.
*
* Returns `undefined` when the strategy isn't domain-based or the host isn't
* mapped to a locale — in which case normal pathname routing applies.
*
*/
function computePathnameFromDomain(request, url, i18n, base, trailingSlash, allowedDomains, logger, pathnameFromRequest) {
	let pathname = void 0;
	if (i18n && (i18n.strategy === "domains-prefix-always" || i18n.strategy === "domains-prefix-other-locales" || i18n.strategy === "domains-prefix-always-no-redirect")) {
		const validated = validateForwardedHeaders(getFirstForwardedValue$1(request.headers.get("X-Forwarded-Proto") ?? void 0), getFirstForwardedValue$1(request.headers.get("X-Forwarded-Host") ?? void 0), getFirstForwardedValue$1(request.headers.get("X-Forwarded-Port") ?? void 0), allowedDomains);
		const protocol = validated.protocol ? `${validated.protocol}:` : url.protocol;
		const requestHost = request.headers.get("Host") ?? void 0;
		const validatedRequestHost = allowedDomains?.length ? validateHost(requestHost, protocol.slice(0, -1), allowedDomains) : requestHost;
		let host = validated.host ?? validatedRequestHost;
		if (host && protocol) {
			host = host.split(":")[0];
			try {
				let locale;
				const hostAsUrl = new URL(`${protocol}//${host}`);
				for (const [domainKey, localeValue] of Object.entries(i18n.domainLookupTable)) {
					const domainKeyAsUrl = new URL(domainKey);
					if (hostAsUrl.host === domainKeyAsUrl.host && hostAsUrl.protocol === domainKeyAsUrl.protocol) {
						locale = localeValue;
						break;
					}
				}
				if (locale) {
					const requestPathname = pathnameFromRequest ?? stripRequestBase(url.pathname, base);
					pathname = prependForwardSlash(joinPaths(normalizeTheLocale(locale), requestPathname));
					if (trailingSlash === "always") pathname = appendForwardSlash(pathname);
					else if (trailingSlash === "never") pathname = removeTrailingForwardSlash(pathname);
					else if (url.pathname.endsWith("/")) pathname = appendForwardSlash(pathname);
				}
			} catch (e) {
				logger.error("router", `Astro tried to parse ${protocol}//${host} as an URL, but it threw a parsing error. Check the X-Forwarded-Host and X-Forwarded-Proto headers.`);
				logger.error("router", `Error: ${e}`);
			}
		}
	}
	return pathname;
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/manifest/derived.js
var sites = createManifestMemo((manifest) => manifest.site ? new URL(manifest.site) : void 0);
/** The manifest's `site` as a `URL` (used for `Astro.site`). */
function getSite(manifest) {
	return sites.get(manifest);
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/server-islands/mappings.js
/**
* The server-island mappings for a manifest. Deliberately NOT memoized: the
* manifest thunk is a module import, which is cheap.
*/
async function getServerIslands(manifest) {
	if (manifest.serverIslandMappings) return manifest.serverIslandMappings();
	return {
		serverIslandMap: /* @__PURE__ */ new Map(),
		serverIslandNameMap: /* @__PURE__ */ new Map()
	};
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/fetch/fetch-state.js
var slotValuesSymbol = Symbol("astro.slotValues");
/**
* Retrieves the `FetchState` stashed on an `APIContext` by
* `FetchState.getAPIContext()`. Throws if not found — this indicates
* the context was not created through Astro's request pipeline.
*/
function getFetchStateFromAPIContext(context) {
	const state = context[fetchStateSymbol];
	if (!state) throw new Error("FetchState not found on APIContext. This is an internal error — the context was not created through Astro's request pipeline.");
	return state;
}
/**
* Holds per-request state as it flows through the handler pipeline.
*
* **This class is user-facing** via `astro/fetch` and `astro/hono`.
* The {@link AstroFetchState} interface defines the stable public
* surface. Members not on that interface are internal and
* may change without notice.
*
* Performance note: fields on this class are plain properties — ES
* private fields (`#foo`) have a non-zero per-access cost in V8
* which is measurable on the hot render path, so `#` is used only
* for rarely-accessed memoized caches and Maps.
*/
var FetchState = class {
	/** The manifest — the single ambient source of static, build-time data. */
	manifest;
	/** The manifest's identity-stable logger, captured once at construction. */
	logger;
	/**
	* Whether page renders stream. From the facade hooks on the fast path,
	* else the environment's default.
	*/
	streaming;
	/**
	* Internal facade hook: late-bound `app.renderError` dispatch. Undefined on
	* bare and custom-handler paths — those fall through to the environment's
	* error strategy (`renderErrorPage`).
	*/
	renderError;
	/**
	* Internal facade hook: late-bound `app.logThisRequest` dispatch. Undefined
	* on bare and custom-handler paths — those fall through to the
	* environment's `logRequest` behavior.
	*/
	logRequest;
	/**
	* The request to render. Mutated during rewrites so subsequent renders
	* see the rewritten URL.
	*/
	request;
	routeData;
	/**
	* The pathname to use for routing and rendering. Starts out as the raw,
	* base-stripped, decoded pathname from the request. May be further
	* normalized by `handleRequest` after routeData is known (in dev, when
	* the matched route has no `.html` extension, `.html` / `/index.html`
	* suffixes are stripped).
	*/
	pathname;
	/** Resolved render options (addCookieHeader, clientAddress, locals, etc.). */
	renderOptions;
	/** When the request started, used to log duration. */
	timeStart;
	/**
	* The route's loaded component module. Set before middleware runs; may
	* be swapped during in-flight rewrites from inside the middleware chain.
	*/
	componentInstance;
	/**
	* Slot overrides supplied by the container API. `undefined` for HTTP
	* requests — `PagesHandler` coalesces to `{}` on read so we don't
	* allocate an empty object per request.
	*/
	slots;
	/**
	* The `Response` produced by handlers, if any. Set after page
	* rendering or middleware completes.
	*/
	response;
	/** Explicitly assigned status; `undefined` until a caller sets one. */
	#status;
	/**
	* Default HTTP status for the rendered response. Callers override
	* before rendering runs (e.g. `handleRequest` sets this from
	* `BaseApp.getDefaultStatusCode`; error handlers set `404` / `500`).
	* Reads `200` until assigned.
	*/
	get status() {
		return this.#status ?? 200;
	}
	set status(value) {
		this.#status = value;
	}
	/**
	* Sets `status` from the matched route (see `getDefaultStatusCode`)
	* unless a caller already assigned one.
	*/
	applyDefaultStatus() {
		if (this.#status === void 0 && this.routeData) this.#status = getDefaultStatusCode(this.manifest, this.routeData, this.pathname);
	}
	/** Whether user middleware should be skipped for this request. */
	skipMiddleware = false;
	/**
	* Set to `true` when the request path was encoded too many times to fully
	* decode (see {@link validateAndDecodePathname}). These requests are
	* rejected with a `400` before middleware or routing run.
	*/
	invalidEncoding = false;
	/** A flag that tells the render content if the rewriting was triggered. */
	isRewriting = false;
	/** A safety net in case of loops (rewrite counter). */
	counter = 0;
	/** Cookies for this request. Created lazily on first access. */
	cookies;
	/** Route params derived from routeData + pathname. Computed lazily. */
	#params;
	get params() {
		if (!this.#params && this.routeData) this.#params = getParams(this.routeData, this.pathname);
		return this.#params;
	}
	set params(value) {
		this.#params = value;
	}
	/** Normalized URL for this request. */
	url;
	/** Client address for this request. */
	clientAddress;
	/** Whether this is a partial render (container API). */
	partial;
	/** Internal metadata about the current response route type. */
	responseRouteType;
	/** Internal flag to prevent rerouting this response to an error page. */
	skipErrorReroute = false;
	/** Whether to inject CSP meta tags. */
	shouldInjectCspMetaTags;
	/** Request-scoped locals object, shared with user middleware. */
	locals = {};
	/**
	* Memoized `props` (see `getProps`). `null` means "not yet computed"
	* — using `null` (rather than `undefined`) keeps the hidden class
	* stable and distinct from a valid-but-empty result.
	*/
	props = null;
	/** Memoized `ActionAPIContext` (see `getActionAPIContext`). */
	actionApiContext = null;
	/** Memoized `APIContext` (see `getAPIContext`). */
	apiContext = null;
	/** Registered context providers keyed by name. Lazy-initialized on first provide(). */
	#providers;
	/** Cached values from resolved providers. Lazy-initialized on first resolve(). */
	#providersResolvedValues;
	/** Cached promise for lazy component instance loading. */
	#componentInstancePromise;
	/** SSR result for the current page render. */
	result;
	/** Initial props (from container/error handler). */
	initialProps = {};
	/** Memoized Astro page partial. */
	#astroPagePartial;
	/**
	* Locale-prefixed pathname derived from the Host header for domain-based
	* i18n routing (e.g. `/en/boats/1/foo`), or `undefined` when the request
	* isn't served from a locale-mapped domain. When set, `this.pathname` is
	* derived from it so locale/param resolution match the route pattern.
	*/
	#domainPathname;
	/** Memoized current locale. */
	#currentLocale;
	/** Memoized preferred locale. */
	#preferredLocale;
	/** Memoized preferred locale list. */
	#preferredLocaleList;
	constructor(manifest, request, options, hooks) {
		this.manifest = manifest;
		this.logger = getLogger(manifest);
		this.streaming = hooks?.streaming ?? getEnvironment(manifest).defaultStreaming(manifest);
		this.renderError = hooks?.renderError;
		this.logRequest = hooks?.logRequest;
		this.request = request;
		options ??= getRenderOptions(request);
		this.routeData = options?.routeData;
		const self = this;
		this.renderOptions = {
			...options ?? {
				addCookieHeader: false,
				clientAddress: void 0,
				prerenderedErrorPageFetch: fetch,
				routeData: void 0,
				waitUntil: void 0
			},
			get locals() {
				return self.locals;
			}
		};
		this.componentInstance = void 0;
		this.slots = void 0;
		const url = new URL(request.url);
		const publicPathname = this.#normalizePathname(url.pathname);
		const pathname = this.#computePathname(publicPathname);
		setPathname(url, publicPathname);
		setPathname(url, collapseDuplicateSlashes(url.pathname));
		const domainPathname = computePathnameFromDomain(request, url, manifest.i18n, manifest.base, manifest.trailingSlash, manifest.allowedDomains, this.logger, pathname);
		if (domainPathname) {
			this.#domainPathname = domainPathname;
			this.pathname = domainPathname;
		} else this.pathname = pathname;
		this.timeStart = performance.now();
		this.clientAddress = options?.clientAddress;
		this.locals = options?.locals ?? {};
		this.url = url;
		this.cookies = new AstroCookies(request, this.logger);
		if (manifest.allowedDomains && manifest.allowedDomains.length > 0 && !this.routeData?.prerender) this.#applyForwardedHeaders();
		if (!Reflect.get(this.request, originPathnameSymbol)) setOriginPathname(this.request, this.pathname, manifest.trailingSlash, manifest.buildFormat);
		this.#resolveRouteData();
	}
	/**
	* Triggers a rewrite. Delegates to the rewrites handler module.
	*/
	rewrite(payload) {
		return executeRewrite(this, payload);
	}
	/**
	* Creates the SSR result for the current page render.
	*/
	async createResult(mod, ctx) {
		const manifest = this.manifest;
		const env = getEnvironment(manifest);
		const { clientDirectives, inlinedScripts, compressHTML } = manifest;
		const renderers = env.getRenderers(manifest);
		const resolve = (specifier) => env.resolve(manifest, specifier);
		const routeData = this.routeData;
		const { links, scripts, styles } = await env.headElements(manifest, routeData);
		const extraStyleHashes = [];
		const extraScriptHashes = [];
		const shouldInjectCspMetaTags = this.shouldInjectCspMetaTags ?? manifest.shouldInjectCspMetaTags;
		const cspAlgorithm = manifest.csp?.algorithm ?? "SHA-256";
		if (shouldInjectCspMetaTags) {
			for (const style of styles) extraStyleHashes.push(await generateCspDigest(style.children, cspAlgorithm));
			for (const script of scripts) extraScriptHashes.push(await generateCspDigest(script.children, cspAlgorithm));
		}
		const componentMetadata = await env.componentMetadata(manifest, routeData) ?? manifest.componentMetadata;
		const headers = new Headers({ "Content-Type": "text/html" });
		const partial = typeof this.partial === "boolean" ? this.partial : Boolean(mod.partial);
		const actionResult = hasActionPayload(this.locals) ? deserializeActionResult(this.locals._actionPayload.actionResult) : void 0;
		const status = this.status;
		const response = {
			status: actionResult?.error ? actionResult?.error.status : status,
			statusText: actionResult?.error ? actionResult?.error.type : "OK",
			get headers() {
				return headers;
			},
			set headers(_) {
				throw new AstroError(AstroResponseHeadersReassigned);
			}
		};
		const state = this;
		const result = {
			base: manifest.base,
			userAssetsBase: manifest.userAssetsBase,
			cancelled: false,
			clientDirectives,
			inlinedScripts,
			componentMetadata,
			compressHTML,
			cookies: this.cookies,
			createAstro: (props, slots) => state.createAstro(result, props, slots, ctx),
			links,
			params: this.params,
			partial,
			pathname: this.pathname,
			renderers,
			resolve,
			response,
			request: this.request,
			scripts,
			styles,
			actionResult,
			async getServerIslandNameMap() {
				return (await getServerIslands(manifest)).serverIslandNameMap ?? /* @__PURE__ */ new Map();
			},
			key: manifest.key,
			trailingSlash: manifest.trailingSlash,
			_metadata: {
				hasHydrationScript: false,
				rendererSpecificHydrationScripts: /* @__PURE__ */ new Set(),
				hasRenderedHead: false,
				renderedScripts: /* @__PURE__ */ new Set(),
				hasDirectives: /* @__PURE__ */ new Set(),
				hasRenderedServerIslandRuntime: false,
				headInTree: false,
				extraHead: [],
				extraStyleHashes,
				extraScriptHashes,
				propagators: /* @__PURE__ */ new Set(),
				routeHasPropagation: false,
				pendingSlotEvaluations: [],
				templateDepth: 0
			},
			cspDestination: manifest.csp?.cspDestination ?? (routeData.prerender ? "meta" : "header"),
			shouldInjectCspMetaTags,
			cspAlgorithm,
			directives: manifest.csp?.directives ? [...manifest.csp.directives] : [],
			scriptHashes: manifest.csp?.scriptHashes ? [...manifest.csp.scriptHashes] : [],
			scriptResources: manifest.csp?.scriptResources ? [...manifest.csp.scriptResources] : [],
			styleHashes: manifest.csp?.styleHashes ? [...manifest.csp.styleHashes] : [],
			styleResources: manifest.csp?.styleResources ? [...manifest.csp.styleResources] : [],
			isStrictDynamic: manifest.csp?.isStrictDynamic ?? false,
			scriptDirective: {
				resources: manifest.csp?.scriptDirective ? [...manifest.csp.scriptDirective.resources] : [],
				hashes: manifest.csp?.scriptDirective ? [...manifest.csp.scriptDirective.hashes] : [],
				strictDynamic: manifest.csp?.scriptDirective?.strictDynamic ?? false
			},
			styleDirective: {
				resources: manifest.csp?.styleDirective ? [...manifest.csp.styleDirective.resources] : [],
				hashes: manifest.csp?.styleDirective ? [...manifest.csp.styleDirective.hashes] : []
			},
			speculationRulesContent: manifest.csp?.speculationRulesContent,
			internalFetchHeaders: manifest.internalFetchHeaders
		};
		this.result = result;
		return result;
	}
	/**
	* Creates the Astro global object for a component render.
	*/
	createAstro(result, props, slotValues, apiContext) {
		let astroPagePartial;
		if (this.isRewriting) this.#astroPagePartial = this.createAstroPagePartial(result, apiContext);
		this.#astroPagePartial ??= this.createAstroPagePartial(result, apiContext);
		astroPagePartial = this.#astroPagePartial;
		const Astro = Object.assign(Object.create(astroPagePartial), {
			props,
			self: null
		});
		Object.defineProperty(Astro, slotValuesSymbol, {
			value: slotValues,
			writable: true,
			configurable: true,
			enumerable: false
		});
		return Astro;
	}
	/**
	* Creates the Astro page-level partial (prototype for Astro global).
	*/
	createAstroPagePartial(result, apiContext) {
		const state = this;
		const { cookies, locals, params, logger, url } = this;
		const { response } = result;
		const redirect = (path, status = 302) => {
			if (state.request[responseSentSymbol$1]) throw new AstroError({ ...ResponseSentError });
			return new Response(null, {
				status,
				headers: { Location: path }
			});
		};
		const rewrite = async (reroutePayload) => {
			return await state.rewrite(reroutePayload);
		};
		const callAction = createCallAction(apiContext);
		const partial = {
			generator: ASTRO_GENERATOR,
			routePattern: this.routeData.route,
			isPrerendered: this.routeData.prerender,
			cookies,
			get slots() {
				const slotsByAstro = result._metadata.slotsByAstro ??= /* @__PURE__ */ new WeakMap();
				let slots = slotsByAstro.get(this);
				if (slots === void 0) {
					slots = new Slots(result, this[slotValuesSymbol] ?? null, logger);
					slotsByAstro.set(this, slots);
				}
				return slots;
			},
			get clientAddress() {
				return state.getClientAddress();
			},
			get currentLocale() {
				return state.computeCurrentLocale();
			},
			params,
			get preferredLocale() {
				return state.computePreferredLocale();
			},
			get preferredLocaleList() {
				return state.computePreferredLocaleList();
			},
			locals,
			redirect,
			rewrite,
			request: this.request,
			response,
			site: getSite(this.manifest),
			getActionResult: createGetActionResult(locals),
			get callAction() {
				return callAction;
			},
			url,
			get originPathname() {
				return getOriginPathname(state.request);
			},
			get csp() {
				return state.getCsp();
			},
			get logger() {
				return astroToRuntimeLogger(logger);
			}
		};
		this.defineProviderGetters(partial);
		return partial;
	}
	getClientAddress() {
		const { clientAddress } = this;
		const routeData = this.routeData;
		if (routeData.prerender) throw new AstroError({
			...PrerenderClientAddressNotAvailable,
			message: PrerenderClientAddressNotAvailable.message(routeData.component)
		});
		if (clientAddress) return clientAddress;
		if (this.manifest.adapterName) throw new AstroError({
			...ClientAddressNotAvailable,
			message: ClientAddressNotAvailable.message(this.manifest.adapterName)
		});
		throw new AstroError(StaticClientAddressNotAvailable);
	}
	getCookies() {
		return this.cookies;
	}
	getCsp() {
		const state = this;
		if (!this.manifest.csp) {
			if (getEnvironment(this.manifest).runtimeMode === "production") this.logger.warn("csp", `context.csp was used when rendering the route ${colors.green(state.routeData.route)}, but CSP was not configured. For more information, see https://docs.astro.build/en/reference/configuration-reference/#securitycsp`);
			return;
		}
		const warnedFallback = /* @__PURE__ */ new Set();
		const warnFallback = (family, kind) => {
			if (kind === "default" || !state.result) return;
			const defaultResources = (family === "script" ? state.result.scriptDirective : state.result.styleDirective).resources.map(normalizeCspResourceEntry).filter((entry) => entry.kind === "default").map((entry) => entry.resource);
			if (defaultResources.length === 0) return;
			const key = `${family}:${kind}`;
			if (warnedFallback.has(key)) return;
			warnedFallback.add(key);
			const general = `${family}-src`;
			const specific = `${general}-${kind === "element" ? "elem" : "attr"}`;
			state.logger.warn("csp", `A resource was added to \`${specific}\`, but \`${general}\` also defines custom resources (${defaultResources.join(" ")}). Because \`${specific}\` overrides \`${general}\` for its scope (browsers do not fall back), those resources will not apply there. Add them to \`${specific}\` as well if needed.`);
		};
		return {
			insertDirective(payload) {
				if (state.result) state.result.directives = pushDirective(state.result.directives, payload);
			},
			insertScriptResource(payload) {
				if (!state.result) return;
				warnFallback("script", normalizeCspResourceEntry(payload).kind);
				state.result.scriptDirective.resources.push(payload);
			},
			insertStyleResource(payload) {
				if (!state.result) return;
				warnFallback("style", normalizeCspResourceEntry(payload).kind);
				state.result.styleDirective.resources.push(payload);
			},
			insertStyleHash(payload) {
				state.result?.styleDirective.hashes.push(payload);
			},
			insertScriptHash(payload) {
				state.result?.scriptDirective.hashes.push(payload);
			}
		};
	}
	computeCurrentLocale() {
		const { url, manifest: { i18n }, routeData } = this;
		if (!i18n || !routeData) return;
		const { defaultLocale, locales, strategy } = i18n;
		const fallbackTo = strategy === "pathname-prefix-other-locales" || strategy === "domains-prefix-other-locales" ? defaultLocale : void 0;
		if (this.#currentLocale) return this.#currentLocale;
		let computedLocale;
		if (isRouteServerIsland(routeData)) {
			let referer = this.request.headers.get("referer");
			if (referer) {
				if (URL.canParse(referer)) referer = new URL(referer).pathname;
				computedLocale = computeCurrentLocale(referer, locales, defaultLocale);
			}
		} else {
			let pathname = routeData.pathname;
			if (this.#domainPathname) pathname = this.pathname;
			else if (url && !routeData.pattern.test(url.pathname)) {
				for (const fallbackRoute of routeData.fallbackRoutes) if (fallbackRoute.pattern.test(url.pathname)) {
					pathname = fallbackRoute.pathname;
					break;
				}
			}
			pathname = pathname && !isRoute404or500(routeData) ? pathname : url.pathname ?? this.pathname;
			computedLocale = computeCurrentLocale(pathname, locales, defaultLocale);
			if (routeData.params.length > 0) {
				const localeFromParams = computeCurrentLocaleFromParams(this.params, locales);
				if (localeFromParams) computedLocale = localeFromParams;
			}
		}
		this.#currentLocale = computedLocale ?? fallbackTo;
		return this.#currentLocale;
	}
	computePreferredLocale() {
		const { manifest: { i18n }, request } = this;
		if (!i18n) return;
		return this.#preferredLocale ??= computePreferredLocale(request, i18n.locales);
	}
	computePreferredLocaleList() {
		const { manifest: { i18n }, request } = this;
		if (!i18n) return;
		return this.#preferredLocaleList ??= computePreferredLocaleList(request, i18n.locales);
	}
	/**
	* Lazily loads the route's component module. Returns the cached
	* instance if already loaded. The promise is cached so concurrent
	* callers share the same load.
	*/
	async loadComponentInstance() {
		if (this.componentInstance) return this.componentInstance;
		if (this.#componentInstancePromise) return this.#componentInstancePromise;
		this.#componentInstancePromise = getEnvironment(this.manifest).getComponentByRoute(this.manifest, this.routeData).then((mod) => {
			this.componentInstance = mod;
			return mod;
		});
		return this.#componentInstancePromise;
	}
	/**
	* Registers a context provider under the given key. Handlers call
	* this to contribute values to the request context (e.g. sessions).
	* The `create` factory is called lazily on the first `resolve(key)`.
	*/
	provide(key, provider) {
		(this.#providers ??= /* @__PURE__ */ new Map()).set(key, provider);
	}
	/**
	* Lazily resolves a provider registered under `key`. Calls
	* `provider.create()` on first access and caches the result.
	* Returns `undefined` if no provider was registered for the key.
	*/
	resolve(key) {
		if (this.#providersResolvedValues?.has(key)) return this.#providersResolvedValues.get(key);
		const provider = this.#providers?.get(key);
		if (!provider) return void 0;
		const value = provider.create();
		(this.#providersResolvedValues ??= /* @__PURE__ */ new Map()).set(key, value);
		return value;
	}
	/**
	* Runs all registered `finalize` callbacks. Should be called after
	* the response is produced, typically in a `finally` block.
	*
	* Returns synchronously (no promise allocation) when nothing needs
	* finalizing — important for the hot path where sessions are not used.
	*/
	finalizeAll() {
		if (!this.#providersResolvedValues || this.#providersResolvedValues.size === 0) return;
		let chain;
		for (const [key, provider] of this.#providers) if (provider.finalize && this.#providersResolvedValues.has(key)) {
			const result = provider.finalize(this.#providersResolvedValues.get(key));
			if (result) chain = chain ? chain.then(() => result) : result;
		}
		return chain;
	}
	/**
	* Adds lazy getters to `target` for each registered provider key.
	* Used by context creation (APIContext, Astro global) so that
	* provider values like `session` and `cache` appear as properties
	* without hard-coding the keys.
	*
	* Always defines a `session` getter (returning `undefined` when no
	* provider is registered) so `ctx.session` / `Astro.session` is a
	* present property regardless of whether the sessions handler was
	* included in the pipeline.
	*/
	defineProviderGetters(target) {
		const state = this;
		if (this.#providers) for (const key of this.#providers.keys()) Object.defineProperty(target, key, {
			get: () => state.resolve(key),
			enumerable: true,
			configurable: true
		});
		if (!this.#providers?.has("session")) {
			let warned = false;
			Object.defineProperty(target, "session", {
				get() {
					if (!warned) {
						warned = true;
						state.logger.warn("session", "`Astro.session` was accessed but no session storage is configured. Either configure the storage manually or use an adapter that provides session storage. For more information, see https://docs.astro.build/en/guides/sessions/");
					}
				},
				enumerable: true,
				configurable: true
			});
		}
	}
	/**
	* Resolves the route to use for this request and stores it on
	* `this.routeData`. If the adapter (or the dev server) provided a
	* `routeData` via render options it's already set and this is a
	* no-op. Otherwise we use the app's synchronous route matcher and
	* fall back to a `404.astro` route so middleware can still run.
	*
	* Called eagerly from the constructor so individual handlers
	* (actions, pages, middleware, etc.) always see a resolved route
	* without the caller needing an extra setup step.
	*
	* Once routeData is known, finalizes `this.pathname`: in dev, if the
	* matched route has no `.html` extension, strip `.html` / `/index.html`
	* suffixes so the rendering pipeline sees the canonical pathname.
	*/
	/**
	* Strip `.html` / `/index.html` suffixes from the pathname so the
	* rendering pipeline sees the canonical route path. Only applies to
	* page routes where `.html` is framework-injected. Endpoint routes
	* preserve `.html` because any such suffix is user-provided (e.g.
	* from `getStaticPaths` params). Skipped when the matched route
	* itself has an `.html` extension in its definition.
	*/
	#stripHtmlExtension() {
		if (this.routeData && this.routeData.type === "page" && !routeHasHtmlExtension(this.routeData)) {
			const original = this.pathname;
			this.pathname = this.pathname.replace(/\/index\.html$/, "/").replace(/\.html$/, "");
			if (this.manifest.trailingSlash === "always" && this.pathname !== "" && !this.pathname.endsWith("/")) this.pathname += "/";
			if (this.pathname !== original && this.routeData.pattern.test(original) && !this.routeData.pattern.test(this.pathname)) this.pathname = original;
		}
	}
	#resolveRouteData() {
		if (this.routeData) {
			this.#stripHtmlExtension();
			return;
		}
		const matched = matchRoute(this.manifest, this.pathname);
		if (matched && matched.prerender && this.manifest.serverLike) {
			if (matched.params.length > 0) {
				const allMatches = matchAllRoutes(this.manifest, this.pathname);
				this.routeData = allMatches.find((r) => !r.prerender);
			} else this.routeData = void 0;
		} else this.routeData = matched;
		this.logger.debug("router", "Astro matched the following route for " + this.request.url);
		this.logger.debug("router", "RouteData:\n" + this.routeData);
		if (!this.routeData) {
			const custom404 = getCustom404Route(getRouteTable(this.manifest));
			if (custom404 && !custom404.prerender) this.routeData = custom404;
		}
		if (!this.routeData) {
			this.logger.debug("router", "Astro hasn't found routes that match " + this.request.url);
			this.logger.debug("router", "Here's the available routes:\n", getRouteTable(this.manifest));
			return;
		}
		this.#stripHtmlExtension();
	}
	/**
	* Strips the manifest's base from a normalized request pathname and prepends
	* a forward slash.
	*
	* Mirrors `BaseApp.removeBase`: the router matches against this stripped path
	* while middleware reads the un-stripped `context.url.pathname`, so both must
	* strip the base identically.
	*/
	#computePathname(normalizedPathname) {
		return prependForwardSlash(stripRequestBase(normalizedPathname, this.manifest.base));
	}
	/**
	* Decodes and normalizes the public request pathname before deriving the
	* separate pathname used for route matching.
	*/
	#normalizePathname(pathname) {
		try {
			pathname = validateAndDecodePathname(pathname);
		} catch (e) {
			if (e instanceof MultiLevelEncodingError) this.invalidEncoding = true;
			else this.logger.error(null, e.toString());
		}
		return collapseDuplicateSlashes(pathname);
	}
	/**
	* Reads X-Forwarded-Proto, X-Forwarded-Host, and X-Forwarded-Port
	* from the request headers, validates them against the manifest's
	* `allowedDomains`, and updates `this.url` accordingly. Also resolves
	* `clientAddress` from X-Forwarded-For when the host is trusted.
	*
	* Only called when `allowedDomains` is configured — without it,
	* forwarded headers are never trusted.
	*/
	#applyForwardedHeaders() {
		const headers = this.request.headers;
		const allowedDomains = this.manifest.allowedDomains;
		const validated = validateForwardedHeaders(getFirstForwardedValue$1(headers.get("x-forwarded-proto") ?? void 0), getFirstForwardedValue$1(headers.get("x-forwarded-host") ?? void 0), getFirstForwardedValue$1(headers.get("x-forwarded-port") ?? void 0), allowedDomains);
		if (!validated.protocol && !validated.host && !validated.port) return;
		if (validated.protocol) this.url.protocol = validated.protocol + ":";
		if (validated.host) {
			const colonIdx = validated.host.indexOf(":");
			if (colonIdx !== -1) {
				this.url.hostname = validated.host.slice(0, colonIdx);
				this.url.port = validated.host.slice(colonIdx + 1);
			} else {
				this.url.hostname = validated.host;
				this.url.port = "";
			}
		}
		if (validated.port) this.url.port = validated.port;
		if (validated.host !== void 0 && !this.clientAddress) {
			const forwardedFor = getFirstForwardedValue$1(this.request.headers.get("x-forwarded-for") ?? void 0);
			if (forwardedFor) this.clientAddress = forwardedFor;
		}
		this.request = new Request(this.url, this.request);
	}
	/**
	* Returns the resolved `props` for this render, computing them lazily
	* from the route + component module on first access. If the
	* `initialProps` already carries user-supplied props (e.g. the
	* container API) those are used verbatim.
	*/
	async getProps() {
		if (this.props !== null) return this.props;
		if (Object.keys(this.initialProps).length > 0) {
			this.props = this.initialProps;
			return this.props;
		}
		const mod = await this.loadComponentInstance();
		this.props = await getProps({
			mod,
			routeData: this.routeData,
			routeCache: getRouteCache(this.manifest),
			pathname: this.pathname,
			logger: this.logger,
			serverLike: this.manifest.serverLike,
			base: this.manifest.base,
			trailingSlash: this.manifest.trailingSlash
		});
		return this.props;
	}
	/**
	* Returns the `ActionAPIContext` for this render, creating it lazily.
	* Used by middleware, actions, and page dispatch.
	*/
	getActionAPIContext() {
		if (this.actionApiContext !== null) return this.actionApiContext;
		const state = this;
		const ctx = {
			get cookies() {
				return state.cookies;
			},
			routePattern: this.routeData.route,
			isPrerendered: this.routeData.prerender,
			get clientAddress() {
				return state.getClientAddress();
			},
			get currentLocale() {
				return state.computeCurrentLocale();
			},
			generator: ASTRO_GENERATOR,
			get locals() {
				return state.locals;
			},
			set locals(_) {
				throw new AstroError(LocalsReassigned);
			},
			params: this.params,
			get preferredLocale() {
				return state.computePreferredLocale();
			},
			get preferredLocaleList() {
				return state.computePreferredLocaleList();
			},
			request: this.request,
			site: getSite(this.manifest),
			url: this.url,
			get originPathname() {
				return getOriginPathname(state.request);
			},
			get csp() {
				return state.getCsp();
			},
			get logger() {
				return astroToRuntimeLogger(state.logger);
			}
		};
		this.defineProviderGetters(ctx);
		this.actionApiContext = ctx;
		return this.actionApiContext;
	}
	/**
	* Returns the `APIContext` for this render, creating it lazily from
	* the memoized props + action context.
	*
	* Called before `getProps()` has resolved, the context carries
	* `props: null` and is not memoized; the next call after `getProps()`
	* fills in `props` on the same object. Callers that read `props`
	* must await `getProps()` first.
	*/
	getAPIContext() {
		if (this.apiContext !== null) return this.apiContext;
		const actionApiContext = this.getActionAPIContext();
		const state = this;
		const redirect = (path, status = 302) => new Response(null, {
			status,
			headers: { Location: path }
		});
		const rewrite = async (reroutePayload) => {
			return await state.rewrite(reroutePayload);
		};
		actionApiContext[fetchStateSymbol] = this;
		const apiContext = Object.assign(actionApiContext, {
			props: this.props,
			redirect,
			rewrite,
			getActionResult: createGetActionResult(actionApiContext.locals),
			callAction: createCallAction(actionApiContext)
		});
		if (this.props !== null) this.apiContext = apiContext;
		return apiContext;
	}
	/**
	* Invalidates the cached `APIContext` so the next `getAPIContext()`
	* call re-derives it from the (possibly mutated) state. Used
	* after an in-flight rewrite swaps the route / request / params.
	*/
	invalidateContexts() {
		this.props = null;
		this.actionApiContext = null;
		this.apiContext = null;
	}
	resetResponseMetadata() {
		this.responseRouteType = void 0;
		this.skipErrorReroute = false;
	}
};
//#endregion
//#region node_modules/.pnpm/@astrojs+internal-helpers@0.13.0/node_modules/@astrojs/internal-helpers/dist/object.js
/**
* Keys that must be rejected when traversing object paths (e.g. dot-separated
* property lookups) to prevent prototype-pollution attacks.
*/
var FORBIDDEN_PATH_KEYS = /* @__PURE__ */ new Set([
	"__proto__",
	"constructor",
	"prototype"
]);
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/actions/noop-actions.js
var NOOP_ACTIONS_MOD = { server: {} };
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/actions/load.js
var actionsMemo = createAsyncManifestMemo(async (manifest) => manifest.actions ? await manifest.actions() : NOOP_ACTIONS_MOD);
/** Resolves the actions module from the manifest (a no-op module when none). */
function getActions(manifest) {
	return actionsMemo.get(manifest);
}
/** Looks up a single action handler by its dot-separated path. */
async function getAction(manifest, path) {
	const pathKeys = path.split(".").map((key) => decodeURIComponent(key));
	let { server } = await getActions(manifest);
	if (!server || !(typeof server === "object")) throw new TypeError(`Expected \`server\` export in actions file to be an object. Received ${typeof server}.`);
	for (const key of pathKeys) {
		if (typeof server === "function") throw new AstroError({
			...ActionNotFoundError,
			message: ActionNotFoundError.message(pathKeys.join("."))
		});
		if (FORBIDDEN_PATH_KEYS.has(key)) throw new AstroError({
			...ActionNotFoundError,
			message: ActionNotFoundError.message(pathKeys.join("."))
		});
		if (!Object.hasOwn(server, key)) throw new AstroError({
			...ActionNotFoundError,
			message: ActionNotFoundError.message(pathKeys.join("."))
		});
		server = server[key];
	}
	if (typeof server !== "function") throw new TypeError(`Expected handler for action ${pathKeys.join(".")} to be a function. Received ${typeof server}.`);
	return server;
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/actions/runtime/server.js
/**
* Access information about Action requests from middleware.
*/
function getActionContext(context) {
	const callerInfo = getCallerInfo(context);
	const actionResultAlreadySet = Boolean(context.locals._actionPayload);
	let action = void 0;
	if (callerInfo && context.request.method === "POST" && !actionResultAlreadySet) action = {
		calledFrom: callerInfo.from,
		name: callerInfo.name,
		handler: async () => {
			const { manifest } = getFetchStateFromAPIContext(context);
			const callerInfoName = shouldAppendForwardSlash(manifest.trailingSlash, manifest.buildFormat) ? removeTrailingForwardSlash(callerInfo.name) : callerInfo.name;
			let baseAction;
			try {
				baseAction = await getAction(manifest, callerInfoName);
			} catch (error) {
				if (error instanceof Error && "name" in error && typeof error.name === "string" && error.name === ActionNotFoundError.name) return {
					data: void 0,
					error: new ActionError({ code: "NOT_FOUND" })
				};
				if (error instanceof URIError) return {
					data: void 0,
					error: new ActionError({ code: "NOT_FOUND" })
				};
				throw error;
			}
			const bodySizeLimit = manifest.actionBodySizeLimit;
			let input;
			try {
				input = await parseRequestBody(context.request, bodySizeLimit);
			} catch (e) {
				if (e instanceof ActionError) return {
					data: void 0,
					error: e
				};
				if (e instanceof TypeError) return {
					data: void 0,
					error: new ActionError({ code: "UNSUPPORTED_MEDIA_TYPE" })
				};
				if (e instanceof SyntaxError) return {
					data: void 0,
					error: new ActionError({
						code: "BAD_REQUEST",
						message: "Invalid JSON request body"
					})
				};
				throw e;
			}
			const omitKeys = [
				"props",
				"getActionResult",
				"callAction",
				"redirect"
			];
			const actionAPIContext = Object.create(Object.getPrototypeOf(context), Object.fromEntries(Object.entries(Object.getOwnPropertyDescriptors(context)).filter(([key]) => !omitKeys.includes(key))));
			Reflect.set(actionAPIContext, ACTION_API_CONTEXT_SYMBOL, true);
			return baseAction.bind(actionAPIContext)(input);
		}
	};
	function setActionResult(actionName, actionResult) {
		context.locals._actionPayload = {
			actionResult,
			actionName
		};
	}
	return {
		action,
		setActionResult,
		serializeActionResult,
		deserializeActionResult
	};
}
function getCallerInfo(ctx) {
	if (ctx.routePattern === "/_actions/[...path]") return {
		from: "rpc",
		name: ctx.url.pathname.replace(/^.*\/_actions\//, "")
	};
	const queryParam = ctx.url.searchParams.get(ACTION_QUERY_PARAMS.actionName);
	if (queryParam) return {
		from: "form",
		name: queryParam
	};
}
async function parseRequestBody(request, bodySizeLimit) {
	const contentType = request.headers.get("content-type");
	const contentLengthHeader = request.headers.get("content-length");
	const contentLength = contentLengthHeader ? Number.parseInt(contentLengthHeader, 10) : void 0;
	const hasContentLength = typeof contentLength === "number" && Number.isFinite(contentLength);
	if (!contentType) return void 0;
	if (hasContentLength && contentLength > bodySizeLimit) throw new ActionError({
		code: "CONTENT_TOO_LARGE",
		message: `Request body exceeds ${bodySizeLimit} bytes`
	});
	try {
		if (hasContentType(contentType, formContentTypes)) {
			if (!hasContentLength) {
				const body = await readBodyWithLimit(request.clone(), bodySizeLimit);
				return await new Request(request.url, {
					method: request.method,
					headers: request.headers,
					body: toArrayBuffer(body)
				}).formData();
			}
			return await request.clone().formData();
		}
		if (hasContentType(contentType, ["application/json"])) {
			if (contentLength === 0) return void 0;
			if (!hasContentLength) {
				const body = await readBodyWithLimit(request.clone(), bodySizeLimit);
				if (body.byteLength === 0) return void 0;
				return JSON.parse(new TextDecoder().decode(body));
			}
			return await request.clone().json();
		}
	} catch (e) {
		if (e instanceof BodySizeLimitError) throw new ActionError({
			code: "CONTENT_TOO_LARGE",
			message: `Request body exceeds ${bodySizeLimit} bytes`
		});
		throw e;
	}
	throw new TypeError("Unsupported content type");
}
var ACTION_API_CONTEXT_SYMBOL = Symbol.for("astro.actionAPIContext");
var formContentTypes = ["application/x-www-form-urlencoded", "multipart/form-data"];
function hasContentType(contentType, expected) {
	const type = contentType.split(";")[0].toLowerCase();
	return expected.some((t) => type === t);
}
function serializeActionResult(res) {
	if (res.error) {
		if (Object.assign({
			"ASSETS_PREFIX": void 0,
			"BASE_URL": "/",
			"DEV": false,
			"MODE": "production",
			"PROD": true,
			"PUBLIC_API_URL": "https://throwing-winnings-movable.ngrok-free.dev/api",
			"PUBLIC_DEMO_MODE": "true",
			"SITE": "https://caveofchi.example",
			"SSR": true
		}, { OS: "Windows_NT" })?.DEV) actionResultErrorStack.set(res.error.stack);
		let body;
		if (res.error instanceof ActionInputError) body = {
			type: res.error.type,
			issues: res.error.issues,
			fields: res.error.fields
		};
		else body = {
			...res.error,
			message: res.error.message
		};
		return {
			type: "error",
			status: res.error.status,
			contentType: "application/json",
			body: JSON.stringify(body)
		};
	}
	if (res.data === void 0) return {
		type: "empty",
		status: 204
	};
	let body;
	try {
		body = stringify(res.data, { URL: (value) => value instanceof URL && value.href });
	} catch (e) {
		let hint = ActionsReturnedInvalidDataError.hint;
		if (res.data instanceof Response) hint = REDIRECT_STATUS_CODES.includes(res.data.status) ? "If you need to redirect when the action succeeds, trigger a redirect where the action is called. See the Actions guide for server and client redirect examples: https://docs.astro.build/en/guides/actions." : "If you need to return a Response object, try using a server endpoint instead. See https://docs.astro.build/en/guides/endpoints/#server-endpoints-api-routes";
		throw new AstroError({
			...ActionsReturnedInvalidDataError,
			message: ActionsReturnedInvalidDataError.message(String(e)),
			hint
		});
	}
	return {
		type: "data",
		status: 200,
		contentType: "application/json+devalue",
		body
	};
}
function toArrayBuffer(buffer) {
	const copy = new Uint8Array(buffer.byteLength);
	copy.set(buffer);
	return copy.buffer;
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/actions/handler.js
/**
* Handles Astro Action requests in both modes:
*
* - **RPC**: POST requests to `/_actions/<name>` (originating from the
*   generated JS client). Runs the action and returns the serialized result
*   as the response, so the caller can short-circuit rendering.
* - **Form**: POST requests with `?_action=<name>` targeting a page route
*   (originating from an HTML `<form action={actions.foo}>`). Runs the
*   action, stashes the result into `locals._actionPayload`, and returns
*   `undefined` so the caller continues to render the page.
*
* Non-action requests are a no-op (`undefined`).
*
* This handler is invoked at the bottom of the middleware chain, before
* page dispatch. That placement preserves the existing behavior where
* user middleware sees action requests and response finalization (cookies,
* sessions, etc.) runs around the action response.
*
* Expects the APIContext that is already being used by the render pipeline.
* Returns a `Response` when the action fully handles the request (RPC),
* or `undefined` when the caller should continue processing the request
* (form actions or non-action requests).
*/
function handleAction(apiContext, state) {
	markFeatureUsed(state.manifest, FetchFeatures.actions);
	const invalidEncodingResponse = rejectInvalidEncoding(state);
	if (invalidEncodingResponse) return Promise.resolve(invalidEncodingResponse);
	if (apiContext.isPrerendered) return;
	const { action, setActionResult } = getActionContext(apiContext);
	if (!action) return;
	if (state.manifest.checkOrigin && isForbiddenCrossOriginRequest(apiContext.request, apiContext.url, apiContext.isPrerendered)) return Promise.resolve(createCrossOriginForbiddenResponse(apiContext.request));
	return executeAction(action, setActionResult);
}
async function executeAction(action, setActionResult) {
	const serialized = serializeActionResult(await action.handler());
	if (action.calledFrom === "rpc") {
		if (serialized.type === "empty") return new Response(null, { status: serialized.status });
		return new Response(serialized.body, {
			status: serialized.status,
			headers: { "Content-Type": serialized.contentType }
		});
	}
	setActionResult(action.name, serialized);
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/routing/3xx.js
/**
* Generates a minimal HTML redirect page used for SSR redirects.
*/
function redirectTemplate({ status, absoluteLocation, relativeLocation, from }) {
	const delay = status === 302 ? 2 : 0;
	const rel = escape(String(relativeLocation));
	return `<!doctype html>
<title>Redirecting to: ${rel}</title>
<meta http-equiv="refresh" content="${delay};url=${rel}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${escape(String(absoluteLocation))}">
<body>
	<a href="${rel}">Redirecting ${from ? `from <code>${escape(from)}</code> ` : ""}to <code>${rel}</code></a>
</body>`;
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/routing/trailing-slash-handler.js
/**
* Handles trailing-slash normalization for incoming requests. If the
* request's pathname does not match the manifest's configured
* `trailingSlash` policy, a redirect `Response` is returned. Otherwise,
* returns `undefined` so the caller can continue processing the request.
* Paths encoded too many times to decode get a 400 instead of a redirect.
*/
function handleTrailingSlash(state) {
	const invalidEncodingResponse = rejectInvalidEncoding(state);
	if (invalidEncodingResponse) return invalidEncodingResponse;
	const url = new URL(state.request.url);
	const redirect = redirectTrailingSlash(state.manifest.trailingSlash, url.pathname);
	if (redirect === url.pathname) return;
	const addCookieHeader = state.renderOptions.addCookieHeader;
	const status = state.request.method === "GET" ? 301 : 308;
	const location = redirect + url.search;
	const response = new Response(redirectTemplate({
		status,
		relativeLocation: location,
		absoluteLocation: location,
		from: state.request.url
	}), {
		status,
		headers: { location }
	});
	prepareResponse(response, { addCookieHeader });
	return response;
}
function redirectTrailingSlash(trailingSlash, pathname) {
	if (pathname === "/" || isInternalPath(pathname)) return pathname;
	const path = collapseDuplicateTrailingSlashes(pathname, trailingSlash !== "never");
	if (path !== pathname) return path;
	if (trailingSlash === "ignore") return pathname;
	if (trailingSlash === "always" && !hasFileExtension(pathname)) return appendForwardSlash(pathname);
	if (trailingSlash === "never") return removeTrailingForwardSlash(pathname);
	return pathname;
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/errors/not-found.js
/**
* Renders the 404 error page when no route matched the request, or returns
* `undefined` when a route matched. Returns an empty `400` when the request
* path is over-encoded.
*
* `FetchState` only falls back to an SSR `404.astro`, so this renders a
* prerendered (or absent) custom 404 page: through
* `renderOptions.prerenderedErrorPageFetch` in production, or by rendering
* the page source in dev.
*/
function handleNotFound(state) {
	const invalidEncodingResponse = rejectInvalidEncoding(state);
	if (invalidEncodingResponse) return Promise.resolve(invalidEncodingResponse);
	if (state.routeData) return;
	return renderErrorFromState(state, state.request, {
		...state.renderOptions,
		status: 404,
		pathname: state.pathname
	});
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/redirects/render.js
function isExternalURL(url) {
	return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//");
}
function redirectIsExternal(redirect) {
	if (typeof redirect === "string") return isExternalURL(redirect);
	else return isExternalURL(redirect.destination);
}
/**
* Computes the HTTP status code for a redirect response.
*
* - If the route has a `redirectRoute` and an explicit numeric status, that status is used.
* - Otherwise: GET → 301, non-GET (e.g. POST) → 308.
*/
function computeRedirectStatus(method, redirect, redirectRoute) {
	return redirectRoute && typeof redirect === "object" ? redirect.status : method === "GET" ? 301 : 308;
}
/**
* Resolves the final redirect target URL by substituting dynamic params into
* the redirect string (e.g. `/[slug]/page` → `/hello/page`).
*
* When `redirectRoute` is provided its route generator is used; otherwise params
* are substituted manually into the string redirect target.
*/
function resolveRedirectTarget(params, redirect, redirectRoute, trailingSlash) {
	if (typeof redirectRoute !== "undefined") return getRouteGenerator(redirectRoute.segments, trailingSlash)(params) || redirectRoute?.pathname || "/";
	else if (typeof redirect === "string") {
		if (redirectIsExternal(redirect)) return redirect;
		else {
			let target = redirect;
			for (const param of Object.keys(params)) {
				const paramValue = params[param];
				target = target.replace(`[${param}]`, () => paramValue).replace(`[...${param}]`, () => paramValue);
			}
			return target;
		}
	} else if (typeof redirect === "undefined") return "/";
	return redirect.destination;
}
async function renderRedirect(state) {
	markFeatureUsed(state.manifest, FetchFeatures.redirects);
	const { redirect, redirectRoute } = state.routeData;
	const status = computeRedirectStatus(state.request.method, redirect, redirectRoute);
	const headers = { location: encodeURI(resolveRedirectTarget(state.params, redirect, redirectRoute, state.manifest.trailingSlash)) };
	if (redirect && redirectIsExternal(redirect)) {
		if (typeof redirect === "string") return Response.redirect(redirect, status);
		else return Response.redirect(redirect.destination, status);
	}
	return new Response(null, {
		status,
		headers
	});
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/routing/redirect-page.js
/** The delay Astro's built-in redirect page uses for `status`. */
function redirectDelayFor(status) {
	return status === 302 ? 2 : 0;
}
/**
* Renders the project's `src/pages/3xx.astro` as the body of a redirect,
* returning its HTML.
*
* Returns `undefined` when the project has no `3xx.astro`, or when rendering it
* fails — the caller falls back to Astro's built-in redirect page so a broken
* custom page degrades to a working redirect instead of failing the build.
*
* Middleware is skipped: it already ran for the request that produced the
* redirect, and re-running it around a template render would let a middleware
* that redirects recurse.
*/
async function renderRedirectPage(manifest, request, props) {
	const route = getRouteTable(manifest).routes.find((candidate) => isRoute3xx(candidate.route));
	if (!route) return;
	const state = new FetchState(manifest, request);
	try {
		state.skipMiddleware = true;
		state.routeData = route;
		state.pathname = route.route;
		state.status = 200;
		state.componentInstance = await getEnvironment(manifest).getComponentByRoute(manifest, route);
		state.initialProps = { ...props };
		return await (await handleMiddleware(state, handlePages)).text();
	} catch (err) {
		state.logger.error("redirects", `Failed to render \`src/pages/3xx.astro\` for the redirect from \`${props.from}\` to \`${props.to}\`. Falling back to the built-in redirect page.\n${err instanceof Error ? err.stack ?? err.message : String(err)}`);
		return;
	} finally {
		try {
			const finalize = state.finalizeAll();
			if (finalize) await finalize;
		} catch (err) {
			state.logger.error("redirects", `Failed to finalize the \`src/pages/3xx.astro\` render for the redirect from \`${props.from}\` to \`${props.to}\`.\n${err instanceof Error ? err.stack ?? err.message : String(err)}`);
		}
	}
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/routing/handler.js
/**
* Dispatches request logging: through the facade's late-bound
* `logThisRequest` hook when the state was built by `BaseApp.render`'s fast
* path (preserving subclass overrides), else through the environment's
* `logRequest` behavior (dev request lines; prod/build/container no-op).
*/
function logRequestFromState(state, payload) {
	if (state.logRequest) state.logRequest(payload);
	else getEnvironment(state.manifest).logRequest(state.manifest, payload);
}
/**
* Runs actions then pages — the callback at the bottom of the middleware
* chain. A module-level function so passing it by reference costs zero
* per-request allocation.
*/
function actionsAndPages(state, ctx) {
	if (!state.skipMiddleware) {
		const actionResult = handleAction(ctx, state);
		if (actionResult) return actionResult.then((response) => response ?? handlePages(state, ctx));
	}
	return handlePages(state, ctx);
}
/**
* Swaps a bodiless redirect response for one carrying the project's rendered
* `src/pages/3xx.astro`.
*
* Only the build environment opts in (see `RenderEnvironment.rendersRedirectPage`):
* a static site has no `Location` header to follow, so the HTML body is the
* redirect. Responses that already carry a body — the trailing-slash
* normalizer's, or a page that rendered its own — are left alone.
*/
async function withRedirectPageBody(state, response) {
	const status = response.status;
	if (status < 300 || status >= 400 || response.body !== null) return response;
	if (!getEnvironment(state.manifest).rendersRedirectPage()) return response;
	const to = response.headers.get("location");
	if (!to) return response;
	const html = await renderRedirectPage(state.manifest, state.request, {
		from: state.pathname,
		to,
		status,
		delay: redirectDelayFor(status)
	});
	if (html === void 0) return response;
	const headers = new Headers(response.headers);
	if (!headers.has("content-type")) headers.set("content-type", "text/html");
	return new Response(html, {
		status,
		statusText: response.statusText,
		headers
	});
}
/**
* The composite "batteries-included" handler that wires up every request
* feature internally; `astro(state)` (astro/fetch) delegates here, as does
* `BaseApp.render`'s default-handler fast path.
*/
async function handleRequest(state) {
	await getResolvedLogger(state.manifest);
	markFeatureUsed(state.manifest, ALL_FETCH_FEATURES);
	const invalidEncodingResponse = rejectInvalidEncoding(state);
	if (invalidEncodingResponse) return invalidEncodingResponse;
	const trailingSlashRedirect = handleTrailingSlash(state);
	if (trailingSlashRedirect) return trailingSlashRedirect;
	const notFoundResponse = handleNotFound(state);
	if (notFoundResponse) return notFoundResponse;
	return render(state);
}
/**
* Renders a response for the given `FetchState`. Assumes trailing-slash
* redirects and routeData resolution have already run.
*
* User-triggered rewrites (`Astro.rewrite` / `ctx.rewrite`) go through
* `executeRewrite` on the current `FetchState` — they mutate the existing
* state in place and re-run middleware + page dispatch.
*/
async function render(state) {
	const routeData = state.routeData;
	const pathname = state.pathname;
	const request = state.request;
	const { addCookieHeader } = state.renderOptions;
	state.status = getDefaultStatusCode(state.manifest, routeData, pathname);
	let response;
	let finalizeError;
	try {
		const sessionP = state.manifest.sessionConfig ? provideSession(state) : void 0;
		const cacheP = provideCache(state);
		if (sessionP || cacheP) await Promise.all([sessionP, cacheP]);
		markFeatureUsed(state.manifest, FetchFeatures.sessions);
		if (routeData.type === "redirect") {
			const redirectResponse = await withRedirectPageBody(state, await renderRedirect(state));
			logRequestFromState(state, {
				pathname,
				method: request.method,
				statusCode: redirectResponse.status,
				isRewrite: false,
				timeStart: state.timeStart
			});
			prepareResponse(redirectResponse, { addCookieHeader });
			state.logger.flush();
			return redirectResponse;
		}
		const i18n = getI18n(state.manifest);
		if (!state.manifest.cacheProvider) {
			markFeatureUsed(state.manifest, FetchFeatures.cache);
			response = await handleMiddleware(state, actionsAndPages);
			if (i18n) response = await finalizeI18n(i18n, state, response);
		} else {
			const runPipeline = async () => {
				let res = await handleMiddleware(state, actionsAndPages);
				if (i18n) res = await finalizeI18n(i18n, state, res);
				return res;
			};
			response = await handleCache(state, runPipeline);
		}
		logRequestFromState(state, {
			pathname,
			method: request.method,
			statusCode: response.status,
			isRewrite: state.isRewriting,
			timeStart: state.timeStart
		});
	} catch (err) {
		state.logger.error(null, err.stack || err.message || String(err));
		return renderErrorFromState(state, request, {
			...state.renderOptions,
			status: 500,
			error: err,
			pathname: state.pathname
		});
	} finally {
		try {
			const finalize = state.finalizeAll();
			if (finalize) await finalize;
		} catch (err) {
			finalizeError = err;
			state.logger.error(null, err.stack || err.message || String(err));
		}
	}
	if (finalizeError) return renderErrorFromState(state, request, {
		...state.renderOptions,
		status: 500,
		error: finalizeError,
		pathname: state.pathname
	});
	if (REROUTABLE_STATUS_CODES.includes(response.status) && response.body === null && !state.skipErrorReroute) return renderErrorFromState(state, request, {
		...state.renderOptions,
		response,
		status: response.status,
		error: response.status === 500 ? null : void 0,
		pathname: state.pathname
	});
	response = await withRedirectPageBody(state, response);
	prepareResponse(response, { addCookieHeader });
	state.logger.flush();
	return response;
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/fetch/default-handler.js
/**
* The default request handler for `BaseApp`. Stateless: builds the
* per-request `FetchState` from the manifest and delegates to
* `handleRequest`.
*
* The export path (`astro/app/fetch/default-handler`), the class name, and
* no-arg constructibility are baked into generated builds
* (`core/fetch/vite-plugin.ts` emits `new DefaultFetchHandler()`), so all
* three survive.
*/
var DefaultFetchHandler = class {
	#manifest;
	/**
	* `BaseApp` passes itself so states resolve that app's manifest ahead of
	* the ambient one; generated builds construct the handler with no
	* arguments and use the ambient manifest.
	*/
	constructor(app) {
		this.#manifest = app?.manifest;
	}
	fetch = (request) => {
		const options = getRenderOptions(request);
		return handleRequest(new FetchState(this.#manifest ?? getAmbientManifest(), request, options));
	};
};
//#endregion
//#region \0virtual:astro:fetchable
var _virtual_astro_fetchable_default = new DefaultFetchHandler();
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/routing/match-request.js
/**
* Fully decodes a pathname, falling back to a single decode and then the raw pathname
* when validation fails. Matching runs before `render()`, so it must not throw for
* request input that render-time validation handles.
*/
function safeDecodePathname(manifest, pathname) {
	try {
		return validateAndDecodePathname(pathname);
	} catch (e) {
		new AstroIntegrationLogger(getLogger(manifest).options, manifest.adapterName).debug(e.toString());
		try {
			return decodeURI(pathname);
		} catch {
			return pathname;
		}
	}
}
/**
* Given a `Request`, returns the `RouteData` that matches its pathname — the
* appless, purely functional body of `BaseApp.match()`. By default, prerendered
* routes aren't returned, even if they are matched; when
* `allowPrerenderedRoutes` is `true`, matched prerendered routes are returned
* too.
*/
function matchRequest(manifest, request, allowPrerenderedRoutes = false) {
	const url = new URL(request.url);
	if (manifest.assets.has(url.pathname)) return void 0;
	let pathname = computePathnameFromDomain(request, url, manifest.i18n, manifest.base, manifest.trailingSlash, manifest.allowedDomains, getLogger(manifest));
	if (!pathname) pathname = prependForwardSlash(stripRequestBase(url.pathname, manifest.base));
	pathname = safeDecodePathname(manifest, pathname);
	const routeData = matchRoute(manifest, pathname);
	if (!routeData) return void 0;
	if (allowPrerenderedRoutes) return routeData;
	if (routeData.prerender) {
		if (routeData.params.length > 0) return matchAllRoutes(manifest, pathname).find((r) => !r.prerender);
		return;
	}
	return routeData;
}
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/app/base.js
var BaseApp = class BaseApp {
	manifest;
	#adapterLogger;
	baseWithoutTrailingSlash;
	/**
	* The streaming flag passed to the constructor, surfaced through the
	* protected `resolveStreaming()` hook and fed into the internal
	* `FetchState` facade hooks on the fast path.
	*/
	#streaming;
	/**
	* The handler that turns incoming `Request` objects into `Response`s.
	* Defaults to a `DefaultFetchHandler` pinned to this app and can be
	* overridden via `setFetchHandler` — typically by the bundled
	* entrypoint after importing `virtual:astro:fetchable`.
	*/
	#fetchHandler;
	#errorHandler;
	/**
	* Whether a custom fetch handler (from `src/fetch.ts`) has been set
	* via `setFetchHandler`. When false, the `DefaultFetchHandler` is
	* in use and all features are implicitly active.
	*/
	#hasCustomFetchHandler = false;
	/**
	* Whether the missing-feature check has already run. We only want
	* to warn once — after the first request in dev, or at build end.
	*/
	#featureCheckDone = false;
	get logger() {
		return getLogger(this.manifest);
	}
	/**
	* Route data derived from the manifest, used for route matching. Reads and
	* writes go through the single per-manifest route table, so HMR updates are
	* visible to every consumer at once.
	*/
	get manifestData() {
		return getRouteTable(this.manifest);
	}
	set manifestData(routesList) {
		updateRouteTable(this.manifest, routesList.routes);
	}
	get adapterLogger() {
		const currentOptions = this.logger.options;
		if (!this.#adapterLogger || this.#adapterLogger.options !== currentOptions) this.#adapterLogger = new AstroIntegrationLogger(currentOptions, this.manifest.adapterName);
		return this.#adapterLogger;
	}
	constructor(manifest, streaming = true) {
		this.manifest = manifest;
		this.baseWithoutTrailingSlash = removeTrailingForwardSlash(manifest.base);
		this.#streaming = streaming;
		getRouteTable(manifest);
		getLogger(manifest);
		this.#fetchHandler = new DefaultFetchHandler(this);
		this.#errorHandler = this.createErrorHandler();
	}
	/**
	* Resolves the user-configured logger destination from the manifest and
	* returns the logger. Lazy and only resolves once; safe to call before
	* the first render (adapters use this to log startup messages through
	* the configured destination).
	*/
	getLogger() {
		return getResolvedLogger(this.manifest);
	}
	/**
	* The streaming flag fed into the internal `FetchState` facade hooks on
	* the fast path. Returns the constructor flag by
	* default; `BuildApp` overrides this to return `undefined` so streaming
	* falls through to the environment default (`manifest.serverLike`).
	*/
	resolveStreaming() {
		return this.#streaming;
	}
	/**
	* Override the fetch handler used to dispatch requests. Entrypoints
	* call this with the default export of `virtual:astro:fetchable` to
	* plug in a user-authored handler from `src/fetch.ts`.
	*/
	setFetchHandler(handler) {
		this.#fetchHandler = handler;
		this.#hasCustomFetchHandler = !(handler instanceof DefaultFetchHandler);
	}
	/**
	* Returns the error handler used by this app. The default is a thin
	* bridge over the functional error API — strategy selection (production
	* default / dev / build) is environment-driven inside `renderErrorPage`.
	* External subclasses can override this to customize error rendering.
	*/
	createErrorHandler() {
		return { renderError: (request, options) => renderErrorPage(this.manifest, request, options) };
	}
	/**
	* Resets the cached adapter logger so it picks up a new logger instance.
	* Used by BuildApp when the logger is replaced via setOptions().
	*/
	resetAdapterLogger() {
		this.#adapterLogger = void 0;
	}
	getAllowedDomains() {
		return this.manifest.allowedDomains;
	}
	matchesAllowedDomains(forwardedHost, protocol) {
		return BaseApp.validateForwardedHost(forwardedHost, this.manifest.allowedDomains, protocol);
	}
	static validateForwardedHost(forwardedHost, allowedDomains, protocol) {
		if (!allowedDomains || allowedDomains.length === 0) return false;
		try {
			const testUrl = new URL(`${protocol || "https"}://${forwardedHost}`);
			return allowedDomains.some((pattern) => {
				return matchPattern(testUrl, pattern);
			});
		} catch {
			return false;
		}
	}
	set setManifestData(newManifestData) {
		updateRouteTable(this.manifest, newManifestData.routes);
	}
	removeBase(pathname) {
		return stripRequestBase(pathname, this.manifest.base);
	}
	/**
	* Fully decodes a pathname, falling back to a single decode and then the raw pathname
	* when validation fails. Adapter matching runs before `render()`, so it must not throw
	* for request input that render-time validation handles.
	*/
	safeDecodePathname(pathname) {
		try {
			return validateAndDecodePathname(pathname);
		} catch (e) {
			this.adapterLogger.debug(e.toString());
			try {
				return decodeURI(pathname);
			} catch {
				return pathname;
			}
		}
	}
	/**
	* Extracts the base-stripped, decoded pathname from a request.
	* Used by adapters to compute the pathname for dev-mode route matching.
	*/
	getPathnameFromRequest(request) {
		const url = new URL(request.url);
		const pathname = prependForwardSlash(this.removeBase(url.pathname));
		return this.safeDecodePathname(pathname);
	}
	/**
	* Given a `Request`, it returns the `RouteData` that matches its `pathname`. By default, prerendered
	* routes aren't returned, even if they are matched.
	*
	* When `allowPrerenderedRoutes` is `true`, the function returns matched prerendered routes too.
	* @param request
	* @param allowPrerenderedRoutes
	*/
	match(request, allowPrerenderedRoutes = false) {
		return matchRequest(this.manifest, request, allowPrerenderedRoutes);
	}
	/**
	* A matching route function to use in the development server.
	* Contrary to the `.match` function, this function resolves props and params, returning the correct
	* route based on the priority, segments. It also returns the correct, resolved pathname.
	* @param pathname
	*/
	devMatch(pathname) {}
	computePathnameFromDomain(request) {
		return computePathnameFromDomain(request, new URL(request.url), this.manifest.i18n, this.manifest.base, this.manifest.trailingSlash, this.manifest.allowedDomains, this.logger);
	}
	async render(request, { addCookieHeader = false, clientAddress = Reflect.get(request, clientAddressSymbol), locals, prerenderedErrorPageFetch = fetch, routeData, waitUntil } = {}) {
		await getResolvedLogger(this.manifest);
		if (routeData) {
			this.logger.debug("router", "The adapter " + this.manifest.adapterName + " provided a custom RouteData for ", request.url);
			this.logger.debug("router", "RouteData");
			this.logger.debug("router", routeData);
		}
		if (locals) {
			if (typeof locals !== "object") {
				const error = new AstroError(LocalsNotAnObject);
				this.logger.error(null, error.stack);
				return this.renderError(request, {
					addCookieHeader,
					clientAddress,
					prerenderedErrorPageFetch,
					locals: void 0,
					routeData,
					waitUntil,
					status: 500,
					error
				});
			}
		}
		if (!routeData) {
			const domainPathname = this.computePathnameFromDomain(request);
			if (domainPathname) routeData = matchRoute(this.manifest, this.safeDecodePathname(domainPathname));
		}
		const resolvedOptions = {
			addCookieHeader,
			clientAddress,
			prerenderedErrorPageFetch,
			locals,
			routeData,
			waitUntil
		};
		let response;
		if (this.#fetchHandler instanceof DefaultFetchHandler) response = await handleRequest(new FetchState(this.manifest, request, resolvedOptions, {
			streaming: this.resolveStreaming(),
			renderError: (req, opts) => this.renderError(req, opts),
			logRequest: (payload) => this.logThisRequest(payload)
		}));
		else {
			setRenderOptions(request, resolvedOptions);
			response = await this.#fetchHandler.fetch(request);
		}
		this.#warnMissingFeatures();
		if (response.headers.get("X-Astro-Error")) {
			response.headers.delete(ASTRO_ERROR_HEADER);
			return this.renderError(request, {
				addCookieHeader,
				clientAddress,
				prerenderedErrorPageFetch,
				locals,
				routeData,
				waitUntil,
				response,
				status: response.status,
				error: response.status === 500 ? null : void 0
			});
		}
		return response;
	}
	setCookieHeaders(response) {
		return getSetCookiesFromResponse(response);
	}
	/**
	* Reads all the cookies written by `Astro.cookie.set()` onto the passed response.
	* For example,
	* ```ts
	* for (const cookie_ of App.getSetCookieFromResponse(response)) {
	*     const cookie: string = cookie_
	* }
	* ```
	* @param response The response to read cookies from.
	* @returns An iterator that yields key-value pairs as equal-sign-separated strings.
	*/
	static getSetCookieFromResponse = getSetCookiesFromResponse;
	/**
	* If it is a known error code, try sending the according page (e.g. 404.astro / 500.astro).
	* This also handles pre-rendered /404 or /500 routes.
	*
	* Delegates to the app's configured `ErrorHandler`. To customize behavior
	* for a specific environment, override `createErrorHandler()` rather than
	* this method.
	*/
	async renderError(request, options) {
		return this.#errorHandler.renderError(request, options);
	}
	/**
	* One-shot check: after the first request with a custom `src/fetch.ts`,
	* compare `usedFeatures` against the manifest and warn about any
	* configured features the user's pipeline doesn't call.
	*/
	#warnMissingFeatures() {
		if (this.#featureCheckDone || !this.#hasCustomFetchHandler) return;
		this.#featureCheckDone = true;
		const manifest = this.manifest;
		const missing = [];
		const used = getUsedFeatures(this.manifest);
		if (manifest.routes.some((r) => r.routeData.type === "redirect") && !(used & FetchFeatures.redirects)) missing.push("redirects");
		if (manifest.sessionConfig && !(used & FetchFeatures.sessions)) missing.push("sessions");
		if (manifest.actions && !(used & FetchFeatures.actions)) missing.push("actions");
		if (manifest.middleware && !(used & FetchFeatures.middleware)) missing.push("middleware");
		if (manifest.i18n && manifest.i18n.strategy !== "manual" && !(used & FetchFeatures.i18n)) missing.push("i18n");
		if (manifest.cacheConfig && !(used & FetchFeatures.cache)) missing.push("cache");
		for (const feature of missing) this.logger.warn("router", `Your project uses ${feature}, but your custom src/fetch.ts does not call the ${feature}() handler. This feature will not work unless your fetch handler calls it.`);
	}
	getDefaultStatusCode(routeData, pathname) {
		return getDefaultStatusCode(this.manifest, routeData, pathname);
	}
	getManifest() {
		return this.manifest;
	}
	logThisRequest({ pathname, method, statusCode, isRewrite, timeStart }) {
		const timeEnd = performance.now();
		this.logRequest({
			pathname,
			method,
			statusCode,
			isRewrite,
			reqTime: timeEnd - timeStart
		});
	}
};
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/app/app.js
var App = class extends BaseApp {
	isDev() {
		return false;
	}
	logRequest(_options) {}
};
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/app/entrypoints/virtual/prod.js
var createApp$1 = ({ streaming } = {}) => {
	const app = new App(manifest, streaming);
	app.setFetchHandler(_virtual_astro_fetchable_default);
	return app;
};
//#endregion
//#region node_modules/.pnpm/astro@7.4.0_@types+node@24._394ca29757833eafd50030466959a8b9/node_modules/astro/dist/core/app/entrypoints/virtual/index.js
var createApp = createApp$1;
//#endregion
//#region node_modules/.pnpm/@astrojs+internal-helpers@0.13.0/node_modules/@astrojs/internal-helpers/dist/request.js
/**
* Utilities for extracting information from `Request`
*/
function getFirstForwardedValue(multiValueHeader) {
	return multiValueHeader?.toString()?.split(",").map((e) => e.trim())?.[0];
}
var IP_RE = /^[0-9a-fA-F.:]{1,45}$/;
/**
* Checks whether a string looks like an IP address (contains only characters
* that can appear in IPv4/IPv6 addresses and is within a reasonable length).
*
* This is a permissive allowlist — it won't catch every malformed IP, but it
* reliably rejects injection payloads. Does NOT use Node.js APIs so it works
* in all runtimes (Workers, Deno, etc.).
*/
function isValidIpAddress(value) {
	return IP_RE.test(value);
}
/**
* Extracts the first value from a potentially multi-value header and validates
* that it is a syntactically valid IP address.
*
* Useful for adapters that read client IP from a platform-specific header
*/
function getValidatedIpFromHeader(headerValue) {
	const raw = getFirstForwardedValue(headerValue);
	if (raw && isValidIpAddress(raw)) return raw;
}
/**
* Returns the first value associated to the `x-forwarded-for` header,
* but only if it is a valid IP address. Returns `undefined` otherwise.
*
* @param {Request} request
*/
function getClientIpAddress(request) {
	return getValidatedIpFromHeader(request.headers.get("x-forwarded-for"));
}
var app = createApp();
var entrypoint_default = { async fetch(request) {
	const url = new URL(request.url);
	const hasValidMiddlewareSecret = request.headers.get(ASTRO_MIDDLEWARE_SECRET_HEADER) === middlewareSecret;
	let realPath = null;
	let overrideTrusted = false;
	if (hasValidMiddlewareSecret) {
		overrideTrusted = true;
		realPath = request.headers.get(ASTRO_PATH_HEADER);
	} else if (url.searchParams.get("x_astro_path_token") === "3a401fd7-93f6-4702-846a-74bbf4f9a941") {
		overrideTrusted = true;
		realPath = url.searchParams.get(ASTRO_PATH_PARAM);
	}
	if (overrideTrusted && (realPath === null || !realPath.startsWith("/"))) return new Response("Not Found", { status: 404 });
	if (typeof realPath === "string") {
		const target = new URL(realPath, url);
		const search = target.search || url.search;
		url.pathname = target.pathname;
		url.search = search;
		url.searchParams.delete(ASTRO_PATH_PARAM);
		url.searchParams.delete(ASTRO_PATH_TOKEN_PARAM);
		request = new Request(url.toString(), {
			method: request.method,
			headers: request.headers,
			...request.body ? {
				body: request.body,
				duplex: "half"
			} : {}
		});
	}
	const routeData = app.match(request);
	let locals = {};
	const astroLocalsHeader = request.headers.get(ASTRO_LOCALS_HEADER);
	if (astroLocalsHeader) {
		if (!hasValidMiddlewareSecret) return new Response("Forbidden", { status: 403 });
		locals = JSON.parse(astroLocalsHeader);
	}
	if (hasValidMiddlewareSecret) request.headers.delete(ASTRO_MIDDLEWARE_SECRET_HEADER);
	const response = await app.render(request, {
		routeData,
		clientAddress: getClientIpAddress(request),
		locals
	});
	if (app.setCookieHeaders) for (const setCookieHeader of app.setCookieHeaders(response)) response.headers.append("Set-Cookie", setCookieHeader);
	return response;
} };
//#endregion
export { entrypoint_default as default };
