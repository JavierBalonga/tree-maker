// prettier-ignore
const config = {
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss'
  ],
  arrowParens: 'always',
  printWidth: 100,
  singleQuote: true,
  jsxSingleQuote: false,
  semi: true,
  trailingComma: 'all',
  tabWidth: 2,
  importOrder: [
    '^react$',
    '^[^\\.]+$',
    '',
    '^\\.{2}(.*)$',
    '^\\.{1}(.*)$',
    '^(.*)$'
  ],
};

module.exports = config;
