"use client";

import Link from "next/link";

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

const CoffeeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
    <line x1="6" x2="6" y1="2" y2="4" />
    <line x1="10" x2="10" y1="2" y2="4" />
    <line x1="14" x2="14" y1="2" y2="4" />
  </svg>
);

export default function NavBar() {
  return (
    <nav className="w-full flex items-center justify-between px-4 sm:px-6 py-4 border-b border-zinc-800/50">
      <Link
        href="/"
        className="text-zinc-400 text-sm font-medium hover:underline underline-offset-4 decoration-yellow-400 transition-all shrink-0"
      >
        <span className="text-zinc-100 font-bold">singe</span>
        <span className="text-zinc-600 hidden sm:inline"> — </span>
        <span className="hidden sm:inline">made by neiloy chaudhuri</span>
      </Link>

      <div className="flex items-center gap-3 sm:gap-4">
        <a
          href="https://x.com/_neiloy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-600 hover:text-zinc-300 transition-colors"
          aria-label="Twitter"
        >
          <span className="sm:hidden"><XIcon /></span>
          <span className="hidden sm:inline text-sm">twitter</span>
        </a>
        <a
          href="https://neiloy.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-600 hover:text-zinc-300 transition-colors"
          aria-label="Website"
        >
          <span className="sm:hidden"><GlobeIcon /></span>
          <span className="hidden sm:inline text-sm">website</span>
        </a>
        <a
          href="https://buymeacoffee.com/neiloy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-600 hover:text-yellow-400 transition-colors"
          aria-label="Buy me a coffee"
        >
          <span className="sm:hidden"><CoffeeIcon /></span>
          <span className="hidden sm:inline text-sm">buy me a coffee</span>
        </a>
        <Link
          href="/leaderboard"
          className="text-zinc-600 hover:text-zinc-300 text-sm transition-colors"
        >
          <span className="sm:hidden">lb</span>
          <span className="hidden sm:inline">leaderboard</span>
        </Link>
      </div>
    </nav>
  );
}
