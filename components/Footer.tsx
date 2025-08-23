import Link from "next/link";

import { Container } from "@/components/Container";
import { Logomark } from "@/components/Logo";
import { NavLinks } from "@/components/NavLinks";
import { METADATA } from "@/constants/metadata";
import { Dictionary, Language } from "@/dictionaries";
import { AppStoreQRCode } from "./QRCode";
import { LanguageSwitcher } from "./LanguageSwitcher";

function QrCodeBorder(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 96 96" fill="none" aria-hidden="true" {...props}>
      <path
        d="M1 17V9a8 8 0 0 1 8-8h8M95 17V9a8 8 0 0 0-8-8h-8M1 79v8a8 8 0 0 0 8 8h8M95 79v8a8 8 0 0 1-8 8h-8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="border-t border-stone-200">
      <Container>
        <div className="flex flex-col items-start justify-between gap-y-12 pb-6 pt-16 lg:flex-row lg:items-center lg:py-16">
          <div>
            <div className="flex items-center text-stone-900">
              <Logomark className="h-10 w-10 flex-none fill-orange-500" />
              <div className="ml-4">
                <p className="text-base font-semibold">{dict.appName}</p>
                <p className="mt-1 text-sm">{dict.appSummary}</p>
              </div>
            </div>
            <nav className="mt-11 flex gap-8">
              <NavLinks type="footer" dict={dict} />
            </nav>
          </div>
          <div className="group relative -mx-4 flex items-center self-stretch p-4 transition-colors hover:bg-stone-100 sm:self-auto sm:rounded-2xl lg:mx-0 lg:self-auto lg:p-6">
            <div className="relative flex h-24 w-24 flex-none items-center justify-center">
              <QrCodeBorder className="absolute inset-0 h-full w-full stroke-stone-300 transition-colors group-hover:stroke-orange-500" />
              <AppStoreQRCode />
            </div>
            <div className="ml-8 lg:w-64">
              <p className="text-base font-semibold text-stone-900">
                <Link href={METADATA.appStoreLink} target="_blank">
                  <span className="absolute inset-0 sm:rounded-2xl" />
                  {dict.labels.downloadTheApp}
                </Link>
              </p>
              <p className="mt-1 text-sm text-stone-700">
                {dict.labels.scanTheQrCode}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center border-t border-stone-200 pb-12 pt-8 md:flex-row md:justify-between md:pt-6">
          {/* Language switcher */}
          <div className="flex flex-wrap mt-4 md:mt-0">
            {/* dict 自带当前语言上下文，读取 urls.home 的前缀推断 */}
            <LanguageSwitcher
              currentLang={dict.urls.home.split("/")[1] as Language}
            />
          </div>
          <p className="mt-6 text-sm text-stone-500 md:mt-0">
            &copy; Copyright {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
