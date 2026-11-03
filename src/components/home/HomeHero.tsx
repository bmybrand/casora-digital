"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { HeroBackdrop } from "./HeroBackdrop";

export type CurrentHeroProps = {
  eyebrow: string;
  title: string;
  summary: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

function AccentTitle({ title }: { title: string }) {
  const splitAt = title.lastIndexOf(" ");
  if (splitAt < 0) return <em>{title}</em>;

  return (
    <>
      {title.slice(0, splitAt)} <em>{title.slice(splitAt + 1)}</em>
    </>
  );
}

export function CurrentHero({
  eyebrow,
  title,
  summary,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CurrentHeroProps) {
  return (
    <section className="casora-current-hero">
      <HeroBackdrop />
      <div className="casora-current-hero__copy">
        <p className="casora-current-hero__eyebrow">{eyebrow}</p>
        <h1><AccentTitle title={title} /></h1>
        <p className="casora-current-hero__summary">{summary}</p>
        <div className="casora-current-hero__actions">
          <a
            className="casora-current-hero__button casora-current-hero__button--primary"
            href={primaryHref}
          >
            {primaryLabel}
          </a>
          {secondaryLabel && secondaryHref ? (
            <a
              className="casora-current-hero__button casora-current-hero__button--ghost"
              href={secondaryHref}
            >
              {secondaryLabel}
            </a>
          ) : null}
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

  return mount ? createPortal(
    <CurrentHero
      eyebrow="Independent digital studio"
      title="Clear work creates lasting momentum."
      summary="Casora combines brand thinking, product design and engineering to turn ambitious ideas into useful digital experiences."
      primaryLabel="Start a project"
      primaryHref="/contact-us/"
      secondaryLabel="See our work"
      secondaryHref="/work/"
    />,
    mount,
  ) : null;
}
