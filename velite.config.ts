import rehypePrettyCode from "rehype-pretty-code";
import { defineCollection, defineConfig, s } from "velite";

const lang = s.enum(["en", "zh", "es", "de", "fr", "it", "ja", "ko"]);

const name = s.object({
  en: s.string().max(20),
  zh: s.string().max(20),
  es: s.string().max(20),
  de: s.string().max(20),
  fr: s.string().max(20),
  it: s.string().max(20),
  ja: s.string().max(20),
  ko: s.string().max(20),
});

const description = s
  .object({
    en: s.string().max(100),
    zh: s.string().max(100),
    es: s.string().max(100),
    de: s.string().max(100),
    fr: s.string().max(100),
    it: s.string().max(100),
    ja: s.string().max(100),
    ko: s.string().max(100),
  })
  .optional();

const count = s
  .object({
    en: s.number(),
    zh: s.number(),
    es: s.number(),
    de: s.number(),
    fr: s.number(),
    it: s.number(),
    ja: s.number(),
    ko: s.number(),
  })
  .default({ en: 0, zh: 0, es: 0, de: 0, fr: 0, it: 0, ja: 0, ko: 0 });

const categories = defineCollection({
  name: "Category",
  pattern: "categories/*.yml",
  schema: s
    .object({
      slug: s.slug("blog", ["admin", "login"]),
      cover: s.image().optional(),
      name,
      description,
      count,
    })
    .transform((data) => ({
      ...data,
      permalink: {
        en: `/en/blog/categories/${data.slug}`,
        zh: `/zh/blog/categories/${data.slug}`,
        es: `/es/blog/categories/${data.slug}`,
        de: `/de/blog/categories/${data.slug}`,
        fr: `/fr/blog/categories/${data.slug}`,
        it: `/it/blog/categories/${data.slug}`,
        ja: `/ja/blog/categories/${data.slug}`,
        ko: `/ko/blog/categories/${data.slug}`,
      },
    })),
});

const tags = defineCollection({
  name: "Tag",
  pattern: "tags/index.yml",
  schema: s
    .object({
      slug: s.slug("blog", ["admin", "login"]),
      cover: s.image().optional(),
      name,
      description,
      count,
    })
    .transform((data) => ({
      ...data,
      permalink: {
        en: `/en/blog/tags/${data.slug}`,
        zh: `/zh/blog/tags/${data.slug}`,
        es: `/es/blog/tags/${data.slug}`,
        de: `/de/blog/tags/${data.slug}`,
        fr: `/fr/blog/tags/${data.slug}`,
        it: `/it/blog/tags/${data.slug}`,
        ja: `/ja/blog/tags/${data.slug}`,
        ko: `/ko/blog/tags/${data.slug}`,
      },
    })),
});

const posts = defineCollection({
  name: "Post",
  pattern: "posts/**/*.md",
  schema: s
    .object({
      title: s.string().max(99),
      slug: s.string(),
      lang,
      date: s.isodate(),
      updated: s.isodate().optional(),
      cover: s.image().optional(),
      video: s.file().optional(),
      description: s.string().max(999).optional(),
      keywords: s.array(s.string()).optional(),
      draft: s.boolean().default(false),
      featured: s.boolean().default(false),
      categories: s.array(s.string()),
      tags: s.array(s.string()).default([]),
      toc: s.toc(),
      metadata: s.metadata(),
      excerpt: s.excerpt(),
      content: s.markdown(),
    })
    .transform((data) => ({
      ...data,
      permalink: `/${data.lang}/blog/${data.slug}`,
      seoLink: `/${data.lang}/blog/${data.slug}/${data.title}`,
    })),
});

export default defineConfig({
  root: "blog",
  output: {
    data: ".velite",
    assets: "public/static/posts",
    base: "/static/posts/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { categories, tags, posts },
  markdown: { rehypePlugins: [rehypePrettyCode] },
  prepare: ({ categories, tags, posts }) => {
    const docs = posts.filter(
      (i) => process.env.NODE_ENV !== "production" || !i.draft
    );

    const unexpectedCategories = Array.from(
      new Set(docs.map((item) => item.categories).flat())
    ).filter((i) => categories.find((j) => j.slug === i) == null);

    const unexpectedTags = Array.from(
      new Set(docs.map((item) => item.tags).flat())
    ).filter((i) => tags.find((j) => j.slug === i) == null);

    if (unexpectedCategories.length || unexpectedTags.length) {
      console.error(
        "Unexpected categories or tags founded: ",
        unexpectedCategories.join(", "),
        unexpectedTags.join(", ")
      );

      return false;
    }

    categories.forEach((category) => {
      category.count = {
        en: posts.filter(
          (post) =>
            post.categories.includes(category.slug) && post.lang === "en"
        ).length,
        zh: posts.filter(
          (post) =>
            post.categories.includes(category.slug) && post.lang === "zh"
        ).length,
        es: posts.filter(
          (post) =>
            post.categories.includes(category.slug) && post.lang === "es"
        ).length,
        de: posts.filter(
          (post) =>
            post.categories.includes(category.slug) && post.lang === "de"
        ).length,
        fr: posts.filter(
          (post) =>
            post.categories.includes(category.slug) && post.lang === "fr"
        ).length,
        it: posts.filter(
          (post) =>
            post.categories.includes(category.slug) && post.lang === "it"
        ).length,
        ja: posts.filter(
          (post) =>
            post.categories.includes(category.slug) && post.lang === "ja"
        ).length,
        ko: posts.filter(
          (post) =>
            post.categories.includes(category.slug) && post.lang === "ko"
        ).length,
      };
    });

    tags.forEach((tag) => {
      tag.count = {
        en: posts.filter(
          (post) => post.tags.includes(tag.slug) && post.lang === "en"
        ).length,
        zh: posts.filter(
          (post) => post.tags.includes(tag.slug) && post.lang === "zh"
        ).length,
        es: posts.filter(
          (post) => post.tags.includes(tag.slug) && post.lang === "es"
        ).length,
        de: posts.filter(
          (post) => post.tags.includes(tag.slug) && post.lang === "de"
        ).length,
        fr: posts.filter(
          (post) => post.tags.includes(tag.slug) && post.lang === "fr"
        ).length,
        it: posts.filter(
          (post) => post.tags.includes(tag.slug) && post.lang === "it"
        ).length,
        ja: posts.filter(
          (post) => post.tags.includes(tag.slug) && post.lang === "ja"
        ).length,
        ko: posts.filter(
          (post) => post.tags.includes(tag.slug) && post.lang === "ko"
        ).length,
      };
    });
  },
});
