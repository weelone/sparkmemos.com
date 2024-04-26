import { Inter } from "next/font/google";
import clsx from "clsx";

import "./globals.css";
import { type Metadata } from "next";
import { METADATA } from "@/lib/metadata";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    template: "%s - Spark Memos",
    default: "Spark Memos - Quickly capture your inspiration.",
  },
  description:
    "The perfect tool for capturing your inspiration on the go! You can quickly jot down your thoughts, ideas, and creativity wherever you are. Or use it for later reading, journaling, or even organizing your day. The intuitive interface makes it easy to keep track of your insights and stay organized.",
  itunes: {
    appId: METADATA.appId,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={clsx("bg-stone-50 antialiased", inter.variable)}>
      <body>{children}</body>
    </html>
  );
}
