import { aboutUsDocument } from "./documents/about-us";
import { awwwardsArticleDocument } from "./documents/article-awwwards";
import { britishRailArticleDocument } from "./documents/article-british-rail";
import { webEvolutionArticleDocument } from "./documents/article-web-evolution";
import { contactUsDocument } from "./documents/contact-us";
import { homeDocument } from "./documents/home";
import { newsDocument } from "./documents/news";
import { pricingDocument } from "./documents/pricing";
import { servicesDocument } from "./documents/services";
import { graphicDesignDocument } from "./documents/services-graphic-design";
import { softwareDevelopmentDocument } from "./documents/services-software-development";
import { webDesignDocument } from "./documents/services-web-design";
import { webflowDocument } from "./documents/webflow";
import { workDocument } from "./documents/work";
import { boxIqDocument } from "./documents/work-box-iq";
import { drivelodgeDocument } from "./documents/work-drivelodge";
import { hacienDocument } from "./documents/work-hacien";
import { honestWatchDealerDocument } from "./documents/work-honest-watch-dealer";
import { mannsonFreightDocument } from "./documents/work-mannson-freight";
import { mobillioDocument } from "./documents/work-mobillio";

export const pageDocuments = {
  "": homeDocument,
  "about-us": aboutUsDocument,
  "article/60-years-and-still-going-strong-the-british-rail-logo": britishRailArticleDocument,
  "article/awwwards-com-gives-phunk-the-thumbs-up": awwwardsArticleDocument,
  "article/the-evolution-of-web-design": webEvolutionArticleDocument,
  "contact-us": contactUsDocument,
  news: newsDocument,
  pricing: pricingDocument,
  services: servicesDocument,
  "services/graphic-design": graphicDesignDocument,
  "services/software-development": softwareDevelopmentDocument,
  "services/web-design": webDesignDocument,
  webflow: webflowDocument,
  work: workDocument,
  "work/box-iq": boxIqDocument,
  "work/drivelodge": drivelodgeDocument,
  "work/hacien": hacienDocument,
  "work/honest-watch-dealer": honestWatchDealerDocument,
  "work/mannson-freight": mannsonFreightDocument,
  "work/mobillio": mobillioDocument,
} as const;

export type PageRoute = keyof typeof pageDocuments;

export const pageRoutes = Object.keys(pageDocuments).filter(Boolean) as Exclude<PageRoute, "">[];

export function hasPageRoute(route: string): route is PageRoute {
  return route in pageDocuments;
}

export function getPageDocument(route: PageRoute) {
  return pageDocuments[route];
}
