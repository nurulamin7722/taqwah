import type { Metadata } from "next";
import "./globals.css";
import { TopNav } from "@/components/TopNav";
import { QuranPlayerProvider } from "@/components/QuranPlayerContext";

export const metadata: Metadata = {
  title: "Taqwah",
  description: "Get accurate prayer times for your location",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
        <QuranPlayerProvider>
          <TopNav />
          {children}
        </QuranPlayerProvider>
      </body>
    </html>
  );
}
