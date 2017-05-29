'use strict';
var webpack = require('webpack');

var config = {
    context: __dirname + '/src', // `__dirname` is root of project and `src` is source
    entry: {
        app: './app/index.js',
    },
    output: {
        path: __dirname + '/dist', // `dist` is the destination
        filename: 'bundle.js',
        publicPath: "/assets",
    },
    module: {
        rules: [
            {
                test: /\.js$/, //Check for all js files
                loader: 'babel-loader',
                query: {
                    presets: ["babel-preset-es2015"].map(require.resolve),
                    plugins: ["transform-object-rest-spread"]
                }
            },
            {
                test: /\.json$/,
                loader: "json-loader"  //JSON loader
            }
        ]
    },
    //To run development server
    devServer: {
        contentBase: __dirname + '/src',
    },

    devtool: "eval-source-map" // Default development sourcemap
};

// Check if build is running in production mode, then change the sourcemap type
if (process.env.NODE_ENV === "production") {
    config.devtool = "source-map";

    // Can do more here
    // JSUglify plugin
    // Offline plugin
    // Bundle styles seperatly using plugins etc,
}

module.exports = config;