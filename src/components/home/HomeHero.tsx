"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import MicroSlats from "../react-bits/MicroSlats";

function HeroContent() {
  return (
    <section className="casora-current-hero">
      <div className="casora-current-hero__slats" aria-hidden="true">
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
      <div className="casora-current-hero__shade" aria-hidden="true" />
      <div className="casora-current-hero__copy">
        <p className="casora-current-hero__eyebrow">Independent digital studio</p>
        <h1>
          Clear work creates <em>lasting momentum.</em>
        </h1>
        <p className="casora-current-hero__summary">
          Casora combines brand thinking, product design and engineering to turn ambitious
          ideas into useful digital experiences.
        </p>
        <div className="casora-current-hero__actions">
          <a
            className="casora-current-hero__button casora-current-hero__button--primary"
            href="/contact-us/"
          >
            Start a project
          </a>
          <a
            className="casora-current-hero__button casora-current-hero__button--ghost"
            href="/work/"
          >
            See our work
          </a>
        </div>
      </div>
      <div className="casora-current-hero__note">
        <span>Intelligence.</span>
        <span>Innovation.</span>
        <span>Impact.</span>
      </div>
    </section>
  );
}

export function HomeHero() {
  const [mount, setMount] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const target = document.getElementById("home-hero-slot");
    if (!target) return;

    target.replaceChildren();
    setMount(target);
  }, []);

  return mount ? createPortal(<HeroContent />, mount) : null;
}
