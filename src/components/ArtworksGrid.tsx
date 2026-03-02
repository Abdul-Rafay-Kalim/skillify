import { Heart, ArrowRight } from "lucide-react";
import galleryInterior from "@/assets/gallery-interior.jpg";
import artMixedMedia from "@/assets/art-mixed-media.jpg";
import artWatercolor from "@/assets/art-watercolor.jpg";
import heroArt from "@/assets/hero-art.png";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const artworks = [
  { image: galleryInterior, title: "Gallery Moment", artist: "Clara Dunn", price: "PKR 2,400" },
  { image: artMixedMedia, title: "Chromatic Soul", artist: "Ava Morales", price: "PKR 1,850" },
  { image: artWatercolor, title: "Morning Fields", artist: "Thomas Lake", price: "PKR 980" },
  { image: heroArt, title: "Ember Portrait", artist: "Elena Vasquez", price: "PKR 3,200" },
];

const ArtworksGrid = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 bg-secondary" ref={ref}>
      <div className="container mx-auto px-4 md:px-8">
        <div
          className={`flex items-end justify-between mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">
              Artworks Available Now
            </h2>
            <p className="text-muted-foreground mt-2">
              Fresh works ready for your collection.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {artworks.map((art, i) => (
            <div
              key={art.title}
              className={`group cursor-pointer transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: isVisible ? `${(i + 1) * 120}ms` : "0ms" }}
            >
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-3">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  className="absolute top-3 right-3 p-2 bg-card/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Add to favorites"
                >
                  <Heart className="w-4 h-4 text-foreground" />
                </button>
              </div>
              <h3 className="font-serif font-semibold text-foreground">{art.title}</h3>
              <p className="text-sm text-muted-foreground">{art.artist}</p>
              <p className="text-sm font-medium text-foreground mt-1">{art.price}</p>
            </div>
          ))}
        </div>

        <div
          className={`flex justify-center mt-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: isVisible ? "600ms" : "0ms" }}
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 rounded-full text-sm font-medium hover:bg-card transition-colors"
          >
            View All Artworks
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ArtworksGrid;
