import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { QuestExecution } from "@/components/quest/QuestExecution";
import { WorkoutPlan } from "@/types/schemas";

interface PageProps {
  params: { id: string };
}

export default async function QuestPage({ params }: PageProps) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: questData } = await supabase
    .from("quests")
    .select("*")
    .eq("id", params.id)
    .single();

  const quest = questData as any;

  if (!quest) {
    redirect("/dashboard");
  }

  // Ensure user owns the quest
  if (quest.user_id !== user.id) {
    redirect("/dashboard");
  }

  const plan = quest.plan_json as unknown as WorkoutPlan;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <QuestExecution questId={quest.id} plan={plan} />
    </div>
  );
}
