"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { SystemButton } from "@/components/ui/SystemButton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function AuthModal({ onClose }: { onClose?: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Welcome back, Hunter.");
        router.push("/dashboard");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${location.origin}/auth/callback`,
          },
        });
        if (error) throw error;
        toast.success("Check your email to awaken.");
        if (onClose) onClose();
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-system-panel/90 backdrop-blur-xl border border-system-border rounded-lg shadow-2xl relative overflow-hidden">
      {/* Decorative top bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-system-cyan to-transparent opacity-50" />

      <h2 className="text-2xl font-display font-bold text-center mb-2 tracking-widest text-white uppercase">
        {isLogin ? "System Login" : "Awakening"}
      </h2>
      <p className="text-center text-white/40 text-sm mb-8 font-mono">
        {isLogin ? "Identify yourself." : "Begin your journey."}
      </p>

      <form onSubmit={handleAuth} className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-mono text-system-cyan uppercase tracking-wider">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-void-deep border border-void-border focus:border-system-cyan focus:shadow-[0_0_10px_rgba(0,255,255,0.2)] text-white px-4 py-3 rounded outline-none transition-all font-mono"
            placeholder="hunter@system.com"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-mono text-system-cyan uppercase tracking-wider">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-void-deep border border-void-border focus:border-system-cyan focus:shadow-[0_0_10px_rgba(0,255,255,0.2)] text-white px-4 py-3 rounded outline-none transition-all font-mono"
            placeholder="••••••••"
            required
          />
        </div>

        <SystemButton type="submit" className="w-full" disabled={loading} glow>
          {loading ? "Processing..." : isLogin ? "Access System" : "Initiate Awakening"}
        </SystemButton>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm text-white/40 hover:text-system-cyan transition-colors font-mono underline decoration-dotted"
        >
          {isLogin ? "No ID? Awaken here." : "Already Awakened? Login."}
        </button>
      </div>
    </div>
  );
}
