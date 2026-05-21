import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center radial-night px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl neon-mint">404</h1>
        <p className="mt-4 text-white/70">This page slipped into the night.</p>
        <Link to="/" className="btn-neon mt-8">Go Home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center radial-night px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-4xl neon-mint">Something broke</h1>
        <p className="mt-3 text-white/70 text-sm">{error.message}</p>
        <button
          className="btn-neon mt-6"
          onClick={() => { router.invalidate(); reset(); }}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Mint Arena — Cocktail Bar in Malia, Crete" },
      { name: "description", content: "Mint Arena: open-air cocktail bar in Malia, Crete. Craft cocktails, neon nights, infinite vibes." },
      { property: "og:title", content: "Mint Arena — Malia, Crete" },
      { property: "og:description", content: "One Night. Infinite Vibes. Craft cocktails under the neon in Malia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <div className="min-h-screen bg-[#080808] text-white">
          <Navbar />
          <main className="pt-24">
            <Outlet />
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </QueryClientProvider>
  );
}
