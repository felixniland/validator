import { getKbAsserter, type KbAsserter } from "./internal/index.js";

export const assertNumKey: KbAsserter<"isNumKey"> = getKbAsserter("isNumKey");