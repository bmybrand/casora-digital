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
      if (console.error === patchedConsoleError) {
        console.error = originalConsoleError;
      }
    };
  }, [pageId, scripts]);

  return null;
}
