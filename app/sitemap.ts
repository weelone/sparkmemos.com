import { MetadataRoute } from "next";
import { dictionaryKeys, getDictionary } from "../dictionaries";
import { posts, categories } from "@/.velite";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dictionaries = await Promise.all(dictionaryKeys.map(getDictionary));

  const basicUrls = dictionaries.map((dictionary) => {
    return [
      {
        url: new URL(dictionary.urls.home, dictionary.baseUrl).href,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 1,
      },
      {
        url: new URL(dictionary.urls.blog, dictionary.baseUrl).href,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 1,
      },
    ];
  });

  const postUrls = posts.map((post) => {
    return {
      url: new URL(post.permalink, dictionaries[0].baseUrl).href,
      lastModified: post.updated || post.date,
      changeFrequency: "daily" as const,
      priority: 1,
    };
  });

  const categoryUrls = categories.map((category) => {
    return dictionaryKeys.map((lang) => {
      return {
        url: new URL(category.permalink[lang], dictionaries[0].baseUrl).href,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 1,
      };
    });
  });

  return [...basicUrls.flat(), ...postUrls, ...categoryUrls.flat()];
}
