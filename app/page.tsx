"use client";

import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import { PrayerTimesDisplay } from "@/components/PrayerTimesDisplay";
import { ErrorDisplay } from "@/components/LoadingError";

// Hardcoded Bangladesh location (Dhaka)
const BANGLADESH_COORDINATES = {
  latitude: 23.8053793,
  longitude: 90.3612129,
  timezone: "Asia/Dhaka",
};

export default function Home() {
  const {
    prayerTimes,
    loading: prayerLoading,
    error: prayerError,
    date,
    timeZone,
  } = usePrayerTimes(
    BANGLADESH_COORDINATES.latitude,
    BANGLADESH_COORDINATES.longitude
  );

  // Error state
  if (prayerError) {
    return <ErrorDisplay error={prayerError} />;
  }

  const locationDisplay = "বাংলাদেশ";

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 py-8">
      <PrayerTimesDisplay
        prayerTimes={prayerTimes}
        location={locationDisplay}
        date={date}
        timeZone={timeZone}
      />
    </main>
  );
}
