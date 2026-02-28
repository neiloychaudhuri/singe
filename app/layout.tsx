import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/shared/NavBar";
import PostHogInit from "@/components/shared/PostHogInit";
import ParticlesBackground from "@/components/shared/ParticlesBackground";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Singe — How Cooked Are You?",
  description:
    "A brutally honest, AI-powered life assessment tool that tells you exactly how cooked you are — then hypes you up anyway.",
  openGraph: {
    title: "Singe — How Cooked Are You?",
    description:
      "A brutally honest, AI-powered life assessment tool that tells you exactly how cooked you are — then hypes you up anyway.",
    type: "website",
    images: [{ url: "/singe-thumbnail.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Singe — How Cooked Are You?",
    description:
      "A brutally honest, AI-powered life assessment tool that tells you exactly how cooked you are — then hypes you up anyway.",
    images: ["/singe-thumbnail.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
        <ParticlesBackground />
        <PostHogInit />
        <NavBar />
        <main className="flex-1 relative z-0">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
