"use client";

import { useEffect, useState } from "react";

const LOADING_MESSAGES = [
  "Wise words are loading...",
  "Your future is about to unfold...",
  "The truth will now be revealed...",
  "Twin get ready...",
];

interface Props {
  text: string | null;
  loading: boolean;
}

export default function AIReadout({ text, loading }: Props) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setMsgIndex((i) => (i + 1) % LOADING_MESSAGES.length);
        setVisible(true);
      }, 300);
    }, 2200);
    return () => clearInterval(interval);
  }, [loading]);

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
      <p
        className="text-zinc-500 text-base italic text-center transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {LOADING_MESSAGES[msgIndex]}
      </p>
    );
  }

  if (!text) return null;

  return (
    <p className="text-zinc-300 text-lg leading-relaxed max-w-lg text-center">
      {displayed}
      {!done && (
        <span className="inline-block w-0.5 h-5 bg-yellow-400 ml-0.5 animate-pulse align-text-bottom" />
      )}
    </p>
  );
}
