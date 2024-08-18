import { posts, categories } from "@/.velite";
import Link from "next/link";
import { Language, getDictionary } from "@/dictionaries";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays } from "lucide-react";

export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: { lang: Language; categorySlug: string };
}): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang);
  const category = categories.find(
    (category) => category.slug === params.categorySlug
  );

  if (!category) {
    notFound();
  }

  return {
    metadataBase: new URL(dictionary.baseUrl),
    title: category.name[params.lang],
    description: category.description?.[params.lang],
    keywords: dictionary.defaultKeywords,
    openGraph: {
      title: category.name[params.lang],
      description: category.description?.[params.lang],
    },
    twitter: {
      title: category.name[params.lang],
      description: category.description?.[params.lang],
      site: "@noobnooc",
      card: "summary_large_image",
    },
  };
}

function getPublishedPosts(lang: string, category: string) {
  return posts
    .sort((p1, p2) => new Date(p2.date).getTime() - new Date(p1.date).getTime())
    .filter(
      (post) =>
        !post.draft && post.lang === lang && post.categories.includes(category)
    );
}

export default async function CategoryPostsPage({
  params,
}: {
  params: {
    lang: Language;
    categorySlug: string;
  };
}) {
  const category = categories.find(
    (category) => category.slug === params.categorySlug
  );

  if (!category) {
    notFound();
  }

  const posts = getPublishedPosts(params.lang, category.slug);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex">
      <div className="md:basis-3/4 lg:basis-2/3">
        <h1 className="text-4xl font-bold font-serif mt-4">
          {category.name[params.lang]}
        </h1>
        <p className="text-xl opacity-70">
          {category.description?.[params.lang]}
        </p>
        <ul className="lg:basis-3/4 my-16">
          {posts.map((post) => (
            <li key={post.slug} className="flex flex-col gap-1">
              <Link href={post.seoLink}>
                <h1 className="text-2xl font-serif underline">{post.title}</h1>
              </Link>
              <p className="opacity-70">{post.description}</p>
              <div className="opacity-50 flex items-center gap-4">
                <span className="flex gap-2 items-center text-sm">
                  <CalendarDays className="w-4 h-4" />
                  {Intl.DateTimeFormat(params.lang, {
                    dateStyle: "medium",
                  }).format(new Date(post.date))}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
