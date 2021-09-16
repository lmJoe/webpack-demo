SplitChunksPlugin 配置参数详解
webpack中代码分割实际上底层使用了SplitChunksPlugin的插件
SplitChunksPlugin插件的配置
在打包后出现的0.js 当前0为打包id,需要将此id更换为一个可以记住的名字的打包后的文件。
需要在业务开发文件中添加魔法注释

删除此插件，因为此插件不支持魔法注释的写法

babel文件中删除此插件，替换为@babel/plugin-syntax-dynamic-import





此处的optimization,如果他的splitChunks对象设置为空，则默认置入上图中的配置项


当引入同步的lodash库时，

且chunks设置为all时，对同步的库做打包

此时会检查到cacheGroups中vendors的test,此处的test会帮我们检查node_modules中是否有已安装的lodash库，如果有则复合cacheGroups的vendors配置项的要求，则将lodash打包到vendors这样的一个组里面去。打包后生成的结果

此处的vendors-main.js则是打包代码分割生成的文件，属于vendors这个组，同时入口文件是main.js。如果无需再打包生成main.js文件，都打包在vendors~main.js中，则需要给vendor配置filename:'vendors',

splitChunks参数配置解析：
chunks: 'all',//async只在做代码分割时只对异步代码生效 all 则会对同步代码和异步代码一起做分割 initial 只对同步代码做代码分割
minSize: 0,//如果引入的模块、包、库大于30KB，才会做代码分割，如果置为0，则需要将cacheGroups中default做参数配置，
default: {
      priority: -20,
      reuseExistingChunk: true,
      filename:'common.js'   //如果minSize:0时，则将大于0的代码打包入common.js文件中
 }

maxSize: 0,//如果需打包的业务代码大小为1MB  此处设置50KB，则会将1MB的业务代码尝试性的再次分割，将1MB的代码再多次分割。这个配置少配置，不需多了解
minChunks: 1,//当一个模块备用了多少次的时候，才会去被代码分割
maxAsyncRequests: 5,//同时加载的模块数，最多是5个（在打包前五个库的时候，会帮我们打包生成5个js文件，如果超过5个则不会再做代码分割）
maxInitialRequests: 3,//整个网站首页或者入口文件进行加载的时候，入口文件可能会引入其他的js文件或库，入口文件引入的库如果做代码分割，最多只能分割三个代码文件，再多就不做分割
automaticNameDelimiter: '~',//文件生成的时候，文件中间使用的连接符。
name: true,//打包生成的文件起得名有效
cacheGroups：{
vendors: {
     test: /[\\/]node_modules[\\/]/, //检测是否是从node_modules中引入的模块
     priority: -10,
     filename:'vendors.js',
 },
default: {
     priority: -20,
     reuseExistingChunk: true,//
     filename:'common.js'
}
priority:打包程序进入到cacheGroups中，根据priority的优先级作为依据来决定走vendors还是default
reuseExistingChunk: true,//如果引入的模块a中又引入了模块b,满足以上条件，那么a模块的代码就会被打包到common.js文件中，在打包a代码时，b也会被打包，如果此处的配置设置为true,如果b模块的代码在a模块以外也有被引入，并且提前于a模块已被打包，那么a模块此时引入的b则无需再次被打包到common.js,他会直接使用之前b模块已被打包的位置
如果分割代码满足以上条件，如果是从node_modules中引入的模块，那么就把他打入filename中配置的文件中

}