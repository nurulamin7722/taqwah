import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://taqwah.bdfamily.net").replace(/\/$/, "");

  const routes: { path: string; changeFrequency: "daily" | "weekly" | "monthly"; priority: number }[] = [
    { path: "", changeFrequency: "daily", priority: 1.0 },
    { path: "/prayer-time", changeFrequency: "daily", priority: 0.9 },
    { path: "/quran", changeFrequency: "weekly", priority: 0.9 },
    { path: "/quran/bengali", changeFrequency: "weekly", priority: 0.9 },
    { path: "/hadith", changeFrequency: "weekly", priority: 0.9 },
    { path: "/dua", changeFrequency: "weekly", priority: 0.8 },
    { path: "/calendar", changeFrequency: "weekly", priority: 0.8 },
    { path: "/islamic-tv", changeFrequency: "weekly", priority: 0.8 },
    { path: "/other", changeFrequency: "weekly", priority: 0.8 },
    { path: "/other/namaz-shiksha", changeFrequency: "monthly", priority: 0.7 },
    { path: "/other/tasbeeh", changeFrequency: "monthly", priority: 0.7 },
    { path: "/other/hajj-umrah", changeFrequency: "monthly", priority: 0.7 },
    { path: "/other/qurbani", changeFrequency: "monthly", priority: 0.7 },
    { path: "/other/eid-milad", changeFrequency: "monthly", priority: 0.7 },
    { path: "/other/roza", changeFrequency: "monthly", priority: 0.7 },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

