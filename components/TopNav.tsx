"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "হোম" },
  { href: "/quran", label: "আল-কুরআন" },
  { href: "/quran/bengali", label: "আল-কুরআন বাংলা" },
  { href: "/hadith", label: "হাদিস" },
  { href: "/dua", label: "দোয়া" },
  { href: "/prayer-time", label: "নামাজের সময়" },
  { href: "/islamic-tv", label: "ইসলামিক টিভি" },
  { href: "/calendar", label: "ক্যালেন্ডার" },
  { href: "/other", label: "অন্যান্য" },
];

// Prefetch video resource
const prefetchVideo = () => {
  const videoUrl = "https://dzkyvlfyge.erbvr.com/PeaceTvBangla/index.m3u8";
  if (document.querySelector('link[data-prefetch="islamic-tv"]')) {
    return;
  }
  if ("preload" in document) {
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = videoUrl;
    link.as = "fetch";
    link.crossOrigin = "anonymous";
    link.dataset.prefetch = "islamic-tv";
    document.head.appendChild(link);
  }
};

export function TopNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200/90 bg-white/80 backdrop-blur-xl transition-all duration-300 shadow-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-3.5 sm:px-6 py-2.5 sm:py-3.5">
        {/* Brand Logo & Name */}
        <Link href="/" className="group flex items-center gap-2.5 flex-shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-black shadow-md shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all duration-300 transform group-hover:scale-105">
            <span className="text-base font-bold">ت</span>
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
              TAQWAH
            </span>
            <span className="text-[10px] -mt-1 font-semibold text-emerald-600 tracking-widest">
              تقوى
            </span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2">
          <div className="flex w-fit items-center gap-1 rounded-full border border-slate-200/90 bg-slate-100/80 backdrop-blur-xl p-1.5 shadow-sm">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const isIslamicTv = item.href === "/islamic-tv";
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  onPointerEnter={isIslamicTv ? prefetchVideo : undefined}
                  onFocus={isIslamicTv ? prefetchVideo : undefined}
                  onTouchStart={isIslamicTv ? prefetchVideo : undefined}
                  className={`relative rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/25 font-bold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden relative">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="মেনু খুলুন"
            className="flex items-center justify-center rounded-xl p-2.5 text-slate-700 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 transition-all shadow-sm"
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="absolute right-0 mt-2.5 w-56 rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-2xl shadow-xl p-2 overflow-hidden z-50">
              <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
                ন্যাভিগেশন মেনু
              </div>
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const isIslamicTv = item.href === "/islamic-tv";
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    onPointerEnter={isIslamicTv ? prefetchVideo : undefined}
                    onFocus={isIslamicTv ? prefetchVideo : undefined}
                    onTouchStart={isIslamicTv ? prefetchVideo : undefined}
                    className={`block px-3.5 py-2.5 text-xs font-semibold rounded-xl transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold shadow-md shadow-emerald-600/20"
                        : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <div className="h-9 w-9 flex-shrink-0 hidden md:block" />
      </div>
    </nav>
  );
}
