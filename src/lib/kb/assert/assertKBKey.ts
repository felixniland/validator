import { getKbAsserter, type KbAsserter } from "./internal/index.js";

export const assertKBKey: KbAsserter<"isKBKey"> = getKbAsserter("isKBKey");