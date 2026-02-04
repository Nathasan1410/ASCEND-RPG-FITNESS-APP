"use client";

import { useState, useEffect } from "react";
import { User, Shield, LogOut, Bell, Dumbbell, Trash2, Edit3, AlertTriangle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { SystemButton } from "@/components/ui/SystemButton";
import { toast } from "sonner";
import { cn } from "@/lib/utils/cn";
import {
  updateProfileSettings,
  updateEquipment,
  changeUserClass,
  resetAllProgress,
  deleteAccount
} from "@/server/actions/settings-actions";

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
  const [isLoading, setIsLoading] = useState(false);

  const [profileForm, setProfileForm] = useState({
    bio: "",
    displayName: "",
    bannerUrl: "",
  });

  const [equipment, setEquipment] = useState<string[]>([]);
  const [selectedClass, setSelectedClass] = useState<"Novice" | "Striker" | "Tank" | "Assassin">("Novice");
  const handleClassChange = (value: "Novice" | "Striker" | "Tank" | "Assassin") => {
    setSelectedClass(value);
  };

  const equipmentOptions = [
    "Bodyweight Only",
    "Pull-up Bar",
    "Dumbbells",
    "Kettlebells",
    "Barbell",
    "Cables",
    "Resistance Bands",
    "Gym",
  ];

  const classOptions = [
    { value: "Novice", label: "Novice - Consistency Builder", description: "Focus on form and consistency" },
    { value: "Striker", label: "Striker - Endurance", description: "High volume, short rest" },
    { value: "Tank", label: "Tank - Strength", description: "Low reps, heavy load" },
    { value: "Assassin", label: "Assassin - Agility", description: "HIIT, cardio, fat loss" },
  ];

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setUsername(user.user_metadata?.username || "");
      setEmail(user.email || "");

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileData) {
        const p = profileData as any;
        setProfile(p);
        setProfileForm({
          bio: p.bio || "",
          displayName: p.display_name || "",
          bannerUrl: p.banner_url || "",
        });
        setEquipment(p.equipment || []);
        setSelectedClass(p.class || "Novice");
      }
    };

    loadProfile();
  }, [supabase]);

  useEffect(() => {
    const saved = localStorage.getItem("ascend-settings");
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const handleSaveSettings = async () => {
    localStorage.setItem("ascend-settings", JSON.stringify(settings));
    toast.success("Audio & privacy settings saved.");
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      await updateProfileSettings({
        bio: profileForm.bio,
        display_name: profileForm.displayName,
        banner_url: profileForm.bannerUrl,
      });
      toast.success("Profile updated successfully.");
      router.refresh();
    } catch (error) {
      toast.error("Failed to update profile.");
    }
    setIsLoading(false);
  };

  const handleSaveEquipment = async () => {
    setIsLoading(true);
    try {
      await updateEquipment(equipment);
      toast.success("Equipment saved.");
      router.refresh();
    } catch (error) {
      toast.error("Failed to save equipment.");
    }
    setIsLoading(false);
  };

  const handleChangeClass = async () => {
    if (!confirm(`Change class to ${selectedClass}? This will reduce your XP by 50%.`)) return;

    setIsLoading(true);
    try {
      const result = await changeUserClass(selectedClass);
      if (result.success) {
        toast.success(`Class changed to ${selectedClass}. XP adjusted to ${result.newTotalXp}.`);
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("Failed to change class.");
    }
    setIsLoading(false);
  };

  const handleResetProgress = async () => {
    if (!confirm("Are you sure? This will reset ALL progress including XP, level, rank. This cannot be undone!")) return;

    setIsLoading(true);
    try {
      await resetAllProgress();
      toast.success("Progress reset successfully.");
      router.refresh();
    } catch (error) {
      toast.error("Failed to reset progress.");
    }
    setIsLoading(false);
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure? This will PERMANENTLY delete your account and all data. This cannot be undone!")) return;

    setIsLoading(true);
    try {
      await deleteAccount();
      toast.success("Account deleted.");
      router.push("/");
    } catch (error) {
      toast.error("Failed to delete account.");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 max-w-4xl mx-auto">
      <div className="space-y-8 animate-in fade-in">
        <h1 className="text-3xl font-display font-bold text-white uppercase tracking-wider">
          Settings
        </h1>
        <p className="text-white/60">
          Configure your System preferences and Hunter profile.
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
          </div>
        </section>

        <section className="bg-system-panel border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Edit3 className="w-6 h-6 text-system-cyan" />
            <h2 className="text-xl font-display font-bold text-white uppercase tracking-wider">
              Profile
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-white/60 block mb-2">
                Display Name
              </label>
              <input
                type="text"
                value={profileForm.displayName}
                onChange={(e) => setProfileForm({ ...profileForm, displayName: e.target.value })}
                placeholder="Hunter Name"
                className="w-full bg-void-deep border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-system-cyan focus:outline-none transition-colors"
                maxLength={50}
              />
            </div>

            <div>
              <label className="text-sm text-white/60 block mb-2">
                Bio ({profileForm.bio.length}/150)
              </label>
              <textarea
                value={profileForm.bio}
                onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                placeholder="Tell the System about yourself..."
                rows={3}
                maxLength={150}
                className="w-full bg-void-deep border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-system-cyan focus:outline-none transition-colors resize-none"
              />
            </div>

            <div>
              <label className="text-sm text-white/60 block mb-2">
                Banner URL
              </label>
              <input
                type="url"
                value={profileForm.bannerUrl}
                onChange={(e) => setProfileForm({ ...profileForm, bannerUrl: e.target.value })}
                placeholder="https://example.com/banner.jpg"
                className="w-full bg-void-deep border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-system-cyan focus:outline-none transition-colors"
              />
            </div>

            <SystemButton onClick={handleSaveProfile} disabled={isLoading} glow>
              {isLoading ? "Saving..." : "Update Profile"}
            </SystemButton>
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
                  "w-12 h-12 rounded-full transition-all duration-300",
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
                  "w-12 h-12 rounded-full transition-all duration-300",
                  settings.publicProfile
                    ? "bg-system-cyan text-void-deep"
                    : "bg-white/20 text-white/60"
                )}
                onClick={() => setSettings({ ...settings, publicProfile: !settings.publicProfile })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm text-white/60">
                Show Stats
              </label>
              <button
                className={cn(
                  "w-12 h-12 rounded-full transition-all duration-300",
                  settings.showStats
                    ? "bg-system-cyan text-void-deep"
                    : "bg-white/20 text-white/60"
                )}
                onClick={() => setSettings({ ...settings, showStats: !settings.showStats })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm text-white/60">
                Allow Friend Requests
              </label>
              <button
                className={cn(
                  "w-12 h-12 rounded-full transition-all duration-300",
                  settings.allowFriendRequests
                    ? "bg-system-cyan text-void-deep"
                    : "bg-white/20 text-white/60"
                )}
                onClick={() => setSettings({ ...settings, allowFriendRequests: !settings.allowFriendRequests })}
              />
            </div>
          </div>

          <SystemButton onClick={handleSaveSettings} disabled={isLoading} glow>
            {isLoading ? "Saving..." : "Save Changes"}
          </SystemButton>
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
               {equipmentOptions.map((item) => (
                 <label key={item} className="flex items-center gap-3 p-3 border border-white/10 rounded-lg cursor-pointer hover:border-white/20 transition-colors">
                   <input
                     type="checkbox"
                     checked={equipment.includes(item)}
                     onChange={(e) => {
                       if (e.target.checked) {
                         setEquipment([...equipment, item]);
                       } else {
                         setEquipment(equipment.filter(eq => eq !== item));
                       }
                     }}
                     className="w-11 h-11 rounded border-white/20 accent-system-cyan"
                   />
                   <span className="text-sm text-white/80">
                     {item}
                   </span>
                 </label>
               ))}
             </div>
          </div>

          <SystemButton onClick={handleSaveEquipment} disabled={isLoading} glow className="mt-4">
            {isLoading ? "Saving..." : "Save Equipment"}
          </SystemButton>
        </section>

        <section className="bg-system-panel border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-system-cyan" />
            <h2 className="text-xl font-display font-bold text-white uppercase tracking-wider">
              Class Change
            </h2>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-white/60 mb-4">
              Current Class: <span className="text-system-cyan font-bold uppercase">{profile?.class || "Novice"}</span>
            </p>

            <div className="space-y-2">
              {classOptions.map((option) => (
                <label
                  key={option.value}
                  className={cn(
                    "flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all",
                    selectedClass === option.value
                      ? "border-system-cyan bg-system-cyan/10"
                      : "border-white/10 hover:border-white/20"
                  )}
                >
                  <input
                    type="radio"
                    name="class-select"
                    value={option.value}
                    checked={selectedClass === option.value}
                    onChange={() => handleClassChange(option.value as "Novice" | "Striker" | "Tank" | "Assassin")}
                    className="accent-system-cyan"
                  />
                  <div className="flex-1">
                    <div className="text-white font-bold uppercase">{option.label}</div>
                    <div className="text-xs text-white/60">{option.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <SystemButton onClick={handleChangeClass} disabled={isLoading || selectedClass === profile?.class} glow className="mt-4">
            {isLoading ? "Processing..." : "Change Class"}
          </SystemButton>

          {selectedClass !== profile?.class && (
            <p className="text-xs text-status-danger mt-2">
              ⚠️ Warning: Changing class will reduce your total XP by 50%
            </p>
          )}
        </section>

        <section className="bg-system-panel border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Trash2 className="w-6 h-6 text-status-danger" />
            <h2 className="text-xl font-display font-bold text-status-danger uppercase tracking-wider">
              Danger Zone
            </h2>
          </div>

          <div className="space-y-4">
            <div className="border-l-2 border-status-danger/50 pl-4">
              <h3 className="text-lg font-bold text-white mb-2">
                Reset All Progress
              </h3>
              <p className="text-sm text-white/60 mb-4">
                This will reset your XP, level, rank, and all progress. This action cannot be undone.
              </p>
              <button
                className="px-4 py-2 bg-status-danger/20 text-status-danger hover:bg-status-danger/30 rounded-lg transition-colors text-sm font-medium"
                onClick={handleResetProgress}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Reset Progress"}
              </button>
            </div>

            <div className="border-l-2 border-status-danger/50 pl-4">
              <h3 className="text-lg font-bold text-white mb-2">
                Delete Account
              </h3>
              <p className="text-sm text-white/60 mb-4">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <button
                className="px-4 py-2 bg-status-danger text-white hover:bg-status-danger/90 rounded-lg transition-colors text-sm font-medium"
                onClick={handleDeleteAccount}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Delete Account"}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
