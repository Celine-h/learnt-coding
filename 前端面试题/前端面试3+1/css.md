# css前端面试3+1
>这是一个答案总结，选自回答里我觉得比较好的答案，再动手验证，以驱动自己学习，方便自己复习.答案来自于回答者 [github](https://github.com/haizlin/fe-interview/issues/2)
## 第1天 圣杯布局和双飞翼布局的理解和区别，并用代码实现


+ 作用：圣杯布局和双飞翼布局解决的问题是一样的，就是两边顶宽，中间自适应的三栏布局，中间栏要在放在文档流前面以优先渲染。

+ 区别：圣杯布局，为了中间div内容不被遮挡，将中间div设置了左右padding-left和padding-right后，将左右两个div用相对布局position: relative并分别配合right和left属性，以便左右两栏div移动后不遮挡中间div。双飞翼布局，为了中间div内容不被遮挡，直接在中间div内部创建子div用于放置内容，在该子div里用margin-left和margin-right为左右两栏div留出位置。

***圣杯布局***
```C
<body>
<div id="hd">header</div>
<div id="bd">
  <div id="middle">middle</div>
  <div id="left">left</div>
  <div id="right">right</div>
</div>
<div id="footer">footer</div>
</body>

<style>
#hd{
    height:50px;
    background: #666;
    text-align: center;
}
#bd{
    /*左右栏通过添加负的margin放到正确的位置了，此段代码是为了摆正中间栏的位置*/
    padding:0 200px 0 180px;
    height:100px;
}
#middle{
    float:left;
    width:100%;/*左栏上去到第一行*/
    height:100px;
    background:blue;
}
#left{
    float:left;
    width:180px;
    height:100px;
    margin-left:-100%;
    /*元素左边框相对于父元素右边框的距离（忽略padding和border），也就是相对向左移动一个父元素的距离*/
    background:#0c9;
    /*中间栏的位置摆正之后，左栏的位置也相应右移，通过相对定位的left恢复到正确位置*/
    position:relative;//为middle腾出位置
    left:-180px;
}
#right{
    float:left;
    width:200px;
    height:100px;
    margin-left:-200px;
    background:#0c9;
    /*中间栏的位置摆正之后，右栏的位置也相应左移，通过相对定位的right恢复到正确位置*/
    position:relative;
    right:-200px;
}
#footer{
    height:50px;
    background: #666;
    text-align: center;
}
</style>
```
***双飞翼布局***

```C
<body>
<div id="hd">header</div>
  <div id="middle">
    <div id="inside">middle</div>
  </div>
  <div id="left">left</div>
  <div id="right">right</div>
  <div id="footer">footer</div>
</body>

<style>
#hd{
    height:50px;
    background: #666;
    text-align: center;
}
#middle{
    float:left;
    width:100%;/*左栏上去到第一行*/     
    height:100px;
    background:blue;
}
#left{
    float:left;
    width:180px;
    height:100px;
    margin-left:-100%;
    background:#0c9;
}
#right{
    float:left;
    width:200px;
    height:100px;
    margin-left:-200px;
    background:#0c9;
}

/*给内部div添加margin，把内容放到中间栏，其实整个背景还是100%*/
#inside{
    margin:0 200px 0 180px;
    height:100px;
}
#footer{  
   clear:both; /*记得清楚浮动*/  
   height:50px;     
   background: #666;    
   text-align: center;
}
</style>
```


---

## 第2天 CSS3有哪些新增的特性？



边框(borders):  
border-radius 圆角  
box-shadow 盒阴影  
border-image 边框图像

背景:  
background-size 背景图片的尺寸  
background_origin 背景图片的定位区域  
background-clip 背景图片的绘制区域  

渐变：  
linear-gradient 线性渐变  
radial-gradient 径向渐变  

文本效果;  
word-break  
word-wrap  
text-overflow  
text-shadow  
text-wrap  
text-outline  
text-justify  

转换：  

2D转换属性  
transform  
transform-origin  

2D转换方法  

translate(x,y)  
translateX(n)  
translateY(n)  
rotate(angle)  
scale(n)  
scaleX(n)   
scaleY(n)  
rotate(angle)  
matrix(n,n,n,n,n,n)  

3D转换：

3D转换属性：

transform  
transform-origin  
transform-style  

3D转换方法  
translate3d(x,y,z)  
translateX(x)  
translateY(y)  
translateZ(z)  
scale3d(x,y,z)  
scaleX(x)  
scaleY(y)  
scaleZ(z)  
rotate3d(x,y,z,angle)  
rotateX(x)  
rotateY(y)  
rotateZ(z)  
perspective(n)  

过渡  
transition

动画  
@Keyframes规则  
animation

弹性盒子(flexbox)

多媒体查询@media

---

## 第3天 在页面上隐藏元素的方法有哪些？并简述出第一种方法的应用场景和优劣势。

**占位**  
visibility:hidden;  
opacity:0;  
transform:sacle(0)  
margin-left:-100%

**不占位**  
display:none;  
width:0;height:0;overflow:hidden;

**仅对块内文本元素:**  
text-indent: -9999px;  
font-size: 0;

---

## 第4天 CSS选择器有哪些？哪些属性可以继承？

**选择器**  
+ 通配符  
+ class  
+ id  
+ 标签选择器  
+ 后代选择器  （>）  
+ 兄弟选择器 :（+）相邻兄弟选择器 （~）兄弟选择器
+ 属性选择器： input[type='text']  
+ 伪类选择器   :hover :active :first-child
+ 伪元素选择器  ::after

**可以继承的属性**
+ font-size
+ font-family
+ font-weight  
+ font-style
+ color

---

## 第5天 CSS3新增伪类有哪些并简要描述

![新增伪类](../images/newFakeClass.png)

---



---


