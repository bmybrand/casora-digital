"use client";

import { useEffect, useRef, useState } from "react";

const splineSceneUrl =
  "https://prod.spline.design/3c3rOBJxzYuK8lDA/scene.splinecode";

type SplineApplication = {
  load: (url: string) => Promise<void>;
  dispose?: () => void;
};

const services = [
  {
    title: "Custom Software Development",
    description: "Purpose-built platforms, portals and applications.",
    href: "/services/custom-software-development/",
    icon: "software",
  },
  {
    title: "Cloud Solutions",
    description: "Secure, scalable infrastructure for reliable growth.",
    href: "/services/cloud-solutions/",
    icon: "cloud",
  },
  {
    title: "AI & Machine Learning",
    description: "Intelligent tools that turn data into useful decisions.",
    href: "/services/ai-machine-learning/",
    icon: "ai",
  },
  {
    title: "Digital Transformation",
    description: "Connected systems that make everyday work more effective.",
    href: "/services/digital-transformation/",
    icon: "transform",
  },
  {
    title: "IT Consulting",
    description: "Clear technical direction grounded in business priorities.",
    href: "/services/it-consulting/",
    icon: "consulting",
  },
  {
    title: "Managed Services",
    description: "Reliable monitoring, maintenance and ongoing improvement.",
    href: "/services/managed-services/",
    icon: "managed",
  },
] as const;

function ServicesRobot() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let disposed = false;
    let loaded = false;
    let application: SplineApplication | undefined;

    async function loadScene() {
      try {
        const runtimeUrl = new URL(
          "/npm/@splinetool/runtime/build/runtime.js",
          window.location.href,
        ).href;
        const runtime = (await import(
          /* webpackIgnore: true */ runtimeUrl
        )) as {
          Application: new (canvas: HTMLCanvasElement) => SplineApplication;
        };
        const canvas = canvasRef.current;
        if (disposed || !canvas) return;

        application = new runtime.Application(canvas);
        await application.load(splineSceneUrl);
        loaded = true;
        if (!disposed) setIsReady(true);
      } catch (error) {
        if (!disposed) {
          console.warn(
            "The interactive Casora robot could not be loaded.",
            error instanceof Error ? error.message : String(error),
          );
        }
      }
    }

    const startTimer = window.setTimeout(() => {
      void loadScene();
    }, 0);

    return () => {
      disposed = true;
      window.clearTimeout(startTimer);
      if (loaded && typeof application?.dispose === "function") {
        try {
          application.dispose();
        } catch {
          // The copied Spline runtime can throw during a development remount.
          // The detached canvas is collected by the browser regardless.
        }
      }
    };
  }, []);

  return (
    <div
      className={`casora-services__robot${isReady ? " is-ready" : ""}`}
      aria-label="Interactive Casora robot"
    >
      <canvas ref={canvasRef} aria-label="Interactive 3D Casora robot" />
    </div>
  );
}

function ServiceIcon({ name }: { name: (typeof services)[number]["icon"] }) {
  const sharedProps = {
    "aria-hidden": true as const,
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.8,
    viewBox: "0 0 40 40",
  };

  switch (name) {
    case "software":
      return (
        <svg {...sharedProps}>
          <rect x="5" y="7" width="30" height="26" rx="4" />
          <path d="M5 13h30M14 19l-5 4 5 4M26 19l5 4-5 4M23 17l-6 12" />
          <circle cx="10" cy="10" r="1" fill="currentColor" stroke="none" />
          <circle cx="14" cy="10" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "cloud":
      return (
        <svg {...sharedProps}>
          <path d="M11 30h18a7 7 0 0 0 .4-14 10 10 0 0 0-19.2-1.8A8 8 0 0 0 11 30Z" />
          <path d="M20 26V16m-4 4 4-4 4 4" />
        </svg>
      );
    case "ai":
      return (
        <svg {...sharedProps}>
          <rect x="11" y="11" width="18" height="18" rx="4" />
          <path d="M15 6v5M25 6v5M15 29v5M25 29v5M6 15h5M6 25h5M29 15h5M29 25h5" />
          <circle cx="17" cy="18" r="1.5" />
          <circle cx="23" cy="17" r="1.5" />
          <circle cx="22" cy="24" r="1.5" />
          <path d="m18.5 18 3-1m1 1.5-.3 4M18 19.5l3 3.5" />
        </svg>
      );
    case "transform":
      return (
        <svg {...sharedProps}>
          <path d="M9 13h19l-4-4M31 27H12l4 4" />
          <path d="M28 13a12 12 0 0 1 1.5 12M12 27a12 12 0 0 1-1.5-12" />
          <path d="M17 17h6v6h-6z" />
        </svg>
      );
    case "consulting":
      return (
        <svg {...sharedProps}>
          <path d="M8 21v-3a12 12 0 0 1 24 0v3" />
          <path d="M8 20H5v8h6v-8H8ZM32 20h3v8h-6v-8h3ZM32 28v1a5 5 0 0 1-5 5h-5" />
          <circle cx="19" cy="34" r="2" />
          <path d="M15 18a5 5 0 0 1 10 0" />
        </svg>
      );
    case "managed":
      return (
        <svg {...sharedProps}>
          <path d="M20 4 33 9v9c0 8-5.2 14.2-13 18-7.8-3.8-13-10-13-18V9l13-5Z" />
          <circle cx="20" cy="19" r="5" />
          <path d="M20 11v3M20 24v3M12 19h3M25 19h3M14.3 13.3l2.1 2.1M23.6 22.6l2.1 2.1M25.7 13.3l-2.1 2.1M16.4 22.6l-2.1 2.1" />
        </svg>
      );
  }
}

export function ServicesOverview() {
  return (
    <section
      id="services"
      className="casora-services"
      aria-label="Our services"
    >
      <div className="casora-services__visual">
        <h2>
          Our <span>Services.</span>
        </h2>
        <p className="casora-services__intro">
          Focusing on what we&rsquo;re good at means we can deliver exceptional
          quality every time. Our services bring strategy, technology and
          dependable delivery together around the work that matters.
        </p>
        <ServicesRobot />
      </div>
      <ul className="casora-services__list">
        {services.map((service) => (
          <li key={service.title}>
            <a href={service.href}>
              <span className="casora-services__icon">
                <ServiceIcon name={service.icon} />
              </span>
              <span className="casora-services__copy">
                <span className="casora-services__title">{service.title}</span>
                <span className="casora-services__description">
                  {service.description}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
