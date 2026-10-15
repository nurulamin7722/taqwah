"use client";

import { useMemo, useState } from "react";
import moment from "moment-hijri";
import { getDate, getMonth, getYear } from "bangla-calendar";

type Locale = "bn" | "en" | "ar";

const gregorianMonthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const banglaMonthNames = [
  "বৈশাখ",
  "জ্যৈষ্ঠ",
  "আষাঢ়",
  "শ্রাবণ",
  "ভাদ্র",
  "আশ্বিন",
  "কার্তিক",
  "অগ্রহায়ণ",
  "পৌষ",
  "মাঘ",
  "ফাল্গুন",
  "চৈত্র",
];

const hijriMonthNames = [
  "محرم",
  "صفر",
  "ربيع الأول",
  "ربيع الآخر",
  "جمادى الأولى",
  "جمادى الآخرة",
  "رجب",
  "شعبان",
  "رمضان",
  "شوال",
  "ذو القعدة",
  "ذو الحجة",
];

const calendarLabels = {
  bn: "বাংলা ক্যালেন্ডার",
  en: "Gregorian Calendar",
  ar: "التقويم الهجري",
};

const weekdayLabels = {
  bn: ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহ", "শুক্র", "শনি"],
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  ar: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
};

const toBanglaDigits = (value: number | string) =>
  String(value).replace(/\d/g, (digit) =>
    String.fromCharCode(0x09e6 + Number(digit))
  );

const toEnglishDigits = (value: string) =>
  value.replace(/[০-৯]/g, (digit) => String(digit.charCodeAt(0) - 0x09e6));

const toArabicDigits = (value: number) =>
  String(value).replace(/\d/g, (digit) =>
    String.fromCharCode(0x0660 + Number(digit))
  );

const formatDayNumber = (value: number, locale: Locale) => {
  if (locale === "bn") return toBanglaDigits(value);
  if (locale === "ar") return toArabicDigits(value);
  return String(value);
};

const formatYearNumber = (value: number, locale: Locale) => {
  if (locale === "bn") return toBanglaDigits(value);
  if (locale === "ar") return toArabicDigits(value);
  return String(value);
};

const getBanglaInfo = (date: Date) => {
  const dayText = getDate(date, { format: "DD" });
  const monthName = getMonth(date, { format: "MMMM" });
  const yearText = getYear(date, { format: "YYYY" });
  const yearValue = Number(toEnglishDigits(yearText));
  return {
    day: Number(toEnglishDigits(dayText)),
    monthName,
    year: yearValue,
  };
};

const buildBanglaCalendar = (today: Date) => {
  const todayInfo = getBanglaInfo(today);
  const monthName = todayInfo.monthName;
  const year = todayInfo.year;

  const start = new Date(today);
  while (getBanglaInfo(start).day !== 1) {
    start.setDate(start.getDate() - 1);
  }

  const end = new Date(start);
  while (getBanglaInfo(end).monthName === monthName) {
    end.setDate(end.getDate() + 1);
  }
  end.setDate(end.getDate() - 1);

  const daysInMonth = Math.round((end.getTime() - start.getTime()) / 86400000) + 1;
  const firstDay = start.getDay();

  const cells: Array<{ day?: number; isToday?: boolean }> = [];
  for (let i = 0; i < firstDay; i += 1) {
    cells.push({});
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({ day, isToday: day === todayInfo.day });
  }

  return { monthName, year, cells };
};

const HIJRI_DAY_SHIFT = -1;

const buildHijriCalendar = (today: Date) => {
  const shiftedToday = moment(today).add(HIJRI_DAY_SHIFT, "day");
  const todayHijri = moment(shiftedToday);
  const monthIndex = todayHijri.iMonth();
  const year = todayHijri.iYear();
  const todayDay = todayHijri.iDate();
  const start = moment(shiftedToday).startOf("iMonth");
  const firstDay = start.day();
  const daysInMonth = start.iDaysInMonth();

  const cells: Array<{ day?: number; isToday?: boolean }> = [];
  for (let i = 0; i < firstDay; i += 1) {
    cells.push({});
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({ day, isToday: day === todayDay });
  }

  return {
    monthName: hijriMonthNames[monthIndex],
    year,
    cells,
  };
};

