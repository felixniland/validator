import type { AllowsDirectComparison } from "../types.js";

export {
    allowsDirectComparison,
    assertAlowsDirectComparison
}

function allowsDirectComparison(v: unknown): v is AllowsDirectComparison {
    return (v === null)
	|| ["string", "number", "bigint", "boolean", "symbol", "undefined"].includes(typeof v);
}

function assertAlowsDirectComparison(v: unknown): asserts v is AllowsDirectComparison {
    if (allowsDirectComparison(v)) return;
    throw new Error("value does not allow direct comparison");
}