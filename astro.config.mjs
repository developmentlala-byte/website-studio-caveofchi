import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const site = process.env.SITE_URL;

export default defineConfig({
  ...(site ? { site } : {}),
  output: "static",
  trailingSlash: "never",
  integrations: site ? [sitemap()] : [],
  vite: {
    server: {
      strictPort: true,
    },
  },
});
