export type {
    DateStr,
    Digit,
    DigitStr,
    FiniteNumber,
    BoolNum,
    FnInOut,
    ContentEditableElement,
    Compute,
    Constructor,
    NonEmptyArr,
    ToStr,
    NumKey,
    // obj validator stuff
        // PropKeysOnly,
        // NarrowProp,
        // CreateObjValidatorByProp,
}

type ToStr<T extends string | number | bigint | boolean | null | undefined> = `${T}`;

type NonEmptyArr<T> = MutNonEmptyArr<T> | ReadonlyNonEmptyArr<T>;

// OBJ VALIDATOR STUFF 
    // type CreateObjValidatorByProp<T extends object, K extends PropKeysOnly<T>, NewV extends T[K]> = T[K] extends PrimitiveBase ? ValidatorFn<NarrowProp<T, K, NewV>, T> : never;

    /**
     * PURPOSE: constructing validator functions that narrow an obj's type via obj[key]
     * @example type CompletedTask = NarrowProp<Task, "done", true>;
     * to avoid TS's "predicate must extend...", therefore, returns the INTERSCTION of [RemapProp & T], thus:
        * - narrows the type as one intuitively expects (e.g., CompletedTask above still works)
        * - *generally* quiets TS
        * still errors if used when there's no intersections(such as boolean => BoolNum, since they don't intersect at all), so this is not the right type for that
    */
    // type NarrowProp<T, K extends keyof T, V> = 
    //   T extends object
    //     ? T[K] extends PrimitiveBase
    //       ? Compute<T & { [P in K]: V }>
    //       : never
    //     : never;

    // type PropKeysOnly<T> = T extends object ? keyof Omit<T, FuncKeysOnly<T>> : never;

type Constructor<T> = new (...args: Array<any>) => T;

type Compute<T> = T extends PrimitiveBase ? T : { [K in keyof T]: T[K] } & {}; // Forces TypeScript to compute and show a flattened object type, instead of leaving intersections (`&`) in the type signature. Essentially a shallow "Prettify" (I think - haven't tested thorougly)

type ContentEditableElement = Omit<HTMLElement, "contenteditable"> & {
	isContentEditable: true;
}

type FiniteNumber = MakeBrandedType<number, "FiniteNumber">;

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type DigitStr = MakeBrandedType<NumKey, "DigitStr">;
type NumKey = `${Digit}`; // i.e., unbranded DigitStr
type DateStr = MakeBrandedType<string, "DateStr">;

type BoolNum = 0 | 1;

type FnInOut<In, Out, S extends SyncArgs = "sync"> =
	S extends "sync"
		? (val: In) => IsNotAsync<Out>
	: S extends "async"
		? (val: In) => Promise<Out>
	: S extends "either"
		? (val: In) => (Out | Promise<Out>)
	: never;

// SUPPORTERS - DO NOT EXPORT
    type PrimitiveBase = string | number | boolean | bigint | symbol | null | undefined;
    type SyncArgs = "sync" | "async" | "either";
    type Resolve<T> = T extends ((v: infer _In) => infer Out) ? Resolve<Out> : T;
    type IsAsync<T> = Resolve<T> extends infer Resolved ? Awaited<Resolved> extends Resolved ? false : true : never;
    type IsNotAsync<T> = IsAsync<T> extends true ? never : T;
    type MakeBrandedType<T, Brand extends string> = T & { readonly __brand: Brand };
    type MutNonEmptyArr<T> = [T, ...T[]];
    type ReadonlyNonEmptyArr<T> = readonly [T, ...T[]];
            
    // OBJ VALIDATOR SUPPORTS
        // type SyncFuncKeysOnly<T> = Required<{
        //     [K in keyof T]: T[K] extends (...args: Array<any>) => any 
        //         ? T[K] extends (...args: Array<any>) => Promise<any> 
        //             ? never 
        //             : K
        //         : never
        // }>[keyof T];

        // type AsyncFuncKeysOnly<T> = Required<{
        //     [K in keyof T]: T[K] extends (...args: Array<any>) => Promise<any>
        //         ? K
        //         : never
        // }>[keyof T];
        // type FuncKeysOnly<T> = SyncFuncKeysOnly<T> | AsyncFuncKeysOnly<T>;