# 如何实现一个 new
>其实就是问当new一个构造函数时发生了什么。

+ 首先创建一个空的对象，空对象的__proto__属性指向构造函数的原型对象
+ 把上面创建的空对象赋值构造函数内部的this，用构造函数内部的方法修改空对象
+ 如果构造函数返回一个非基本类型的值，则返回这个值，否则上面创建的对象
```
function _new(fn, ...arg) {
    var obj = Object.create(fn.prototype);
    const result = fn.apply(obj, ...arg);
    return Object.prototype.toString.call(result) == '[object Object]' ? result : obj;
}
```