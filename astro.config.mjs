import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import vue from "@astrojs/vue";
import remarkExternalLinks from "remark-external-links";

// https://astro.build/config
export default defineConfig({
  site: "https://richsnapp.com",
  integrations: [vue(), mdx()],
  markdown: {
    remarkPlugins: [
      [remarkExternalLinks, { target: "_blank", rel: ["noopener"] }],
    ],
  },
});
