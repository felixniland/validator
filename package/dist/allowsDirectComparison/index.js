export { allowsDirectComparison };
function allowsDirectComparison(v) {
    return (v === null)
        || ["string", "number", "bigint", "boolean", "symbol", "undefined"].includes(typeof v);
}
