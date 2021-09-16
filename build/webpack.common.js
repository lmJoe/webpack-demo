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
    splitChunks: {
      chunks: 'all',//async只在做代码分割时只对异步代码生效 all 则会对同步代码和异步代码一起做分割 initial 只对同步代码做代码分割
      minSize: 0,//如果引入的模块、包、库大于30KB，才会做代码分割，如果置为0，则需要将cacheGroups中default做参数配置，
      maxSize: 0,//如果需打包的业务代码大小为1MB  此处设置50KB，则会将1MB的业务代码尝试性的再次分割，将1MB的代码再多次分割。这个配置少配置，不需多了解
      minChunks: 1,//当一个模块备用了多少次的时候，才会去被代码分割
      maxAsyncRequests: 5,//同时加载的模块数，最多是5个（在打包前五个库的时候，会帮我们打包生成5个js文件，如果超过5个则不会再做代码分割）
      maxInitialRequests: 3,//整个网站首页或者入口文件进行加载的时候，入口文件可能会引入其他的js文件或库，入口文件引入的库如果做代码分割，最多只能分割三个代码文件，再多就不做分割
      automaticNameDelimiter: '~',//文件生成的时候，文件中间使用的连接符。
      name: true,//打包生成的文件起得名有效
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,//检测是否是从node_modules中引入的模块
          priority: -10,
          filename:'vendors.js',
        },
        default: {
          priority: -20,
          reuseExistingChunk: true,
          filename:'common.js'   //如果minSize:0时，则将大于0的代码打包入common.js文件中
        }
      }
    }
  },
  output: {
		filename: '[name].js',
		path: path.resolve(__dirname, '../dist'),//打包生成的文件放在webpack.commom.js的上一层目录,也就是项目文件根目录下
	},
}