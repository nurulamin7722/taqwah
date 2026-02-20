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
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-3 sm:px-6 py-6 sm:py-10">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <div className="mb-8 sm:mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3">
            অন্যান্য
          </h1>
          <p className="text-sm sm:text-base text-gray-400">
            ইসলামিক শিক্ষা ও আমলের বিভিন্ন বিষয়
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group"
            >
              <div className={`bg-gradient-to-br ${category.color} rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 h-full cursor-pointer`}>
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
                  {category.title}
                </h2>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                  {category.description}
                </p>
                <div className="mt-4 sm:mt-6 flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-semibold text-white/70">
                    আরও জানুন →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-10 sm:mt-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-xl">
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            <span className="text-emerald-400 font-semibold">💡 টিপস:</span> প্রতিটি বিষয়ে বিস্তারিত জানকারী ও শিক্ষামূলক তথ্য পাবেন। আপনার ইসলামিক জ্ঞান বৃদ্ধি করুন এবং সঠিক পথে চলুন।
          </p>
        </div>
      </div>
    </main>
  );
}
