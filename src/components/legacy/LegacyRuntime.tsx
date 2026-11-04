"use client";

import { useLayoutEffect } from "react";

type LegacyRuntimeProps = {
  pageId: string;
  scripts: string[];
};

declare global {
  interface Window {
    Webflow?: unknown;
  }
}

const legacyScriptLoads = new Map<string, Promise<void>>();

function loadLegacyScript(source: string) {
  const existingLoad = legacyScriptLoads.get(source);
  if (existingLoad) return existingLoad;

  const load = new Promise<void>((resolve) => {
    const existingScript = Array.from(
      document.querySelectorAll<HTMLScriptElement>("script[data-legacy-runtime='true']"),
    ).find((script) => script.getAttribute("src") === source);
    if (existingScript?.dataset.legacyLoaded === "true") {
      resolve();
      return;
    }

    // Scripts left by an earlier hot-reload pass have already executed, but
    // predate the loaded marker. Reuse them instead of executing Webflow twice.
    if (existingScript && !existingScript.dataset.legacySource) {
      existingScript.dataset.legacySource = source;
      existingScript.dataset.legacyLoaded = "true";
      resolve();
      return;
    }

    const script = existingScript ?? document.createElement("script");
    script.src = source;
    script.async = false;
    script.dataset.legacyRuntime = "true";
    script.dataset.legacySource = source;

    const finish = () => {
      script.dataset.legacyLoaded = "true";
      resolve();
    };

    script.addEventListener("load", finish, { once: true });
    script.addEventListener("error", finish, { once: true });
    if (!existingScript) document.body.appendChild(script);
  });

  legacyScriptLoads.set(source, load);
  return load;
}

function setupFaqAccordions() {
  const dropdowns = Array.from(
    document.querySelectorAll<HTMLElement>("#legacy-page-root .faq_dropdown"),
  );
  const cleanups: Array<() => void> = [];

  const setOpen = (dropdown: HTMLElement, open: boolean) => {
    const toggle = dropdown.querySelector<HTMLElement>(".faq_dropdown_toggle");
    const list = dropdown.querySelector<HTMLElement>(".dropdown-list");
    const content = list?.querySelector<HTMLElement>(".faq_dropdown_inner-wrapper");
    const wasOpen = dropdown.classList.contains("casora-faq-open");

    if (list && open) {
      list.style.setProperty(
        "--casora-faq-open-height",
        `${content?.scrollHeight ?? 0}px`,
      );
    } else if (list && wasOpen) {
      list.style.setProperty(
        "--casora-faq-open-height",
        `${list.getBoundingClientRect().height}px`,
      );
      dropdown.classList.remove("casora-faq-expanded");
      list.getBoundingClientRect();
    } else if (!open) {
      dropdown.classList.remove("casora-faq-expanded");
    }

    dropdown.classList.toggle("casora-faq-open", open);
    toggle?.classList.remove("w--open");
    list?.classList.remove("w--open");
    toggle?.setAttribute("aria-expanded", String(open));
  };

  const handleClick = (event: MouseEvent) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const toggle = target.closest<HTMLElement>(".faq_dropdown_toggle");
    const dropdown = toggle?.closest<HTMLElement>(".faq_dropdown");
    if (!toggle || !dropdown || !dropdowns.includes(dropdown)) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    const shouldOpen = !dropdown.classList.contains("casora-faq-open");
    dropdowns.forEach((item) => setOpen(item, item === dropdown && shouldOpen));
  };

  document.addEventListener("click", handleClick, true);

  dropdowns.forEach((dropdown) => {
    setOpen(dropdown, false);

    const list = dropdown.querySelector<HTMLElement>(".dropdown-list");
    const handleTransitionEnd = (event: TransitionEvent) => {
      if (
        event.target === list &&
        event.propertyName === "height" &&
        dropdown.classList.contains("casora-faq-open")
      ) {
        dropdown.classList.add("casora-faq-expanded");
      }
    };
    list?.addEventListener("transitionend", handleTransitionEnd);

    cleanups.push(() => {
      list?.removeEventListener("transitionend", handleTransitionEnd);
    });
  });

  return () => {
    document.removeEventListener("click", handleClick, true);
    cleanups.forEach((cleanup) => cleanup());
  };
}

