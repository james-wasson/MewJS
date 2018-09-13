const path = require('path');
const webpack = require('webpack');

const isProd = false;

module.exports = {
    mode: isProd ? "production" : "development", // no defaults
    entry: path.resolve(__dirname, './src/index.js'),
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        hot: true,
        port: 9000,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
    },
    optimization: {
        minimize: isProd
    }
};