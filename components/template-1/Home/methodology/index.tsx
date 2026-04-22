import Wrapper from "@/components/ui/Wrapper";
import { Puzzle, Palette, Rocket, HeartHandshake } from "lucide-react";

const steps = [
  { icon: Puzzle, title: "Play-Based Learning", desc: "Children explore concepts through guided play and storytelling.", color: "bg-[#FFDFCC]", text: "text-[#F88645]" },
  { icon: Palette, title: "Activity-Based Learning", desc: "Hands-on art, music, and movement bring lessons to life.", color: "bg-[#CAECFC]", text: "text-[#319CE8]" },
  { icon: Rocket, title: "Skill Development", desc: "Build literacy, numeracy, and critical thinking foundations.", color: "bg-[#E6D8FA]", text: "text-[#8F5BD6]" },
  { icon: HeartHandshake, title: "Social Growth", desc: "Empathy, teamwork, and confidence shaped every day.", color: "bg-[#C6F1DB]", text: "text-[#39AC85]" },
];

export default function Methodology() {
  return (
    <section className="py-24">
      <Wrapper>
        <div className="reveal mx-auto mb-14 max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-primary-template-1">Our Methodology</span>
          <h2 className="mt-3 font-display text-4xl font-black md:text-5xl text-balance">
            How We Help Little Learners Bloom
          </h2>
        </div>

        <div className="relative grid gap-8 md:grid-cols-4">
          {/* connector */}
          <div className="absolute left-0 right-0 top-12 hidden h-0.5 md:block" aria-hidden>
            <svg className="h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 2">
              <line x1="0" y1="1" x2="100" y2="1" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeDasharray="2 2" />
            </svg>
          </div>

          {steps.map((s, i) => (
            <div key={s.title} className="text-center" style={{ transitionDelay: `${i * 120}ms` }}>
              <div className="relative mx-auto grid h-24 w-24 place-items-center">
                <div className={`absolute inset-0 ${s.color} rounded-full blur-md opacity-70`} />
                <div className={`relative grid h-24 w-24 place-items-center rounded-full bg-white shadow-soft hover-lift`}>
                  <s.icon className={`h-9 w-9 ${s.text}`} />
                  <span className="absolute -right-1 -top-1 grid h-8 w-8 place-items-center rounded-full bg-gradient-warm font-display text-sm font-black text-white shadow-soft">
                    {i + 1}
                  </span>
                </div>
              </div>
              <h3 className="mt-5 font-display text-xl font-black">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  );
}