const buildGregorianCalendar = (today: Date) => {
  const year = today.getFullYear();
  const monthIndex = today.getMonth();
  const firstDay = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  const cells: Array<{ day?: number; isToday?: boolean }> = [];
  for (let i = 0; i < firstDay; i += 1) {
    cells.push({});
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({ day, isToday: day === today.getDate() });
  }

  return {
    monthName: gregorianMonthNames[monthIndex],
    year,
    cells,
  };
};

const getDateInTimeZone = (timeZone: string) => {
  const localeString = new Date().toLocaleString("en-US", { timeZone });
  const date = new Date(localeString);
  date.setHours(12, 0, 0, 0);
  return date;
};

export default function CalendarPage() {
  const [locale, setLocale] = useState<Locale>("bn");
  const today = useMemo(() => getDateInTimeZone("Asia/Dhaka"), []);

  const calendarData = useMemo(() => {
    if (locale === "bn") {
      return buildBanglaCalendar(today);
    }
    if (locale === "ar") {
      return buildHijriCalendar(today);
    }
    return buildGregorianCalendar(today);
  }, [locale, today]);

  return (
    <main className="min-h-screen bg-white px-3 sm:px-6 py-8 sm:py-12">
      <div className="mx-auto w-full max-w-5xl">
        <div
          className="glass-card rounded-2xl sm:rounded-3xl border border-slate-200/90 p-5 sm:p-8 shadow-xl bg-white relative overflow-hidden"
          dir={locale === "ar" ? "rtl" : "ltr"}
        >
          {/* Ambient Light */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-700 mb-2">
                <span>🗓️ {calendarLabels[locale]}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                {calendarData.monthName} {formatYearNumber(calendarData.year, locale)}
              </h1>
            </div>

            {/* Language Selector Pill */}
            <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-100 p-1 shadow-xs">
              <button
                type="button"
                onClick={() => setLocale("bn")}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  locale === "bn"
                    ? "bg-emerald-600 text-white font-bold shadow-sm shadow-emerald-600/20"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                বাংলা
              </button>
              <button
                type="button"
                onClick={() => setLocale("en")}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  locale === "en"
                    ? "bg-emerald-600 text-white font-bold shadow-sm shadow-emerald-600/20"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLocale("ar")}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  locale === "ar"
                    ? "bg-emerald-600 text-white font-bold shadow-sm shadow-emerald-600/20"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                عربي
              </button>
            </div>
          </div>

          {/* Weekday Header */}
          <div className="mt-6 sm:mt-8 grid grid-cols-7 gap-2 sm:gap-3 text-center text-xs font-bold uppercase tracking-wider text-emerald-800">
            {weekdayLabels[locale].map((day) => (
              <div key={day} className="py-2 rounded-lg bg-emerald-50 border border-emerald-100">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Cells Grid */}
          <div className="mt-3 sm:mt-4 grid grid-cols-7 gap-2 sm:gap-3">
            {calendarData.cells.map((cell, index) => (
              <div
                key={`${cell.day ?? "empty"}-${index}`}
                className={`flex h-11 sm:h-16 items-center justify-center rounded-xl sm:rounded-2xl text-xs sm:text-base font-bold transition-all duration-200 ${
                  cell.day
                    ? cell.isToday
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30 scale-105 border-2 border-emerald-500 font-extrabold"
                      : "bg-slate-50 text-slate-900 border border-slate-200 hover:border-slate-300 hover:bg-slate-100/80 shadow-2xs"
                    : "bg-transparent border border-transparent"
                }`}
              >
                {cell.day ? formatDayNumber(cell.day, locale) : ""}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
