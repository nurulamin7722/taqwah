interface Prayer {
  name: string;
  time: string;
  arabicName: string;
}

interface NextPrayer {
  prayer: Prayer;
  timeUntil: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}

const prayerOrder: Prayer[] = [
  { name: "Fajr", time: "", arabicName: "فجر" },
  { name: "Sunrise", time: "", arabicName: "شروق" },
  { name: "Dhuhr", time: "", arabicName: "ظهر" },
  { name: "Asr", time: "", arabicName: "عصر" },
  { name: "Maghrib", time: "", arabicName: "مغرب" },
  { name: "Isha", time: "", arabicName: "عشاء" },
];

export function getNextPrayer(
  prayerTimes: Record<string, string>
): NextPrayer | null {
  const now = new Date();
  const currentTimeInMinutes =
    now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;

  let nextPrayer: Prayer | null = null;
  let minTimeDiff = Infinity;

  for (const prayer of prayerOrder) {
    const [hours, minutes] = prayerTimes[prayer.name].split(":").map(Number);
    const prayerTimeInMinutes = hours * 60 + minutes;
    let timeDiff = prayerTimeInMinutes - currentTimeInMinutes;

    if (timeDiff < 0) {
      timeDiff += 24 * 60; // Add 24 hours if the prayer time has passed
    }

    if (timeDiff < minTimeDiff) {
      minTimeDiff = timeDiff;
      nextPrayer = { ...prayer, time: prayerTimes[prayer.name] };
    }
  }

  if (!nextPrayer) {
    return null;
  }

  const totalSeconds = Math.round(minTimeDiff * 60);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    prayer: nextPrayer,
    timeUntil: { hours, minutes, seconds },
  };
}

export function formatTime(hours: number, minutes: number, seconds: number) {
  return `${String(hours).padStart(2, "0")} : ${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(2, "0")}`;
}
