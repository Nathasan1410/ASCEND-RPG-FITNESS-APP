"use client";

import { useState, useEffect } from "react";
import {
  User, UserCircle, Palette, Volume2, Shield,
  Package, Sword, AlertTriangle, Save, Check, X, Image, Upload, Dumbbell
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { mockSettings, mockBadgeStyles, mockThemeOptions, mockFontSizes, mockEquipmentOptions, mockClassOptions } from "@/lib/mock/settings-data";

// Navigation sections config
const settingsSections = [
  { id: "account", icon: User, label: "Account" },
  { id: "profile", icon: UserCircle, label: "Profile" },
  { id: "appearance", icon: Palette, label: "Appearance" },
  { id: "audio", icon: Volume2, label: "Audio" },
  { id: "privacy", icon: Shield, label: "Privacy" },
  { id: "equipment", icon: Package, label: "Equipment" },
  { id: "class", icon: Sword, label: "Class" },
  { id: "danger", icon: AlertTriangle, label: "Danger Zone", danger: true },
];

export default function SettingsPageDemo() {
  const [settings, setSettings] = useState(mockSettings);
  const [activeSection, setActiveSection] = useState("account");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-void-deep/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-white uppercase tracking-wider">
              Settings
            </h1>
            <p className="text-sm text-white/60">
              Manage your account and preferences
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all",
              saveSuccess
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "bg-system-cyan hover:bg-system-cyan/90 text-void-deep shadow-neon-blue active:scale-95"
            )}
          >
            {isSaving ? (
              <>
                <Dumbbell className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : saveSuccess ? (
              <>
                <Check className="w-4 h-4" />
                Saved!
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block">
            <nav className="lg:sticky lg:top-24 lg:self-start">
              <div className="space-y-1">
                {settingsSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => {
                        setActiveSection(section.id);
                        scrollToSection(section.id);
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative active:scale-98",
                        activeSection === section.id
                          ? "bg-system-cyan/10 text-white"
                          : "text-white/60 hover:bg-white/5 hover:text-white",
                        section.danger && activeSection === section.id && "text-status-danger"
                      )}
                    >
                      {activeSection === section.id && !section.danger && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-system-cyan rounded-r-full" />
                      )}
                      <Icon className={cn(
                        "w-4 h-4",
                        activeSection === section.id && !section.danger && "text-system-cyan",
                        section.danger && activeSection === section.id && "text-status-danger"
                      )} />
                      <span className="text-sm font-medium">{section.label}</span>
                    </button>
                  );
                })}
              </div>
            </nav>
          </aside>

          {/* Settings Content */}
          <main className="space-y-8">
            {/* Mobile Quick Links */}
            <div className="lg:hidden overflow-x-auto pb-4">
              <div className="flex gap-2">
                {["account", "profile", "appearance", "privacy"].map((link) => (
                  <button
                    key={link}
                    onClick={() => {
                      setActiveSection(link);
                      scrollToSection(link);
                    }}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all active:scale-95 min-h-[44px]",
                      activeSection === link
                        ? "bg-system-cyan text-void-deep"
                        : "bg-void-deep border border-white/10 text-white/70 hover:border-system-cyan/50"
                    )}
                  >
                    {link.charAt(0).toUpperCase() + link.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Settings Sections */}
            <AccountSection settings={settings} />
            <ProfileSection settings={settings} onChange={setSettings} />
            <AppearanceSection settings={settings} onChange={setSettings} />
            <AudioSection settings={settings} onChange={setSettings} />
            <PrivacySection settings={settings} onChange={setSettings} />
            <EquipmentSection settings={settings} onChange={setSettings} />
            <ClassSection settings={settings} onChange={setSettings} />
            <DangerSection />
          </main>
        </div>
      </div>
    </div>
  );
}

// Account Section
function AccountSection({ settings }: { settings: typeof mockSettings }) {
  return (
    <section id="account" className="space-y-4 scroll-mt-20">
      <h3 className="text-lg font-bold text-white uppercase tracking-wide flex items-center gap-3">
        <User className="w-5 h-5 text-system-cyan" />
        Account
      </h3>

      <div className="bg-void-deep/50 border border-white/10 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between py-3 border-b border-white/10">
          <div>
            <div className="text-sm text-white/60">Username</div>
            <div className="text-white font-mono">{settings.username}</div>
          </div>
          <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white/70 transition-all active:scale-95">
            Edit
          </button>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-white/10">
          <div>
            <div className="text-sm text-white/60">Email</div>
            <div className="text-white font-mono">{settings.email}</div>
          </div>
          <span className="px-2 py-1 bg-white/5 rounded text-xs text-white/40">Read Only</span>
        </div>

        <button className="w-full py-3 text-status-danger hover:bg-status-danger/10 rounded-lg text-sm font-medium transition-all active:scale-95">
          Delete Account
        </button>
      </div>
    </section>
  );
}

