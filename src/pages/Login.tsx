import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import loginArt from "@/assets/login-art.jpg";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<"buyer" | "seller">("buyer");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const baseUrl = import.meta.env.VITE_EMAIL_REDIRECT_URL || "https://skillify-eosin.vercel.app/";
  const redirectUrl = `${baseUrl}auth/callback`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast({ title: "Welcome back!" });
        navigate("/");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl,
            data: { role, first_name: firstName, last_name: lastName },
          },
        });
        if (error) throw error;
        toast({ title: "Check your email", description: "We sent you a verification link." });
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12">
        <a href="/" className="font-serif text-3xl font-bold tracking-tight text-foreground mb-12">
          ARTIFY
        </a>

        <h1 className="text-4xl md:text-5xl font-serif font-bold italic text-foreground mb-2 opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          {isLogin ? "Welcome!" : "Create Account"}
        </h1>
        <p className="text-muted-foreground mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.25s" }}>
          {isLogin ? "Enter your email and password to continue." : "Fill in your details to get started."}
        </p>

        {/* Role Toggle */}
        {!isLogin && (
          <div className="flex rounded-full border border-border overflow-hidden mb-6 max-w-md">
            <button
              type="button"
              onClick={() => setRole("buyer")}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                role === "buyer"
                  ? "bg-foreground text-background"
                  : "bg-background text-foreground hover:bg-secondary"
              }`}
            >
              Buyer
            </button>
            <button
              type="button"
              onClick={() => setRole("seller")}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                role === "seller"
                  ? "bg-foreground text-background"
                  : "bg-background text-foreground hover:bg-secondary"
              }`}
            >
              Seller
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          {!isLogin && (
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="h-12 rounded-full px-6"
              />
              <Input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="h-12 rounded-full px-6"
              />
            </div>
          )}

          <Input
            type="email"
            placeholder="Type your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12 rounded-full px-6"
          />

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12 rounded-full px-6 pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {isLogin && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <label htmlFor="remember" className="text-sm text-foreground">
                  Remember me
                </label>
              </div>
              <button type="button" className="text-sm text-foreground underline">
                Forgot Password?
              </button>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            {loading ? "Please wait..." : isLogin ? "Log in" : "Sign up"}
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleSignIn}
            className="w-full h-12 rounded-full"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </Button>
        </form>

        <p className="mt-6 text-sm text-muted-foreground max-w-md">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-foreground underline font-medium"
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>

      {/* Right - Art Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src={loginArt}
          alt="Digital art"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <div className="absolute top-6 left-6">
          <span className="bg-foreground/30 backdrop-blur-sm text-background text-xs px-4 py-2 rounded-full">
            Curated · Original · Limited
          </span>
        </div>
        <div className="absolute top-6 right-6">
          <span className="text-background/80 text-xs">A Space for Digital Originals</span>
        </div>
        <div className="absolute bottom-12 left-8 right-8">
          <h2 className="text-3xl font-serif italic text-background mb-2">
            Where Digital Art Finds Its Value
          </h2>
          <p className="text-background/70 text-sm">
            Discover, collect, and sell original digital artworks from visionary artists around the world.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
