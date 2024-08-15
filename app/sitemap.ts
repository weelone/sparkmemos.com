import { MetadataRoute } from "next";
import { dictionaryKeys, getDictionary } from "../dictionaries";

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
    ];
  });

  return [...basicUrls.flat()];
}
