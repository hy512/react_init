const path = require('path');
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        vendor: [
            // "axios",
            // "@babel/runtime",
            "@tweenjs/tween.js",
            "babel-polyfill",
            // "url",
            // "crypto-js",
            "hammerjs",
            // "mockjs",
            "react",
            "react-dom",
            "react-router",
            "react-router-dom",
            "redux",
            "redux-thunk",
            "redux-actions",
            "react-redux"
        ]
    },
    output: {
        path: path.resolve(__dirname, "../dist/dll"),
        filename: "[name].dll.js",
        library: "[name]",
        libraryTarget: "umd",
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '../dist/dll', '[name]-manifest.json'),
            context: __dirname,
            name: '[name]'
        }),
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin()
        ],
    }
}