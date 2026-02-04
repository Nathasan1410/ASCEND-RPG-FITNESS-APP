import { getPublicProfile } from "@/server/actions/match-history-actions";
import { getUserAchievements, getFriendPreviews } from "@/server/actions/profile-actions";
import { notFound } from "next/navigation";
import ProfileClient from "./ProfileClient";
import { createClient } from "@/lib/supabase/server";

interface ProfilePageProps {
  params: { username: string };
}

export default async function PublicProfilePage({ params }: ProfilePageProps) {
  const decodedUsername = decodeURIComponent(params.username);
  const data = await getPublicProfile(decodedUsername);
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!data) {
    notFound();
  }

  const [achievements, friends] = await Promise.all([
    getUserAchievements(data.profile.id),
    getFriendPreviews(data.profile.id),
  ]);

  const isOwnProfile = user?.id === data.profile.id;

  return (
    <ProfileClient
      initialData={data}
      achievements={achievements}
      friends={friends}
      isOwnProfile={isOwnProfile}
    />
  );
}
