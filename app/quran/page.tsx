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
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-3 sm:px-6 py-6 sm:py-10">
      <div className="mx-auto w-full max-w-5xl">
        <div className="rounded-xl sm:rounded-[28px] border border-slate-700 bg-slate-900/70 p-4 sm:p-8 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">
                আল-কুরআন
              </p>
              <h1 className="mt-2 text-2xl sm:text-3xl font-semibold text-white">
                সকল সূরা
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-slate-400">
                আপনার পছন্দের সূরা শুনুন
              </p>
            </div>
          </div>

          {/* Search Input */}
          <div className="mt-4 sm:mt-6">
            <input
              type="text"
              placeholder="সুরা সার্চ করুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg sm:rounded-xl border border-slate-700 bg-slate-800/50 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-slate-100 placeholder-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
            />
          </div>

          {/* Results Count */}
          {!loading && (
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-slate-400">
              {filteredSurahs.length} টি সূরা {searchQuery && `(মোট: ${surahs.length})`}
            </p>
          )}

          {loading ? (
            <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-3 sm:gap-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="h-14 sm:h-16 rounded-lg sm:rounded-2xl border border-slate-700 bg-slate-800/60 animate-pulse"
                />
              ))}
            </div>
          ) : filteredSurahs.length === 0 ? (
            <div className="mt-8 text-center py-12">
              <p className="text-slate-400">কোনো সূরা খুঁজে পাওয়া যায়নি</p>
            </div>
          ) : (
            <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-3 sm:gap-4">
              {filteredSurahs.map((surah) => (
                <div
                  key={surah.number}
                  onClick={() => playSurah(surah)}
                  className={`flex w-full items-center gap-2 sm:gap-4 rounded-lg sm:rounded-2xl border px-3 sm:px-5 py-2 sm:py-4 text-left transition-all cursor-pointer flex-wrap sm:flex-nowrap ${
                    currentSurah?.number === surah.number
                      ? "border-emerald-400 bg-emerald-500/10"
                      : "border-slate-700 bg-slate-900/70 hover:border-emerald-400/70"
                  }`}
                >
                  {/* Surah Number */}
                  <div className="flex flex-col items-center justify-center rounded-lg bg-slate-800 px-2 py-1.5 sm:px-2 sm:py-2 min-w-fit">
                    <p className="text-[8px] sm:text-xs text-slate-400">নম্বর</p>
                    <p className="text-xs sm:text-sm font-bold text-white">
                      {surah.number}
                    </p>
                  </div>

                  {/* Ayah count */}
                  <div className="flex flex-col items-center justify-center rounded-lg bg-slate-800 px-2 sm:px-3 py-1.5 sm:py-2 min-w-fit">
                    <p className="text-[8px] sm:text-xs text-slate-400">আয়াত</p>
                    <p className="text-xs sm:text-lg font-bold text-emerald-300">
                      {surah.numberOfAyahs}
                    </p>
                  </div>

                  {/* Middle content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-lg font-semibold text-white truncate">
                      {surah.englishName}
                    </p>
                    <p className="text-xs sm:text-sm text-emerald-300 font-medium truncate">
                      {surahBengaliNames[surah.number] || surah.name}
                    </p>
                    <p className="text-[8px] sm:text-xs text-slate-400 mt-0.5 sm:mt-1">
                      {surah.englishNameTranslation} · {surah.revelationType}
                    </p>
                  </div>

                  {/* Arabic name and Play button */}
                  <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
                    <p className="text-xs sm:text-lg font-semibold text-white text-right hidden sm:block">
                      {surah.name}
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        playSurah(surah);
                      }}
                      className={`rounded-lg px-2 sm:px-4 py-1 sm:py-2 text-[10px] sm:text-sm font-semibold transition-all whitespace-nowrap ${
                        currentSurah?.number === surah.number && isPlaying
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-emerald-500 hover:bg-emerald-400 text-slate-900"
                      }`}
                    >
                      {currentSurah?.number === surah.number && isPlaying
                        ? "⏸"
                        : "▶"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
