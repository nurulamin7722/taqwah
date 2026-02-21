"use client";

import { useEffect, useRef, useState } from "react";

export default function IslamicTVPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(50);
  const [fullscreen, setFullscreen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Immediately load the video source
    const videoSrc = "https://dzkyvlfyge.erbvr.com/PeaceTvBangla/tracks-v3a1/mono.m3u8";
    video.src = videoSrc;
    
    // Unmute and set initial volume to 50%
    video.muted = false;
    video.volume = 0.5;

    setLoading(false);

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play().catch((err) => {
          console.error("Play error:", err);
          setError("ভিডিও চালু করতে সমস্যা হয়েছে।");
        });
      } else {
        video.pause();
      }
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (video) {
      video.volume = newVolume / 100;
    }
  };

  const toggleFullscreen = async () => {
    const video = videoRef.current;
    if (!video || !video.parentElement) return;

    try {
      if (!document.fullscreenElement) {
        await video.parentElement.requestFullscreen();
        setFullscreen(true);
      } else {
        await document.exitFullscreen();
        setFullscreen(false);
      }
    } catch (err) {
      console.error("Fullscreen error:", err);
    }
  };

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
          <div className="relative bg-black rounded-lg overflow-hidden mb-4 group">
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
              controls={false}
              controlsList="nodownload"
              autoPlay
              muted
              preload="auto"
              playsInline
            />

            {/* Custom Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {/* Progress Bar */}
              <div className="mb-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  onChange={(e) => {
                    const video = videoRef.current;
                    if (video) {
                      video.currentTime = (parseFloat(e.target.value) / 100) * video.duration;
                    }
                  }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-4">
                  {/* Play/Pause */}
                  <button
                    onClick={togglePlay}
                    className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-all text-white"
                    title={isPlaying ? "থামান" : "চালান"}
                  >
                    {isPlaying ? (
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>

                  {/* Mute */}
                  <button
                    onClick={toggleMute}
                    className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all text-white"
                    title={isMuted ? "সাউন্ড চালু করুন" : "সাউন্ড বন্ধ করুন"}
                  >
                    {isMuted ? (
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16.6915026,16.4744748 L17.1491506,15.75 L8.75814536,7.45312286 C8.25742683,7.81779885 7.89857387,8.38575983 7.89857387,9.03631191 L7.89857387,14.0151496 C7.89857387,15.5586317 8.89148936,16.8390151 10.2159337,17.0151496 L10.2159337,19.1102252 C7.09933393,18.9323498 4.625,16.3232558 4.625,13.0151496 L4.625,9.03631191 C4.625,7.38768657 5.43531685,5.92285309 6.72555982,5.0661816 L1.81834215,0.322580645 L3.34799145,0 L19,16.1935484 L17.4700357,16.5161291" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.26 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                      </svg>
                    )}
                  </button>

                  {/* Volume Control */}
                  <div className="hidden sm:flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-24 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                    <span className="text-xs text-gray-300 w-8">{volume}%</span>
                  </div>
                </div>

                {/* Fullscreen */}
                <button
                  onClick={toggleFullscreen}
                  className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all text-white"
                  title={fullscreen ? "সম্পূর্ণ স্ক্রিন বন্ধ করুন" : "সম্পূর্ণ স্ক্রিন"}
                >
                  {fullscreen ? (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
