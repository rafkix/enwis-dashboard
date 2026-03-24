import type { Locale } from "./locales";

const dictionaries = {
  uz: () => import("./messages/uz.json").then((m) => m.default),
  ru: () => import("./messages/ru.json").then((m) => m.default),
  en: () => import("./messages/en.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
