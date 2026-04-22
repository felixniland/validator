import { getKbAsserter, type KbAsserter } from "./internal/index.js";

export const assertSpecialNonBracket: KbAsserter<"isSpecialNonBracket"> = getKbAsserter("isSpecialNonBracket");