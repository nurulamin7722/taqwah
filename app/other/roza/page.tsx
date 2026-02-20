"use client";

export default function RozaPage() {
  const rules = [
    {
      title: "রোজার নিয়ত",
      description:
        "রমজান মাসের প্রতিটি দিনের ফজরের আগে রোজার নিয়ত করা আবশ্যক। নিয়ত হল মনের সংকল্প।",
    },
    {
      title: "সেহরি খাওয়া",
      description:
        "ফজরের আজান হওয়ার আগে খাবার খাওয়া (সেহরি) রোজাকে সহজ করে দেয়। নবী (সা.) সেহরি খাওয়ার নির্দেশ দিয়েছেন।",
    },
    {
      title: "ইফতার করা",
      description:
        "মাগরিবের সময় রোজা ভাঙা হয়। খেজুর দিয়ে ইফতার করা সুন্নত। রোজা ভাঙার আগে দোয়া পড়ার নিয়ম আছে।",
    },
    {
      title: "পানাহার বর্জন",
      description:
        "ফজর থেকে মাগরিব পর্যন্ত সব ধরনের পানাহার থেকে বিরত থাকতে হয়। এটি রোজার মূল শর্ত।",
    },
    {
      title: "স্ত্রীসঙ্গম থেকে বিরত",
      description:
        "রোজার অবস্থায় স্ত্রীসঙ্গম হারাম। এটি রোজা ভেঙে দেয় এবং কাফফারা লাগে।",
    },
    {
      title: "তারাবীহ নামাজ",
      description:
        "রমজান মাসে প্রতি রাতে বিশেষ 'তারাবীহ' নামাজ পড়া হয়। এতে সম্পূর্ণ কোরান শোনা যায়।",
    },
  ];

  const benefits = [
    "আত্মসংযম এবং আত্মনিয়ন্ত্রণের শিক্ষা",
    "গরীব ও অসহায়দের প্রতি সহানুভূতি অর্জন",
    "আল্লাহর প্রতি আনুগত্য ও অনুগত্বের প্রকাশ",
    "শারীরিক ও মানসিক স্বাস্থ্যের উন্নতি",
    "পাপ থেকে মুক্তি ও ক্ষমার সুযোগ",
    "জীবনযাত্রার মান উন্নয়ন",
  ];

  const fasting_types = [
    {
      name: "ফরজ রোজা",
      description: "রমজান মাসের পুরো মাস রোজা রাখা প্রতিটি মুসলিমের জন্য ফরজ।",
    },
    {
      name: "ওয়াজিব রোজা",
      description:
        "নির্দিষ্ট দিনের রোজা যেমন কদর রাত্রির পরের দিন বা ঈদের দিন পর রোজা।",
    },
    {
      name: "সুন্নত রোজা",
      description:
        "নবী (সা.)-এর সুন্নত অনুযায়ী নির্দিষ্ট দিনের রোজা যেমন আশুরার দিন বা প্রতি মাসের ১৩, ১৪, ১৫ তারিখে রোজা।",
    },
    {
      name: "নফল রোজা",
      description:
        "স্বেচ্ছায় গৃহীত অতিরিক্ত রোজা যা নেকির কাজ হিসেবে গণ্য হয়।",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-3 sm:px-6 py-6 sm:py-10">
      <div className="mx-auto w-full max-w-4xl">
        {/* Header */}
        <div className="mb-8 sm:mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3">
            🥤 রোজা
          </h1>
          <p className="text-sm sm:text-base text-gray-400">
            রমজানের রোজা - ইসলামের তৃতীয় স্তম্ভ
          </p>
        </div>

        {/* Rules Section */}
        <div className="mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-amber-400 mb-6 sm:mb-8 text-center">
            রোজার নিয়মকানুন
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {rules.map((rule, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg sm:rounded-xl p-5 sm:p-6 border border-slate-700 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-base sm:text-lg font-bold text-amber-400 mb-2 sm:mb-3">
                  {rule.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {rule.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Fasting Types */}
        <div className="mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-amber-400 mb-6 sm:mb-8 text-center">
            রোজার ধরন
          </h2>
          <div className="space-y-4 sm:space-y-5">
            {fasting_types.map((type, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg sm:rounded-xl p-5 sm:p-6 border border-amber-500/20 shadow-md"
              >
                <h3 className="text-base sm:text-lg font-bold text-amber-300 mb-2 sm:mb-3">
                  {type.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300">{type.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-amber-400 mb-6 sm:mb-8 text-center">
            রোজার ফজিলত
          </h2>
          <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-amber-500/30 shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-3 sm:gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-amber-500/30 border border-amber-500/50">
                      <span className="text-amber-400 text-sm sm:text-base font-bold">
                        ✓
                      </span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed pt-1">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Important Note */}
        <div className="bg-gradient-to-br from-amber-600/10 to-orange-600/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-amber-500/30 shadow-lg">
          <h3 className="text-lg sm:text-xl font-bold text-amber-400 mb-3 sm:mb-4">
            ⚠️ গুরুত্বপূর্ণ মাসায়েল:
          </h3>
          <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-300">
            <li className="flex gap-2 sm:gap-3">
              <span className="text-amber-400 flex-shrink-0">•</span>
              <span>যারা অসুস্থ বা ভ্রমণে আছেন তারা পরে রোজা কাজা করতে পারেন</span>
            </li>
            <li className="flex gap-2 sm:gap-3">
              <span className="text-amber-400 flex-shrink-0">•</span>
              <span>গর্ভবতী ও স্তন্যদানকারী মাতারা প্রয়োজনে রোজা ছাড়তে পারেন</span>
            </li>
            <li className="flex gap-2 sm:gap-3">
              <span className="text-amber-400 flex-shrink-0">•</span>
              <span>কন্টকশ রোজা ভাঙে না, তবে ওয়াজু ভেঙে দেয়</span>
            </li>
            <li className="flex gap-2 sm:gap-3">
              <span className="text-amber-400 flex-shrink-0">•</span>
              <span>
                রোজা ভেঙে ফেলে এমন কাজ: খাওয়া, পানীয় গ্রহণ, স্ত্রীসঙ্গম, ইনজেকশন
              </span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
