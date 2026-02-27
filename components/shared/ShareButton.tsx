"use client";

import { useState } from "react";
import {
  downloadCard,
  copyCardToClipboard,
  shareCard,
  renderCardToBlob,
} from "@/lib/exportCard";
import { posthog } from "@/lib/posthog";

interface Props {
  score: number;
  tierLabel: string;
}

export default function ShareButton({ score, tierLabel }: Props) {
  const [format, setFormat] = useState<"square" | "story">("square");
  const [busy, setBusy] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const elementId = `export-card-${format}`;
  const shareText = `I scored ${score}/100 on Singe — ${tierLabel}. How cooked are you?`;
  const siteUrl = "https://getsinged.vercel.app";

  const handleDownload = async () => {
    setBusy("download");
    try {
      await downloadCard(elementId, `singe-${format}`);
      posthog.capture("card_exported", { format, method: "download" });
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setBusy(null);
    }
  };

  const handleCopy = async () => {
    setBusy("copy");
    try {
      const ok = await copyCardToClipboard(elementId);
      if (ok) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        posthog.capture("card_exported", { format, method: "copy" });
      }
    } catch (err) {
      console.error("Copy failed:", err);
    } finally {
      setBusy(null);
    }
  };

  const handleTweet = async () => {
    setBusy("tweet");
    try {
      const blob = await renderCardToBlob(elementId);
      if (blob) {
        const file = new File([blob], "singe-score.png", { type: "image/png" });
        const tweetText = `${shareText}\n\n${siteUrl}`;

        if (navigator.share && navigator.canShare?.({ files: [file] })) {
          await navigator.share({ text: tweetText, files: [file] });
          posthog.capture("card_exported", { format, method: "tweet_share" });
          setBusy(null);
          return;
        }

        await downloadCard(elementId, `singe-${format}`);
      }
      posthog.capture("card_exported", { format, method: "tweet" });
    } catch (err) {
      console.error("Tweet share failed:", err);
    } finally {
      setBusy(null);
    }
    const tweetUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(
      `${shareText}\n\n${siteUrl}`
    )}`;
    window.open(tweetUrl, "_blank", "noopener,noreferrer");
  };

  const handleSMS = async () => {
    setBusy("sms");
    try {
      await downloadCard(elementId, `singe-${format}`);
      posthog.capture("card_exported", { format, method: "sms" });
    } catch (err) {
      console.error("Download for SMS failed:", err);
    } finally {
      setBusy(null);
    }
    const body = encodeURIComponent(`${shareText} ${siteUrl}`);
    window.open(`sms:?&body=${body}`, "_self");
  };

  const handleNativeShare = async () => {
    setBusy("share");
    try {
      const ok = await shareCard(elementId, `${shareText}\n${siteUrl}`);
      if (ok) {
        posthog.capture("card_exported", { format, method: "native_share" });
      } else {
        await downloadCard(elementId, `singe-${format}`);
        posthog.capture("card_exported", { format, method: "download_fallback" });
      }
    } catch (err) {
      console.error("Share failed:", err);
    } finally {
      setBusy(null);
    }
  };

  const supportsNativeShare =
    typeof navigator !== "undefined" && !!navigator.share;

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm">
      <div className="flex gap-2">
        <button
          onClick={() => setFormat("square")}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
            format === "square"
              ? "bg-zinc-100 text-zinc-950"
              : "bg-zinc-800 text-zinc-400 hover:text-zinc-300"
          }`}
        >
          Square
        </button>
        <button
          onClick={() => setFormat("story")}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
            format === "story"
              ? "bg-zinc-100 text-zinc-950"
              : "bg-zinc-800 text-zinc-400 hover:text-zinc-300"
          }`}
        >
          Story
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 w-full">
        <button
          onClick={handleDownload}
          disabled={!!busy}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 text-black font-bold rounded-lg transition-colors text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          {busy === "download" ? "Saving..." : "Save"}
        </button>

        <button
          onClick={handleCopy}
          disabled={!!busy}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-zinc-100 font-bold rounded-lg transition-colors text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          {copied ? "Copied!" : busy === "copy" ? "Copying..." : "Copy"}
        </button>

        <button
          onClick={handleTweet}
          disabled={!!busy}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-zinc-100 font-bold rounded-lg transition-colors text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          {busy === "tweet" ? "Opening..." : "Tweet"}
        </button>

        {supportsNativeShare ? (
          <button
            onClick={handleNativeShare}
            disabled={!!busy}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-zinc-100 font-bold rounded-lg transition-colors text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            {busy === "share" ? "Sharing..." : "Share"}
          </button>
        ) : (
          <button
            onClick={handleSMS}
            disabled={!!busy}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-zinc-100 font-bold rounded-lg transition-colors text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            {busy === "sms" ? "Opening..." : "Text"}
          </button>
        )}
      </div>
    </div>
  );
}
