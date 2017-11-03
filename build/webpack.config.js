const { resolve } = require('path')

const __approot = resolve(__dirname, '../'),
			__src 		= resolve(__approot, 'src/'),
			__dist 		= resolve(__approot, 'dist/')

const sharedConfig = {
	target: 'node',
	node: {
		console: false,
		global: false,
		__filename: false,
		__dirname: false,
		setImmediate: false,
		Buffer: false,
		process: false
	},

	devtool: 'sourcemap',

	entry: {
		index: resolve(__src, 'json-store')
	},

	output: {
		path: __dist,
		filename: '[name].webpack.js',
		libraryTarget: 'commonjs2'
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: [
						'es2015'
					],
					plugins: [
						//modules
						"add-module-exports"
					]
				}
			}
		]
	}
}

module.exports = [ sharedConfig ]
