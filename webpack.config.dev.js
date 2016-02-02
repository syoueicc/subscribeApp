var path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");;

module.exports = {
	entry: [
		"babel-polyfill",
		path.join(__dirname, 'source/index.js'),
		path.join(__dirname, 'source/styles/styles.scss')
	],
	output: {
		filename: 'js/[name].bundle.js',
		path: path.join(__dirname, 'www'),
		publicPath: '/js/'
	},
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin('js/commons.js'),
        new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('develop')
		}),
		new ExtractTextPlugin('styles/styles.css', {
			publicPath: '/styles/',
			allChunks: true
		})
    ],
	module: {
		//noParse: [/node_modules/],
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				query: {
					presets: ['es2015', 'stage-3', 'react'],
					//plugins: ['transform-runtime']
				}
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader")
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
			}
		]
	}
}