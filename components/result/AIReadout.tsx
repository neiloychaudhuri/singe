"use client";

import { useEffect, useState } from "react";

interface Props {
  text: string | null;
  loading: boolean;
}

export default function AIReadout({ text, loading }: Props) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!text) {
      setDisplayed("");
      setDone(false);
      return;
    }

    let i = 0;
    setDisplayed("");
    setDone(false);

    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [text]);

  if (loading) {
    return (
      <div className="space-y-3 w-full max-w-lg">
        <div className="h-4 bg-zinc-800 rounded animate-pulse w-full" />
        <div className="h-4 bg-zinc-800 rounded animate-pulse w-5/6" />
        <div className="h-4 bg-zinc-800 rounded animate-pulse w-4/6" />
        <div className="h-4 bg-zinc-800 rounded animate-pulse w-5/6" />
      </div>
    );
  }

  if (!text) return null;

  return (
    <p className="text-zinc-300 text-lg leading-relaxed max-w-lg text-center">
      {displayed}
      {!done && (
        <span className="inline-block w-0.5 h-5 bg-orange-500 ml-0.5 animate-pulse align-text-bottom" />
      )}
    </p>
  );
}
