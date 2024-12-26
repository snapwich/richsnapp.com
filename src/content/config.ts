import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    tldr: z.array(z.string()).optional(),
  }),
});

const article = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    tldr: z.array(z.string()).optional(),
  }),
});

export const collections = { blog, article };
