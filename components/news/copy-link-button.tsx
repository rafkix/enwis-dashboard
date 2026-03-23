'use client'

export default function CopyLinkButton({ url }: { url: string }) {
    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(url)
        } catch (error) {
            console.error('Copy failed:', error)
        }
    }

    return (
        <button
            type="button"
            onClick={handleCopy}
            className="rounded-xl border px-4 py-2 text-sm hover:bg-slate-50"
        >
            Copy link
        </button>
    )
}