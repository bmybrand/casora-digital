import type { Metadata } from "next";

import { LegacyPage } from "../components/legacy/LegacyPage";
import { getPageDocument } from "../components/pages/page-registry";

export const metadata: Metadata = {
  title: getPageDocument("").title,
};

export default function HomePage() {
  return <LegacyPage route="" />;
}
