import { parse, format } from "date-fns";

export function parseSlugDate(slug: string) {
  const datePart = slug.split("-").slice(0, 3).join("-");
  const date = parse(datePart, "yyyy-MM-dd", new Date());
  return {
    year: format(date, "yyyy"),
    slug: slug.split("-").slice(3).join("-"),
    formattedDate: format(date, "MMMM do yyyy"),
    date,
  };
}
