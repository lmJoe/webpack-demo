# webpack-demo
webpack打包工具的安装到配置的使用
Tree Shaking 概念详解
如图：

新建一个math.js的文件，里面暴露出两个方法，其中一个在index.js中被引用

然后使用npx webpack打包

可以看出，打包后的js文件，里面两个方法都被打包引用。所以打包后的js文件可能会很大。所以需要引用什么就只打包什么、这个时候就用到tree shaking(只支持ES module,也就是import模块的引入,因为import引入的是一个静态的ES)
tree shaking的配置
optimization的配置在生产环境（production）下可以删除不要

"sideEffects":false的作用在于，如果index.js文件中使用引入了一个工具，如：import "@babel/polly-fill",在使用了tree Shaking的方法时，打包后会出现将import 引入的@babel/polly-fill也会做tree shaking的处理，导致打包出错，"sideEffects":false会解决这种问题，如：如果不想对@babel/polly-fill做处理，则只需以数组的形式填入sideEffects,
如："sideEffects":['@babel/polly-fill'],我这里写false,是因为此时值引入了import { add } from './math.js',没有特殊要处理的东西及模块文件

如果文件中引入了css文件，打包css文件会出错，此时也可以将css文件避开不做tree shaking的处理，则将“*.css填入”，如图：

完成以上配置，则再次打包

exports used: add ，表示只有add的方法被使用。
