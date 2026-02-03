"use client";

export default function ServerError() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl mb-4">500</div>
        <h1 className="text-3xl font-bold text-white mb-4">
          Server Error
        </h1>
        <p className="text-white/70 mb-8">
          An unexpected error occurred. Please try again later or return to the dashboard.
        </p>
        <a
          href="/dashboard"
          className="inline-block px-6 py-3 bg-system-accent text-black font-bold rounded-lg hover:bg-system-accent/90 transition-colors"
        >
          Return to Dashboard
        </a>
      </div>
    </div>
  );
}
