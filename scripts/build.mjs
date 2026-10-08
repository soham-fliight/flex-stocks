import { mkdir, readFile, writeFile } from "node:fs/promises";

const pages = process.env.GITHUB_PAGES === "true";
const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

await mkdir(new URL("../out/", import.meta.url), { recursive: true });
await writeFile(new URL("../out/index.html", import.meta.url), html);
await writeFile(new URL("../out/.nojekyll", import.meta.url), "");

if (pages) {
  process.stdout.write("Built static export for GitHub Pages.\n");
}
