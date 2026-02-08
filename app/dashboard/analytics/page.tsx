import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AnalyticsDashboard } from "./AnalyticsDashboard";
import { BarChart3, Activity, TrendingUp, AlertCircle } from "lucide-react";

export default async function AnalyticsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Fetch user stats
  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: questsData } = await supabase
    .from("quests")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(100);

  const { data: logsData } = await supabase
    .from("logs")
    .select("*")
    .eq("user_id", user.id)
    .order("completed_at", { ascending: false })
    .limit(50);

  return (
    <div className="min-h-screen bg-void-deep p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-8 h-8 text-system-cyan" />
            <div>
              <h1 className="text-3xl font-display font-bold text-white">
                AI Performance Dashboard
              </h1>
              <p className="text-white/60">
                Opik AI Observability & Analytics
              </p>
            </div>
          </div>
        </div>

        <AnalyticsDashboard 
          profile={profileData as any}
          quests={questsData || []}
          logs={logsData || []}
        />
      </div>
    </div>
  );
}
