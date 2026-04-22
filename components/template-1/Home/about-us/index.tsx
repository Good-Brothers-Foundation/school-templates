"use client";

import Wrapper from "@/components/ui/Wrapper";
import Image from "next/image";
import AppButton from "../../AppButton";

// ─── Feature check-card ───────────────────────────────────────────────────────

function FeatureCard({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-slate-100">
      {/* Orange check circle */}
      <span
        className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full"
        style={{ background: "var(--primary-template-1)" }}
        aria-hidden="true"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M2.5 7L5.5 10L11.5 4"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <p className="text-[0.82rem] font-semibold text-secondary leading-snug">
        {text}
      </p>
    </div>
  );
}

// ─── Phone CTA ────────────────────────────────────────────────────────────────

function PhoneCTA() {
  return (
    <a
      href="tel:+11230654 98"
      className="flex items-center gap-3 group"
      aria-label="Call us now"
    >
      {/* Dark circle icon */}
      <span
        className="shrink-0 flex items-center justify-center w-11 h-11 rounded-full transition-colors duration-200 group-hover:opacity-80"
        style={{ background: "var(--secondary-template-2)" }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"
            fill="#fff"
          />
        </svg>
      </span>

      <div className="flex flex-col leading-tight">
        <span className="text-[0.72rem] font-medium text-slate-400 uppercase tracking-wide">
          Call Us Now
        </span>
        <span
          className="text-[1rem] font-bold"
          style={{ color: "var(--secondary-template-2)" }}
        >
          +11 123 0654 98
        </span>
      </div>
    </a>
  );
}

// ─── Decorative curly arrows ──────────────────────────────────────────────────

function CurlyArrows() {
  return (
    <svg
      width="52"
      height="36"
      viewBox="0 0 52 36"
      fill="none"
      aria-hidden="true"
      className="absolute top-6 left-[38%] opacity-80 pointer-events-none"
    >
      {[0, 14, 28].map((x) => (
        <path
          key={x}
          d={`M${x + 2},28 C${x + 2},20 ${x + 10},12 ${x + 10},6`}
          stroke="#5c6bc0"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
      ))}
      {[0, 14, 28].map((x) => (
        <path
          key={`h-${x}`}
          d={`M${x + 8},4 L${x + 10},6 L${x + 12},4`}
          stroke="#5c6bc0"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      ))}
    </svg>
  );
}

// ─── Alphabet blocks ──────────────────────────────────────────────────────────

function AlphabetBlocks() {
  const blocks = [
    { letter: "A", color: "#a5d6a7", x: 12, y: 18 },
    { letter: "B", color: "#ce93d8", x: 36, y: 24 },
    { letter: "C", color: "#80cbc4", x: 0, y: 36 },
  ];
  return (
    <div
      className="absolute bottom-3 right-4 pointer-events-none select-none"
      aria-hidden="true"
      style={{ width: 72, height: 68 }}
    >
      {blocks.map(({ letter, color, x, y }) => (
        <div
          key={letter}
          className="absolute flex items-center justify-center rounded-lg font-brand font-black text-white text-base shadow-md"
          style={{
            width: 32,
            height: 32,
            background: color,
            left: x,
            top: y,
            fontSize: "0.85rem",
          }}
        >
          {letter}
        </div>
      ))}
    </div>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────

export default function AboutSection() {
  return (
    <section
      className="py-14 px-4 md:px-8 font-quicksand"
      style={{ background: "#f9f4ec" }}
    >
      {/*
        Wrapper — your pre-built component.
        We only add bubble styling here: light-blue bg, large radius, overflow-hidden.
        No width/max-width — Wrapper handles that.
      */}
      <Wrapper className="relative bg-[#eaf3f8] rounded-[2.5rem] overflow-hidden shadow-sm">
        {/* Curly arrow decoration */}
        <CurlyArrows />

        {/* Alphabet blocks decoration */}
        <AlphabetBlocks />

        <div className="flex flex-col lg:flex-row gap-10 items-stretch min-h-95">
          {/* ── Left: image ── */}
          <div className="relative w-full lg:w-1/2 h-112.5 lg:h-auto min-h-125 shrink-0">
            {/* Background Image (Teacher) - Positioned Top Left */}
            <div
              className="absolute top-0 left-0 w-[75%] h-[80%] z-10 overflow-hidden shadow-lg"
              style={{ borderRadius: "100px 40px 100px 40px" }}
            >
              <Image
                src="/template-1/about/teacher-with-student.png"
                alt="Teacher with students"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
            </div>

            {/* Foreground Image (Girl) - Overlapping Bottom Right */}
            <div
              className="absolute bottom-4 right-4 lg:right-0 w-[65%] h-[75%] z-20 overflow-hidden"
              style={{ borderRadius: "40px 100px 40px 100px" }}
            >
              <Image
                src="/template-1/about/student.png"
                alt="Student holding globe"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 35vw"
                priority
              />
            </div>

            {/* Optional: Decorative "Splatter" or Circle behind the images */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-100/50 rounded-full blur-3xl z-0" />
          </div>

          {/* ── Right: content ── */}
          <div className="flex flex-col justify-center gap-5 py-10 lg:py-12  flex-1">
            {/* Eyebrow */}
            <p
              className="font-brand font-bold text-sm italic tracking-wide"
              style={{ color: "var(--primary-template-1)" }}
            >
              About Us
            </p>

            {/* Heading */}
            <h2
              className="font-brand font-black text-3xl lg:text-4xl leading-tight"
              style={{ color: "var(--secondary-template-2)" }}
            >
              Inspire Growth Through
              <br />
              Learning Daily
            </h2>

            {/* Intro body */}
            <p className="text-slate-500 text-[18px] font-bold">
              We are a caring kindergarten &amp; school dedicated to building
              strong foundations through play-based and academic learning.
            </p>

            {/* Feature cards row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FeatureCard text="Child-Friendly Learning Environment" />
              <FeatureCard text="Focus on child-friendly, safe, & quality education" />
            </div>

            {/* Secondary body */}
            <p className="text-slate-500 text-[18px] font-semibold">
              At CS Global Primary School, our aim is to give everyone a chance to learn a new
              language. Our skilled team creates fun and useful lessons so each
              student can reach their goals. We&apos;re here to help you gain skills
              for both work and life.
            </p>

            {/* Divider */}
            <hr className="border-slate-200 max-w-md" />

            {/* CTA row */}
            <div className="flex flex-wrap items-center gap-6">
              <AppButton type="primary" icon href="/about">
                Know More
              </AppButton>
              <PhoneCTA />
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
}
