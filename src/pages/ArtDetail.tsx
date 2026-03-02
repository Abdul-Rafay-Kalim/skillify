import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, ShoppingCart, Share2, Palette } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { artworks } from "@/data/artworks";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";

interface ArtworkData {
  id: string;
  image: string;
  title: string;
  artist: string;
  price: number;
  genre: string;
  medium: string;
  dimensions: string;
  year: number;
  description: string;
}

const ArtDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, removeFromCart, isInCart } = useCart();
  const [artwork, setArtwork] = useState<ArtworkData | null>(null);
  const [loading, setLoading] = useState(true);
  const isListed = id?.startsWith("listed-");

  useEffect(() => {
    const fetchArtwork = async () => {
      if (isListed && id) {
        const dbId = id.replace("listed-", "");
        const { data } = await supabase
          .from("listed_artworks" as any)
          .select("*")
          .eq("id", dbId)
          .single();
        if (data) {
          const d = data as any;
          setArtwork({
            id: `listed-${d.id}`,
            image: d.image_url || "",
            title: d.title,
            artist: d.artist_name,
            price: Number(d.price),
            genre: d.genre || "Other",
            medium: d.medium || "Other",
            dimensions: d.dimensions || "",
            year: d.year || new Date().getFullYear(),
            description: d.description || "",
          });
        }
      } else {
        const found = artworks.find((a) => a.id === id);
        if (found) setArtwork(found);
      }
      setLoading(false);
    };
    fetchArtwork();
  }, [id, isListed]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-28 pb-16 container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-10">
            <Skeleton className="aspect-[3/4] rounded-2xl" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-28 pb-16 container mx-auto px-4 text-center">
          <h1 className="text-3xl font-serif font-bold text-foreground">Artwork not found</h1>
          <Button variant="outline" className="mt-6" onClick={() => navigate("/explore")}>
            Back to Explore
          </Button>
        </main>
      </div>
    );
  }

  const related = artworks
    .filter((a) => a.id !== artwork.id && (a.genre === artwork.genre || a.artist === artwork.artist))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4 md:px-8">
          <Button variant="ghost" size="sm" className="mb-6 gap-2" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-secondary opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              {artwork.image ? (
                <img src={artwork.image} alt={artwork.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Palette className="w-16 h-16 text-muted-foreground" />
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center opacity-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Badge variant="secondary" className="w-fit mb-4">{artwork.genre}</Badge>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">{artwork.title}</h1>
              <p className="text-muted-foreground mt-1">by {artwork.artist}</p>
              <p className="text-3xl font-bold text-foreground mt-6">PKR {artwork.price.toLocaleString()}</p>

              <Separator className="my-6" />

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Medium</p>
                  <p className="font-medium text-foreground">{artwork.medium}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Dimensions</p>
                  <p className="font-medium text-foreground">{artwork.dimensions || "N/A"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Year</p>
                  <p className="font-medium text-foreground">{artwork.year}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Genre</p>
                  <p className="font-medium text-foreground">{artwork.genre}</p>
                </div>
              </div>

              <Separator className="my-6" />
              <p className="text-muted-foreground leading-relaxed">{artwork.description}</p>

              <div className="flex gap-3 mt-8">
                <Button
                  className="flex-1 gap-2"
                  variant={isInCart(artwork.id) ? "secondary" : "default"}
                  onClick={() => (isInCart(artwork.id) ? removeFromCart(artwork.id) : addToCart(artwork))}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {isInCart(artwork.id) ? "Remove from Cart" : "Add to Cart"}
                </Button>
                <Button variant="outline" size="icon" aria-label="Share">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <section className="mt-20">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-8">You May Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {related.map((art) => (
                  <Link key={art.id} to={`/art/${art.id}`} className="group">
                    <div className="aspect-[3/4] rounded-xl overflow-hidden mb-3">
                      <img src={art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                    <h3 className="font-serif font-semibold text-foreground">{art.title}</h3>
                    <p className="text-sm text-muted-foreground">{art.artist}</p>
                    <p className="text-sm font-medium text-foreground mt-1">PKR {art.price.toLocaleString()}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ArtDetail;
