"use client";

import SingeForm from "@/components/form/SingeForm";
import dynamic from "next/dynamic";

const ASCIIText = dynamic(() => import("@/components/shared/ASCIIText"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-65px)] py-12 overflow-visible">
      <div className="text-center mb-12 overflow-visible">
        <div className="relative w-[100vw] h-[45vh] md:h-[55vh] mb-2 overflow-visible">
          <ASCIIText
            text="Singe "
            enableWaves
            asciiFontSize={6}
            textFontSize={420}
            textColor="#FFD54F"
            planeBaseHeight={14}
          />
        </div>
        <p className="text-zinc-600 text-xs mb-6 tracking-wide">
          made by neiloy chaudhuri
        </p>
        <p className="text-zinc-500 text-base max-w-lg mx-auto leading-relaxed">
          <span className="syntax-comment">// answer </span>
          <span className="syntax-number">5</span>
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
          <span className="syntax-comment">
            // brutally honest score + AI roast + hype
          </span>
        </p>
      </div>
      <SingeForm />
    </div>
  );
}
