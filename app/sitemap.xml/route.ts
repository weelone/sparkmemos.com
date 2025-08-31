import { dictionaryKeys, getDictionary } from "@/dictionaries";

export async function GET() {
  const dicts = await Promise.all(dictionaryKeys.map(getDictionary));

  const items = dicts
    .map((d) => {
      const loc = new URL(
        `/sitemaps/${d.urls.home.split("/")[1]}.xml`,
        d.baseUrl
      ).href;
      const lastmod = new Date().toISOString();
      return `\n  <sitemap>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </sitemap>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${items}\n</sitemapindex>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control":
        "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
