"use client";

import SingeForm from "@/components/form/SingeForm";
import dynamic from "next/dynamic";

const ASCIIText = dynamic(
  () => import("@/components/shared/ASCIIText"),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-65px)] px-4 py-12">
      <div className="text-center mb-12">
        <div className="relative w-full h-[140px] md:h-[180px] mb-6">
          <ASCIIText
            text="Singe"
            enableWaves
            asciiFontSize={3}
            textFontSize={200}
            textColor="#FFD54F"
            planeBaseHeight={8}
          />
        </div>
        <p className="text-zinc-500 text-lg max-w-md mx-auto">
          Answer 6 quick questions. Get a brutally honest score,
          an AI-powered roast, and a hype-up you didn&apos;t ask for.
        </p>
      </div>
      <SingeForm />
    </div>
  );
}
