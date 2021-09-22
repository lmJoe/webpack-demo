CSS 文件的代码分割

chunkfilename和filename的区别:
mini-css-extract-plugin插件，在webpack中对引入的css文件进行代码分割
此插件缺陷：此插件不支持模块热更新
安装此插件：npm install --save-dev mini-css-extract-plugin，并且引入，然后做module的配置
给线上环境配置使用mini-css-extract-plugin的方法

此处的css配置删除，

在开发环境中重新配置，还是需要使用style-loader的方法

如何针对某一些模块不做tree shaking

将此处的usedExports剪切出来放入webpack.common.js文件中



在做打包即可看到



以上配置意义为针对css文件不做tree shaking
一个文件即将被一个页面引用的时候，会走MiniCssExtractPlugin中filename。
如果是间接引入到页面中的一个文件，那就会走chunkFilename
安装Css压缩插件 npm install optimize-css-assets-webpack-plugin -D
创建一个新的style1.css文件作为css压缩插件的调节样式

安装成功后引入webpack.prod.js文件作配置

运行打包后

假如一个开发文件中有多个入口文件，希望所有的入口文件引入的css文件都能打包生成到一个css文件中
做法：使用cacheGroups配置项中
只要打包发现样式文件后缀为css的文件，不管是同步还是异步都统一打包到styles的文件中，

enforce：true 忽略掉默认的参数
假如一个开发文件中有多个入口文件，希望根据入口的不同把css文件打包到不用的css文件中。如有两个入口文件

main1文件和mian文件都打包引入不同的mian.css和mian1.css文件，这块配置也使用cacheGroups配置项中