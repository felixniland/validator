import { getKbAsserter, type KbAsserter } from "./internal/index.js";

export const assertNonInputKey: KbAsserter<"isNonInputKey"> = getKbAsserter("isNonInputKey");