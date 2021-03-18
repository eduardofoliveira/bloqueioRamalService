module.exports = {
    env: {
        commonjs: true,
        es6: true,
        node: true,
    },
    extends: ["standard"],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
    },
    parserOptions: {
        ecmaVersion: 2018,
    },
    rules: {
        indent: ["error", 4],
        quotes: ["error", "double"],
        semi: ["error", "never"],
        "no-async-promise-executor": "off",
        "no-return-assign": "off",
    },
};
