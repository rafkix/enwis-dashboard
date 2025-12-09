"use client";

export default function GlobalError({ reset }: { reset: () => void }) {
    return (
        <html>
        <body className="min-h-screen flex flex-col items-center justify-center text-center p-6">
            <h1 className="text-5xl font-bold text-red-600">Something went wrong</h1>
            <p className="text-gray-600 mt-2">
            An unexpected error has occurred.
            </p>

            <button
            onClick={() => reset()}
            className="mt-6 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/80 transition"
            >
            Try Again
            </button>

            <a
            href="/home"
            className="mt-4 text-primary underline text-sm hover:opacity-70"
            >
            Go Home
            </a>
        </body>
        </html>
    );
}
