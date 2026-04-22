import * as KEY_TYPE from "../../is/index.js";
import { isStr } from "../../../is/isStr.js";
import type { ValidatorFn } from "felixtypes";

export {
    getKbAsserter
}

export type {
    KbAsserter
}

type KbIden = keyof typeof KEY_TYPE;

type Kb_InferValidatedType<K extends KbIden> = 
    typeof KEY_TYPE[K] extends ValidatorFn<infer T, string>
        ? T 
        : never;

type KbAsserter<R extends keyof typeof KEY_TYPE> = (v: string) => asserts v is Kb_InferValidatedType<R>;

function getKbAsserter<const K extends keyof typeof KEY_TYPE>(type: K) {
    const refiner = KEY_TYPE[type];
    
    return (v: unknown) => {
        const err = `expected type: "${type.slice(2)}", received value: "${v}"`; // TODO ehhh... getPrettyValIden(type)... mebbe;
        if (!isStr(v)) throw new Error(err);
        if (!refiner(v)) throw new Error(err);
    }
}