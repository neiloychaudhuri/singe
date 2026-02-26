import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/shared/NavBar";
import PostHogInit from "@/components/shared/PostHogInit";

export const metadata: Metadata = {
  title: "Singe — How Cooked Are You?",
  description:
    "A brutally honest, AI-powered life assessment tool that tells you exactly how cooked you are — then hypes you up anyway.",
  openGraph: {
    title: "Singe — How Cooked Are You?",
    description:
      "A brutally honest, AI-powered life assessment tool that tells you exactly how cooked you are — then hypes you up anyway.",
    type: "website",
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
        <PostHogInit />
        <NavBar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
