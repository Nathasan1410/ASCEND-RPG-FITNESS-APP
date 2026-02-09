# PHASE VI PROMPT: Settings Page Navigation

> **Phase:** VI | **Priority:** P1 - High | **Estimated Time:** 2-3 hours  
> **Reference Images:** You will attach reference images for visual inspiration  
> **Important:** Use **MOCK DATA** only. Do not connect to real database/API.

---

## OVERVIEW

Improve settings page with better navigation between sections. Create an organized, easy-to-navigate settings interface that works well on both mobile and desktop.

**Note:** You will receive reference images to match the visual style exactly. Focus on matching the settings page layout, navigation patterns, and section organization from provided screenshots.

---

## OBJECTIVES

1. **Settings Page Navigation** - Sidebar on desktop, sticky headers on mobile
2. **Section Organization** - Logical grouping of settings
3. **Quick Links** - Jump to sections easily
4. **Smooth Scrolling** - Animated scroll to sections on mobile
5. **Responsive Design** - Different layouts for mobile and desktop

---

## 1. SETTINGS PAGE STRUCTURE

### File to Create/Modify:
- `app/settings/page.tsx`

### Desktop Layout:
- Left sidebar with navigation links
- Right content area with settings sections
- Fixed sidebar on scroll
- Active state indicators

### Mobile Layout:
- Sticky section headers
- Smooth scroll navigation
- Collapsible sections
- Quick links at top

---

## 2. SETTINGS SECTIONS

### Sections to Include:

#### Account Settings:
- Username (edit with cooldown)
- Email (read-only)
- Delete account

#### Profile Settings:
- Display name
- Bio (150 chars max)
- Profile banner
- Avatar

#### Appearance Settings:
- Badge style selector (3 variants)
- Theme options (if enabled)
- Font size selector

#### Audio Settings:
- Sound effects toggle
- Volume slider (0-100)
- Music toggle

#### Privacy Settings:
- Public profile toggle
- Show stats toggle
- Allow friend requests toggle

#### Equipment Settings:
- Edit equipment inventory checkboxes
- Equipment display preferences

#### Class Settings:
- Class change with XP penalty (50% loss)
- Class reset warning

#### Danger Zone:
- Reset all progress
- Delete account

---

## 3. DESKTOP LAYOUT

### Left Sidebar Navigation:

```tsx
<SettingsLayout>
  <SettingsSidebar>
    <SidebarHeader>
      <h2>Settings</h2>
      <p>Manage your account and preferences</p>
    </SidebarHeader>
    
    <NavigationList>
      <NavItem href="#account" active>
        <User className="w-4 h-4" />
        Account
      </NavItem>
      <NavItem href="#profile">
        <UserCircle className="w-4 h-4" />
        Profile
      </NavItem>
      <NavItem href="#appearance">
        <Palette className="w-4 h-4" />
        Appearance
      </NavItem>
      <NavItem href="#audio">
        <Volume2 className="w-4 h-4" />
        Audio
      </NavItem>
      <NavItem href="#privacy">
        <Shield className="w-4 h-4" />
        Privacy
      </NavItem>
      <NavItem href="#equipment">
        <Package className="w-4 h-4" />
        Equipment
      </NavItem>
      <NavItem href="#class">
        <Sword className="w-4 h-4" />
        Class
      </NavItem>
      <NavItem href="#danger" danger>
        <AlertTriangle className="w-4 h-4" />
        Danger Zone
      </NavItem>
    </NavigationList>
  </SettingsSidebar>
  
  <SettingsContent>
    {/* Settings Sections */}
  </SettingsContent>
</SettingsLayout>
```

### Active State:

```tsx
<NavItem href="#account" active>
  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-system-cyan rounded-r-full" />
  <User className="w-4 h-4 text-system-cyan" />
  <span className="text-white font-medium">Account</span>
</NavItem>
```

---

## 4. MOBILE LAYOUT

### Sticky Section Headers:

```tsx
<MobileSettingsLayout>
  <QuickLinks>
    <QuickLink href="#account">Account</QuickLink>
    <QuickLink href="#profile">Profile</QuickLink>
    <QuickLink href="#appearance">Appearance</QuickLink>
    <QuickLink href="#privacy">Privacy</QuickLink>
  </QuickLinks>
  
  <SettingsSections>
    <Section id="account">
      <SectionHeader>Account</SectionHeader>
      <SectionContent>
        {/* Account settings */}
      </SectionContent>
    </Section>
    
    {/* More sections */}
  </SettingsSections>
</MobileSettingsLayout>
```

