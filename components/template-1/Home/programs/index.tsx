"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { motion } from "motion/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import Wrapper from "@/components/ui/Wrapper";
import { ArrowUpRight } from "lucide-react";

const PROGRAM_DATA = [
  {
    title: "Play Group Program",
    age: "2-3 Years",
    desc: "Fun based learning through games, music, and activities to develop social skills.",
    duration: "2.5 Hr",
    color: "bg-blue-50",
    dotColor: "bg-blue-400",
    image: "/template-1/programs/program-01.jpg",
  },
  {
    title: "Nursery Program",
    age: "3-4 Years",
    desc: "Fun based learning through games, music, and activities to develop social skills.",
    duration: "2.5 Hr",
    color: "bg-orange-50",
    dotColor: "bg-orange-400",
    image: "/template-1/programs/program-02.jpg",
  },
  {
    title: "Kindergarten (KG) Program",
    age: "4-5 Years",
    desc: "Fun based learning through games, music, and activities to develop social skills.",
    duration: "2.5 Hr",
    color: "bg-cyan-50",
    dotColor: "bg-cyan-400",
    image: "/template-1/programs/program-03.jpg",
  },
  {
    title: "Play Group Program",
    age: "2-3 Years",
    desc: "Fun based learning through games, music, and activities to develop social skills.",
    duration: "2.5 Hr",
    color: "bg-blue-50",
    dotColor: "bg-blue-400",
    image: "/template-1/programs/program-01.jpg",
  },
  {
    title: "Nursery Program",
    age: "3-4 Years",
    desc: "Fun based learning through games, music, and activities to develop social skills.",
    duration: "2.5 Hr",
    color: "bg-orange-50",
    dotColor: "bg-orange-400",
    image: "/template-1/programs/program-02.jpg",
  },
  {
    title: "Kindergarten (KG) Program",
    age: "4-5 Years",
    desc: "Fun based learning through games, music, and activities to develop social skills.",
    duration: "2.5 Hr",
    color: "bg-cyan-50",
    dotColor: "bg-cyan-400",
    image: "/template-1/programs/program-03.jpg",
  },
];

export default function ProgramsSection() {
  return (
    // bg-[#F3F6FF]
    <section className="relative bg-[#F3F6FF] w-full py-24 overflow-hidden font-quicksand">
      {/* ── Background Clouds ── */}
      <div className="absolute top-0 left-0 w-full h-32 z-0">
        <Image
          src="/template-1/programs/bottom-line-2.png"
          alt="clouds"
          fill
          className="object-cover object-bottom"
        />
      </div>
      <div className="absolute top-32 left-0 w-full h-32 z-0">
        <Image
          src="/template-1/programs/bottom-line-1.png"
          alt="clouds"
          fill
          className="object-cover object-top"
        />
      </div>

      <Wrapper className="relative z-10 flex flex-col items-center">
        {/* ── 1. Infinite Text Marquee ── */}
        <div className="w-full flex overflow-hidden whitespace-nowrap mb-16">
          <motion.div
            className="flex gap-8 text-4xl md:text-6xl font-black text-slate-700/80 uppercase"
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            {[...Array(10)].map((_, i) => (
              <span key={i} className="flex items-center gap-8">
                Our Programs / Classes
                <span className="text-orange-400 text-3xl">★</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── 2. Swiper Carousel ── */}
        <div className="w-full max-w-6xl px-6 bg-white rounded-3xl  shadow-sm p-8">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              640: { slidesPerView: 2.5 },
              1024: { slidesPerView: 3.5 },
            }}
            className="program-swiper pb-14!"
          >
            {PROGRAM_DATA.map((item, idx) => (
              <SwiperSlide key={idx}>
                <div
                  className={`rounded-[3rem] p-4 ${item.color} flex flex-col items-center text-center border border-white/50 h-full`}
                >
                  {/* Card Image */}
                  <div className="relative w-full h-45 mb-6 rounded-4xl overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                      {item.age}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm mb-4 leading-relaxed">
                    {item.desc}
                  </p>

                  {/* <div className="mt-auto flex items-center gap-2 bg-white/60 px-4 py-1 rounded-full border border-white text-xs font-bold text-slate-600">
                    Duration: {item.duration}
                  </div> */}

                  {/* Bottom Icon */}
                  <div
                    className={`w-10 h-10 rounded-full ${item.dotColor} flex items-center justify-center text-white`}
                  >
                    <ArrowUpRight />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Wrapper>

      {/* ── Floating Decorative Icons ── */}
      <div className="absolute left-10 top-1/2 text-4xl animate-bounce opacity-40">
        🐯
      </div>
      <div className="absolute right-10 bottom-1/4 text-4xl rotate-12 opacity-40">
        ⭐
      </div>
      <div className="absolute left-1/2 bottom-10 -translate-x-1/2 text-4xl opacity-40">
        🏆
      </div>

      {/* ── Custom Swiper Pagination CSS ── */}
      <style jsx global>{`
        .program-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #cbd5e1;
          opacity: 1;
        }
        .program-swiper .swiper-pagination-bullet-active {
          background: #f97316 !important;
          height: 12px;
          border-radius: 6px;
        }
      `}</style>
    </section>
  );
}
