import * as KEY_TYPE from "../../is/index.js";
import { isStr } from "../../../is/isStr.js";
import type { ValidatorFn } from "../../../types.js";

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
        const err = `expected type: "${getPrettyIden(type)}", received value: "${v}"`; 
        if (!isStr(v)) throw new Error(err);
        if (!refiner(v)) throw new Error(err);
    }
}

function getPrettyIden<const K extends keyof typeof KEY_TYPE>(type: K): string {
    return `${titleCase(type.slice(2))}`;
}

// a copy from 'utils'
function titleCase(str: string): string {
    if (!str.trim()) return str;

    // handle kebab-case and snake_case
    if (str.includes('-') || str.includes('_')) {
        return str
            .split(/[-_]/)
            .join(' ');
    }
    
    // handle camel && pascal
    const words = str
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2') // Also split at uppercase to uppercase transitions when followed by lowercase
        .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
    
    return words // Capitalize the first letter of each word
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}