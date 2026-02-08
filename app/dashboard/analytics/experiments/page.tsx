import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ExperimentDashboard } from "../ExperimentDashboard";

export default async function ExperimentsPage() {
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
            <FlaskConical className="w-8 h-8 text-purple-400" />
            <div>
              <h1 className="text-3xl font-display font-bold text-white">
                AI Experiments
              </h1>
              <p className="text-white/60">
                A/B Testing, Prompt Optimization, and Model Comparisons
              </p>
            </div>
          </div>
        </div>

        <ExperimentDashboard />
      </div>
    </div>
  );
}

function FlaskConical({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 2v7.31" />
      <path d="M14 2v7.31" />
      <path d="M8.5 2h7" />
      <path d="M14 9.3a6.5 6.5 0 1 0-4 0" />
      <path d="M5.52 16h12.96" />
      <path d="M3.87 18h16.26" />
    </svg>
  );
}
