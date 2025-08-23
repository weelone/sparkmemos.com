"use client";

import { useState } from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import clsx from "clsx";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Logomark } from "@/components/Logo";
import { Dictionary } from "@/dictionaries";

function CheckIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z"
        fill="currentColor"
      />
      <circle
        cx="12"
        cy="12"
        r="8.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Plan({
  name,
  price,
  description,
  button,
  features,
  activePeriod,
  logomarkClassName,
  featured = false,
}: {
  name: string;
  price: {
    Monthly: string;
    Annually: string;
  };
  description: string;
  button: {
    label: string;
    href: string;
  };
  features: Array<string>;
  activePeriod: "Monthly" | "Annually";
  logomarkClassName?: string;
  featured?: boolean;
}) {
  return (
    <section
      className={clsx(
        "flex flex-col overflow-hidden rounded-3xl p-6 shadow-lg shadow-stone-900/5",
        featured ? "order-first bg-stone-900 lg:order-none" : "bg-white"
      )}
    >
      <h3
        className={clsx(
          "flex items-center text-sm font-semibold",
          featured ? "text-white" : "text-stone-900"
        )}
      >
        <Logomark className={clsx("h-6 w-6 flex-none", logomarkClassName)} />
        <span className="ml-4">{name}</span>
      </h3>
      <p
        className={clsx(
          "relative mt-5 flex text-3xl tracking-tight",
          featured ? "text-white" : "text-stone-900"
        )}
      >
        {price.Monthly === price.Annually ? (
          price.Monthly
        ) : (
          <>
            <span
              aria-hidden={activePeriod === "Annually"}
              className={clsx(
                "transition duration-300",
                activePeriod === "Annually" &&
                  "pointer-events-none translate-x-6 select-none opacity-0"
              )}
            >
              {price.Monthly}
            </span>
            <span
              aria-hidden={activePeriod === "Monthly"}
              className={clsx(
                "absolute left-0 top-0 transition duration-300",
                activePeriod === "Monthly" &&
                  "pointer-events-none -translate-x-6 select-none opacity-0"
              )}
            >
              {price.Annually}
            </span>
          </>
        )}
      </p>
      <p
        className={clsx(
          "mt-3 text-sm",
          featured ? "text-stone-300" : "text-stone-700"
        )}
      >
        {description}
      </p>
      <div className="order-last mt-6">
        <ul
          role="list"
          className={clsx(
            "-my-2 divide-y text-sm",
            featured
              ? "divide-stone-800 text-stone-300"
              : "divide-stone-200 text-stone-700"
          )}
        >
          {features.map((feature) => (
            <li key={feature} className="flex py-2">
              <CheckIcon
                className={clsx(
                  "h-6 w-6 flex-none",
                  featured ? "text-white" : "text-orange-500"
                )}
              />
              <span className="ml-4">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <Button
        href={button.href}
        color={featured ? "orange" : "gray"}
        className="mt-6"
        aria-label={`Get started with the ${name} plan for ${price}`}
      >
        {button.label}
      </Button>
    </section>
  );
}

export function Pricing({ dict }: { dict: Dictionary }) {
  let [activePeriod, setActivePeriod] = useState<"Monthly" | "Annually">(
    "Monthly"
  );

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="border-t border-stone-200 bg-stone-100 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="pricing-title"
            className="text-3xl font-medium tracking-tight text-stone-900"
          >
            {dict.homeSections.pricing.title}
          </h2>
          <p className="mt-2 text-lg text-stone-600">
            {dict.homeSections.pricing.description}
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="relative">
            <RadioGroup
              value={activePeriod}
              onChange={setActivePeriod}
              className="grid grid-cols-2"
            >
              {["Monthly", "Annually"].map((period) => (
                <Radio
                  key={period}
                  value={period}
                  className={clsx(
                    "cursor-pointer border border-stone-300 px-[calc(theme(spacing.3)-1px)] py-[calc(theme(spacing.2)-1px)] text-sm text-stone-700 transition-colors hover:border-stone-400",
                    period === "Monthly"
                      ? "rounded-l-lg"
                      : "-ml-px rounded-r-lg"
                  )}
                >
                  {period === "Monthly"
                    ? dict.homeSections.pricing.monthlyLabel
                    : dict.homeSections.pricing.annuallyLabel}
                </Radio>
              ))}
            </RadioGroup>
            <div
              aria-hidden="true"
              className={clsx(
                "pointer-events-none absolute inset-0 z-10 grid grid-cols-2 overflow-hidden rounded-lg bg-orange-500 transition-all duration-300",
                activePeriod === "Monthly"
                  ? "[clip-path:inset(0_50%_0_0)]"
                  : "[clip-path:inset(0_0_0_50%)]"
              )}
            >
              {["Monthly", "Annually"].map((period) => (
                <div
                  key={period}
                  className={clsx(
                    "py-2 text-center text-sm font-semibold text-white"
                  )}
                >
                  {period === "Monthly"
                    ? dict.homeSections.pricing.monthlyLabel
                    : dict.homeSections.pricing.annuallyLabel}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-10 sm:mt-20 lg:max-w-none lg:grid-cols-3">
          {dict.homeSections.pricing.plans.map((plan) => (
            <Plan key={plan.name} {...plan} activePeriod={activePeriod} />
          ))}
        </div>
      </Container>
    </section>
  );
}
