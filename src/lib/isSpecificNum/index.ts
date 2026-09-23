import { isFn } from "../is/isFn.js";

export {
    isSpecificNum,
    assertSpecificNum,
}

/** @returns boolean representing if 'n' is one of the numbers inside the '...is' Array */
function isSpecificNum<const TNum extends number>(n: number, ...is: Array<TNum>): n is TNum {
    for (const num of is) {
        if (n === num) return true;
    }
    
    return false;
}

/**
 * asserts that 'n' is one of the numbers within 'is'
 * @param {is.at(-1)} - (OPTIONAL) getter for a custom err msg string, which can optionally take 'n' as an argument
 * @throws as above, with the standard errMsg: `expected one of [${is.join(", ")}], but received: ${n}`
*/
function assertSpecificNum<const TNum extends number>(n: number, ...is: Array<TNum>): asserts n is TNum;
function assertSpecificNum<const TNum extends number>(n: number, ...args: [...is: Array<TNum>, (val: number) => string]): asserts n is TNum;
function assertSpecificNum<const TNum extends number>(n: number, ...is: any): asserts n is TNum {
    const last = is.at(-1);
    if (isFn(last)) {
        if (isSpecificNum(n), is.slice(0, -1)) return;
        throw new Error(last(n));
    } else {
        if (isSpecificNum(n), is) return;
        throw new Error(`expected one of [${is.join(", ")}], but received: ${n}`);
    }
}