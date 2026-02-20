"use client";

import { useState, useEffect } from "react";

interface GeolocationCoordinates {
  latitude: number;
  longitude: number;
}

interface UseGeolocationReturn {
  coordinates: GeolocationCoordinates | null;
  loading: boolean;
  error: string | null;
}

export function useGeolocation(): UseGeolocationReturn {
  const [coordinates, setCoordinates] = useState<GeolocationCoordinates | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    const success = (position: GeolocationPosition) => {
      setCoordinates({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setLoading(false);
      setError(null);
    };

    const error = (err: GeolocationPositionError) => {
      let errorMessage = "Failed to get location";
      if (err.code === err.PERMISSION_DENIED) {
        errorMessage =
          "Please enable location permission to see prayer times";
      } else if (err.code === err.POSITION_UNAVAILABLE) {
        errorMessage = "Location information is unavailable";
      } else if (err.code === err.TIMEOUT) {
        errorMessage = "Location request timed out";
      }
      setError(errorMessage);
      setLoading(false);
    };

    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000,
    });
  }, []);

  return { coordinates, loading, error };
}
