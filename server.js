const express = require('express');
const webpack = require('webpack');//引入webpack的库
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');//引入webpack的配置文件
// 在node中直接使用webpack
// 在命令行里使用webpack
const complier = webpack(config);//用webpack结合配置文件随时实现代码的编译器

const app = express();//创建一个服务器的实例


//意思：只要文件发生改变那就complier就会重新运行生成的文件对应的打包输出内容publicPath就是config.output.publicPathy
app.use(webpackDevMiddleware(complier, {
  publicPath:config.output.publicPath
}));//用服务器使用webpackDevMiddleware的中间件接收两个参数（编译器，publicPath:config.output.publicPath）
//监听一个3000端口
app.listen(3000, () => {
  //服务器启动成功
	console.log('server is running');
});