'use client'

import { useRouter } from 'next/navigation'
import { PostEditor } from '@/components/editor/post-editor'

function createEmptyBlocks() {
    return [
        {
            id: crypto.randomUUID(),
            type: 'paragraph' as const,
            text: '',
        },
    ]
}

export default function NewNewsPage() {
    const router = useRouter()

    const initialValue = {
        type: 'news',
        coverImage: '',
        sponsorName: '',
        sponsorUrl: '',
        ctaLabel: '',
        ctaUrl: '',
        translations: {
            uz: {
                title: '',
                excerpt: '',
                blocks: createEmptyBlocks(),
            },
            ru: {
                title: '',
                excerpt: '',
                blocks: createEmptyBlocks(),
            },
            en: {
                title: '',
                excerpt: '',
                blocks: createEmptyBlocks(),
            },
        },
    }

    return (
        <main>
            <h1 className="text-3xl font-bold">New post</h1>

            <div className="mt-8">
                <PostEditor
                    mode="create"
                    initialValue={initialValue}
                    onSubmit={async (payload) => {
                        const res = await fetch('/api/admin/news', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload),
                        })

                        const data = await res.json().catch(() => null)

                        if (!res.ok || !data?.success || !data?.data?.id) {
                            throw new Error(data?.message || 'Yaratishda xatolik')
                        }

                        router.push(`/admin/news/${data.data.id}`)
                        router.refresh()
                    }}
                />
            </div>
        </main>
    )
}