const serviceMenuItems = [
  {
    title: "Custom Software Development",
    href: "/services/custom-software-development/",
    icon: '<rect class="casora-menu-icon-fill" x="6" y="8" width="28" height="24" rx="5"/><path d="M6 15h28M15 20l-4 4 4 4M25 20l4 4-4 4M22 19l-4 10"/><circle cx="11" cy="11.5" r="1" fill="currentColor" stroke="none"/><circle cx="15" cy="11.5" r="1" fill="currentColor" stroke="none"/>',
  },
  {
    title: "Cloud Solutions",
    href: "/services/cloud-solutions/",
    icon: '<path class="casora-menu-icon-fill" d="M10 30h20a7 7 0 0 0 .2-14A10 10 0 0 0 11 14.5 8 8 0 0 0 10 30Z"/><path d="M10 30h20a7 7 0 0 0 .2-14A10 10 0 0 0 11 14.5 8 8 0 0 0 10 30ZM20 27V16m-5 5 5-5 5 5"/>',
  },
  {
    title: "AI & Machine Learning",
    href: "/services/ai-machine-learning/",
    icon: '<rect class="casora-menu-icon-fill" x="11" y="11" width="18" height="18" rx="4"/><rect x="11" y="11" width="18" height="18" rx="4"/><path d="M15 6v5M25 6v5M15 29v5M25 29v5M6 15h5M6 25h5M29 15h5M29 25h5"/><circle cx="16.5" cy="18" r="2"/><circle cx="24" cy="16.5" r="2"/><circle cx="22" cy="24" r="2"/><path d="m18.5 17.5 3.5-.7m1 2-.5 3.2M18 19.5l2.5 3"/>',
  },
  {
    title: "Digital Transformation",
    href: "/services/digital-transformation/",
    icon: '<path class="casora-menu-icon-fill" d="m20 14 6 6-6 6-6-6 6-6Z"/><path d="M8 12h19l-4-4M32 28H13l4 4M27 12a12 12 0 0 1 3 14M13 28a12 12 0 0 1-3-14"/><path d="m20 14 6 6-6 6-6-6 6-6Z"/>',
  },
  {
    title: "IT Consulting",
    href: "/services/it-consulting/",
    icon: '<path class="casora-menu-icon-fill" d="M6 20h6v10H6zM28 20h6v10h-6z"/><path d="M8 21v-3a12 12 0 0 1 24 0v3M8 20H5v10h7V20H8ZM32 20h3v10h-7V20h4ZM32 30v1a4 4 0 0 1-4 4h-6"/><circle cx="19" cy="35" r="2" fill="currentColor"/>',
  },
  {
    title: "Managed Services",
    href: "/services/managed-services/",
    icon: '<path class="casora-menu-icon-fill" d="M20 4 33 9v9c0 8-5 14-13 18C12 32 7 26 7 18V9l13-5Z"/><path d="M20 4 33 9v9c0 8-5 14-13 18C12 32 7 26 7 18V9l13-5Z"/><circle cx="20" cy="19" r="5"/><path d="M20 11v3M20 24v3M12 19h3M25 19h3M14.5 13.5l2 2M23.5 22.5l2 2M25.5 13.5l-2 2M16.5 22.5l-2 2"/>',
  },
] as const;

type DeferredSplineApplication = {
  load: (url: string) => Promise<void>;
  dispose?: () => void;
};

