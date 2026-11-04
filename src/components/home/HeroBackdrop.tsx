"use client";

import dynamic from "next/dynamic";

const MicroSlats = dynamic(() => import("../react-bits/MicroSlats"), {
  ssr: false,
});

export function HeroBackdrop() {
  return (
    <>
      <div className="casora-hero-backdrop" aria-hidden="true">
        <MicroSlats
          preset="swell"
          color="#1478ff"
          glintColor="#2de9e7"
          backgroundColor="#02040a"
          slatWidth={10}
          slatHeight={25}
          gap={3}
          roundness={0.76}
          cursorStrength={1.15}
          cursorSize={56}
          swirl={0.12}
          trail={1.5}
          lean={0.08}
          interactive
          intro
        />
      </div>
      <div className="casora-hero-shade" aria-hidden="true" />
    </>
  );
}
