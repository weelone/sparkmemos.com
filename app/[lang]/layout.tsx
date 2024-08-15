import { Inter } from "next/font/google";
import clsx from "clsx";

import "../globals.css";
import { METADATA } from "@/lib/metadata";
import { dictionaryKeys, getDictionary } from "@/dictionaries";

export const runtime = "edge";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}) {
  const dict = await getDictionary(params.lang);
  const langEntries = await Promise.all(
    dictionaryKeys.map(async (lang) => {
      const dictionary = await getDictionary(lang);

      return [lang, dictionary.urls.home];
    })
  );

  return {
    title: {
      template: dict.titleTemplate,
      default: dict.defaultTitle,
    },
    description: dict.defaultDescription,
    keywords: dict.defaultKeywords,
    itunes: {
      appId: METADATA.appId,
    },
    openGraph: {
      title: dict.websiteName,
      description: dict.defaultDescription,
      siteName: dict.websiteName,
      images: "/social-banner.png",
    },
    twitter: {
      title: dict.websiteName,
      description: dict.defaultDescription,
      site: "@WeeloneHQ",
      card: "summary_large_image",
      images: "/social-banner.png",
    },
    alternates: {
      languages: Object.fromEntries(langEntries),
    },
  };
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}) {
  return (
    <html
      lang={params.lang}
      className={clsx("bg-stone-50 antialiased", inter.variable)}
    >
      <body>{children}</body>
    </html>
  );
}
