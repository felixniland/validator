import { getKbAsserter, type KbAsserter } from "./internal/index.js";

export const assertUnusedKey: KbAsserter<"isUnusedKey"> = getKbAsserter("isUnusedKey");