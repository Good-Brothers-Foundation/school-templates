"use client";
import Wrapper from "@/components/ui/Wrapper";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const teachers = [
  {
    name: "Michele Bailey",
    role: "Principle",
    img: "/template-1/teachers/t1.png",
    bg: "bg-[#D83C8C]",
  },
  {
    name: "Brian Marsh",
    role: "Senior Teacher",
    img: "/template-1/teachers/t2.png",
    bg: "bg-[#D88D56]",
  },
  {
    name: "Brian Marsh",
    role: "Senior Teacher",
    img: "/template-1/teachers/t3.png",
    bg: "bg-[#C4C9E8]",
  },
  {
    name: "Sarah Johnson",
    role: "Lead Educator",
    img: "/template-1/teachers/t1.png",
    bg: "bg-[#D83C8C]",
  },
  {
    name: "Dawson Timm",
    role: "Sports Teacher",
    img: "/template-1/teachers/t4.png",
    bg: "bg-[#1B5D97]",
  },
];

export default function Teachers() {
  return (
    <section
      id="teachers"
      className="relative py-24 overflow-hidden font-quicksand"
    >
      {/* Decorative Pencil/Cube Elements (Optional based on UI) */}
      <div className="absolute top-10 right-10 w-12 h-12 rotate-12 opacity-80">
        {/* Insert Cube Image here */}
      </div>

      <Wrapper>
        <div className="mx-auto mb-14 text-center">
          <span className="text-orange-400 italic font-bold">
            Honorable Teacher's
          </span>
          <h2 className="mt-2 font-display text-4xl font-black md:text-5xl text-[#3D5667]">
            Our Expert Teacher
          </h2>
        </div>

        <div className="teacher-swiper-container">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{ delay: 4000 }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="pb-20!"
          >
            {teachers.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="flex flex-col items-center">
                  {/* The Blob Card */}
                  <div className="relative w-full aspect-4/5 p-6 border-2 border-dashed border-slate-200 rounded-[5rem] flex items-center justify-center transition-all duration-300 hover:border-orange-200 bg-white/60">
                    {/* Inner Colored Blob */}
                    <div
                      className={`relative w-full h-full overflow-hidden shadow-inner ${t.bg}`}
                      style={{
                        borderRadius: "40% 60% 40% 60% / 50% 50% 50% 50%",
                      }}
                    >
                      <Image
                        src={t.img}
                        alt={t.name}
                        fill
                        className="object-cover object-top hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-bold text-[#3D5667]">
                      {t.name}
                    </h3>
                    <p className="text-slate-400 text-sm mt-1">{t.role}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Wrapper>

      {/* shapes */}

      <Wrapper className="relative h-2 ">
        <div className="absolute left-2 bottom-20 block animate-upside-down w-fit">
          <Image
            alt="pencil-shape"
            src={"/template-1/hero/shape-5.png"}
            width={150}
            height={80}
          />
        </div>
        <div className="absolute left-3/4 bottom-186 animate-tilt w-fit">
          <Image
            alt="cloud-shape"
            src={"/template-1/hero/shape-2.png"}
            width={80}
            height={80}
          />
        </div>
      </Wrapper>

      {/* Custom Styles for Swiper Dots */}
      <style jsx global>{`
        .teacher-swiper-container .swiper-pagination-bullet {
          width: 14px;
          height: 14px;
          background: transparent;
          border: 2px solid #ffd3c4;
          opacity: 1;
        }
        .teacher-swiper-container .swiper-pagination-bullet-active {
          background: #d88d56 !important;
          border-color: #d88d56 !important;
        }
      `}</style>
    </section>
  );
}
