"use client";

import { useEffect, useState } from "react";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import { ErrorDisplay } from "@/components/LoadingError";

// Hardcoded Bangladesh location (Dhaka)
const BANGLADESH_COORDINATES = {
  latitude: 23.8053793,
  longitude: 90.3612129,
  timezone: "Asia/Dhaka",
};

type PrayerKey = "Fajr" | "Sunrise" | "Dhuhr" | "Asr" | "Maghrib" | "Isha";

const prayerOrder: PrayerKey[] = [
  "Fajr",
  "Sunrise",
  "Dhuhr",
  "Asr",
  "Maghrib",
  "Isha",
];

const prayerBengaliNames: Record<PrayerKey, string> = {
  Fajr: "ফজর",
  Sunrise: "সূর্যোদয়",
  Dhuhr: "যোহর",
  Asr: "আসর",
  Maghrib: "মাগরিব",
  Isha: "ইশা",
};

const prayerIcons: Record<PrayerKey, string> = {
  Fajr: "🌙",
  Sunrise: "🌅",
  Dhuhr: "☀️",
  Asr: "🌤️",
  Maghrib: "🌇",
  Isha: "⭐",
};

const toBengaliDigits = (value: string | number) =>
  String(value).replace(/\d/g, (digit) =>
    String.fromCharCode(0x09e6 + Number(digit))
  );

const formatTimeParts = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = ((hours + 11) % 12) + 1;
  return {
    time: `${hour12}:${String(minutes).padStart(2, "0")}`,
    period,
  };
};

const parseTimeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
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

