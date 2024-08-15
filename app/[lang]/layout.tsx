import { Inter } from "next/font/google";
import clsx from "clsx";

import "../globals.css";
import { METADATA } from "@/lib/metadata";
import { getDictionary } from "@/dictionaries";

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
