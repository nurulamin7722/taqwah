"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatTime, getNextPrayer } from "@/utils/prayerUtils";

interface PrayerTimes {
  [key: string]: string;
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
}

interface PrayerTimesDisplayProps {
  prayerTimes: PrayerTimes | null;
  location: string;
  date: string | null;
  timeZone?: string | null;
}

const prayerArabicNames: Record<string, string> = {
  Fajr: "الفجر",
  Sunrise: "الشروق",
  Dhuhr: "الظهر",
  Asr: "العصر",
  Sunset: "الغروب",
  Maghrib: "المغرب",
  Isha: "العشاء",
  Imsak: "الإمساك",
  Midnight: "منتصف الليل",
};

const prayerBengaliNames: Record<string, string> = {
  Fajr: "ফজর",
  Sunrise: "সূর্যোদয়",
  Dhuhr: "যোহর",
  Asr: "আসর",
  Sunset: "সূর্যাস্ত",
  Maghrib: "মাগরিব",
  Isha: "ইশা",
  Imsak: "ইমসাক",
  Midnight: "মধ্যরাত",
};

const toBengaliDigits = (value: string | number) =>
  String(value).replace(/\d/g, (digit) =>
    String.fromCharCode(0x09e6 + Number(digit))
  );

const ayatOfTheDay = [
  {
    text:
      "হে মুমিনগণ! তোমরা ধৈর্য ও সালাতের মাধ্যমে সাহায্য প্রার্থনা কর। নিশ্চয়ই আল্লাহ ধৈর্যশীলদের সঙ্গে আছেন।",
    source: "সুরা আল-বাকারা, আয়াত ১৫৩",
  },
  {
    text:
      "আর তোমরা তোমাদের প্রভুর ক্ষমা ও জান্নাতের দিকে অগ্রসর হও।",
    source: "সুরা আলে ইমরান, আয়াত ১৩৩",
  },
  {
    text:
      "স্মরণ করো, আল্লাহর স্মরণেই অন্তর প্রশান্ত হয়।",
    source: "সুরা রাদ, আয়াত ২৮",
  },
  {
    text:
      "নিশ্চয়ই কষ্টের সঙ্গে রয়েছে স্বস্তি।",
    source: "সুরা ইনশিরাহ, আয়াত ৬",
  },
  {
    text:
      "তোমরা আল্লাহর রহমত থেকে নিরাশ হয়ো না।",
    source: "সুরা ইউসুফ, আয়াত ৮৭",
  },
];

const hadithOfTheDay = [
  {
    text: "যে ব্যক্তি আল্লাহর উপর ভরসা করে, আল্লাহ তার জন্য যথেষ্ট।",
    source: "সহিহ বুখারি",
  },
  {
    text: "সবচেয়ে উত্তম কাজ হলো সময়মতো নামাজ আদায় করা।",
    source: "সহিহ মুসলিম",
  },
  {
    text: "দয়া করো, আসমানের মালিক তোমার প্রতি দয়া করবেন।",
    source: "তিরমিজি",
  },
  {
    text: "যে ব্যক্তি মানুষের উপকার করে, সে শ্রেষ্ঠ মানুষ।",
    source: "মুসনাদ আহমদ",
  },
  {
    text: "পরিচ্ছন্নতা ঈমানের অর্ধেক।",
    source: "সহিহ মুসলিম",
  },
];

const getDayOfYear = (date: Date) => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};

