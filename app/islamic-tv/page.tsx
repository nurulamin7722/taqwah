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
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-3 sm:px-6 py-6 sm:py-10">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3">
            🕌 ইসলামিক টিভি
          </h1>
          <p className="text-sm sm:text-base text-gray-400">
            লাইভ ইসলামিক টিভি স্ট্রিমিং
          </p>
        </div>

        {/* Video Container */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-700 shadow-2xl mb-6 sm:mb-8">
          {error && (
            <div className="bg-red-900/20 border border-red-700/50 rounded-xl p-4 sm:p-6 text-center mb-4">
              <p className="text-red-400 text-sm sm:text-base">{error}</p>
            </div>
          )}

          {/* Video Player */}
          <div className="relative bg-black rounded-lg overflow-hidden mb-4">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500 mx-auto mb-4"></div>
                  <p className="text-gray-300">লোড হচ্ছে...</p>
                </div>
              </div>
            )}

            <video
              ref={videoRef}
              className="w-full h-auto min-h-80 sm:min-h-96 md:min-h-[500px]"
              controls
              autoPlay
              preload="auto"
              playsInline
            />

          </div>
        </div>
      </div>
    </main>
  );
}
