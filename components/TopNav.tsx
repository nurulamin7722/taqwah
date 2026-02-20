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
  { href: "/calendar", label: "ক্যালেন্ডার" },
  { href: "/other", label: "অন্যান্য" },
];

export function TopNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800/60 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-3 sm:px-6 py-3 sm:py-4">
        <div className="text-lg sm:text-lg font-bold text-emerald-300 flex-shrink-0">تقوى</div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2">
          <div className="flex w-fit items-center gap-1 sm:gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-1.5 sm:px-2 py-1.5 sm:py-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-full px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? "bg-emerald-500 text-slate-900 shadow-lg shadow-emerald-500/40"
                      : "text-slate-200 hover:bg-slate-800/80"
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
            className="rounded-lg p-2 text-slate-200 hover:bg-slate-800/80 transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg border border-slate-700 bg-slate-900 shadow-xl overflow-hidden">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-emerald-500 text-slate-900"
                        : "text-slate-200 hover:bg-slate-800"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <div className="h-6 w-6 flex-shrink-0 hidden md:block" />
      </div>
    </nav>
  );
}
