import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    tldr: z.array(z.string()).optional(),
  }),
  loader: glob({
    pattern: ["**/*.mdx", "!**/node_modules/**"],
    base: "./src/content/blog",
  }),
});

const article = defineCollection({
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    tldr: z.array(z.string()).optional(),
  }),
  loader: glob({
    pattern: ["**/*.mdx", "!**/node_modules/**"],
    base: "./src/content/article",
  }),
});

export const collections = { blog, article };
