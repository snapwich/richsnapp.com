import * as cheerio from "cheerio";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeExternalLinks from "rehype-external-links";
import rehypeStringify from "rehype-stringify";

export async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(remarkRehype)
    .use(rehypeExternalLinks, { target: "_blank", rel: ["noopener"] })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);
  return result.toString();
}

export function getFirstParagraph(htmlContent: string, stripTags = false) {
  const $ = cheerio.load(htmlContent);
  $("aside").remove();
  const paragraphs = $("p").filter((i, el) => {
    return !$(el).text().trim().startsWith("import");
  });
  let contents: string | undefined;
  if (stripTags) {
    contents = paragraphs.first().text();
  } else {
    contents = paragraphs.first().html();
  }
  contents = contents
    .replace(/\n/g, " ")
    .replace(/\r/g, "")
    .replace(/\s+/g, " ");
  return contents;
}
