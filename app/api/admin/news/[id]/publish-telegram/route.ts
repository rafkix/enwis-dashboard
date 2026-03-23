import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createShortLink } from "@/lib/create-short-link";

type Context = {
  params: Promise<{ id: string }>;
};

type TelegramResponse = {
  ok: boolean;
  result?: {
    message_id?: number;
  };
  description?: string;
};

function getBaseUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/+$/, "");
}

function buildPostUrl(baseUrl: string, locale: string, slug: string) {
  return `${baseUrl}/${locale}/news/${slug}`;
}

function buildShortUrl(baseUrl: string, code?: string | null) {
  if (!code) return null;
  return `${baseUrl}/s/${code}`;
}

function buildImageUrl(siteUrl: string, coverImage?: string | null) {
  if (!coverImage) return null;

  if (coverImage.startsWith("http://") || coverImage.startsWith("https://")) {
    return coverImage;
  }

  return `${siteUrl}${coverImage.startsWith("/") ? coverImage : `/${coverImage}`}`;
}

async function sendTelegramRequest(
  botToken: string,
  method: "sendPhoto" | "sendMessage",
  payload: Record<string, unknown>
): Promise<TelegramResponse> {
  const response = await fetch(`https://api.telegram.org/bot${botToken}/${method}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);

  if (!data || typeof data !== "object") {
    return {
      ok: false,
      description: "Telegram noto‘g‘ri javob qaytardi",
    };
  }

  return data as TelegramResponse;
}

export async function POST(req: Request, context: Context) {
  try {
    const { id } = await context.params;
    const body = await req.json().catch(() => ({}));
    const locale = typeof body.locale === "string" ? body.locale : "uz";

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const channelId = process.env.TELEGRAM_CHANNEL_ID;
    const siteUrl = getBaseUrl();

    if (!botToken || !channelId || !siteUrl) {
      return NextResponse.json(
        { success: false, message: "Telegram yoki site env sozlanmagan" },
        { status: 500 }
      );
    }

    const news = await prisma.news.findUnique({
      where: { id },
      include: {
        shortLink: true,
        translations: {
          where: { locale },
          select: {
            locale: true,
            title: true,
            excerpt: true,
            slug: true,
          },
        },
      },
    });

    if (!news) {
      return NextResponse.json(
        { success: false, message: "News topilmadi" },
        { status: 404 }
      );
    }

    if (!news.websitePublished) {
      return NextResponse.json(
        {
          success: false,
          message: "Avval postni saytga publish qilish kerak",
        },
        { status: 400 }
      );
    }

    const translation = news.translations[0];

    if (!translation) {
      return NextResponse.json(
        {
          success: false,
          message: "Tanlangan til uchun translation topilmadi",
        },
        { status: 400 }
      );
    }

    const canonicalUrl = buildPostUrl(siteUrl, locale, translation.slug);

    let shortLink = news.shortLink;

    if (!shortLink) {
      shortLink = await createShortLink(canonicalUrl, news.id);
    } else if (shortLink.targetUrl !== canonicalUrl) {
      shortLink = await prisma.shortLink.update({
        where: { id: shortLink.id },
        data: {
          targetUrl: canonicalUrl,
        },
      });
    }

    const shortUrl = buildShortUrl(siteUrl, shortLink.code) || canonicalUrl;
    const imageUrl = buildImageUrl(siteUrl, news.coverImage);

    const caption = [
      `📢 ${translation.title}`,
      translation.excerpt?.trim(),
      `Batafsil: ${shortUrl}`,
    ]
      .filter(
        (item): item is string =>
          typeof item === "string" && item.trim() !== ""
      )
      .join("\n\n");

    let telegramResult: TelegramResponse;

    if (imageUrl) {
      telegramResult = await sendTelegramRequest(botToken, "sendPhoto", {
        chat_id: channelId,
        photo: imageUrl,
        caption,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Batafsil",
                url: shortUrl,
              },
            ],
          ],
        },
      });
    } else {
      telegramResult = await sendTelegramRequest(botToken, "sendMessage", {
        chat_id: channelId,
        text: caption,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Batafsil",
                url: shortUrl,
              },
            ],
          ],
        },
      });
    }

    if (!telegramResult.ok) {
      return NextResponse.json(
        {
          success: false,
          message: telegramResult.description || "Telegramga yuborishda xatolik",
          error: telegramResult,
        },
        { status: 500 }
      );
    }

    const updated = await prisma.news.update({
      where: { id },
      data: {
        telegramPublished: true,
        telegramPublishedAt: new Date(),
        telegramMessageId: String(telegramResult.result?.message_id || ""),
      },
      include: {
        translations: {
          orderBy: {
            locale: "asc",
          },
        },
        shortLink: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: updated,
      message: "Telegramga muvaffaqiyatli yuborildi",
    });
  } catch (error) {
    console.error("POST /api/admin/news/[id]/publish-telegram error:", error);

    return NextResponse.json(
      { success: false, message: "Server xatoligi" },
      { status: 500 }
    );
  }
}