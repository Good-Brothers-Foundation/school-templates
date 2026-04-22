"use client";
import Wrapper from "@/components/ui/Wrapper";
import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react";

const teachers = [
  { name: "Sarah Johnson", role: "Lead Educator", img: "https://images.pexels.com/photos/37148307/pexels-photo-37148307.jpeg", bg: "bg-peach" },
  { name: "Mark Davis", role: "Science & Discovery", img: "https://images.pexels.com/photos/36687795/pexels-photo-36687795.jpeg", bg: "bg-sky" },
  { name: "Linda Martinez", role: "Music & Arts", img: "https://images.pexels.com/photos/36803099/pexels-photo-36803099.jpeg", bg: "bg-mint" },
  {
    name: "Emma Williams",
    role: "Early Years Specialist",
    img: "https://images.pexels.com/photos/34405831/pexels-photo-34405831.jpeg",
    bg: "bg-lavender",
  },
];

export default function Teachers() {
  return (
    <section
      id="teachers"
      className="relative overflow-hidden py-24 bg-gradient-peach"
    >
      <Wrapper>
        <div className="reveal mx-auto mb-14 max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-primary">
            Our Team
          </span>
          <h2 className="mt-3 font-display text-4xl font-black md:text-5xl text-balance">
            Meet The Teachers Behind The Smiles
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teachers.map((t, i) => (
            <article
              key={t.name}
              className="reveal group overflow-hidden rounded-4xl bg-white p-4 shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-pop"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className={`relative overflow-hidden rounded-2xl ${t.bg}`}>
                <img
                  src={t.img}
                  alt={t.name}
                  loading="lazy"
                  width={800}
                  height={800}
                  className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-3 bottom-3 flex translate-y-12 justify-center gap-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {[FacebookLogoIcon, InstagramLogoIcon, LinkedinLogoIcon].map(
                    (Icon, k) => (
                      <button
                        key={k}
                        className="grid h-10 w-10 place-items-center rounded-full bg-white text-primary-template-1 shadow-soft hover:bg-primary-template-1 hover:text-white"
                      >
                        <Icon className="h-4 w-4" />
                      </button>
                    ),
                  )}
                </div>
              </div>
              <div className="px-2 pt-5 pb-3 text-center">
                <h3 className="font-display text-xl font-black">{t.name}</h3>
                <p className="mt-1 text-sm font-medium text-primary-template-1">
                  {t.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Wrapper>
    </section>
  );
}
