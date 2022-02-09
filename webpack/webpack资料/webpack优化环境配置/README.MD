# webpack性能优化
* 开发环境性能优化
* 生产环境性能优化
## 开发环境性能优化
* 优化打包构建速度
  * HMR
* 优化代码调试
  * source-map

## 生产环境性能优化
* 优化打包构建速度
  * oneOf
  * babel缓存 -- [关于 Babel 你必须知道的
](https://mp.weixin.qq.com/s/1OyBkl5NnFO1q86L7GjQwg)
  * 多进程打包
  * externals
  * dll-动态链接库
* 优化代码运行的性能
  * 缓存(hash-chunkhash-contenthash) -- [webpack二刷之五、生产环境优化（6.输出文件名Hash substitutions）
](https://blog.csdn.net/u012961419/article/details/107094124)
  * tree shaking -- [https://blog.csdn.net/u012961419/article/details/107094056](https://blog.csdn.net/u012961419/article/details/107094056)
  * code split--[webpack二刷之五、生产环境优化（4.Code Splitting 代码分包 / 代码分割）](https://blog.csdn.net/u012961419/article/details/107094092)
  * 懒加载/预加载
  * pwa
  
