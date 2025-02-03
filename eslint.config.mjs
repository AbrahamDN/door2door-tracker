import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Configure @typescript-eslint/no-unused-vars
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_", // Ignore parameters prefixed with `_`
          varsIgnorePattern: "^_", // Ignore variables prefixed with `_`
          caughtErrorsIgnorePattern: "^_", // Ignore caught errors prefixed with `_`
        },
      ],
    },
  },
];

export default eslintConfig;
