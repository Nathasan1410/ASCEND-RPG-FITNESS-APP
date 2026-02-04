import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function ProfileMePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, onboarding_done")
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect("/onboarding");
  }

  const username = (profile as any).username;
  const onboardingDone = (profile as any).onboarding_done;

  if (!onboardingDone) {
    redirect("/onboarding");
  }

  if (username) {
    redirect(`/profile/${username}`);
  }

  redirect("/onboarding");
}