const getCurrentTimeInMinutes = (timeZone?: string | null) => {
  const now = new Date();
  if (!timeZone) {
    return now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
  }

  const parts = new Intl.DateTimeFormat("en-US", {
    hour12: false,
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(now);

  const getPart = (type: string) =>
    Number(parts.find((part) => part.type === type)?.value ?? "0");

  return getPart("hour") * 60 + getPart("minute") + getPart("second") / 60;
};

export function PrayerTimesDisplay({
  prayerTimes,
  location,
  date,
  timeZone,
}: PrayerTimesDisplayProps) {
  const [nextPrayer, setNextPrayer] = useState<any>(null);
  const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [sehriCountdown, setSehriCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [iftarCountdown, setIftarCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [quoteTab, setQuoteTab] = useState<"ayat" | "hadith">("ayat");
  const [quoteOffset, setQuoteOffset] = useState(0);

  const todayIndex = getDayOfYear(new Date());
  const ayatIndex = (todayIndex + quoteOffset) % ayatOfTheDay.length;
  const hadithIndex = (todayIndex + quoteOffset) % hadithOfTheDay.length;
  const ayat = ayatOfTheDay[ayatIndex];
  const hadith = hadithOfTheDay[hadithIndex];

  useEffect(() => {
    if (!prayerTimes) return;

    const updateTimers = () => {
      const currentTimeInMinutes = getCurrentTimeInMinutes(timeZone);

      // Main prayer countdown
      const next = getNextPrayer(prayerTimes);
      setNextPrayer(next);
      if (next) {
        setCountdown(next.timeUntil);
      }

      // Sehri ends countdown (Fajr)
      const [sehriHours, sehriMinutes] = prayerTimes.Fajr.split(":").map(Number);
      const sehriTimeInMinutes = sehriHours * 60 + sehriMinutes;
      let sehriTimeDiff = sehriTimeInMinutes - currentTimeInMinutes;
      if (sehriTimeDiff < 0) {
        sehriTimeDiff += 24 * 60;
      }
      const sehriTotalSeconds = Math.round(sehriTimeDiff * 60);
      setSehriCountdown({
        hours: Math.floor(sehriTotalSeconds / 3600),
        minutes: Math.floor((sehriTotalSeconds % 3600) / 60),
        seconds: sehriTotalSeconds % 60,
      });

      // Iftar countdown (Maghrib)
      const [iftarHours, iftarMinutes] = prayerTimes.Maghrib.split(":").map(Number);
      const iftarTimeInMinutes = iftarHours * 60 + iftarMinutes;
      let iftarTimeDiff = iftarTimeInMinutes - currentTimeInMinutes;
      if (iftarTimeDiff < 0) {
        iftarTimeDiff += 24 * 60;
      }
      const iftarTotalSeconds = Math.round(iftarTimeDiff * 60);
      setIftarCountdown({
        hours: Math.floor(iftarTotalSeconds / 3600),
        minutes: Math.floor((iftarTotalSeconds % 3600) / 60),
        seconds: iftarTotalSeconds % 60,
      });
    };

    updateTimers();
    const interval = setInterval(updateTimers, 1000);

    return () => clearInterval(interval);
  }, [prayerTimes]);

  if (!prayerTimes || !nextPrayer) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 mb-8 border border-slate-700 shadow-2xl">
          <div className="absolute left-6 top-6 rounded-full border border-slate-600 bg-slate-900/70 px-4 py-2 text-left">
            <div className="h-3 w-28 bg-slate-700/70 rounded" />
            <div className="h-3 w-20 bg-slate-700/70 rounded mt-2" />
          </div>

          <div className="text-center mb-6 animate-pulse">
            <div className="h-3 w-28 bg-slate-700/70 rounded mx-auto mb-4" />
            <div className="h-10 w-32 bg-slate-700/70 rounded mx-auto mb-3" />
            <div className="h-4 w-24 bg-slate-700/70 rounded mx-auto mb-2" />
            <div className="h-4 w-20 bg-slate-700/70 rounded mx-auto" />
          </div>

          <div className="flex justify-center items-center gap-3 mb-8 animate-pulse">
            <div className="h-14 w-20 bg-slate-700/70 rounded" />
            <div className="h-10 w-6 bg-slate-700/70 rounded" />
            <div className="h-14 w-20 bg-slate-700/70 rounded" />
            <div className="h-10 w-6 bg-slate-700/70 rounded" />
            <div className="h-14 w-20 bg-slate-700/70 rounded" />
          </div>

          <div className="grid grid-cols-2 gap-4 animate-pulse">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-lg border border-slate-700">
              <div className="h-6 w-6 bg-slate-700/70 rounded-full mx-auto mb-3" />
              <div className="h-3 w-24 bg-slate-700/70 rounded mx-auto mb-4" />
              <div className="flex justify-center items-center gap-2 mb-3">
                <div className="h-8 w-12 bg-slate-700/70 rounded" />
                <div className="h-6 w-4 bg-slate-700/70 rounded" />
                <div className="h-8 w-12 bg-slate-700/70 rounded" />
                <div className="h-6 w-4 bg-slate-700/70 rounded" />
                <div className="h-8 w-12 bg-slate-700/70 rounded" />
              </div>
              <div className="h-3 w-16 bg-slate-700/70 rounded mx-auto" />
            </div>
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-lg border border-slate-700">
              <div className="h-6 w-6 bg-slate-700/70 rounded-full mx-auto mb-3" />
              <div className="h-3 w-24 bg-slate-700/70 rounded mx-auto mb-4" />
              <div className="flex justify-center items-center gap-2 mb-3">
                <div className="h-8 w-12 bg-slate-700/70 rounded" />
                <div className="h-6 w-4 bg-slate-700/70 rounded" />
                <div className="h-8 w-12 bg-slate-700/70 rounded" />
                <div className="h-6 w-4 bg-slate-700/70 rounded" />
                <div className="h-8 w-12 bg-slate-700/70 rounded" />
              </div>
              <div className="h-3 w-16 bg-slate-700/70 rounded mx-auto" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 shadow-2xl">
          <div className="h-5 w-40 bg-slate-700/70 rounded mb-6 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 animate-pulse">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="p-4 rounded-lg text-center bg-slate-700/40"
              >
                <div className="h-4 w-16 bg-slate-700/70 rounded mx-auto mb-2" />
                <div className="h-3 w-10 bg-slate-700/70 rounded mx-auto mb-2" />
                <div className="h-3 w-12 bg-slate-700/70 rounded mx-auto mb-3" />
                <div className="h-8 w-16 bg-slate-700/70 rounded mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      {/* Next Prayer Section */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl sm:rounded-2xl p-4 sm:p-8 mb-6 sm:mb-8 border border-slate-700 shadow-2xl">
        {/* Location and Date at Top */}
        <div className="mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-slate-700">
          <p className="text-[10px] sm:text-xs font-semibold tracking-widest text-gray-400">
            {location}
          </p>
          {date && <p className="text-[9px] sm:text-[10px] text-gray-500 mt-1">{date}</p>}
        </div>

        <div className="text-center mb-4 sm:mb-6">
          <p className="text-accent-green text-xs sm:text-sm font-semibold tracking-widest mb-2 sm:mb-4">
            UPCOMING PRAYER
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-accent-green mb-2 sm:mb-3">
            {prayerBengaliNames[nextPrayer.prayer.name]}
          </h2>
          {nextPrayer.prayer.name !== "Maghrib" && nextPrayer.prayer.name !== "Fajr" && (
            <p className="text-lg sm:text-2xl font-semibold text-white mb-1">{nextPrayer.prayer.name}</p>
          )}
          {nextPrayer.prayer.name !== "Maghrib" && nextPrayer.prayer.name !== "Fajr" && (
            <p className="text-sm sm:text-lg text-gray-300">{nextPrayer.prayer.arabicName}</p>
          )}
        </div>

        {/* Countdown Timer */}
        <div className="flex justify-center items-center gap-1.5 sm:gap-3 mb-4 sm:mb-6 text-center">
          <div>
            <div className="text-3xl sm:text-5xl md:text-6xl font-bold text-white">
              {toBengaliDigits(String(countdown.hours).padStart(2, "0"))}
            </div>
            <p className="text-gray-400 text-[10px] sm:text-xs mt-1 sm:mt-2">ঘন্টা</p>
          </div>
          <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-400">:</div>
          <div>
            <div className="text-3xl sm:text-5xl md:text-6xl font-bold text-white">
              {toBengaliDigits(String(countdown.minutes).padStart(2, "0"))}
            </div>
            <p className="text-gray-400 text-[10px] sm:text-xs mt-1 sm:mt-2">মিনিট</p>
          </div>
          <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-400">:</div>
          <div>
            <div className="text-3xl sm:text-5xl md:text-6xl font-bold text-accent-green">
              {toBengaliDigits(String(countdown.seconds).padStart(2, "0"))}
            </div>
            <p className="text-gray-400 text-[10px] sm:text-xs mt-1 sm:mt-2">সেকেন্ড</p>
          </div>
        </div>

        {/* Sehri & Iftar Times */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 sm:p-6 rounded-lg border border-slate-700 text-center">
            <div className="flex justify-center mb-2 sm:mb-3">
              <span className="text-2xl sm:text-3xl">🌙</span>
            </div>
            <p className="text-accent-green text-[10px] sm:text-xs font-semibold tracking-wider mb-2 sm:mb-4">SEHRI ENDS IN</p>
            <div className="flex justify-center items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
              <span className="text-2xl sm:text-4xl font-bold text-white">
                {toBengaliDigits(String(sehriCountdown.hours).padStart(2, "0"))}
              </span>
              <span className="text-xl sm:text-3xl font-bold text-gray-400">:</span>
              <span className="text-2xl sm:text-4xl font-bold text-white">
                {toBengaliDigits(String(sehriCountdown.minutes).padStart(2, "0"))}
              </span>
              <span className="text-xl sm:text-3xl font-bold text-gray-400">:</span>
              <span className="text-2xl sm:text-4xl font-bold text-accent-green">
                {toBengaliDigits(String(sehriCountdown.seconds).padStart(2, "0"))}
              </span>
            </div>
            <p className="text-gray-400 text-[10px] sm:text-xs">{toBengaliDigits(prayerTimes.Fajr)}</p>
          </div>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 sm:p-6 rounded-lg border border-slate-700 text-center">
            <div className="flex justify-center mb-2 sm:mb-3">
              <span className="text-2xl sm:text-3xl">✨</span>
            </div>
            <p className="text-accent-green text-[10px] sm:text-xs font-semibold tracking-wider mb-2 sm:mb-4">IFTAR TIME IN</p>
            <div className="flex justify-center items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
              <span className="text-2xl sm:text-4xl font-bold text-white">
                {toBengaliDigits(String(iftarCountdown.hours).padStart(2, "0"))}
              </span>
              <span className="text-xl sm:text-3xl font-bold text-gray-400">:</span>
              <span className="text-2xl sm:text-4xl font-bold text-white">
                {toBengaliDigits(String(iftarCountdown.minutes).padStart(2, "0"))}
              </span>
              <span className="text-xl sm:text-3xl font-bold text-gray-400">:</span>
              <span className="text-2xl sm:text-4xl font-bold text-accent-green">
                {toBengaliDigits(String(iftarCountdown.seconds).padStart(2, "0"))}
              </span>
            </div>
            <p className="text-gray-400 text-[10px] sm:text-xs">{toBengaliDigits(prayerTimes.Maghrib)}</p>
          </div>
        </div>
      </div>

      {/* Quick Links to Quran, Hadith, Dua */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <Link href="/quran" className="h-full">
          <button className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-400/30 shadow-lg transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center">
            <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">📖</div>
            <p className="text-white text-xs sm:text-sm font-bold text-center">আল-কুরআন</p>
          </button>
        </Link>
        <Link href="/hadith" className="h-full">
          <button className="w-full h-full bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-400/30 shadow-lg transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center">
            <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">📚</div>
            <p className="text-white text-xs sm:text-sm font-bold text-center">হাদিস</p>
          </button>
        </Link>
        <Link href="/dua" className="h-full">
          <button className="w-full h-full bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-amber-400/30 shadow-lg transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center">
            <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🙏</div>
            <p className="text-white text-xs sm:text-sm font-bold text-center">দোয়া</p>
          </button>
        </Link>
      </div>
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-700 shadow-2xl">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setQuoteTab("ayat")}
            aria-pressed={quoteTab === "ayat"}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
              quoteTab === "ayat"
                ? "bg-emerald-500 text-slate-900"
                : "bg-slate-800 text-slate-300"
            }`}
          >
            আজকের আয়াত
          </button>
          <button
            type="button"
            onClick={() => setQuoteTab("hadith")}
            aria-pressed={quoteTab === "hadith"}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
              quoteTab === "hadith"
                ? "bg-emerald-500 text-slate-900"
                : "bg-slate-800 text-slate-300"
            }`}
          >
            আজকের হাদিস
          </button>
          <button
            type="button"
            onClick={() => setQuoteOffset((prev) => prev + 1)}
            className="ml-auto flex items-center gap-2 rounded-full bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 transition-all hover:bg-slate-700"
          >
            <span className="text-sm">⟳</span>
            রিলোড
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-3xl text-emerald-300">“</p>
          <p className="mt-3 text-lg md:text-2xl font-semibold text-slate-100 leading-relaxed">
            {quoteTab === "ayat" ? ayat.text : hadith.text}
          </p>
          <div className="mt-3 sm:mt-4 flex items-center justify-center gap-2 sm:gap-3">
            <span className="h-px w-8 sm:w-10 bg-emerald-400/60" />
            <p className="text-[10px] sm:text-xs font-semibold tracking-widest text-emerald-300">
              {quoteTab === "ayat" ? ayat.source : hadith.source}
            </p>
            <span className="h-px w-8 sm:w-10 bg-emerald-400/60" />
          </div>
        </div>
      </div>
    </div>
  );
}
