import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Context = {
  params: Promise<{ id: string }>;
};

export async function POST(_: Request, context: Context) {
  try {
    const { id } = await context.params;

    const news = await prisma.news.findUnique({
      where: { id },
      include: {
        translations: true,
      },
    });

    if (!news) {
      return NextResponse.json(
        { success: false, message: "News topilmadi" },
        { status: 404 },
      );
    }

    if (!news.translations?.length) {
      return NextResponse.json(
        { success: false, message: "Translation topilmadi" },
        { status: 400 },
      );
    }

    const updated = await prisma.news.update({
      where: { id },
      data: {
        websitePublished: true,
        websitePublishedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      data: updated,
      message: "Post saytga joylandi",
    });
  } catch (error) {
    console.error("POST /api/admin/news/[id]/publish-website error:", error);

    return NextResponse.json(
      { success: false, message: "Server xatoligi" },
      { status: 500 },
    );
  }
}
