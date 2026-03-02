import artistStudio from "@/assets/artist-studio.jpg";
import galleryInterior from "@/assets/gallery-interior.jpg";
import artistPainting from "@/assets/artist-painting.jpg";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const posts = [
  { image: artistStudio, category: "Studio Visit", title: "Inside the Creative Process of Sofia Chen", excerpt: "A behind-the-scenes look at how mixed media comes to life." },
  { image: galleryInterior, category: "Art World", title: "Why Original Art Matters More Than Ever", excerpt: "In a world of mass production, original art stands apart." },
  { image: artistPainting, category: "Technique", title: "The Revival of Oil Painting in Contemporary Art", excerpt: "How traditional techniques find new expression today." },
];

const BlogSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 section-dark" ref={ref}>
      <div className="container mx-auto px-4 md:px-8">
        <h2
          className={`text-3xl md:text-5xl font-serif font-bold mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          From the Studio & Beyond
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <article
              key={post.title}
              className={`group cursor-pointer transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: isVisible ? `${(i + 1) * 150}ms` : "0ms" }}
            >
              <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <span className="text-xs uppercase tracking-wider opacity-60">{post.category}</span>
              <h3 className="font-serif text-lg font-semibold mt-1 group-hover:opacity-80 transition-opacity">{post.title}</h3>
              <p className="text-sm opacity-70 mt-1">{post.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
