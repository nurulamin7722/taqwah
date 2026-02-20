"use client";

export default function TasbeehPage() {
  const tasbeehList = [
    {
      title: "সুবহানাল্লাহ",
      meaning: "আল্লাহ পবিত্র ও নিষ্কলুষ",
      count: "৩৩",
      benefits: "গুনাহের কাফ্ফারা এবং আত্ম-শুদ্ধি",
    },
    {
      title: "আলহামদুলিল্লাহ",
      meaning: "সকল প্রশংসা আল্লাহের জন্য",
      count: "৩৩",
      benefits: "কৃতজ্ঞতা প্রকাশ এবং নেয়ামতের প্রশংসা",
    },
    {
      title: "আল্লাহু আকবার",
      meaning: "আল্লাহ সর্বশ্রেষ্ঠ",
      count: "৩৪",
      benefits: "আল্লাহর মহত্ত্ব স্বীকার করা",
    },
    {
      title: "লা ইলাহা ইল্লাল্লাহ",
      meaning: "আল্লাহ ব্যতীত কোনো উপাস্য নেই",
      count: "যতবার চান তত",
      benefits: "তাওহীদ এবং আল্লাহর একত্ব প্রতিষ্ঠা",
    },
    {
      title: "আস্তাগফিরুল্লাহ",
      meaning: "আল্লাহর কাছে ক্ষমা চাই",
      count: "যতবার চান তত",
      benefits: "গুনাহের ক্ষমা এবং আত্মবোধ",
    },
    {
      title: "দুরুদ শরীফ",
      meaning: "নবী (সা.)-এর উপর দরুদ পঠানো",
      count: "যতবার চান তত",
      benefits: "নবীর সাথে সংযোগ এবং বরকত লাভ",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-3 sm:px-6 py-6 sm:py-10">
      <div className="mx-auto w-full max-w-4xl">
        {/* Header */}
        <div className="mb-8 sm:mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3">
            📿 তাসবীহ
          </h1>
          <p className="text-sm sm:text-base text-gray-400">
            আল্লাহর জিকির ও তাসবীহের পদ্ধতি এবং ফজিলত
          </p>
        </div>

        {/* Tasbeeh Grid */}
        <div className="space-y-4 sm:space-y-6">
          {tasbeehList.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div className="flex-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-green-400 mb-2">
                    {item.title}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4">
                    "{item.meaning}"
                  </p>
                  <p className="text-sm text-gray-400 mb-2">
                    <span className="font-semibold text-green-300">উপকার:</span> {item.benefits}
                  </p>
                </div>
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-center min-w-[100px]">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-green-400">
                      {item.count}
                    </div>
                    <div className="text-xs sm:text-sm text-green-300 mt-1">বার</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div className="mt-10 sm:mt-16 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-green-500/30 shadow-lg">
          <h3 className="text-lg sm:text-xl font-bold text-green-400 mb-3 sm:mb-4">
            💡 তাসবীহের গুরুত্ব:
          </h3>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-300">
            <li>✅ তাসবীহ মন ও হৃদয়কে প্রশান্ত করে</li>
            <li>✅ গুনাহের কাফ্ফারা হয়</li>
            <li>✅ আল্লাহর সাথে সংযোগ বৃদ্ধি করে</li>
            <li>✅ মেমোরি এবং ফোকাস বাড়ায়</li>
            <li>✅ যেকোনো সময়, যেকোনো জায়গায় করা যায়</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
