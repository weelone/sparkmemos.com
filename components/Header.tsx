"use client";

import Link from "next/link";
import { Popover } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import { NavLinks } from "@/components/NavLinks";
import { METADATA } from "@/constants/metadata";
import { Dictionary } from "@/dictionaries";

function MenuIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5 6h14M5 18h14M5 12h14"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronUpIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M17 14l-5-5-5 5"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MobileNavLink(
  props: Omit<
    React.ComponentPropsWithoutRef<typeof Popover.Button<typeof Link>>,
    "as" | "className"
  >
) {
  return (
    <Popover.Button
      as={Link}
      className="block text-base leading-7 tracking-tight text-stone-700"
      {...props}
    />
  );
}

export function Header({ dict }: { dict: Dictionary }) {
  return (
    <header>
      <nav>
        <Container className="relative z-50 flex justify-between py-8">
          <div className="relative z-10 flex items-center gap-16">
            <Link href={dict.urls.home} aria-label="Home">
              <Logo className="h-10 w-auto" label={dict.websiteName} />
            </Link>
            <div className="hidden lg:flex lg:gap-10">
              <NavLinks type="header" dict={dict} />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Popover className="lg:hidden">
              {({ open }) => (
                <>
                  <Popover.Button
                    className="relative z-10 -m-2 inline-flex items-center rounded-lg stroke-stone-900 p-2 hover:bg-stone-200/50 hover:stroke-stone-600 active:stroke-stone-900 ui-not-focus-visible:outline-none"
                    aria-label="Toggle site navigation"
                  >
                    {({ open }) =>
                      open ? (
                        <ChevronUpIcon className="h-6 w-6" />
                      ) : (
                        <MenuIcon className="h-6 w-6" />
                      )
                    }
                  </Popover.Button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <>
                        <Popover.Overlay
                          static
                          as={motion.div}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 z-0 bg-stone-300/60 backdrop-blur"
                        />
                        <Popover.Panel
                          static
                          as={motion.div}
                          initial={{ opacity: 0, y: -32 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{
                            opacity: 0,
                            y: -32,
                            transition: { duration: 0.2 },
                          }}
                          className="absolute inset-x-0 top-0 z-0 origin-top rounded-b-2xl bg-stone-50 px-6 pb-6 pt-32 shadow-2xl shadow-stone-900/20"
                        >
                          <div className="space-y-4">
                            <MobileNavLink href="/#features">
                              {dict.labels.features}
                            </MobileNavLink>
                            <MobileNavLink href="/#reviews">
                              {dict.labels.reviews}
                            </MobileNavLink>
                            <MobileNavLink href="/#pricing">
                              {dict.labels.pricing}
                            </MobileNavLink>
                            <MobileNavLink href="/#faqs">FAQs</MobileNavLink>
                            <MobileNavLink href="/terms">
                              {dict.labels.userTerms}
                            </MobileNavLink>
                            <MobileNavLink href="/privacy">
                              {dict.labels.privacyPolicy}
                            </MobileNavLink>
                          </div>
                          <div className="mt-8 flex flex-col gap-4">
                            <Button
                              href={METADATA.appStoreLink}
                              target="_blank"
                            >
                              {dict.labels.downloadTheApp}
                            </Button>
                          </div>
                        </Popover.Panel>
                      </>
                    )}
                  </AnimatePresence>
                </>
              )}
            </Popover>
            <Button
              href={METADATA.appStoreLink}
              target="_blank"
              className="hidden lg:block"
            >
              {dict.labels.download}
            </Button>
          </div>
        </Container>
      </nav>
    </header>
  );
}
