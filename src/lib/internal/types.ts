import type { ValidatorFn } from "$lib/index.js";

export type {
    FnInOut,
    Compute,
    Constructor,
    NonEmptyArr,
    ToStr,
    MakeBrandedType,
    PrimitiveBase,
    AutoCompleteStr,
    // obj validator stuff
    PropKeysOnly,
    NarrowProp,
    CreateObjValidatorByProp
}

type ToStr<T extends string | number | bigint | boolean | null | undefined> = `${T}`;

type NonEmptyArr<T> = MutNonEmptyArr<T> | ReadonlyNonEmptyArr<T>;

type AutoCompleteStr<T extends string> = T | (string & {});

type Constructor<T> = new (...args: Array<any>) => T;

type Compute<T> = T extends PrimitiveBase ? T : { [K in keyof T]: T[K] } & {}; // Forces TypeScript to compute and show a flattened object type, instead of leaving intersections (`&`) in the type signature. Essentially a shallow "Prettify" (I think - haven't tested thorougly)

type FnInOut<In, Out, S extends SyncArgs = "sync"> =
	S extends "sync"
		? (val: In) => IsNotAsync<Out>
	: S extends "async"
		? (val: In) => Promise<Out>
	: S extends "either"
		? (val: In) => (Out | Promise<Out>)
	: never;

    type PrimitiveBase = string | number | boolean | bigint | symbol | null | undefined;

// SUPPORTERS - DO NOT EXPORT
    type SyncArgs = "sync" | "async" | "either";
    type Resolve<T> = T extends ((v: infer _In) => infer Out) ? Resolve<Out> : T;
    type IsAsync<T> = Resolve<T> extends infer Resolved ? Awaited<Resolved> extends Resolved ? false : true : never;
    type IsNotAsync<T> = IsAsync<T> extends true ? never : T;
	type MakeBrandedType<T extends PrimitiveBase, Brand extends string> = T & {
		readonly __brand: Brand;
		readonly __type: T;
	};
    type MutNonEmptyArr<T> = [T, ...T[]];
    type ReadonlyNonEmptyArr<T> = readonly [T, ...T[]];
            
    // OBJ VALIDATOR STUFF 
    type NarrowProp<T, K extends keyof T, V> = 
        T extends object
        ? T[K] extends PrimitiveBase
            ? Compute<T & { [P in K]: V }>
            : never
        : never;

    type PropKeysOnly<T> = T extends object ? keyof Omit<T, FuncKeysOnly<T>> : never;

    type CreateObjValidatorByProp<T extends object, K extends PropKeysOnly<T>, NewV extends T[K]> = T[K] extends PrimitiveBase ? ValidatorFn<NarrowProp<T, K, NewV>, T> : never;

    // OBJ VALIDATOR SUPPORTS
    type SyncFuncKeysOnly<T> = Required<{
        [K in keyof T]: T[K] extends (...args: Array<any>) => any 
            ? T[K] extends (...args: Array<any>) => Promise<any> 
                ? never 
                : K
            : never
    }>[keyof T];

    type AsyncFuncKeysOnly<T> = Required<{
        [K in keyof T]: T[K] extends (...args: Array<any>) => Promise<any>
            ? K
            : never
    }>[keyof T];

    type FuncKeysOnly<T> = SyncFuncKeysOnly<T> | AsyncFuncKeysOnly<T>;