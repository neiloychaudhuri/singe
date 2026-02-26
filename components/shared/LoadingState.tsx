"use client";

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center gap-6 py-20">
      <div className="space-y-3 w-full max-w-sm">
        <div className="h-4 bg-zinc-800 rounded animate-pulse w-full" />
        <div className="h-4 bg-zinc-800 rounded animate-pulse w-5/6" />
        <div className="h-4 bg-zinc-800 rounded animate-pulse w-3/4" />
      </div>
      <p className="text-zinc-600 text-sm">Calculating your fate...</p>
    </div>
  );
}
