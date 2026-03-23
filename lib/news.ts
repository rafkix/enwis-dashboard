import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";
import type {
  NewsBlock,
  NewsLocale,
  NewsTranslationInput,
  NewsMediaInput,
} from "@/lib/news-types";

export const NEWS_LOCALES: NewsLocale[] = ["uz", "ru", "en"];

export type CreateNewsInput = {
  type?: string;
  coverImage?: string | null;
  sponsorName?: string | null;
  sponsorUrl?: string | null;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
  websitePublished?: boolean;
  translations: NewsTranslationInput[];
  media?: NewsMediaInput[];
};

export type UpdateNewsInput = {
  type?: string;
  coverImage?: string | null;
  sponsorName?: string | null;
  sponsorUrl?: string | null;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
  websitePublished?: boolean;
  translations?: NewsTranslationInput[];
  media?: NewsMediaInput[];
};

export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function normalizeOptionalString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function parseNewsBlocks(value: string): NewsBlock[] {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as NewsBlock[]) : [];
  } catch {
    return [];
  }
}

function isValidContentJson(value: unknown): value is string {
  if (!isNonEmptyString(value)) return false;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed);
  } catch {
    return false;
  }
}

function validateMedia(
  input: unknown,
): { ok: true; value: NewsMediaInput[] } | { ok: false; message: string } {
  if (input === undefined) {
    return { ok: true, value: [] };
  }

  if (!Array.isArray(input)) {
    return { ok: false, message: "media array bo‘lishi kerak" };
  }

  const normalized: NewsMediaInput[] = [];

  for (const item of input) {
    if (!isObject(item)) {
      return { ok: false, message: "Har bir media object bo‘lishi kerak" };
    }

    const type = item.type;
    const url = item.url;

    if (!isNonEmptyString(type)) {
      return { ok: false, message: "media type majburiy" };
    }

    if (!["image", "video", "youtube", "file"].includes(type)) {
      return { ok: false, message: "media type noto‘g‘ri" };
    }

    if (!isNonEmptyString(url)) {
      return { ok: false, message: "media url majburiy" };
    }

    normalized.push({
      type: type as NewsMediaInput["type"],
      url: url.trim(),
      thumbnail: normalizeOptionalString(item.thumbnail),
      alt: normalizeOptionalString(item.alt),
      caption: normalizeOptionalString(item.caption),
      sortOrder:
        typeof item.sortOrder === "number" && Number.isFinite(item.sortOrder)
          ? item.sortOrder
          : 0,
    });
  }

  return { ok: true, value: normalized };
}

export async function generateUniqueSlug(locale: NewsLocale, title: string) {
  const baseSlug = slugify(title);
  let slug = baseSlug;
  let count = 1;

  while (
    await prisma.newsTranslation.findUnique({
      where: {
        locale_slug: {
          locale,
          slug,
        },
      },
    })
  ) {
    slug = `${baseSlug}-${count++}`;
  }

  return slug;
}

function validateTranslations(
  input: unknown,
):
  | { ok: true; value: NewsTranslationInput[] }
  | { ok: false; message: string } {
  if (!Array.isArray(input) || input.length === 0) {
    return { ok: false, message: "translations array bo‘lishi kerak" };
  }

  const seenLocales = new Set<string>();
  const translations: NewsTranslationInput[] = [];

  for (const item of input) {
    if (!isObject(item)) {
      return {
        ok: false,
        message: "Har bir translation object bo‘lishi kerak",
      };
    }

    const locale = item.locale;
    const title = item.title;
    const excerpt = item.excerpt;
    const contentJson = item.contentJson;

    if (
      !isNonEmptyString(locale) ||
      !NEWS_LOCALES.includes(locale as NewsLocale)
    ) {
      return { ok: false, message: "locale faqat uz, ru, en bo‘lishi mumkin" };
    }

    if (seenLocales.has(locale)) {
      return { ok: false, message: `Bir xil locale takrorlangan: ${locale}` };
    }

    seenLocales.add(locale);

    if (!isNonEmptyString(title)) {
      return { ok: false, message: `${locale} uchun title majburiy` };
    }

    if (!isValidContentJson(contentJson)) {
      return { ok: false, message: `${locale} uchun contentJson noto‘g‘ri` };
    }

    translations.push({
      locale: locale as NewsLocale,
      title: title.trim(),
      excerpt: normalizeOptionalString(excerpt),
      contentJson,
    });
  }

  return { ok: true, value: translations };
}

export function validateCreateNewsBody(
  body: unknown,
): { ok: true; value: CreateNewsInput } | { ok: false; message: string } {
  if (!isObject(body)) {
    return { ok: false, message: "Body object bo‘lishi kerak" };
  }

  const mediaValidation = validateMedia(body.media);
  if (!mediaValidation.ok) return mediaValidation;

  const translationsValidation = validateTranslations(body.translations);
  if (!translationsValidation.ok) return translationsValidation;

  return {
    ok: true,
    value: {
      type: isNonEmptyString(body.type) ? body.type.trim() : "news",
      coverImage: normalizeOptionalString(body.coverImage),
      sponsorName: normalizeOptionalString(body.sponsorName),
      sponsorUrl: normalizeOptionalString(body.sponsorUrl),
      ctaLabel: normalizeOptionalString(body.ctaLabel),
      ctaUrl: normalizeOptionalString(body.ctaUrl),
      websitePublished:
        typeof body.websitePublished === "boolean"
          ? body.websitePublished
          : false,
      translations: translationsValidation.value,
      media: mediaValidation.value,
    },
  };
}

export function validateUpdateNewsBody(
  body: unknown,
): { ok: true; value: UpdateNewsInput } | { ok: false; message: string } {
  if (!isObject(body)) {
    return { ok: false, message: "Body object bo‘lishi kerak" };
  }

  const mediaValidation = validateMedia(body.media);
  if (!mediaValidation.ok) return mediaValidation;

  let translations: NewsTranslationInput[] | undefined = undefined;
  if (body.translations !== undefined) {
    const translationsValidation = validateTranslations(body.translations);
    if (!translationsValidation.ok) return translationsValidation;
    translations = translationsValidation.value;
  }

  return {
    ok: true,
    value: {
      type: isNonEmptyString(body.type) ? body.type.trim() : undefined,
      coverImage:
        body.coverImage !== undefined
          ? normalizeOptionalString(body.coverImage)
          : undefined,
      sponsorName:
        body.sponsorName !== undefined
          ? normalizeOptionalString(body.sponsorName)
          : undefined,
      sponsorUrl:
        body.sponsorUrl !== undefined
          ? normalizeOptionalString(body.sponsorUrl)
          : undefined,
      ctaLabel:
        body.ctaLabel !== undefined
          ? normalizeOptionalString(body.ctaLabel)
          : undefined,
      ctaUrl:
        body.ctaUrl !== undefined
          ? normalizeOptionalString(body.ctaUrl)
          : undefined,
      websitePublished:
        typeof body.websitePublished === "boolean"
          ? body.websitePublished
          : undefined,
      translations,
      media: body.media !== undefined ? mediaValidation.value : undefined,
    },
  };
}
