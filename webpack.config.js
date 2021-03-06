const path = require('path');
const webpack = require('webpack');

const isProd = false;

module.exports = {
    mode: isProd ? "production" : "development", // no defaults
    entry: {
        app: './src/index.js'
    },
    devServer: {
        contentBase: './dist',
        hot: true,
        port: 8080,
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
        path: path.resolve(__dirname, 'dist'),
        library: 'Mew',
        libraryTarget: 'umd'
    },
    optimization: {
        minimize: isProd
    }
};