import { ArrowRight } from "lucide-react";
import artAbstract from "@/assets/art-abstract.jpg";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const StartGuide = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24" ref={ref}>
      <div className="container mx-auto px-4 md:px-8">
        <div
          className={`relative rounded-3xl overflow-hidden transition-all duration-700 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          <img src={artAbstract} alt="Colorful abstract art" className="w-full h-64 md:h-96 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 to-foreground/20 flex items-center">
            <div className="px-8 md:px-16 max-w-lg">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-background mb-4">
                Not Sure Where to Start?
              </h2>
              <p className="text-background/80 mb-6">
                Let us guide you to discover art that resonates with your style and space.
              </p>
              <a
                href="/art-quiz"
                className="inline-flex items-center gap-2 bg-background text-foreground px-6 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Take the Art Quiz
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartGuide;
