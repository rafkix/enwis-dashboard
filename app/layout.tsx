import { Analytics } from "@vercel/analytics/next";
import Script from 'next/script'
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <Analytics />
      <Script id="yandex-init" strategy="afterInteractive">
        {`window.yaContextCb = window.yaContextCb || [];`}
      </Script>

      <Script 
        src="https://yandex.ru/ads/system/context.js"
        strategy="afterInteractive"
      />
      <body>{children}</body>
    </html>
  );
}