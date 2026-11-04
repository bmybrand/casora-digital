"use client";

import { useState } from "react";

export type ServiceDetailKind =
  | "web"
  | "brand"
  | "software"
  | "cloud"
  | "ai"
  | "transformation"
  | "consulting"
  | "managed";

type ServiceCard = {
  number: string;
  title: string;
  description: string;
  image: string;
};

type Project = {
  title: string;
  description: string;
  image: string;
  href: string;
  tags: string[];
};

type ServiceDetailData = {
  label: string;
  title: string;
  introduction: string;
  capabilities: ServiceCard[];
  processIntroduction: string;
  processImages: string[];
  projects: Project[];
  pricing?: string;
  faqs: Array<{ question: string; answer: string }>;
};

const stages = [
  {
    label: "First stage",
    title: "Clarify",
    description:
      "We begin with a focused review of your goals, audience, constraints and existing materials. This gives the project a clear direction before design or development begins.",
  },
  {
    label: "Second stage",
    title: "Conceptualise",
    description:
      "We turn the agreed direction into practical concepts, journeys and visual options. You can see the thinking early, discuss it clearly and shape the strongest route with us.",
  },
  {
    label: "Third stage",
    title: "Evolve",
    description:
      "The selected direction is tested, refined and expanded into a complete system. Feedback is resolved methodically so every detail supports the wider experience.",
  },
  {
    label: "Final stage",
    title: "Implement",
    description:
      "We prepare, build and launch the finished work with the documentation and support needed for confident everyday use and future growth.",
  },
] as const;

