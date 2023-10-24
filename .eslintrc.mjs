module.exports = {
    extends: [
        "plugin:astro/recommended",
    ],
    overrides: [
        {
            files: ["*.astro"],
            parser: "astro-eslint-parser",
            parserOptions: {
                parser: "@typescript-eslint/parser",
                extraFileExtensions: [".astro"],
            },
            rules: {
                "astro/no-unused-define-vars-in-style": "error",
            },
        },
    ],
}