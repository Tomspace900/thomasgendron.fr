/**
 * Pipeline photos : convertit tout ce qui traîne dans photos-src/ (gitignoré)
 * en webp optimisé dans public/images/photos/, et imprime les entrées
 * à coller dans content/photos.ts (dimensions incluses).
 *
 *   node scripts/process-photos.mjs
 *
 * Renommage : noms explicites gardés en slug, fichiers PXL_/DJI datés
 * renommés sur leur date. Compléter ensuite location/date dans photos.ts.
 */
import sharp from "sharp";
import { readdir } from "node:fs/promises";
import path from "node:path";

const SRC = "photos-src";
const OUT = "public/images/photos";
const MAX_EDGE = 1600;
const QUALITY = 80;

function slugFor(name) {
  const base = name.replace(/\.(jpe?g|png|heic|webp)$/i, "");

  // PXL_20231012_001230651.MP → 2023-10-12
  const pxl = base.match(/^PXL_(\d{4})(\d{2})(\d{2})_/);
  if (pxl) return `${pxl[1]}-${pxl[2]}-${pxl[3]}`;

  // dji_fly_20231012_… → drone-2023-10-12
  const dji = base.match(/^dji_fly_(\d{4})(\d{2})(\d{2})_/);
  if (dji) return `drone-${dji[1]}-${dji[2]}-${dji[3]}`;

  // « Bryce Canyon City_05-Aug-23 » → bryce-canyon-city + date en suffixe
  const named = base.match(/^(.+?)_(\d{2})-([A-Za-z]{3})-(\d{2})(?: \d)?$/);
  if (named) {
    const slug = named[1]
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    return slug;
  }

  return base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function dateFor(name) {
  const base = name.replace(/\.[^.]+$/, "");
  const pxl = base.match(/(\d{4})(\d{2})(\d{2})_/);
  if (pxl) return `${pxl[1]}-${pxl[2]}-${pxl[3]}`;
  const MONTHS = { Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06", Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12" };
  const named = base.match(/_(\d{2})-([A-Za-z]{3})-(\d{2})/);
  if (named) return `20${named[3]}-${MONTHS[named[2]] ?? "01"}-${named[1]}`;
  return null;
}

const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png|heic|webp)$/i.test(f));
if (files.length === 0) {
  console.log(`Rien à traiter dans ${SRC}/`);
  process.exit(0);
}

const INKS = ["rose", "blue", "sun", "leaf"];
const entries = [];

for (const file of files.sort()) {
  const slug = slugFor(file);
  const out = path.join(OUT, `${slug}.webp`);
  const info = await sharp(path.join(SRC, file))
    .rotate()
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(out);
  entries.push({ slug, date: dateFor(file), width: info.width, height: info.height, kb: Math.round(info.size / 1024) });
  console.log(`✓ ${file} → ${slug}.webp (${info.width}×${info.height}, ${Math.round(info.size / 1024)} Ko)`);
}

console.log("\n- Entrées pour content/photos.ts -\n");
for (const [i, e] of entries.entries()) {
  console.log(`  {
    file: "/images/photos/${e.slug}.webp",
    location: "[Lieu à fournir]",${e.date ? `\n    date: "${e.date}",` : ""}
    alt: "[Description à fournir]",
    ink: "${INKS[i % INKS.length]}",
    width: ${e.width},
    height: ${e.height},
  },`);
}
