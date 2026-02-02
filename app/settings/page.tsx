"use client";

import { useState, useEffect } from "react";
import { User, Shield, LogOut, Bell, Dumbbell, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { SystemButton } from "@/components/ui/SystemButton";
import { toast } from "sonner";

export default function SettingsPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [settings, setSettings] = useState({
    soundEnabled: true,
    soundVolume: 50,
    publicProfile: true,
    showStats: true,
    allowFriendRequests: true,
  });
  
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUsername(data.user?.user_metadata?.username || "");
      setEmail(data.user?.email || "");
    });
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("ascend-settings");
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("ascend-settings", JSON.stringify(settings));
    toast.success("Settings saved.");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 max-w-4xl mx-auto">
      <div className="space-y-8 animate-in fade-in">
        <h1 className="text-3xl font-display font-bold text-white uppercase tracking-wider">
          Settings
        </h1>
        <p className="text-white/60">
          Configure your System preferences.
        </p>

        <section className="bg-system-panel border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-6 h-6 text-system-cyan" />
            <h2 className="text-xl font-display font-bold text-white uppercase tracking-wider">
              Account
            </h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm text-white/60 block mb-2">
                Username
              </label>
              <div className="text-white/40 font-mono bg-void-deep border border-white/20 rounded-lg px-4 py-3">
                {username}
              </div>
            </div>

            <div>
              <label className="text-sm text-white/60 block mb-2">
                Email
              </label>
              <div className="text-white/40 font-mono bg-void-deep border border-white/20 rounded-lg px-4 py-3">
                {email}
              </div>
            </div>

            <button
              className="text-sm text-status-danger hover:text-white/60 transition-colors"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 inline mr-2" />
              Sign Out
            </button>
          </div>
        </section>

        <section className="bg-system-panel border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-6 h-6 text-system-cyan" />
            <h2 className="text-xl font-display font-bold text-white uppercase tracking-wider">
              Audio
            </h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm text-white/60">
                Sound Effects
              </label>
              <button
                className={cn(
                  "w-12 h-6 rounded-full transition-all duration-300",
                  settings.soundEnabled
                    ? "bg-system-cyan text-void-deep"
                    : "bg-white/20 text-white/60"
                )}
                onClick={() => setSettings({ ...settings, soundEnabled: !settings.soundEnabled })}
              />
            </div>
            
            <div className="w-full">
              <label className="text-sm text-white/60 block mb-2">
                Volume: {settings.soundVolume}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.soundVolume}
                onChange={(e) => setSettings({ ...settings, soundVolume: parseInt(e.target.value) })}
                className="w-full h-2 bg-void-deep border-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-system-cyan [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
              />
            </div>
          </div>
        </section>

        <section className="bg-system-panel border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-system-cyan" />
            <h2 className="text-xl font-display font-bold text-white uppercase tracking-wider">
              Privacy
            </h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm text-white/60">
                Public Profile
              </label>
              <button
                className={cn(
                  "w-12 h-6 rounded-full transition-all duration-300",
                  settings.publicProfile
                    ? "bg-system-cyan text-void-deep"
                    : "bg-white/20 text-white/60"
                )}
                onClick={() => setSettings({ ...settings, publicProfile: !settings.publicProfile })}
              />
            </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm text-white/60">
                Show Stats
              </label>
              <button
                className={cn(
                  "w-12 h-6 rounded-full transition-all duration-300",
                  settings.showStats
                    ? "bg-system-cyan text-void-deep"
                    : "bg-white/20 text-white/60"
                )}
                onClick={() => setSettings({ ...settings, showStats: !settings.showStats })}
              />
            </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm text-white/60">
                Allow Friend Requests
              </label>
              <button
                className={cn(
                  "w-12 h-6 rounded-full transition-all duration-300",
                  settings.allowFriendRequests
                    ? "bg-system-cyan text-void-deep"
                    : "bg-white/20 text-white/60"
                )}
                onClick={() => setSettings({ ...settings, allowFriendRequests: !settings.allowFriendRequests })}
              />
            </div>
            </div>
          </div>
        </section>

        <section className="bg-system-panel border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Dumbbell className="w-6 h-6 text-system-cyan" />
            <h2 className="text-xl font-display font-bold text-white uppercase tracking-wider">
              Equipment
            </h2>
          </div>
          
          <div className="space-y-3">
            <p className="text-sm text-white/60 mb-4">
              Select available equipment. The System will tailor quests accordingly.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {["Bodyweight Only", "Pull-up Bar", "Dumbbells", "Kettlebells", "Barbell", "Cables", "Resistance Bands", "Gym"].map((item) => (
                <label key={item} className="flex items-center gap-3 p-3 border border-white/10 rounded-lg cursor-pointer hover:border-white/20 transition-colors">
                  <input type="checkbox" className="w-5 h-5 rounded border-white/20" />
                  <span className="text-sm text-white/80">
                    {item}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </section>

        <SystemButton onClick={handleSave} glow>
          Save Changes
        </SystemButton>

        <section className="bg-system-panel/50 border border-status-danger/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Trash2 className="w-6 h-6 text-status-danger" />
            <h2 className="text-xl font-display font-bold text-status-danger uppercase tracking-wider">
              Danger Zone
            </h2>
          </div>
          
          <div className="space-y-4">
            <div className="border-l-2 border-white/20 pl-4">
              <h3 className="text-lg font-bold text-white mb-2">
                Reset All Progress
              </h3>
              <p className="text-sm text-white/60 mb-4">
                This will reset your XP, level, rank, and all progress. This action cannot be undone.
              </p>
              <button className="px-4 py-2 bg-status-danger/20 text-status-danger hover:bg-status-danger/30 rounded-lg transition-colors text-sm font-medium">
                Reset Progress
              </button>
            </div>

            <div className="border-l-2 border-white/20 pl-4">
              <h3 className="text-lg font-bold text-white mb-2">
                Delete Account
              </h3>
              <p className="text-sm text-white/60 mb-4">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <button className="px-4 py-2 bg-status-danger text-white hover:bg-status-danger/90 rounded-lg transition-colors text-sm font-medium">
                Delete Account
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
