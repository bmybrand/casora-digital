"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import type { PageRoute } from "../pages/page-registry";
import { CurrentHero, type CurrentHeroProps } from "./HomeHero";
import { ServiceDetail, type ServiceDetailKind } from "./ServiceDetail";
import { ServicesOverview } from "./ServicesOverview";

const heroSelector = [
  "#legacy-page-root .about_hero",
  "#legacy-page-root .contact_hero",
  "#legacy-page-root .news_hero",
  "#legacy-page-root .pricing_hero_actual",
  "#legacy-page-root .service_hero",
  "#legacy-page-root .services_hero",
  "#legacy-page-root .webflow_hero",
  "#legacy-page-root .case_hero",
  "#legacy-page-root .study_hero",
  "#legacy-page-root .section_cs-hero",
  "#legacy-page-root .article_header",
].join(",");

const sharedSummary =
  "Smart products simplify demanding work while thoughtful design keeps every experience clear, useful and ready to grow.";

const pageHeroes: Record<Exclude<PageRoute, "">, CurrentHeroProps> = {
  "about-us": {
    eyebrow: "Casora Digital’s story",
    title: "Ideas with impact about Casora.",
    summary: "Flexible technology helps organisations automate routine tasks and focus on better decisions.",
    primaryLabel: "Start a project",
    primaryHref: "/contact-us/",
    secondaryLabel: "Our work",
    secondaryHref: "/work/",
  },
  "article/building-a-brand-system-that-scales": {
    eyebrow: "Casora insights",
    title: "Bold thinking brings purpose to every detail.",
    summary: "A practical look at building brand systems that stay distinctive, consistent and useful as organisations grow.",
    primaryLabel: "Explore our work",
    primaryHref: "/work/",
    secondaryLabel: "More ideas",
    secondaryHref: "/news/",
  },
  "article/digital-design-recognition": {
    eyebrow: "Casora insights",
    title: "Ideas become useful digital experiences.",
    summary: "How focused design decisions turn ambitious ideas into clear experiences that people can understand and use.",
    primaryLabel: "Explore our work",
    primaryHref: "/work/",
    secondaryLabel: "More ideas",
    secondaryHref: "/news/",
  },
  "article/designing-digital-products-for-change": {
    eyebrow: "Casora insights",
    title: "Create with purpose",
    summary: "A considered approach to digital products that remain useful, adaptable and ready for what comes next.",
    primaryLabel: "Explore our work",
    primaryHref: "/work/",
    secondaryLabel: "More ideas",
    secondaryHref: "/news/",
  },
  "contact-us": {
    eyebrow: "Start a conversation",
    title: "Talk to Casora.",
    summary: "Secure foundations, intuitive tools and scalable architecture keep digital products dependable and ready to grow.",
    primaryLabel: "Send a message",
    primaryHref: "#contact-form",
    secondaryLabel: "See our work",
    secondaryHref: "/work/",
  },
  news: {
    eyebrow: "Ideas and updates",
    title: "Latest updates from Casora.",
    summary: "Explore practical thinking on brands, digital products and the systems that help ambitious ideas move forward.",
    primaryLabel: "Read our ideas",
    primaryHref: "#latest-updates",
    secondaryLabel: "Work with us",
    secondaryHref: "/contact-us/",
  },
  pricing: {
    eyebrow: "Flexible options",
    title: "Designed for growth for you.",
    summary: "The finished system brings together useful interactions, flexible content and a distinct point of view.",
    primaryLabel: "See plans",
    primaryHref: "#plans",
    secondaryLabel: "Get a quote",
    secondaryHref: "/contact-us/",
  },
  services: {
    eyebrow: "What we do",
    title: "Our Services.",
    summary: "Secure foundations, intuitive tools and scalable architecture keep digital products dependable and ready to grow.",
    primaryLabel: "Explore services",
    primaryHref: "#services",
    secondaryLabel: "Start a project",
    secondaryHref: "/contact-us/",
  },
  "services/graphic-design": {
    eyebrow: "The Casora standard",
    title: "Brand Create!",
    summary: "Flexible brand systems turn clear strategy into distinctive, consistent experiences built for everyday use.",
    primaryLabel: "Plan a chat",
    primaryHref: "/contact-us/",
    secondaryLabel: "All services",
    secondaryHref: "/services/",
  },
  "services/software-development": {
    eyebrow: "The Casora standard",
    title: "Products useful by design",
    summary: "Every screen guides attention, reduces friction and supports maintainable systems built for real operations.",
    primaryLabel: "Plan a chat",
    primaryHref: "/contact-us/",
    secondaryLabel: "All services",
    secondaryHref: "/services/",
  },
  "services/custom-software-development": {
    eyebrow: "Custom software development",
    title: "Software built around real work.",
    summary: "We design and develop dependable applications, portals and tools shaped around your teams, customers and operations.",
    primaryLabel: "Plan a project",
    primaryHref: "/contact-us/",
    secondaryLabel: "All services",
    secondaryHref: "/services/",
  },
  "services/cloud-solutions": {
    eyebrow: "Cloud solutions",
    title: "Cloud systems ready to scale.",
    summary: "Secure cloud architecture, practical migration and reliable operations give growing products a stronger foundation.",
    primaryLabel: "Plan a project",
    primaryHref: "/contact-us/",
    secondaryLabel: "All services",
    secondaryHref: "/services/",
  },
  "services/ai-machine-learning": {
    eyebrow: "AI & machine learning",
    title: "Intelligence made useful.",
    summary: "We turn data and machine learning into focused tools that reduce repetitive work and support better decisions.",
    primaryLabel: "Plan a project",
    primaryHref: "/contact-us/",
    secondaryLabel: "All services",
    secondaryHref: "/services/",
  },
  "services/digital-transformation": {
    eyebrow: "Digital transformation",
    title: "Transform systems. Move forward.",
    summary: "We connect strategy, experience and technology to modernise important workflows without disrupting the work that matters.",
    primaryLabel: "Plan a project",
    primaryHref: "/contact-us/",
    secondaryLabel: "All services",
    secondaryHref: "/services/",
  },
  "services/it-consulting": {
    eyebrow: "IT consulting",
    title: "Clear direction for complex technology.",
    summary: "Practical technical guidance helps teams prioritise investment, reduce risk and make confident decisions about what comes next.",
    primaryLabel: "Talk to an expert",
    primaryHref: "/contact-us/",
    secondaryLabel: "All services",
    secondaryHref: "/services/",
  },
  "services/managed-services": {
    eyebrow: "Managed services",
    title: "Reliable systems. Continuously improved.",
    summary: "Proactive support, monitoring and maintenance keep essential digital services secure, stable and ready for change.",
    primaryLabel: "Talk to an expert",
    primaryHref: "/contact-us/",
    secondaryLabel: "All services",
    secondaryHref: "/services/",
  },
  "services/web-design": {
    eyebrow: "The Casora standard",
    title: "Web Create!",
    summary: "Responsive experiences connect useful content with effortless interaction, thoughtful structure and accessible details.",
    primaryLabel: "Plan a chat",
    primaryHref: "/contact-us/",
    secondaryLabel: "All services",
    secondaryHref: "/services/",
  },
  webflow: {
    eyebrow: "Flexible no-code systems",
    title: "No-Code at Casora",
    summary: "We shape flexible digital platforms that remain simple to use, easy to grow and consistent across changing needs.",
    primaryLabel: "Talk to Casora",
    primaryHref: "/contact-us/",
    secondaryLabel: "See our work",
    secondaryHref: "/work/",
  },
  work: {
    eyebrow: "Our case studies",
    title: "Dive into the work.",
    summary: "Each project balances memorable expression with the discipline required to create useful, lasting results.",
    primaryLabel: "View projects",
    primaryHref: "#projects",
    secondaryLabel: "Start a project",
    secondaryHref: "/contact-us/",
  },
  "work/box-iq": {
    eyebrow: "Selected case study",
    title: "ARC UX",
    summary: "A coherent identity turns strategy into recognition across every channel while keeping communication clear and consistent.",
    primaryLabel: "Start a project",
    primaryHref: "/contact-us/",
    secondaryLabel: "More work",
    secondaryHref: "/work/",
  },
  "work/drivelodge": {
    eyebrow: "Web design · Configurator · UX/UI",
    title: "Ideas become useful digital experiences. BrightPath",
    summary: sharedSummary,
    primaryLabel: "Start a project",
    primaryHref: "/contact-us/",
    secondaryLabel: "More work",
    secondaryHref: "/work/",
  },
  "work/hacien": {
    eyebrow: "Packaging · Website design · Design support",
    title: "Practical creativity moves Lumina Studios forward.",
    summary: sharedSummary,
    primaryLabel: "Start a project",
    primaryHref: "/contact-us/",
    secondaryLabel: "More work",
    secondaryHref: "/work/",
  },
  "work/honest-watch-dealer": {
    eyebrow: "Selected case study",
    title: "The Modern Craft House",
    summary: "Smart products and reliable engineering turn complicated workflows into calm, useful experiences built to grow.",
    primaryLabel: "Start a project",
    primaryHref: "/contact-us/",
    secondaryLabel: "More work",
    secondaryHref: "/work/",
  },
  "work/mannson-freight": {
    eyebrow: "Selected case study",
    title: "Summit Systems",
    summary: "Secure foundations, intuitive tools and scalable architecture keep digital products dependable and ready to grow.",
    primaryLabel: "Start a project",
    primaryHref: "/contact-us/",
    secondaryLabel: "More work",
    secondaryHref: "/work/",
  },
  "work/mobillio": {
    eyebrow: "Selected case study",
    title: "FlowGrid",
    summary: "Smart products simplify demanding work while reliable engineering creates calm, useful experiences built for change.",
    primaryLabel: "Start a project",
    primaryHref: "/contact-us/",
    secondaryLabel: "More work",
    secondaryHref: "/work/",
  },
};

