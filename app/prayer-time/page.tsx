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
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-3 sm:px-6 py-6 sm:py-10">
        <div className="mx-auto w-full max-w-3xl">
          <div className="rounded-xl sm:rounded-[32px] bg-gradient-to-br from-slate-800 to-slate-900 p-6 sm:p-10 border border-slate-700 shadow-2xl">
            <div className="mx-auto h-40 sm:h-56 w-40 sm:w-56 rounded-full border-2 border-slate-700/60 animate-pulse" />
            <div className="mt-6 sm:mt-10 grid grid-cols-2 gap-3 sm:gap-4">
              {Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={index}
                  className="h-20 rounded-2xl bg-slate-800/60 border border-slate-700/70 animate-pulse"
                />
              ))}
            </div>
          </div>
          <div className="mt-8 space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-16 rounded-2xl bg-slate-800/70 border border-slate-700/70 animate-pulse"
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
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-3 sm:px-6 py-6 sm:py-10">
      <div className="mx-auto w-full max-w-3xl">
        <div className="rounded-xl sm:rounded-[32px] bg-gradient-to-br from-slate-800 to-slate-900 p-6 sm:p-10 border border-slate-700 shadow-2xl">
          <div className="flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-40 sm:w-64">
                <defs>
                  <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  stroke="#1f2937"
                  strokeWidth="5"
                  fill="none"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  stroke="url(#timerGradient)"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                  strokeLinecap="round"
                  transform="rotate(-90 100 100)"
                />
              </svg>
              <div className="absolute flex flex-col items-center text-center">
                <p className="text-[8px] sm:text-xs tracking-[0.2em] text-emerald-300">UPCOMING</p>
                <h2 className="mt-1 sm:mt-2 text-lg sm:text-2xl font-bold text-white">
                  {prayerBengaliNames[nextPrayer]}
                </h2>
                <div className="mt-2 sm:mt-4 flex items-center gap-0.5 sm:gap-1 text-center">
                  <div>
                    <p className="text-base sm:text-2xl font-semibold text-white">
                      {toBengaliDigits(String(countdown.hours).padStart(2, "0"))}
                    </p>
                  </div>
                  <p className="text-sm sm:text-xl text-slate-400">:</p>
                  <div className="text-center">
                    <p className="text-base sm:text-2xl font-semibold text-white">
                      {toBengaliDigits(String(countdown.minutes).padStart(2, "0"))}
                    </p>
                  </div>
                  <p className="text-sm sm:text-xl text-slate-400">:</p>
                  <div className="text-center">
                    <p className="text-base sm:text-2xl font-semibold text-emerald-300">
                      {toBengaliDigits(String(countdown.seconds).padStart(2, "0"))}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 px-6 py-4 text-center">
              <p className="text-xs text-gray-400">সেহরি শেষ</p>
              <p className="mt-2 text-xl font-semibold text-white">
                {toBengaliDigits(formatTimeParts(prayerTimes.Fajr).time)}
                <span className="ml-2 text-[10px] text-slate-400">
                  {formatTimeParts(prayerTimes.Fajr).period}
                </span>
              </p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 px-6 py-4 text-center">
              <p className="text-xs text-gray-400">ইফতার</p>
              <p className="mt-2 text-xl font-semibold text-white">
                {toBengaliDigits(formatTimeParts(prayerTimes.Maghrib).time)}
                <span className="ml-2 text-[10px] text-slate-400">
                  {formatTimeParts(prayerTimes.Maghrib).period}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {prayerOrder.map((prayerKey) => (
            <div
              key={prayerKey}
              className="flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-900/70 px-5 py-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-2xl">
                  {prayerIcons[prayerKey]}
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">
                    {prayerBengaliNames[prayerKey]}
                  </p>
                  <p className="text-xs text-slate-400">
                    {prayerKey === "Dhuhr" ? "Dhuhr" : prayerKey}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-lg font-semibold text-white">
                  {toBengaliDigits(formatTimeParts(prayerTimes[prayerKey]).time)}
                  <span className="ml-2 text-[10px] text-slate-400">
                    {formatTimeParts(prayerTimes[prayerKey]).period}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
