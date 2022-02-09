# Position

## position:absolute

生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位。

## position:relative

设置为相对定位的元素框会偏移某个距离。元素仍然保持其未定位前的形状，**它原本所占的空间仍保留**。

## position:fixed

生成绝对定位的元素，相对于浏览器窗口进行定位。

## position:sticky

粘性布局，未到设定定位时表现为：relative，到达设定定位后表现为 fixed；吸顶和吸底常用；

position:sticky 的生效是有一定的限制的，总结如下：

1. 须指定 top, right, bottom 或 left 四个阈值其中之一，才可使粘性定位生效。否则其行为与相对定位相同。

- 并且 top 和 bottom 同时设置时，top 生效的优先级高，left 和 right 同时设置时，left 的优先级高。
  设定为 position:sticky 元素的任意父节点的 overflow 属性必须是 visible，否则 position:sticky 不会生效。这里需要解释一下：

2. 如果 position:sticky 元素的任意父节点定位设置为 overflow:hidden，则父容器无法进行滚动，所以 position:sticky 元素也不会有滚动然后固定的情况。

- 如果 position:sticky 元素的任意父节点定位设置为 position:relative | absolute | fixed，则元素相对父元素进行定位，而不会相对 viewprot 定位。

3. 达到设定的阀值。这个还算好理解，也就是设定了 position:sticky 的元素表现为 relative 还是 fixed 是根据元素是否达到设定了的阈值决定的。
