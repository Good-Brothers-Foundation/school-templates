import Link from "next/link";
import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import TextFlipper from "@/components/ui/TextFlipper";

// ─── Types ────────────────────────────────────────────────────────────────────

type ButtonVariant = "primary" | "secondary";

interface BaseProps {
  /** Visual variant — maps to --primary-template-1 or --secondary-template-2 */
  type?: ButtonVariant;
  icon?: boolean;
  className?: string;
  children: React.ReactNode;
}

type AnchorProps = BaseProps & { href: string } & Omit<
    ComponentPropsWithoutRef<"a">,
    keyof BaseProps
  >;

type NativeButtonProps = BaseProps & { href?: undefined } & {
  htmlType?: "button" | "submit" | "reset";
  disabled?: boolean;
} & Omit<ComponentPropsWithoutRef<"button">, keyof BaseProps | "type">;

type AppButtonProps = AnchorProps | NativeButtonProps;

// ─── Styles ───────────────────────────────────────────────────────────────────

const base =
  "inline-flex items-center gap-2 rounded-full font-brand font-extrabold text-[0.92rem] " +
  "tracking-wide whitespace-nowrap border-2 transition-all duration-200 ease-out " +
  "active:scale-95 select-none cursor-pointer";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-template-1 border-primary-template-1 text-white px-5 py-[9px] " +
    "hover:shadow-primary-glow",
  secondary:
    "bg-transparent border-secondary-template-1 text-secondary-template-1 px-5 py-[9px] " +
    "hover:bg-secondary-template-1 hover:text-white hover:shadow-secondary-glow",
};

// ─── Icon ─────────────────────────────────────────────────────────────────────

function CircleArrow() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
    >
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6 8h4M8 6l2 2-2 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AppButton(props: AppButtonProps) {
  const { type = "primary", icon = false, className, children } = props;
  const classes = cn("group", base, variants[type], className);

  const content = (
    <>
      <TextFlipper>
        <span>{children}</span>
      </TextFlipper>
      {icon && <CircleArrow />}
    </>
  );

  if ("href" in props && props.href) {
    const {
      href,
      type: _t,
      icon: _i,
      className: _c,
      children: _ch,
      ...rest
    } = props as AnchorProps;
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  const {
    htmlType = "button",
    disabled,
    type: _t,
    icon: _i,
    className: _c,
    children: _ch,
    ...rest
  } = props as NativeButtonProps;
  return (
    <button
      type={htmlType}
      className={cn(classes, disabled && "opacity-40 pointer-events-none ")}
      disabled={disabled}
      {...rest}
    >
      {content}
    </button>
  );
}
