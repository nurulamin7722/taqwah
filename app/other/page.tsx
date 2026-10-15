"use client";

import Link from "next/link";

interface OtherCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  href: string;
}

const categories: OtherCategory[] = [
  {
    id: "namaz-shiksha",
    title: "নামাজ শিক্ষা",
    description: "নামাজ সম্পর্কে বিস্তারিত শিক্ষা ও নিয়মকানুন",
    icon: "🕌",
    color: "from-blue-500 to-blue-600",
    href: "/other/namaz-shiksha",
  },
  {
    id: "tasbeeh",
    title: "তাসবীহ",
    description: "আল্লাহর জিকির ও তাসবীহের পদ্ধতি",
    icon: "📿",
    color: "from-green-500 to-green-600",
    href: "/other/tasbeeh",
  },
  {
    id: "hajj-umrah",
    title: "হাজ্জ ও উমরাহ",
    description: "হাজ্জ ও উমরাহের নিয়ম এবং ধাপসমূহ",
    icon: "🕋️",
    color: "from-purple-500 to-purple-600",
    href: "/other/hajj-umrah",
  },
  {
    id: "qurbani",
    title: "কোরবানি",
    description: "কোরবানির শর্ত এবং পদ্ধতি",
    icon: "🐑",
    color: "from-red-500 to-red-600",
    href: "/other/qurbani",
  },
  {
    id: "eid-milad",
    title: "ঈদ ই মিলাদুন্নাবি",
    description: "রাসূলুল্লাহ (সা.)-এর জন্মদিন উদযাপন",
    icon: "🌙",
    color: "from-yellow-500 to-yellow-600",
    href: "/other/eid-milad",
  },
  {
    id: "roza",
    title: "রোজা",
    description: "রোজার নিয়ম, ফজিলত এবং মাসায়েল",
    icon: "🥤",
    color: "from-amber-500 to-amber-600",
    href: "/other/roza",
  },
];

export default function OtherPage() {
  return (
    <main className="min-h-screen bg-white px-3 sm:px-6 py-8 sm:py-12">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <div className="mb-8 sm:mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-700 mb-2">
            <span>📚 ইসলামিক শিক্ষা ও আমল</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-2">
            অন্যান্য বিষয়সমূহ
          </h1>
          <p className="text-sm sm:text-base text-slate-500 max-w-lg mx-auto">
            দৈনন্দিন ইসলামিক জীবনযাপন, ইবাদত ও মাসআলার প্রয়োজনীয় বিষয়সমূহ
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group"
            >
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all h-full flex flex-col justify-between relative overflow-hidden">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 border border-slate-200 text-3xl group-hover:scale-105 transition-transform duration-300 shadow-2xs">
                      {category.icon}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 group-hover:text-emerald-800 transition-colors">
                      বিস্তারিত →
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                    {category.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-400 group-hover:text-slate-600 transition-colors">
                    ইসলামিক গাইডলাইন
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 group-hover:bg-emerald-600 transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-8 sm:mt-12 bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-center sm:text-left">
            <span className="text-emerald-700 font-bold mr-1">💡 টিপস:</span> প্রতিটি বিষয়ে বিস্তারিত জানকারী ও শিক্ষামূলক তথ্য পাবেন। আপনার ইসলামিক জ্ঞান বৃদ্ধি করুন এবং সঠিক পথে চলুন।
          </p>
        </div>
      </div>
    </main>
  );
}
