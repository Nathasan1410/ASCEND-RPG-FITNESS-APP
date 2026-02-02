"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function sendFriendRequest(targetUsername: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { error: "Not authenticated" };
  }

  const username = user.user_metadata?.username;
  
  if (!username) {
    return { error: "No username set" };
  }

  if (username.toLowerCase() === targetUsername.toLowerCase()) {
    return { error: "Cannot add yourself" };
  }

  const { data: targetProfile } = await (supabase.from("profiles") as any)
    .select("id, username")
    .eq("username", targetUsername)
    .single();

  if (!targetProfile) {
    return { error: "User not found" };
  }

  const allowRequests = (targetProfile as any).allow_friend_requests !== false;

  const { error: existingRequest } = await (supabase.from("friends") as any)
    .select("*")
    .or(`and(user_id.eq.${user.id},friend_id.eq.${targetProfile.id}),and(user_id.eq.${targetProfile.id},friend_id.eq.${user.id})`)
    .maybeSingle();

  if (existingRequest) {
    return { error: "Already connected" };
  }

  const { error } = await (supabase.from("friends") as any)
    .insert({
      user_id: user.id,
      friend_id: targetProfile.id,
      status: "pending",
    });

  if (error) {
    return { error: "Failed to send request" };
  }

  return { success: true };
}

export async function acceptFriendRequest(friendId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { error: "Not authenticated" };
  }

  const { data: request } = await (supabase.from("friends") as any)
    .select("*")
    .eq("user_id", friendId)
    .eq("friend_id", user.id)
    .eq("status", "pending")
    .single();

  if (!request) {
    return { error: "Request not found" };
  }

  const requestId = (request as any).id;

  const { error } = await (supabase.from("friends") as any)
    .update({ status: "accepted" })
    .eq("id", requestId);

  if (error) {
    return { error: "Failed to accept request" };
  }

  revalidatePath("/friends");
  revalidatePath("/notifications");
  return { success: true };
}

export async function declineFriendRequest(friendId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { error: "Not authenticated" };
  }

  const { data: request } = await (supabase.from("friends") as any)
    .select("*")
    .eq("user_id", friendId)
    .eq("friend_id", user.id)
    .eq("status", "pending")
    .single();

  if (!request) {
    return { error: "Request not found" };
  }

  const requestId = (request as any).id;

  const { error } = await (supabase.from("friends") as any)
    .delete()
    .eq("id", requestId);

  if (error) {
    return { error: "Failed to decline request" };
  }

  revalidatePath("/friends");
  revalidatePath("/notifications");
  return { success: true };
}

export async function removeFriend(friendId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { error: "Not authenticated" };
  }

  const { error } = await (supabase.from("friends") as any)
    .delete()
    .or(`and(user_id.eq.${user.id},friend_id.eq.${friendId}),and(user_id.eq.${friendId},friend_id.eq.${user.id})`);

  if (error) {
    return { error: "Failed to remove friend" };
  }

  revalidatePath("/friends");
  return { success: true };
}

export async function getFriends() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return [];
  }

  const { data: friends } = await (supabase.from("friends") as any)
    .select("*, profiles!friend_id(*), profiles!user_id(*)")
    .or(`user_id.eq.${user.id},friend_id.eq.${user.id}`)
    .eq("status", "accepted");

  return friends || [];
}

export async function getFriendRequests() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return [];
  }

  const { data: requests } = await (supabase.from("friends") as any)
    .select("*, profiles!user_id(*)")
    .eq("friend_id", user.id)
    .eq("status", "pending");

  return requests || [];
}

export async function searchUsers(query: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return [];
  }

  const username = user.user_metadata?.username;

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, username, rank_tier, level, class")
    .ilike("username", `%${query}%`)
    .neq("username", username)
    .limit(10);

  return profiles || [];
}
