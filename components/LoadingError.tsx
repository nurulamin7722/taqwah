"use client";

export function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block">
          <div className="animate-spin">
            <div className="text-6xl">🌙</div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ErrorDisplayProps {
  error: string;
  retry?: () => void;
}

export function ErrorDisplay({ error, retry }: ErrorDisplayProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-semibold text-white mb-4">Error</h2>
        <p className="text-gray-400 mb-6">{error}</p>
        {retry && (
          <button
            onClick={retry}
            className="bg-accent-green hover:bg-primary-green text-slate-900 font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-accent-green/50"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
