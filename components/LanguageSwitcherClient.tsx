"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export function LanguageSwitcherClient({
  currentLang,
  languages,
  labels,
}: {
  currentLang: string;
  languages: string[];
  labels: Record<string, string>;
}) {
  const pathname = usePathname() || "/";
  const search = useSearchParams();
  const qs = search?.toString();

  const build = (target: string) => {
    const segs = pathname.split("/");
    if (segs.length > 1) segs[1] = target;
    const next = segs.join("/");
    return qs ? `${next}?${qs}` : next;
  };

  return (
    <nav className="flex flex-wrap gap-3 text-sm text-stone-600">
      {languages.map((lang) => (
        <Link
          key={lang}
          href={build(lang)}
          className={
            lang === currentLang
              ? "font-semibold text-stone-900 underline"
              : "underline hover:text-stone-900"
          }
        >
          {labels[lang]}
        </Link>
      ))}
    </nav>
  );
}
