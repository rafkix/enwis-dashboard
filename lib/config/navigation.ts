import type { Locale } from "@/lib/i18n/locales";

export type MarketingNavKey =
  | "features"
  | "news"
  | "tests"
  | "pricing"
  | "business"
  | "faq"
  | "ielts"
  | "cefr"
  | "dtm";

export type MarketingSubNavItem = {
  key: "ielts" | "cefr" | "dtm";
  href: string;
  match?: string[];
};

export type MarketingNavItem = {
  key: "features" | "news" | "tests" | "pricing" | "business" | "faq";
  href?: string;
  match?: string[];
  children?: MarketingSubNavItem[];
};

export function getMarketingNavigation(locale: Locale): MarketingNavItem[] {
  return [
    {
      key: "features",
      href: `/${locale}#features`,
      match: [`/${locale}`],
    },
    {
      key: "news",
      href: `/${locale}/news`,
      match: [`/${locale}`],
    },
    {
      key: "tests",
      children: [
        {
          key: "ielts",
          href: `/${locale}/ielts`,
          match: [`/${locale}/ielts`],
        },
        {
          key: "cefr",
          href: `/${locale}/cefr`,
          match: [`/${locale}/cefr`],
        },
        {
          key: "dtm",
          href: `/${locale}/dtm`,
          match: [`/${locale}/dtm`],
        },
      ],
    },
    {
      key: "pricing",
      href: `/${locale}/pricing`,
      match: [`/${locale}/pricing`],
    },
    {
      key: "business",
      href: `/${locale}/business`,
      match: [`/${locale}/business`],
    },
    {
      key: "faq",
      href: `/${locale}#faq`,
      match: [`/${locale}`],
    },
  ];
}
