import { HomeHero } from "../home/HomeHero";
import { HomeTestimonial } from "../home/HomeTestimonial";
import { PageHero } from "../home/PageHero";
import { getPageDocument, type PageRoute } from "../pages/page-registry";
import { SiteClosing } from "../site/SiteClosing";
import { LegacyRuntime } from "./LegacyRuntime";

type LegacyPageProps = {
  route: PageRoute;
};

const initialServiceLinks = [
  ["Custom Software Development", "/services/custom-software-development/"],
  ["Cloud Solutions", "/services/cloud-solutions/"],
  ["AI & Machine Learning", "/services/ai-machine-learning/"],
  ["Digital Transformation", "/services/digital-transformation/"],
  ["IT Consulting", "/services/it-consulting/"],
  ["Managed Services", "/services/managed-services/"],
] as const;

function stabilizeNavigationMarkup(body: string) {
  const serviceItems = initialServiceLinks
    .map(
      ([title, href]) => `
        <li class="nav-dropdown_list-item">
          <a href="${href}" class="nav-dropdown_link w-inline-block">
            <div class="nav-dropdown_link-svg-wrapper">
              <img src="/assets/casora-mark-gray.webp" alt="" class="nav-drodpwon_icon" />
            </div>
            <div><div class="nav-dropdown_link-heading">${title}</div></div>
          </a>
        </li>`,
    )
    .join("");

  return body
    .replace(
      /\/assets\/generated\/([^"'?#\s]+?)\.(?:png|jpe?g)/gi,
      "/assets/generated/$1.webp",
    )
    .replaceAll("/assets/casora-header-logo.png", "/assets/casora-header-logo-250.webp")
    .replaceAll("/assets/casora-mark-gray.png", "/assets/casora-mark-gray.webp")
    .replaceAll(
      "/assets/generated/brand-editorial-warm.png",
      "/assets/generated/brand-editorial-warm.webp",
    )
    .replaceAll(
      "/assets/generated/case-drivelodge-hero.png",
      "/assets/generated/case-drivelodge-hero.webp",
    )
    .replaceAll(
      "/assets/generated/case-hacien-packaging.png",
      "/assets/generated/case-hacien-packaging.webp",
    )
    .replaceAll(
      "/assets/generated/web-ui-warm.png",
      "/assets/generated/web-ui-warm.webp",
    )
    .replaceAll(
      "/assets/generated/mascot-imagination.png",
      "/assets/generated/mascot-imagination.webp",
    )
    .replace(
      'data-hover="false" data-delay="0" class="nav-dropdown w-dropdown"',
      'data-hover="true" data-delay="0" class="nav-dropdown w-dropdown"',
    )
    .replace(
      '<div class="nav-link w-dropdown-toggle"><div>Creative</div>',
      '<div class="nav-link w-dropdown-toggle"><div>Services</div>',
    )
    .replace(
      '<div class="nav-dropdown_header"><div>Creative</div>',
      '<div class="nav-dropdown_header"><div>Services</div>',
    )
    .replace(
      '<div class="nav-link_heading">Creative</div>',
      '<div class="nav-link_heading">Services</div>',
    )
    .replace(
      /(<ul role="list" class="nav-dropdown_list w-list-unstyled">)[\s\S]*?(<\/ul>)/,
      `$1${serviceItems}$2`,
    );
}

export function LegacyPage({ route }: LegacyPageProps) {
  const document = getPageDocument(route);
  const body = stabilizeNavigationMarkup(document.body);

  return (
    <>
      {route === "" ? null : <PageHero route={route} />}
      <div
        id="legacy-page-root"
        data-casora-home={route === "" ? "true" : undefined}
        data-casora-service-detail={
          route.startsWith("services/") ? "true" : undefined
        }
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: body }}
      />
      {route === "" ? <HomeHero /> : null}
      {route === "" ? <HomeTestimonial /> : null}
      <SiteClosing />
      <LegacyRuntime pageId={document.pageId} scripts={document.scripts} />
    </>
  );
}
