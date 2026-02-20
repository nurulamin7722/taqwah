"use client";

export default function HajjUmrahPage() {
  const hajjSteps = [
    {
      step: "১ম পদক্ষেপ",
      title: "হাজ্জের উদ্দেশ্য নির্ধারণ",
      description: "হাজ্জ বা উমরাহ করার ইহ্রাম বেঁধে মিকাতের বাইরে থেকে শুরু করুন।",
    },
    {
      step: "২য় পদক্ষেপ",
      title: "কাবা তাওয়াফ",
      description: "মসজিদুল হারামে প্রবেশ করে কাবার সাতবার ডান দিক থেকে ঘোরান।",
    },
    {
      step: "৩য় পদক্ষেপ",
      title: "সাফা-মারওয়া সাঈ",
      description: "সাফা এবং মারওয়া পাহাড়ের মধ্যে সাতবার দৌড়ান।",
    },
    {
      step: "৪র্থ পদক্ষেপ",
      title: "আরাফায় অবস্থান",
      description: "হাজ্জের মূল ইবাদত - আরাফা প্রান্তরে রিসালাতের দিনের যোহরের পর থেকে সূর্যাস্ত পর্যন্ত থাকুন।",
    },
    {
      step: "৫ম পদক্ষেপ",
      title: "মুজদালিফায় রাত্রি",
      description: "আরাফা থেকে মুজদালিফায় গিয়ে রাত অতিবাহিত করুন।",
    },
    {
      step: "৬ষ্ঠ পদক্ষেপ",
      title: "পাথর নিক্ষেপ",
      description: "মিনা এবং জামরাতে শয়তানের পাথর নিক্ষেপ করুন।",
    },
    {
      step: "৭ম পদক্ষেপ",
      title: "কোরবানি ও মুন্ডন",
      description: "প্রাণী কোরবানি করুন এবং মাথা মুন্ডিয়ে ইহ্রাম খুলুন।",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-3 sm:px-6 py-6 sm:py-10">
      <div className="mx-auto w-full max-w-4xl">
        {/* Header */}
        <div className="mb-8 sm:mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3">
            🕋️ হাজ্জ ও উমরাহ
          </h1>
          <p className="text-sm sm:text-base text-gray-400">
            ইসলামের পঞ্চম স্তম্ভ - হাজ্জ ও উমরাহের নিয়ম ও পদক্ষেপ
          </p>
        </div>

        {/* Hajj Steps */}
        <div className="space-y-4 sm:space-y-6">
          {hajjSteps.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-purple-500/30 border border-purple-500/50">
                    <span className="text-xl sm:text-2xl font-bold text-purple-400">
                      {index + 1}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm sm:text-xs font-semibold text-purple-300 uppercase tracking-wider mb-1">
                    {item.step}
                  </h3>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3">
                    {item.title}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Key Points */}
        <div className="mt-10 sm:mt-16 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-purple-500/30 shadow-lg">
          <h3 className="text-lg sm:text-xl font-bold text-purple-400 mb-3 sm:mb-4">
            💡 গুরুত্বপূর্ণ বিষয়:
          </h3>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-300">
            <li>✅ হাজ্জ প্রতিটি সামর্থ্যবান মুসলিমের উপর বছরে একবার ফরজ</li>
            <li>✅ উমরাহ হল হাজ্জের চেয়ে সংক্ষিপ্ত ইবাদত</li>
            <li>✅ হাজ্জমণ্ডিত ব্যক্তি বিশেষ সম্মান ও পবিত্রতা লাভ করেন</li>
            <li>✅ আল্লাহ সকল হাজ্জীর ক্ষমা করে তাদের গুনাহ মোচন করেন</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
