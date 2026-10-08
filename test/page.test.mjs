import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("the ledger is one self-contained page", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  assert.match(html, /The Sentinel/);
  assert.match(html, /Net asset value/);
  assert.match(html, /code: "USD"/);
  assert.match(html, /code: "EUR"/);
  assert.match(html, /code: "BTC"/);
  assert.match(html, /code: "XAU"/);
  assert.doesNotMatch(html, /<select/i);
});
