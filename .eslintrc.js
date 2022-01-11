module.exports = {
  "root": true,
  "env": {
    "node": true,
    "commonjs": true,
    "es6": true,
    "jquery": false,
    "jest": true,
    "jasmine": true,
  },
  "extends": "eslint:recommended",
  "parser": "@babel/eslint-parser",
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": "2020",
    "requireConfigFile": false, /** khong dung them cau hinh babel/eslint-parser */
  },
  "rules": {
    /** References */
    "prefer-const": [
      "error"
    ],
    "no-const-assign": [
      "error",
    ],
    "no-var": [
      "error"
    ],
    /** Objects */
    "no-new-object": [
      "error"
    ],
    "quote-props": [
      "error",
      "as-needed"
    ],
    "prefer-object-spread": [
      "error",
    ],
    /** Arrays */
    "no-array-constructor": [
      "error"
    ],
    /** String */
    "quotes": [
      "error",
      "single"
    ],
    "no-useless-escape": [
      "error"
    ],
    "no-eval": [
      "error"
    ],
    /** Functions */
    "func-style": [
      "error",
      "declaration",
      {
        "allowArrowFunctions": true
      }
    ],
    "wrap-iife": [
      "error",
      "any"
    ],
    "no-loop-func": [
      "error"
    ],
    "default-param-last": [
      "error"
    ],
    "no-new-func": [
      "error"
    ],
    "space-before-function-paren": [
      "error",
      {
        "anonymous": "always",
        "named": "never",
        "asyncArrow":
        "always"
      }
    ],
    "space-before-blocks": [
      "error"
    ],
    /** Arrow Functions */
    "prefer-arrow-callback": [
      "error",
      {
        "allowNamedFunctions": false,
        "allowUnboundThis": true
      }
    ],
    "arrow-parens": [
      "error",
      "always"
    ],
    "arrow-body-style": [
      "error",
      "always" /** as-needed */
    ],
    "arrow-parens": [
      "error",
      "always"
    ],
    "no-confusing-arrow": [
      "error"
    ],
    "implicit-arrow-linebreak": [
      "error",
      "beside"
    ],
    /** Classes & Constructors */
    "no-dupe-class-members": [
      "error"
    ],
    "class-methods-use-this": [
      "error"
    ],
    /** Modules */
    "no-duplicate-imports": [
      "error"
    ],
    /** Iterators and Generators */
    "no-iterator": [
      "error"
    ],
    "generator-star-spacing": [
      "error",
      {
        "before": false,
        "after": true
      }
    ],
    /** Properties */
    "dot-notation": [
      "error"
    ],
    /** Variables */
    "no-undef": [
      "error",
      {
        "typeof": false
      }
    ],
    "prefer-const": [
      "error"
    ],
    "no-multi-assign": [
      "error"
    ],
    "max-len": [
      "error",
      {
        "code": 120
      }
    ],
    "operator-linebreak": [
      "error",
      "after"
    ],
    "no-unused-vars": [
      "error"
    ],
    /** Hoisting */
    /** Comparison Operators & Equality */
    "no-case-declarations": [
      "error"
    ],
    "no-nested-ternary": [
      "error"
    ],
    "no-mixed-operators": [
      "error"
    ],
    /** Blocks */
    "nonblock-statement-body-position": [
      "error",
      "beside"
    ],
    "brace-style": [
      "error"
    ],
    /** Control Statements */
    /** Comments */
    "spaced-comment": [
      "error",
      "always"
    ],
    /** Whitespace */
    "indent": [
      "error",
      2
    ],
    "space-before-blocks": [
      "error"
    ],
    "keyword-spacing": [
      "error",
      {
        "before": true
      }
    ],
    "space-infix-ops": [
      "error"
    ],
    "eol-last": [
      "error",
      "always"
    ],
    "no-multiple-empty-lines": [
      "error",
      {
        "max": 2,
        "maxBOF": 1,
        "maxEOF": 0,
      }
    ],
    "no-trailing-spaces": [
      "error",
      {
        "skipBlankLines": true,
        "ignoreComments": true
      }
    ],
    "padded-blocks": [
      "error",
      "never"
    ],
    "space-in-parens": [
      "error",
      "never"
    ],
    "array-bracket-spacing": [
      "error",
      "never"
    ],
    "object-curly-spacing": [
      "error",
      "always"
    ],
    "block-spacing": [
      "error",
      "always"
    ],
    "comma-spacing": [
      "error",
      {
        "before": false,
        "after": true
      }
    ],
    "computed-property-spacing": [
      "error",
      "never"
    ],
    "func-call-spacing": [
      "error",
      "never"
    ],
    "key-spacing": [
      "error",
      {
        "beforeColon": false,
        "afterColon": true,
        "mode": "strict"
      }
    ],
    /** Commas */
    "comma-style": [
      "error",
      "last"
    ],
    // "comma-dangle": [
    //   "error",
    //   {
    //     "arrays": "never",
    //     "objects": "never",
    //     "imports": "never",
    //     "exports": "always",
    //     "functions": "never"
    //   }
    // ],
    /** Semicolons */
    "semi": [
      "error",
      "always"
    ],
    /** Naming Conventions */
    "id-length": [
      "error",
      {
        "min": 1
      }
    ],
    "camelcase": [
      "error",
      {
        properties: "never"
      }
    ],
    "no-underscore-dangle": [
      "error",
      {
        "allow": ["_doc", "_id"]
      }
    ],
    "no-console": [
      "off"
    ],
    "no-mixed-spaces-and-tabs": [
      "warn"
    ],
    "no-useless-constructor": [
      "off"
    ],
    "linebreak-style": [
      "off"
    ],
    "no-return-await": [
      "off"
    ],
    "consistent-return": [
      "off"
    ],
    "no-buffer-constructor": [
      "off"
    ],
    "no-restricted-syntax": [
      "off"
    ],
    "no-unsafe-optional-chaining": [
      "error"
    ]
  },
};
