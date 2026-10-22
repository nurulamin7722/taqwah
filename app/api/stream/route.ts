import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const targetUrl = request.nextUrl.searchParams.get("url");

  if (!targetUrl) {
    return new NextResponse("Missing url parameter", { status: 400 });
  }

  try {
    const upstreamRes = await fetch(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!upstreamRes.ok) {
      return new NextResponse(`Upstream returned ${upstreamRes.status}`, {
        status: upstreamRes.status,
      });
    }

    const contentType = upstreamRes.headers.get("content-type") || "";

    // Check if m3u8 playlist
    if (
      targetUrl.includes(".m3u8") ||
      contentType.includes("mpegurl") ||
      contentType.includes("application/x-mpegURL")
    ) {
      const text = await upstreamRes.text();
      const baseUrl = targetUrl.substring(0, targetUrl.lastIndexOf("/") + 1);

      // Rewrite relative URLs to route through proxy
      const rewritten = text
        .split("\n")
        .map((line) => {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith("#")) {
            // Also check for URI="..." inside #EXT tags (e.g. #EXT-X-KEY or #EXT-X-MEDIA)
            if (trimmed.includes('URI="')) {
              return line.replace(/URI="([^"]+)"/g, (_, uri) => {
                const fullUri =
                  uri.startsWith("http://") || uri.startsWith("https://")
                    ? uri
                    : new URL(uri, baseUrl).toString();
                return `URI="/api/stream?url=${encodeURIComponent(fullUri)}"`;
              });
            }
            return line;
          }

          const fullUrl =
            trimmed.startsWith("http://") || trimmed.startsWith("https://")
              ? trimmed
              : new URL(trimmed, baseUrl).toString();

          return `/api/stream?url=${encodeURIComponent(fullUrl)}`;
        })
        .join("\n");

      return new NextResponse(rewritten, {
        headers: {
          "Content-Type": "application/vnd.apple.mpegurl",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      });
    }

    // Binary stream (e.g. .ts video chunks)
    return new NextResponse(upstreamRes.body, {
      status: 200,
      headers: {
        "Content-Type": contentType || "video/MP2T",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Proxy error";
    return new NextResponse(message, { status: 500 });
  }
}
