"use client";

import { useEffect } from "react";

type LegacyRuntimeProps = {
  pageId: string;
  scripts: string[];
};

declare global {
  interface Window {
    Webflow?: { ready?: () => void };
  }
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
      const ready = window.Webflow?.ready;
      if (typeof ready === "function") {
        ready.call(window.Webflow);
      }
    };

    void loadScripts();

    return () => {
      cancelled = true;
      added.forEach((script) => script.remove());
      if (console.error === patchedConsoleError) {
        console.error = originalConsoleError;
      }
    };
  }, [pageId, scripts]);

  return null;
}
