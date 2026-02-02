import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function ProfileMePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const username = user.user_metadata?.username;

  if (username) {
    redirect(`/profile/${username}`);
  }

  redirect("/onboarding");
}
