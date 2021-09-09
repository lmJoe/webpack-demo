# webpack-demo
Develoment 和 Production 模式的区分打包

将原有的webpack.config.js文件重命名为webpack.dev.js作为开发调用的js
并重新创建一个js文件，命名为webpack.prod.js作为生产环境调用的js
给开发环境的文件和生产环境的文件做调整
开发环境：

隐藏hotonly:true

生产环境：删除new webpack.HotModuleReplacementPlugin()热更
删除devserver中的配置
删除optimization配置

生产环境和开发环境配置完毕之后就可以根据npm run build打包
由于webpack.dev.js和webpack.prod.js文件中存在大量相同代码，可以重新创建一个js文件，将重复代码放置这个新的文件webpack.common.js文件中；
利用webpack-merge的插件工具将三个文件联系起来
安装：npm install webpack-merge -D



1.分别对webpack.prod.js和webpack.dev.js文件做更改，webpack.common.js文件填入相同代码
2.将webpack.prod.js和webpack.dev.js、webpack.common.js三个文件放入build文件中，然后对package.json文件进行修改。
1.
公共文件

生产环境文件

开发环境文件

2.
