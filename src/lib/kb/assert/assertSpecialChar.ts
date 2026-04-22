import { getKbAsserter, type KbAsserter } from "./internal/index.js";

export const assertSpecialChar: KbAsserter<"isSpecialChar"> = getKbAsserter("isSpecialChar");