module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    "ecmaVersion": 2018,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "comma-dangle": 0,
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    "quotes": ["error", "double", {"allowTemplateLiterals": true}],
    "linebreak-style": 0,
    "indent": "off",
    "spaced-comment": 0,
    "trailing-comma": 0,
    "no-unreachable": 0,
    "eol-last": 0,
    "padded-blocks": 0,
    "no-trailing-spaces": 0,
    "new-cap": 0,
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
};
