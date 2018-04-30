var path = require('path')
var webpack = require('webpack')

module.exports = {
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: '/dist/',
		filename: 'build.js'
	},
	module: {
		rules: [
			// only lint local *.vue files
			{
				test: /\.(js|vue)$/,
				loader: 'eslint-loader',
				enforce: 'pre',
				exclude: /node_modules/,
				include:[path.join(__dirname, './src')],
				options: {
					formatter: require('eslint-friendly-formatter'),
					//eslintPath: path.join(__dirname, "..",".eslintrc.js")
				}
			},
			// but use vue-loader for all *.vue files
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						// Since sass-loader (weirdly) has SCSS as its default parse mode, we map
						// the "scss" and "sass" values for the lang attribute to the right configs here.
						// other preprocessors should work out of the box, no loader config like this necessary.
						'scss': 'vue-style-loader!css-loader!sass-loader',
						'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
					}
					// other vue-loader options go here
					, cssModules: {
						modules: true,
						minimize: true,
						localIdentName: '[path][name]---[local]---[hash:base64:5]',
						camelCase: true
					}
				}
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include:[path.join(__dirname, './src')],
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]?[hash]'
				}
			}
		]
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js'
		}
	},
	devServer: {
		historyApiFallback: true,
		noInfo: true,
		port: 8663
	},
	performance: {
		hints: false
	},
	devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
	module.exports.devtool = '#source-map'
	// http://vue-loader.vuejs.org/en/workflow/production.html
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	])
}
