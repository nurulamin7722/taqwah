import type { Metadata } from "next";
import "./globals.css";
import { TopNav } from "@/components/TopNav";
import { Footer } from "@/components/Footer";
import { QuranPlayerProvider } from "@/components/QuranPlayerContext";

const siteTitle = "Taqwah - নামাজের সঠিক সময় ও ইসলামিক প্ল্যাটফর্ম";
const siteDescription =
  "আপনার লোকেশন অনুযায়ী নামাজের সঠিক সময়, লাইভ কাউন্টডাউন, সম্পূর্ণ আল-কুরআন অডিও ও বাংলা অর্থ, সহীহ হাদিস ও নিত্যপ্রয়োজনীয় দোয়া।";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://taqwah.bdfamily.net"),
  title: {
    default: siteTitle,
    template: "%s | Taqwah",
  },
  description: siteDescription,
  applicationName: "Taqwah",
  authors: [{ name: "Taqwah" }],
  keywords: [
    "Taqwah",
    "নামাজের সময়",
    "Prayer Times",
    "আল-কুরআন",
    "Quran",
    "সহীহ হাদিস",
    "Hadith",
    "দোয়া",
    "Dua",
    "ইসলামিক ক্যালেন্ডার",
    "Islamic Calendar",
    "Islamic TV",
    "Peace TV Bangla",
    "নমাজ শিক্ষা",
    "রোজা",
    "তাসবীহ",
  ],
  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "/",
    siteName: "Taqwah (تقوى)",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: siteTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body className="relative min-h-screen bg-white text-slate-900 overflow-x-hidden selection:bg-emerald-500/20 selection:text-emerald-800 antialiased">
        {/* Subtle Ambient Background Lights */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute -top-36 left-1/2 -translate-x-1/2 w-[700px] h-[380px] bg-emerald-500/5 rounded-full blur-[140px]" />
          <div className="absolute top-1/3 -left-48 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[160px]" />
          <div className="absolute bottom-12 -right-48 w-[550px] h-[550px] bg-emerald-500/5 rounded-full blur-[160px]" />
        </div>
        <QuranPlayerProvider>
          <TopNav />
          {children}
          <Footer />
        </QuranPlayerProvider>
      </body>
    </html>
  );
}
