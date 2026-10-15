import type { Metadata } from "next";
import "./globals.css";
import { TopNav } from "@/components/TopNav";
import { Footer } from "@/components/Footer";
import { QuranPlayerProvider } from "@/components/QuranPlayerContext";

const siteTitle = "Taqwah (তাকওয়া) - নামাজের সময়সূচি, আল-কুরআন অডিও, সহীহ হাদিস ও দোয়া";
const siteDescription =
  "বাংলাদেশের নির্ভরযোগ্য ইসলামিক প্ল্যাটফর্ম তাকওয়া (Taqwah) - নামাজের সঠিক সময়সূচি, লাইভ আজান কাউন্টডাউন, সেহরি ও ইফতারের সময়, সম্পূর্ণ ১১৪ সূরার অডিও তিলাওয়াত ও বাংলা অর্থ, সহীহ হাদিস সংকলন, প্রতিদিনের মাসনূন দোয়া, হিজরি ক্যালেন্ডার এবং ইসলামিক লাইভ টিভি।";

const seoKeywords = [
  // ব্র্যান্ড ও প্ল্যাটফর্ম
  "Taqwah",
  "তাকওয়া",
  "BDF Taqwah",
  "taqwah.bdfamily.net",
  "Bangladesh Family",
  "Islamic app Bangladesh",
  "সেরা ইসলামিক ওয়েবসাইট",

  // নামাজের সময়সূচি ও আজান
  "নামাজের সময়",
  "আজকের নামাজের সময়",
  "নামাজের সময়সূচি",
  "নামাজের সময়সূচী ২০২৬",
  "নামাজের সময়সূচী ঢাকা",
  "ফজরের নামাজের সময়",
  "যোহরের সময়",
  "আসরের সময়",
  "মাগরিবের নামাজের সময়",
  "ইশার নামাজের সময়",
  "আজকের সেহরি ও ইফতারের সময়সূচি",
  "সেহরির শেষ সময়",
  "ইফতারের সময় ঢাকা",
  "তাহাজ্জুদ নামাজের সময়",
  "আজান অ্যালার্ম",
  "আজান টাইমার",
  "লাইভ নামাজের কাউন্টডাউন",
  "Prayer Times Dhaka",
  "Prayer Times Bangladesh",
  "Salat Time Today",
  "Namaz Schedule",
  "Fajr Time",
  "Dhuhr Time",
  "Asr Time",
  "Maghrib Time",
  "Isha Time",
  "Sehri and Iftar Time Bangladesh",
  "Azan Times",

  // আল-কুরআন ও তিলাওয়াত
  "আল-কুরআন",
  "আল কুরআন বাংলা অনুবাদ",
  "কুরআন শরীফ অডিও",
  "১১৪ সূরা অডিও mp3",
  "কুরআন তিলাওয়াত",
  "কুরআন অডিও শুনুন",
  "সূরা ইয়াসিন",
  "সূরা আর রহমান",
  "সূরা মুলক",
  "সূরা কাহাফ",
  "সূরা ওয়াকিয়া",
  "আয়াতুল কুরসি",
  "Holy Quran Audio",
  "Quran Bangla Translation",
  "Surah Yasin Audio",
  "Surah Rahman Audio",
  "Surah Mulk Audio",
  "Surah Kahf",
  "Ayatul Kursi Bangla",
  "Quran Recitation Online",
  "Al Quran MP3",

  // সহীহ হাদিস
  "সহীহ হাদিস",
  "সহীহ বুখারী বাংলা",
  "সহীহ মুসলিম বাংলা",
  "তিরমিজি শরীফ",
  "আবু দাউদ",
  "হাদিস শরীফ",
  "দৈনিক হাদিস",
  "হাদিস সংগ্রহ",
  "সহীহ হাদিস সমগ্র",
  "Hadith in Bengali",
  "Sahih Bukhari Bangla",
  "Sahih Muslim Bangla",
  "Tirmidhi Hadith",
  "Islamic Hadith Collection",
  "Hadith Sharif",

  // দোয়া ও মোনাজাত
  "দোয়া ও মোনাজাত",
  "প্রতিদিনের দোয়া",
  "মাসনূন দোয়া",
  "বিপদ মুক্তির দোয়া",
  "ঘুমানোর দোয়া",
  "ঘুম থেকে ওঠার দোয়া",
  "খাওয়ার দোয়া",
  "দরুদ শরীফ",
  "দরুদ ইব্রাহিম",
  "দোয়ায়ে কুনুত",
  "নামাজের দোয়া ও সানা",
  "তাশাহুদ",
  "আত্তাহিয়্যাতু",
  "ইফতারের দোয়া",
  "রোজার নিয়ত",
  "Masnoon Dua Bangla",
  "Daily Islamic Duas",
  "Durood Ibrahim",
  "Dua Qunoot",
  "Istighfar",
  "Morning and Evening Duas",

  // ইসলামিক ক্যালেন্ডার ও হিজরি
  "ইসলামিক ক্যালেন্ডার",
  "আরবি ক্যালেন্ডার ২০২৬",
  "হিজরি ক্যালেন্ডার",
  "বাংলা ইসলামিক ক্যালেন্ডার",
  "রমজান ক্যালেন্ডার ২০২৬",
  "শবে বরাত",
  "শবে কদর",
  "ঈদুল ফিতর",
  "ঈদুল আজহা",
  "Islamic Calendar 2026",
  "Hijri Calendar 1447",
  "Ramadan Calendar 2026 Bangladesh",
  "Arabic Date Today",

  // অন্যান্য আমল ও লাইভ টিভি
  "ইসলামিক টিভি",
  "মাদানী চ্যানেল লাইভ",
  "ইসলামিক লাইভ টিভি",
  "নামাজ শিক্ষা",
  "পাঁচ ওয়াক্ত নামাজের রাকাত",
  "ডিজিটাল তাসবীহ",
  "তাসবীহ গণনা",
  "রোজার নিয়ম ও নিয়ত",
  "কোরবানির নিয়ম ও মাসায়েল",
  "হাজ্জ ও উমরাহ গাইড",
  "ঈদ ই মিলাদুন্নবী",
  "Islamic TV Live",
  "Namaz Shiksha Bangla",
  "Digital Tasbih Counter",
  "Roza Niyom",
  "Qurbani Rules",
  "Hajj Guide Bangla"
];

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://taqwah.bdfamily.net"),
  title: {
    default: siteTitle,
    template: "%s | Taqwah - নামাজের সময়সূচি ও ইসলামিক প্ল্যাটফর্ম",
  },
  description: siteDescription,
  applicationName: "Taqwah",
  authors: [{ name: "Taqwah", url: "https://taqwah.bdfamily.net" }, { name: "Bangladesh Family", url: "https://www.bdfamily.net" }],
  creator: "Bangladesh Family (BDF)",
  publisher: "Bangladesh Family (BDF)",
  keywords: seoKeywords,
  category: "Religion & Spirituality",
  classification: "Islamic Education, Prayer Times and Quran Application",
  alternates: {
    canonical: "/",
    languages: {
      "bn-BD": "/",
      "en-US": "/?lang=en",
      "ar": "/?lang=ar",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "bn_BD",
    alternateLocale: ["en_US", "ar_SA"],
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

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Taqwah",
  "alternateName": ["তাকওয়া", "BDF Taqwah", "Taqwah Islamic App", "taqwah.bdfamily.net"],
  "url": "https://taqwah.bdfamily.net",
  "description": siteDescription,
  "inLanguage": ["bn-BD", "en-US", "ar"],
  "publisher": {
    "@type": "Organization",
    "name": "Bangladesh Family",
    "url": "https://www.bdfamily.net",
    "logo": "https://taqwah.bdfamily.net/icon.png",
  },
};

const jsonLdWebApplication = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Taqwah (তাকওয়া)",
  "url": "https://taqwah.bdfamily.net",
  "applicationCategory": "LifestyleApplication",
  "operatingSystem": "All (Web, Android, iOS)",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "BDT",
  },
  "featureList": [
    "পাঁচ ওয়াক্ত নামাজের সঠিক সময়সূচি ও আজান",
    "সম্পূর্ণ ১১৪ সূরার অডিও তিলাওয়াত",
    "আল-কুরআন বাংলা অনুবাদ",
    "সহীহ হাদিস সংকলন (বুখারী ও মুসলিম)",
    "দৈনন্দিন মাসনূন দোয়া ও মোনাজাত",
    "ইসলামিক হিজরি ক্যালেন্ডার ও আরবি তারিখ",
    "ইসলামিক টিভি লাইভ স্ট্রিমিং",
    "ডিজিটাল তাসবীহ ও নামাজ শিক্ষা",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebApplication) }}
        />
      </head>
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
