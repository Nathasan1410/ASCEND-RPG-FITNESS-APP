"use client";

import { useState, useEffect } from "react";
import { X, Edit3, Save } from "lucide-react";
import { updateProfileSettings } from "@/server/actions/settings-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils/cn";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: {
    display_name?: string | null;
    bio?: string | null;
    banner_url?: string | null;
    social_links?: {
      discord?: string | null;
      twitter?: string | null;
      steam?: string | null;
    } | null;
  };
}

export function EditProfileModal({ isOpen, onClose, profile }: EditProfileModalProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    displayName: profile.display_name || "",
    bio: profile.bio || "",
    bannerUrl: profile.banner_url || "",
    discord: profile.social_links?.discord || "",
    twitter: profile.social_links?.twitter || "",
    steam: profile.social_links?.steam || "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFormData({
      displayName: profile.display_name || "",
      bio: profile.bio || "",
      bannerUrl: profile.banner_url || "",
      discord: profile.social_links?.discord || "",
      twitter: profile.social_links?.twitter || "",
      steam: profile.social_links?.steam || "",
    });
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.displayName.trim()) {
      toast.error("Display Name is required");
      return;
    }

    if (formData.displayName.length > 50) {
      toast.error("Display Name must be 50 characters or less");
      return;
    }

    if (formData.bio.length > 150) {
      toast.error("Bio must be 150 characters or less");
      return;
    }

    if (formData.bannerUrl && !isValidUrl(formData.bannerUrl)) {
      toast.error("Banner URL must be a valid URL");
      return;
    }

    setIsLoading(true);

    try {
      const updateData: {
        display_name: string;
        bio: string;
        banner_url?: string;
      } = {
        display_name: formData.displayName,
        bio: formData.bio,
      };

      if (formData.bannerUrl) {
        updateData.banner_url = formData.bannerUrl;
      }

      await updateProfileSettings(updateData);

      toast.success("Profile updated successfully!");
      router.refresh();
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const isSaveDisabled = Boolean(
    isLoading ||
    formData.displayName.trim().length === 0 ||
    formData.displayName.length > 50 ||
    formData.bio.length > 150 ||
    (formData.bannerUrl && !isValidUrl(formData.bannerUrl))
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-xl"
      onClick={onClose}
    >
      <div
        className={cn(
          "bg-system-panel border border-white/10 rounded-t-xl md:rounded-xl w-full md:w-[600px] max-h-[90vh] overflow-y-auto",
          "transform transition-all duration-300 animate-in slide-in-from-bottom md:fade-in md:zoom-in-95"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-system-panel/95 backdrop-blur-xl border-b border-white/10 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Edit3 className="w-5 h-5 text-system-cyan" />
            <h2 className="text-xl font-display font-bold text-white uppercase tracking-wider">
              Edit Profile
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-11 h-11 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Display Name */}
          <div>
            <label htmlFor="displayName" className="text-sm text-white/60 block mb-2">
              Display Name <span className="text-system-cyan">*</span>
            </label>
            <input
              id="displayName"
              type="text"
              value={formData.displayName}
              onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
              placeholder="Hunter Name"
              maxLength={50}
              className="w-full bg-void-deep border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-system-cyan focus:outline-none transition-colors h-[44px]"
              disabled={isLoading}
            />
            <div className="flex justify-between mt-1">
              <p className="text-xs text-white/40">Required • Max 50 characters</p>
              <p className={cn(
                "text-xs font-mono",
                formData.displayName.length > 45 ? "text-status-warning" :
                formData.displayName.length > 50 ? "text-status-danger" : "text-white/40"
              )}>
                {formData.displayName.length}/50
              </p>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="bio" className="text-sm text-white/60 block mb-2">
              Bio <span className="text-white/40">(optional)</span>
            </label>
            <textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Tell the System about yourself..."
              rows={3}
              maxLength={150}
              className="w-full bg-void-deep border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-system-cyan focus:outline-none transition-colors resize-none"
              disabled={isLoading}
            />
            <div className="flex justify-between mt-1">
              <p className="text-xs text-white/40">Optional • Max 150 characters</p>
              <p className={cn(
                "text-xs font-mono",
                formData.bio.length > 135 ? "text-status-warning" :
                formData.bio.length > 150 ? "text-status-danger" : "text-white/40"
              )}>
                {formData.bio.length}/150
              </p>
            </div>
          </div>

          {/* Banner URL */}
          <div>
            <label htmlFor="bannerUrl" className="text-sm text-white/60 block mb-2">
              Banner URL <span className="text-white/40">(optional)</span>
            </label>
            <input
              id="bannerUrl"
              type="url"
              value={formData.bannerUrl}
              onChange={(e) => setFormData({ ...formData, bannerUrl: e.target.value })}
              placeholder="https://example.com/banner.jpg"
              className="w-full bg-void-deep border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-system-cyan focus:outline-none transition-colors h-[44px]"
              disabled={isLoading}
            />
            <p className="text-xs text-white/40 mt-1">
              Recommended: Aspect ratio 4:1 (1920×480)
            </p>
          </div>

          {/* Social Links Section */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h3 className="text-sm font-display font-bold text-white uppercase tracking-wider">
              Social Links <span className="text-white/40">(optional)</span>
            </h3>

            {/* Discord */}
            <div>
              <label htmlFor="discord" className="text-sm text-white/60 block mb-2">
                Discord Username
              </label>
              <input
                id="discord"
                type="text"
                value={formData.discord}
                onChange={(e) => setFormData({ ...formData, discord: e.target.value })}
                placeholder="username#0000"
                className="w-full bg-void-deep border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-system-cyan focus:outline-none transition-colors h-[44px]"
                disabled={isLoading}
              />
            </div>

            {/* Twitter */}
            <div>
              <label htmlFor="twitter" className="text-sm text-white/60 block mb-2">
                Twitter Username
              </label>
              <input
                id="twitter"
                type="text"
                value={formData.twitter}
                onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                placeholder="@username"
                className="w-full bg-void-deep border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-system-cyan focus:outline-none transition-colors h-[44px]"
                disabled={isLoading}
              />
            </div>

            {/* Steam */}
            <div>
              <label htmlFor="steam" className="text-sm text-white/60 block mb-2">
                Steam Profile URL
              </label>
              <input
                id="steam"
                type="text"
                value={formData.steam}
                onChange={(e) => setFormData({ ...formData, steam: e.target.value })}
                placeholder="https://steamcommunity.com/id/username"
                className="w-full bg-void-deep border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-system-cyan focus:outline-none transition-colors h-[44px]"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 h-[44px] rounded-lg bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaveDisabled}
              className={cn(
                "flex-1 h-[44px] rounded-lg flex items-center justify-center gap-2 font-medium transition-all",
                isSaveDisabled
                  ? "bg-white/5 text-white/40 cursor-not-allowed"
                  : "bg-system-cyan text-void-deep hover:bg-cyan-400 shadow-lg shadow-cyan-500/20"
              )}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-void-deep border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
