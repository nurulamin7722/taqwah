// Bundles per-hadith JSON files from hadithbangla-main/<Book>/hadith/<id>.json
// into public/hadith/<Book>/<chunk>.json, CHUNK_SIZE hadiths per file.
// Keeps the static asset count under Cloudflare Workers' 20k file limit.
// Run: node scripts/bundle-hadiths.mjs
import { readdir, readFile, writeFile, mkdir, rm } from "node:fs/promises";
import path from "node:path";

const CHUNK_SIZE = 10;
const SRC = "hadithbangla-main";
const OUT = "public/hadith";

await rm(OUT, { recursive: true, force: true });

for (const book of await readdir(SRC)) {
  const dir = path.join(SRC, book, "hadith");
  const chunks = new Map();

  for (const file of await readdir(dir)) {
    const id = Number(path.basename(file, ".json"));
    if (!Number.isInteger(id) || id < 1) continue;
    const { hadith } = JSON.parse(await readFile(path.join(dir, file), "utf8"));
    const chunk = Math.floor((id - 1) / CHUNK_SIZE);
    if (!chunks.has(chunk)) chunks.set(chunk, {});
    chunks.get(chunk)[id] = hadith;
  }

  await mkdir(path.join(OUT, book), { recursive: true });
  for (const [chunk, hadiths] of chunks) {
    await writeFile(path.join(OUT, book, `${chunk}.json`), JSON.stringify(hadiths));
  }
  console.log(`${book}: ${chunks.size} chunks`);
}