### Smooth Scroll:

```tsx
const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

<QuickLink onClick={() => scrollToSection('account')}>
  Account
</QuickLink>
```

---

## 5. SETTINGS COMPONENTS

### Account Section:

```tsx
<section id="account" className="space-y-6">
  <h3 className="text-lg font-bold text-white uppercase tracking-wide">
    Account
  </h3>
  
  <SettingsCard>
    <SettingItem>
      <Label>Username</Label>
      <Value>HunterShadow_X</Value>
      <EditButton onClick={() => setUsernameModalOpen(true)}>
        Edit
      </EditButton>
    </SettingItem>
    
    <SettingItem>
      <Label>Email</Label>
      <Value>hunter@example.com</Value>
      <Badge>Read Only</Badge>
    </SettingItem>
  </SettingsCard>
</section>
```

### Profile Section:

```tsx
<section id="profile" className="space-y-6">
  <h3 className="text-lg font-bold text-white uppercase tracking-wide">
    Profile
  </h3>
  
  <SettingsCard>
    <AvatarUpload>
      <Avatar src="/avatar.jpg" />
      <UploadButton>Change Avatar</UploadButton>
    </AvatarUpload>
    
    <InputField
      label="Display Name"
      value="Alex Hunter"
      onChange={setDisplayName}
    />
    
    <TextareaField
      label="Bio"
      value={bio}
      onChange={setBio}
      maxLength={150}
      placeholder="Tell us about yourself..."
    />
    
    <BannerUpload>
      <Banner src="/banner.jpg" />
      <UploadButton>Change Banner</UploadButton>
    </BannerUpload>
  </SettingsCard>
</section>
```

### Appearance Section:

```tsx
<section id="appearance" className="space-y-6">
  <h3 className="text-lg font-bold text-white uppercase tracking-wide">
    Appearance
  </h3>
  
  <SettingsCard>
    <BadgeStyleSelector>
      <BadgeStyleOption
        variant="glow"
        label="Glow"
        selected={badgeStyle === 'glow'}
        onSelect={() => setBadgeStyle('glow')}
      />
      <BadgeStyleOption
        variant="minimal"
        label="Minimal"
        selected={badgeStyle === 'minimal'}
        onSelect={() => setBadgeStyle('minimal')}
      />
      <BadgeStyleOption
        variant="outline"
        label="Outline"
        selected={badgeStyle === 'outline'}
        onSelect={() => setBadgeStyle('outline')}
      />
    </BadgeStyleSelector>
    
    <ThemeSelector>
      <ThemeOption theme="dark" selected>Dark</ThemeOption>
      <ThemeOption theme="darker">Darker</ThemeOption>
    </ThemeSelector>
    
    <FontSizeSelector>
      <FontSizeOption size="small" label="Small" />
      <FontSizeOption size="medium" label="Medium" selected />
      <FontSizeOption size="large" label="Large" />
    </FontSizeSelector>
  </SettingsCard>
</section>
```

### Audio Section:

```tsx
<section id="audio" className="space-y-6">
  <h3 className="text-lg font-bold text-white uppercase tracking-wide">
    Audio
  </h3>
  
  <SettingsCard>
    <ToggleSetting
      label="Sound Effects"
      checked={soundEnabled}
      onChange={setSoundEnabled}
    />
    
    <VolumeSlider
      label="Volume"
      value={volume}
      onChange={setVolume}
      min={0}
      max={100}
    />
    
    <ToggleSetting
      label="Background Music"
      checked={musicEnabled}
      onChange={setMusicEnabled}
    />
  </SettingsCard>
</section>
```

### Privacy Section:

```tsx
<section id="privacy" className="space-y-6">
  <h3 className="text-lg font-bold text-white uppercase tracking-wide">
    Privacy
  </h3>
  
  <SettingsCard>
    <ToggleSetting
      label="Public Profile"
      description="Allow other hunters to see your profile"
      checked={publicProfile}
      onChange={setPublicProfile}
    />
    
    <ToggleSetting
      label="Show Stats"
      description="Display your stats publicly"
      checked={showStats}
      onChange={setShowStats}
    />
    
    <ToggleSetting
      label="Allow Friend Requests"
      description="Let other hunters send you friend requests"
      checked={allowFriendRequests}
      onChange={setAllowFriendRequests}
    />
  </SettingsCard>
</section>
```

