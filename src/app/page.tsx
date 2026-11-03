import type { Metadata } from "next";

import { LegacyPage } from "../components/legacy/LegacyPage";

export const metadata: Metadata = {
  title: { absolute: "Casora Digital" },
};

export default function HomePage() {
  return <LegacyPage route="" />;
}
