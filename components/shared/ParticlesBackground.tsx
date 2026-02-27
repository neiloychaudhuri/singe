"use client";

import dynamic from "next/dynamic";

const Particles = dynamic(() => import("./Particles"), { ssr: false });

export default function ParticlesBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Particles
        particleColors={["#fff7a3"]}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={false}
        alphaParticles
        disableRotation={false}
        pixelRatio={1}
      />
    </div>
  );
}
