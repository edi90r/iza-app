module.exports = {
    root: true,
    env: { node: true, browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@babel/eslint-parser',
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        requireConfigFile: false,
        ecmaFeatures: { jsx: true },
    },
    settings: { react: { version: '18.2' } },
    plugins: ['react-refresh'],
    rules: {
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
};
