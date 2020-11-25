>说点没用的，都已经成为前端工程师两年了，才开始认真的学些基础的东西，各种大神文章里的‘业界常说’，’众所周知’，与我而言就像一概不知。
# 你学与不学，知识都在那里，只增不减！！！

1. CSS display:flow-root声明  
---
## 1.CSS display:flow-root声明——读张鑫旭总结
+ `display:flow-root`使内联元素（或者原本就是为块级元素)的元素变为块级元素，并且建立新的块级格式化上下文，BFC。  
+ `display:flow-root`也有BFC类似功能，相比`float`浮动，`position`绝对定位，或者`overflow`隐藏，`inline-block`等特性产生的块级格式上下文，`display:flow-root`不会给元素带来额外的副作用，例如`overflow:hidden`虽然可以去除浮动的干扰，但是，有可能会让子元素无法定位在容器外部。  
+ `margin`合并现象也可以用`display：flow-root`来阻止

**自适应两栏布局**  
讲解BFC是也讲过利用bfc和margin来实现自适应两栏布局，同样`display:flow-roo`也可以。
```C
<div class="box flow-root">
    <img src="../images/first.png">
    <p class="flow-root">拼多多暴涨7%，市值突破700亿美元，超越京东。而黄峥个人财富也处于内地第三大富豪</p>
</div>
```
```C
.box img {
    float: left;
    margin-right: 20px;
}
.box p {
    background-color: #f0f3f9;
    padding: 10px;
}
.flow-root {
    display: flow-root;
}
```
