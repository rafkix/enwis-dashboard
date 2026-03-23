import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateUniqueSlug, validateCreateNewsBody } from "@/lib/news";

export async function GET() {
  try {
    const news = await prisma.news.findMany({
      include: {
        translations: {
          orderBy: { locale: "asc" },
        },
        media: {
          orderBy: { sortOrder: "asc" },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: news,
    });
  } catch (error) {
    console.error("GET /api/admin/news error:", error);
    return NextResponse.json(
      { success: false, message: "Server xatoligi" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();
    const parsed = validateCreateNewsBody(rawBody);

    if (!parsed.ok) {
      return NextResponse.json(
        { success: false, message: parsed.message },
        { status: 400 },
      );
    }

    const {
      type,
      coverImage,
      sponsorName,
      sponsorUrl,
      ctaLabel,
      ctaUrl,
      websitePublished,
      translations,
      media,
    } = parsed.value;

    const translationsWithSlug = await Promise.all(
      translations.map(async (item) => ({
        locale: item.locale,
        title: item.title,
        excerpt: item.excerpt ?? null,
        contentJson: item.contentJson,
        slug: await generateUniqueSlug(item.locale, item.title),
      })),
    );

    const news = await prisma.news.create({
      data: {
        type,
        coverImage,
        sponsorName,
        sponsorUrl,
        ctaLabel,
        ctaUrl,
        websitePublished,
        websitePublishedAt: websitePublished ? new Date() : null,
        translations: {
          create: translationsWithSlug,
        },
        media: {
          create: (media ?? []).map((item) => ({
            type: item.type,
            url: item.url,
            thumbnail: item.thumbnail ?? null,
            alt: item.alt ?? null,
            caption: item.caption ?? null,
            sortOrder: item.sortOrder ?? 0,
          })),
        },
      },
      include: {
        translations: {
          orderBy: { locale: "asc" },
        },
        media: {
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    return NextResponse.json({ success: true, data: news }, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/news error:", error);
    return NextResponse.json(
      { success: false, message: "Server xatoligi" },
      { status: 500 },
    );
  }
}
