"use client";

import Image from "next/image";
import Wrapper from "@/components/ui/Wrapper";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AppButton from "../../AppButton";
import StatEgg from "./StatEgg";

// ─── Data ─────────────────────────────────────────────────────────────────────

const whyChooseUsData = [
  {
    value: "facilities",
    title: "Our Facilities",
    description:
      "Qualified teachers who understand children's needs and focus on personal attention through play-based and academic learning.",
    points: [
      "Experienced & caring teachers",
      "Safe & friendly environment",
      "Modern learning methods",
      "Focus on moral & social values",
    ],
  },
  {
    value: "curriculum",
    title: "Curriculum & Learning",
    description:
      "Our curriculum blends structured academic learning with creative exploration, giving every child a well-rounded foundation for life.",
    points: [
      "Activity-based learning approach",
      "Phonics & early literacy focus",
      "STEM integrated lessons",
      "Regular progress assessments",
    ],
  },
  {
    value: "mission",
    title: "Mission & Vision",
    description:
      "We believe every child deserves a nurturing space to grow, question, and thrive — guided by passionate educators who care.",
    points: [
      "Child-centred philosophy",
      "Inclusive for all learners",
      "Community-driven values",
      "Long-term growth mindset",
    ],
  },
];

const statEggs = [
  {
    percent: "100%",
    label: "Safe Classroom",
    bgColor: "#e8f4f0",
    textColor: "#2C4A6E",
    imageSrc: "/template-1/why-choose-us/counter-bg.png",
    defaultShowImage: true,
  },
  {
    percent: "95%",
    label: "Safe Playground",
    bgColor: "#dff0f7",
    textColor: "#2C4A6E",
    imageSrc: "/template-1/why-choose-us/counter-bg.png",
  },
  {
    percent: "100%",
    label: "Child Security",
    bgColor: "#e9e8f6",
    textColor: "#2C4A6E",
    imageSrc: "/template-1/why-choose-us/counter-bg.png",
  },
  {
    percent: "99%",
    label: "Clean Environment",
    bgColor: "#fce8ee",
    textColor: "#2C4A6E",
    imageSrc: "/template-1/why-choose-us/counter-bg.png",
  },
];

// ─── Check icon ───────────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className="shrink-0 mt-0.5"
      aria-hidden="true"
    >
      <circle
        cx="9"
        cy="9"
        r="9"
        fill="var(--primary-template-1)"
        opacity="0.15"
      />
      <path
        d="M5.5 9L8 11.5L12.5 7"
        stroke="var(--primary-template-1)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Circular Image Cluster (matches screenshot layout) ───────────────────────

