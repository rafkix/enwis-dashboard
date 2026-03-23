import { prisma } from '@/lib/prisma'
import { generateShortCode } from '@/lib/short-link'

export async function createShortLink(targetUrl: string, newsId?: string) {
  for (let i = 0; i < 10; i += 1) {
    const code = generateShortCode(6)

    const exists = await prisma.shortLink.findUnique({
      where: { code },
      select: { id: true },
    })

    if (exists) continue

    return prisma.shortLink.create({
      data: {
        code,
        targetUrl,
        newsId,
      },
    })
  }

  throw new Error('Short link yaratib bo‘lmadi')
}