"use client";

import { useState, useEffect } from "react";
import { Bell, Check, X, User, Trophy, Zap, Users } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils/cn";
import {
  markNotificationAsRead,
  markAllAsRead,
  deleteNotification,
  getNotifications,
  getUnreadCount
} from "@/server/actions/notification-actions";
import { useRouter } from "next/navigation";

type NotificationType = 
  | "friend_request" 
  | "friend_accepted" 
  | "level_up" 
  | "rank_up" 
  | "quest_reminder" 
  | "guild_invite"
  | "achievement_unlocked";

const notificationConfig: Record<NotificationType, { icon: any; color: string }> = {
  friend_request: { icon: User, color: "text-system-cyan" },
  friend_accepted: { icon: Users, color: "text-status-success" },
  level_up: { icon: Zap, color: "text-status-warning" },
  rank_up: { icon: Trophy, color: "text-rank-s" },
  quest_reminder: { icon: Bell, color: "text-white/80" },
  guild_invite: { icon: Users, color: "text-status-success" },
  achievement_unlocked: { icon: Trophy, color: "text-rank-s" },
};

export default function NotificationsPage() {
  const router = useRouter();
  const supabase = createClient();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    const notifs = await getNotifications();
    setNotifications(notifs);
    const unread = await getUnreadCount();
    setUnreadCount(unread);
    setLoading(false);
  };

  const handleMarkAsRead = async (notificationId: string) => {
    const result = await markNotificationAsRead(notificationId);
    if (result.error) {
      toast.error(result.error);
    } else {
      loadNotifications();
    }
  };

  const handleMarkAllAsRead = async () => {
    const result = await markAllAsRead();
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("All notifications marked as read");
      loadNotifications();
    }
  };

  const handleDelete = async (notificationId: string) => {
    const result = await deleteNotification(notificationId);
    if (result.error) {
      toast.error(result.error);
    } else {
      loadNotifications();
    }
  };

  const handleNotificationClick = async (notification: any) => {
    if (!notification.read) {
      await handleMarkAsRead(notification.id);
    }
    
    if (notification.link) {
      router.push(notification.link);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-white uppercase tracking-wider">
            Notifications
          </h1>
          <p className="text-white/60">
            Stay updated on your journey
          </p>
        </div>
        {unreadCount > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/60">{unreadCount} unread</span>
            <button
              onClick={handleMarkAllAsRead}
              className="px-3 py-1 text-xs font-medium bg-system-cyan text-void-deep rounded-lg hover:bg-system-cyan/90 transition-colors"
            >
              Mark All Read
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <div className="text-center py-12 text-white/60">Loading...</div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
          <Bell className="w-12 h-12 text-white/40 mx-auto mb-4" />
          <p className="text-white/60 font-display text-lg mb-2">No notifications</p>
          <p className="text-white/40 text-sm">
            You're all caught up, Hunter!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification: any) => {
            const config = notificationConfig[notification.type as NotificationType] || notificationConfig.friend_request;
            const Icon = config.icon;
            const isNew = !notification.read;

            return (
              <div
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className={cn(
                  "flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer",
                  isNew 
                    ? "bg-system-cyan/10 border-system-cyan/30 hover:bg-system-cyan/20" 
                    : "bg-system-panel border-white/10 hover:border-white/20"
                )}
              >
                <div className={cn(
                  "p-2 rounded-lg flex-shrink-0",
                  isNew ? "bg-system-cyan" : "bg-white/10"
                )}>
                  <Icon className={cn("w-5 h-5", isNew ? "text-void-deep" : config.color)} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className={cn(
                        "font-medium mb-1",
                        isNew ? "text-white" : "text-white/80"
                      )}>
                        {notification.title}
                      </div>
                      {notification.message && (
                        <div className="text-sm text-white/60 line-clamp-2">
                          {notification.message}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {isNew && (
                        <span className="w-2 h-2 rounded-full bg-system-cyan animate-pulse" />
                      )}
                      <span className="text-xs text-white/40 whitespace-nowrap">
                        {new Date(notification.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(notification.id);
                  }}
                  className="flex-shrink-0 p-2 text-white/40 hover:text-status-danger hover:bg-status-danger/10 rounded-lg transition-colors"
                  title="Delete notification"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
