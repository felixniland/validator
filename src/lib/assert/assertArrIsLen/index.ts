import { assertNonEmpty } from "../assertNonEmpty.js";

export {
    assertArrIsLen
};

/**
 * asserts the given arr is the given len/s
*/

/**
 * Asserts the given array is one of the given length/s; weird, I know, but I found myself needing it often enough in testing...
 * @template TType element type of the array
 * @template TLengths the length/s to assert
 * @param v the array whose length to assert
 * @param lengths spread array of length/s
 * @throws if lengths is empty
 * @throws if v's length is not in the array
 * @returns if all the lengths are between 0-10, inclusive, and 'lengths' is Typescript's 'as const', the return type is a tuple of the specific length/s
 * @example```
 * const myArr = ["string"];
 * assertArrIsLen(myArr, 1); // returns [string], because TS infers that number tightly ('as const')
 * assertArrIsLen(myArr, ...[1]); // returns Array<string>, because the Array is not 'as const'
 * assertArrIsLen(myArr, ...([1, 3] as const)) // returns [string] | [string, string, string]
 * ```
*/
function assertArrIsLen<TType, const TLengths extends OneToTen>(v: Array<TType>, ...lengths: ReadonlyArray<TLengths>): asserts v is ArrRet<TType, TLengths> {
    assertNonEmpty(lengths);

	for (const len of lengths) {
		if (v.length === len) return;
	}

	throw new Error(`arr length was ${v.length}, but expected it to be one of these: ${lengths.join(", ")}`);
}

type AutoCompleteNum<T extends number> = T | (number & {});
type OneToTen = AutoCompleteNum<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10>;
type ArrRet<TType, TNum> = 
    TNum extends 0 ? [] :
    TNum extends 1 ? [TType] :
    TNum extends 2 ? [TType, TType] :
    TNum extends 3 ? [TType, TType, TType] :
    TNum extends 4 ? [TType, TType, TType, TType] :
    TNum extends 5 ? [TType, TType, TType, TType, TType] :
    TNum extends 6 ? [TType, TType, TType, TType, TType, TType] :
    TNum extends 7 ? [TType, TType, TType, TType, TType, TType, TType] :
    TNum extends 8 ? [TType, TType, TType, TType, TType, TType, TType, TType] :
    TNum extends 9 ? [TType, TType, TType, TType, TType, TType, TType, TType, TType] :
    TNum extends 10 ? [TType, TType, TType, TType, TType, TType, TType, TType, TType, TType] :
    Array<TType>;