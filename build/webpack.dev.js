const webpack = require('webpack');
const {merge} = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const devConfig = {
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		contentBase: './dist',
		open: true,
		port: 8080,
		hot: true,
		// hotOnly: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
  //optimization在production的环境下可以删除不用
  optimization:{
    usedExports:true,
  },
}
module.exports = merge(commonConfig,devConfig);