export {
    StrNumMaybeObj,
    someObj,
}

class StrNumMaybeObj {
    constructor(str: string, num: number, strOrNull?: null | string) {
        this.str = str;
        this.num = num;
        if (typeof strOrNull !== "undefined") {
            this.strOrNull = strOrNull;
        }
    }

    str: string;
    num: number;
    strOrNull?: null | string;
}

const someObj = new StrNumMaybeObj("hello", 100);