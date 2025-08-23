import Link from "next/link";
import clsx from "clsx";

const baseStyles = {
  solid:
    "inline-flex justify-center rounded-lg py-2 px-3 text-sm font-semibold outline-none focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors",
  outline:
    "inline-flex justify-center rounded-lg border py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm outline-none focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors",
};

const variantStyles = {
  solid: {
    orange:
      "relative overflow-hidden bg-orange-500 text-white before:absolute before:inset-0 active:before:bg-transparent hover:before:bg-white/10 active:bg-orange-600 active:text-white/80 before:transition-colors",
    white:
      "bg-white text-orange-900 hover:bg-white/90 active:bg-white/90 active:text-orange-900/70",
    gray: "bg-stone-800 text-white hover:bg-stone-900 active:bg-stone-800 active:text-white/80",
  },
  outline: {
    orange:
      "border-orange-500 text-orange-500 hover:border-orange-600 active:bg-orange-50 active:text-orange-600/80",
    gray: "border-stone-300 text-stone-700 hover:border-stone-400 active:bg-stone-100 active:text-stone-700/80",
  },
};

type ButtonProps = (
  | {
      variant?: "solid";
      color?: keyof typeof variantStyles.solid;
    }
  | {
      variant: "outline";
      color?: keyof typeof variantStyles.outline;
    }
) &
  (
    | Omit<React.ComponentPropsWithoutRef<typeof Link>, "color">
    | (Omit<React.ComponentPropsWithoutRef<"button">, "color"> & {
        href?: undefined;
      })
  );

export function Button({ className, ...props }: ButtonProps) {
  props.variant ??= "solid";
  props.color ??= "orange";

  className = clsx(
    baseStyles[props.variant],
    props.variant === "outline"
      ? variantStyles.outline[props.color]
      : props.variant === "solid"
      ? variantStyles.solid[props.color]
      : undefined,
    className
  );

  return typeof props.href === "undefined" ? (
    <button className={className} {...props} />
  ) : (
    <Link className={className} {...props} />
  );
}
