# HTML5 Page Visibility API 教程——[阮一峰的教程](http://www.ruanyifeng.com/blog/2018/10/page_visibility_api.html)
+ 为什么诞生
+ document.visibilityState
+ visibilitychange 事件

## 为什么诞生
  页面离开时通常监听 :
  ```
+ pagehide
+ beforeunload
+ unload
```
但是，这些事件在手机上可能不会触发，页面就直接关闭了。因为手机系统可以将一个进程直接转入后台，下面都会导致手机将浏览器进程切换到后台，然后为了节省资源，可能就会杀死浏览器进程。
```
用户点击了一条系统通知，切换到另一个 App。
用户进入任务切换窗口，切换到另一个 App。
用户点击了 Home 按钮，切换回主屏幕。
操作系统自动切换到另一个 App（比如，收到一个电话）。
```
这个新的 API 的**意义**在于，通过监听网页的可见性，可以预判网页的卸载，还可以用来节省资源，减缓电能的消耗。比如，一旦用户不看网页，下面这些网页行为都是可以暂停的。
```
对服务器的轮询
网页动画
正在播放的音频或视频
```
## document.visibilityState
这个 API 主要在document对象上，新增了一个`document.visibilityState`属性。该属性返回一个字符串，表示页面当前的可见性状态，共有三个可能的值。
```
hidden：页面彻底不可见。
visible：页面至少一部分可见。
prerender：页面即将或正在渲染，处于不可见状态。
```
其中，hidden状态和visible状态是所有浏览器都必须支持的。**prerender** 状态只在支持"预渲染"的浏览器上才会出现，比如 Chrome 浏览器就有预渲染功能，可以在用户不可见的状态下，预先把页面渲染出来，等到用户要浏览的时候，直接展示渲染好的网页。

只要页面可见，哪怕只露出一个角，`document.visibilityState`属性就返回visible。只有以下四种情况，才会返回hidden。
```
浏览器最小化。
浏览器没有最小化，但是当前页面切换成了背景页。
浏览器将要卸载（unload）页面。
操作系统触发锁屏屏幕。
```
可以看到，上面四种场景涵盖了页面可能被卸载的所有情况。也就是说，页面卸载之前，document.visibilityState属性一定会变成hidden。事实上，这也是设计这个 API 的主要目的。

## visibilitychange 事件
只要`document.visibilityState`属性发生变化，就会触发`visibilitychange`事件。因此，可以通过监听这个事件（通过`document.addEventListener()`方法或`document.onvisibilitychange`属性），跟踪页面可见性的变化。

```c
document.addEventListener('visibilitychange', function () {
  // 用户离开了当前页面
  if (document.visibilityState === 'hidden') {
    document.title = '页面不可见';
  }

  // 用户打开或回到页面
  if (document.visibilityState === 'visible') {
    document.title = '页面可见';
  }
});
```
上面代码是 Page Visibility API 的最基本用法，可以监听可见性变化。

下面是另一个例子，一旦页面不可见，就暂停视频播放。

```C
var vidElem = document.getElementById('video-demo');
document.addEventListener('visibilitychange', startStopVideo);

function startStopVideo() {
  if (document.visibilityState === 'hidden') {
    vidElem.pause();
  } else if (document.visibilityState === 'visible') {
    vidElem.play();
  }
}
```
