# service worker
https://blog.csdn.net/huangpb123/article/details/89498418

[Service Workers简介(一):](https://www.jianshu.com/p/1bc5bf8be43d)

[Service Workers简介(二):](https://www.jianshu.com/p/63014733d6ab)

## service worker基本知识
**作用：**  
1. 拦截请求
2. 浏览器缓存

**限制**：
1. 不能操作DOM
2. https

#service worker生命周期
parsed==>installing=>installed==>activating==>activated==>redundant
## service worker注册
在`navigator`中有一个serviceWorker对象
```C
if('serviceWorker' in navigator){
  //没有必要一进入页面就注册，可以等页面载入完毕后在注册
  window.addEventlistener('load',()=>{
    navigator.serviceWorker.register('/sw.js').then((registration)=>{//返回一个promise对象
      console.log('registration scope:'+registration.scope)
    }).catch((e)=>{
      console.log('registration failed:'+err)
    })
  })
}
```
在这个例子中，文件位置在域名的根位置地下，这个说明`service worker`的作用域是整个源。也就是`service worker`会接收到这个域名下的所有`fetch`事件。比如`/example/sw.js`则只能接收到`/example/`作用域下的fetch事件(/`xample/pageone/`,`/example/pagetwo/`)，可用scope来控制
页面首次进入就进行缓存sw资源是有点问题的，因为sw内预缓存资源是需要下载的，sw线程一旦在首次打开时下载资源，将会占用主线程的带宽，以及加剧对cpu和内存的使用
## service worker缓存
**installing周期进行缓存**  
```C
//sw.js
CATCH_NAME='my-site-catch-v1';
URL_TO_CATCH=[
'/',
'/scripts/main.js',
'/srripts/main.css'
]
self.addEventlistener('install',function(event){
  event.waiUntil(
    caches.open(CATCH_NAME).then(function(cache){
      console.log('cache opened');
      cache.addAll(URL_TO_CATCH)
    })
  )
})
```
event.waiUntil()事件防止未缓存完就已经安装成功了，（从installing==》installed）,上面静态缓存，如果想动态缓存呢？
```C
self.addEventlistener('isntall',function(event){
  event.responseWith(
    caches.match(event.request).then((res)=>{
      if(res){
        return res
      }else{
        return fetch(event.request).then((res)=>{
          // check if we received a valid response
          //确认是basic的原因是检查响应是从我们的源发起的，也不是缓存的第三方发起的
          if(！res||res.status!==200||res.type!=='basic'){
            return res
          }
          responseToCache= res.clone();
          caches.open(CACHE_NAME).then((cache)=>{
            cache.put(event.request,responseToCache)
          }) //因为response是一个流，而我们需要缓存存一份，一部分交给浏览器展示，所以要克隆
          return res
        })
      }
    })
  )
})
```


**在activating（激活中）周期进行清除缓存**  
```C
self.addEventlistener('activate',function(event){
  event.waiUntil(
    caches.keys().then((cacheNames)=>{
      return Promise.all(//需要等所有需要清楚缓存的清除完成后，才进入激活状态
        cacheNames.map((cacheName)=>{
          if(cacheWitheList.indexof(cacheName)===-1){
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})
```