function setupDeferredLegacySpline() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(
      '#legacy-page-root [data-animation-type="spline"][data-spline-url]',
    ),
  );
  if (elements.length === 0) return () => undefined;

  let runtimePromise:
    | Promise<{
        Application: new (canvas: HTMLCanvasElement) => DeferredSplineApplication;
      }>
    | undefined;
  const observers: IntersectionObserver[] = [];
  const applications: DeferredSplineApplication[] = [];
  let disposed = false;

  const getRuntime = () => {
    const runtimeUrl = new URL(
      "/npm/@splinetool/runtime/build/runtime.js",
      window.location.href,
    ).href;
    runtimePromise ??= import(
      /* webpackIgnore: true */ runtimeUrl
    ) as Promise<{
      Application: new (canvas: HTMLCanvasElement) => DeferredSplineApplication;
    }>;
    return runtimePromise;
  };

  elements.forEach((element) => {
    const scene = element.dataset.splineUrl;
    if (!scene) return;

    element.removeAttribute("data-animation-type");
    element.removeAttribute("data-spline-url");
    const canvas =
      element.querySelector<HTMLCanvasElement>("canvas") ??
      element.appendChild(document.createElement("canvas"));

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();

        void getRuntime()
          .then(({ Application }) => {
            if (disposed || canvas.clientWidth <= 0 || canvas.clientHeight <= 0) return;
            const application = new Application(canvas);
            applications.push(application);
            return application.load(scene);
          })
          .then(() => {
            if (!disposed) element.classList.add("is-ready");
          })
          .catch(() => {
            // The responsive image inside the section remains as the fallback.
          });
      },
      { rootMargin: "180px 0px" },
    );

    observer.observe(element);
    observers.push(observer);
  });

  return () => {
    disposed = true;
    observers.forEach((observer) => observer.disconnect());
    applications.forEach((application) => {
      if (typeof application.dispose !== "function") return;
      try {
        application.dispose();
      } catch {
        // Detached WebGL canvases are collected by the browser.
      }
    });
  };
}

function setupServiceMenu() {
  const dropdowns = Array.from(
    document.querySelectorAll<HTMLElement>(
      "#legacy-page-root .nav-services_desktop-dropdown",
    ),
  );
  const restorations: Array<() => void> = [];

  dropdowns.forEach((dropdown) => {
    const list = dropdown.querySelector<HTMLElement>(".nav-dropdown_list");
    const heading = dropdown.querySelector<HTMLElement>(
      ".nav-dropdown_header > div:first-child",
    );
    const wrapper = dropdown.closest<HTMLElement>(".nav-dropdown");
    const toggleControl = wrapper?.querySelector<HTMLElement>(":scope > .nav-link");
    const toggle = toggleControl?.querySelector<HTMLElement>(":scope > div");
    if (!list) return;

    const originalList = list.innerHTML;
    const originalHeading = heading?.textContent ?? "";
    const originalToggle = toggle?.textContent ?? "";
    const originalHover = wrapper?.getAttribute("data-hover");

    list.innerHTML = serviceMenuItems
      .map(
        (service) => `
          <li class="nav-dropdown_list-item">
            <a href="${service.href}" class="nav-dropdown_link w-inline-block">
              <div class="nav-dropdown_link-svg-wrapper">
                <svg class="casora-menu-service-icon" viewBox="0 0 40 40" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  ${service.icon}
                </svg>
              </div>
              <div><div class="nav-dropdown_link-heading">${service.title}</div></div>
            </a>
          </li>`,
      )
      .join("");
    if (heading) heading.textContent = "Services";
    if (toggle) toggle.textContent = "Services";
    wrapper?.setAttribute("data-hover", "true");
    toggleControl?.setAttribute("aria-haspopup", "true");

    const preventStickyClick = (event: MouseEvent) => {
      if (window.innerWidth < 992) return;
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    };

    const clearWebflowOpenState = () => {
      toggleControl?.classList.remove("w--open");
      dropdown.classList.remove("w--open");
      toggleControl?.setAttribute("aria-expanded", "false");
    };

    toggleControl?.addEventListener("click", preventStickyClick, true);
    wrapper?.addEventListener("pointerleave", clearWebflowOpenState);

    restorations.push(() => {
      toggleControl?.removeEventListener("click", preventStickyClick, true);
      wrapper?.removeEventListener("pointerleave", clearWebflowOpenState);
      list.innerHTML = originalList;
      if (heading) heading.textContent = originalHeading;
      if (toggle) toggle.textContent = originalToggle;
      if (wrapper && originalHover === null) wrapper.removeAttribute("data-hover");
      else if (wrapper && typeof originalHover === "string") {
        wrapper.setAttribute("data-hover", originalHover);
      }
    });
  });

  document
    .querySelectorAll<HTMLElement>(
      "#legacy-page-root .nav-link.hide-nav-link-on-dkestop .nav-link_heading",
    )
    .forEach((heading) => {
      const original = heading.textContent ?? "";
      heading.textContent = "Services";
      restorations.push(() => {
        heading.textContent = original;
      });
    });

  return () => restorations.forEach((restore) => restore());
}

