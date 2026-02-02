"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

type NotificationType = 
  | "friend_request" 
  | "friend_accepted" 
  | "level_up" 
  | "rank_up" 
  | "quest_reminder" 
  | "guild_invite"
  | "achievement_unlocked";

export async function createNotification(data: {
  userId: string;
  type: NotificationType;
  title: string;
  message?: string;
  link?: string;
}) {
  const supabase = await createClient();

  const { error } = await (supabase.from("notifications") as any)
    .insert({
      user_id: data.userId,
      type: data.type,
      title: data.title,
      message: data.message,
      link: data.link,
      read: false,
    });

  if (error) {
    return { error: "Failed to create notification" };
  }

  return { success: true };
}

export async function markNotificationAsRead(notificationId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { error: "Not authenticated" };
  }

  const { error } = await (supabase.from("notifications") as any)
    .update({ read: true })
    .eq("id", notificationId)
    .eq("user_id", user.id);

  if (error) {
    return { error: "Failed to mark as read" };
  }

  revalidatePath("/notifications");
  return { success: true };
}

export async function markAllAsRead() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { error: "Not authenticated" };
  }

  const { error } = await (supabase.from("notifications") as any)
    .update({ read: true })
    .eq("user_id", user.id)
    .eq("read", false);

  if (error) {
    return { error: "Failed to mark all as read" };
  }

  revalidatePath("/notifications");
  return { success: true };
}

export async function deleteNotification(notificationId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { error: "Not authenticated" };
  }

  const { error } = await (supabase.from("notifications") as any)
    .delete()
    .eq("id", notificationId)
    .eq("user_id", user.id);

  if (error) {
    return { error: "Failed to delete notification" };
  }

  revalidatePath("/notifications");
  return { success: true };
}

export async function getNotifications() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return [];
  }

  const { data: notifications } = await (supabase.from("notifications") as any)
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(50);

  return notifications || [];
}

export async function getUnreadCount() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return 0;
  }

  const { data: result } = await (supabase.from("notifications") as any)
    .select("id", { count: "exact" })
    .eq("user_id", user.id)
    .eq("read", false);

  return result?.[0]?.count || 0;
}
