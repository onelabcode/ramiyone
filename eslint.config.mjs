import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: {
    extends: ["eslint:recommended"],
  },
});

const eslintConfig = [
  ...compat.config({
    ignorePatterns: [
      "node_modules",
      "dist",
      "build",
      ".now/*",
      "*.css",
      ".changeset",
      "esm/*",
      "public/*",
      "tests/*",
      "scripts/*",
      "*.config.js",
      ".DS_Store",
      "coverage",
      ".next",
      "!.commitlintrc.cjs",
      "!.lintstagedrc.cjs",
      "!jest.config.js",
      "!plopfile.js",
      "!react-shim.js",
    ],
    extends: ["plugin:@next/next/recommended"],
    plugins: ["unused-imports"],
    parserOptions: {
      ecmaVersion: 2021, // Use the latest ECMAScript version
      sourceType: "module",
    },
    env: {
      es6: true,
      node: true,
      browser: true, // Ensures compatibility with frontend code
    },
    rules: {
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": "error",
    },
    overrides: [
      {
        files: ["*.jsx"],
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
        extends: ["plugin:react/recommended"], // Ensure React best practices
        plugins: ["react"],
        settings: {
          react: {
            version: "detect",
          },
        },
        rules: {
          "react/prop-types": "off", // Move this inside the overrides
          "react/react-in-jsx-scope": "off",
        },
      },
    ],
  }),
];

export default eslintConfig;
