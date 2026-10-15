"use client";

import { useEffect, useState, useRef } from "react";
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

const toBengaliDate = (dateString: string) => {
  const months: Record<string, string> = {
    Jan: "জানুয়ারি",
    Feb: "ফেব্রুয়ারি",
    Mar: "মার্চ",
    Apr: "এপ্রিল",
    May: "মে",
    Jun: "জুন",
    Jul: "জুলাই",
    Aug: "আগস্ট",
    Sep: "সেপ্টেম্বর",
    Oct: "অক্টোবর",
    Nov: "নভেম্বর",
    Dec: "ডিসেম্বর",
  };

  // dateString format: "20 Feb 2026"
  const parts = dateString.split(" ");
  if (parts.length === 3) {
    const day = toBengaliDigits(parts[0]);
    const month = months[parts[1]] || parts[1];
    const year = toBengaliDigits(parts[2]);
    return `${day} ${month} ${year}`;
  }
  return dateString;
};

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
  const [azanEnabled, setAzanEnabled] = useState(false);
  const [lastPlayedPrayer, setLastPlayedPrayer] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>("");
  const azanAudioRef = useRef<HTMLAudioElement | null>(null);

  // Load azan setting from localStorage
  useEffect(() => {
    const savedSetting = localStorage.getItem("azanEnabled");
    if (savedSetting !== null) {
      setAzanEnabled(savedSetting === "true");
    }
  }, []);

  // Update current time
  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const bengaliTime = `${toBengaliDigits(hours)}:${toBengaliDigits(minutes)}:${toBengaliDigits(seconds)}`;
      setCurrentTime(bengaliTime);
    };

    updateCurrentTime();
    const interval = setInterval(updateCurrentTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Save azan setting to localStorage
  const toggleAzan = () => {
    const newValue = !azanEnabled;
    setAzanEnabled(newValue);
    localStorage.setItem("azanEnabled", String(newValue));
  };

  // Check if it's time for azan
  useEffect(() => {
    if (!azanEnabled || !prayerTimes) return;

    const checkAzanTime = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTime = `${String(currentHour).padStart(2, "0")}:${String(currentMinute).padStart(2, "0")}`;

      const prayerNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

      for (const prayerName of prayerNames) {
        const prayerTime = prayerTimes[prayerName];
        if (prayerTime === currentTime && lastPlayedPrayer !== `${prayerName}-${currentTime}`) {
          // Play azan
          if (azanAudioRef.current) {
            azanAudioRef.current.play().catch((err) => {
              console.error("Error playing azan:", err);
            });
            setLastPlayedPrayer(`${prayerName}-${currentTime}`);

            // Show notification
            if ("Notification" in window && Notification.permission === "granted") {
              new Notification(`${prayerBengaliNames[prayerName]} নামাজের সময়`, {
                body: `${prayerBengaliNames[prayerName]} নামাজের সময় হয়েছে (${prayerTime})`,
                icon: "/icon-192x192.png",
              });
            }
          }
        }
      }
    };

    // Request notification permission
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    // Check every 30 seconds
    const interval = setInterval(checkAzanTime, 30000);
    checkAzanTime(); // Check immediately

    return () => clearInterval(interval);
  }, [azanEnabled, prayerTimes, lastPlayedPrayer]);

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
      <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 mb-6 sm:mb-8 border border-slate-200/90 shadow-xl bg-white animate-pulse">
          {/* Skeleton for Location and Date */}
          <div className="mb-6 pb-5 border-b border-slate-100 flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-4 w-32 bg-slate-200 rounded-md" />
              <div className="h-3 w-44 bg-slate-100 rounded-md" />
            </div>
            <div className="h-9 w-28 bg-slate-200 rounded-xl" />
          </div>

          <div className="text-center mb-8">
            <div className="h-3.5 w-36 bg-slate-200 rounded mx-auto mb-3" />
            <div className="h-12 w-48 bg-slate-200 rounded-xl mx-auto mb-6" />

            {/* Timer skeleton */}
            <div className="flex justify-center items-center gap-3">
              <div className="h-20 w-20 bg-slate-200 rounded-2xl" />
              <div className="h-8 w-3 bg-slate-200 rounded" />
              <div className="h-20 w-20 bg-slate-200 rounded-2xl" />
              <div className="h-8 w-3 bg-slate-200 rounded" />
              <div className="h-20 w-20 bg-slate-200 rounded-2xl" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="h-32 rounded-2xl bg-slate-100 border border-slate-200" />
            <div className="h-32 rounded-2xl bg-slate-100 border border-slate-200" />
          </div>
        </div>

        {/* Quick Links Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 mb-6 sm:mb-8 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-200 bg-white h-20" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      {/* Next Prayer Hero Section */}
      <div className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 mb-6 sm:mb-8 border border-slate-200/90 shadow-xl shadow-emerald-500/5 relative overflow-hidden bg-white">
        {/* Ambient Top Light */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Location, Date, Time and Azan Toggle at Top */}
        <div className="mb-6 sm:mb-8 pb-5 sm:pb-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600">
              <span className="text-lg">📍</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-slate-900 tracking-wide">{location}</span>
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs text-slate-500 mt-0.5 font-medium">
                {date && <span>{toBengaliDate(date)}</span>}
                {currentTime && (
                  <>
                    <span>•</span>
                    <span className="text-emerald-700 font-mono font-bold">{currentTime}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Azan Toggle Button */}
          <button
            onClick={toggleAzan}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl transition-all duration-300 shadow-sm ${
              azanEnabled
                ? "bg-emerald-600 border border-emerald-600 text-white shadow-emerald-500/20"
                : "bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200"
            }`}
            title={azanEnabled ? "আজান বন্ধ করুন" : "আজান চালু করুন"}
          >
            <span className="text-base sm:text-lg">{azanEnabled ? "🔔" : "🔕"}</span>
            <span className="text-xs font-semibold">
              {azanEnabled ? "আজান চালু" : "আজান বন্ধ"}
            </span>
          </button>
        </div>

        {/* Next Prayer Title */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold tracking-wider text-emerald-700 mb-2 sm:mb-3">
            <span>UPCOMING PRAYER</span>
            <span>•</span>
            <span>পরবর্তী নামাজ</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mt-1">
            <span className="bg-gradient-to-r from-emerald-700 via-teal-600 to-emerald-800 bg-clip-text text-transparent">
              {prayerBengaliNames[nextPrayer.prayer.name]}
            </span>
          </h2>
        </div>

        {/* Countdown Timer with Modern Digital Glass Tiles */}
        <div className="flex justify-center items-center gap-2 sm:gap-4 mb-6 sm:mb-8 text-center">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/90 px-3.5 py-3 sm:px-6 sm:py-4 min-w-[72px] sm:min-w-[100px] shadow-sm">
            <div className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-mono">
              {toBengaliDigits(String(countdown.hours).padStart(2, "0"))}
            </div>
            <p className="text-slate-500 text-[10px] sm:text-xs font-medium mt-1">ঘণ্টা</p>
          </div>

          <div className="text-xl sm:text-3xl font-bold text-slate-400 pb-4">:</div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/90 px-3.5 py-3 sm:px-6 sm:py-4 min-w-[72px] sm:min-w-[100px] shadow-sm">
            <div className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-mono">
              {toBengaliDigits(String(countdown.minutes).padStart(2, "0"))}
            </div>
            <p className="text-slate-500 text-[10px] sm:text-xs font-medium mt-1">মিনিট</p>
          </div>

          <div className="text-xl sm:text-3xl font-bold text-slate-400 pb-4">:</div>

          <div className="rounded-2xl border border-emerald-300 bg-emerald-50 px-3.5 py-3 sm:px-6 sm:py-4 min-w-[72px] sm:min-w-[100px] shadow-sm shadow-emerald-500/10">
            <div className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-emerald-700 font-mono">
              {toBengaliDigits(String(countdown.seconds).padStart(2, "0"))}
            </div>
            <p className="text-emerald-700 text-[10px] sm:text-xs font-semibold mt-1">সেকেন্ড</p>
          </div>
        </div>

        {/* Sehri & Iftar Times Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          {/* Sehri Card */}
          <div className="rounded-2xl border border-slate-200/90 bg-slate-50/80 p-4 sm:p-5 text-center relative overflow-hidden group hover:border-emerald-400 hover:bg-emerald-50/30 transition-all duration-300 shadow-sm">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-xl">🌙</span>
              <p className="text-emerald-700 text-xs font-bold tracking-wider">সেহরি শেষ হতে বাকি</p>
            </div>
            <div className="flex justify-center items-center gap-1.5 sm:gap-2 my-2 sm:my-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
                {toBengaliDigits(String(sehriCountdown.hours).padStart(2, "0"))}
              </span>
              <span className="text-lg text-slate-400 font-bold">:</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
                {toBengaliDigits(String(sehriCountdown.minutes).padStart(2, "0"))}
              </span>
              <span className="text-lg text-slate-400 font-bold">:</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono">
                {toBengaliDigits(String(sehriCountdown.seconds).padStart(2, "0"))}
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[11px] text-slate-600 border border-slate-200 shadow-2xs">
              <span>ফজরের ওয়াক্ত শুরু:</span>
              <span className="text-emerald-700 font-bold">{toBengaliDigits(prayerTimes.Fajr)}</span>
            </div>
          </div>

          {/* Iftar Card */}
          <div className="rounded-2xl border border-slate-200/90 bg-slate-50/80 p-4 sm:p-5 text-center relative overflow-hidden group hover:border-amber-400 hover:bg-amber-50/30 transition-all duration-300 shadow-sm">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-xl">✨</span>
              <p className="text-amber-700 text-xs font-bold tracking-wider">ইফতারের বাকি</p>
            </div>
            <div className="flex justify-center items-center gap-1.5 sm:gap-2 my-2 sm:my-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
                {toBengaliDigits(String(iftarCountdown.hours).padStart(2, "0"))}
              </span>
              <span className="text-lg text-slate-400 font-bold">:</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
                {toBengaliDigits(String(iftarCountdown.minutes).padStart(2, "0"))}
              </span>
              <span className="text-lg text-slate-400 font-bold">:</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-600 font-mono">
                {toBengaliDigits(String(iftarCountdown.seconds).padStart(2, "0"))}
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[11px] text-slate-600 border border-slate-200 shadow-2xs">
              <span>ইফতারের সময় (মাগরিব):</span>
              <span className="text-amber-700 font-bold">{toBengaliDigits(prayerTimes.Maghrib)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 mb-6 sm:mb-8">
        <Link href="/quran" className="group h-full">
          <div className="h-full rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-sm group-hover:border-emerald-500 group-hover:shadow-md group-hover:shadow-emerald-500/10 transition-all duration-300 transform group-hover:-translate-y-0.5">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 text-2xl group-hover:scale-105 transition-transform">
                📖
              </div>
              <div>
                <p className="text-slate-900 text-base font-bold group-hover:text-emerald-700 transition-colors">আল-কুরআন</p>
                <p className="text-xs text-slate-500 mt-0.5">অডিও ও সূরা অনুসন্ধান</p>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/hadith" className="group h-full">
          <div className="h-full rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-sm group-hover:border-indigo-500 group-hover:shadow-md group-hover:shadow-indigo-500/10 transition-all duration-300 transform group-hover:-translate-y-0.5">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 text-2xl group-hover:scale-105 transition-transform">
                📚
              </div>
              <div>
                <p className="text-slate-900 text-base font-bold group-hover:text-indigo-700 transition-colors">সহীহ হাদিস</p>
                <p className="text-xs text-slate-500 mt-0.5">বুখারী ও মুসলিম সংকলন</p>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/dua" className="group h-full">
          <div className="h-full rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-sm group-hover:border-amber-500 group-hover:shadow-md group-hover:shadow-amber-500/10 transition-all duration-300 transform group-hover:-translate-y-0.5">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700 text-2xl group-hover:scale-105 transition-transform">
                🙏
              </div>
              <div>
                <p className="text-slate-900 text-base font-bold group-hover:text-amber-700 transition-colors">প্রয়োজনীয় দোয়া</p>
                <p className="text-xs text-slate-500 mt-0.5">প্রতিদিনের মাসনূন দোয়া</p>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Quote / Ayat of the Day */}
      <div className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-xl bg-white relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setQuoteTab("ayat")}
              aria-pressed={quoteTab === "ayat"}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                quoteTab === "ayat"
                  ? "bg-emerald-600 text-white font-bold shadow-sm shadow-emerald-600/30"
                  : "bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200"
              }`}
            >
              আজকের আয়াত
            </button>
            <button
              type="button"
              onClick={() => setQuoteTab("hadith")}
              aria-pressed={quoteTab === "hadith"}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                quoteTab === "hadith"
                  ? "bg-emerald-600 text-white font-bold shadow-sm shadow-emerald-600/30"
                  : "bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200"
              }`}
            >
              আজকের হাদিস
            </button>
          </div>

          <button
            type="button"
            onClick={() => setQuoteOffset((prev) => prev + 1)}
            className="flex items-center gap-1.5 rounded-full bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 text-xs font-medium text-slate-700 transition-all border border-slate-200"
          >
            <span className="text-sm">⟳</span>
            <span>অন্যটি দেখুন</span>
          </button>
        </div>

        <div className="mt-6 text-center px-2 sm:px-6">
          <p className="text-4xl text-emerald-600/30 font-serif leading-none">“</p>
          <p className="mt-1 text-base sm:text-xl font-medium text-slate-800 leading-relaxed max-w-2xl mx-auto">
            {quoteTab === "ayat" ? ayat.text : hadith.text}
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-emerald-500/40" />
            <p className="text-xs font-semibold tracking-wider text-emerald-700">
              {quoteTab === "ayat" ? ayat.source : hadith.source}
            </p>
            <span className="h-px w-8 bg-emerald-500/40" />
          </div>
        </div>
      </div>

      {/* Azan Audio */}
      <audio
        ref={azanAudioRef}
        src="/azan1.mp3"
        preload="auto"
      />
    </div>
  );
}
