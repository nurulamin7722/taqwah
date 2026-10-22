"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

interface Channel {
  id: string;
  name: string;
  englishName: string;
  url: string;
  quality: string;
}

const CHANNELS: Channel[] = [
  // {
  //   id: "peacetv-bangla",
  //   name: "পিস টিভি বাংলা",
  //   englishName: "Peace TV Bangla Live Stream",
  //   url: "https://dzkyvlfyge.erbvr.com/PeaceTvBangla/index.m3u8?q=auto",
  //   quality: "Full HD 1080p",
  // },
  {
    id: "islamtv-bangla",
    name: "ইসলাম টিভি বাংলা",
    englishName: "Islam TV Bangla Live Stream",
    url: "/api/stream?url=https%3A%2F%2Flive-islamtv-bangla.simplestreamcdn.com%2Fout%2Fv1%2Fislamchannel%2Fislamtv-bangla%2Fhls-ts%2Findex.m3u8",
    quality: "HD Live",
  },
  {
    id: "sharjah-quran",
    name: "শারজাহ কুরআন টিভি",
    englishName: "Sharjah Quran TV Live Stream • পবিত্র কুরআন তিলাওয়াত",
    url: "https://live.kwikmotion.com/sharjahtvquranlive/shqurantv.smil/sharjahtvquranpublish/shqurantv_source/chunks.m3u8",
    quality: "HD Live",
  },
];

export default function IslamicTVPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [currentChannel, setCurrentChannel] = useState<Channel>(CHANNELS[0]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setError(null);
    setLoading(true);

    // Clean up any existing HLS instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    const attemptAutoPlay = () => {
      if (!video) return;
      const playPromise = video.play();
      if (playPromise !== undefined && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          // If unmuted autoplay is blocked by browser policy, fallback to muted autoplay
          video.muted = true;
          video.play().catch(() => undefined);
        });
      }
    };

    const handleCanPlay = () => {
      setLoading(false);
      attemptAutoPlay();
    };

    const handlePlaying = () => {
      setLoading(false);
      setError(null);
    };

    const handleNativeError = () => {
      setError("ভিডিও চালাতে সমস্যা হয়েছে। অনুগ্রহ করে পেজটি রিফ্রেশ করুন বা অন্য চ্যানেল নির্বাচন করুন।");
      setLoading(false);
    };

    // Native Safari / iOS HLS
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = currentChannel.url;
      video.addEventListener("canplay", handleCanPlay);
      video.addEventListener("playing", handlePlaying);
      video.addEventListener("error", handleNativeError);
    } else if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90,
      });

      hlsRef.current = hls;

      hls.loadSource(currentChannel.url);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setLoading(false);
        attemptAutoPlay();
      });

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.warn("HLS fatal network error, recovering...", data);
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.warn("HLS fatal media error, recovering...", data);
              hls.recoverMediaError();
              break;
            default:
              console.error("HLS unrecoverable error:", data);
              hls.destroy();
              setError("ভিডিও লোড করতে সমস্যা হয়েছে। অনুগ্রহ করে চ্যানেলটি পুনরায় নির্বাচন করুন।");
              setLoading(false);
              break;
          }
        }
      });
    } else {
      setError("আপনার ব্রাউজারে লাইভ HLS ভিডিও সাপোর্ট নেই।");
      setLoading(false);
    }

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("error", handleNativeError);
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [currentChannel]);

  return (
    <main className="min-h-screen bg-white px-3 sm:px-6 py-8 sm:py-12">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-700 mb-3 shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span>লাইভ সম্প্রচার • LIVE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-2">
            ইসলামিক টিভি
          </h1>
          <p className="text-sm sm:text-base text-slate-500 max-w-md mx-auto">
            ২৪ ঘণ্টা সরাসরি ইসলামিক অনুষ্ঠান, তিলাওয়াত ও দ্বীনি আলোচনা
          </p>
        </div>

        {/* Channels Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-6">
          {CHANNELS.map((ch) => {
            const isSelected = ch.id === currentChannel.id;
            return (
              <button
                key={ch.id}
                onClick={() => {
                  if (ch.id !== currentChannel.id) {
                    setCurrentChannel(ch);
                  }
                }}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                  isSelected
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20"
                    : "bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-slate-50"
                }`}
              >
                <span className={`h-2.5 w-2.5 rounded-full ${isSelected ? "bg-white animate-pulse" : "bg-emerald-500"}`} />
                <span>{ch.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${isSelected ? "bg-emerald-700 text-emerald-100" : "bg-slate-100 text-slate-500"}`}>
                  {ch.quality}
                </span>
              </button>
            );
          })}
        </div>

        {/* Video Container - Luxury Theater Card */}
        <div className="glass-card rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 border border-slate-200/90 shadow-xl bg-white mb-6 sm:mb-8 relative overflow-hidden">
          {/* Subtle Ambient Glow behind player */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Player Header Bar */}
          <div className="flex items-center justify-between px-2 pb-3.5 sm:pb-4 border-b border-slate-100 mb-3 sm:mb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-600 font-bold text-xs">
                📺
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900 leading-none">
                  {currentChannel.name} লাইভ
                </p>
                <p className="text-[10px] text-slate-500 mt-1">
                  {currentChannel.englishName}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                {currentChannel.quality}
              </span>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 sm:p-6 text-center mb-4">
              <p className="text-red-600 text-sm sm:text-base font-medium">{error}</p>
              <button
                onClick={() => {
                  setError(null);
                  setLoading(true);
                  const ch = { ...currentChannel };
                  setCurrentChannel(ch);
                }}
                className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition-colors"
              >
                আবার চেষ্টা করুন
              </button>
            </div>
          )}

          {/* Video Player */}
          <div className="relative bg-black rounded-xl sm:rounded-2xl overflow-hidden shadow-xl border border-slate-200">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/90 z-10 backdrop-blur-sm pointer-events-none">
                <div className="text-center">
                  <div className="relative mx-auto mb-4 h-12 w-12">
                    <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20"></div>
                    <div className="absolute inset-0 rounded-full border-t-2 border-emerald-400 animate-spin"></div>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-slate-300">
                    {currentChannel.name} লাইভ লোড হচ্ছে...
                  </p>
                </div>
              </div>
            )}

            <video
              ref={videoRef}
              className="w-full h-auto min-h-80 sm:min-h-96 md:min-h-[500px] object-cover"
              controls
              autoPlay
              playsInline
              preload="auto"
            />
          </div>
        </div>

        {/* Features / Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
            <div className="text-2xl mb-2">⚡</div>
            <h2 className="text-sm font-bold text-slate-900 mb-1">স্মুথ ও হাই কোয়ালিটি</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              স্বয়ংক্রিয় HLS অ্যাডাপটিভ বিটরেটের মাধ্যমে নিরবচ্ছিন্ন লাইভ স্ট্রিমিং।
            </p>
          </div>
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
            <div className="text-2xl mb-2">🕌</div>
            <h2 className="text-sm font-bold text-slate-900 mb-1">দ্বীনি আলোচনা ও বয়ান</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              পিস টিভি বাংলা, ইসলাম টিভি বাংলা ও শারজাহ কুরআন টিভির সার্বক্ষণিক সম্প্রচার।
            </p>
          </div>
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
            <div className="text-2xl mb-2">📱</div>
            <h2 className="text-sm font-bold text-slate-900 mb-1">সব ডিভাইসে প্রস্তুত</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              মোবাইল, ট্যাবলেট ও কম্পিউটারে ফুলস্ক্রিন ও এইচডি কোয়ালিটিতে দেখার সুবিধা।
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
