import type { GetterOr } from "felixtypes";

export type {
    VALIDATOR_REGISTRY,
    
    RegisteredValIden,
    RegisteredPrettyIden,
    RegistedValIdenMapValue,
    NewValidatorParams,
    ParseValidatorParams
}

/** exported interface used for declaration merging; the type it takes is returned by ValidatorConfig.addValidator, and must be registered manually */
interface VALIDATOR_REGISTRY {
    // iden: Type;
}

type RegisteredValIden = keyof VALIDATOR_REGISTRY;
type RegisteredPrettyIden = VALIDATOR_REGISTRY[keyof VALIDATOR_REGISTRY]["pretty"];

type RegistedValIdenMapValue<TType> = {
    pretty: string;
    is: (v: unknown) => v is TType;
    ensurer: (v: unknown) => TType;
}

/** the params to pass to 'registerValidator' */
type NewValidatorParams<
    TIden extends string, //Readonly<string>,
    TPretty extends string,
    TType,
> =
    {
        iden: TIden;
        /** defaults to 'iden' */
        prettyIden?: TPretty;
        is(v: unknown): v is TType;
        /** optional customer errMsg getter to provide the 'throw' when 'ensurer' fails, that can optionally take in the 'bad' value */
        errMsg?: GetterOr<string, unknown>;
    };

/** just sets 'TPretty' to 'TIden' if 'TPrety' was not provided */
type ParseValidatorParams<TParams>
    = TParams extends NewValidatorParams<infer TIden, infer TPretty, infer TType>
        ? {
            pretty: string extends TPretty ? TIden : TPretty;
            type: TType;
        }
        : never;