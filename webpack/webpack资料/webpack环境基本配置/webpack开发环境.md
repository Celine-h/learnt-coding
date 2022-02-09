# 开发环境

## 打包样式资源
   style-loader，css-loader，less-loader

## 打包html资源
    html-webpack-plugin

## 打包图片资源
   url-loader : 
   html-loader: 处理html中的图片资源

## 打包其他资源
   file-loader
## devServer
   自动编译，自动打开浏览器，自动刷新

+++   

# 生产环境

## 提取css成单独文件
   mini-css-extract-plugins

## css兼容性处理
  css兼容性处理：postcss --> postcss-loader postcss-preset-env

## 压缩css 
   + OptimizeCssAssetsWebpackPlugin();

   webpack官方文档介绍时并不是将 「OptimizeCssAssetsWebpackPlugin」 插件配置在「plugins」数组中。

而是配置在 「optimization.minimizer」 数组中。

**原因是**：

配置在「plugins」中，webpack就会在启动时使用这个插件。

而配置在 「optimization.minimizer」 中，就只会在「optimization.minimize」这个特性开启时使用。

所以webpack推荐，像压缩类的插件，应该配置在「optimization.minimizer」数组中。

以便于通过「optimization.minimize」统一控制。（生产环境会默认开启minimize）

然而这样配置会导致JS不会被压缩。

原因是webpack认为，如果配置了minimizer，就表示开发者在自定以压缩插件。

内部的JS压缩器就会被覆盖掉。所以这里还需要手动将它添加回来。

webpack内部使用的JS压缩器是「terser-webpack-plugin」。

```javascript
// 只展示了添加的代码
const TerserWebpackPlugin = require('terser-webpack-plugin')
module.exports = {
  // ...
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin(),
      new OptimizeCssAssetsWebpackPlugin()
    ]
  },
  // ...
}
```


## js压缩
   生产环境下会自动压缩js代码

## 压缩HTML
```
new HtmlWebpackPlugin({
      template: './src/index.html',
      // ------------压缩html代码-------------
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true
      }
    })
```