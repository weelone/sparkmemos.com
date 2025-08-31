import type { Metadata } from "next";
import { getDictionary, Language } from "@/dictionaries";
import { getAlternateLanguages } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Language }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    alternates: {
      canonical: new URL(dict.urls.terms, dict.baseUrl).href,
      languages: await getAlternateLanguages((d) => d.urls.terms),
    },
  };
}

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col p-4 mt-10 mb-20 mx-auto prose">
      {children}
    </div>
  );
}
