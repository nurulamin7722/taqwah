"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface SurahInfo {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
}

interface QuranPlayerState {
  currentSurah: SurahInfo | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playSurah: (surah: SurahInfo) => void;
  togglePlay: () => void;
  setSurahs: (surahs: SurahInfo[]) => void;
}

const AUDIO_BASE_URL = "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy";

const QuranPlayerContext = createContext<QuranPlayerState | null>(null);

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds <= 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, "0")}`;
};

export function QuranPlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentSurah, setCurrentSurah] = useState<SurahInfo | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [surahs, setSurahs] = useState<SurahInfo[]>([]);

  const playSurah = (surah: SurahInfo) => {
    const audio = audioRef.current;
    if (!audio) return;
    const nextUrl = `${AUDIO_BASE_URL}/${surah.number}.mp3`;
    if (audio.src !== nextUrl) {
      audio.src = nextUrl;
    }
    setCurrentSurah(surah);
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch((err) => {
        console.error("Playback error:", err);
        setIsPlaying(false);
      });
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.error("Playback error:", err);
          setIsPlaying(false);
        });
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoaded = () => setDuration(audio.duration || 0);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    
    const handleEnded = () => {
      setIsPlaying(false);
      // Play next surah automatically
      if (currentSurah && surahs.length > 0) {
        const currentIndex = surahs.findIndex(
          (s) => s.number === currentSurah.number
        );
        if (currentIndex !== -1 && currentIndex < surahs.length - 1) {
          const nextSurah = surahs[currentIndex + 1];
          setTimeout(() => playSurah(nextSurah), 500);
        }
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoaded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoaded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSurah, surahs]);

  const value = useMemo(
    () => ({
      currentSurah,
      isPlaying,
      currentTime,
      duration,
      playSurah,
      togglePlay,
      setSurahs,
    }),
    [currentSurah, isPlaying, currentTime, duration]
  );

  return (
    <QuranPlayerContext.Provider value={value}>
      {children}
      <audio ref={audioRef} preload="none" />
      {currentSurah && (
        <div className="fixed bottom-6 right-6 z-50 w-[280px] rounded-2xl border border-slate-700 bg-slate-900/90 p-4 shadow-2xl backdrop-blur">
          <p className="text-xs text-slate-400">Now Playing</p>
          <p className="mt-1 text-sm font-semibold text-white">
            {currentSurah.englishName} · {currentSurah.name}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {currentSurah.englishNameTranslation}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <button
              type="button"
              onClick={togglePlay}
              className="rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-900"
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
            <p className="text-xs text-slate-400">
              {formatTime(currentTime)} / {formatTime(duration)}
            </p>
          </div>
        </div>
      )}
    </QuranPlayerContext.Provider>
  );
}

export function useQuranPlayer() {
  const context = useContext(QuranPlayerContext);
  if (!context) {
    throw new Error("useQuranPlayer must be used within QuranPlayerProvider");
  }
  return context;
}
