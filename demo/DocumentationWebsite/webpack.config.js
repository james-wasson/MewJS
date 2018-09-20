const path = require('path');
const webpack = require('webpack');

const isProd = false;

module.exports = {
    mode: isProd ? "production" : "development", // no defaults
    entry: {
        app: path.resolve(__dirname, './src/index.js'),
        style: path.resolve(__dirname, './src/style/main.scss')
    },
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
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist'),
        publicPath: 'assets/',
    },
    optimization: {
        minimize: isProd
    },
    resolve: {
        alias: {
            'Mew': path.resolve(__dirname, '../../dist/bundle.js'),
        }
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                loader: 'style-loader' // creates style nodes from JS strings
            }, {
                loader: 'css-loader' // translates CSS into CommonJS
            }]
        },{
            test: /\.less$/,
            use: [{
                loader: 'style-loader' // creates style nodes from JS strings
            }, {
                loader: 'css-loader' // translates CSS into CommonJS
            }, {
                loader: 'less-loader' // compiles Less to CSS
            }]
        },{
            test: /\.scss$/,
            use: [{
                loader: 'style-loader' // creates style nodes from JS strings
            }, {
                loader: 'css-loader' // translates CSS into CommonJS
            }, {
                loader: 'sass-loader', // compiles Sass to CSS
                options: {
                    implementation: require("node-sass")
                }
            }]
        },{
            test: /\.(png|svg|jpg|gif)$/,
            use: [{
                loader: 'file-loader'
            }]
        }]
    }
};