### Danger Zone:

```tsx
<section id="danger" className="space-y-6">
  <h3 className="text-lg font-bold text-status-danger uppercase tracking-wide">
    Danger Zone
  </h3>
  
  <DangerCard>
    <DangerItem>
      <Info>
        <h4>Reset All Progress</h4>
        <p>This will reset your level, XP, quests, and all progress. This action cannot be undone.</p>
      </Info>
      <DangerButton onClick={() => setResetModalOpen(true)}>
        Reset Progress
      </DangerButton>
    </DangerItem>
    
    <Divider />
    
    <DangerItem>
      <Info>
        <h4>Delete Account</h4>
        <p>Permanently delete your account and all data. This action cannot be undone.</p>
      </Info>
      <DangerButton onClick={() => setDeleteModalOpen(true)}>
        Delete Account
      </DangerButton>
    </DangerItem>
  </DangerCard>
</section>
```

---

## 6. MOCK DATA TO USE

### Settings State Mock Data:

```tsx
const mockSettings = {
  // Account
  username: "HunterShadow_X",
  email: "hunter@example.com",
  
  // Profile
  displayName: "Alex Hunter",
  bio: "RPG fitness enthusiast. Always grinding for that next rank.",
  avatar: "/avatars/hunter-shadow.jpg",
  banner: "/banners/hunter-shadow.jpg",
  
  // Appearance
  badgeStyle: "glow", // glow, minimal, outline
  theme: "dark", // dark, darker
  fontSize: "medium", // small, medium, large
  
  // Audio
  soundEnabled: true,
  volume: 80,
  musicEnabled: false,
  
  // Privacy
  publicProfile: true,
  showStats: true,
  allowFriendRequests: true,
  
  // Equipment
  equipment: ["gym", "home", "outdoor", "running"],
  
  // Class
  currentClass: "Assassin",
  classChangeAvailable: true,
};
```

### Badge Style Mock Data:

```tsx
const mockBadgeStyles = [
  { value: "glow", label: "Glow", preview: "glow" },
  { value: "minimal", label: "Minimal", preview: "minimal" },
  { value: "outline", label: "Outline", preview: "outline" },
];
```

### Equipment Mock Data:

```tsx
const mockEquipment = [
  { id: "gym", label: "Gym Equipment", checked: true },
  { id: "home", label: "Home Equipment", checked: true },
  { id: "outdoor", label: "Outdoor", checked: false },
  { id: "running", label: "Running", checked: true },
  { id: "swimming", label: "Swimming", checked: false },
  { id: "cycling", label: "Cycling", checked: false },
];
```

---

## 7. IMPLEMENTATION EXAMPLE

### Settings Page Component:

