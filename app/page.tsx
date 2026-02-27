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
        <div className="flex flex-col gap-0 mb-6">
          <div className="relative w-full h-[120px] md:h-[160px]">
            <ASCIIText
              text="Get"
              enableWaves
              asciiFontSize={4}
              textFontSize={250}
              textColor="#FFD54F"
              planeBaseHeight={10}
            />
          </div>
          <div className="relative w-full h-[120px] md:h-[160px]">
            <ASCIIText
              text="Singed"
              enableWaves
              asciiFontSize={4}
              textFontSize={250}
              textColor="#FFD54F"
              planeBaseHeight={10}
            />
          </div>
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
