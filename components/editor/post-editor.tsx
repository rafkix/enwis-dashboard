'use client'

import { useEffect, useMemo, useState } from 'react'

type Locale = 'uz' | 'ru' | 'en'
type Ratio = '16:9' | '4:3' | '1:1' | 'auto'
type PostType = 'news' | 'promo'

type Block =
    | {
        id: string
        type: 'paragraph'
        text: string
    }
    | {
        id: string
        type: 'heading'
        text: string
        level: 2 | 3
    }
    | {
        id: string
        type: 'image'
        url: string
        alt?: string
        caption?: string
        ratio?: Ratio
    }
    | {
        id: string
        type: 'link'
        url: string
        label: string
    }
    | {
        id: string
        type: 'quote'
        text: string
    }
    | {
        id: string
        type: 'youtube'
        url: string
    }
    | {
        id: string
        type: 'gallery'
        items: Array<{
            id: string
            url: string
            alt?: string
            ratio?: Ratio
        }>
    }

type TranslationForm = {
    title: string
    excerpt: string
    blocks: Block[]
}

type EditorValue = {
    type: PostType
    coverImage: string
    sponsorName: string
    sponsorUrl: string
    ctaLabel: string
    ctaUrl: string
    translations: Record<Locale, TranslationForm>
}

type SubmitPayload = {
    type: PostType
    coverImage: string | null
    sponsorName: string | null
    sponsorUrl: string | null
    ctaLabel: string | null
    ctaUrl: string | null
    translations: Array<{
        locale: Locale
        title: string
        excerpt: string | null
        contentJson: string
    }>
    media: []
}

type Props = {
    mode: 'create' | 'edit'
    initialValue: EditorValue
    onSubmit: (payload: SubmitPayload) => Promise<void>
    onDelete?: () => Promise<void>
    onPublishWebsite?: () => Promise<void>
    onPublishTelegram?: () => Promise<void>
    submitting?: boolean
    deleting?: boolean
}

function createId() {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID()
    }
    return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

function deepClone<T>(value: T): T {
    return JSON.parse(JSON.stringify(value))
}

function cloneInitialValue(value: EditorValue): EditorValue {
    return deepClone(value)
}

function createBlock(type: Block['type']): Block {
    switch (type) {
        case 'paragraph':
            return {
                id: createId(),
                type: 'paragraph',
                text: '',
            }

        case 'heading':
            return {
                id: createId(),
                type: 'heading',
                text: '',
                level: 2,
            }

        case 'image':
            return {
                id: createId(),
                type: 'image',
                url: '',
                alt: '',
                caption: '',
                ratio: '16:9',
            }

        case 'link':
            return {
                id: createId(),
                type: 'link',
                url: '',
                label: '',
            }

        case 'quote':
            return {
                id: createId(),
                type: 'quote',
                text: '',
            }

        case 'youtube':
            return {
                id: createId(),
                type: 'youtube',
                url: '',
            }

        case 'gallery':
            return {
                id: createId(),
                type: 'gallery',
                items: [
                    { id: createId(), url: '', alt: '', ratio: '4:3' },
                    { id: createId(), url: '', alt: '', ratio: '4:3' },
                ],
            }
    }
}

function normalizeBlocksForSave(blocks: Block[]) {
    return blocks.map((block) => {
        const { id, ...rest } = block

        if (rest.type === 'gallery') {
            return {
                ...rest,
                items: rest.items.map((item) => {
                    const { id: itemId, ...itemRest } = item
                    return itemRest
                }),
            }
        }

        return rest
    })
}

