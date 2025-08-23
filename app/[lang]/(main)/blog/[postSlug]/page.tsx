import { posts } from "@/.velite";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getDictionary, Language, languageLabels } from "@/dictionaries";
import { Metadata } from "next";
import clsx from "clsx";
import { CalendarDays, Languages } from "lucide-react";
import Script from "next/script";

export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Language; postSlug: string }>;
}): Promise<Metadata> {
  const { lang, postSlug } = await params;
  const dictionary = await getDictionary(lang);

  const post = posts.find(
    (post) => post.lang === lang && post.slug === postSlug
  );

  if (!post) {
    notFound();
  }

  const allLanguages = posts.filter((post) => post.slug === postSlug);

  return {
    metadataBase: new URL(dictionary.baseUrl),
    title: post.title,
    description: post.description || post.title,
    keywords: dictionary.defaultKeywords,
    openGraph: {
      type: "article",
      url: new URL(post.permalink, dictionary.baseUrl).href,
      title: post.title,
      description: post.description || post.title,
      siteName: dictionary.websiteName,
      locale: lang,
      images: post.cover?.src ?? "/social-banner.png",
    },
    twitter: {
      title: post.title,
      description: post.description || post.title,
      site: "@noobnooc",
      card: "summary_large_image",
      images: "/social-banner.png",
    },
    alternates: {
      canonical: new URL(post.permalink, dictionary.baseUrl).href,
      languages: Object.fromEntries(
        allLanguages.map((post) => [
          post.lang,
          new URL(post.permalink, dictionary.baseUrl).href,
        ])
      ),
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ lang: Language; postSlug: string }>;
}) {
  const { lang, postSlug } = await params;
  const dictionary = await getDictionary(lang);

  const post = posts.find(
    (post) => post.lang === lang && post.slug === postSlug
  );

  const otherLanguages = posts.filter(
    (post) => post.slug === postSlug && post.lang !== lang
  );

  if (!post) {
    notFound();
  }

  return (
    <main className="flex mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 mb-16">
      <Script id="ld-json" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description || post.title,
          datePublished: post.date,
          dateModified: post.updated || post.date,
          inLanguage: lang,
          image: post.cover?.src
            ? new URL(post.cover.src, dictionary.baseUrl).href
            : new URL("/social-banner.png", dictionary.baseUrl).href,
          mainEntityOfPage: new URL(post.permalink, dictionary.baseUrl).href,
          publisher: {
            "@type": "Organization",
            name: dictionary.websiteName,
            url: dictionary.baseUrl,
          },
        })}
      </Script>
      <div className="flex flex-col gap-4">
        <article className="flex flex-col gap-2 max-w-prose grow-0 min-w-0">
          <h1 className="text-3xl font-serif">{post.title}</h1>
          <div className="opacity-50 flex items-center gap-2">
            <Languages className="w-4 h-4" />

            {otherLanguages.length ? (
              <div className="flex items-center gap-2">
                {otherLanguages.map((post) => (
                  <Link
                    key={post.lang}
                    className="underline"
                    href={post.permalink}
                  >
                    {languageLabels[post.lang]}
                  </Link>
                ))}
              </div>
            ) : undefined}
          </div>
          <div className="opacity-50 flex items-center gap-4">
            <span className="flex gap-2 items-center text-sm">
              <CalendarDays className="w-4 h-4" />
              {Intl.DateTimeFormat(lang, {
                dateStyle: "medium",
              }).format(new Date(post.date))}
            </span>
          </div>
          <p className="opacity-70">{post.description}</p>
          <hr className="my-4" />
          {/* <div className="leading-loose flex flex-col gap-4">
          <MDXContent code={post.content} />
        </div> */}
          <div
            className={clsx(
              "prose",
              // "dark:prose-invert",
              "prose-headings:font-serif prose-headings:mt-8",
              "prose-h1:text-2xl",
              "prose-h2:text-xl",
              "prose-h3:text-lg",
              "prose-blockquote:font-normal",
              "prose-pre:border prose-pre:rounded-xl",
              "before:prose-p:content-none after:prose-p:content-none"
            )}
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
          {/* <hr className="my-8" /> */}
        </article>
      </div>
      {/* {post.toc.length > 0 ? (
        <section className="hidden md:flex md:basis-1/4 lg:basis-1/3 sticky top-28 flex-col shrink-0 items-end">
          <label className="opacity-50 mb-4">{dictionary.blog.toc}</label>
          <ul className="flex flex-col gap-2 list-disc ml-6">
            {post.toc.map((entry) => (
              <li className="" key={entry.title}>
                <div className="opacity-80">{entry.title}</div>
                <ol className="pr-4 flex flex-col ml-4 gap-2 list-[square]">
                  {entry.items.map((subEntry) => (
                    <li key={subEntry.url}>
                      <div className="opacity-60">{subEntry.title}</div>
                    </li>
                  ))}
                </ol>
              </li>
            ))}
          </ul>
        </section>
      ) : undefined} */}
    </main>
  );
}
