"use client";

import Wrapper from "@/components/ui/Wrapper";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const reviews = [
  {
    role: "Parent of Nursery Student",
    img: "/template-1/testimonials/client-1.png",
    text: "This school has provided a safe, caring, and joyful environment for my child. The teachers are very supportive and attentive.",
  },
  {
    role: "Parent of Nursery Student",
    img: "/template-1/testimonials/client-2.png",
    text: "This school has provided a safe, caring, and joyful environment for my child. The teachers are very supportive and attentive.",
  },
  {
    role: "Parent of Nursery Student",
    img: "/template-1/testimonials/client-3.png",
    text: "This school has provided a safe, caring, and joyful environment for my child. The teachers are very supportive and attentive.",
  },
  {
    role: "Parent of Nursery Student",
    img: "/template-1/testimonials/client-4.png",
    text: "This school has provided a safe, caring, and joyful environment for my child. The teachers are very supportive and attentive.",
  },
];

export default function Testimonials() {
  return (
    <>
    {/* top cloud */}
      <div className="relative left-0 w-full h-32 z-0 bg-[#e7ddfc]">
        <Image
          src="/template-1/hero/cloud.png"
          alt="clouds"
          fill
          className="object-cover object-bottom"
        />
      </div>
      <section className="overflow-hidden font-quicksand bg-white">
        <Wrapper>
          {/* --- Header Section --- */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 relative">
            <div className="reveal">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 bg-orange-400 rounded-full" />
                <span className="text-sm font-bold uppercase tracking-widest text-orange-500 italic">
                  Testimonials
                </span>
              </div>
              <h2 className="font-display text-4xl font-black md:text-5xl text-[#3D5667]">
                Parents Talk About Our School
              </h2>
            </div>

            {/* Custom Navigation Container for Swiper Dots */}
            <div className="testimonial-pagination hidden md:flex gap-2 mb-4" />
          </div>

          {/* --- Swiper Carousel --- */}
          <div className="testimonial-swiper">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 5000 }}
              pagination={{
                el: ".testimonial-pagination",
                clickable: true,
              }}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="overflow-visible!"
            >
              {reviews.map((r, i) => (
                <SwiperSlide key={i}>
                  <div className="relative pt-16 pb-0 px-4">
                    {/* Main Container with specific aspect ratio to match chat-box.png */}
                    <div className="relative mx-auto w-full max-w-112.5 min-h-70 flex flex-col items-center justify-center p-12 text-center">
                      {/* ── Background Image ── */}
                      <div className="absolute inset-0 -z-10 ">
                        <Image
                          src="/template-1/testimonials/chat-box.png"
                          alt="chat box background"
                          fill
                          className="object-contain scale-105" // Use contain to ensure the tail isn't cut off
                          priority
                        />
                      </div>

                      {/* ── User Image - Floating on top ── */}
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-20">
                        <div className="relative w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-md bg-slate-200">
                          <Image
                            src={r.img}
                            alt={r.role}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>

                      {/* ── Content Container ── */}
                      {/* Added z-10 and relative to ensure text sits above the fill image */}
                      <div className="relative z-10 pt-4 -translate-y-3">
                        <h4 className="font-bold text-[#3D5667] text-lg mb-2">
                          {r.role}
                        </h4>
                        <p className="text-[#3D5667]/80 leading-relaxed text-sm max-w-[280px]">
                          {r.text}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </Wrapper>

        {/* --- Custom Pagination Styles --- */}
        <style jsx global>{`
          .testimonial-pagination .swiper-pagination-bullet {
            width: 14px;
            height: 14px;
            background: transparent;
            border: 2px solid #ffd3c4;
            opacity: 1;
            margin: 0 4px;
            transition: all 0.3s ease;
          }
          .testimonial-pagination .swiper-pagination-bullet-active {
            background: #f97316 !important;
            border-color: #f97316 !important;
            transform: scale(1.2);
          }
        `}</style>
      </section>

      {/* bottom cloud */}
      <div className="relative left-0 w-full h-32 z-0 rotate-180">
        <Image
          src="/template-1/hero/cloud.png"
          alt="clouds"
          fill
          className="object-cover object-bottom"
        />
      </div>
    </>
  );
}
