import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";

const site = process.env.SITE_URL;

export default defineConfig({
  ...(site ? { site } : {}),
  output: "server",
  adapter: vercel(),
  trailingSlash: "never",
  i18n: {
    defaultLocale: "id",
    locales: ["id", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    server: {
      strictPort: true,
    },
  },
});