function setupNavbarScrollState() {
  const navbar = document.querySelector<HTMLElement>("#legacy-page-root .navbar");
  if (!navbar) return () => undefined;

  let frame = 0;
  let ticking = false;
  let lastScrollY = Math.max(window.scrollY, 0);

  const update = () => {
    const scrollY = Math.max(window.scrollY, 0);
    const delta = scrollY - lastScrollY;
    const menuOpen = document.documentElement.classList.contains("casora-menu-open");
    const compact = scrollY > 24;
    let visible = navbar.dataset.casoraNavVisible !== "false";

    if (menuOpen || scrollY <= 24) visible = true;
    else if (delta > 4 && scrollY > 120) visible = false;
    else if (delta < -4) visible = true;

    navbar.dataset.casoraNavScrolled = String(compact);
    navbar.dataset.casoraNavVisible = String(visible);
    lastScrollY = scrollY;
    ticking = false;
  };

  const handleScroll = () => {
    if (ticking) return;
    frame = window.requestAnimationFrame(update);
    ticking = true;
  };

  navbar.dataset.casoraNavVisible = "true";
  update();
  window.addEventListener("scroll", handleScroll, { passive: true });

  return () => {
    window.removeEventListener("scroll", handleScroll);
    window.cancelAnimationFrame(frame);
    delete navbar.dataset.casoraNavScrolled;
    delete navbar.dataset.casoraNavVisible;
  };
}

