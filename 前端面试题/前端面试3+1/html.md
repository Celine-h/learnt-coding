# HTML前端面试3+1
>这是一个答案总结，选自回答里我觉得比较好的答案，再动手验证，以驱动自己学习，方便自己复习.答案来自于回答者 [github](https://github.com/haizlin/fe-interview/issues/2)

## 第9天 浏览器内多个标签页之间的通信方式有哪些？
>WebSocket （可跨域）  [阮一峰websocket](http://www.ruanyifeng.com/blog/2017/05/websocket.html)  
postMessage（可跨域）[postMessage](https://blog.csdn.net/huangpb123/article/details/83692019)   
localStorage  
Cookies  
下面的我都不知道  
Worker之SharedWorker  
Server-Sent Events  
BroadcastChannel  

## 第43天 如何让元素固定在页面底部？有哪些比较好的实践？

**sticky footer 布局**  
+ 当头部区块和内容区块内容较少时，页脚能固定在屏幕的底部，而非随着文档流排布。当页面内容较多时，页脚能随着文档流自动撑开，显示在页面的最底部，这就是Sticky footer布局。

**实现方式**  

负margin布局方式  

html代码：
```C
<div class="wrapper clearfix">
    <div class="content">
      // 这里是页面内容
    </div>  
</div>
<div class="footer">
    // 这里是footer的内容
</div>
```
css代码：

```C
.wrapper {
    min-height: 100%;
}

.wrapper .content{
    padding-bottom: 50px; /* footer区块的高度 */
}

.footer {
    position: relative;
    margin-top: -50px;  /* 使footer区块正好处于content的padding-bottom位置 */
    height: 50px;
    clear: both;
}

.clearfix::after {
    display: block;
    content: ".";
    height: 0;
    clear: both;
    visibility: hidden;
}
```

注意:content元素的padding-bottom、footer元素的高度以及footer元素的margin-top值必须要保持一致。

这种负margin的布局方式，是兼容性最佳的布局方案，各大浏览器均可完美兼容，适合各种场景，但使用这种方式的前提是必须要知道footer元素的高度，且结构相对较复杂。


**flex布局方式**  

html代码：

```C
<div class="wrapper">
    <div class="content">这里是主要内容</div>
    <div class="footer">这是页脚区块</div>  
</div>
```
css代码：
```C
.wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
.content {
    flex: 1;
}
.footer {
    flex: 0;
}
```

这种布局方式结构简单，代码量少，也是较为推荐的布局方式。

## 第49天 说说你对target="_blank"的理解？有啥安全性问题？如何防范

**问题**  
在调用window下的open方法创建一个新窗口的同时，可以获得一个创建窗口的opener句柄，通过target="_blank"点开的窗口活着标签页，子窗口也能捕获opener句柄，通过这个句柄，子窗口可以访问到父窗口的一些属性，虽然很有限，但是却可以修改父窗口的页面地址，让父窗口显示指定的页面。

**防范**  
如果需要限制window.opener的访问行为，我们只需要在原始页面每个使用了target="_blank"的链接中加上一个rel="noopener"属性。  
但是，火狐并不支持这个属性值，火狐浏览器里需要写成rel="noreferrer"，所以我们可以将两个属性值合并写成rel="noopener noreferrer"来完整覆盖。

`<a href="https://www.baidu.com" target="_blank" rel="noopener noreferrer nofollow">内容</a>`

nofollow 是HTML页面中a标签的属性值。这个标签的意义是告诉搜索引擎"不要追踪此网页上的链接或不要追踪此特定链接"


---

## 第61天 有用过HTML5的webSQL和IndexedDB吗？说说你对它们的理解

webSQL 和 IndexedDB 都是一种客户端的数据存储方案，webSQL已经废弃。IndexedDB 的特点是：存储空间大，使用异步存储数据模式，存放键值对型数据，支持数据库事务等，同时还可以存储多种类型数据，包括 js 对象类型。可以用在前端缓存大量数据。
 [阮一峰indexedDB教程](http://www.ruanyifeng.com/blog/2018/07/indexeddb.html)

 ---
 ## 第63天 什么是html的字符实体？版权符号代码怎么写？


 + 在HTML中，某些字符是预留的，这些预留字符必须被替换为字符实体.。 如： `&lt; &gt;`  

+ 版权符号：` &copy;`

---

## 第65天 html直接输入多个空格为什么只能显示一个空格？

该行为由 CSS white-space 控制，其默认值 normal 的表现即为多个空格压缩成一个。

设置为pre-wrap，pre等属性值，是可以解决这个问题的

---

## 第66天 HTML5如果不写<! DOCTYPE html> ，页面还会正常工作么？

页面添加了<! DOCTYPE html>说明该页面采用了W3C标准，如果不加则页面会根据浏览器自身的解析标准来解析，这可能会导致页面在不同的浏览器呈现出不同的效果

---

## 第67天 请写出唤醒拔打电话、发送邮件、发送短信的例子

```
<a href="tel:139xxxxxxxx">一键拨打号码</a>
<a href="mailto:yuojian@163.com">一键发送邮件</a>
<a href="sms:139xxxxxxx">一键发送短信</a>
```

 input 也有几个类型来影响键盘弹出的样式

```
<input type="text" placeholder="请输入文字"/>
<input type="number" pattern="[0-9]*" placeholder="请输入qq号"/>
//type="number"限定输入数字，pattern="[0-9]*"限制数字范围
<input type="tel" placeholder="请输入电话"/>
<input type="date" placeholder="请输入日期"/>
<input type="datetime-local" placeholder="请输入时间"/>
```

---

## 第70天 html的a标签属性rel='nofollow'有什么作用？

>  [第192天 html的a标签属性rel="noopener"有什么作用？](https://github.com/haizlin/fe-interview/issues/1436)  

>[第49天 说说你对target="_blank"的理解？有啥安全性问题？如何防范？](https://github.com/haizlin/fe-interview/issues/185)

nofollow有两种用法：  
1. 用于meta元标签：  
`<meta name="robots" content="nofollow" />`  
告诉爬虫该页面上所有链接都无需追踪。  

2. 用于a标签：  
`<a href="login.aspx" rel="nofollow">登录</a>`  
告诉爬虫该页面无需追踪

---

## 第73天 favicon.ico有什么作用？怎么在页面中引用？常用尺寸有哪些？可以修改后缀名吗？

**作用**：favicon 也叫收藏夹图标，我们经常从网页标签中看到这个图标，但它的作用往往不仅如此，favicon的存在能够让我们更加容易区分浏览器收藏夹中的内容。并且favicon 在一定程度上减轻服务器的流量带宽占用，一般为了提高网站的可用性，我们都会为自己的网站创建一个自定义的404错误文件，在这种情况下，如果网站没有相应的favicon.ico文件，每当有用户收藏网站/网页时， Web服务器都会调用这个自定义的404文件，并在网站的错误日志中记录。这显然是应该予以避免的。

引用方式：

尺寸：1616 3232

[引用]：https://segmentfault.com/a/1190000007764284
