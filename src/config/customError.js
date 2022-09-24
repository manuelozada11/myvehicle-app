export const customError = (message, code) => {
    let err = new Error();

    err.message = message;
    if (code) err.code = code;

    return err;
}