function ImageCluster() {
  return (
    <div className="relative w-full h-[420px] lg:h-full min-h-[380px]">
      {/* Top-left circle — large main image */}
      <div
        className="absolute top-0 left-4 w-[220px] h-[220px] rounded-full overflow-hidden border-4 border-white shadow-xl z-10"
        style={{ boxShadow: "0 8px 32px rgba(44,74,110,0.13)" }}
      >
        <Image
          fill
          src="/template-1/why-choose-us/news-3.jpg"
          alt="Children learning"
          className="object-cover"
          sizes="220px"
          priority
        />
      </div>

      {/* Top-right circle — slightly smaller, overlaps */}
      <div
        className="absolute top-8 right-0 w-[175px] h-[175px] rounded-full overflow-hidden border-4 border-white shadow-xl z-20"
        style={{ boxShadow: "0 8px 32px rgba(44,74,110,0.13)" }}
      >
        <Image
          fill
          src="/template-1/why-choose-us/news-3.jpg"
          alt="Happy kids"
          className="object-cover object-right-top"
          sizes="175px"
        />
      </div>

      {/* Bottom-right circle */}
      <div
        className="absolute bottom-0 right-8 w-[200px] h-[200px] rounded-full overflow-hidden border-4 border-white shadow-xl z-10"
        style={{ boxShadow: "0 8px 32px rgba(44,74,110,0.13)" }}
      >
        <Image
          fill
          src="/template-1/why-choose-us/news-3.jpg"
          alt="Classroom activity"
          className="object-cover object-bottom"
          sizes="200px"
        />
      </div>

      {/* Decorative soft blob behind the cluster */}
      <div
        className="absolute inset-0 -z-10 rounded-full opacity-30 blur-2xl"
        style={{
          background:
            "radial-gradient(ellipse at 60% 40%, var(--primary-template-1) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

// ─── WhyChooseUs ──────────────────────────────────────────────────────────────

export default function WhyChooseUs() {
  return (
    <section className="relative bg-background overflow-hidden">
      {/* Floating crown decoration */}
      <div className="w-20 h-20 absolute left-1/2 translate-x-1/2 scale-200 top-24 z-10 pointer-events-none animate-[upDown_5s_ease-in-out_infinite]">
        <Image
          src="/template-1/why-choose-us/choose-us-shape2.png"
          alt=""
          fill
          className="object-contain opacity-60"
          aria-hidden="true"
        />
      </div>

      <Wrapper className="py-20">
        {/* ── Header ── */}
        <div className="mb-8">
          <p
            className="font-brand font-bold text-base italic mb-1"
            style={{ color: "var(--primary-template-1)" }}
          >
            Why choose us?
          </p>
          <h2
            className="font-brand font-black text-4xl"
            style={{ color: "var(--secondary-template-2)" }}
          >
            Why Choose Our School
          </h2>
        </div>

        {/* ── Main two-column layout ── */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* ── LEFT: shadcn Tabs + content ── */}
          <div className="flex-1 min-w-0">
            <Tabs defaultValue="facilities" className="w-full">
              {/* Tab pills using shadcn TabsList */}
              <TabsList className="flex flex-wrap gap-2 mb-6 bg-transparent p-0 h-auto justify-start">
                {whyChooseUsData.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className={[
                      "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border",
                      "bg-white border-slate-200 text-slate-500",
                      "data-[state=active]:text-white data-[state=active]:border-transparent data-[state=active]:shadow-sm",
                      "hover:border-[var(--primary-template-1)] hover:text-[var(--primary-template-1)]",
                    ].join(" ")}
                    style={
                      {
                        // active state colors injected via CSS var trick
                        "--tw-ring-shadow": "none",
                      } as React.CSSProperties
                    }
                    // shadcn applies data-[state=active] — we override background via inline for active
                    onFocus={() => {}}
                  >
                    <span
                      className="[.data-\\[state\\=active\\]_&]:hidden hidden"
                      aria-hidden
                    />
                    {tab.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              {whyChooseUsData.map((tab) => (
                <TabsContent key={tab.value} value={tab.value} className="mt-0">
                  {/* Tab description */}
                  <p className="text-slate-500 text-sm leading-relaxed mb-5 max-w-sm">
                    {tab.description}
                  </p>

                  {/* Bullet points — 2 col grid */}
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-8">
                    {tab.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <CheckIcon />
                        <span className="text-sm font-medium text-slate-600">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA buttons */}
                  <div className="flex flex-wrap gap-3">
                    <AppButton type="primary" icon href="/enroll">
                      Enroll Now
                    </AppButton>
                    <AppButton type="secondary" icon href="/visit">
                      Book A Visit
                    </AppButton>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* ── RIGHT: circular image cluster ── */}
          <div className="w-full lg:w-[440px] shrink-0">
            <ImageCluster />
          </div>
        </div>

        {/* ── Stat egg row ── */}
        <div className="mt-16 grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 max-lg:grid-cols-3 justify-center sm:justify-start gap-12">
          {statEggs.map((egg) => (
            <StatEgg key={egg.label} {...egg} />
          ))}
        </div>
      </Wrapper>

      {/* Active tab pill color override — using a global style since Tailwind can't do dynamic CSS vars in arbitrary values cleanly */}
      <style jsx global>{`
        @keyframes upDown {
          0%,
          100% {
            transform: translateX(-50%) translateY(-50%);
          }
          50% {
            transform: translateX(-50%) translateY(calc(-50% + 12px));
          }
        }

        /* Active tab pill */
        [data-state="active"].rounded-full {
          background: var(--primary-template-1) !important;
          border-color: var(--primary-template-1) !important;
          color: #fff !important;
        }
      `}</style>
    </section>
  );
}
