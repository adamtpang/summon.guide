import assert from "node:assert/strict";
import test from "node:test";
import {
  DEMO_BRIEF,
  DEMO_COUNCIL_SLUGS,
  SYNTHESIS_MODEL,
  devDemoUserId,
  seatModelFor,
} from "../src/lib/councilModels.ts";
import { isLifeContextBrief } from "../src/lib/lifeContext.ts";

const ON = { COUNCIL_SEAT_MODELS: "on" };

test("without the flag every seat uses the shared waterfall", () => {
  assert.equal(seatModelFor("abraham-lincoln", DEMO_COUNCIL_SLUGS, {}), null);
  assert.equal(seatModelFor("synthesis", DEMO_COUNCIL_SLUGS, {}), null);
  assert.equal(seatModelFor("abraham-lincoln", DEMO_COUNCIL_SLUGS, { COUNCIL_SEAT_MODELS: "off" }), null);
});

test("with the flag each demo guide has its own model family and a fallback", () => {
  const pairs = DEMO_COUNCIL_SLUGS.map((slug) => seatModelFor(slug, DEMO_COUNCIL_SLUGS, ON));
  for (const pair of pairs) {
    assert.ok(pair?.primary && pair.fallback && pair.primary !== pair.fallback);
  }
  const vendors = new Set(pairs.map((pair) => pair.primary.split("/")[0]));
  assert.equal(vendors.size, DEMO_COUNCIL_SLUGS.length);
  assert.deepEqual(seatModelFor("synthesis", DEMO_COUNCIL_SLUGS, ON), SYNTHESIS_MODEL);
});

test("guides outside the named lineup take a seat model by position", () => {
  const members = ["seneca", "naval-ravikant"];
  assert.ok(seatModelFor("seneca", members, ON)?.primary);
  assert.equal(seatModelFor("not-seated", members, ON), null);
});

test("the demo identity only exists on a development server", () => {
  assert.equal(devDemoUserId({ NODE_ENV: "production", COUNCIL_DEMO_USER: "demo" }), null);
  assert.equal(devDemoUserId({ NODE_ENV: "development" }), null);
  assert.equal(devDemoUserId({ NODE_ENV: "development", COUNCIL_DEMO_USER: "demo" }), "demo");
});

test("the demo brief passes the council's brief check", () => {
  assert.ok(isLifeContextBrief(DEMO_BRIEF));
  assert.doesNotMatch(DEMO_BRIEF, /[–—]/);
});
