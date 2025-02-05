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
      "dist",
      "esm/*",
      "public/*",
      "tests/*",
      "scripts/*",
      "*.config.js",
      ".DS_Store",
      "node_modules",
      "coverage",
      ".next",
      "build",
      "!.commitlintrc.cjs",
      "!.lintstagedrc.cjs",
      "!jest.config.js",
      "!plopfile.js",
      "!react-shim.js",
    ],
    extends: ["plugin:@next/next/recommended"],
    plugins: ["unused-imports"],
    rules: {
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": "error",
      "no-console": "error",
    },
  }),
];

export default eslintConfig;
