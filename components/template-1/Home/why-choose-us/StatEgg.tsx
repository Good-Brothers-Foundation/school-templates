"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface StatEggProps {
  percent: string;
  label: string;
  /** Pastel background color when image is NOT shown */
  bgColor: string;
  /** Text color for percent + label */
  textColor: string;
  /** Image src revealed on hover */
  imageSrc: string;
  /** Show image by default (first card) */
  defaultShowImage?: boolean;
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function StatEgg({
  percent,
  label,
  bgColor,
  textColor,
  imageSrc,
  defaultShowImage = false,
  className,
}: StatEggProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col items-center justify-center text-center",
        "overflow-hidden transition-all duration-500 ease-out cursor-default",
        // Egg / oval shape — taller than wide with asymmetric vertical radius
        "w-full h-74 shadow-xl",
        className,
      )}
      style={{
        // Organic egg: wider radius at top, narrower at bottom
        borderRadius: "50% 50% 50% 50% / 45% 45% 55% 55%",
        background: bgColor,
      }}
    >
      {/* ── Background image (hidden by default, revealed on hover) ── */}
      <div
        className={cn(
          "absolute inset-0 transition-all duration-500 ease-out bg-transparent",

          "opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100",
        )}
      >
        <Image
          src={imageSrc}
          alt=""
          fill
          className="object-cover bg-transparent"
          sizes="148px"
          aria-hidden="true"
        />
        {/* Dark overlay so text stays readable over image */}
      </div>

        {/* <div className="absolute inset-0 bg-black/10" /> */}
      {/* ── Text content ── */}
      <div className="relative z-10 flex flex-col items-center gap-1 px-3 transition-colors duration-500 group-hover:text-white">
        <span
          className={cn(
            " text-3xl font-bold leading-none ",
          )}
          // style={{ color: defaultShowImage ? undefined : textColor }}
        >
          {percent}
        </span>
        <span
          className={cn(
            "font-body text-[0.72rem] font-semibold leading-snug ",
            
          )}
          // style={{ color: defaultShowImage ? undefined : textColor }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
