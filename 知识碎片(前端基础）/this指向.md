## 普通函数this指向
**详细见js执行上下文**  
（1）this的指向，是在函数被调用的时候确定的。也就是执行上下文被创建时确定的。因此我们可以很容易就能理解到，一个函数中的this指向，可以是非常灵活的。比如下面的例子中，同一个函数由于调用方式的不同，this指向了不一样的对象，在函数执行过程中，this一旦被确定，就不可更改了。

（2）在一个函数上下文中，this由调用者提供，由调用函数的方式来决定。如果调用者函数，被某一个对象所拥有，那么该函数在调用时，内部的this指向该对象。如果函数独立调用，那么该函数内部的this，则指向undefined。但是在非严格模式中，当this指向undefined时，它会被自动指向全局对象。

（3）可以使用call，apply显式指定this。

题1：
```bash
var o = {
    a: 10,
    b: {
        a: 12,
        fn: function(){
            console.log(this.a); // 输出结果是 12
            console.log(this); // 输出结果是 b 对象
        }
    }
}
//调用
o.b.fn(); 
```
题2：
```bash
var o = {
    a: 10,
    b:  {
        fn: function(){
            console.log(this.a); // undefined
            console.log(this);   // b对象
        }
    }
}
//调用
o.b.fn(); 
```
题3：
```bash
var o = {
    a: 10,
    b: {
        a: 12,
        fn: function(){
            console.log(this.a); //undefined 若在对象o外定义a，则输出的就是其在外定义的值(全局变量)
            console.log(this);   // window
        }
    }
}
var j = o.b.fn; //只是将b对象下的方法赋值给j，并没有调用
j(); //调用，此时绑定的对象是window,并非b对象直接调用
```

**面试题1**
```bash
let len = 10;
function fn() {
	console.info(this.len)
}
fn(); // A
let Person = {
	len: 5,
	say: function() {
		fn(); // B
		arguments[0](); // C
	}
}
Person.say(fn);
```
三处的输出结果均为 undefined

### A 处执行结果
+ fn 的 this 指向为 window
+ let 声明的变量不挂载在 window 对象上
+ 输出结果为：window.len = undefined;

### B处的执行结果
+ say 函数的 this 指向为 Person
+ fn 的 this 指向依然为 window
+ 输出结果依然为：window.len = undefined

### C 处的执行结果
+ arguments[0]() 相当于 arguments.fn()
+ fn 的 this 指向为 arguments
+ 输出结果为：arguments.len = undefined

**面试题2**
```bash
var length = 10;
function fn() {
	console.info(this.length)
}
fn();  // A
let Person = {
	len: 5,
	say: function() {
		fn();  // B
		arguments[0]();  // C
	}
}
Person.say(fn);
```
分别输出 10, 10, 1

+ A , B 处直接输出 挂载到 window 对象下的 10
+ C 处输出 arguments.length = 1

## 箭头函数的this指向
**箭头函数的`this`，总是指向定义时所在的对象，而不是运行时所在的对象。**

```bash
function foo(){
  setTimeout(() => {
    console.log("id:", this.id)
  }, 100);
}

foo.call({id:42});
```
请问，上面代码的{id: 42}，到底是箭头函数定义时所在的对象，还是运行时所在的对象？

这个例子中，箭头函数位于foo函数内部。只有foo函数运行后，它才会按照定义生成，所以**foo运行时所在的对象，恰好是箭头函数定义时所在的对象**。