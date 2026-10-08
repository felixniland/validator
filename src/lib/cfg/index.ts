import type { ValIden } from "../types.js";

export {
    ValidatorConfig
};

class ValidatorConfig {
    /**
     * this is the errMsg thrown when a better one cannot be computed
     * 
     * in-built asserters and those provided to _V.REG have a pretty name, or default to their known name, and will throw that: e.g., str: "expected string", arrNum: "expected Array<number>"
     * 
     * asserters that take multiple conditions will concatenate using the same logic, e.g., ensure("str", "arrNum") would throw "expected string, or Array<number>"
     * 
     * if one such asserter does not receive {@link ValIden}, it will throw this DEFAULT_ERR_MSG
     * @default 'asserter received incorrect type'
     * @usage note that due to caching, changing this after an asserter has been created may not update that throw; i.e., set this FIRST!
    */
    static DEFAULT_ERR_MSG: string = "asserter received incorrect type";

    /**
     * should 'vacuous logic' be allowed; i.e., statements that can't be logically tested because the given data is 'empty'
     * @todo I should copy in a better, formal definition XD
     * @example```
     * // calling 'isArrNum' on an empty array
     * isArrNum([]); // true, if 'allowVacuous' is true
     * isArrNum([]); // false, if 'allowVacuous' is false
     * isArrNum([1]); // always true
     * isArrNum([""]); // always false
     * ```
     * @example```
     * isAlpha(""); // true, if 'allowVacuous' is true
     * isAlpha(""); // false, if 'allowVacuous' is false
     * isAlpha("a"); // always true
     * isAlpha(1); // always false
     * ```
    */
    static allowVacuous: boolean = true;

    /**
     * internal utlity to return if an array is vacuous, only if it's relevant to the lib's functions; i.e., returns false if vacuous arrays are allowed, since we don't care in that instance
     * @returns FALSE if getConfig().allowVacuous is true
     * @returns otherwise, returns Boolean representing 'v.length === 0'
    */
    static isVacuousArray(v: unknown): boolean {
        if (!Array.isArray(v)) return false;
        
        return this.allowVacuous
            ? false
            : v.length === 0;
    }

    private constructor() {
        throw new Error("do not instantiate ValidatorConfig! It is a singleton class with only static methods, you tonk-a-lonk");
    }
}