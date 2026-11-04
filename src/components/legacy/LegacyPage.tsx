import { HomeHero } from "../home/HomeHero";
import { HomeTestimonial } from "../home/HomeTestimonial";
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
        data-casora-home={route === "" ? "true" : undefined}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: document.body }}
      />
      {route === "" ? <HomeHero /> : <PageHero route={route} />}
      {route === "" ? <HomeTestimonial /> : null}
      <SiteClosing />
      <LegacyRuntime pageId={document.pageId} scripts={document.scripts} />
    </>
  );
}
