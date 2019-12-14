module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "babel",
    ],
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "react/jsx-boolean-value": 0,
        "react/jsx-closing-bracket-location": 1,
        "react/jsx-curly-spacing": [2, "always"],
        "react/jsx-indent-props": [1, 2],
        "react/jsx-no-undef": 1,
        "react/jsx-uses-react": 1,
        "react/jsx-uses-vars": 1,
        "react/react-in-jsx-scope": 1,
        "react/prefer-es6-class": 1,
        "react/jsx-no-bind": 1,
        "eslint-disable-next-line": 0,
    }
};