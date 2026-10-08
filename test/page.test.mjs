import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import test from "node:test";
import { EXPECTED, loadLedger } from "../scripts/ledger.mjs";

test("the ledger is one self-contained page", async () => {
  const html = await loadLedger();
  assert.equal(createHash("sha256").update(html).digest("hex"), EXPECTED);
  assert.match(html, /The Sentinel/);
  assert.match(html, /Net asset value/);
  assert.match(html, /code: "USD"/);
  assert.match(html, /code: "EUR"/);
  assert.match(html, /code: "BTC"/);
  assert.match(html, /code: "XAU"/);
  assert.doesNotMatch(html, /<select/i);
  assert.match(html, /<\/html>\s*$/);
});
