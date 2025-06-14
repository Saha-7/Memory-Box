// module.exports = {
//   root: true,
//   env: {
//     es6: true,
//     node: true,
//   },
//   extends: [
//     "eslint:recommended",
//     "plugin:import/errors",
//     "plugin:import/warnings",
//     "plugin:import/typescript",
//     "google",
//     "plugin:@typescript-eslint/recommended",
//   ],
//   parser: "@typescript-eslint/parser",
//   parserOptions: {
//     project: ["tsconfig.json", "tsconfig.dev.json"],
//     sourceType: "module",
//   },
//   ignorePatterns: [
//     "/lib/**/*", // Ignore built files.
//     "/generated/**/*", // Ignore generated files.
//   ],
//   plugins: [
//     "@typescript-eslint",
//     "import",
//   ],
//   rules: {
//     "quotes": ["error", "double"],
//     "import/no-unresolved": 0,
//     "indent": ["error", 2],
//   },
// };


module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  ignorePatterns: [
    "/lib/**/*",
    "/node_modules/**/*",
  ],
  plugins: [
    "@typescript-eslint",
  ],
  rules: {
    "quotes": ["error", "double"],
    "indent": ["error", 2],
    "max-len": ["error", { "code": 100 }],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "object-curly-spacing": ["error", "always"],
  },
};
