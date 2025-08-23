import { Inter } from "next/font/google";
import clsx from "clsx";

import "../globals.css";
import { getAlternateLanguages } from "@/lib/metadata";
import { METADATA } from "@/constants/metadata";
import { getDictionary, Language } from "@/dictionaries";
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
  params: Promise<{ lang: Language }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

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
      locale: lang,
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

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return (
    <html
      lang={lang}
      className={clsx("bg-stone-50 antialiased", inter.variable)}
    >
      <body>{children}</body>
    </html>
  );
}
