import { ArrowRight } from "lucide-react";
import heroArt from "@/assets/hero-art.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      <div className="container mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-serif font-bold leading-[1.1] text-foreground opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Collect Art That<br />
            Lives Beyond<br />
            Trends
          </h1>
          <p className="text-muted-foreground text-lg max-w-md opacity-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            Discover original works from emerging and established artists. A curated space where art meets intention.
          </p>
          <div className="flex flex-wrap gap-4 pt-2 opacity-0 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Explore Collection
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 rounded-full text-sm font-medium hover:bg-secondary transition-colors"
            >
              Discover Artists
            </a>
          </div>
        </div>

        <div className="relative opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="aspect-[3/4] rounded-2xl overflow-hidden">
            <img
              src={heroArt}
              alt="Vibrant contemporary portrait painting"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
