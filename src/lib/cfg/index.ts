export {
    getConfig,
    setConfig,
    DEFAULT_CONFIG,
}

type Cfg = {
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
    allowVacuous: boolean
};

/** the default config */
const DEFAULT_CONFIG = {
    allowVacuous: true,
} as const satisfies Cfg;

let cfg: Cfg = structuredClone(DEFAULT_CONFIG);

/**
 * updates the global config for the validator
 * @returns a readonly copy of the current config
*/
function setConfig(overwrite: Partial<Cfg>): Cfg {
    cfg = {
        ...cfg,
        ...overwrite
    };

    return getConfig();
}

/**
 * @returns a readonly copy of the current config
 * use {@link setConfig} to update the config
*/
function getConfig(): Readonly<Cfg> {
    return structuredClone(cfg);
}