import Wrapper from "@/components/ui/Wrapper";
import { Play } from "lucide-react";

const items = [
  { src: "https://images.pexels.com/photos/32314818/pexels-photo-32314818.jpeg", label: "Outdoor Play", span: "md:col-span-2 md:row-span-2" },
  { src: "https://images.pexels.com/photos/8035136/pexels-photo-8035136.jpeg", label: "Building Blocks" },
  { src: "https://images.pexels.com/photos/8035133/pexels-photo-8035133.jpeg", label: "Art & Craft" },
  { src: "https://images.pexels.com/photos/33348034/pexels-photo-33348034.jpeg", label: "Story Time", span: "md:col-span-2" },
  // { src: "https://images.pexels.com/photos/8035136/pexels-photo-8035136.jpeg", label: "Science Lab" },
];

export default function Gallery() {
  return (
    <section className="py-24 bg-background">
      <Wrapper>
        <div className="reveal mx-auto mb-12 flex flex-col items-center gap-3 text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-primary">Campus Life</span>
          <h2 className="font-display text-4xl font-black md:text-5xl text-balance">
            Every Day Is A New Adventure
          </h2>
          <p className="max-w-xl text-muted-foreground">
            Peek into our classrooms, art studios, gardens, and the joyful moments that fill our days.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4 md:auto-rows-[14rem]">
          {items.map((it, i) => (
            <figure
              key={i}
              className={`reveal group relative overflow-hidden rounded-3xl shadow-soft ${it.span ?? ""}`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <img
                src={it.src}
                alt={it.label}
                loading="lazy"
                width={800}
                height={800}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 transition-opacity duration-500P group-hover:opacity-100" />
              <figcaption className="absolute bottom-4 left-4 translate-y-4 rounded-full bg-white/90 px-4 py-2 text-sm font-bold opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {it.label}
              </figcaption>
              {i === 0 && (
                <button className="absolute inset-0 m-auto grid h-16 w-16 place-items-center rounded-full bg-card/90 text-primary shadow-pop backdrop-blur transition-transform hover:scale-110">
                  <Play className="h-6 w-6 fill-current" />
                </button>
              )}
            </figure>
          ))}
        </div>
      </Wrapper>
    </section>
  );
}