function setupResponsiveNavigation() {
  const navbar = document.querySelector<HTMLElement>("#legacy-page-root .navbar");
  const button = navbar?.querySelector<HTMLElement>(".menu-button");
  const menu = navbar?.querySelector<HTMLElement>(".nav-menu");
  if (!navbar || !button || !menu) return () => undefined;

  const serviceLinks = serviceMenuItems
    .map(
      (service) => `
        <li class="casora-drawer__item">
          <a class="casora-drawer__link casora-drawer__service-link" href="${service.href}">
            <span>${service.title}</span>
            <span class="casora-drawer__arrow" aria-hidden="true">&#8599;</span>
          </a>
        </li>`,
    )
    .join("");

  menu.insertAdjacentHTML(
    "beforeend",
    `
    <div class="casora-drawer" aria-label="Mobile navigation">
      <div class="casora-drawer__header">
        <a class="casora-drawer__brand" href="/" aria-label="Casora Digital home">
          <img src="/assets/casora-header-logo-250.webp" alt="Casora Digital" width="250" height="47" />
        </a>
        <button class="casora-drawer__close" type="button" aria-label="Close navigation menu">
          <span aria-hidden="true"></span>
        </button>
      </div>
      <div class="casora-drawer__viewport">
        <section class="casora-drawer__panel casora-drawer__panel--main" data-casora-menu-panel="main">
          <p class="casora-drawer__eyebrow">Explore</p>
          <ul class="casora-drawer__list" role="list">
            <li class="casora-drawer__item"><a class="casora-drawer__link" href="/"><span>Home</span><span class="casora-drawer__arrow" aria-hidden="true">&#8599;</span></a></li>
            <li class="casora-drawer__item"><a class="casora-drawer__link" href="/about-us/"><span>About us</span><span class="casora-drawer__arrow" aria-hidden="true">&#8599;</span></a></li>
            <li class="casora-drawer__item">
              <button class="casora-drawer__link casora-drawer__enter" type="button" data-casora-menu-enter="services" aria-controls="casora-services-panel">
                <span>Services</span><span class="casora-drawer__arrow" aria-hidden="true">&#8594;</span>
              </button>
            </li>
            <li class="casora-drawer__item"><a class="casora-drawer__link" href="/work/"><span>Casework</span><span class="casora-drawer__arrow" aria-hidden="true">&#8599;</span></a></li>
            <li class="casora-drawer__item"><a class="casora-drawer__link" href="/news/"><span>Ideas</span><span class="casora-drawer__arrow" aria-hidden="true">&#8599;</span></a></li>
            <li class="casora-drawer__item"><a class="casora-drawer__link" href="/webflow/"><span>No-Code</span><span class="casora-drawer__arrow" aria-hidden="true">&#8599;</span></a></li>
          </ul>
        </section>
        <section id="casora-services-panel" class="casora-drawer__panel casora-drawer__panel--services" data-casora-menu-panel="services" aria-hidden="true">
          <button class="casora-drawer__back" type="button" data-casora-menu-back>
            <span aria-hidden="true">&#8592;</span> Back
          </button>
          <p class="casora-drawer__eyebrow">Our services</p>
          <ul class="casora-drawer__list casora-drawer__list--services" role="list">
            ${serviceLinks}
          </ul>
          <a class="casora-drawer__all-services" href="/services/">View all services <span aria-hidden="true">&#8599;</span></a>
        </section>
      </div>
      <div class="casora-drawer__footer">
        <p>Have a project in mind?</p>
        <a href="/contact-us/">Start a project <span aria-hidden="true">&#8599;</span></a>
      </div>
    </div>`,
  );

  const drawer = menu.querySelector<HTMLElement>(".casora-drawer");
  if (!drawer) return () => undefined;

  const backdrop = document.createElement("button");
  backdrop.type = "button";
  backdrop.className = "casora-drawer-backdrop";
  backdrop.setAttribute("aria-label", "Close navigation menu");
  navbar.appendChild(backdrop);

  const mainPanel = menu.querySelector<HTMLElement>('[data-casora-menu-panel="main"]');
  const servicesPanel = menu.querySelector<HTMLElement>(
    '[data-casora-menu-panel="services"]',
  );

  const showMainPanel = () => {
    menu.removeAttribute("data-casora-submenu");
    mainPanel?.setAttribute("aria-hidden", "false");
    servicesPanel?.setAttribute("aria-hidden", "true");
  };

  const closeMenu = () => {
    menu.removeAttribute("data-nav-menu-open");
    backdrop.removeAttribute("data-nav-menu-open");
    button.classList.remove("w--open");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Open navigation menu");
    document.documentElement.classList.remove("casora-menu-open");
    showMainPanel();
  };

  const openMenu = () => {
    menu.setAttribute("data-nav-menu-open", "");
    backdrop.setAttribute("data-nav-menu-open", "");
    button.classList.add("w--open");
    button.setAttribute("aria-expanded", "true");
    button.setAttribute("aria-label", "Close navigation menu");
    document.documentElement.classList.add("casora-menu-open");
    navbar.dataset.casoraNavVisible = "true";
  };

  const handleClick = (event: MouseEvent) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    if (target.closest(".menu-button") === button) {
      if (window.innerWidth > 1180) return;
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      if (menu.hasAttribute("data-nav-menu-open")) closeMenu();
      else openMenu();
      return;
    }

    if (
      target.closest(".casora-drawer__close") ||
      target.closest(".casora-drawer-backdrop")
    ) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      closeMenu();
      return;
    }

    if (target.closest("[data-casora-menu-enter='services']")) {
      event.preventDefault();
      menu.setAttribute("data-casora-submenu", "services");
      mainPanel?.setAttribute("aria-hidden", "true");
      servicesPanel?.setAttribute("aria-hidden", "false");
      servicesPanel?.querySelector<HTMLElement>(".casora-drawer__back")?.focus();
      return;
    }

    if (target.closest("[data-casora-menu-back]")) {
      event.preventDefault();
      showMainPanel();
      menu
        .querySelector<HTMLElement>("[data-casora-menu-enter='services']")
        ?.focus();
      return;
    }

    const link = target.closest("a");
    if (link && menu.contains(link) && !link.closest(".w-dropdown-toggle")) {
      closeMenu();
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && menu.hasAttribute("data-nav-menu-open")) {
      closeMenu();
      button.focus();
    }
  };

  const handleResize = () => {
    if (window.innerWidth > 1180 && menu.hasAttribute("data-nav-menu-open")) {
      closeMenu();
    }
  };

  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-label", "Open navigation menu");
  document.addEventListener("click", handleClick, true);
  document.addEventListener("keydown", handleKeyDown);
  window.addEventListener("resize", handleResize);

  return () => {
    closeMenu();
    drawer.remove();
    backdrop.remove();
    document.removeEventListener("click", handleClick, true);
    document.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("resize", handleResize);
  };
}

