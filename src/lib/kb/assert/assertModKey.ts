import { getKbAsserter, type KbAsserter } from "./internal/index.js";

export const assertModKey: KbAsserter<"isModKey"> = getKbAsserter("isModKey");