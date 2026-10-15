"use client";

import { useEffect, useState, useRef } from "react";

interface Verse {
  id: number;
  text: string;
  translation: string;
}

interface AudioOption {
  reciter: string;
  url: string;
  originalUrl: string;
  type: string;
}

interface SurahData {
  language: string;
  audio: {
    [key: string]: AudioOption;
  };
  id: number;
  name: string;
  transliteration: string;
  translation: string;
  type: string;
  total_verses: number;
  verses: Verse[];
}

interface SurahListItem {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
}

export default function QuranBengaliPage() {
  const [surahs, setSurahs] = useState<SurahListItem[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<SurahData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedReciter, setSelectedReciter] = useState<string>("1");
  const [isPlaying, setIsPlaying] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const copyVerseToClipboard = async (verse: Verse) => {
    const textToCopy = `সুরা: ${selectedSurah?.transliteration || ''} (${selectedSurah?.translation || ''})
আয়াত: ${verse.id}

আরবি:
${verse.text}

বাংলা অনুবাদ:
${verse.translation}`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedId(verse.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Fetch surah list
  useEffect(() => {
    const fetchSurahList = async () => {
      try {
        const response = await fetch("https://api.alquran.cloud/v1/surah");
        if (!response.ok) throw new Error("Failed to fetch surahs");
        const data = await response.json();
        setSurahs(data.data as SurahListItem[]);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load surahs");
        setLoading(false);
      }
    };

    fetchSurahList();
  }, []);

  // Fetch surah details
  const fetchSurahDetails = async (surahNumber: number) => {
    try {
      setLoading(true);
      
      // Fetch original Arabic
      const arabicResponse = await fetch(
        `https://api.alquran.cloud/v1/surah/${surahNumber}`
      );
      if (!arabicResponse.ok) throw new Error("Failed to fetch Arabic surah");
      const arabicData = await arabicResponse.json();
      
      // Fetch Bengali translation
      const bengaliResponse = await fetch(
        `https://api.alquran.cloud/v1/surah/${surahNumber}/bn.bengali`
      );
      const bengaliData = bengaliResponse.ok ? await bengaliResponse.json() : null;
      
      // Fetch audio data
      const audioResponse = await fetch(
        `https://api.alquran.cloud/v1/surah/${surahNumber}/en.asad?format=json`
      );
      const audioData = audioResponse.ok ? await audioResponse.json() : null;

      // Construct surah data with both Arabic and Bengali
      const arabicSurah = arabicData.data;
      const bengaliSurah = bengaliData?.data;
      
      const surahWithAudio: SurahData = {
        language: "bn",
        audio: audioData?.data?.audio || {
          "1": {
            reciter: "Mishary Rashid Al-Afasy",
            url: `https://server8.mp3quran.net/afs/${String(surahNumber).padStart(3, "0")}.mp3`,
            originalUrl: `https://server8.mp3quran.net/afs/${String(surahNumber).padStart(3, "0")}.mp3`,
            type: "complete_surah",
          },
        },
        id: arabicSurah.number,
        name: arabicSurah.name,
        transliteration: arabicSurah.englishName,
        translation: arabicSurah.englishNameTranslation,
        type: arabicSurah.revelationType.toLowerCase(),
        total_verses: arabicSurah.numberOfAyahs,
        verses: arabicSurah.ayahs.map((ayah: any, index: number) => ({
          id: ayah.numberInSurah,
          text: ayah.text, // Original Arabic
          translation: bengaliSurah?.ayahs[index]?.text || "অনুবাদ লোড হচ্ছে...", // Bengali translation
        })),
      };

      setSelectedSurah(surahWithAudio);
      setSelectedReciter("1");
      setIsPlaying(false);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load surah");
    } finally {
      setLoading(false);
    }
  };

  const playAudio = () => {
    if (!selectedSurah || !selectedSurah.audio[selectedReciter]) {
      alert("অডিও উপলব্ধ নেই");
      return;
    }

    if (audioRef.current) {
      const audioUrl = selectedSurah.audio[selectedReciter].url;
      audioRef.current.src = audioUrl;
      audioRef.current.play().catch((err) => {
        console.error("Error playing audio:", err);
        alert("অডিও প্লে করতে সমস্যা হয়েছে");
      });
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  if (loading && surahs.length === 0) {
    return (
      <main className="min-h-screen bg-white">
        <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 py-3 px-3 sm:py-4 sm:px-6 animate-pulse">
          <div className="max-w-7xl mx-auto">
            <div className="h-6 w-48 bg-slate-200 rounded mb-2"></div>
            <div className="h-4 w-64 bg-slate-100 rounded"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 animate-pulse">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-slate-200 max-h-80 lg:max-h-[calc(100vh-200px)] p-3 space-y-2">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="h-12 bg-slate-100 rounded"></div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg border border-slate-200 p-4 space-y-4">
                <div className="h-8 w-32 bg-slate-200 rounded"></div>
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="bg-slate-50 rounded-lg p-4 space-y-3 border border-slate-100">
                      <div className="h-6 w-32 bg-slate-200 rounded"></div>
                      <div className="h-32 bg-slate-100 rounded"></div>
                      <div className="space-y-2">
                        <div className="h-4 w-24 bg-slate-200 rounded"></div>
                        <div className="h-12 bg-slate-100 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 py-3 px-3 sm:py-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
            📖 আল-কুরআন বাংলা
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            সম্পূর্ণ কুরআন বাংলা অনুবাদ ও অডিও সহ
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Surahs List - Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm max-h-80 lg:max-h-[calc(100vh-200px)] overflow-y-auto sticky top-20">
              <div className="p-3 bg-slate-50 sticky top-0 border-b border-slate-200">
                <h2 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  সুরাহ সমূহ ({surahs.length})
                </h2>
              </div>
              <div className="p-1.5 space-y-0.5">
                {surahs.map((surah) => (
                  <button
                    key={surah.number}
                    onClick={() => fetchSurahDetails(surah.number)}
                    className={`w-full text-left p-2 rounded-lg transition-all duration-200 text-xs ${
                      selectedSurah?.id === surah.number
                        ? "bg-emerald-600 text-white font-semibold shadow-xs"
                        : "bg-transparent hover:bg-slate-100 text-slate-700"
                    }`}
                  >
                    <p className="font-semibold truncate text-xs">{surah.number}. {surah.englishName}</p>
                    <p className={`text-[10px] truncate ${selectedSurah?.id === surah.number ? "text-emerald-100" : "text-slate-400"}`}>
                      {surah.englishNameTranslation}
                    </p>
                  </button>
                ))}  
              </div>
            </div>
          </div>

          {/* Surah Content - Right */}
          <div className="lg:col-span-3">
            {selectedSurah ? (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6">
                {/* Surah Header */}
                <div className="mb-4 pb-4 border-b border-slate-200">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
                        {selectedSurah.transliteration}
                      </h2>
                      <p className="text-sm sm:text-base text-slate-600 font-medium">
                        {selectedSurah.translation}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 text-xs text-slate-500 font-medium text-right flex-shrink-0">
                      <span>📍 #{selectedSurah.id}</span>
                      <span>📿 {selectedSurah.total_verses} আয়াত</span>
                      <span>{selectedSurah.type === "meccan" ? "🕌 মাক্কী" : "🕋️ মাদানী"}</span>
                    </div>
                  </div>

                  {/* Audio Controls */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mt-4">
                    <div className="flex gap-2">
                      <button
                        onClick={isPlaying ? pauseAudio : playAudio}
                        className={`flex-1 py-2 rounded-lg font-bold text-white text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-xs ${
                          isPlaying
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-emerald-600 hover:bg-emerald-700"
                        }`}
                      >
                        {isPlaying ? "⏸ থামান" : "▶ অডিও শুনুন"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Verses */}
                <div className="space-y-3 max-h-80 lg:max-h-[calc(100vh-380px)] overflow-y-auto pr-1">
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-emerald-500"></div>
                    </div>
                  ) : (
                    selectedSurah.verses.map((verse) => (
                    <div
                      key={verse.id}
                      className="bg-slate-50/70 border border-slate-200 rounded-xl p-3 sm:p-4 hover:border-slate-300 transition-all relative"
                    >
                      {/* Copy Button */}
                      <button
                        onClick={() => copyVerseToClipboard(verse)}
                        className="absolute top-2.5 right-2.5 bg-white hover:bg-emerald-600 hover:text-white text-slate-500 p-1.5 rounded-lg transition-all duration-200 z-10 border border-slate-200 shadow-2xs"
                        title="আয়াত কপি করুন"
                      >
                        {copiedId === verse.id ? (
                          <svg
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                        )}
                      </button>

                      <div className="mb-2 flex items-center gap-2 pr-8">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center flex-shrink-0">
                          <span className="text-[10px] sm:text-xs font-bold text-emerald-800">{verse.id}</span>
                        </div>
                        <span className="text-[10px] sm:text-xs text-slate-500 font-medium">আয়াত {verse.id}</span>
                      </div>

                      {/* Arabic Text */}
                      <p className="text-right text-slate-900 mb-3 leading-loose text-base sm:text-xl font-semibold font-arabic">
                        {verse.text}
                      </p>

                      {/* Bengali Translation */}
                      <div className="border-l-2 border-emerald-500 pl-3 py-0.5">
                        <p className="text-[10px] sm:text-xs text-emerald-800 font-bold mb-0.5">বাংলা অনুবাদ:</p>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {verse.translation}
                        </p>
                      </div>
                    </div>
                  ))
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 text-center">
                <p className="text-slate-500 text-lg">
                  📚 বাঁয়ে একটি সুরাহ নির্বাচন করুন
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
        onError={() => {
          setIsPlaying(false);
          alert("অডিও লোড করতে সমস্যা হয়েছে");
        }}
        crossOrigin="anonymous"
      />
    </main>
  );
}