const serviceDetails: Record<ServiceDetailKind, ServiceDetailData> = {
  web: {
    label: "Web design services",
    title: "Explore our Web Design Services.",
    introduction:
      "From focused landing pages to complete digital platforms, Casora combines strategy, interface design and dependable implementation to create websites that are clear, distinctive and easy to evolve.",
    capabilities: [
      {
        number: "01",
        title: "Design Systems",
        description:
          "Reusable typography, colour, components and interaction rules that keep every page consistent while making future updates faster.",
        image: "/assets/generated/web-ui-warm.png",
      },
      {
        number: "02",
        title: "Responsive Websites",
        description:
          "Purposeful websites designed around real content, accessible journeys and responsive behaviour across every important screen size.",
        image: "/assets/generated/article-web-evolution.png",
      },
      {
        number: "03",
        title: "Landing Pages",
        description:
          "Focused campaign experiences that explain value quickly, guide attention and turn interest into a clear next action.",
        image: "/assets/generated/mobile-product-sage.png",
      },
      {
        number: "04",
        title: "Commerce Experiences",
        description:
          "Product-led storefronts that make browsing, comparing and buying feel simple while giving teams practical control over content.",
        image: "/assets/generated/commerce-burgundy.png",
      },
    ],
    processIntroduction:
      "Every website has different requirements, but our four-stage process keeps decisions visible, collaboration useful and delivery moving forward.",
    processImages: [
      "/assets/generated/article-transit-design.png",
      "/assets/generated/article-design-recognition.png",
      "/assets/generated/cutout-nocode-builder.png",
      "/assets/generated/web-ui-warm.png",
    ],
    projects: [
      {
        title: "BrightPath",
        description:
          "A clearer digital journey and configurable experience designed to turn a complex product into a confident customer decision.",
        image: "/assets/generated/case-drivelodge-hero.png",
        href: "/work/drivelodge/",
        tags: ["Web design", "UX/UI", "Configurator"],
      },
      {
        title: "Lumina Studios",
        description:
          "A premium web and brand system that balances expressive storytelling with a practical, maintainable content structure.",
        image: "/assets/generated/case-hacien-packaging.png",
        href: "/work/hacien/",
        tags: ["Website", "Brand system", "Content"],
      },
      {
        title: "FlowGrid",
        description:
          "A responsive product experience that helps teams understand complex workflows without losing speed or visual character.",
        image: "/assets/generated/case-mobillio-hero.png",
        href: "/work/mobillio/",
        tags: ["Product design", "Responsive UI", "Illustration"],
      },
    ],
    faqs: [
      {
        question: "How much does a website cost?",
        answer:
          "Cost depends on content, functionality, integrations and the level of design support required. After a short discovery call, we provide a clear scope and fixed estimate or suitable ongoing plan.",
      },
      {
        question: "How long does a website take to launch?",
        answer:
          "Most focused website projects take between four and eight weeks. Larger platforms are planned in phases so useful work can launch without waiting for every future feature.",
      },
      {
        question: "Can you design ecommerce websites?",
        answer:
          "Yes. We design product discovery, collections, product pages, checkout journeys and the content systems teams need to manage a growing catalogue.",
      },
      {
        question: "Will the website be responsive and accessible?",
        answer:
          "Yes. Responsive behaviour, performance and accessibility are considered from the first layout decisions through build and quality assurance.",
      },
    ],
  },
  brand: {
    label: "Brand design services",
    title: "Explore our Brand Design Services.",
    introduction:
      "Casora builds distinctive visual systems with the clarity and practical rules needed to work across digital products, campaigns, environments and everyday communications.",
    capabilities: [
      {
        number: "01",
        title: "Identity Design",
        description:
          "Memorable identity systems that connect positioning, logo, typography, colour and imagery around one recognisable idea.",
        image: "/assets/generated/brand-editorial-warm.png",
      },
      {
        number: "02",
        title: "Brand Guidelines",
        description:
          "Clear rules, examples and ready-to-use assets that make consistent implementation straightforward for internal and external teams.",
        image: "/assets/generated/article-design-recognition.png",
      },
      {
        number: "03",
        title: "Campaign Graphics",
        description:
          "Flexible visual toolkits for social, launch and editorial campaigns that retain character across formats and channels.",
        image: "/assets/generated/editorial-plum.png",
      },
      {
        number: "04",
        title: "Packaging & Print",
        description:
          "Print-ready packaging and collateral that translate the brand into tactile materials with clarity, craft and shelf presence.",
        image: "/assets/generated/case-hacien-packaging.png",
      },
    ],
    processIntroduction:
      "Our four-stage brand process keeps strategic decisions connected to the visual work, giving every identity a clear reason to look and behave the way it does.",
    processImages: [
      "/assets/generated/article-transit-design.png",
      "/assets/generated/brand-editorial-warm.png",
      "/assets/generated/editorial-plum.png",
      "/assets/generated/case-hacien-packaging.png",
    ],
    projects: [
      {
        title: "Lumina Studios",
        description:
          "A confident premium identity spanning packaging, digital touchpoints and campaign materials without losing consistency.",
        image: "/assets/generated/case-hacien-packaging.png",
        href: "/work/hacien/",
        tags: ["Identity", "Packaging", "Campaign"],
      },
      {
        title: "The Modern Craft House",
        description:
          "A refined identity system designed to feel credible in luxury contexts while remaining flexible across editorial and merchandise.",
        image: "/assets/generated/case-watch-hero.png",
        href: "/work/honest-watch-dealer/",
        tags: ["Brand strategy", "Visual identity", "Merchandise"],
      },
      {
        title: "Summit Systems",
        description:
          "A practical rebrand that unifies a growing organisation across digital products, communications and customer-facing tools.",
        image: "/assets/generated/case-mannson-portal.png",
        href: "/work/mannson-freight/",
        tags: ["Rebrand", "Guidelines", "Digital system"],
      },
    ],
    faqs: [
      {
        question: "How much does a brand identity cost?",
        answer:
          "Brand scope varies with research, naming, applications and the number of deliverables. We define what is genuinely useful first, then provide a clear project estimate.",
      },
      {
        question: "Do you create social and campaign graphics?",
        answer:
          "Yes. We can create a complete launch toolkit, reusable templates or ongoing campaign assets that remain consistent with the core identity.",
      },
      {
        question: "Can you provide print-ready artwork?",
        answer:
          "Yes. Final deliverables can include production-ready files, specifications and supplier guidance for packaging, signage, stationery and other printed applications.",
      },
      {
        question: "Will we receive brand guidelines?",
        answer:
          "Yes. Guidelines are scaled to the project and can include logo use, colour, typography, imagery, layout, voice and practical examples for your team.",
      },
    ],
  },
  software: {
    label: "Software development services",
    title: "Explore our Software Development Services.",
    introduction:
      "Casora designs and develops dependable portals, applications and operational tools that simplify demanding work, connect information and support confident growth.",
    capabilities: [
      {
        number: "01",
        title: "Web Applications",
        description:
          "Secure browser-based products shaped around clear user journeys, maintainable architecture and real operational requirements.",
        image: "/assets/generated/software-system-amber.png",
      },
      {
        number: "02",
        title: "Customer Portals",
        description:
          "Focused self-service platforms that bring communication, documents, tasks and account information into one reliable experience.",
        image: "/assets/generated/case-mannson-portal.png",
      },
      {
        number: "03",
        title: "SaaS Products",
        description:
          "Scalable software products designed from early validation through launch, iteration and the systems needed for long-term operation.",
        image: "/assets/generated/case-mobillio-dashboard.png",
      },
      {
        number: "04",
        title: "Workflow Automation",
        description:
          "Connected tools and integrations that reduce repetitive work, improve visibility and help teams make better decisions faster.",
        image: "/assets/generated/logistics-olive.png",
      },
    ],
    processIntroduction:
      "Our four-stage product process reduces uncertainty early, keeps technical decisions connected to user needs and supports dependable delivery.",
    processImages: [
      "/assets/generated/logistics-olive.png",
      "/assets/generated/software-system-amber.png",
      "/assets/generated/case-mannson-portal.png",
      "/assets/generated/case-mobillio-dashboard.png",
    ],
    projects: [
      {
        title: "Summit Systems",
        description:
          "A connected customer portal that makes complex operational information easier to manage, understand and act on.",
        image: "/assets/generated/case-mannson-portal.png",
        href: "/work/mannson-freight/",
        tags: ["Portal", "UX/UI", "Systems"],
      },
      {
        title: "FlowGrid",
        description:
          "A scalable product interface bringing business travel tasks, status and decisions together in one coherent workflow.",
        image: "/assets/generated/case-mobillio-dashboard.png",
        href: "/work/mobillio/",
        tags: ["SaaS", "Dashboard", "Product design"],
      },
      {
        title: "ARC UX",
        description:
          "A modular digital platform designed to support coaching, progress visibility and continued product evolution.",
        image: "/assets/generated/case-boxiq-hero.png",
        href: "/work/box-iq/",
        tags: ["Web application", "UX strategy", "Development"],
      },
    ],
    pricing:
      "Development scope can be difficult to compare. We make it clearer with defined project phases, transparent deliverables and a choice between fixed project work and ongoing product support.",
    faqs: [
      {
        question: "How much does custom software cost?",
        answer:
          "Cost depends on workflows, integrations, security and the maturity of the idea. We begin by defining the smallest valuable release and provide a phased estimate before development starts.",
      },
      {
        question: "Can you design and build mobile applications?",
        answer:
          "Yes. We design responsive web applications and can plan platform-specific mobile delivery when the product and audience require it.",
      },
      {
        question: "Which technologies do you use?",
        answer:
          "We select technology around the product rather than forcing every project into one stack. Typical work includes TypeScript, React, Next.js, APIs, SQL data and modern cloud platforms.",
      },
      {
        question: "Can you improve an existing system?",
        answer:
          "Yes. We can audit an existing product, clarify priorities and improve its interface, performance or architecture through staged releases.",
      },
    ],
  },
  cloud: {
    label: "Cloud solutions",
    title: "Build a stronger cloud foundation.",
    introduction:
      "Casora plans, migrates and improves cloud environments that stay secure, observable and practical to operate as products and organisations grow.",
    capabilities: [
      { number: "01", title: "Cloud Architecture", description: "Resilient infrastructure shaped around performance, security, cost and the real demands of your product.", image: "/assets/generated/software-system-amber.png" },
      { number: "02", title: "Cloud Migration", description: "A phased route from legacy hosting to modern cloud services with clear dependencies and controlled risk.", image: "/assets/generated/web-ui-warm.png" },
      { number: "03", title: "DevOps & Delivery", description: "Repeatable build, test and deployment workflows that help teams release confidently and recover quickly.", image: "/assets/generated/logistics-olive.png" },
      { number: "04", title: "Cloud Optimisation", description: "Monitoring, rightsizing and architectural improvements that make cloud systems faster and more cost effective.", image: "/assets/generated/case-mobillio-dashboard.png" },
    ],
    processIntroduction: "Our cloud process connects business priorities with technical evidence, so every migration and infrastructure decision has a clear purpose.",
    processImages: ["/assets/generated/software-system-amber.png", "/assets/generated/web-ui-warm.png", "/assets/generated/logistics-olive.png", "/assets/generated/case-mobillio-dashboard.png"],
    projects: [
      { title: "Summit Cloud", description: "A secure cloud foundation that brings operational services together and gives a growing team clearer control.", image: "/assets/generated/case-mannson-portal.png", href: "/work/mannson-freight/", tags: ["Cloud architecture", "Migration", "DevOps"] },
      { title: "FlowGrid", description: "A scalable application environment designed for dependable releases, useful monitoring and changing demand.", image: "/assets/generated/case-mobillio-dashboard.png", href: "/work/mobillio/", tags: ["Platform", "Observability", "Optimisation"] },
      { title: "BrightPath", description: "A modern delivery platform that supports responsive customer experiences without adding operational complexity.", image: "/assets/generated/case-drivelodge-hero.png", href: "/work/drivelodge/", tags: ["Infrastructure", "Delivery", "Security"] },
    ],
    pricing: "Cloud work is planned in visible phases, from assessment and architecture through migration and ongoing optimisation, with costs tied to clear outcomes.",
    faqs: [
      { question: "Which cloud platforms do you support?", answer: "We work with modern public-cloud and managed platforms, selecting services around security, workload, team capability and long-term operating cost." },
      { question: "Can you migrate an existing application?", answer: "Yes. We map dependencies, data, risk and rollback requirements before moving workloads in controlled stages." },
      { question: "Can you reduce our cloud costs?", answer: "Yes. We review usage, architecture and delivery practices, then prioritise changes that improve efficiency without compromising resilience." },
      { question: "Do you provide ongoing cloud support?", answer: "Yes. Monitoring, maintenance, incident support and continuous optimisation can continue after the initial project." },
    ],
  },
  ai: {
    label: "AI & machine learning",
    title: "Turn intelligence into useful work.",
    introduction:
      "Casora creates focused AI and machine-learning solutions that help people find information, automate repetitive tasks and make stronger decisions.",
    capabilities: [
      { number: "01", title: "AI Product Strategy", description: "Practical use-case discovery that separates valuable opportunities from expensive distractions.", image: "/assets/generated/article-design-recognition.png" },
      { number: "02", title: "Intelligent Automation", description: "Human-centred workflows that use AI to reduce repetitive work while keeping review and control visible.", image: "/assets/generated/software-system-amber.png" },
      { number: "03", title: "Knowledge Assistants", description: "Secure search and assistant experiences grounded in the information your teams already trust.", image: "/assets/generated/mobile-product-sage.png" },
      { number: "04", title: "Predictive Systems", description: "Models and decision tools that reveal patterns, forecast demand and support timely action.", image: "/assets/generated/commerce-burgundy.png" },
    ],
    processIntroduction: "We validate the user need, data and risks before building, then measure performance against the practical outcome the system is meant to improve.",
    processImages: ["/assets/generated/article-design-recognition.png", "/assets/generated/mobile-product-sage.png", "/assets/generated/software-system-amber.png", "/assets/generated/commerce-burgundy.png"],
    projects: [
      { title: "Signal Assist", description: "A knowledge assistant that turns scattered operational guidance into clear, traceable answers for busy teams.", image: "/assets/generated/software-system-amber.png", href: "/work/mannson-freight/", tags: ["Generative AI", "Knowledge search", "UX"] },
      { title: "FlowGrid", description: "Predictive workflow signals that help teams identify delays and act before routine issues become costly.", image: "/assets/generated/case-mobillio-dashboard.png", href: "/work/mobillio/", tags: ["Machine learning", "Analytics", "Product design"] },
      { title: "ARC UX", description: "A guided digital experience that adapts useful content to individual goals while keeping people in control.", image: "/assets/generated/case-boxiq-hero.png", href: "/work/box-iq/", tags: ["Personalisation", "Automation", "Platform"] },
    ],
    pricing: "AI projects begin with a focused validation phase so investment follows evidence. Prototypes, production delivery and ongoing model operations are scoped separately.",
    faqs: [
      { question: "Where should we start with AI?", answer: "Start with a valuable, repeated problem and the data available to solve it. We help assess opportunities before recommending a build." },
      { question: "Can AI work securely with private information?", answer: "Yes, when architecture, permissions, retention and provider choices are designed carefully around the sensitivity of the information." },
      { question: "Do you build custom machine-learning models?", answer: "We can develop custom models or integrate proven services, choosing the approach that best fits accuracy, ownership, cost and delivery time." },
      { question: "How do you measure an AI system?", answer: "We define product and model measures early, including usefulness, accuracy, response quality, time saved and human review requirements." },
    ],
  },
  transformation: {
    label: "Digital transformation",
    title: "Modernise the work that matters.",
    introduction:
      "Casora helps organisations replace fragmented processes with connected digital experiences that are easier for customers, teams and leaders to use.",
    capabilities: [
      { number: "01", title: "Digital Roadmaps", description: "A prioritised plan connecting business goals, user needs, technology and achievable stages of change.", image: "/assets/generated/article-transit-design.png" },
      { number: "02", title: "Process Redesign", description: "Clearer workflows that remove duplication, expose bottlenecks and make ownership easier to understand.", image: "/assets/generated/case-mannson-portal.png" },
      { number: "03", title: "Platform Modernisation", description: "Thoughtful replacement or improvement of legacy tools without losing critical knowledge and continuity.", image: "/assets/generated/web-ui-warm.png" },
      { number: "04", title: "Adoption & Enablement", description: "Practical rollout, documentation and feedback loops that help new systems become part of everyday work.", image: "/assets/generated/brand-editorial-warm.png" },
    ],
    processIntroduction: "Transformation works when strategy and delivery remain connected. Our four stages make change manageable, measurable and useful from the first release.",
    processImages: ["/assets/generated/article-transit-design.png", "/assets/generated/case-mannson-portal.png", "/assets/generated/web-ui-warm.png", "/assets/generated/brand-editorial-warm.png"],
    projects: [
      { title: "Summit Systems", description: "A connected service platform replacing fragmented customer and operational processes with one coherent journey.", image: "/assets/generated/case-mannson-portal.png", href: "/work/mannson-freight/", tags: ["Transformation", "Service design", "Platform"] },
      { title: "FlowGrid", description: "A modern workflow product that gives teams clearer information, faster decisions and fewer manual handoffs.", image: "/assets/generated/case-mobillio-dashboard.png", href: "/work/mobillio/", tags: ["Process design", "SaaS", "Integration"] },
      { title: "Lumina Studios", description: "A unified brand and digital system supporting consistent communication across a changing organisation.", image: "/assets/generated/case-hacien-packaging.png", href: "/work/hacien/", tags: ["Digital system", "Content", "Enablement"] },
    ],
    pricing: "Transformation programmes are divided into clear stages so organisations can validate priorities, release useful improvements and manage investment responsibly.",
    faqs: [
      { question: "What does digital transformation include?", answer: "It can include strategy, service design, workflow redesign, platform modernisation, integration and adoption support, depending on the change required." },
      { question: "Can you work with our existing systems?", answer: "Yes. We assess what should be retained, connected, improved or replaced rather than assuming everything needs to be rebuilt." },
      { question: "How do you reduce disruption?", answer: "We map dependencies, involve the people doing the work and release change in controlled stages with clear transition plans." },
      { question: "How is progress measured?", answer: "Measures are tied to the original problem, such as task time, service quality, adoption, operating cost or customer satisfaction." },
    ],
  },
  consulting: {
    label: "IT consulting",
    title: "Make confident technology decisions.",
    introduction:
      "Casora gives leaders clear, independent guidance on architecture, platforms, delivery and risk so technology investment supports the organisation it serves.",
    capabilities: [
      { number: "01", title: "Technology Strategy", description: "A practical direction for platforms, teams and investment based on business priorities rather than trends.", image: "/assets/generated/article-transit-design.png" },
      { number: "02", title: "Architecture Review", description: "An evidence-led assessment of system structure, security, performance and maintainability.", image: "/assets/generated/software-system-amber.png" },
      { number: "03", title: "Delivery Planning", description: "Clear scope, sequencing and governance for complex digital programmes and product roadmaps.", image: "/assets/generated/logistics-olive.png" },
      { number: "04", title: "Technical Due Diligence", description: "Focused review of technology, process and risk for investment, procurement or major change.", image: "/assets/generated/article-design-recognition.png" },
    ],
    processIntroduction: "Our consulting process turns ambiguity into a defensible plan, with evidence, options and trade-offs presented in language decision-makers can use.",
    processImages: ["/assets/generated/article-transit-design.png", "/assets/generated/software-system-amber.png", "/assets/generated/logistics-olive.png", "/assets/generated/article-design-recognition.png"],
    projects: [
      { title: "Summit Roadmap", description: "A technology and delivery roadmap aligning platform investment with customer and operational priorities.", image: "/assets/generated/case-mannson-portal.png", href: "/work/mannson-freight/", tags: ["Strategy", "Architecture", "Roadmap"] },
      { title: "FlowGrid Review", description: "A product and architecture review that identified the safest path from early platform to scalable service.", image: "/assets/generated/case-mobillio-dashboard.png", href: "/work/mobillio/", tags: ["Technical audit", "SaaS", "Planning"] },
      { title: "BrightPath", description: "A focused discovery programme turning competing requirements into one achievable digital plan.", image: "/assets/generated/case-drivelodge-hero.png", href: "/work/drivelodge/", tags: ["Discovery", "Service design", "Governance"] },
    ],
    pricing: "Consulting can be commissioned as a focused review, a defined strategy engagement or ongoing advisory support, with deliverables agreed before work begins.",
    faqs: [
      { question: "Can you review our current technology?", answer: "Yes. We can assess architecture, code, infrastructure, delivery practices, security and operating risk at the depth the decision requires." },
      { question: "Will you work with our internal team?", answer: "Yes. We collaborate with technical and non-technical stakeholders, making recommendations usable by the people responsible for delivery." },
      { question: "Do you help select vendors and platforms?", answer: "Yes. We define requirements, compare options and document trade-offs so procurement decisions are clearer and more defensible." },
      { question: "Can consulting lead into delivery?", answer: "Yes, but recommendations remain grounded in your needs. Casora can deliver the work or support a handover to another suitable team." },
    ],
  },
  managed: {
    label: "Managed services",
    title: "Keep essential systems dependable.",
    introduction:
      "Casora provides proactive support, monitoring and continuous improvement for digital products and cloud systems that organisations rely on every day.",
    capabilities: [
      { number: "01", title: "Application Support", description: "Responsive technical support, structured triage and reliable fixes for business-critical digital products.", image: "/assets/generated/case-mannson-portal.png" },
      { number: "02", title: "Monitoring & Response", description: "Useful monitoring, alerting and incident processes designed around service impact rather than noise.", image: "/assets/generated/software-system-amber.png" },
      { number: "03", title: "Security & Maintenance", description: "Routine updates, vulnerability management and technical housekeeping that reduce avoidable risk.", image: "/assets/generated/logistics-olive.png" },
      { number: "04", title: "Continuous Improvement", description: "A managed backlog of practical enhancements informed by usage, support needs and changing priorities.", image: "/assets/generated/case-mobillio-dashboard.png" },
    ],
    processIntroduction: "We establish service priorities, ownership and response expectations first, then combine dependable support with a visible programme of improvement.",
    processImages: ["/assets/generated/case-mannson-portal.png", "/assets/generated/software-system-amber.png", "/assets/generated/logistics-olive.png", "/assets/generated/case-mobillio-dashboard.png"],
    projects: [
      { title: "Summit Care", description: "Ongoing platform support combining incident response, maintenance and planned service improvements.", image: "/assets/generated/case-mannson-portal.png", href: "/work/mannson-freight/", tags: ["Support", "Maintenance", "Platform"] },
      { title: "FlowGrid Operations", description: "Managed monitoring and release support keeping an evolving product stable as usage and features grow.", image: "/assets/generated/case-mobillio-dashboard.png", href: "/work/mobillio/", tags: ["Monitoring", "DevOps", "Optimisation"] },
      { title: "ARC Continuity", description: "A structured improvement service keeping a customer platform secure, current and useful after launch.", image: "/assets/generated/case-boxiq-hero.png", href: "/work/box-iq/", tags: ["Application care", "Security", "Roadmap"] },
    ],
    pricing: "Managed support is shaped around service criticality, coverage, response needs and the level of continuous improvement required, with a clear monthly scope.",
    faqs: [
      { question: "What can Casora manage?", answer: "We support web applications, customer portals, websites, integrations and cloud environments where responsibilities and access can be clearly established." },
      { question: "Do you offer service-level agreements?", answer: "Yes. Coverage hours, priorities, response targets and escalation routes can be documented around the importance of each service." },
      { question: "Can you take over an existing system?", answer: "Yes. We begin with technical discovery, access review, documentation and a controlled transition before accepting operational responsibility." },
      { question: "Is improvement included as well as support?", answer: "It can be. Plans may include a regular improvement allowance so maintenance and valuable product changes move forward together." },
    ],
  },
};

