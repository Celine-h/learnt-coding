# 面试：Function.prototype.a 请给出下列函数的执行输出

```
Function.prototype.a = () => {
  console.log(1);
}
Object.prototype.b = () => {
  console.log(2);
}
function A() {}
const a = new A();
a.a();
a.b();
A.a()
```

构造函数是Function的实例：
所有对象是Object的实例：

https://blog.csdn.net/MFWSCQ/article/details/106502796