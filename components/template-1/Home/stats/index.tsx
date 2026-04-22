"use client";
import { Smile, GraduationCap, CalendarDays, ShieldCheck } from "lucide-react";
import { useCounter } from "@/hooks/use-counter";
import Wrapper from "@/components/ui/Wrapper";

const stats = [
  { icon: Smile, label: "Happy Students", value: 500, suffix: "+", bg: "bg-[#FFDFCC]", text: "text-[#F88645]", span: "md:col-span-2 md:row-span-2" },
  { icon: GraduationCap, label: "Expert Teachers", value: 50, suffix: "+", bg: "bg-[#E6D8FA]", text: "text-[#8F5BD6]", span: "" },
  { icon: CalendarDays, label: "Years Experience", value: 10, suffix: "+", bg: "bg-[#CAECFC]", text: "text-[#319CE8]", span: "" },
  { icon: ShieldCheck, label: "Safety Record", value: 100, suffix: "%", bg: "bg-[#C6F1DB]", text: "text-[#39AC85]", span: "md:col-span-2" },
];

function StatCard({ s }: { s: typeof stats[number] }) {
  const { value, ref } = useCounter(s.value);
  return (
    <div className={`group relative overflow-hidden rounded-4xl ${s.bg} p-8 shadow-soft hover-lift ${s.span}`}>
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/30 blur-2xl" aria-hidden />
      <div className="relative flex h-full flex-col justify-between gap-6">
        <div className={`grid h-14 w-14 place-items-center rounded-2xl bg-white ${s.text} shadow-soft`}>
          <s.icon className="h-7 w-7" />
        </div>
        <div>
          <div className="font-display text-5xl font-black md:text-6xl">
            <span ref={ref}>{value}</span>
            <span className={s.text}>{s.suffix}</span>
          </div>
          <p className="mt-2 text-base font-semibold text-foreground/80">{s.label}</p>
        </div>
      </div>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="py-24 bg-background">
      <Wrapper>
        <div className="reveal mx-auto mb-12 max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-primary">Our Impact</span>
          <h2 className="mt-3 font-display text-4xl font-black md:text-5xl text-balance">
            Numbers That Make Us Proud
          </h2>
          <p className="mt-4 text-muted-foreground">A decade of nurturing curiosity, kindness, and confidence.</p>
        </div>

        <div className="reveal grid gap-5 md:grid-cols-4 md:auto-rows-[12rem]">
          {stats.map((s) => (
            <StatCard key={s.label} s={s} />
          ))}
        </div>
      </Wrapper>
    </section>
  );
}
