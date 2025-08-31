import { posts, categories } from "@/.velite";
import Link from "next/link";
import { Language, getDictionary } from "@/dictionaries";
import { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import { getAlternateLanguages } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Language }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return {
    metadataBase: new URL(dictionary.baseUrl),
    title: dictionary.blog.title,
    description: dictionary.blog.description,
    keywords: dictionary.defaultKeywords,
    openGraph: {
      type: "website",
      url: new URL(dictionary.urls.blog, dictionary.baseUrl).href,
      title: dictionary.blog.title,
      description: dictionary.blog.description,
      siteName: dictionary.websiteName,
      locale: lang,
      images: "/social-banner.png",
    },
    twitter: {
      title: dictionary.blog.title,
      description: dictionary.blog.description,
      site: "@noobnooc",
      card: "summary_large_image",
    },
    alternates: {
      canonical: new URL(dictionary.urls.blog, dictionary.baseUrl).href,
      languages: await getAlternateLanguages((dict) => dict.urls.blog),
    },
  };
}

function getPublishedPosts(lang: string) {
  return posts
    .sort((p1, p2) => new Date(p2.date).getTime() - new Date(p1.date).getTime())
    .filter((post) => !post.draft && post.lang === lang);
}

export default async function PostsPage({
  params,
}: {
  params: Promise<{
    lang: Language;
  }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const posts = getPublishedPosts(lang);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold font-serif mt-4">
        {dictionary.blog.title}
      </h1>
      <p className="text-xl opacity-70">{dictionary.blog.description}</p>
      <div className="flex flex-col sm:flex-row sm:items-start my-16">
        <ul className="basis-3/4 lg:basis-2/3 flex flex-col gap-4">
          {posts.map((post) => (
            <li key={post.slug} className="flex flex-col gap-1">
              <Link href={post.permalink}>
                <h2 className="text-2xl font-serif underline">{post.title}</h2>
              </Link>
              <p className="opacity-70">{post.description}</p>
              <div className="opacity-50 flex items-center gap-4">
                <span className="flex gap-2 items-center text-sm">
                  <CalendarDays className="w-4 h-4" />
                  {Intl.DateTimeFormat(lang, {
                    dateStyle: "medium",
                  }).format(new Date(post.date))}
                </span>
              </div>
            </li>
          ))}
        </ul>
        <section className="basis-1/4 lg:basis-1/3 sticky top-28 flex flex-col items-end">
          <ol className="underline font-serif">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link href={category.permalink[lang]}>
                  {category.name[lang]}{" "}
                  <span className="opacity-50">({category.count[lang]})</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}
