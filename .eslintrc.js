module.exports = {
  root: true,
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: ['airbnb', 'airbnb/hooks', 'plugin:prettier/recommended'],
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/no-unresolved': ['error', { ignore: ['^@'] }],
    'no-underscore-dangle': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
  },
};
