"use client";

import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="w-full flex items-center justify-center relative px-6 py-4 border-b border-zinc-800/50">
      <Link
        href="/"
        className="text-zinc-100 font-black text-lg tracking-[0.2em] uppercase hover:text-yellow-300 transition-colors"
      >
        SINGE
      </Link>
      <Link
        href="/leaderboard"
        className="absolute right-6 text-zinc-500 hover:text-zinc-300 text-sm font-medium transition-colors"
      >
        Leaderboard
      </Link>
    </nav>
  );
}
