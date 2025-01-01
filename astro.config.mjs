import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import vue from "@astrojs/vue";
import rehypeExternalLinks from "rehype-external-links";

export default defineConfig({
  site: "https://richsnapp.com",
  integrations: [
    vue(),
    mdx({
      rehypePlugins: [
        [rehypeExternalLinks, { target: "_blank", rel: ["noopener"] }],
      ],
    }),
  ],
  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
      },
    },
  },
});
