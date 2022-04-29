module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  rules: {
    'no-console': 0, // process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': 0, // process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-alert': 0,
    'lines-between-class-members': 0,
    'class-methods-use-this': 'off',
    'linebreak-style': 0, // 允许windows开发环境
    'comma-dangle': 0, // 尾后逗号
    'no-trailing-spaces': 0,
    'no-else-return': 0,
    'no-cond-assign': 0,
    'arrow-parens': 0,
    'no-return-assign': 0,
    'guard-for-in': 0,
    'no-restricted-syntax': 0,
    'no-param-reassign': 0,
    camelcase: 0,
    'consistent-return': 0,
    'object-curly-newline': 0,
    'no-restricted-globals': 0,
    'no-multi-spaces': 0,
    'global-require': 0,
    'implicit-arrow-linebreak': 0,
    'array-callback-return': 0,
    'max-len': 0,
    'no-unused-vars': 0,
    'no-unused-expressions': 0,
    'no-plusplus': 0,
    'no-shadow': 0,
    'no-empty': 0,
    'import/extensions': 0,
    'no-underscore-dangle': 0,
    'no-bitwise': 0,
    'no-tabs': 0,
    'import/no-unresolved': 0,
    'no-self-assign': 0,
    'new-cap': 0,
    'no-extend-native': 0,
    'prefer-destructuring': 0,
    'import/prefer-default-export': 0,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  globals: {
    BMap: true,
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
