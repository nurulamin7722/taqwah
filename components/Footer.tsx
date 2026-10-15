import Link from "next/link";

const navLinks = [
  { href: "/", label: "হোম" },
  { href: "/prayer-time", label: "নামাজের সময়" },
  { href: "/quran", label: "আল-কুরআন (অডিও)" },
  { href: "/quran/bengali", label: "আল-কুরআন বাংলা" },
  { href: "/hadith", label: "সহীহ হাদিস" },
  { href: "/dua", label: "দোয়া ও মোনাজাত" },
  { href: "/calendar", label: "ইসলামিক ক্যালেন্ডার" },
  { href: "/islamic-tv", label: "ইসলামিক টিভি" },
  { href: "/other", label: "অন্যান্য বিষয়সমূহ" },
];

const ourServices = [
  { name: "Marriage Services", href: "https://matrimony.bdfamily.net" },
  { name: "Properties", href: "https://properties.bdfamily.net" },
  { name: "Job", href: "https://job.bdfamily.net" },
  { name: "Education", href: "https://edu.bdfamily.net" },
  { name: "Foodies", href: "https://food.bdfamily.net" },
  { name: "BDFSHOP", href: "https://bdfshop.net" },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-slate-50/90 text-slate-700 transition-colors mt-12 sm:mt-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10">
          
          {/* Brand & About Column */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-black shadow-md shadow-emerald-500/20">
                <span className="text-lg font-bold">ت</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-slate-900">
                  TAQWAH
                </span>
                <span className="text-[11px] -mt-1 font-semibold text-emerald-700 tracking-widest">
                  تقوى • ইসলামিক প্ল্যাটফর্ম
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm">
              দৈনন্দিন পাঁচ ওয়াক্ত নামাজের সঠিক সময়সূচি, আল-কুরআন অডিও ও বাংলা অর্থ, সহীহ হাদিস সংকলন এবং মাসনূন দোয়ার নির্ভরযোগ্য প্ল্যাটফর্ম।
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
                বাংলাদেশ ও বিশ্বব্যাপী মুসলমানদের জন্য
              </span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-2">
              প্রয়োজনীয় লিংক
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-600 hover:text-emerald-700 transition-colors flex items-center gap-1.5 group font-medium"
                  >
                    <span className="text-slate-300 group-hover:text-emerald-600 transition-colors">›</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services Column */}
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
                Our Services
              </h3>
              <span className="text-[10px] text-slate-500 font-medium">BDF Network</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2 pt-1">
              {ourServices.map((service) => (
                <a
                  key={service.name}
                  href={service.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-xs transition-all"
                >
                  <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors">
                    {service.name}
                  </span>
                  <span className="text-xs text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Bangladesh Family Link */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs text-slate-600">
          <div>
            <p className="font-semibold text-slate-800">
              © 2026 BDF Taqwah. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <span>A sister concern of</span>
            <a
              href="https://www.bdfamily.net"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-emerald-700 hover:text-emerald-800 underline underline-offset-4 decoration-emerald-400 hover:decoration-emerald-700 transition-all"
            >
              Bangladesh Family
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

