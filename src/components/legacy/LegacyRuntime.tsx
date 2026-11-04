"use client";

import { useEffect } from "react";

type LegacyRuntimeProps = {
  pageId: string;
  scripts: string[];
};

declare global {
  interface Window {
    Webflow?: unknown;
  }
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
    const toggle = dropdown
      .closest<HTMLElement>(".nav-dropdown")
      ?.querySelector<HTMLElement>(":scope > .nav-link > div");
    if (!list) return;

    const originalList = list.innerHTML;
    const originalHeading = heading?.textContent ?? "";
    const originalToggle = toggle?.textContent ?? "";

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

    restorations.push(() => {
      list.innerHTML = originalList;
      if (heading) heading.textContent = originalHeading;
      if (toggle) toggle.textContent = originalToggle;
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

function setupResponsiveNavigation() {
  const navbar = document.querySelector<HTMLElement>("#legacy-page-root .navbar");
  const button = navbar?.querySelector<HTMLElement>(".menu-button");
  const menu = navbar?.querySelector<HTMLElement>(".nav-menu");
  if (!navbar || !button || !menu) return () => undefined;

  const closeMenu = () => {
    menu.removeAttribute("data-nav-menu-open");
    button.classList.remove("w--open");
    button.setAttribute("aria-expanded", "false");
  };

  const openMenu = () => {
    menu.setAttribute("data-nav-menu-open", "");
    button.classList.add("w--open");
    button.setAttribute("aria-expanded", "true");
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

    if (target.closest(".close_menu") && menu.contains(target)) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      closeMenu();
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
    document.removeEventListener("click", handleClick, true);
    document.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("resize", handleResize);
  };
}

export function LegacyRuntime({ pageId, scripts }: LegacyRuntimeProps) {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("w-mod-js");
    root.dataset.wfSite = "6501f1891917bde75ab542ee";
    root.dataset.wfPage = pageId;

    let cancelled = false;
    const added: HTMLScriptElement[] = [];
    const originalConsoleError = console.error;
    const cleanupFaqAccordions = setupFaqAccordions();
    const cleanupServiceMenu = setupServiceMenu();
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

        await new Promise<void>((resolve) => {
          const script = document.createElement("script");
          script.src = source;
          script.async = false;
          script.dataset.legacyRuntime = "true";
          script.addEventListener("load", () => resolve(), { once: true });
          script.addEventListener("error", () => resolve(), { once: true });
          document.body.appendChild(script);
          added.push(script);
        });

        if (cancelled) return;
      }

      if (cancelled) return;
    };

    void loadScripts();

    return () => {
      cancelled = true;
      added.forEach((script) => script.remove());
      cleanupFaqAccordions();
      cleanupServiceMenu();
      cleanupResponsiveNavigation();
      if (console.error === patchedConsoleError) {
        console.error = originalConsoleError;
      }
    };
  }, [pageId, scripts]);

  return null;
}
