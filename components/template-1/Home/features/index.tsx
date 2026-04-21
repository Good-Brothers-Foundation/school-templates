"use client";

import Image from "next/image";
import {
  ActiveLearning,
  ExpertTeacherIcon,
  ModernCurriculum,
  SafeCampus,
} from "./icons";
import Wrapper from "@/components/ui/Wrapper";

// ─── Feature data ─────────────────────────────────────────────────────────────

const features = [
  {
    title: "Active Learning",
    // pastel pink blob
    blobBg: "#fce4ec",
    blobBorder: "#f48fb1",
    iconBg: "#fff0f5",
    iconColor: "#e91e8c",
    icon: <ActiveLearning />,
  },
  {
    title: "Expert Teachers",
    // lavender / purple blob
    blobBg: "#ede7f6",
    blobBorder: "#b39ddb",
    iconBg: "#f3f0ff",
    iconColor: "#7c3aed",
    icon: <ExpertTeacherIcon />,
  },
  {
    title: "100% Safe Campus",
    // sky blue blob
    blobBg: "#e0f7fa",
    blobBorder: "#80deea",
    iconBg: "#f0fbff",
    iconColor: "#0891b2",
    icon: <SafeCampus />,
  },
  {
    title: "Modern Curriculum",
    // blush pink blob
    blobBg: "#fce4ec",
    blobBorder: "#f48fb1",
    iconBg: "#fff5f7",
    iconColor: "#db2777",
    icon: <ModernCurriculum />,
  },
];

// ─── Blob shapes (each card gets its own organic radius string) ───────────────

const blobShapes = [
  "63% 37% 54% 46% / 55% 48% 52% 45%",
  "45% 55% 68% 32% / 47% 62% 38% 53%",
  "58% 42% 40% 60% / 52% 44% 56% 48%",
  "50% 50% 65% 35% / 60% 40% 50% 50%",
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Features() {
  return (
    <section
      className="relative overflow-hidden py-20 px-4 font-quicksand"
      style={{ background: "#fdf6f0" }}
    >
      <style>
        {`
          @keyframes jiggle{

            20%{
              transform : translateX(-20px) rotate(-10deg);
            }
            40%{
              transform : translateX(20px) rotate(10deg);
            }
            60%{
              transform : translateX(-10px) rotate(-5deg);
            }
            80%{
              transform : translateX(10px) rotate(5deg);
            }
            100%{
              transform : translateX(0px) rotate(0deg);
            }
          }

          .jiggle{
            animation : 1s ease 1
          }

          .jiggle-daddy:hover .jiggle{
            animation-name:jiggle
          }

        `}
      </style>

      {/* ── Decorative dot cluster (top-left area) ── */}
      <span
        className="absolute top-16 left-[14%] w-3 h-3 rounded-full opacity-70"
        style={{ background: "#b0bec5" }}
        aria-hidden="true"
      />
      <span
        className="absolute top-24 left-[13%] w-2 h-2 rounded-full opacity-40"
        style={{ background: "#f48fb1" }}
        aria-hidden="true"
      />

      {/* ── Left decorative image (pencil/crayon) ── */}
      <div className="pointer-events-none absolute bottom-6 left-8 w-14 opacity-80 select-none hidden md:block">
        <Image
          src="/template-1/features/pencil.png"
          alt="pencil icon"
          width={56}
          height={84}
          className="w-full h-auto object-contain"
          aria-hidden="true"
        />
      </div>

      {/* ── Right decorative image (giraffe) ── */}
      <div className="pointer-events-none absolute bottom-0 right-4 w-32 select-none hidden md:block">
        <Image
          src="/template-1/features/girraf.png"
          alt="girraf image"
          width={128}
          height={176}
          className="w-full h-auto object-contain"
          aria-hidden="true"
        />
      </div>

      {/* ── Feature grid ── */}
      <Wrapper className="relative z-10 ">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 place-items-center">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="group flex flex-col items-center text-center gap-5"
            >
              {/* Outer blob (dashed border + pastel fill) */}
              <div
                className=" jiggle-daddy relative flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-105"
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: blobShapes[idx],
                  background: item.blobBg,
                  // dashed border via outline trick + box-shadow layering
                  outline: `2px dashed ${item.blobBorder}`,
                  outlineOffset: "6px",
                }}
                aria-hidden="true"
              >
                {/* Inner white circle icon container */}
                <div
                  className="flex items-center justify-center rounded-full shadow-sm transition-shadow duration-300 group-hover:shadow-md"
                  style={{
                    width: 100,
                    height: 100,
                    background: "#ffffff",
                    color: item.iconColor,
                  }}
                >
                  <span className="jiggle">{item.icon}</span>
                </div>
              </div>

              {/* Label */}
              <h3
                className={`font-brand font-bold tracking-wide text-2xl w-fit shadow-2xl py-2 px-3 rounded-2xl`}
                style={{ color: item.iconColor, background: item.blobBg }}
              >
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  );
}
