var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'eval',
    entry: {
        bundle: [
            'webpack-hot-middleware/client?reload=true',
            path.join(__dirname, 'src/app/index')
        ],
        vendor:  ['react', 'react-dom']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/',
        chunkFilename: '[name].js'
    },
    module: {
        loaders:[
            { test: /\.sass$/, loader: ExtractTextPlugin.extract('style-loader', ['css-loader?minimize', 'sass-loader']) },
            { test: /\.js[x]?$/, include: path.resolve(__dirname, 'src'), exclude: /node_modules/, loader: 'babel-loader' },
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: '[name].js',
            minChunks: Infinity
        }),
        new ExtractTextPlugin('main.css'),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
};
