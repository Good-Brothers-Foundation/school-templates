import { FileText, School, MessageCircle, PartyPopper } from "lucide-react";
import AppButton from "../../AppButton";
import Wrapper from "@/components/ui/Wrapper";


const steps = [
  { icon: FileText, title: "Fill The Form", desc: "Submit a quick online application in minutes." },
  { icon: School, title: "School Visit", desc: "Tour our campus and meet the teachers." },
  { icon: MessageCircle, title: "Friendly Interaction", desc: "A relaxed chat with your child and family." },
  { icon: PartyPopper, title: "Admission Confirmed", desc: "Welcome to the SunnySprouts family!" },
];

export default function Admission() {
  return (
    <section id="admission" className="relative overflow-hidden bg-[#e7ddfc] pt-24 pb-12 font-quicksand">
      <Wrapper>
        <div className="reveal mx-auto mb-14 max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-primary-template-1">Admission Process</span>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl text-balance">
            Four Friendly Steps To Join Us
          </h2>
        </div>

        <ol className="relative grid gap-6 md:grid-cols-4">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="reveal relative rounded-[1.75rem] bg-white p-6 shadow-soft hover-lift"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="absolute -top-5 left-6 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-warm text-white shadow-soft">
                <span className="font-display text-lg font-black">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="mt-4 grid h-14 w-14 place-items-center rounded-2xl bg-[#F6F0E9] text-primary-template-1">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-xl font-black">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              {i < steps.length - 1 && (
                <div className="absolute right-[-20px] top-1/2 hidden -translate-y-1/2 md:block">
                  <svg width="40" height="20" viewBox="0 0 40 20" fill="none" aria-hidden>
                    <path d="M2 10 H 36 M30 4 L 36 10 L 30 16" stroke="#f39f5f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </li>
          ))}
        </ol>

        <div className="reveal mt-14 text-center">
          <AppButton icon>
            <a href="#contact">Start Your Application</a>
          </AppButton>
        </div>
      </Wrapper>
    </section>
  );
}
