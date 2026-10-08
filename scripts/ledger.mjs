import { readFile, readdir } from "node:fs/promises";
import { inflateSync } from "node:zlib";

const EXPECTED = "e5ceaf716f9bc3098648768e799fd516d89bbac960552a491eb0ac39cca593a5";

async function fromZlib() {
  const partsDir = new URL("../parts/zz/", import.meta.url);
  const names = (await readdir(partsDir)).filter((name) => name.endsWith(".zz")).sort();
  const packed = (await Promise.all(names.map((name) => readFile(new URL(name, partsDir), "utf8")))).join("");
  return inflateSync(Buffer.from(packed.replace(/\s+/g, ""), "base64")).toString("utf8");
}

export async function loadLedger() {
  try {
    const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
    if (html.includes("Net asset value") && html.includes('code: "BTC"') && html.includes("</html>")) {
      return html;
    }
  } catch {
    // The Pages checkout keeps the book in parts/zz.
  }
  return fromZlib();
}

export { EXPECTED };
