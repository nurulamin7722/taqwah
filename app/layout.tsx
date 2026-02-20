import type { Metadata } from "next";
import "./globals.css";
import { TopNav } from "@/components/TopNav";
import { QuranPlayerProvider } from "@/components/QuranPlayerContext";

export const metadata: Metadata = {
  title: "Taqwah",
  description: "Get accurate prayer times for your location",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75' fill='%2310b981'>🌙</text></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
        <QuranPlayerProvider>
          <TopNav />
          {children}
        </QuranPlayerProvider>
      </body>
    </html>
  );
}
