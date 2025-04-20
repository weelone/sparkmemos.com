"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Dictionary } from "@/dictionaries";

export function NavLinks({
  type,
  dict,
}: {
  type: "header" | "footer";
  dict: Dictionary;
}) {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  let timeoutRef = useRef<number | null>(null);

  return (
    type === "header"
      ? [
          [dict.labels.features, `${dict.urls.home}#features`],
          [dict.labels.reviews, `${dict.urls.home}#reviews`],
          [dict.labels.pricing, `${dict.urls.home}#pricing`],
          [dict.labels.faq, `${dict.urls.home}#faqs`],
          [dict.labels.blog, dict.urls.blog],
        ]
      : [
          ["Echobell", "https://echobell.one"],
          ["CassetteOne", "https://cassette.one"],
          ["Weelone Ltd", "https://weelone.com"],
          [dict.labels.terms, dict.urls.terms],
          [dict.labels.privacy, dict.urls.privacy],
        ]
  ).map(([label, href], index) => (
    <Link
      key={label}
      href={href}
      className="relative -mx-3 -my-2 rounded-lg px-3 py-2 text-sm text-stone-700 transition-colors delay-150 hover:text-stone-900 hover:delay-0"
      onMouseEnter={() => {
        if (timeoutRef.current) {
          window.clearTimeout(timeoutRef.current);
        }
        setHoveredIndex(index);
      }}
      onMouseLeave={() => {
        timeoutRef.current = window.setTimeout(() => {
          setHoveredIndex(null);
        }, 200);
      }}
    >
      <AnimatePresence>
        {hoveredIndex === index && (
          <motion.span
            className="absolute inset-0 rounded-lg bg-stone-100"
            layoutId="hoverBackground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.15 } }}
            exit={{
              opacity: 0,
              transition: { duration: 0.15 },
            }}
          />
        )}
      </AnimatePresence>
      <span className="relative z-10">{label}</span>
    </Link>
  ));
}
