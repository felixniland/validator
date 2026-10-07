import { isStr } from "../is/index.js";
import type { Getter, GetterOr } from "felixtypes";
import { ValidatorConfig } from "../cfg/index.js";
import { isCorePrettyValIden, isCoreValIden } from "../labels/index.js";
import { PrimValidator } from "../prim/index.js";
import type { PrettyValIden, ValIden } from "../types.js";
import type { NewValidatorParams, ParseValidatorParams, RegistedValIdenMapValue, RegisteredPrettyIden, RegisteredValIden, VALIDATOR_REGISTRY } from "./types.js";

/**
 * TODO:
    * []: I could make the 'register' just take an Array<Prim...>, if I wanted, and it could just infer it
*/

export {
    _V,
    REGISTRY as INTERNAL_REGISTRY
};

export type {
    VALIDATOR_REGISTRY
} from "./types.js";

class REGISTRY {
    /** update the internal lists of idens, and their validators */
    static #updateIdens = (iden: string, pretty: string): void => {
        // @ts-expect-error("'addPrim' takes a type 'never', since nothing is registered")
        this.#regsteredIdenValidator.addPrim(iden);
        // @ts-expect-error("'addPrim' takes a type 'never', since nothing is registered")
        this.#regsteredPrettyIdenValidator.addPrim(pretty);
    }

    static #regsteredIdenValidator = new PrimValidator<RegisteredValIden>();
    static isRegisteredValIden = (v: unknown): v is RegisteredValIden => this.#regsteredIdenValidator.validate(v);
    static #regsteredPrettyIdenValidator = new PrimValidator<RegisteredPrettyIden>();
    static isRegisteredPrettyValIden = (v: unknown): v is RegisteredPrettyIden => this.#regsteredPrettyIdenValidator.validate(v);

    /** for registered validators (i.e., NOT the inbuilt ones), the 'is' and 'assert' are stored here */
    static #validatorMap = new Map<RegisteredValIden, RegistedValIdenMapValue<VALIDATOR_REGISTRY[RegisteredValIden]["type"]>>();
    
    // /** reverseMap used to find if the user has provided a fn, when they should've provided the Validator */
    // static #reverseMap = new Map<RegistedValIdenMapValue<ValRegistry[RegisteredValIden]["type"]>, RegisteredValIden>();

    static readonly VAL_IDEN_TO_PRETTY_MAP = ({
        str: 'string',
        num: 'number',
        compNum: 'comparable number',
        digitStr: 'string composed only of digits',
        bigint:"bigint",
        bool: 'boolean',
        arr: 'Array<unknown>',
        obj: 'object',
        arrStr: 'Array<string>',
        arrNum: 'Array<number>',
        arrArr: 'Array<Array<unknown>>',
        arrBool: "Array<boolean>",
        arrFn: "Array<Function>",
        arrNull: "Array<null>",
        arrObj: "Array<object>",
        arrUndef: "Array<undefined>",
        boolNum: "BoolNum(0 | 1)",
        date: "Date",
        dateStr: "a parsable date string",
        err: "Error",
        fn: "Function",
        asyncFn: "Async Function",
        map: "Map<unknown, unknown>",
        null: "null",
        promise: "Promise<unknown>",
        regExp: "RegExp",
        set: "Set<unknown>",
        true: "true",
        false: "false",
        undef: "undefined",
        weakMap: "WeakMap<WeakKey, unknown>",
        weakSet: "WeakSet<WeakKey>",
        el: "Element",
        htmlEl: "HTML Element",
        inputEl: "HTML Input Element",
        formEl: "HTML Form Element",
        contentEditable: "Content Editable Element",
        node: "Node",
        svelteMap: "SvelteMap<unknown, unknown>",
        svelteSet: "SvelteSet<unknown>",
        symbol: "symbol",
        ul: "Unordered List Element",
        ol: "Ordered List Element",
        listEl: "(UL/OL) List Element",
        listItem: "HTML LI Element",
        blockEl: "Block Element",
        headingEl: "Heading Element",
        BR: "HTML BR Element",
        emptyTextNode: "empty Text Node",
        textNode: "Text Node",
        span: "HTML Span Element",
        v4UUID: "v4 UUID",
        voidEl: "HTML Void Element",
        nonEmpty: "Non-Empty Array",
        nonNullable: "Non-nullable",
        stringable: "Stringable",
    } as Record<ValIden, PrettyValIden>);

    /**
     * @returns the config object to be registered 
     * @throws if the 'iden' or 'prettyIden' are already in use
     * @example ```
     * const coolConfig = ValidatorConfig.register({ iden: "cool", ... });
     * declare module ("...") {
     * interface ValidatorRegistry {
     * cool: typeof coolConfig
     * }}
     * ```
    */
    static register<const TIden extends string, const TPretty extends string, TType>(
        params: NewValidatorParams<TIden, TPretty, TType>
    ): ParseValidatorParams<NewValidatorParams<TIden, TPretty, TType>> {
        const { iden, prettyIden } = params;
        if (ValidatorManager.isValIden(iden)) throw new Error(`iden "${iden}" is already in use`);

        /** resolve one of these to the RegisteredPrettyIden, and cast otherwise TS gets VERY annoyed... ;) */
        const pretty = (prettyIden ?? iden) as RegisteredPrettyIden;
        if (ValidatorManager.isPrettyValIden(pretty)) throw new Error(`prettyIden of "${pretty}" is already in us`);

        /** prepare the errMsg now... */
        const errMsg: GetterOr<string, unknown> = params.errMsg || `expected ${pretty}`;
        const getErrMsg: Getter<string, unknown> = isStr(errMsg) ? () => errMsg : errMsg;

        /** update the Map :) */
        this.#validatorMap.set((
            // @ts-expect-error("it does not know "iden" is a RegisteredValIden, cuz we ain't registered it yet...")
            iden
        ), {
            pretty,
            is: params.is,
            ensurer: (v: unknown) => {
                if (params.is(v)) return v;
                throw new Error(getErrMsg(v));
            },
        } satisfies RegistedValIdenMapValue<TType>);

        this.#updateIdens(iden, pretty);
        Object.defineProperty(this.VAL_IDEN_TO_PRETTY_MAP, iden, { value: pretty });

        return null as any;
    }

    static getValidator<TIden extends RegisteredValIden>(iden: TIden): ((v: unknown) => v is VALIDATOR_REGISTRY[TIden]["type"]) {
        const fn = this.#validatorMap.get(iden)?.is;
        if (!fn) throw new Error(`expected 'is' fn for ${iden}`);
        return fn;
    }
    
    static getEnsurer<const K extends RegisteredValIden>(iden: K): (v: unknown) => VALIDATOR_REGISTRY[K]["type"] {
         const fn = this.#validatorMap.get(iden)?.ensurer;
         if (!fn) throw new Error(`expected 'ensurer' fn for ${iden}`);
         return fn;
     }
        // type Asserted = InferValidatedType<K>;

        // const entry = this.#validatorMap.get(iden);
        // if (!entry) throw new Error(`expected 'assert' fn for ${iden}`);
        // const { is: refiner, pretty } = entry;

        // const defaultErrMsg = getExpectedMsg(iden);

        // function asserter<const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is Asserted;
        // function asserter<const _TErrMsg = GetExpectedMsg<K>>(v: unknown): asserts v is Asserted;
        // function asserter(v: unknown, errMsg?: string | undefined): asserts v is Asserted;
        // function asserter<const TErrMsg extends DefaultMsg<GetExpectedMsg<K>>>(v: unknown, errMsg?: TErrMsg): asserts v is Asserted {
        //     if (!refiner(v)) throw new Error(errMsg || defaultErrMsg);
        // }

        // return asserter;
    // }

    private constructor() { throw new Error("this is static only!") }
}

