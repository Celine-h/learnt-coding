# HTML前端面试3+1
>这是一个答案总结，选自回答里我觉得比较好的答案，再动手验证，以驱动自己学习，方便自己复习.答案来自于回答者 [github](https://github.com/haizlin/fe-interview/issues/2)
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
