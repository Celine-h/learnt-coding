1.节流和防抖  
2.浏览器对象——window之postmessage
# 1.节流和防抖

## 防抖
**防抖：就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。**
```C
function debounce(func, wait) {
    let timeout;
    return function () {
      let context = this;
      let args = arguments;
      if(timeout)clearTimeout(timeout);
      timeout=setTimeout(()=>{
        func.apply(this,args)
      },wait)
    }
}
```

## 节流
**所谓节流，就是指连续触发事件但是在 n 秒中只执行一次函数。**
```C
function throttle(func, wait) {
    let previous = 0;
    return function() {
        let now = Date.now();
        let context = this;
        let args = arguments;
        if (now - previous > wait) {
            func.apply(context, args);
            previous = now;
        }
    }
  }
```
---
# 2.浏览器对象——window之postmessage（）

`window.postMessage()`方法允许来自不同源的脚本采用异步方式进行有限的通信，可以实现跨文本档、多窗口、跨域消息传递
**实现**
+ 页面和其打开的新窗口的数据传递
+ 页面与嵌套的 iframe 消息传递
+ 多窗口之间消息传递

<table><tr><td bgcolor=#eee>
targetWindow .postMessage（message，targetOrigin，[ transfer ]）;
</td></tr></table>

**targetWindow**  
对将接收消息的窗口的引用。获得此类引用的方法包括：
```
1. `Window.open` （生成一个新窗口然后引用它），  
2. `Window.opener` （引用产生这个的窗口），  
3. `HTMLIFrameElement.contentWindow`（<iframe>从其父窗口引用嵌入式），  
4. `Window.parent`（从嵌入式内部引用父窗口iframe   
5. `Window.frames` +索引值（命名或数字）。    
ps:3-5参考：https://www.cnblogs.com/EricZLin/p/10534537.html
```
**message**

要发送的数据。它将会被结构化克隆算法序列化，所以无需自己序列化（部分低版本浏览器只支持字符串，所以发送的数据最好用JSON.stringify() 序列化）。

**targetOrigin**

通过 targetOrigin 属性来指定哪些窗口能接收到消息事件，其值可以是字符串*（表示无限制）或者一个 URI（如果要指定和当前窗口同源的话可设置为"/"）。在发送消息的时候，如果目标窗口的协议、主机地址或端口号这三者的任意一项不匹配 targetOrigin 提供的值，那么消息就不会发送

1. 不同 origin 的两个窗口之间建立双向数据通信  
```C
//localhost:10002/index页面
// 接收消息
window.addEventListener('message', (e) => {
     console.log(e.data)
})
// 发送消息
const targetWindow = window.open('http://localhost:10001/user');
setTimeout(()=>{
     targetWindow.postMessage('来自10002的消息', 'http://localhost:10001')
),3000}
```
```C
//localhost:10001/user页面
window.addEventListener('message', (e) => {
     console.log(e.data)
     if (event.origin !== "http://localhost:10002")
     return;
     e.source.postMessage('来自10001的消息', e.origin)
})
```
原文链接：https://blog.csdn.net/huangpb123/java/article/details/83692019```

## js包装对象的理解
