/* eslint-disable */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/demo/index.tsx',
    },
    devServer: {
        port: 8001
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
        libraryTarget: 'commonjs'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-react', '@babel/preset-env', '@babel/preset-typescript',],
                    plugins: ['@babel/plugin-transform-runtime'],
                  },
                },
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
              },
        ]   
    },
    plugins: [new HtmlWebpackPlugin({
        templateContent: '<div id="app"></div>'
    })],
    resolve: {
        extensions: ['.ts', '.js', '.tsx'],
    }
};