module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:svelte/recommended',
    'plugin:unicorn/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:security/recommended'
  ],
  plugins: ['@typescript-eslint',"tailwindcss"],
  ignorePatterns: ['*.cjs', 'node_modules'],
  overrides: [
    {
      files: ['*.svelte'], parser: 'svelte-eslint-parser', parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    },
    { files: ['*.ts', '*.svelte'], rules: { "no-undef": "off" } }
  ],
  settings: {
    'svelte3/typescript': require('typescript'),
    tailwindcss: {
      config: "./tailwind.config.cjs",
      cssfiles: [
        "src/**/*.postcss"
      ]
    }
  },
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
    ecmaVersion: 2020,
    extraFileExtensions: ['.svelte']
  },
  rules: {
    // "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/await-thenable": "error",
    "@typescript-eslint/no-misused-promises": "error",
    "@typescript-eslint/indent": "off",
    "unicorn/filename-case": "off",
    "unicorn/no-document-cookie": "off",
    "unicorn/prefer-top-level-await": "off",
    "unicorn/no-useless-undefined": "off",
  },
  env: {
    browser: true,
    es2020: true,
    es6: true,
    node: true
  },
};
