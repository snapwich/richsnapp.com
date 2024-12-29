import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      tags: z.array(z.string()),
      tldr: z.array(z.string()).optional(),
      image: image().optional(),
    }),
  loader: glob({
    pattern: ["*/*.mdx"],
    base: "./src/content/blog",
  }),
});

const article = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      tags: z.array(z.string()),
      tldr: z.array(z.string()).optional(),
      image: image().optional(),
    }),
  loader: glob({
    pattern: ["*/*.mdx"],
    base: "./src/content/article",
  }),
});

export const collections = { blog, article };
