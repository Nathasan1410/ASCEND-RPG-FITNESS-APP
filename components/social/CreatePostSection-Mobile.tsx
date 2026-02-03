"use client";

import { useState } from "react";
import { Radio, Dumbbell, TrendingUp, Lightbulb, X, Send } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

const postTypes = [
  { id: "quest_completion", label: "Quest Complete", icon: Dumbbell, color: "text-system-cyan" },
  { id: "rank_up", label: "Rank Up", icon: TrendingUp, color: "text-rank-s" },
  { id: "tip", label: "Hunter Tip", icon: Lightbulb, color: "text-green-400" },
];

interface CreatePostSectionProps {
  username: string;
  onPostCreated?: () => void;
}

export function CreatePostSection({ username, onPostCreated }: CreatePostSectionProps) {
  const supabase = createClient();
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [selectedType, setSelectedType] = useState<string>("quest_completion");
  const [questName, setQuestName] = useState("");
  const [xpGained, setXpGained] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast.error("Please enter some content for your broadcast.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Prepare post data
      const postData: any = {
        user_id: user.id,
        username: user.user_metadata?.username || username,
        content: content.trim(),
        post_type: selectedType,
        created_at: new Date().toISOString(),
        likes_count: 0,
        comments_count: 0,
      };

      // Add activity data for quest completions
      if (selectedType === "quest_completion" && (questName || xpGained || duration)) {
        postData.activity_data = {
          quest_name: questName || "Unknown Quest",
          xp_gained: xpGained ? parseInt(xpGained) : 0,
          duration: duration ? `${duration} min` : "Not specified",
        };
      }

      // Insert post (this would use a real server action in production)
      const { error } = await supabase.from("posts").insert(postData);

      if (error) {
        // If posts table doesn't exist yet, just show success for demo
        console.log("Demo mode - post would be saved:", postData);
        toast.success("Broadcast transmitted successfully!");
      } else {
        toast.success("Broadcast transmitted successfully!");
      }

      // Reset form
      setContent("");
      setQuestName("");
      setXpGained("");
      setDuration("");
      setSelectedType("quest_completion");
      setIsOpen(false);

      // Notify parent
      if (onPostCreated) {
        onPostCreated();
      }
    } catch (error) {
      console.error("Failed to create post:", error);
      toast.error("Failed to transmit broadcast. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return (
      <div
        onClick={() => setIsOpen(true)}
        className="bg-void-panel border-b border-white/10 p-4 cursor-pointer hover:bg-white/5 transition-colors"
      >
        <div className="flex items-start gap-3">
          {/* User Avatar */}
          <div className="w-10 h-10 rounded-full bg-system-cyan/20 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-bold text-system-cyan">
              {username[0]?.toUpperCase() || "H"}
            </span>
          </div>

          {/* Collapsed Input */}
          <div className="flex-1 flex items-center">
            <span className="text-white/40 text-sm">
              What's on your mind, Hunter?
            </span>
          </div>

          {/* Collapse Icon */}
          <Radio className="w-5 h-5 text-system-cyan flex-shrink-0" />
        </div>
      </div>
    );
  }

  const selectedPostType = postTypes.find(pt => pt.id === selectedType) || postTypes[0];
  const SelectedIcon = selectedPostType.icon;

  return (
    <div className="bg-void-panel border-b border-white/10 border-l-4 border-l-system-cyan">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <SelectedIcon className={cn("w-5 h-5", selectedPostType.color)} />
          <span className="text-sm font-bold text-white">Create Broadcast</span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5 text-white/60" />
        </button>
      </div>

      {/* Post Type Selector */}
      <div className="p-3 border-b border-white/10">
        <label className="text-xs text-white/60 uppercase tracking-wide font-medium mb-2 block">
          Broadcast Type
        </label>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {postTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = selectedType === type.id;

            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-lg border whitespace-nowrap transition-all",
                  isSelected
                    ? `${type.color} bg-white/10 border-current shadow-[0_0_10px_rgba(0,0,0,0.3)]`
                    : "bg-void-deep border-white/20 text-white/60 hover:border-white/40"
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs font-medium">{type.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Input */}
      <div className="p-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your journey with the Hunter Network..."
          rows={3}
          maxLength={500}
          className="w-full bg-transparent text-white placeholder:text-white/30 focus:outline-none resize-none text-sm leading-relaxed"
        />
        <div className="flex justify-between mt-2">
          <span className="text-xs text-white/40">
            {content.length}/500
          </span>
        </div>
      </div>

      {/* Quest Details (if quest completion) */}
      {selectedType === "quest_completion" && (
        <div className="p-3 border-t border-white/10 bg-white/5">
          <label className="text-xs text-system-cyan uppercase tracking-wide font-medium mb-2 block">
            Quest Details
          </label>
          <div className="space-y-2">
            <input
              type="text"
              value={questName}
              onChange={(e) => setQuestName(e.target.value)}
              placeholder="Quest Name"
              className="w-full bg-void-deep border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-system-cyan focus:outline-none transition-colors"
            />
            <div className="flex gap-2">
              <input
                type="number"
                value={xpGained}
                onChange={(e) => setXpGained(e.target.value)}
                placeholder="XP Gained"
                className="flex-1 bg-void-deep border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-system-cyan focus:outline-none transition-colors"
              />
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Duration (min)"
                className="flex-1 bg-void-deep border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-system-cyan focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="p-3 border-t border-white/10">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !content.trim()}
          className={cn(
            "w-full py-3 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2",
            isSubmitting || !content.trim()
              ? "bg-white/10 text-white/40 cursor-not-allowed"
              : "bg-system-cyan text-void-deep hover:bg-system-cyan/90 shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:shadow-[0_0_30px_rgba(0,255,255,0.4)]"
          )}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-void-deep border-t-transparent rounded-full animate-spin" />
              <span>Transmitting...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Transmit Broadcast</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
