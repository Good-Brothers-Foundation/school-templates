"use client";
import Image from "next/image";
import Wrapper from "@/components/ui/Wrapper";

const whyChooseUsData = [
  {
    title: "Our Facilities",
    description:
      "Qualified teachers who understand children’s needs and focus on personal attention. through play-based and academic learning.",
    points: [
      "Experienced & caring teachers",
      "Safe & friendly environment",
      "Modern learning methods",
      "Focus on moral & social values",
    ],
  },
  {
    title: "Curriculum & Learning",
    description:
      "Qualified teachers who understand children’s needs and focus on personal attention. through play-based and academic learning.",
    points: [
      "Experienced & caring teachers",
      "Safe & friendly environment",
      "Modern learning methods",
      "Focus on moral & social values",
    ],
  },
  {
    title: "Mission & Vision",
    description:
      "Qualified teachers who understand children’s needs and focus on personal attention. through play-based and academic learning.",
    points: [
      "Experienced & caring teachers",
      "Safe & friendly environment",
      "Modern learning methods",
      "Focus on moral & social values",
    ],
  },
];
export default function WhyChooseUs() {
  return (
    <div className="relative bg-background">
      <style>
        {`
            @keyframes up-down {
                0% { transform: translateY(0px); }
                50% { transform: translateY(50px); }
                100% { transform: translateY(0px); }
            }

            .animate-up-down {
                animation: up-down 5s linear infinite alternate forwards;
            }
            `}
      </style>
      <div className="w-24 absolute aspect-square left-1/2 top-0 animate-up-down">
        <Image
          fill
          src="/template-1/why-choose-us/choose-us-shape2.png"
          className="w-full h-full object-contain opacity-50"
          alt="floating image"
        />
      </div>
      <Wrapper className="py-20">
        <div>
          <h4 className="text-primary-template-1 font-bold text-lg">
            Why Choose Us?
          </h4>
          <h2 className="text-4xl font-extrabold mt-2">
            Why Choose Our School
          </h2>
          <ul className="flex my-5 space-x-4">
            {whyChooseUsData.map((data) => (
              <li key={data.title}>{data.title}</li>
            ))}
          </ul>
        </div>
        <div></div>
      </Wrapper>
    </div>
  );
}
