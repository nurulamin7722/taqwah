"use client";

export default function EidMiladPage() {
  const activities = [
    {
      title: "রবিউল আউয়ালের ১২ তারিখ",
      description:
        "নবী মুহাম্মদ (সা.) জন্মগ্রহণ করেছিলেন এই দিনে মক্কায়। মুসলিম উম্মত এই দিনকে বিশেষ সম্মানের সাথে পালন করে।",
    },
    {
      title: "নবীর জীবনচরিত স্মরণ",
      description:
        "নবী (সা.)-এর জীবন, কাজকর্ম এবং শিক্ষা নিয়ে আলোচনা ও পাঠ করা। তাঁর জীবন থেকে শিক্ষা নেওয়া।",
    },
    {
      title: "দারুদ ও সালাম",
      description:
        "নবী (সা.)-এর উপর দারুদ শরীফ ও সালাম পাঠানো। কোরান ও সুন্নাহ অনুযায়ী এটি খুবই গুরুত্বপূর্ণ ইবাদত।",
    },
    {
      title: "ইসলামিক অনুষ্ঠান",
      description:
        "মসজিদ ও সামাজিক প্রতিষ্ঠানে বিশেষ মাহফিল, ওয়াজ ও কিয়াম আয়োজন করা হয়।",
    },
    {
      title: "কমিউনিটি একসাথে",
      description:
        "পরিবার ও সম্প্রদায়ের সাথে একসাথে নবীর প্রশংসা করা এবং তাঁর জীবনের গুরুত্বপূর্ণ ঘটনা স্মরণ করা।",
    },
    {
      title: "দাতব্য কাজ",
      description:
        "গরীব ও অসহায়দের সাহায্য করা, খাদ্য বন্টন করা এবং সমাজের কল্যাণে কাজ করা।",
    },
  ];

  return (
    <main className="min-h-screen bg-white px-3 sm:px-6 py-6 sm:py-10">
      <div className="mx-auto w-full max-w-4xl">
        {/* Header */}
        <div className="mb-8 sm:mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-2 sm:mb-3">
            🌙 ঈদ ই মিলাদুন্নাবি
          </h1>
          <p className="text-sm sm:text-base text-slate-500">
            রাসূলুল্লাহ (সা.)-এর জন্মবার্ষিকী উদযাপনের পদ্ধতি
          </p>
        </div>

        {/* Activities Grid */}
        <div className="space-y-4 sm:space-y-6">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300"
            >
              <div className="flex gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 sm:h-14 sm:w-14 rounded-full bg-amber-50 border border-amber-200">
                    <span className="text-lg sm:text-2xl">✨</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-amber-800 mb-2 sm:mb-3">
                    {activity.title}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {activity.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Special Message */}
        <div className="mt-10 sm:mt-16 bg-amber-50/70 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-amber-200 shadow-xs">
          <h3 className="text-lg sm:text-xl font-bold text-amber-900 mb-3 sm:mb-4">
            💛 নবীর প্রতি ভালোবাসা:
          </h3>
          <p className="text-sm sm:text-base text-amber-950 leading-relaxed">
            নবী মুহাম্মদ (সা.) সমস্ত মানবতার জন্য আল্লাহর পক্ষ থেকে পাঠানো সর্বশেষ রাসূল। তাঁর জীবন, কর্ম এবং শিক্ষা প্রতিটি মুসলিমের জন্য পথপ্রদর্শক। তাঁর প্রতি আমাদের ভালোবাসা ও সম্মান প্রদর্শন করা আমাদের ঈমানের অংশ।
          </p>
        </div>
      </div>
    </main>
  );
}
