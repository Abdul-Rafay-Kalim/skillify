import artRose from "@/assets/art-rose.jpg";
import artSculpture from "@/assets/art-sculpture.jpg";
import artAbstract from "@/assets/art-abstract.jpg";
import artCharcoal from "@/assets/art-charcoal.jpg";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const categories = [
  { image: artRose, label: "New Arrivals" },
  { image: artSculpture, label: "Museum-Quality Pieces" },
  { image: artAbstract, label: "Abstract & Modern" },
  { image: artCharcoal, label: "Studies & Sketches" },
];

const CuratorPicks = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24" ref={ref}>
      <div className="container mx-auto px-4 md:px-8">
        <h2
          className={`text-3xl md:text-5xl font-serif font-bold mb-4 text-foreground transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          AI + Curator Picks...
        </h2>
        <p
          className={`text-muted-foreground mb-12 max-w-lg transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: isVisible ? "100ms" : "0ms" }}
        >
          A personalized selection of art curated just for you, blending algorithmic intelligence with expert taste.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <div
              key={cat.label}
              className={`group cursor-pointer transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: isVisible ? `${(i + 1) * 120}ms` : "0ms" }}
            >
              <div className="aspect-[3/4] rounded-xl overflow-hidden mb-3">
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className="text-sm font-medium text-foreground">{cat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CuratorPicks;
