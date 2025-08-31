import { NextRequest } from "next/server";
import { posts, categories } from "@/.velite";
import { Language, dictionaryKeys, getDictionary } from "@/dictionaries";

function xhtmlLink(rel: "alternate", href: string, hrefLang: string) {
  return `\n    <xhtml:link rel="${rel}" hreflang="${hrefLang}" href="${href}" />`;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ lang: Language }> }
) {
  const { lang } = await params;
  const dicts = await Promise.all(dictionaryKeys.map(getDictionary));
  const current = dicts.find((d) => d.urls.home.startsWith(`/${lang}`));
  if (!current) return new Response("Not found", { status: 404 });

  const allLocales = dicts.map((d) => ({
    lang: d.urls.home.split("/")[1],
    baseUrl: d.baseUrl,
    urls: d.urls,
  }));

  const urlsetOpen = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`;
  const urlsetClose = `\n</urlset>`;

  const altFor = (paths: Record<string, string>) =>
    allLocales
      .map(({ lang, baseUrl }) =>
        xhtmlLink("alternate", new URL(paths[lang], baseUrl).href, lang)
      )
      .join("");

  const pages = [] as string[];

  // Home
  pages.push(
    `\n  <url>\n    <loc>${
      new URL(current.urls.home, current.baseUrl).href
    }</loc>${altFor(
      Object.fromEntries(
        allLocales.map(({ lang, urls }) => [lang, urls.home])
      ) as Record<string, string>
    )}\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>`
  );

  // Blog index
  pages.push(
    `\n  <url>\n    <loc>${
      new URL(current.urls.blog, current.baseUrl).href
    }</loc>${altFor(
      Object.fromEntries(
        allLocales.map(({ lang, urls }) => [lang, urls.blog])
      ) as Record<string, string>
    )}\n    <changefreq>daily</changefreq>\n    <priority>0.9</priority>\n  </url>`
  );

  // Terms & Privacy
  pages.push(
    `\n  <url>\n    <loc>${
      new URL(current.urls.terms, current.baseUrl).href
    }</loc>${altFor(
      Object.fromEntries(
        allLocales.map(({ lang, urls }) => [lang, urls.terms])
      ) as Record<string, string>
    )}\n    <changefreq>yearly</changefreq>\n    <priority>0.4</priority>\n  </url>`
  );
  pages.push(
    `\n  <url>\n    <loc>${
      new URL(current.urls.privacy, current.baseUrl).href
    }</loc>${altFor(
      Object.fromEntries(
        allLocales.map(({ lang, urls }) => [lang, urls.privacy])
      ) as Record<string, string>
    )}\n    <changefreq>yearly</changefreq>\n    <priority>0.4</priority>\n  </url>`
  );

  // Posts for the current lang, with alternates
  posts
    .filter((p) => !p.draft && p.lang === lang)
    .forEach((p) => {
      const group = posts.filter((i) => i.slug === p.slug);
      const map = Object.fromEntries(
        group.map((g) => [g.lang, g.permalink])
      ) as Record<string, string>;
      const lastmod = new Date(p.updated || p.date).toISOString();
      pages.push(
        `\n  <url>\n    <loc>${
          new URL(p.permalink, current.baseUrl).href
        }</loc>${altFor(
          map
        )}\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`
      );
    });

  // Categories for the current lang, with alternates
  categories.forEach((c) => {
    const map = Object.fromEntries(
      allLocales.map(({ lang }) => {
        const key = lang as keyof typeof c.permalink;
        return [lang, c.permalink[key]] as const;
      })
    ) as Record<string, string>;
    pages.push(
      `\n  <url>\n    <loc>${
        new URL(c.permalink[lang as keyof typeof c.permalink], current.baseUrl)
          .href
      }</loc>${altFor(
        map
      )}\n    <changefreq>weekly</changefreq>\n    <priority>0.6</priority>\n  </url>`
    );
  });

  const xml = `${urlsetOpen}${pages.join("")}${urlsetClose}`;
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control":
        "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