export default function NamazerSomoyPage() {
  const {
    prayerTimes,
    loading: prayerLoading,
    error: prayerError,
    timeZone,
  } = usePrayerTimes(
    BANGLADESH_COORDINATES.latitude,
    BANGLADESH_COORDINATES.longitude
  );

  const [nextPrayer, setNextPrayer] = useState<PrayerKey | null>(null);
  const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!prayerTimes) return;

    const updateCountdown = () => {
      const currentMinutes = getCurrentTimeInMinutes(timeZone);
      const timesInMinutes = prayerOrder.map((key) =>
        parseTimeToMinutes(prayerTimes[key])
      );

      let nextIndex = timesInMinutes.findIndex((time) => time > currentMinutes);
      if (nextIndex === -1) {
        nextIndex = 0;
      }

      const prevIndex = (nextIndex - 1 + prayerOrder.length) % prayerOrder.length;
      const nextTime = timesInMinutes[nextIndex];
      const prevTime = timesInMinutes[prevIndex];

      const totalDuration = (nextTime - prevTime + 24 * 60) % (24 * 60) || 24 * 60;
      const remaining = (nextTime - currentMinutes + 24 * 60) % (24 * 60);
      const totalSeconds = Math.round(remaining * 60);

      setNextPrayer(prayerOrder[nextIndex]);
      setCountdown({
        hours: Math.floor(totalSeconds / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
      });
      setProgress(1 - remaining / totalDuration);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [prayerTimes, timeZone]);

  if (prayerError) {
    return <ErrorDisplay error={prayerError} />;
  }

  if (!prayerTimes || !nextPrayer || prayerLoading) {
    return (
      <main className="min-h-screen bg-white px-3 sm:px-6 py-6 sm:py-10">
        <div className="mx-auto w-full max-w-3xl">
          <div className="rounded-xl sm:rounded-[32px] bg-slate-50 p-6 sm:p-10 border border-slate-200 shadow-sm animate-pulse">
            <div className="mx-auto h-40 sm:h-56 w-40 sm:w-56 rounded-full border-4 border-slate-200 animate-pulse" />
            <div className="mt-6 sm:mt-10 grid grid-cols-2 gap-3 sm:gap-4">
              {Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={index}
                  className="h-20 rounded-2xl bg-slate-100 border border-slate-200 animate-pulse"
                />
              ))}
            </div>
          </div>
          <div className="mt-8 space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-16 rounded-2xl bg-slate-100 border border-slate-200 animate-pulse"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  const circleRadius = 120;
  const circumference = 2 * Math.PI * circleRadius;
  const dashOffset = circumference * (1 - Math.min(Math.max(progress, 0), 1));

  return (
    <main className="min-h-screen bg-white px-3 sm:px-6 py-8 sm:py-12">
      <div className="mx-auto w-full max-w-3xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-700 mb-2">
            <span>🕌 সালাত ও ইবাদত</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            নামাজের সময়সূচি
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            দৈনিক পাঁচ ওয়াক্ত নামাজের সঠিক সময় ও লাইভ কাউন্টডাউন
          </p>
        </div>

        {/* Circular Timer Hero Card */}
        <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl shadow-emerald-500/5 relative overflow-hidden bg-white">
          {/* Ambient Light */}
          <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-80 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-44 sm:w-64 drop-shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <defs>
                  <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#059669" />
                    <stop offset="50%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#34d399" />
                  </linearGradient>
                </defs>
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  stroke="#e2e8f0"
                  strokeWidth="6"
                  fill="none"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  stroke="url(#timerGradient)"
                  strokeWidth="7"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                  strokeLinecap="round"
                  transform="rotate(-90 100 100)"
                />
              </svg>
              <div className="absolute flex flex-col items-center text-center">
                <span className="text-[9px] sm:text-[11px] font-bold tracking-[0.2em] text-emerald-700 uppercase">
                  UPCOMING
                </span>
                <h2 className="mt-0.5 sm:mt-1 text-xl sm:text-3xl font-extrabold text-slate-900">
                  {prayerBengaliNames[nextPrayer]}
                </h2>

                {/* Countdown In Gauge */}
                <div className="mt-2 sm:mt-3 flex items-center gap-1 text-center font-mono">
                  <div className="rounded-lg bg-slate-50 border border-slate-200 px-1.5 py-0.5 shadow-xs">
                    <p className="text-xs sm:text-base font-bold text-slate-900">
                      {toBengaliDigits(String(countdown.hours).padStart(2, "0"))}
                    </p>
                  </div>
                  <p className="text-xs sm:text-base text-slate-400 font-bold">:</p>
                  <div className="rounded-lg bg-slate-50 border border-slate-200 px-1.5 py-0.5 shadow-xs">
                    <p className="text-xs sm:text-base font-bold text-slate-900">
                      {toBengaliDigits(String(countdown.minutes).padStart(2, "0"))}
                    </p>
                  </div>
                  <p className="text-xs sm:text-base text-slate-400 font-bold">:</p>
                  <div className="rounded-lg bg-emerald-50 border border-emerald-300 px-1.5 py-0.5 shadow-xs">
                    <p className="text-xs sm:text-base font-bold text-emerald-700">
                      {toBengaliDigits(String(countdown.seconds).padStart(2, "0"))}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sehri & Iftar Quick Bar */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3.5 sm:p-4 text-center">
              <p className="text-[11px] font-semibold text-slate-500">🌙 সেহরি শেষ</p>
              <p className="mt-1 text-base sm:text-xl font-bold text-slate-900 font-mono">
                {toBengaliDigits(formatTimeParts(prayerTimes.Fajr).time)}
                <span className="ml-1.5 text-[10px] font-sans text-slate-500 font-medium">
                  {formatTimeParts(prayerTimes.Fajr).period}
                </span>
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3.5 sm:p-4 text-center">
              <p className="text-[11px] font-semibold text-slate-500">✨ ইফতার (মাগরিব)</p>
              <p className="mt-1 text-base sm:text-xl font-bold text-emerald-700 font-mono">
                {toBengaliDigits(formatTimeParts(prayerTimes.Maghrib).time)}
                <span className="ml-1.5 text-[10px] font-sans text-slate-500 font-medium">
                  {formatTimeParts(prayerTimes.Maghrib).period}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* 6 Prayer Rows List */}
        <div className="mt-6 sm:mt-8 space-y-3">
          {prayerOrder.map((prayerKey) => {
            const isNext = prayerKey === nextPrayer;
            return (
              <div
                key={prayerKey}
                className={`flex items-center justify-between rounded-2xl border px-4 sm:px-6 py-3.5 sm:py-4 transition-all duration-300 ${
                  isNext
                    ? "border-emerald-400 bg-emerald-50/70 shadow-md shadow-emerald-500/10 scale-[1.01]"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50 shadow-xs"
                }`}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={`flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl text-xl sm:text-2xl shadow-inner ${
                    isNext ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-700"
                  }`}>
                    {prayerIcons[prayerKey]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-base sm:text-lg font-bold text-slate-900">
                        {prayerBengaliNames[prayerKey]}
                      </p>
                      {isNext && (
                        <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                          পরবর্তী
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {prayerKey}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-base sm:text-xl font-bold font-mono text-slate-900">
                    {toBengaliDigits(formatTimeParts(prayerTimes[prayerKey]).time)}
                    <span className="ml-1.5 text-[11px] font-sans font-medium text-slate-500">
                      {formatTimeParts(prayerTimes[prayerKey]).period}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
