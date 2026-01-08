import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ["**/*.{js,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
  },

  // ✅ Allow require() (disable rule)
  {
    files: ["**/*.{js,ts,tsx}"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];

