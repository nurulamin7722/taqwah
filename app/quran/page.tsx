"use client";

import { useEffect, useState } from "react";
import { ErrorDisplay } from "@/components/LoadingError";
import { useQuranPlayer } from "@/components/QuranPlayerContext";

interface SurahInfo {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

interface SurahResponse {
  data: SurahInfo[];
}

const surahBengaliNames: Record<number, string> = {
  1: "ফাতিহা",
  2: "বাকারা",
  3: "আলে ইমরান",
  4: "নিসা",
  5: "মায়েদা",
  6: "আনআম",
  7: "আরাফ",
  8: "আনফাল",
  9: "তাওবা",
  10: "ইউনুস",
  11: "হুদ",
  12: "ইউসুফ",
  13: "রাদ",
  14: "ইবরাহিম",
  15: "হিজর",
  16: "নাহল",
  17: "ইসরা",
  18: "কাহফ",
  19: "মরিয়াম",
  20: "তাহা",
  21: "আম্বিয়া",
  22: "হাজ",
  23: "মুমিনুন",
  24: "নুর",
  25: "ফুরকান",
  26: "শুয়ারা",
  27: "নামল",
  28: "কাসাস",
  29: "আনকাবুত",
  30: "রুম",
  31: "লুকমান",
  32: "সাজদা",
  33: "আহজাব",
  34: "সাবা",
  35: "ফাতির",
  36: "ইয়াসিন",
  37: "সাফফাত",
  38: "সাদ",
  39: "জুমার",
  40: "গাফির",
  41: "ফুসসিলাত",
  42: "শুরা",
  43: "জুখরুফ",
  44: "দুখান",
  45: "জাসিয়া",
  46: "আহকাফ",
  47: "মুহাম্মাদ",
  48: "ফাতহ",
  49: "হুজুরাত",
  50: "কাফ",
  51: "জারিয়াত",
  52: "তুর",
  53: "নাজম",
  54: "কামার",
  55: "রহমান",
  56: "ওয়াকিয়া",
  57: "হাদিদ",
  58: "মুজাদালা",
  59: "হাশর",
  60: "মুমতাহিনা",
  61: "সাফ",
  62: "জুমুআ",
  63: "মুনাফিকুন",
  64: "তাগাবুন",
  65: "তালাক",
  66: "তাহরিম",
  67: "মুলক",
  68: "কলম",
  69: "হাক্কা",
  70: "মাআরিজ",
  71: "নুহ",
  72: "জিন",
  73: "মুজাম্মিল",
  74: "মুদ্দাস্সির",
  75: "কিয়ামা",
  76: "আদ-দাহর",
  77: "মুরসালাত",
  78: "নাবা",
  79: "নাজিআত",
  80: "আবাসা",
  81: "তাকউইর",
  82: "ইনফিতার",
  83: "মুতাফ্‌ফিফিন",
  84: "ইনশিকাক",
  85: "বুরুজ",
  86: "তারিক",
  87: "আ'লা",
  88: "গাশিয়া",
  89: "ফাজর",
  90: "বালাদ",
  91: "শামস",
  92: "লাইল",
  93: "দুহা",
  94: "ইনশিরাহ",
  95: "তিন",
  96: "আলাক",
  97: "কদর",
  98: "বাইয়িনা",
  99: "জিলজাল",
  100: "আদিয়াত",
  101: "আল-কারিয়া",
  102: "আত-তাকাসুর",
  103: "আল-আসর",
  104: "আল-হুমাজা",
  105: "আল-ফিল",
  106: "কুরাইশ",
  107: "আল-মাউন",
  108: "আল-কাউসার",
  109: "আল-কাফিরুন",
  110: "আন-নাসর",
  111: "আল-লাহাব",
  112: "আল-ইখলাস",
  113: "আল-ফালাক",
  114: "আন-নাস",
};

export default function QuranPage() {
  const [surahs, setSurahs] = useState<SurahInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { currentSurah, playSurah, isPlaying, setSurahs: setContextSurahs } = useQuranPlayer();

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://api.alquran.cloud/v1/surah");
        if (!response.ok) {
          throw new Error("Failed to load surah list");
        }
        const data = (await response.json()) as SurahResponse;
        setSurahs(data.data);
        setContextSurahs(data.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching surah list:", err);
        setError("Unable to load the Quran list right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchSurahs();
  }, [setContextSurahs]);

  const filteredSurahs = surahs.filter((surah) => {
    const query = searchQuery.toLowerCase();
    return (
      surah.englishName.toLowerCase().includes(query) ||
      surahBengaliNames[surah.number]?.toLowerCase().includes(query) ||
      surah.name.toLowerCase().includes(query) ||
      surah.number.toString().includes(query)
    );
  });

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <main className="min-h-screen bg-white px-3 sm:px-6 py-8 sm:py-12">
      <div className="mx-auto w-full max-w-5xl">
        <div className="glass-card rounded-2xl sm:rounded-3xl border border-slate-200/90 p-4 sm:p-8 shadow-xl bg-white relative overflow-hidden">
          {/* Ambient Light */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-700 mb-2">
                <span>📖 আল-কুরআনুল কারীম</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                সকল সূরা
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-500">
                আরবি অডিও তিলাওয়াত ও ১১৪টি সূরার তালিকা
              </p>
            </div>
          </div>

          {/* Luxury Search Input */}
          <div className="mt-5 sm:mt-7 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              🔍
            </div>
            <input
              type="text"
              placeholder="সূরার নাম (বাংলা বা ইংরেজি) অথবা নম্বর দিয়ে সার্চ করুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 sm:py-3.5 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:bg-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-xs"
            />
          </div>

          {/* Results Count */}
          {!loading && (
            <div className="mt-3 sm:mt-4 flex items-center justify-between text-xs text-slate-500">
              <p>
                প্রদর্শিত সূরা: <span className="text-emerald-700 font-bold">{filteredSurahs.length}</span> টি {searchQuery && `(মোট ${surahs.length} টির মধ্যে)`}
              </p>
            </div>
          )}

          {loading ? (
            <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-3 sm:gap-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="h-16 rounded-2xl border border-slate-200 bg-slate-100 animate-pulse"
                />
              ))}
            </div>
          ) : filteredSurahs.length === 0 ? (
            <div className="mt-8 text-center py-16 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
              <p className="text-3xl mb-2">🔍</p>
              <p className="text-slate-800 font-medium">কোনো সূরা খুঁজে পাওয়া যায়নি</p>
              <p className="text-xs text-slate-500 mt-1">অনুগ্রহ করে সঠিক নাম বা সূরা নম্বর দিয়ে আবার চেষ্টা করুন</p>
            </div>
          ) : (
            <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-3 sm:gap-3.5">
              {filteredSurahs.map((surah) => {
                const isCurrent = currentSurah?.number === surah.number;
                return (
                  <div
                    key={surah.number}
                    onClick={() => playSurah(surah)}
                    className={`flex w-full items-center gap-3 sm:gap-4 rounded-xl sm:rounded-2xl border px-3.5 sm:px-5 py-3 sm:py-4 text-left transition-all duration-200 cursor-pointer flex-wrap sm:flex-nowrap ${
                      isCurrent
                        ? "border-emerald-500 bg-emerald-50/70 shadow-md shadow-emerald-500/10"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60 shadow-2xs"
                    }`}
                  >
                    {/* Surah Number */}
                    <div className="flex flex-col items-center justify-center rounded-xl bg-slate-100 border border-slate-200 px-2.5 py-1.5 min-w-[42px] sm:min-w-[48px]">
                      <p className="text-[9px] text-slate-500 uppercase font-semibold">নং</p>
                      <p className="text-xs sm:text-sm font-bold text-slate-900 font-mono">
                        {surah.number}
                      </p>
                    </div>

                    {/* Middle content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm sm:text-base font-bold text-slate-900 truncate">
                          {surah.englishName}
                        </p>
                        <span className="text-xs text-emerald-700 font-bold">
                          • {surahBengaliNames[surah.number] || surah.name}
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 truncate">
                        {surah.englishNameTranslation} · <span className="text-slate-700 font-medium">{surah.revelationType === 'Meccan' ? 'মাক্কী' : 'মাদানী'}</span> · {surah.numberOfAyahs} আয়াত
                      </p>
                    </div>

                    {/* Arabic name and Play button */}
                    <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                      <p className="text-sm sm:text-xl font-bold text-emerald-800 text-right hidden sm:block font-serif">
                        {surah.name}
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          playSurah(surah);
                        }}
                        className={`flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
                          isCurrent && isPlaying
                            ? "bg-red-500 hover:bg-red-600 text-white shadow-red-500/20"
                            : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20 hover:scale-105"
                        }`}
                      >
                        {isCurrent && isPlaying ? "⏸" : "▶"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
