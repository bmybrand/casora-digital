import type { Metadata } from "next";

import "./globals.css";

const siteDescription =
  "Casora Digital creates purposeful brands, useful digital experiences and reliable software products.";

const extensionAttributeCleanup = `
(() => {
  const attributes = ["bis_skin_checked", "bis_register", "cz-shortcut-listen"];
  const selector = attributes.map((name) => "[" + name + "]").join(",");

  const clean = (root) => {
    if (!(root instanceof Element)) return;

    for (const name of attributes) root.removeAttribute(name);
    for (const element of root.querySelectorAll(selector)) {
      for (const name of attributes) element.removeAttribute(name);
    }
  };

  clean(document.documentElement);

  const observer = new MutationObserver((records) => {
    for (const record of records) {
      if (record.type === "attributes") {
        const element = record.target;
        for (const name of attributes) element.removeAttribute(name);
        continue;
      }

      for (const node of record.addedNodes) clean(node);
    }
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: attributes,
    childList: true,
    subtree: true,
  });

  window.setTimeout(() => observer.disconnect(), 10000);
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
        url: "/assets/casora-social-preview.png",
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
    images: ["/assets/casora-social-preview.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="w-mod-js" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <script
          id="extension-attribute-cleanup"
          dangerouslySetInnerHTML={{ __html: extensionAttributeCleanup }}
        />
        <link
          href="/6501f1891917bde75ab542ee/css/casora-runtime.shared.e926a3d59.min.css"
          rel="stylesheet"
        />
        <link href="/assets/casora-layout.css?v=20261104-testimonial-replacement" rel="stylesheet" />
        <link href="/assets/current-home-hero.css" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
