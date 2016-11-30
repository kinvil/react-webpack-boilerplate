var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'eval',
    entry: {
        bundle: [
            'webpack-hot-middleware/client?reload=true',
            path.join(__dirname, 'src/app/index')
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/[name].js',
        publicPath: '/',
        chunkFilename: 'js/[name].[chunkhash].js',
        sourceMapFilename: 'map/[file].map'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'js/[name].js'
        }),
        new ExtractTextPlugin('css/main.css'),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        })
    ],
    module: {
        loaders:[
            { test: /\.sass$/, loader: ExtractTextPlugin.extract('style-loader', ['css-loader?minimize', 'sass-loader']) },
            { test: /\.js[x]?$/, include: path.resolve(__dirname, 'src'), exclude: /node_modules/, loader: 'babel-loader' },
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
};
