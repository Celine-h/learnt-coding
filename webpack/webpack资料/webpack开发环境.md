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
   OptimizeCssAssetsWebpackPlugin()

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