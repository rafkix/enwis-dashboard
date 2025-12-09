/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
        colors: {
            lunix: "#b0fc40",
            aether: "#e8e8dc",
            obscure: "#0c3033",
            verdix: "#2ec500",
            skylen: "#2b85ff",

            // Semantic colors
            background: {
            DEFAULT: "hsl(var(--background))",
            dark: "hsl(var(--background-dark))",
            },
            foreground: {
            DEFAULT: "hsl(var(--foreground))",
            dark: "hsl(var(--foreground-dark))",
            },
            card: "hsl(var(--card))",
            border: "hsl(var(--border))",
            primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
            },
            muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
            },
        },

        borderRadius: {
            xl: "1rem",
            "2xl": "1.35rem",
            "3xl": "1.75rem",
        },

        boxShadow: {
            soft: "0 4px 20px rgba(0,0,0,0.08)",
            glass: "inset 0 0 0 1px rgba(255,255,255,0.15)",
        }
        },
    },
    plugins: [],
};
