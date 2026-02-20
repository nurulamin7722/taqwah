"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface PrayerTimes {
  [key: string]: string;
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
}

interface Meta {
  latitude: number;
  longitude: number;
  timezone: string;
  method: {
    id: number;
    name: string;
  };
  school: string;
  offset: {
    Imsak: number;
    Fajr: number;
    Sunrise: number;
    Dhuhr: number;
    Asr: number;
    Sunset: number;
    Maghrib: number;
    Isha: number;
    Midnight: number;
  };
}

interface PrayerResponse {
  code: number;
  status: string;
  data: {
    timings: PrayerTimes;
    date: {
      readable: string;
      timestamp: string;
      gregorian: {
        date: string;
        format: string;
        day: string;
        weekday: {
          en: string;
        };
        month: {
          number: number;
          en: string;
        };
        year: string;
      };
      hijri: {
        date: string;
        format: string;
        day: string;
        weekday: {
          en: string;
          ar: string;
        };
        month: {
          number: number;
          en: string;
          ar: string;
        };
        year: string;
      };
    };
    meta: Meta;
  };
}

interface UsePrayerTimesReturn {
  prayerTimes: PrayerTimes | null;
  loading: boolean;
  error: string | null;
  date: string | null;
  timeZone: string | null;
}

export function usePrayerTimes(
  latitude: number | null,
  longitude: number | null
): UsePrayerTimesReturn {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [timeZone, setTimeZone] = useState<string | null>(null);

  useEffect(() => {
    if (!latitude || !longitude) {
      setLoading(false);
      return;
    }

    const fetchPrayerTimes = async () => {
      try {
        setLoading(true);
        const today = new Date();
        const dateString = `${String(today.getDate()).padStart(2, "0")}-${String(
          today.getMonth() + 1
        ).padStart(2, "0")}-${today.getFullYear()}`;

        const response = await axios.get<PrayerResponse>(
          `https://api.aladhan.com/v1/timings/${dateString}`,
          {
            params: {
              latitude,
              longitude,
              method: 1,
            },
          }
        );

        if (response.data.code === 200) {
          setPrayerTimes(response.data.data.timings);
          setDate(response.data.data.date.readable);
          setTimeZone(response.data.data.meta.timezone);
          setError(null);
        }
      } catch (err) {
        setError("Failed to fetch prayer times");
        console.error("Error fetching prayer times:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, [latitude, longitude]);

  return { prayerTimes, loading, error, date, timeZone };
}
