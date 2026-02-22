import type { AllowsDirectComparison } from "felixtypes";

export {
    allowsDirectComparison
}

function allowsDirectComparison(v: unknown): v is AllowsDirectComparison {
    return (v === null)
	|| ["string", "number", "bigint", "boolean", "symbol", "undefined"].includes(typeof v);
}