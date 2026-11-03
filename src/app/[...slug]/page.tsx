import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LegacyPage } from "../../components/legacy/LegacyPage";
import {
  getPageDocument,
  hasPageRoute,
  pageRoutes,
} from "../../components/pages/page-registry";

export const dynamicParams = false;

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
  return hasPageRoute(route) ? { title: getPageDocument(route).title } : {};
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
