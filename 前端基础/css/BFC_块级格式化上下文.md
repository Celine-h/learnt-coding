## 第7天 简述你对BFC规范的理解

[什么是BFC？看这一篇就够了](https://blog.csdn.net/sinat_36422236/article/details/88763187)



**什么是BFC？**  
BFC全称”Block Formatting Context”, 中文为“块级格式化上下文”。(BFC元素特性表现原则就是，内部子元素再怎么翻江倒海，翻云覆雨都不会影响外部的元素。)  

**如何触发BFC？**  
+ float的值不为none。  
+ overflow的值为auto,scroll或hidden。  
+ display的值为table-cell, table-caption,  inline-block，**flow-root** 中的任何一个。  
+ position的值不为relative和static。

**触发BFC实现多栏自适应布局**  
[读张鑫旭有感](https://www.zhangxinxu.com/wordpress/2015/02/css-deep-understand-flow-bfc-column-two-auto-layout/)