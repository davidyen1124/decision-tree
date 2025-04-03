import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import eslintPluginImport from "eslint-plugin-import";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "simple-import-sort": simpleImportSort,
      import: eslintPluginImport,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // Enforce simple import sorting with custom groups
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // External packages `react` related packages come first.
            ["^react", "^@?w"],
            // Internal packages. Adjust '@/' based on your alias settings.
            ["^@/"],
            // Parent imports. Put `..` last.
            ["^..(?!/?$)", "^../?$"],
            // Other relative imports. Put same-folder imports and `.` last.
            ["^./(?=.*/)(?!/?$)", "^.(?!/?$)", "^./?$"],
            // Side effect imports.
            ["^\u0000"],
            // Style imports.
            ["^.+.s?css$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
      // Optional import rules for consistency
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
    },
  }
);
