import type { Metadata } from "next";
import Script from "next/script";

import "./globals.css";

const siteDescription =
  "Casora Digital creates purposeful brands, useful digital experiences and reliable software products.";

const extensionHydrationGuard = `
(() => {
  const names = ["bis_skin_checked", "bis_register", "cz-shortcut-listen"];
  const selector = names.map((name) => "[" + name + "]").join(",");
  const clean = (node) => {
    if (!(node instanceof Element)) return;
    for (const name of names) node.removeAttribute(name);
    for (const child of node.querySelectorAll(selector)) {
      for (const name of names) child.removeAttribute(name);
    }
  };

  clean(document.documentElement);
  const observer = new MutationObserver((records) => {
    for (const record of records) {
      if (record.type === "attributes") clean(record.target);
      else for (const node of record.addedNodes) clean(node);
    }
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: names,
    childList: true,
    subtree: true,
  });
})();
`;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.casoradigital.com"),
  title: {
    default: "Casora Digital — Intelligence. Innovation. Impact.",
    template: "%s | Casora Digital",
  },
  description: siteDescription,
  icons: {
    icon: "/assets/casora-favicon-v2.png",
    apple: "/assets/casora-favicon-v2.png",
  },
  openGraph: {
    type: "website",
    siteName: "Casora Digital",
    title: "Casora Digital — Intelligence. Innovation. Impact.",
    description: siteDescription,
    images: [
      {
        url: "/assets/casora-social-preview.webp",
        width: 1200,
        height: 630,
        alt: "Casora Digital — Intelligence. Innovation. Impact.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Casora Digital — Intelligence. Innovation. Impact.",
    description: siteDescription,
    images: ["/assets/casora-social-preview.webp"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="w-mod-js" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <link
          href="/6501f1891917bde75ab542ee/css/casora-runtime.shared.e926a3d59.min.css"
          rel="stylesheet"
        />
        <link href="/assets/casora-layout.css?v=20261106-drawer-close" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Script
          id="extension-hydration-guard"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: extensionHydrationGuard }}
        />
      </body>
    </html>
  );
}
