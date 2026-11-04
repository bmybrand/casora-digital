import { aboutUsDocument } from "./documents/about-us";
import { designRecognitionArticleDocument } from "./documents/article-design-recognition";
import { brandSystemsArticleDocument } from "./documents/article-brand-systems";
import { digitalProductsArticleDocument } from "./documents/article-digital-products";
import { contactUsDocument } from "./documents/contact-us";
import { homeDocument } from "./documents/home";
import { newsDocument } from "./documents/news";
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
  "article/building-a-brand-system-that-scales": brandSystemsArticleDocument,
  "article/digital-design-recognition": designRecognitionArticleDocument,
  "article/designing-digital-products-for-change": digitalProductsArticleDocument,
  "contact-us": contactUsDocument,
  news: newsDocument,
  services: servicesDocument,
  "services/graphic-design": graphicDesignDocument,
  "services/software-development": softwareDevelopmentDocument,
  "services/custom-software-development": {
    ...softwareDevelopmentDocument,
    title: "Custom Software Development | Casora Digital",
  },
  "services/cloud-solutions": {
    ...softwareDevelopmentDocument,
    title: "Cloud Solutions | Casora Digital",
  },
  "services/ai-machine-learning": {
    ...softwareDevelopmentDocument,
    title: "AI & Machine Learning | Casora Digital",
  },
  "services/digital-transformation": {
    ...softwareDevelopmentDocument,
    title: "Digital Transformation | Casora Digital",
  },
  "services/it-consulting": {
    ...softwareDevelopmentDocument,
    title: "IT Consulting | Casora Digital",
  },
  "services/managed-services": {
    ...softwareDevelopmentDocument,
    title: "Managed Services | Casora Digital",
  },
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
