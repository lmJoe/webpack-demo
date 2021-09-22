Webpack 与浏览器缓存( Caching )

根据上图中打包后的出口文件名可知：
打包生成的新的文件的名字没有变，上传正式环境后，用户刷新页面，发现本地已经有缓存了，就不用会新上传的新的文件。
解决用户浏览器缓存的问题：

需要在output中filename后面的配置中制定根据内容生成的hash值作为文件名如[name].[contenthash].js
则打包后生成的文件名

用户只需要更新有变化的代码。没有变化的代码，则还是用本地缓存，
以上针对webpack4新版本
如果当前webpack版本为webpack4的老版本则需要在webpack.common.js文件中，在optimization对象中配置runtimeChunk:{name:'runtime'}.则打包出来的文件会相比新版本多出一个runtime的文件，在dist文件夹中，main文件为业务逻辑文件，vendors文件为引入的插件的node_module的文件，runtime则是这两个文件相关联的文件

