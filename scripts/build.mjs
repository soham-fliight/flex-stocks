import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { EXPECTED, loadLedger } from "./ledger.mjs";

const pages = process.env.GITHUB_PAGES === "true";
const html = await loadLedger();
const digest = createHash("sha256").update(html).digest("hex");
if (digest !== EXPECTED) {
  throw new Error(`Ledger digest ${digest} does not match the Sentinel book`);
}

await mkdir(new URL("../out/", import.meta.url), { recursive: true });
await writeFile(new URL("../out/index.html", import.meta.url), html);
await writeFile(new URL("../out/.nojekyll", import.meta.url), "");

if (pages) {
  process.stdout.write("Built static export for GitHub Pages.\n");
}