/** @todo docs ;) */
class ValidatorManager {
    static CFG = ValidatorConfig;
    static REG = REGISTRY;

    /** checks the core ValIden, and all registered ones */
    static isValIden = (v: unknown): v is ValIden => isCoreValIden(v) || this.REG.isRegisteredValIden(v);

    /** checks the core PrettyValIden, and all registered ones */
    static isPrettyValIden = (v: unknown): v is PrettyValIden => isCorePrettyValIden(v) || this.REG.isRegisteredPrettyValIden(v);

    private constructor() { throw new Error("this is static only!") }
}

interface Validator {
    /** set universal options for the validator */
    CFG: typeof ValidatorConfig;

    /** register, and retrieve, your own validated types */
    REG: typeof REGISTRY;

    /** checks the core ValIden, and all registered ones */
    isValIden: (v: unknown) => v is ValIden;

    /** checks the core PrettyValIden, and all registered ones */
    isPrettyValIden: (v: unknown) => v is PrettyValIden;
}

const _V = ValidatorManager as Validator;

// TESTING AND SCRATCHPAD

    // NTS: not using this, since it causes an error on the page the moment you define it... so we will just runtime throw
        // /** return the same params, or 'VAL IDEN IS ALREADY IN USE' if 'iden' is taken */
        // type IsValidNewValidatorParams<TIden extends string, TType, TParams extends NewValidatorParams<TIden, TType>> = TIden extends ValIden
        //     ? "VAL IDEN IS ALREADY IN USE" //never
        //     : TParams;

    // const MY_SPECIAL_STR = ["a", "b"] as const;
    // const isMySpecialStr = newPrimValidator(MY_SPECIAL_STR);

    // const TEST_REGISTRATION = REGISTRY.register({
    //     iden: "special",
    //     prettyIden: "Special",
    //     is: isMySpecialStr,
    //     errMsg: (v: unknown) => `expected 'a' or 'b', but received: ${String(v)}`
    // })

    // declare module "./types.js" {
    //     interface VALIDATOR_REGISTRY {
    //         special: typeof TEST_REGISTRATION;
    //         // special: {
    //             //     pretty: "Special",
    //             //     type: MySpecialStr
    //             // }
    //             // fake: {
    //                 //     pretty: "Fake!",
    //                 //     type: "fake" | "butts";
    //                 // }
    //     }
    // }

    // // @ ts-expect-error("no unused locals")
    // // const { is, assert } = ValidatorConfig.getRegisteredValidator("special");
    // // const { is, assert} = ValidatorConfig.getRegisteredValidator("fake");

    // // @ts-expect-error("no unused locals")
    // type TEST_Special = VALIDATOR_REGISTRY["special"];