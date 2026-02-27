"use client";

import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 border-b border-zinc-800/50">
      <Link
        href="/"
        className="text-zinc-400 text-sm font-medium hover:underline underline-offset-4 decoration-yellow-400 transition-all"
      >
        <span className="text-zinc-100 font-bold">singe</span>
        <span className="text-zinc-600"> — </span>
        <span>made by neiloy chaudhuri</span>
      </Link>

      <div className="flex items-center gap-4">
        <a
          href="https://x.com/_neiloy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-600 hover:text-zinc-300 text-sm transition-colors"
        >
          twitter
        </a>
        <a
          href="https://neiloy.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-600 hover:text-zinc-300 text-sm transition-colors"
        >
          website
        </a>
        <a
          href="https://buymeacoffee.com/neiloy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-600 hover:text-yellow-400 text-sm transition-colors"
        >
          buy me a coffee
        </a>
        <Link
          href="/leaderboard"
          className="text-zinc-600 hover:text-zinc-300 text-sm transition-colors"
        >
          leaderboard
        </Link>
      </div>
    </nav>
  );
}
