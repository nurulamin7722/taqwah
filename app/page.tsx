"use client";

import { useEffect, useState } from "react";
import { useGeolocation } from "@/hooks/useGeolocation";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import { PrayerTimesDisplay } from "@/components/PrayerTimesDisplay";
import { ErrorDisplay } from "@/components/LoadingError";

interface LocationName {
  name: string;
  country: string;
}

export default function Home() {
  const { coordinates, loading: geoLoading, error: geoError } = useGeolocation();
  const {
    prayerTimes,
    loading: prayerLoading,
    error: prayerError,
    date,
    timeZone,
  } = usePrayerTimes(
    coordinates?.latitude || null,
    coordinates?.longitude || null
  );
  const [locationName, setLocationName] = useState<LocationName | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);

  // Fetch location name from coordinates using reverse geocoding
  useEffect(() => {
    if (!coordinates) return;

    const fetchLocationName = async () => {
      try {
        setLocationLoading(true);
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coordinates.latitude}&lon=${coordinates.longitude}`
        );
        const data = await response.json();
        
        const city = data.address?.city || data.address?.town || data.address?.village || "Unknown";
        const country = data.address?.country || "Unknown";
        
        setLocationName({
          name: city.toUpperCase(),
          country,
        });
      } catch (err) {
        console.error("Error fetching location name:", err);
        setLocationName({
          name: `${coordinates.latitude.toFixed(4)}, ${coordinates.longitude.toFixed(4)}`,
          country: "",
        });
      } finally {
        setLocationLoading(false);
      }
    };

    fetchLocationName();
  }, [coordinates]);

  // Error states
  if (geoError) {
    return <ErrorDisplay error={geoError} />;
  }

  if (prayerError) {
    return <ErrorDisplay error={prayerError} />;
  }

  if (!coordinates && !geoLoading) {
    return (
      <ErrorDisplay error="Unable to determine your location. Please enable location services in your browser." />
    );
  }

  const locationDisplay = locationName
    ? `${locationName.name}, ${locationName.country}`
    : coordinates
      ? `${coordinates.latitude.toFixed(4)}, ${coordinates.longitude.toFixed(4)}`
      : "LOCATING...";

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
