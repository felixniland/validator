import { getKbAsserter, type KbAsserter } from "./internal/index.js";

export const assertAlpha: KbAsserter<"isAlpha"> = getKbAsserter("isAlpha");