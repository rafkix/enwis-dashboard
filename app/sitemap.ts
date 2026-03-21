import { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/locales";
import { siteConfig } from "@/lib/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const routes = ["", "/cefr", "/ielts", "/dtm"];

  const sitemap: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
      });
    });
  });

  return sitemap;
}
