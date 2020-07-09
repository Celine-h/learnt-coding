# 第57天 写一个方法，使得sum(x)(y)和sum(x,y)返回的结果相同。
+ 写一个方法，使得sum(x)(y)和sum(x,y)返回的结果相同
```
var sum= function(x){
    if(arguments[1]){
        return x + arguments[1];
    }else{
        return function (y){
            return x + y
        }
    }
}
console.log(sum(1)(2))//3
console.log(sum(1,2))//3
```
+ 群里的提议 增加点难度 使得sum(x)(y)(z)(...)(a)和sum(x,y,z,... a)返回的结果相同
```
function sum(x){
    if(arguments[1]){
        var arr = Array.prototype.slice.apply(arguments);
            x = arr.reduce((a, c)=> a+ c)
        return x;
    }else{
        function add(b) {
            x = x + b;
            return add;
        }
        add.toString = function() {
            return x;
        }
        return add;
    }
}
var res1 = sum(1)(2)(3)(4)(5)(6);
var res2 = sum(1,2,3,4,5,6);
console.log(res1)//21
console.log(res2)//21
```

**toString重写原因**  
关键性，后面没有传入参数，等于返回的temp函数不被执行而是打印,如图1，对象的toString是修改对象转换字符串的方法  

图1

![toString](../../images/toString.png)

代码toString的重写只是为了函数不执行时能够返回最后运算的结果值，所以这个地方是可以任意修改的，你让它返回什么它就返回什么，比如改写：

```
temp.toString = function () {
return “total : ” + m;
}
```

参考：https://www.jianshu.com/p/d8f2cc2c9458
---
## 第164天 举例说明js如何拖拽排序？
**思路：**  
拆分功能，定义2个组件:
box容器拖拽区组件，就是根据数组遍历生成列表项，做drag事件代理
单个列表成员渲染，绑定一些必要参数在dom上
每个item元素,并加上h5 draggable 属性，并记下所在数组中的序号位置, 记下在BOX的dragStart事件中元素序号A，dragEnd事件中的元素序号B
在数组里调整2个序号对应的对象的位置，更新渲染即可
```bash
const $box = document.querySelector('.box');
let data = ['A', 'B', 'C', 'D'];

let fragment = document.createDocumentFragment();
let $li = document.createElement('li');
const render = () => {
    while ($box.children.length > 0) {
        $box.removeChild($box.firstChild)
    }
    data.forEach((e, i) => {
        let $cloneLi = $li.cloneNode();
        $cloneLi.innerHTML = e;
        $cloneLi.setAttribute('draggable', true);
        fragment.appendChild($cloneLi);
        $box.appendChild(fragment);
    });
}

const changeData = (fromValue, toValue) => {
    // fromIndex 原数据索引
    let fromIndex = data.indexOf(fromValue);
    // 删除fromIndex
    data.splice(fromIndex, 1);
    // toIndex(注意在删除之后取)
    let toIndex = data.indexOf(toValue);
    // 在toIndex后插入源数据
    data.splice(toIndex + 1, 0, fromValue);
}

render();

$box.setAttribute('draggable', false);

$box.addEventListener('dragstart', e => {
    let $currentLi = e.target;
    e.dataTransfer.setData('content', $currentLi.innerHTML);
})

$box.addEventListener('dragenter', e => { e.preventDefault(); })

$box.addEventListener('dragover', e => { e.preventDefault(); })

$box.addEventListener('drop', e => {
    let fromValue = e.dataTransfer.getData('content');
    let toValue = e.target.innerHTML;
    changeData(fromValue, toValue)
    render();
})

```

---
## 第250天 写一个方法判断大括号{}是否闭合
  ```bash
    function isClosed(str) {
        let arr = [...str];
        let stack = [];

        for (let i = 0; i < arr.length; ++i) {
            if (arr[i] == "{") {
                stack.push("{");
            } else if (arr[i] == "}") {
                if (stack.length === 0) {
                    return false;
                }
                console.log(arr[i], stack)
                stack.pop();
            }
        }

        return stack.length === 0;
      }
```
----
