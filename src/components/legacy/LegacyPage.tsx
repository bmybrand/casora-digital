import { HomeHero } from "../home/HomeHero";
import { PageHero } from "../home/PageHero";
import { getPageDocument, type PageRoute } from "../pages/page-registry";
import { SiteClosing } from "../site/SiteClosing";
import { LegacyRuntime } from "./LegacyRuntime";

type LegacyPageProps = {
  route: PageRoute;
};

export function LegacyPage({ route }: LegacyPageProps) {
  const document = getPageDocument(route);

  return (
    <>
      <div
        id="legacy-page-root"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: document.body }}
      />
      {route === "" ? <HomeHero /> : <PageHero route={route} />}
      <SiteClosing />
      <LegacyRuntime pageId={document.pageId} scripts={document.scripts} />
    </>
  );
}
