// cf. https://www.gatsbyjs.com/docs/how-to/custom-configuration/eslint/
module.exports = {
  env: {
    browser: true,
    es2016: true,
    node: true
  },
  extends: ['react-app', 'react-app/jest', 'prettier'],
  overrides: [
    // For Cypress E2E test code
    {
      extends: ['plugin:cypress/recommended'],
      files: ['cypress/**/*.ts'],
      parserOptions: {
        project: 'cypress/tsconfig.json'
      }
    }
  ],
  plugins: ['cypress'],
  rules: {
    // Use semicolons (cf. https://github.com/standard/eslint-config-semistandard/blob/master/eslintrc.json)
    semi: ['error', 'always'],
    'no-extra-semi': 'error',
    'react/no-unknown-property': ['error', { ignore: ['css'] }]
  }
};