export function PostEditor({
    mode,
    initialValue,
    onSubmit,
    onDelete,
    onPublishWebsite,
    onPublishTelegram,
    submitting = false,
    deleting = false,
}: Props) {
    const [activeLocale, setActiveLocale] = useState<Locale>('uz')
    const [form, setForm] = useState<EditorValue>(() => cloneInitialValue(initialValue))
    const [actionLoading, setActionLoading] = useState<'website' | 'telegram' | null>(null)
    const [error, setError] = useState('')

    useEffect(() => {
        setForm(cloneInitialValue(initialValue))
    }, [initialValue])

    const currentTranslation = form.translations[activeLocale]

    const jsonPreview = useMemo(() => {
        return JSON.stringify(normalizeBlocksForSave(currentTranslation.blocks), null, 2)
    }, [currentTranslation.blocks])

    function updateRootField<K extends keyof Omit<EditorValue, 'translations'>>(
        key: K,
        value: EditorValue[K]
    ) {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }))
    }

    function updateTranslationField(
        locale: Locale,
        key: keyof TranslationForm,
        value: string | Block[]
    ) {
        setForm((prev) => ({
            ...prev,
            translations: {
                ...prev.translations,
                [locale]: {
                    ...prev.translations[locale],
                    [key]: value,
                },
            },
        }))
    }

    function setBlocks(locale: Locale, updater: (blocks: Block[]) => Block[]) {
        setForm((prev) => ({
            ...prev,
            translations: {
                ...prev.translations,
                [locale]: {
                    ...prev.translations[locale],
                    blocks: updater(prev.translations[locale].blocks),
                },
            },
        }))
    }

    function updateBlock(locale: Locale, blockId: string, patch: Partial<Block>) {
        setBlocks(locale, (blocks) =>
            blocks.map((block) =>
                block.id === blockId ? ({ ...block, ...patch } as Block) : block
            )
        )
    }

    function removeBlock(locale: Locale, blockId: string) {
        setBlocks(locale, (blocks) => blocks.filter((block) => block.id !== blockId))
    }

    function addBlock(locale: Locale, type: Block['type']) {
        setBlocks(locale, (blocks) => [...blocks, createBlock(type)])
    }

    function moveBlock(locale: Locale, blockId: string, direction: 'up' | 'down') {
        setBlocks(locale, (blocks) => {
            const next = [...blocks]
            const index = next.findIndex((block) => block.id === blockId)

            if (index === -1) return blocks

            const targetIndex = direction === 'up' ? index - 1 : index + 1
            if (targetIndex < 0 || targetIndex >= next.length) return blocks

            const temp = next[index]
            next[index] = next[targetIndex]
            next[targetIndex] = temp

            return next
        })
    }

    function clearImageBlock(locale: Locale, blockId: string) {
        setBlocks(locale, (blocks) =>
            blocks.map((block) => {
                if (block.id !== blockId || block.type !== 'image') return block
                return {
                    ...block,
                    url: '',
                    alt: '',
                    caption: '',
                }
            })
        )
    }

    function clearLinkBlock(locale: Locale, blockId: string) {
        setBlocks(locale, (blocks) =>
            blocks.map((block) => {
                if (block.id !== blockId || block.type !== 'link') return block
                return {
                    ...block,
                    url: '',
                    label: '',
                }
            })
        )
    }

    function addGalleryItem(locale: Locale, blockId: string) {
        setBlocks(locale, (blocks) =>
            blocks.map((block) => {
                if (block.id !== blockId || block.type !== 'gallery') return block
                return {
                    ...block,
                    items: [...block.items, { id: createId(), url: '', alt: '', ratio: '4:3' }],
                }
            })
        )
    }

    function updateGalleryItem(
        locale: Locale,
        blockId: string,
        itemId: string,
        patch: Partial<{ url: string; alt?: string; ratio?: Ratio }>
    ) {
        setBlocks(locale, (blocks) =>
            blocks.map((block) => {
                if (block.id !== blockId || block.type !== 'gallery') return block
                return {
                    ...block,
                    items: block.items.map((item) =>
                        item.id === itemId ? { ...item, ...patch } : item
                    ),
                }
            })
        )
    }

    function removeGalleryItem(locale: Locale, blockId: string, itemId: string) {
        setBlocks(locale, (blocks) =>
            blocks.map((block) => {
                if (block.id !== blockId || block.type !== 'gallery') return block
                return {
                    ...block,
                    items: block.items.filter((item) => item.id !== itemId),
                }
            })
        )
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError('')

        try {
            await onSubmit({
                type: form.type,
                coverImage: form.coverImage.trim() || null,
                sponsorName: form.sponsorName.trim() || null,
                sponsorUrl: form.sponsorUrl.trim() || null,
                ctaLabel: form.ctaLabel.trim() || null,
                ctaUrl: form.ctaUrl.trim() || null,
                translations: (['uz', 'ru', 'en'] as const).map((locale) => ({
                    locale,
                    title: form.translations[locale].title.trim(),
                    excerpt: form.translations[locale].excerpt.trim() || null,
                    contentJson: JSON.stringify(
                        normalizeBlocksForSave(form.translations[locale].blocks),
                        null,
                        2
                    ),
                })),
                media: [],
            })
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Xatolik yuz berdi')
        }
    }

    async function handlePublishWebsite() {
        if (!onPublishWebsite) return
        setError('')
        setActionLoading('website')

        try {
            await onPublishWebsite()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Saytga joylashda xatolik')
        } finally {
            setActionLoading(null)
        }
    }

    async function handlePublishTelegram() {
        if (!onPublishTelegram) return
        setError('')
        setActionLoading('telegram')

        try {
            await onPublishTelegram()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Telegramga yuborishda xatolik')
        } finally {
            setActionLoading(null)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4 rounded-2xl border bg-white p-5">
                <h2 className="text-lg font-semibold">Main info</h2>

                <select
                    value={form.type}
                    onChange={(e) => updateRootField('type', e.target.value as PostType)}
                    className="w-full rounded-xl border px-4 py-3"
                >
                    <option value="news">news</option>
                    <option value="promo">promo</option>
                </select>

                <input
                    value={form.coverImage}
                    onChange={(e) => updateRootField('coverImage', e.target.value)}
                    placeholder="Cover image URL"
                    className="w-full rounded-xl border px-4 py-3"
                />

                <input
                    value={form.sponsorName}
                    onChange={(e) => updateRootField('sponsorName', e.target.value)}
                    placeholder="Sponsor name"
                    className="w-full rounded-xl border px-4 py-3"
                />

                <input
                    value={form.sponsorUrl}
                    onChange={(e) => updateRootField('sponsorUrl', e.target.value)}
                    placeholder="Sponsor URL"
                    className="w-full rounded-xl border px-4 py-3"
                />

                <input
                    value={form.ctaLabel}
                    onChange={(e) => updateRootField('ctaLabel', e.target.value)}
                    placeholder="CTA label"
                    className="w-full rounded-xl border px-4 py-3"
                />

                <input
                    value={form.ctaUrl}
                    onChange={(e) => updateRootField('ctaUrl', e.target.value)}
                    placeholder="CTA URL"
                    className="w-full rounded-xl border px-4 py-3"
                />
            </div>

            <div className="rounded-2xl border bg-white p-5">
                <div className="mb-5 flex gap-2">
                    {(['uz', 'ru', 'en'] as Locale[]).map((locale) => (
                        <button
                            key={locale}
                            type="button"
                            onClick={() => setActiveLocale(locale)}
                            className={`rounded-xl border px-4 py-2 text-sm ${activeLocale === locale ? 'bg-slate-900 text-white' : ''
                                }`}
                        >
                            {locale.toUpperCase()}
                        </button>
                    ))}
                </div>

                <div className="space-y-4">
                    <input
                        value={currentTranslation.title}
                        onChange={(e) =>
                            updateTranslationField(activeLocale, 'title', e.target.value)
                        }
                        placeholder="Title"
                        className="w-full rounded-xl border px-4 py-3"
                    />

                    <textarea
                        value={currentTranslation.excerpt}
                        onChange={(e) =>
                            updateTranslationField(activeLocale, 'excerpt', e.target.value)
                        }
                        placeholder="Excerpt"
                        rows={4}
                        className="w-full rounded-xl border px-4 py-3"
                    />
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                    {(['paragraph', 'heading', 'image', 'gallery', 'youtube', 'link', 'quote'] as const).map(
                        (type) => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => addBlock(activeLocale, type)}
                                className="rounded-xl border px-4 py-2 text-sm"
                            >
                                + {type}
                            </button>
                        )
                    )}
                </div>

                <div className="mt-6 space-y-4">
                    {currentTranslation.blocks.length === 0 ? (
                        <div className="rounded-xl border border-dashed p-6 text-sm text-slate-500">
                            Hali block yo‘q
                        </div>
                    ) : (
                        currentTranslation.blocks.map((block, index) => (
                            <div key={block.id} className="space-y-3 rounded-2xl border p-4">
                                <div className="flex items-center justify-between gap-3">
                                    <p className="text-sm font-medium">
                                        #{index + 1} — {block.type}
                                    </p>

                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => moveBlock(activeLocale, block.id, 'up')}
                                            className="rounded-lg border px-3 py-1 text-sm"
                                        >
                                            ↑
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => moveBlock(activeLocale, block.id, 'down')}
                                            className="rounded-lg border px-3 py-1 text-sm"
                                        >
                                            ↓
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => removeBlock(activeLocale, block.id)}
                                            className="rounded-lg border border-red-300 px-3 py-1 text-sm text-red-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>

                                {block.type === 'paragraph' && (
                                    <textarea
                                        value={block.text}
                                        onChange={(e) =>
                                            updateBlock(activeLocale, block.id, { text: e.target.value })
                                        }
                                        rows={5}
                                        className="w-full rounded-xl border px-4 py-3"
                                    />
                                )}

                                {block.type === 'heading' && (
                                    <div className="grid gap-3 md:grid-cols-[120px_1fr]">
                                        <select
                                            value={block.level}
                                            onChange={(e) =>
                                                updateBlock(activeLocale, block.id, {
                                                    level: Number(e.target.value) as 2 | 3,
                                                })
                                            }
                                            className="rounded-xl border px-4 py-3"
                                        >
                                            <option value={2}>H2</option>
                                            <option value={3}>H3</option>
                                        </select>

                                        <input
                                            value={block.text}
                                            onChange={(e) =>
                                                updateBlock(activeLocale, block.id, { text: e.target.value })
                                            }
                                            placeholder="Heading text"
                                            className="w-full rounded-xl border px-4 py-3"
                                        />
                                    </div>
                                )}

                                {block.type === 'image' && (
                                    <div className="space-y-3">
                                        <input
                                            value={block.url}
                                            onChange={(e) =>
                                                updateBlock(activeLocale, block.id, { url: e.target.value })
                                            }
                                            placeholder="Image URL"
                                            className="w-full rounded-xl border px-4 py-3"
                                        />

                                        <input
                                            value={block.alt || ''}
                                            onChange={(e) =>
                                                updateBlock(activeLocale, block.id, { alt: e.target.value })
                                            }
                                            placeholder="Alt text"
                                            className="w-full rounded-xl border px-4 py-3"
                                        />

                                        <input
                                            value={block.caption || ''}
                                            onChange={(e) =>
                                                updateBlock(activeLocale, block.id, { caption: e.target.value })
                                            }
                                            placeholder="Caption"
                                            className="w-full rounded-xl border px-4 py-3"
                                        />

                                        <select
                                            value={block.ratio || '16:9'}
                                            onChange={(e) =>
                                                updateBlock(activeLocale, block.id, {
                                                    ratio: e.target.value as Ratio,
                                                })
                                            }
                                            className="w-full rounded-xl border px-4 py-3"
                                        >
                                            <option value="16:9">16:9</option>
                                            <option value="4:3">4:3</option>
                                            <option value="1:1">1:1</option>
                                            <option value="auto">auto</option>
                                        </select>

                                        <button
                                            type="button"
                                            onClick={() => clearImageBlock(activeLocale, block.id)}
                                            className="rounded-lg border px-3 py-2 text-sm"
                                        >
                                            Clear image
                                        </button>
                                    </div>
                                )}

                                {block.type === 'link' && (
                                    <div className="space-y-3">
                                        <input
                                            value={block.label}
                                            onChange={(e) =>
                                                updateBlock(activeLocale, block.id, { label: e.target.value })
                                            }
                                            placeholder="Link label"
                                            className="w-full rounded-xl border px-4 py-3"
                                        />

                                        <input
                                            value={block.url}
                                            onChange={(e) =>
                                                updateBlock(activeLocale, block.id, { url: e.target.value })
                                            }
                                            placeholder="Link URL"
                                            className="w-full rounded-xl border px-4 py-3"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => clearLinkBlock(activeLocale, block.id)}
                                            className="rounded-lg border px-3 py-2 text-sm"
                                        >
                                            Clear link
                                        </button>
                                    </div>
                                )}

                                {block.type === 'quote' && (
                                    <textarea
                                        value={block.text}
                                        onChange={(e) =>
                                            updateBlock(activeLocale, block.id, { text: e.target.value })
                                        }
                                        rows={4}
                                        placeholder="Quote text"
                                        className="w-full rounded-xl border px-4 py-3"
                                    />
                                )}

                                {block.type === 'youtube' && (
                                    <input
                                        value={block.url}
                                        onChange={(e) =>
                                            updateBlock(activeLocale, block.id, { url: e.target.value })
                                        }
                                        placeholder="YouTube URL"
                                        className="w-full rounded-xl border px-4 py-3"
                                    />
                                )}

                                {block.type === 'gallery' && (
                                    <div className="space-y-3">
                                        {block.items.map((item, itemIndex) => (
                                            <div key={item.id} className="rounded-xl border p-3">
                                                <div className="mb-3 flex items-center justify-between">
                                                    <span className="text-sm text-slate-600">
                                                        Image {itemIndex + 1}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeGalleryItem(activeLocale, block.id, item.id)
                                                        }
                                                        className="rounded-lg border border-red-300 px-3 py-1 text-sm text-red-600"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>

                                                <div className="grid gap-3">
                                                    <input
                                                        value={item.url}
                                                        onChange={(e) =>
                                                            updateGalleryItem(activeLocale, block.id, item.id, {
                                                                url: e.target.value,
                                                            })
                                                        }
                                                        placeholder="Image URL"
                                                        className="w-full rounded-xl border px-4 py-3"
                                                    />

                                                    <input
                                                        value={item.alt || ''}
                                                        onChange={(e) =>
                                                            updateGalleryItem(activeLocale, block.id, item.id, {
                                                                alt: e.target.value,
                                                            })
                                                        }
                                                        placeholder="Alt text"
                                                        className="w-full rounded-xl border px-4 py-3"
                                                    />

                                                    <select
                                                        value={item.ratio || '4:3'}
                                                        onChange={(e) =>
                                                            updateGalleryItem(activeLocale, block.id, item.id, {
                                                                ratio: e.target.value as Ratio,
                                                            })
                                                        }
                                                        className="w-full rounded-xl border px-4 py-3"
                                                    >
                                                        <option value="16:9">16:9</option>
                                                        <option value="4:3">4:3</option>
                                                        <option value="1:1">1:1</option>
                                                        <option value="auto">auto</option>
                                                    </select>
                                                </div>
                                            </div>
                                        ))}

                                        <button
                                            type="button"
                                            onClick={() => addGalleryItem(activeLocale, block.id)}
                                            className="rounded-xl border px-4 py-2 text-sm"
                                        >
                                            + Gallery image
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="rounded-2xl border bg-white p-5">
                <h3 className="text-lg font-semibold">JSON preview</h3>
                <textarea
                    readOnly
                    className="mt-4 min-h-[240px] w-full rounded-xl border bg-slate-50 p-3 font-mono text-xs"
                    value={jsonPreview}
                />
            </div>

            {error ? (
                <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-red-700">
                    {error}
                </div>
            ) : null}

            <div className="flex flex-wrap gap-3">
                <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white disabled:opacity-60"
                >
                    {submitting ? 'Saving...' : mode === 'edit' ? 'Save changes' : 'Create post'}
                </button>

                {onPublishWebsite && (
                    <button
                        type="button"
                        onClick={handlePublishWebsite}
                        disabled={actionLoading !== null}
                        className="rounded-xl border px-5 py-3 text-sm disabled:opacity-60"
                    >
                        {actionLoading === 'website' ? 'Publishing site...' : 'Publish site'}
                    </button>
                )}

                {onPublishTelegram && (
                    <button
                        type="button"
                        onClick={handlePublishTelegram}
                        disabled={actionLoading !== null}
                        className="rounded-xl border px-5 py-3 text-sm disabled:opacity-60"
                    >
                        {actionLoading === 'telegram' ? 'Publishing TG...' : 'Publish TG'}
                    </button>
                )}

                {mode === 'edit' && onDelete && (
                    <button
                        type="button"
                        onClick={onDelete}
                        disabled={deleting || actionLoading !== null}
                        className="rounded-xl border border-red-300 px-5 py-3 text-sm text-red-600 disabled:opacity-60"
                    >
                        {deleting ? 'Deleting...' : 'Delete'}
                    </button>
                )}
            </div>
        </form>
    )
}