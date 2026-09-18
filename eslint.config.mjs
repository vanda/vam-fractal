import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import babelParser from "@babel/eslint-parser";
import { configs, plugins } from "eslint-config-airbnb-extended";

const jsConfig = defineConfig([
  // ESLint recommended config
  {
    name: 'js/config',
    ...js.configs.recommended,
  },
  // Stylistic plugin
  plugins.stylistic,
  // Import X plugin
  plugins.importX,
  // Airbnb base recommended config
  ...configs.base.recommended,
]);

export default defineConfig([
  globalIgnores([".build/*", "**/node_modules/"]),
  // JavaScript config
  ...jsConfig,
  {
    languageOptions: {
      // No errors on undefined 'document' or 'window'
      // and commonJS use without adding the 'no-undef' rule
      globals: {
        ...globals.browser,
        process: "readonly",
        require: "readonly",
      },
      parser: babelParser,
      ecmaVersion: 6,
      sourceType: "module",
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-env"],
        },
      },
    },
    rules: {
        "no-underscore-dangle": "off",
        "prefer-destructuring": ["error", {
          object: false,
          array: false,
        }],
        "no-param-reassign": ["error", {
          props: false,
        }],
        "@stylistic/max-len": 0,
    },
  }
]);
