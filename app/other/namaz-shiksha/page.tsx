"use client";

export default function NamazShikshaPage() {
  const lessons = [
    {
      title: "নামাজের ভিত্তি",
      content: "নামাজ হল ইসলামের পাঁচটি স্তম্ভের দ্বিতীয় স্তম্ভ। এটি আল্লাহ ও বান্দার মধ্যে সরাসরি সংযোগ।",
    },
    {
      title: "পাঁচটি ওয়াজিব নামাজ",
      content:
        "ফজর, যোহর, আসর, মাগরিব এবং ইশা - প্রতিটি নামাজের নির্দিষ্ট সময় এবং রাকাত রয়েছে।",
    },
    {
      title: "ওজুর গুরুত্ব",
      content:
        "নামাজের আগে ওজু করা অত্যন্ত গুরুত্বপূর্ণ। এটি শারীরিক ও আধ্যাত্মিক পবিত্রতার প্রতীক।",
    },
    {
      title: "নামাজের নিয়ম",
      content:
        "তাকবীর, কিয়াম, রুকু, সিজদা, তাশাহুদ - প্রতিটি অংশের নির্দিষ্ট আদব ও নিয়ম রয়েছে।",
    },
    {
      title: "জামাতে নামাজ",
      content:
        "মসজিদে একসাথে নামাজ পড়ার বিশেষ ফজিলত এবং গুরুত্ব রয়েছে। এটি মুসলিম সম্প্রদায়ের ঐক্যের প্রতীক।",
    },
    {
      title: "বিশেষ নামাজ",
      content:
        "তারাবিহ, তাহাজ্জুদ, ঈদের নামাজ এবং অন্যান্য বিশেষ নামাজের পদ্ধতি ও ফজিলত।",
    },
  ];

  const prayerRakats = [
    {
      name: "ফজর",
      emoji: "🌅",
      rakats: [
        { count: 2, type: "সুন্নত", color: "bg-green-500" },
        { count: 2, type: "ফরজ", color: "bg-red-500" },
      ],
    },
    {
      name: "যোহর",
      emoji: "☀️",
      rakats: [
        { count: 4, type: "সুন্নত", color: "bg-green-500" },
        { count: 4, type: "ফরজ", color: "bg-red-500" },
        { count: 2, type: "সুন্নত", color: "bg-green-500" },
        { count: 2, type: "নফল", color: "bg-purple-500" },
      ],
    },
    {
      name: "জুমু'আ",
      emoji: "☀️",
      rakats: [
        { count: 4, type: "সুন্নত", color: "bg-green-500" },
        { count: 2, type: "ফরজ", color: "bg-red-500" },
        { count: 4, type: "সুন্নত", color: "bg-green-500" },
        { count: 2, type: "সুন্নত", color: "bg-green-500" },
        { count: 2, type: "নফল", color: "bg-purple-500" },
      ],
    },
    {
      name: "আসর",
      emoji: "🌤️",
      rakats: [
        { count: 4, type: "সুন্নত", color: "bg-cyan-400" },
        { count: 4, type: "ফরজ", color: "bg-red-500" },
      ],
    },
    {
      name: "মাগরিব",
      emoji: "🌆",
      rakats: [
        { count: 3, type: "ফরজ", color: "bg-red-500" },
        { count: 2, type: "সুন্নত", color: "bg-green-500" },
        { count: 2, type: "নফল", color: "bg-purple-500" },
      ],
    },
    {
      name: "এশা",
      emoji: "🌙",
      rakats: [
        { count: 4, type: "ফরজ", color: "bg-cyan-400" },
        { count: 4, type: "ফরজ", color: "bg-red-500" },
        { count: 2, type: "সুন্নত", color: "bg-green-500" },
        { count: 2, type: "নফল", color: "bg-purple-500" },
        { count: 3, type: "বিতর", color: "bg-orange-500" },
        { count: 2, type: "নফল", color: "bg-purple-500" },
      ],
    },
  ];

  const legend = [
    { label: "ফরজ", color: "bg-red-500", description: "যেসকল নামাজ মুসলিমদের জন্য পড়া বাধ্যতামূলক।" },
    { label: "ওয়াজিব", color: "bg-orange-500", description: "প্রয়োজনীয় নামাজ যা ফরজ নামাজের পরে গুরুত্বের দিক থেকে আসে।" },
    { label: "সুনতে মুয়াক্কাদা", color: "bg-green-500", description: "ফরজ-ওয়াজিবের মতো অপরিহার্য না হলেও রাসুলুল্লাহ (জ) নিয়মিত আমল করতেন।" },
    { label: "সুনতে গায়রে মুয়াক্কাদা", color: "bg-blue-400", description: "রাসুলুল্লাহ () নিয়মিত আমল করলেও ওজরবিহীন মাঝে-মাঝে ছেড়ে দিতেন।" },
    { label: "নফল", color: "bg-purple-500", description: "স্বেচ্ছায় নামাজ, এগুলো পালন করলে অনেক সওয়াব রয়েছে।" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-3 sm:px-6 py-6 sm:py-10">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <div className="mb-8 sm:mb-12 text-center px-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3">
            🕌 নামাজ শিক্ষা
          </h1>
          <p className="text-sm sm:text-base text-gray-400">
            নামাজের বিধি, বিধান এবং আদব-কায়দা সম্পর্কে সম্পূর্ণ জ্ঞান
          </p>
        </div>

        {/* Lessons Grid */}
        <div className="space-y-3 sm:space-y-4 mb-10 sm:mb-16">
          {lessons.map((lesson, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-blue-500/30 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <h2 className="text-base sm:text-lg font-bold text-blue-400 mb-2">
                {lesson.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-300">
                {lesson.content}
              </p>
            </div>
          ))}
        </div>

        {/* Title for Rakat Display */}
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-400 mb-6 text-center">
          ৫ ওয়াক্ত নামাজের রাকাত সমূহ
        </h2>

        {/* Prayer Rakats Display */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 sm:p-8 mb-8 sm:mb-12 shadow-lg border border-slate-700">
          <div className="space-y-6 sm:space-y-8">
            {prayerRakats.map((prayer, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-slate-700 last:border-0">
                {/* Prayer Name and Emoji */}
                <div className="flex items-center gap-3 sm:w-32 flex-shrink-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-lg sm:text-2xl">
                    {prayer.emoji}
                  </div>
                  <p className="text-lg sm:text-xl font-bold text-white">{prayer.name}</p>
                </div>

                {/* Rakat Circles */}
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {prayer.rakats.map((rakat, idx) => (
                    <div
                      key={idx}
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${rakat.color} flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-md`}
                    >
                      {rakat.count}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-700 mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-400 mb-6 text-center">রাকাত প্রকার ও ব্যাখ্যা</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {legend.map((item, index) => (
              <div key={index} className="flex gap-4 items-start">
                <button
                  className={`${item.color} w-12 h-12 rounded-lg flex-shrink-0 font-bold text-white text-center flex items-center justify-center shadow-md`}
                >
                  {item.label.charAt(0)}
                </button>
                <div className="flex-1">
                  <p className="font-bold text-blue-300 mb-1">{item.label}</p>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
