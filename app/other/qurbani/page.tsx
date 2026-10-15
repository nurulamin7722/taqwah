"use client";

export default function QurbaniPage() {
  const qurbaniInfo = [
    {
      title: "কোরবানির বিধান",
      points: [
        "কোরবানি ইদুল আজহার দিনে এবং এর পরবর্তী তিন দিনে করা যায়",
        "সামর্থ্যবান প্রতিটি মুসলিমের জন্য সুন্নাত",
        "প্রাণী: গরু, মহিষ, ছাগল বা ভেড়া হতে পারে",
        "পশুর বয়স নির্ধারিত থাকে প্রতিটি প্রজাতির জন্য",
      ],
    },
    {
      title: "পশুর শর্ত",
      points: [
        "সম্পূর্ণ সুস্থ এবং সবল হতে হবে",
        "খোঁড়া, লঙ্গড়া বা অন্ধ হতে পারবে না",
        "কোনো রোগ বা ত্রুটি থাকতে পারবে না",
        "পর্যাপ্ত বয়স হতে হবে (পূর্ণবয়স্ক)",
      ],
    },
    {
      title: "কোরবানির গুরুত্ব",
      points: [
        "আল্লাহর প্রতি আনুগত্যের প্রতীক",
        "ইব্রাহিম (আ.) এর অনুসরণ",
        "সমাজের দুর্বল মানুষের ভাগ দেওয়া হয়",
        "আত্মত্যাগের চেতনা জাগায়",
      ],
    },
    {
      title: "মাংস বন্টন",
      points: [
        "একভাগ নিজের জন্য",
        "একভাগ আত্মীয় ও বন্ধুদের জন্য",
        "একভাগ গরীব ও অসহায়দের জন্য",
        "পরিবার ও সমাজের সাথে ভাগাভাগি করুন",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-white px-3 sm:px-6 py-6 sm:py-10">
      <div className="mx-auto w-full max-w-4xl">
        {/* Header */}
        <div className="mb-8 sm:mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-2 sm:mb-3">
            🐑 কোরবানি
          </h1>
          <p className="text-sm sm:text-base text-slate-500">
            ইদুল আজহার প্রসঙ্গে কোরবানির বিধান ও গুরুত্ব
          </p>
        </div>

        {/* Qurbani Info */}
        <div className="space-y-4 sm:space-y-6">
          {qurbaniInfo.map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-rose-800 mb-4 sm:mb-6">
                {section.title}
              </h2>
              <ul className="space-y-2 sm:space-y-3">
                {section.points.map((point, pointIndex) => (
                  <li
                    key={pointIndex}
                    className="flex gap-3 sm:gap-4 text-sm sm:text-base text-slate-700"
                  >
                    <span className="flex-shrink-0 text-rose-600 font-bold mt-0.5">
                      •
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Important Info */}
        <div className="mt-10 sm:mt-16 bg-rose-50/70 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-rose-200 shadow-xs">
          <h3 className="text-lg sm:text-xl font-bold text-rose-900 mb-3 sm:mb-4">
            ⚠️ মনে রাখার বিষয়:
          </h3>
          <p className="text-sm sm:text-base text-rose-950 leading-relaxed">
            কোরবানি শুধুমাত্র জন্তুর মাংস বা রক্তই আল্লাহর কাছে পৌঁছায় না, বরং আপনার আন্তরিকতা ও তাকওয়াই আল্লাহর কাছে সবচেয়ে গুরুত্বপূর্ণ। সমাজের সবার সাথে খুশিতে ভাগাভাগি করা এই ইবাদতের মূল উদ্দেশ্য।
          </p>
        </div>
      </div>
    </main>
  );
}