```tsx
"use client";

import { useState } from "react";
import { 
  User, UserCircle, Palette, Volume2, Shield, 
  Package, Sword, AlertTriangle, Save, X
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { mockSettings } from "@/lib/mock/settings-data";

export default function SettingsPage() {
  const [settings, setSettings] = useState(mockSettings);
  const [activeSection, setActiveSection] = useState("account");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <SettingsHeader>
        <Title>Settings</Title>
        <Subtitle>Manage your account and preferences</Subtitle>
        <SaveButton 
          onClick={handleSave} 
          disabled={isSaving}
          success={saveSuccess}
        >
          {isSaving ? "Saving..." : saveSuccess ? "Saved!" : "Save Changes"}
        </SaveButton>
      </SettingsHeader>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block">
            <SettingsSidebar 
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
          </aside>

          {/* Settings Content */}
          <main className="space-y-8">
            {/* Mobile Quick Links */}
            <MobileQuickLinks onSectionChange={setActiveSection} />

            {/* Settings Sections */}
            <AccountSection settings={settings} onChange={setSettings} />
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

function SettingsSidebar({ activeSection, onSectionChange }) {
  const sections = [
    { id: "account", icon: User, label: "Account" },
    { id: "profile", icon: UserCircle, label: "Profile" },
    { id: "appearance", icon: Palette, label: "Appearance" },
    { id: "audio", icon: Volume2, label: "Audio" },
    { id: "privacy", icon: Shield, label: "Privacy" },
    { id: "equipment", icon: Package, label: "Equipment" },
    { id: "class", icon: Sword, label: "Class" },
    { id: "danger", icon: AlertTriangle, label: "Danger Zone", danger: true },
  ];

  return (
    <nav className="lg:sticky lg:top-24 lg:self-start">
      <div className="space-y-1">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => {
              onSectionChange(section.id);
              document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300",
              activeSection === section.id
                ? "bg-system-cyan/10 text-white"
                : "text-white/60 hover:bg-white/5 hover:text-white",
              section.danger && activeSection === section.id && "text-status-danger"
            )}
          >
            {activeSection === section.id && !section.danger && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-system-cyan rounded-r-full" />
            )}
            <section.icon className={cn(
              "w-4 h-4",
              activeSection === section.id && !section.danger && "text-system-cyan",
              section.danger && activeSection === section.id && "text-status-danger"
            )} />
            <span className="text-sm font-medium">{section.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

function MobileQuickLinks({ onSectionChange }) {
  const quickLinks = [
    { id: "account", label: "Account" },
    { id: "profile", label: "Profile" },
    { id: "appearance", label: "Appearance" },
    { id: "privacy", label: "Privacy" },
  ];

  return (
    <div className="lg:hidden overflow-x-auto pb-4">
      <div className="flex gap-2">
        {quickLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => {
              onSectionChange(link.id);
              document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-4 py-2 bg-void-deep border border-white/10 rounded-lg text-sm text-white/70 whitespace-nowrap hover:border-system-cyan/50 transition-colors"
          >
            {link.label}
          </button>
        ))}
      </div>
    </div>
  );
}
```

### Toggle Setting Component:

```tsx
function ToggleSetting({ label, description, checked, onChange }) {
  return (
    <div className="flex items-start justify-between py-4 border-b border-white/10 last:border-0">
      <div className="flex-1 pr-4">
        <Label className="text-sm font-medium text-white">
          {label}
        </Label>
        {description && (
          <Description className="text-xs text-white/50 mt-1">
            {description}
          </Description>
        )}
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <label className="relative">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <div className={cn(
        "w-11 h-6 rounded-full transition-all duration-300 relative cursor-pointer",
        checked ? 'bg-system-cyan' : 'bg-void-deep border-2 border-white/20'
      )}>
        <div className={cn(
          "absolute top-0.5 w-5 h-5 rounded-full transition-all duration-300",
          checked ? 'translate-x-5 bg-void-deep' : 'translate-x-0.5 bg-white/40'
        )} />
      </div>
    </label>
  );
}
```

---

## 8. SUCCESS CRITERIA

### Visual:
- [ ] Desktop sidebar shows all sections
- [ ] Active section clearly highlighted
- [ ] Mobile quick links visible at top
- [ ] Sticky headers on mobile
- [ ] Smooth scroll to sections
- [ ] Danger zone clearly distinguished

### Functionality:
- [ ] Sidebar navigation works
- [ ] Mobile quick links work
- [ ] Settings save successfully
- [ ] Toggles toggle correctly
- [ ] Input fields update state
- [ ] Modals open/close properly

### Responsive:
- [ ] Sidebar hidden on mobile
- [ ] Quick links scroll horizontally on mobile
- [ ] All inputs accessible on mobile
- [ ] No horizontal scroll on desktop

---

## 9. TESTING CHECKLIST

### Desktop (1920px+):
- [ ] Sidebar visible and fixed
- [ ] Navigation works
- [ ] Active state updates
- [ ] All sections accessible

### Tablet (768px-1024px):
- [ ] Responsive layout works
- [ ] Content readable

### Mobile (<768px):
- [ ] Quick links scroll horizontally
- [ ] Sticky headers work
- [ ] Smooth scroll to sections
- [ ] All settings accessible

---

## 10. IMPORTANT NOTES

1. **USE MOCK DATA ONLY** - Do not connect to real database or API
2. **REFERENCE IMAGES** - You will attach reference images for visual matching
3. **RESPONSIVE DESIGN** - Test on all screen sizes
4. **ACCESSIBILITY** - Ensure keyboard navigation works
5. **DANGER ZONE** - Make destructive actions clear with warnings
6. **SAVE FEEDBACK** - Show success/error messages

---

**Reference Images:** Attach your visual reference screenshots here before starting implementation.

**Next Phase:** Phase 7 - Build Sidebar Components
