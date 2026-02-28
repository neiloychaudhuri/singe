"use client";

import { useState } from "react";
import { downloadCard, renderCardToBlob } from "@/lib/exportCard";
import { posthog } from "@/lib/posthog";
import { FormInputs } from "@/types";

interface Props {
  score: number;
  tierLabel: string;
  inputs?: FormInputs;
}

export default function ShareButton({ score, tierLabel, inputs }: Props) {
  const [format, setFormat] = useState<"square" | "story">("square");
  const [busy, setBusy] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [toastKey, setToastKey] = useState(0);

  const elementId = `export-card-${format}`;
  const siteUrl = "https://getsinged.vercel.app";
  const shareText = `I scored ${score}/100 on Singe — ${tierLabel}. How cooked are you?`;

  // Emoji text fallback used when the image card can't be rendered
  const statsFallbackText = inputs
    ? [
        `😴 ${inputs.sleepHours === 12 ? "12+" : inputs.sleepHours}h sleep`,
        `☕ ${inputs.coffees} coffee${inputs.coffees !== 1 ? "s" : ""}`,
        `💻 ${inputs.tabs} tabs`,
        `⏰ ${inputs.hoursToDeadline}h to deadline`,
        `🌿 ${inputs.hoursSinceGrass}h no grass`,
      ].join(" • ") +
      `\n🔥 ${score}/100 — ${tierLabel}. How cooked are you?\n${siteUrl}`
    : `${shareText}\n${siteUrl}`;

  function showToast(msg: string) {
    setToast(msg);
    setToastKey((k) => k + 1);
    setTimeout(() => setToast(null), 2000);
  }

  /** Renders the card blob and creates a shareable File, or returns null on failure */
  async function getCardFile(): Promise<File | null> {
    try {
      const blob = await renderCardToBlob(elementId);
      if (!blob) return null;
      return new File([blob], "singe-score.png", { type: "image/png" });
    } catch {
      return null;
    }
  }

  const handleSave = async () => {
    setBusy("download");
    try {
      const file = await getCardFile();
      if (!file) throw new Error("No card");
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: "My Singe Score" });
        posthog.capture("card_exported", { format, method: "save_to_photos" });
      } else {
        await downloadCard(elementId, `singe-${format}`);
        posthog.capture("card_exported", { format, method: "download" });
      }
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setBusy(null);
    }
  };

  const handleCopy = async () => {
    setBusy("copy");
    try {
      const blob = await renderCardToBlob(elementId);
      if (!blob) throw new Error("No blob");

      // Try image clipboard first (Safari 16.4+, desktop Chrome)
      let ok = false;
      try {
        await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
        ok = true;
      } catch {
        // Image clipboard not available — fall back to text
      }

      if (!ok) {
        // Write stats text as plain text fallback; still nothing opens
        await navigator.clipboard.writeText(statsFallbackText);
      }

      showToast("Copied to clipboard");
      posthog.capture("card_exported", { format, method: ok ? "copy_image" : "copy_text" });
    } catch (err) {
      console.error("Copy failed:", err);
    } finally {
      setBusy(null);
    }
  };

  const handleTweet = async () => {
    setBusy("tweet");
    const tweetText = `${shareText}\n\n${siteUrl}`;
    const twitterWebUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    posthog.capture("card_exported", { format, method: isMobile ? "tweet_mobile" : "tweet" });

    if (isMobile) {
      const twitterAppUrl = `twitter://post?message=${encodeURIComponent(tweetText)}`;

      // If the Twitter app opens the browser goes to background — cancel the web fallback
      const fallbackTimer = setTimeout(() => {
        window.open(twitterWebUrl, "_blank", "noopener,noreferrer");
      }, 1500);

      document.addEventListener(
        "visibilitychange",
        () => {
          if (document.hidden) clearTimeout(fallbackTimer);
        },
        { once: true }
      );

      window.location.href = twitterAppUrl;
    } else {
      window.open(twitterWebUrl, "_blank", "noopener,noreferrer");
    }

    setBusy(null);
  };

  const handleSMS = async () => {
    setBusy("sms");
    try {
      const file = await getCardFile();

      if (file && navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], text: `${shareText} ${siteUrl}` });
        posthog.capture("card_exported", { format, method: "sms_share_image" });
        return;
      }

      posthog.capture("card_exported", { format, method: "sms_text_fallback" });
      window.open(`sms:?&body=${encodeURIComponent(statsFallbackText)}`, "_self");
    } catch (err) {
      console.error("SMS share failed:", err);
      window.open(`sms:?&body=${encodeURIComponent(statsFallbackText)}`, "_self");
    } finally {
      setBusy(null);
    }
  };

  const handleNativeShare = async () => {
    setBusy("share");
    try {
      const file = await getCardFile();

      if (file && navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], text: `${shareText}\n${siteUrl}` });
        posthog.capture("card_exported", { format, method: "native_share" });
        return;
      }

      if (navigator.share) {
        await navigator.share({ text: statsFallbackText });
        posthog.capture("card_exported", { format, method: "native_share_text" });
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
    <>
      {toast && (
        <div
          key={toastKey}
          className="fixed bottom-8 left-1/2 z-50 bg-zinc-700 text-zinc-100 text-sm font-medium px-4 py-2.5 rounded-lg shadow-lg animate-toast pointer-events-none whitespace-nowrap"
        >
          {toast}
        </div>
      )}

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
            onClick={handleSave}
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
            {busy === "copy" ? "Copying..." : "Copy"}
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
    </>
  );
}