// Profile Section
function ProfileSection({ settings, onChange }: {
  settings: typeof mockSettings;
  onChange: (settings: any) => void;
}) {
  return (
    <section id="profile" className="space-y-4 scroll-mt-20">
      <h3 className="text-lg font-bold text-white uppercase tracking-wide flex items-center gap-3">
        <UserCircle className="w-5 h-5 text-system-cyan" />
        Profile
      </h3>

      <div className="bg-void-deep/50 border border-white/10 rounded-xl p-6 space-y-6">
        {/* Avatar Upload */}
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-system-cyan/20 to-blue-600/20 flex items-center justify-center border-2 border-white/10">
            <User className="w-10 h-10 text-system-cyan" />
          </div>
          <div className="flex-1 space-y-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-system-cyan hover:bg-system-cyan/90 text-void-deep rounded-lg text-sm font-medium transition-all active:scale-95">
              <Upload className="w-4 h-4" />
              Change Avatar
            </button>
            <p className="text-xs text-white/40">
              Recommended: 400x400px, PNG or JPG
            </p>
          </div>
        </div>

        {/* Banner Upload */}
        <div className="space-y-3">
          <div className="w-full h-24 rounded-xl bg-gradient-to-r from-system-cyan/10 to-blue-600/10 flex items-center justify-center border-2 border-dashed border-white/10">
            <Image className="w-6 h-6 text-white/40" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white/70 rounded-lg text-sm font-medium transition-all active:scale-95">
            <Upload className="w-4 h-4" />
            Change Banner
          </button>
        </div>

        {/* Display Name */}
        <div className="space-y-2">
          <label className="text-sm text-white/60">Display Name</label>
          <input
            type="text"
            value={settings.displayName}
            onChange={(e) => onChange({ ...settings, displayName: e.target.value })}
            placeholder="Your display name"
            className="w-full bg-void-deep border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-system-cyan focus:outline-none transition-all"
            maxLength={50}
          />
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm text-white/60">Bio</label>
            <span className="text-xs text-white/40">{settings.bio.length}/150</span>
          </div>
          <textarea
            value={settings.bio}
            onChange={(e) => onChange({ ...settings, bio: e.target.value })}
            placeholder="Tell us about yourself..."
            rows={3}
            maxLength={150}
            className="w-full bg-void-deep border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-system-cyan focus:outline-none transition-all resize-none"
          />
        </div>
      </div>
    </section>
  );
}

