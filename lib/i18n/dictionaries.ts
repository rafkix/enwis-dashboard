import type { Locale } from "./locales";

import uz from "./messages/uz.json";
import ru from "./messages/ru.json";
import en from "./messages/en.json";

const dictionaries = {
  uz,
  ru,
  en,
} as const;

export async function getDictionary(locale: Locale) {
  return dictionaries[locale] ?? dictionaries.uz;
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;