"use client";

import { useState } from "react";
import { X, Upload, Image as FileText, AtSign, Video, Lock, Zap, Plus } from "lucide-react";
import type { CreatePostData } from "@/types/social";
import { createPost } from "@/server/actions/social-actions";
import { SystemButton } from "@/components/ui/SystemButton";
import { cn } from "@/lib/utils/cn";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
  const [postType, setPostType] = useState<"quest_completion" | "rank_up" | "level_up" | "achievement" | "tip">("quest_completion");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const postTypes = [
    { type: "quest_completion", label: "Quest Completion", icon: X, iconColor: "text-rank-b" },
    { type: "rank_up", label: "Rank Up", icon: Upload, iconColor: "text-rank-s" },
    { type: "level_up", label: "Level Up", icon: Zap, iconColor: "text-rank-a" },
    { type: "achievement", label: "Achievement", icon: Lock, iconColor: "text-rank-ss" },
    { type: "tip", label: "Hunter Tip", icon: FileText, iconColor: "text-rank-c" },
  ];

  const handleSubmit = async () => {
    const data: CreatePostData = {
      post_type: postType,
      title,
      body,
      tags: tags.length > 0 ? tags : [],
      proof_media_url: null,
      proof_type: "None",
      quest_id: null,
    };

    try {
      await createPost(data);
      onClose();
      setTitle("");
      setBody("");
      setTags([]);
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div
        className="w-full max-w-lg bg-system-panel border border-white/20 rounded-2xl overflow-hidden"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white uppercase tracking-wider">
              New Hunter Broadcast
            </h2>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div>
            <p className="text-sm text-white/60 mb-4">
              Share your progress with the Hunter Network!
            </p>
          </div>

          <div>
            <label className="text-sm text-white/70 uppercase tracking-wide mb-2">
              Broadcast Type
            </label>
            <div className="flex flex-wrap gap-2">
              {postTypes.map((type) => (
                <button
                  key={type.type}
                  onClick={() => setPostType(type.type as any)}
                  className={cn(
                    "flex-1 px-3 py-3 rounded-lg transition-all",
                    postType === type.type
                      ? "bg-system-cyan text-void-deep border-system-cyan"
                      : "bg-void-deep border-white/20 text-white/70 hover:border-white/40"
                  )}
                >
                  <type.icon className="w-5 h-5" />
                  <span className="text-sm">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm text-white/70 uppercase tracking-wide mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter broadcast title..."
              className="w-full bg-void-deep border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40"
              maxLength={100}
            />
          </div>

          <div>
            <label className="text-sm text-white/70 uppercase tracking-wide mb-2">
              Content
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="What's on your mind?"
              rows={4}
              className="w-full bg-void-deep border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 resize-none"
              maxLength={500}
            />
          </div>

          <div>
            <label className="text-sm text-white/70 uppercase tracking-wide mb-2">
              Hunter Tags (optional)
            </label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && tagInput.trim()) {
                      addTag();
                    }
                  }}
                  placeholder="Add tag (e.g., #TankBuild)"
                  className="flex-1 bg-void-deep border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40"
                />
                <button
                  onClick={addTag}
                  disabled={!tagInput.trim()}
                  className="bg-system-cyan text-void-deep px-3 py-2 rounded-lg hover:bg-system-cyan/90 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <div
                      key={tag}
                      className="bg-void-deep border border-white/20 rounded-lg px-3 py-2 text-white/70 flex items-center gap-2"
                    >
                      <span>#{tag}</span>
                      <button
                        onClick={() => removeTag(tag)}
                        className="text-status-danger hover:bg-status-danger/10 ml-2"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <SystemButton onClick={handleSubmit} glow disabled={!title.trim()}>
              Broadcast to Network
            </SystemButton>
          </div>
        </div>
      </div>
    </div>
  );
}
