module.exports = {
  // 集成eslint规则
  extends: ["eslint:recommended"],
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
  rules: {
    "no-var": 1,
    "no-console": 1,
    "no-unused-vars": ["warn", { vars: "local" }],
    // "sort-imports": 1
  },
};