export function LegacyRuntime({ pageId, scripts }: LegacyRuntimeProps) {
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.add("w-mod-js");
    root.dataset.wfSite = "6501f1891917bde75ab542ee";
    root.dataset.wfPage = pageId;

    let cancelled = false;
    const originalConsoleError = console.error;
    const cleanupFaqAccordions = setupFaqAccordions();
    const cleanupDeferredLegacySpline = setupDeferredLegacySpline();
    const cleanupServiceMenu = setupServiceMenu();
    const cleanupNavbarScrollState = setupNavbarScrollState();
    const cleanupResponsiveNavigation = setupResponsiveNavigation();

    const patchedConsoleError = (...args: unknown[]) => {
      const primaryMessage =
        args[0] instanceof Error ? args[0].message : String(args[0] ?? "");
      const message = args
        .map((argument) =>
          argument instanceof Error ? `${argument.message} ${argument.stack ?? ""}` : String(argument),
        )
        .join(" ");

      const normalizedMessage = message.toLowerCase();
      if (
        primaryMessage.trim().toLowerCase() === "missing property" ||
        (normalizedMessage.includes("missing property") &&
          normalizedMessage.includes("splinetool"))
      ) {
        return;
      }
      originalConsoleError(...args);
    };
    console.error = patchedConsoleError;

    const loadScripts = async () => {
      for (const source of scripts) {
        if (cancelled) return;

        await loadLegacyScript(source);

        if (cancelled) return;
      }

      if (cancelled) return;
    };

    // The current hero and navigation are rendered by React and do not depend
    // on Webflow. Let the browser paint them before parsing the legacy
    // interaction bundle used by sections farther down the page.
    let idleHandle: number | undefined;
    let timeoutHandle: number | undefined;
    if (typeof window.requestIdleCallback === "function") {
      idleHandle = window.requestIdleCallback(() => void loadScripts(), { timeout: 1200 });
    } else {
      timeoutHandle = window.setTimeout(() => void loadScripts(), 180);
    }

    return () => {
      cancelled = true;
      if (idleHandle !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle !== undefined) window.clearTimeout(timeoutHandle);
      cleanupFaqAccordions();
      cleanupDeferredLegacySpline();
      cleanupServiceMenu();
      cleanupNavbarScrollState();
      cleanupResponsiveNavigation();
      if (console.error === patchedConsoleError) {
        console.error = originalConsoleError;
      }
    };
  }, [pageId, scripts]);

  return null;
}
