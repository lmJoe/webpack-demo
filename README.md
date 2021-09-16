Webpack 和 Code Splitting
题外知识点
打包开发环境代码

给开发环境配置打包文件："dev-build":"webpack --config ./build/webpack.dev.js"

给CleanWebpackPlugin配置参数[dist],和需要打包后的文件目录位置
root:path.resolve(__dirname,'../')//当在使用CleanWebpackPlugin，当前根路径不再为文件build文件中的根路径，而是将项目文件所在的路径视为根路径
代码分割的方法：
npm install lodash --save

引入lodash.js的入口文件

创建lodash.js文件，引入安装的lodash工具

第二种方法：
Code Splitting指的是代码分割：即webpack的代码分割
配置如下：

 cnpm install babel-plugin-dynamic-import-webpack
假设代码为异步加载，webpack也会做代码分割，比如加载的lodash，这个库是异步加载的，这个库会被单独的放到一个文件中。

webpack的代码分割有两种方式，一种借助webpck里面的配置（optimization做配置），如图：

然后结合同步代码，然后分析同步代码里面的内容做代码分割。
另一种：不配置optimization,写异步的载入组件的方式和异步载入的组件也会被异步打包到一个单独的文件中。如图：

webpack的代码分割的总结
代码分割和webpack无关，是一个单独的概念，用于提升项目的性能。
webpack中实现代码分割，两种方式。
1.同步代码：
只需要在webpack.commom.js中做optimization的配置即可。
2.异步代码：
用import的方式引入组件，异步代码，无需做任何配置，会自动进行代码分割，放置到新的文件中