import { Inter } from "next/font/google";
import clsx from "clsx";

import "../globals.css";
import { getAlternateLanguages } from "@/lib/metadata";
import { METADATA } from "@/constants/metadata";
import { dictionaryKeys, getDictionary } from "@/dictionaries";
import { Metadata } from "next";

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
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang);

  return {
    metadataBase: new URL(dict.baseUrl),
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
      type: "website",
      url: new URL(dict.urls.home, dict.baseUrl).href,
      title: dict.websiteName,
      description: dict.defaultDescription,
      siteName: dict.websiteName,
      locale: params.lang,
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
      languages: await getAlternateLanguages((dict) => dict.urls.home),
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
