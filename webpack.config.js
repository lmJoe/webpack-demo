const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = {
  mode:'production',//不配置mode，会有警告production表示压缩 development表示没有被压缩
  entry:{
    main:'./src/index.js',//项目文件开始从哪一个文件打包(如果此处已经配置了main:'./src/index.js',在出口文件配置项中即output，没有配置filename:'bundle.js',则打包出的js出口文件为main.js)
    sub:'./src/index.js'//打两次js出口文件
  },
  module:{
    rules:[//此处的意思为 针对静态资源后缀为jpg的图片，使用file-loader的方法进行打包
      {
        test:/\.(jpg|png|gif)$/,
        use:{
          // loader:'file-loader',
          //打包使用另一个的工具
          loader:'url-loader',//打包出来的图片为base64的格式，带来的好处，图片打包到js，不会再额外请求图片，如果图片特别大，打到js中也就大，加载时间就越长。最佳使用的方式，图片小，打包使用base64的方法适用，图片大，则使用file-loader
          options:{
            //ploaceholder 占位符，name:'[name].[ext]',的意义在于打包图片资源的时候，吧图片原有名称（[name]_[hash]hash值）和后缀[ext]，一起打包进去
            name:'[name]_[hash].[ext]',
            outputPath:'images/',//把打包后的image图片打包到dist的images的文件夹中
            limit:2048,//在使用url-loader工具的情况下，如果图片大小超过2048个字节，则打包到dist的图片文件中，如果小于2048个字节，则打包为base64的格式到js中
          }
        }
      },{
        test:/\.vue$/,
        use:{
          loader:'vue-loader'
        }
      },{
        test:/\.less$/,
        use:[
          'style-loader',
          {
            loader:'css-loader',
            options:{
              importLoaders:2,//如果index.less中也引入了一个.less文件，并且这个文件也需要通过postcss-loader和less-loader使用，则需给css-loader添加配置项importLoaders为2
              // modules:true,//打包CSS模块化，以防多个css文件再打包后相互影响
            }
          },
          'less-loader',
          'postcss-loader',//用于给样式文件中某些样式添加-webkit- -moz-等媒体前置条件
        ]
      },
      {
        test:/\.(ttf|eot|svg|woff|woff2)$/,
        use:{
          loader:'file-loader',
        }
      }
    ],
  },//对模块打包进行配置
  output:{
    publicPath:'http://cdn.com.cn',//想要将打包的两个js文件放在http://cdn.com.cn 域名中
    filename:'[name].js',//打包后生成的文件名,此处的[name]为占位符
    path:path.resolve(__dirname ,'dist'),//打出的包的路径 _dirname变量指的是webpack.config.js所在的当前目录的路径，和bundle结合 ，代码生成的文件路径就是bundle.js的路径
  },
  //plugin可以在webpack运行到某个时刻的时候帮我们做一些事情如（HtmlWebpackPlugin在打包结束的时候生成一个html，将结果注入到这个html中）
  //能够在重新打包的时候，能够把已经打包出来的文件清空，打出一个新包
  plugins:[
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin(
      {
        template:'src/index.html',
      }
    ),
    new CleanWebpackPlugin(),//表示在打包之前。会使用CleanWebpackPlugin这个插件帮助清除dist下的内容
  ]
}