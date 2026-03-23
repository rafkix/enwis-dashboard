import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Context = {
  params: Promise<{ id: string }>;
};

type Locale = "uz" | "ru" | "en";

type TranslationInput = {
  locale: Locale;
  title: string;
  excerpt: string | null;
  contentJson: string;
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function generateUniqueSlug(
  tx: typeof prisma,
  locale: Locale,
  title: string,
  excludeTranslationId?: string,
) {
  const baseSlug = slugify(title) || `${locale}-post`;
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await tx.newsTranslation.findFirst({
      where: {
        locale,
        slug,
        ...(excludeTranslationId
          ? {
              NOT: {
                id: excludeTranslationId,
              },
            }
          : {}),
      },
      select: { id: true },
    });

    if (!existing) return slug;

    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }
}

export async function GET(_: Request, context: Context) {
  try {
    const { id } = await context.params;

    const news = await prisma.news.findUnique({
      where: { id },
      include: {
        translations: {
          orderBy: {
            locale: "asc",
          },
        },
        shortLink: true,
        media: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },
    });

    if (!news) {
      return NextResponse.json(
        { success: false, message: "News topilmadi" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: news,
    });
  } catch (error) {
    console.error("GET /api/admin/news/[id] error:", error);

    return NextResponse.json(
      { success: false, message: "Server xatoligi" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request, context: Context) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    const translationsInput = Array.isArray(body?.translations)
      ? (body.translations as TranslationInput[])
      : [];

    const existing = await prisma.news.findUnique({
      where: { id },
      include: {
        translations: true,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "News topilmadi" },
        { status: 404 },
      );
    }

    const allowedTypes = new Set(["news", "promo"]);
    const nextType =
      typeof body?.type === "string" && allowedTypes.has(body.type)
        ? body.type
        : existing.type;

    const updated = await prisma.$transaction(async (tx) => {
      await tx.news.update({
        where: { id },
        data: {
          type: nextType,
          coverImage:
            typeof body?.coverImage === "string" && body.coverImage.trim()
              ? body.coverImage.trim()
              : null,
          sponsorName:
            typeof body?.sponsorName === "string" && body.sponsorName.trim()
              ? body.sponsorName.trim()
              : null,
          sponsorUrl:
            typeof body?.sponsorUrl === "string" && body.sponsorUrl.trim()
              ? body.sponsorUrl.trim()
              : null,
          ctaLabel:
            typeof body?.ctaLabel === "string" && body.ctaLabel.trim()
              ? body.ctaLabel.trim()
              : null,
          ctaUrl:
            typeof body?.ctaUrl === "string" && body.ctaUrl.trim()
              ? body.ctaUrl.trim()
              : null,
        },
      });

      const locales: Locale[] = ["uz", "ru", "en"];

      for (const locale of locales) {
        const t = translationsInput.find((item) => item.locale === locale);
        if (!t) continue;

        const existingTranslation = existing.translations.find(
          (item) => item.locale === locale,
        );

        const safeTitle = typeof t.title === "string" ? t.title.trim() : "";
        const safeExcerpt =
          typeof t.excerpt === "string" && t.excerpt.trim()
            ? t.excerpt.trim()
            : null;
        const safeContentJson =
          typeof t.contentJson === "string" && t.contentJson.trim()
            ? t.contentJson
            : "[]";

        if (existingTranslation) {
          const nextSlug =
            existingTranslation.slug && existingTranslation.slug.trim()
              ? existingTranslation.slug
              : await generateUniqueSlug(
                  tx,
                  locale,
                  safeTitle || `${locale}-post`,
                  existingTranslation.id,
                );

          await tx.newsTranslation.update({
            where: { id: existingTranslation.id },
            data: {
              title: safeTitle,
              excerpt: safeExcerpt,
              contentJson: safeContentJson,
              slug: nextSlug,
            },
          });
        } else {
          const nextSlug = await generateUniqueSlug(
            tx,
            locale,
            safeTitle || `${locale}-post`,
          );

          await tx.newsTranslation.create({
            data: {
              newsId: id,
              locale,
              title: safeTitle,
              excerpt: safeExcerpt,
              contentJson: safeContentJson,
              slug: nextSlug,
            },
          });
        }
      }

      return tx.news.findUnique({
        where: { id },
        include: {
          translations: {
            orderBy: {
              locale: "asc",
            },
          },
          shortLink: true,
          media: {
            orderBy: {
              sortOrder: "asc",
            },
          },
        },
      });
    });

    return NextResponse.json({
      success: true,
      data: updated,
      message: "Post yangilandi",
    });
  } catch (error) {
    console.error("PATCH /api/admin/news/[id] error:", error);

    return NextResponse.json(
      { success: false, message: "Server xatoligi" },
      { status: 500 },
    );
  }
}

export async function DELETE(_: Request, context: Context) {
  try {
    const { id } = await context.params;

    const existing = await prisma.news.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "News topilmadi" },
        { status: 404 },
      );
    }

    await prisma.news.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Post o‘chirildi",
    });
  } catch (error) {
    console.error("DELETE /api/admin/news/[id] error:", error);

    return NextResponse.json(
      { success: false, message: "Server xatoligi" },
      { status: 500 },
    );
  }
}
