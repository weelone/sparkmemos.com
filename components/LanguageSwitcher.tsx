import { Language, dictionaryKeys, languageLabels } from "@/dictionaries";
import { LanguageSwitcherClient } from "./LanguageSwitcherClient";

// Server Component: render language links at build/request time.
export function LanguageSwitcher({ currentLang }: { currentLang: Language }) {
  return (
    <LanguageSwitcherClient
      currentLang={currentLang}
      languages={dictionaryKeys}
      labels={languageLabels}
    />
  );
}
