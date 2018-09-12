const path = require('path');

const isProd = false;

module.exports = {
    mode: isProd ? "production" : "development", // no defaults
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    optimization: {
        // We no not want to minimize our code.
        minimize: isProd
    },
};