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
