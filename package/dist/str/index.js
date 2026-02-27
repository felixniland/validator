import { isStr } from "../is/index.js";
export { newStrValidator };
function newStrValidator(arr) {
    const set = new Set(arr);
    const fn = (val) => (isStr(val) && set.has(val));
    return fn;
}
