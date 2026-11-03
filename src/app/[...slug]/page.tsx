import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LegacyPage } from "../../components/legacy/LegacyPage";
import {
  hasPageRoute,
  pageRoutes,
  type PageRoute,
} from "../../components/pages/page-registry";

export const dynamicParams = false;

const concisePageTitles: Partial<Record<PageRoute, string>> = {
  "article/building-a-brand-system-that-scales": "Brand Systems",
  "article/digital-design-recognition": "Design Recognition",
  "article/designing-digital-products-for-change": "Digital Products",
};

function getConcisePageTitle(route: PageRoute) {
  const routeTitle = concisePageTitles[route] ?? route.split("/").at(-1) ?? route;
  return routeTitle
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function generateStaticParams() {
  return pageRoutes.map((route) => ({ slug: route.split("/") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const route = slug.join("/");
  return hasPageRoute(route) ? { title: getConcisePageTitle(route) } : {};
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const route = slug.join("/");

  if (!hasPageRoute(route) || route === "") notFound();
  return <LegacyPage route={route} />;
}
