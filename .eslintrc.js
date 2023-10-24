module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        ecmaVersion: 2020,
        project: ['./tsconfig.json']
    },
    plugins: ['@typescript-eslint', 'prettier'],
    extends: ['plugin:import/recommended', 'plugin:import/typescript', 'plugin:prettier/recommended'],
    env: {
        browser: true,
        es2021: true,
        commonjs: true
    },
    rules: {
        // Prettier rules
        'prettier/prettier': ['warn', { endOfLine: 'auto' }],

        // Airbnb rules
        'react/jsx-filename-extension': ['off'],

        // Turned off rules
        indent: 'off',
        'no-param-reassign': 'off',
        'no-shadow': 'off',
        radix: 'off',
        'import/no-unresolved': ['off'],
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        endOfLine: 'off',
        'import/prefer-default-export': 'off',
        '@typescript-eslint/no-implicit-any-catch': ['off', { allowExplicitAny: true }],

        // Computed rules
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn', // eslint-disable-line no-undef
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn', // eslint-disable-line no-undef
        'no-alert': process.env.NODE_ENV === 'production' ? 'error' : 'warn', // eslint-disable-line no-undef

        // Error rules
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'no-useless-catch': 'error',
        'import/order': ['error'],
        'import/no-self-import': ['error'],
        'import/no-cycle': ['error'],
        '@typescript-eslint/explicit-function-return-type': ['error'],
        '@typescript-eslint/no-explicit-any': 'error',

        // Warning rules
        'no-unused-vars': 'warn',
        '@typescript-eslint/no-unused-vars': 'warn',
        'no-tabs': ['warn', { allowIndentationTabs: true }],
        '@typescript-eslint/ban-ts-comment': ['off'],
        '@typescript-eslint/type-annotation-spacing': [
            'warn',
            { before: false, after: true, overrides: { arrow: { before: true, after: true } } }
        ],
        '@typescript-eslint/member-delimiter-style': [
            'warn',
            {
                multiline: {
                    delimiter: 'semi',
                    requireLast: true
                },
                singleline: {
                    delimiter: 'semi',
                    requireLast: false
                }
            }
        ],
        '@typescript-eslint/naming-convention': [
            'warn',
            {
                selector: 'enum',
                format: ['UPPER_CASE']
            }
        ],
        'padding-line-between-statements': [
            'warn',
            { blankLine: 'always', prev: '*', next: 'if' },
            { blankLine: 'always', prev: '*', next: 'break' },
            { blankLine: 'always', prev: '*', next: 'case' },
            { blankLine: 'always', prev: '*', next: 'continue' },
            { blankLine: 'always', prev: '*', next: 'debugger' },
            { blankLine: 'always', prev: '*', next: 'for' },
            { blankLine: 'always', prev: '*', next: 'switch' },
            { blankLine: 'always', prev: '*', next: 'throw' },
            { blankLine: 'always', prev: '*', next: 'try' },
            { blankLine: 'always', prev: '*', next: 'while' }
        ]
    }
};
