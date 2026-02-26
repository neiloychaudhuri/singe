"use client";

import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 border-b border-zinc-800/50">
      <Link
        href="/"
        className="text-zinc-100 font-black text-lg tracking-[0.2em] uppercase hover:text-orange-400 transition-colors"
      >
        SINGE
      </Link>
      <Link
        href="/leaderboard"
        className="text-zinc-500 hover:text-zinc-300 text-sm font-medium transition-colors"
      >
        Leaderboard
      </Link>
    </nav>
  );
}
