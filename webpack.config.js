module.exports = {
	entry: './src/index.js',
	output: {
		path: __dirname + '/public', 
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				exclude: /(node_module)/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react']
				}
			}
		]
	}, 
	watch: true
}