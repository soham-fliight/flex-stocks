import { readFile, readdir } from "node:fs/promises";

const EXPECTED = "e5ceaf716f9bc3098648768e799fd516d89bbac960552a491eb0ac39cca593a5";

async function fromParts() {
  const partsDir = new URL("../parts/", import.meta.url);
  const names = (await readdir(partsDir)).filter((name) => name.endsWith(".b64")).sort();
  const b64 = (await Promise.all(names.map((name) => readFile(new URL(name, partsDir), "utf8"))))
    .join("")
    .replace(/\s+/g, "");
  return Buffer.from(b64, "base64").toString("utf8");
}

export async function loadLedger() {
  try {
    const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
    if (html.includes("Net asset value") && html.includes('code: "BTC"') && html.includes("</html>")) {
      return html;
    }
  } catch {
    // The Pages checkout may only have the encoded parts.
  }
  return fromParts();
}

export { EXPECTED };
