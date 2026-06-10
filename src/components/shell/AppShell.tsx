import { TopBar } from './TopBar'
import { Footer } from './Footer'

// App-shell: fixed TopBar + a single scrollable main column. now.gg's homepage has
// NO left nav rail. The ambient pink glow is FIXED to the viewport (bottom-left) so
// it stays put while the content scrolls.
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-page-bg">
      <div className="pointer-events-none fixed inset-0 z-0 bg-glow-page" aria-hidden />
      <TopBar />
      <main className="scroll-thin relative z-10 min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto max-w-content space-y-10 px-4 py-6 md:px-6">{children}</div>
        <Footer />
      </main>
    </div>
  )
}
