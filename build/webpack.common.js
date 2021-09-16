const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
  entry: {
		main: './src/index.js'
	},
  module: {
		rules: [{ 
			test: /\.js$/, 
			exclude: /node_modules/, 
			loader: 'babel-loader',
		}, {
			test: /\.(jpg|png|gif)$/,
			use: {
				loader: 'url-loader',
				options: {
					name: '[name]_[hash].[ext]',
					outputPath: 'images/',
					limit: 10240
				}
			} 
		}, {
			test: /\.(eot|ttf|svg)$/,
			use: {
				loader: 'file-loader'
			} 
		}, {
			test: /\.scss$/,
			use: [
				'style-loader', 
				{
					loader: 'css-loader',
					options: {
						importLoaders: 2
					}
				},
				'sass-loader',
				'postcss-loader'
			]
		}, {
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader',
				'postcss-loader'
			]
		}]
	},
  plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}), 
		new CleanWebpackPlugin(['dist'],{
      root:path.resolve(__dirname,'../')//当在使用CleanWebpackPlugin，当前根路径不再为文件build文件中的根路径，而是将项目文件所在的路径视为根路径
    })//需要在打包时清理的文件
	],
  //做代码分割的配置
  optimization:{
    splitChunks:{
      chunks:'all',
    }
  },
  output: {
		filename: '[name].js',
		path: path.resolve(__dirname, '../dist'),//打包生成的文件放在webpack.commom.js的上一层目录,也就是项目文件根目录下
	},
}