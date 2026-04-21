// components/Hero.tsx
import Image from "next/image";
import Link from "next/link";
import AppButton from "../../AppButton";
import Wrapper from "@/components/ui/Wrapper";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FFF9EA] pt-2 pb-20 lg:pt-2 font-quicksand ">
      <style>
        {`  @keyframes slideLeftRight {
                0% { transform: translateX(0); }
                50% { transform: translateX(100px); }
                100% { transform: translateX(0); }
            }
            @keyframes tilt {
                0% { transform: rotate(-30deg); }
                50% { transform: rotate(0); }
                100% { transform: rotate(30deg); }
            }
            @keyframes upside-down {
                0% { transform: translateY(-550px); }
                50% { transform: translateY(-500px); }
                100% { transform: translateY(-475px); }
            }
                  
            .animate-left-right {
                position: relative;
                animation: slideLeftRight 5s linear infinite alternate forwards;
            }
                  
            .animate-tilt {
                position: relative;
                animation: tilt 5s linear infinite alternate forwards;
            }
            .animate-upside-down {
                position: relative;
                animation: upside-down 5s linear infinite alternate forwards;
            }
            `}
      </style>

      <Wrapper className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-12 lg:flex-row flex-col">
          {/* Text Content */}
          <div className="z-10 space-y-6">
            <span className="text-sm font-bold tracking-widest text-orange-500 uppercase italic">
              A Safe, Joyful Learning Environment.
            </span>
            <h1 className="text-3xl font-extrabold text-slate-800 md:text-6xl ">
              Nurturing Young Minds for a Bright Future
            </h1>
            <p className="max-w-md text-slate-600 leading-relaxed">
              We are a caring kindergarten & school dedicated to building strong
              foundations through play-based and academic learning.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <AppButton icon href="#">
                Enroll Now
              </AppButton>
              <AppButton type="secondary" icon href="#">
                Book A Visit
              </AppButton>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Background Decorative Blocks */}
            <div className="absolute bottom-10 left-0 -z-10 scale-75 md:scale-100">
              <div className="relative h-40 w-40 bg-orange-100 rounded-lg flex items-center justify-center border-4 border-white shadow-sm rotate-3">
                <span className="text-4xl font-bold text-orange-400">ABC</span>
              </div>
            </div>

            {/* Main Student Image */}
            <div className="relative z-0 h-100 w-75 md:h-125 md:w-100">
              <Image
                src="/template-1/hero/hero-1.png"
                alt="Smiling student"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </Wrapper>

      {/* shapes */}

      <Wrapper className="relative h-2 ">
        <div className="absolute left-1/3 bottom-20 animate-tilt w-fit ">
          <Image
            alt="car-shape"
            src={"/template-1/hero/shape-3.png"}
            width={80}
            height={80}
          />
        </div>
        <div className="absolute left-2 bottom-20 block animate-upside-down w-fit">
          <Image
            alt="bee-shape"
            src={"/template-1/hero/shape-1.png"}
            width={80}
            height={80}
          />
        </div>
        <div className="absolute left-1/2 bottom-156 animate-tilt w-fit">
          <Image
            alt="cloud-shape"
            src={"/template-1/hero/shape-2.png"}
            width={80}
            height={80}
          />
        </div>
        <div className="absolute left-1/2 -translate-1/2 bottom-0  w-fit">
          <Image
            alt="alphabets-shape"
            src={"/template-1/hero/shape-4.png"}
            width={250}
            height={100}
          />
        </div>
        <div className="absolute left-full -translate-x-full bottom-170 animate-tilt w-fit">
          <Image
            alt="pencil-shape"
            src={"/template-1/hero/shape-5.png"}
            width={150}
            height={80}
          />
        </div>
      </Wrapper>

      {/* Cloud Bottom Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 h-38 scale-105">
       <Image src={"/template-1/hero/cloud.png"} alt="cloud image" fill className="w-full" />
      </div>
    </section>
  );
}