const serviceDetailKinds: Partial<
  Record<Exclude<PageRoute, "">, ServiceDetailKind>
> = {
  "services/custom-software-development": "software",
  "services/cloud-solutions": "cloud",
  "services/ai-machine-learning": "ai",
  "services/digital-transformation": "transformation",
  "services/it-consulting": "consulting",
  "services/managed-services": "managed",
  "services/web-design": "web",
  "services/graphic-design": "brand",
  "services/software-development": "software",
};

export function PageHero({ route }: { route: Exclude<PageRoute, ""> }) {
  const [mount, setMount] = useState<HTMLElement | null>(null);
  const detailKind = serviceDetailKinds[route] ?? null;

  useEffect(() => {
    const legacyHero = document.querySelector<HTMLElement>(heroSelector);
    if (!legacyHero) return;

    const legacyRoot = document.getElementById("legacy-page-root");
    if (detailKind && legacyRoot) legacyRoot.dataset.casoraServiceDetail = "true";

    const slot = document.createElement("div");
    slot.id = "casora-page-hero-slot";
    legacyHero.replaceWith(slot);
    const animationFrame = requestAnimationFrame(() => setMount(slot));

    return () => {
      cancelAnimationFrame(animationFrame);
      if (legacyRoot) delete legacyRoot.dataset.casoraServiceDetail;
      if (slot.isConnected) slot.replaceWith(legacyHero);
    };
  }, [detailKind, route]);

  return mount
    ? createPortal(
        <>
          <CurrentHero {...pageHeroes[route]} />
          {route === "services" ? <ServicesOverview /> : null}
          {detailKind ? <ServiceDetail kind={detailKind} /> : null}
        </>,
        mount,
      )
    : null;
}
