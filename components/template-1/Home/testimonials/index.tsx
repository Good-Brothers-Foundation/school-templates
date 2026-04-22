import Wrapper from "@/components/ui/Wrapper";
import { Quote, Star } from "lucide-react";

const reviews = [
  {
    name: "Jessica R.",
    role: "Mother of Mia, 4",
    img: "https://images.pexels.com/photos/37148307/pexels-photo-37148307.jpeg",
    text: "The teachers genuinely love what they do. Mia comes home glowing every single day with new stories to tell.",
    bg: "bg-[#FFDFCC]",
  },
  {
    name: "David L.",
    role: "Father of Noah, 5",
    img: "https://images.pexels.com/photos/36687795/pexels-photo-36687795.jpeg",
    text: "We toured five schools and SunnySprouts felt like home immediately. Safe, warm, and beautifully thoughtful.",
    bg: "bg-[#CAECFC]",
  },
  {
    name: "Anita K.",
    role: "Mother of Aria, 3",
    img: "https://images.pexels.com/photos/36803099/pexels-photo-36803099.jpeg",
    text: "From the curriculum to the kindness, everything is top-notch. Aria is reading and singing more than ever!",
    bg: "bg-[#E6D8FA]",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-background">
      <Wrapper>
        <div className="reveal mx-auto mb-14 max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-primary-template-1">
            Testimonials
          </span>
          <h2 className="mt-3 font-display text-4xl font-black md:text-5xl text-balance">
            Loved By Parents, Adored By Kids
          </h2>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          {reviews.map((r, i) => (
            <article
              key={r.name}
              className={`reveal relative overflow-hidden rounded-[2rem] ${r.bg} p-7 shadow-soft hover-lift`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <Quote className="absolute right-5 top-5 h-12 w-12 text-white/60" />
              <div className="flex gap-1 text-butter-deep">
                {[...Array(5)].map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-[#F3AF24] stroke-[#F3AF24]" />
                ))}
              </div>
              <p className="mt-5 text-base leading-relaxed text-foreground/80">
                &quot;{r.text}&quot;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <img
                  src={r.img}
                  alt={r.name}
                  loading="lazy"
                  width={512}
                  height={512}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-card"
                />
                <div>
                  <p className="font-bold">{r.name}</p>
                  <p className="text-xs text-foreground/70">{r.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Wrapper>
    </section>
  );
}
