"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

export default function IslamicTVPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const videoSrc = "https://streaming.madanichannel.tv/static/streaming-playlists/hls/d3e49b76-ac06-4689-a641-9200445b647f/master.m3u8";
    let hls: Hls | null = null;

    const attemptAutoPlay = () => {
      if (!video) return;
      video.muted = false;
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => undefined);
      }
    };

    const handleCanPlay = () => {
      setLoading(false);
      attemptAutoPlay();
    };
    const handleError = () => setError("ভিডিও চালাতে সমস্যা হয়েছে।");

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoSrc;
      video.addEventListener("canplay", handleCanPlay);
      video.addEventListener("error", handleError);
    } else if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setLoading(false);
        attemptAutoPlay();
      });
      hls.on(Hls.Events.ERROR, () => setError("ভিডিও চালাতে সমস্যা হয়েছে।"));
    } else {
      setError("এই ব্রাউজারে HLS সাপোর্ট নেই।");
      setLoading(false);
    }

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

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
                <p className="text-xs sm:text-sm font-bold text-slate-900 leading-none">মাদানী চ্যানেল লাইভ</p>
                <p className="text-[10px] text-slate-500 mt-1">Madani Channel Live Stream</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                HD 720p
              </span>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 sm:p-6 text-center mb-4">
              <p className="text-red-600 text-sm sm:text-base font-medium">{error}</p>
            </div>
          )}

          {/* Video Player */}
          <div className="relative bg-black rounded-xl sm:rounded-2xl overflow-hidden shadow-xl border border-slate-200">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/90 z-10 backdrop-blur-sm">
                <div className="text-center">
                  <div className="relative mx-auto mb-4 h-12 w-12">
                    <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20"></div>
                    <div className="absolute inset-0 rounded-full border-t-2 border-emerald-400 animate-spin"></div>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-slate-300">ভিডিও লোড হচ্ছে...</p>
                </div>
              </div>
            )}

            <video
              ref={videoRef}
              className="w-full h-auto min-h-80 sm:min-h-96 md:min-h-[500px] object-cover"
              controls
              autoPlay
              preload="auto"
              playsInline
            />
          </div>
        </div>

        {/* Features / Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
            <div className="text-2xl mb-2">⚡</div>
            <h2 className="text-sm font-bold text-slate-900 mb-1">স্মুথ ও হাই কোয়ালিটি</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              স্বয়ংক্রিয় HLS অ্যাডাপটিভ বিটরেটের মাধ্যমে নিরবচ্ছিন্ন স্ট্রিমিং।
            </p>
          </div>
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
            <div className="text-2xl mb-2">🕌</div>
            <h2 className="text-sm font-bold text-slate-900 mb-1">দ্বীনি আলোচনা ও বয়ান</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              নিয়মিত কুরআন তিলাওয়াত, নাত-ই-রাসূল এবং ইসলামিক শিক্ষামূলক অনুষ্ঠান।
            </p>
          </div>
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
            <div className="text-2xl mb-2">📱</div>
            <h2 className="text-sm font-bold text-slate-900 mb-1">সব ডিভাইসে প্রস্তুত</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              মোবাইল, ট্যাবলেট এবং কম্পিউটার সব ডিভাইসেই ফুলস্ক্রিনে দেখার সুবিধা।
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
