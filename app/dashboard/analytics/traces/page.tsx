import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { RealExperimentDashboard } from "../RealExperimentDashboard";
import { Database } from "lucide-react";

export default async function TraceExportPage() {
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
            <Database className="w-8 h-8 text-green-400" />
            <div>
              <h1 className="text-3xl font-display font-bold text-white">
                Opik Trace Export
              </h1>
              <p className="text-white/60">
                Export and share AI trace data from Opik dashboard
              </p>
            </div>
          </div>
        </div>

        <RealExperimentDashboard />
      </div>
    </div>
  );
}
