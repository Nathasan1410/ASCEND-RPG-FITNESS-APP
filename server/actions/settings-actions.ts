"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateProfileSettings(data: {
  bio?: string;
  display_name?: string;
  banner_url?: string;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const updateData: Record<string, any> = {};
  if (data.bio !== undefined) updateData.bio = data.bio;
  if (data.display_name !== undefined) updateData.display_name = data.display_name;
  if (data.banner_url !== undefined) updateData.banner_url = data.banner_url;

  const { error } = await (supabase.from("profiles") as any)
    .update(updateData)
    .eq("id", user.id);

  if (error) throw error;

  revalidatePath("/settings");
  revalidatePath(`/profile/${user.user_metadata?.username}`);
  return { success: true };
}

export async function updateEquipment(equipment: string[]) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { error } = await (supabase.from("profiles") as any)
    .update({ equipment })
    .eq("id", user.id);

  if (error) throw error;

  revalidatePath("/settings");
  return { success: true };
}

export async function changeUserClass(newClass: "Novice" | "Striker" | "Tank" | "Assassin") {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data: profileData } = await supabase
    .from("profiles")
    .select("total_xp")
    .eq("id", user.id)
    .single();

  if (!profileData) throw new Error("Profile not found");

  const profile = profileData as any;

  const newTotalXp = Math.floor((profile.total_xp || 0) * 0.5);

  const { error } = await (supabase.from("profiles") as any)
    .update({
      class: newClass,
      total_xp: newTotalXp,
    })
    .eq("id", user.id);

  if (error) throw error;

  revalidatePath("/settings");
  revalidatePath("/dashboard");
  return { success: true, newTotalXp };
}

export async function resetAllProgress() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { error } = await (supabase.from("profiles") as any)
    .update({
      level: 1,
      current_xp: 0,
      total_xp: 0,
      rank_tier: "E-Rank",
      class: "Novice",
      stats_strength: 10,
      stats_agility: 10,
      stats_stamina: 10,
      streak_current: 0,
    })
    .eq("id", user.id);

  if (error) throw error;

  revalidatePath("/dashboard");
  revalidatePath("/settings");
  return { success: true };
}

export async function deleteAccount() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id);

  if (deleteError) throw deleteError;

  return { success: true };
}
