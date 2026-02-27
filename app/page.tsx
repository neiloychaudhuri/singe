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
        <p className="text-zinc-500 text-base max-w-lg mx-auto leading-relaxed">
          <span className="syntax-comment">// answer </span>
          <span className="syntax-number">6</span>
          <span className="syntax-comment"> quick questions</span>
          <br />
          <span className="syntax-keyword">const</span>{" "}
          <span className="syntax-fn">result</span>{" "}
          <span className="text-zinc-400">=</span>{" "}
          <span className="syntax-fn">singe</span>
          <span className="text-zinc-400">(</span>
          <span className="syntax-string">&quot;your_life&quot;</span>
          <span className="text-zinc-400">);</span>
          <br />
          <span className="syntax-comment">// brutally honest score + AI roast + hype</span>
        </p>
      </div>
      <SingeForm />
    </div>
  );
}
