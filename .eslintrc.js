module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'react-app', 'prettier'],
  overrides: [
    // For main application code
    // TODO: Should use standard-with-typescript?
    {
      extends: ['plugin:@typescript-eslint/recommended'],
      files: ['src/**/*.{ts,tsx}'],
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: 'tsconfig.json'
      }
    },
    // For cypress e2e test code
    {
      extends: ['plugin:@typescript-eslint/recommended', 'plugin:cypress/recommended'],
      files: ['cypress/**/*.ts'],
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: 'cypress/tsconfig.json'
      }
    }
  ],
  plugins: ['react', '@typescript-eslint', 'cypress'],
  rules: {
    // Use semicolons (cf. https://github.com/standard/eslint-config-semistandard/blob/master/eslintrc.json)
    semi: ['error', 'always'],
    'no-extra-semi': 'error',
    'react/no-unknown-property': ['error', { ignore: ['css'] }]
  }
};
