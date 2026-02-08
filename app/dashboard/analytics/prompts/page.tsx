import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { PromptVersionHistory } from "../PromptVersionHistory";
import { GitCommit } from "lucide-react";

export default async function PromptHistoryPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-void-deep p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <GitCommit className="w-8 h-8 text-blue-400" />
            <div>
              <h1 className="text-3xl font-display font-bold text-white">
                Prompt Version History
              </h1>
              <p className="text-white/60">
                Track all AI prompt changes and improvements
              </p>
            </div>
          </div>
        </div>

        <PromptVersionHistory />
      </div>
    </div>
  );
}
