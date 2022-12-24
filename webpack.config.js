/* eslint-disable */

const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.ts',
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
    resolve: {
        extensions: ['.ts', '.js', '.tsx'],
    }
};