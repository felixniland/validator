export { newInstanceOfValidator, };
function newInstanceOfValidator(constructor) {
    const validator = (val) => val instanceof constructor;
    return validator;
}
