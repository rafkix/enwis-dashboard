import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type Context = {
  params: Promise<{ code: string }>
}

export async function GET(_: Request, context: Context) {
  const { code } = await context.params

  const shortLink = await prisma.shortLink.findUnique({
    where: { code },
  })

  if (!shortLink) {
    return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_SITE_URL))
  }

  await prisma.shortLink.update({
    where: { code },
    data: {
      clicks: {
        increment: 1,
      },
    },
  })

  return NextResponse.redirect(shortLink.targetUrl)
}