// Appearance Section
function AppearanceSection({ settings, onChange }: {
  settings: typeof mockSettings;
  onChange: (settings: any) => void;
}) {
  return (
    <section id="appearance" className="space-y-4 scroll-mt-20">
      <h3 className="text-lg font-bold text-white uppercase tracking-wide flex items-center gap-3">
        <Palette className="w-5 h-5 text-system-cyan" />
        Appearance
      </h3>

      <div className="bg-void-deep/50 border border-white/10 rounded-xl p-6 space-y-6">
        {/* Badge Style */}
        <div className="space-y-3">
          <label className="text-sm text-white/60">Badge Style</label>
          <div className="grid grid-cols-3 gap-3">
            {mockBadgeStyles.map((style) => (
              <button
                key={style.value}
                onClick={() => onChange({ ...settings, badgeStyle: style.value })}
                className={cn(
                  "p-4 rounded-xl border transition-all active:scale-98",
                  settings.badgeStyle === style.value
                    ? "border-system-cyan bg-system-cyan/10"
                    : "border-white/10 hover:border-white/20"
                )}
              >
                <div className={cn(
                  "w-full h-12 rounded-lg mb-2",
                  settings.badgeStyle === "glow" && style.value === "glow" && "bg-system-cyan shadow-[0_0_10px_rgba(0,255,255,0.5)]",
                  settings.badgeStyle === "minimal" && style.value === "minimal" && "bg-system-cyan/20",
                  settings.badgeStyle === "outline" && style.value === "outline" && "bg-system-cyan/20 border-2 border-system-cyan"
                )} />
                <div className="text-xs font-medium text-white">{style.label}</div>
                <div className="text-[10px] text-white/40 mt-1">{style.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Theme */}
        <div className="space-y-3">
          <label className="text-sm text-white/60">Theme</label>
          <div className="flex gap-3">
            {mockThemeOptions.map((theme) => (
              <button
                key={theme.value}
                onClick={() => onChange({ ...settings, theme: theme.value })}
                className={cn(
                  "flex-1 p-4 rounded-xl border transition-all active:scale-98",
                  settings.theme === theme.value
                    ? "border-system-cyan bg-system-cyan/10"
                    : "border-white/10 hover:border-white/20"
                )}
              >
                <div className="text-sm font-medium text-white">{theme.label}</div>
                <div className="text-[10px] text-white/40 mt-1">{theme.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Font Size */}
        <div className="space-y-3">
          <label className="text-sm text-white/60">Font Size</label>
          <div className="flex gap-3">
            {mockFontSizes.map((size) => (
              <button
                key={size.value}
                onClick={() => onChange({ ...settings, fontSize: size.value })}
                className={cn(
                  "flex-1 p-4 rounded-xl border transition-all active:scale-98",
                  settings.fontSize === size.value
                    ? "border-system-cyan bg-system-cyan/10"
                    : "border-white/10 hover:border-white/20"
                )}
              >
                <div className={cn(
                  "text-white font-medium",
                  size.value === "small" && "text-sm",
                  size.value === "medium" && "text-base",
                  size.value === "large" && "text-lg"
                )}>
                  {size.label}
                </div>
                <div className="text-[10px] text-white/40 mt-1">{size.description}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Audio Section
function AudioSection({ settings, onChange }: {
  settings: typeof mockSettings;
  onChange: (settings: any) => void;
}) {
  return (
    <section id="audio" className="space-y-4 scroll-mt-20">
      <h3 className="text-lg font-bold text-white uppercase tracking-wide flex items-center gap-3">
        <Volume2 className="w-5 h-5 text-system-cyan" />
        Audio
      </h3>

      <div className="bg-void-deep/50 border border-white/10 rounded-xl p-6 space-y-4">
        <ToggleSetting
          label="Sound Effects"
          description="Enable sound effects for interactions"
          checked={settings.soundEnabled}
          onChange={(checked) => onChange({ ...settings, soundEnabled: checked })}
        />

        <div className="space-y-3 py-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white">Volume</div>
              <div className="text-xs text-white/40">Sound effects volume</div>
            </div>
            <div className="text-sm font-bold text-system-cyan">{settings.volume}%</div>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={settings.volume}
            onChange={(e) => onChange({ ...settings, volume: parseInt(e.target.value) })}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-system-cyan [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,255,255,0.3)]"
          />
        </div>

        <ToggleSetting
          label="Background Music"
          description="Play ambient background music"
          checked={settings.musicEnabled}
          onChange={(checked) => onChange({ ...settings, musicEnabled: checked })}
        />
      </div>
    </section>
  );
}

// Privacy Section
function PrivacySection({ settings, onChange }: {
  settings: typeof mockSettings;
  onChange: (settings: any) => void;
}) {
  return (
    <section id="privacy" className="space-y-4 scroll-mt-20">
      <h3 className="text-lg font-bold text-white uppercase tracking-wide flex items-center gap-3">
        <Shield className="w-5 h-5 text-system-cyan" />
        Privacy
      </h3>

      <div className="bg-void-deep/50 border border-white/10 rounded-xl p-6 space-y-4">
        <ToggleSetting
          label="Public Profile"
          description="Allow other hunters to see your profile"
          checked={settings.publicProfile}
          onChange={(checked) => onChange({ ...settings, publicProfile: checked })}
        />

        <ToggleSetting
          label="Show Stats"
          description="Display your stats publicly on leaderboard"
          checked={settings.showStats}
          onChange={(checked) => onChange({ ...settings, showStats: checked })}
        />

        <ToggleSetting
          label="Allow Friend Requests"
          description="Let other hunters send you friend requests"
          checked={settings.allowFriendRequests}
          onChange={(checked) => onChange({ ...settings, allowFriendRequests: checked })}
        />
      </div>
    </section>
  );
}

// Equipment Section
function EquipmentSection({ settings, onChange }: {
  settings: typeof mockSettings;
  onChange: (settings: any) => void;
}) {
  return (
    <section id="equipment" className="space-y-4 scroll-mt-20">
      <h3 className="text-lg font-bold text-white uppercase tracking-wide flex items-center gap-3">
        <Package className="w-5 h-5 text-system-cyan" />
        Equipment
      </h3>

      <div className="bg-void-deep/50 border border-white/10 rounded-xl p-6 space-y-4">
        <p className="text-sm text-white/60 mb-4">
          Select available equipment. The System will tailor quests accordingly.
        </p>

        <div className="grid grid-cols-2 gap-3">
          {mockEquipmentOptions.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                const newEquipment = settings.equipment.includes(item.id)
                  ? settings.equipment.filter((e) => e !== item.id)
                  : [...settings.equipment, item.id];
                onChange({ ...settings, equipment: newEquipment });
              }}
              className={cn(
                "flex items-center gap-3 p-4 rounded-xl border transition-all active:scale-98",
                settings.equipment.includes(item.id)
                  ? "border-system-cyan bg-system-cyan/10"
                  : "border-white/10 hover:border-white/20"
              )}
            >
              <div className={cn(
                "w-5 h-5 rounded border flex items-center justify-center transition-all",
                settings.equipment.includes(item.id)
                  ? "border-system-cyan bg-system-cyan"
                  : "border-white/20"
              )}>
                {settings.equipment.includes(item.id) && <Check className="w-3 h-3 text-void-deep" />}
              </div>
              <span className="text-sm font-medium text-white">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// Class Section
function ClassSection({ settings, onChange }: {
  settings: typeof mockSettings;
  onChange: (settings: any) => void;
}) {
  return (
    <section id="class" className="space-y-4 scroll-mt-20">
      <h3 className="text-lg font-bold text-white uppercase tracking-wide flex items-center gap-3">
        <Sword className="w-5 h-5 text-system-cyan" />
        Class
      </h3>

      <div className="bg-void-deep/50 border border-white/10 rounded-xl p-6 space-y-6">
        <div className="flex items-center justify-between py-3 border-b border-white/10">
          <div>
            <div className="text-sm text-white/60">Current Class</div>
            <div className="text-lg font-bold text-system-cyan uppercase">{settings.currentClass}</div>
          </div>
          <button className="px-4 py-2 bg-system-cyan hover:bg-system-cyan/90 text-void-deep rounded-lg text-sm font-medium transition-all active:scale-95">
            Change Class
          </button>
        </div>

        <p className="text-xs text-status-danger flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          Warning: Changing class will reduce your total XP by 50%
        </p>

        <div className="space-y-2">
          <div className="text-sm text-white/60">Available Classes</div>
          {mockClassOptions.map((option) => (
            <div
              key={option.value}
              className={cn(
                "flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer",
                settings.currentClass === option.value
                  ? "border-system-cyan bg-system-cyan/10"
                  : "border-white/10 hover:border-white/20"
              )}
            >
              <div className={cn(
                "w-4 h-4 rounded-full border-2 flex-shrink-0",
                settings.currentClass === option.value
                  ? "border-system-cyan bg-system-cyan"
                  : "border-white/20"
              )}>
                {settings.currentClass === option.value && <Check className="w-2.5 h-2.5 text-void-deep" />}
              </div>
              <div className="flex-1">
                <div className="text-white font-bold uppercase">{option.label}</div>
                <div className="text-xs text-white/60">{option.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Danger Section
function DangerSection() {
  return (
    <section id="danger" className="space-y-4 scroll-mt-20">
      <h3 className="text-lg font-bold text-status-danger uppercase tracking-wide flex items-center gap-3">
        <AlertTriangle className="w-5 h-5" />
        Danger Zone
      </h3>

      <div className="bg-status-danger/5 border border-status-danger/20 rounded-xl p-6 space-y-6">
        {/* Reset Progress */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="text-white font-bold mb-2">Reset All Progress</div>
            <p className="text-sm text-white/60">
              This will reset your XP, level, rank, and all progress. This action cannot be undone.
            </p>
          </div>
          <button className="px-4 py-2 bg-status-danger hover:bg-status-danger/90 text-white rounded-lg text-sm font-medium transition-all active:scale-95 flex-shrink-0">
            Reset Progress
          </button>
        </div>

        <div className="border-t border-status-danger/20" />

        {/* Delete Account */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="text-white font-bold mb-2">Delete Account</div>
            <p className="text-sm text-white/60">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
          </div>
          <button className="px-4 py-2 bg-status-danger hover:bg-status-danger/90 text-white rounded-lg text-sm font-medium transition-all active:scale-95 flex-shrink-0">
            Delete Account
          </button>
        </div>
      </div>
    </section>
  );
}

// Toggle Setting Component
function ToggleSetting({
  label,
  description,
  checked,
  onChange
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between py-4 border-b border-white/10 last:border-0">
      <div className="flex-1 pr-4">
        <div className="text-sm font-medium text-white">{label}</div>
        {description && (
          <div className="text-xs text-white/40 mt-1">{description}</div>
        )}
      </div>
      <label className="relative cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div className={cn(
          "w-11 h-6 rounded-full transition-all duration-300 relative",
          checked ? 'bg-system-cyan shadow-[0_0_10px_rgba(0,255,255,0.4)]' : 'bg-void-deep border-2 border-white/20'
        )}>
          <div className={cn(
            "absolute top-0.5 w-5 h-5 rounded-full transition-all duration-300",
            checked ? 'translate-x-5 bg-void-deep' : 'translate-x-0.5 bg-white/40'
          )} />
        </div>
      </label>
    </div>
  );
}
