# requestAnimationFrame
**概念**  
window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个**回调函数**作为参数，该回调函数会在浏览器下一次重绘之前执行  

**实现动画的方法**  
+ Javascript 中可以通过定时器 setTimeout 来实现
+ css3 可以使用 transition 和 animation 来实现
+ html5 中的 canvas 也可以实现。
+ html5 还提供一个专门用于请求动画的API，那就是 `requestAnimationFrame`，顾名思义就是请求动画帧。


**屏幕刷新频率**：屏幕每秒出现图像的次数。普通笔记本为60Hz

**动画原理**：计算机每16.7ms刷新一次，由于人眼的视觉停留，所以看起来是流畅的移动。

**setTimeout**：通过设定间隔时间来不断改变图像位置，达到动画效果。但是容易出现卡顿、抖动的现象；原因是：1、settimeout任务被放入异步队列，只有当主线程任务执行完后才会执行队列中的任务，因此实际执行时间总是比设定时间要晚；2、settimeout的固定时间间隔不一定与屏幕刷新时间相同，会引起丢帧。

**requestAnimationFrame优势** ：由系统决定回调函数的执行时机。60Hz的刷新频率，那么每次刷新的间隔中会执行一次回调函数，不会引起丢帧，不会卡顿

## 应用——用js实现一个无限循环的动画
核心代码
```bash
(function loop() {
  doSTH();
  window.requestAnimationFrame(loop)
})()

```

面试题：第269天 写一个让一句话随着鼠标移动的小插件
```bash
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div>test</div>
    <script>
        function mousemoveWithText(text, options) {
            options = options || {};
            const $el = text instanceof HTMLElement ? text : createElement();
            const pos = { x: -9999, y: - 9999 };
            // TODO: 移动后才第一次能显示，有点糟糕
            window.onmousemove = handleMove;

            setTextPosition();
            (function loop() {
                setTextPosition();
                // TODO: 如果需要销毁，需要存变量
                requestAnimationFrame(loop);
            })();

            function createElement() {
                const $el = document.createElement('div');
                $el.innerText = text;
                $el.style.position = 'fixed';
                $el.style.pointerEvents = 'none';
                document.body.appendChild($el);
                return $el;
            }

            function handleMove(e) {
                pos.x = e.clientX;
                pos.y = e.clientY;
                // TODO: 超出屏幕应隐藏，不然会造成比如 scroller-x 超出
            }

            function setTextPosition() {
                const { x, y } = pos;
                $el.style.left = x + 10 + 'px';
                $el.style.top = y - 10 + 'px';
            }
        }

        mousemoveWithText('xxxx');
    </script>

</body>

</html>

```