const reviews = [
  {
    name: "Nadia Stone",
    role: "Bold Motion",
    quote:
      "Casora made a complicated project feel clear. Each decision was explained, and the finished system is easier for our whole team to use.",
    image: "/assets/generated/team-placeholder-02.png",
  },
  {
    name: "Daniel Reed",
    role: "Summit Systems",
    quote:
      "The team connected design quality with the operational detail we needed. The result feels considered, dependable and ready to grow.",
    image: "/assets/generated/team-placeholder-01.png",
  },
  {
    name: "Maya Cole",
    role: "StudioNova",
    quote:
      "Communication stayed focused from the first workshop through delivery. We always knew what was happening and why it mattered.",
    image: "/assets/generated/team-placeholder-02.png",
  },
] as const;

function FaqList({ faqs }: { faqs: ServiceDetailData["faqs"] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="casora-detail__faq-list">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <article className={`casora-detail__faq-item${isOpen ? " is-open" : ""}`} key={faq.question}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span>{faq.question}</span>
              <span aria-hidden="true" className="casora-detail__faq-icon">{isOpen ? "−" : "+"}</span>
            </button>
            <div className="casora-detail__faq-answer">
              <div><p>{faq.answer}</p></div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function ServiceDetail({ kind }: { kind: ServiceDetailKind }) {
  const detail = serviceDetails[kind];

  return (
    <main className="casora-detail">
      <section className="casora-detail__capabilities" aria-labelledby={`${kind}-capabilities`}>
        <div className="casora-detail__section-heading">
          <p>{detail.label}</p>
          <h2 id={`${kind}-capabilities`}>{detail.title}</h2>
          <div>{detail.introduction}</div>
        </div>
        <div className="casora-detail__capability-grid">
          {detail.capabilities.map((capability) => (
            <article className="casora-detail__capability" key={capability.number}>
              <div className="casora-detail__capability-image">
                <img src={capability.image} alt="" loading="lazy" />
              </div>
              <span>{capability.number}</span>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="casora-detail__process" aria-labelledby={`${kind}-process`}>
        <div className="casora-detail__section-heading">
          <p>How we work</p>
          <h2 id={`${kind}-process`}>Four-stage process.</h2>
          <div>{detail.processIntroduction}</div>
        </div>
        <div className="casora-detail__process-list">
          {stages.map((stage, index) => (
            <article className="casora-detail__process-step" key={stage.title}>
              <div className="casora-detail__process-copy">
                <span>{stage.label}</span>
                <h3>{stage.title}</h3>
                <p>{stage.description}</p>
              </div>
              <div className="casora-detail__process-image">
                <img src={detail.processImages[index]} alt="" loading="lazy" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="casora-detail__work" aria-labelledby={`${kind}-work`}>
        <div className="casora-detail__section-heading">
          <p>Selected work</p>
          <h2 id={`${kind}-work`}>Dive into the work.</h2>
          <div>See how clear thinking, purposeful design and dependable delivery come together in recent Casora projects.</div>
        </div>
        <div className="casora-detail__project-list">
          {detail.projects.map((project) => (
            <article className="casora-detail__project" key={project.title}>
              <a className="casora-detail__project-image" href={project.href}>
                <img src={project.image} alt={`${project.title} project`} loading="lazy" />
              </a>
              <div className="casora-detail__project-copy">
                <div className="casora-detail__tags">
                  {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a href={project.href}>See full case study <span aria-hidden="true">↗</span></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="casora-detail__faq" aria-labelledby={`${kind}-faq`}>
        <div className="casora-detail__section-heading">
          <p>Useful information</p>
          <h2 id={`${kind}-faq`}>Frequently asked questions.</h2>
          <div>Clear answers to common questions about scope, timing, delivery and working with Casora.</div>
        </div>
        <FaqList faqs={detail.faqs} />
      </section>

      <section className="casora-detail__reviews" aria-labelledby={`${kind}-reviews`}>
        <div className="casora-detail__section-heading">
          <p>Client perspective</p>
          <h2 id={`${kind}-reviews`}>What our clients share.</h2>
        </div>
        <div className="casora-detail__review-grid">
          {reviews.map((review) => (
            <article key={review.name}>
              <div>
                <img src={review.image} alt="" loading="lazy" />
                <span><strong>{review.name}</strong><small>{review.role}</small></span>
              </div>
              <p>{review.quote}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
