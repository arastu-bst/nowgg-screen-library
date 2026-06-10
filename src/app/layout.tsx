import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'now.gg — design handoff',
  description: 'Design-only replica of now.gg (homepage + game page) for developer handoff.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Bricolage Grotesque — now.gg's typeface. Loaded via <link> (not next/font)
            so the build never depends on network access at build time. The Tailwind
            `sans` stack falls back to the literal family name when the var is unset. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-page-bg text-text-primary antialiased">{children}</body>
    </html>
  )
}
