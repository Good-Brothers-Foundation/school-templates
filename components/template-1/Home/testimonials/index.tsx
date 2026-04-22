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
    <section className="py-24 bg-white overflow-hidden font-quicksand">
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
                <div className="relative pt-12">
                  {/* The Speech Bubble Shape */}
                  <div 
                    className="bg-[#FFF3D0] p-10 text-center relative shadow-sm"
                    style={{ 
                      borderRadius: "60% 40% 70% 30% / 40% 50% 60% 50%",
                      minHeight: "300px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    {/* User Image - Floating on top */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-md bg-slate-200">
                      <Image
                        src={r.img}
                        alt={r.role}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Content */}
                    <h4 className="font-bold text-[#3D5667] text-lg mb-3 mt-4">
                      {r.role}
                    </h4>
                    <p className="text-[#3D5667]/70 leading-relaxed text-sm">
                      {r.text}
                    </p>

                    {/* The Bubble "Tail" */}
                    <div 
                       className="absolute -bottom-10 left-[40%] w-20 h-20 bg-[#FFF3D0]"
                       style={{ 
                         clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                         transform: "rotate(180deg) scaleX(0.5)",
                         zIndex: -1
                       }}
                    />
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
          border: 2px solid #FFD3C4;
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
  );
}