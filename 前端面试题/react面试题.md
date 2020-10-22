+ react中key的作用
+ shouldComponentUpdate 是做什么的，（react 性能优化是哪个周期函数？）
+ setState是同步的还是异步的？
+ 为什么有时连续多次 setState只有一次生效？
+ React的合成事件是什么？
+ 原生事件和 React事件的区别？
+ React和原生事件的执行顺序是什么？可以混用吗？
+ 为何 React事件要自己绑定 this？
+ 为什么代码中一定要引入 React？
+ 为什么 React组件首字母必须大写？
+ (组件的)状态(state)和属性(props)之间有何不同




#  keys 的作用是什么？
Keys 是 React 用于追踪哪些列表中元素被修改、被添加或者被移除的辅助标识。
在开发过程中，我们需要保证某个元素的 key 在其同级元素中具有唯一性。**在 React Diff 算法中 React 会借助元素的 Key 值来判断该元素是新近创建的还是被移动而来的元素，从而减少不必要的元素重渲染。**

尽量不要使用元素在列表中的索引值作为key，因为列表中的元素顺序一旦发生改变，就可能导致大量的key失效，进而引起大量的修改操作，最好用item项的id作为key值。


# shouldComponentUpdate 是做什么的，（react 性能优化是哪个周期函数？）
shouldComponentUpdate 这个方法用来判断是否需要调用 render 方法重新描绘 dom。因为 dom 的描绘非常消耗性能，如果我们能在 shouldComponentUpdate 方法中能够写出更优化的 dom diff 算法，可以极大的提高性能。

作者：毕安
链接：https://www.jianshu.com/p/1630d6c1dd71
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。


# setState是同步的还是异步的？
+ 生命周期和合成事件中
在 React的生命周期和合成事件中， React仍然处于他的更新机制中，这时无论调用多少次 setState，都会不会立即执行更新，而是将要更新的·存入 _pendingStateQueue，将要更新的组件存入 dirtyComponent。

当上一次更新机制执行完毕，以生命周期为例，所有组件，即最顶层组件 didmount后会将批处理标志设置为 false。这时将取出 dirtyComponent中的组件以及 _pendingStateQueue中的 state进行更新。这样就可以确保组件不会被重新渲染多次。
```bash
componentDidMount(){
    this.setState({
        index:this.state.index+1
    });
    console.log(this.state.index,'state')
}
```

所以，如上面的代码，当我们在执行 setState后立即去获取 state，这时是获取不到更新后的 state的，因为处于 React的批处理机制中， state被暂存起来，待批处理机制完成之后，统一进行更新。

所以。setState本身并不是异步的，而是 React的批处理机制给人一种异步的假象。

+ 异步代码和原生事件中
```bash
componentDidMount(){
    setTimeout(()=>{
        console.log('调用state')
        this.setState({
        index:this.state.index+1
    });
    console.log(this.state.index,'state')
    })
}
```
如上面的代码，当我们在异步代码中调用 setState时，根据 JavaScript的异步机制，会将异步代码先暂存，等所有同步代码执行完毕后在执行，这时 React的批处理机制已经走完，处理标志设被设置为 false，这时再调用 setState即可立即执行更新，拿到更新后的结果。

在原生事件中调用 setState并不会出发 React的批处理机制，所以立即能拿到最新结果。

最佳实践
setState的第二个参数接收一个函数，该函数会在 React的批处理机制完成之后调用，所以你想在调用 setState后立即获取更新后的值，请在该回调函数中获取。

# 为什么有时连续多次 setState只有一次生效？
例如下面的代码，两次打印出的结果是相同的：
```bash
componentDidMount(){
    this.setState({index:this.state.index+1},()=>{
        console.log(this.state.index,'state')
    })；
    this.setState({index:this.state.index+1},()=>{
        console.log(this.state.index,'state')
    })
}
```
原因就是 React会批处理机制中存储的多个 setState进行合并，来看下 React源码中的 _assign函数，类似于 Object的 assign：
```
_assign(nextState, typeof partial === 'function' ? partial.call(inst, nextState, props, context) : partial);
```
如果传入的是对象，很明显会被合并成一次，所以上面的代码两次打印的结果是相同的：
```bash
Object.assign({
    nextState,
    {index:state.index+1}
    {index:state.index+1}
})
```
注意， assign函数中对函数做了特殊处理，处理第一个参数传入的是函数，函数的参数 preState是前一次合并后的结果，所以计算结果是准确的：
```bash
componentDidMount(){
    this.setState((state,props)=>(
        {index:this.state.index+1}
    ),()=>{
        console.log(this.state.index,'state')
    })；
    this.setState({index:this.state.index+1},()=>{
        console.log(this.state.index,'state')
    })
}
```

+ 最佳实践

React会对多次连续的 setState进行合并，如果你想立即使用上次 setState后的结果进行下一次 setState，可以让 setState 接收一个函数而不是一个对象。这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数


# react合成事件

如果DOM上绑定了过多的事件处理函数，整个页面响应以及内存占用可能都会受到影响。React为了避免这类DOM事件滥用，同时屏蔽底层不同浏览器之间的事件系统差异，实现了一个中间层——SyntheticEvent。

1. 当用户在为onClick添加函数时，React并没有将Click时间绑定在DOM上面。  
2. 而是在document处监听所有支持的事件，当事件发生并冒泡至document处时，React将事件内容封装交给中间层SyntheticEvent（负责所有事件合成）
3. 所以当事件触发的时候，对使用统一的分发函数dispatchEvent将指定函数执行。

# 合成事件和原生事件的执行顺序是什么？可以混用吗？

1. React的所有事件都通过 document进行统一分发。当真实 Dom触发事件后冒泡到 document后才会对 React事件进行处理。

2. 所以原生的事件会先执行，然后执行 React合成事件，最后执行真正在 document上挂载的事件

3. React事件和原生事件最好不要混用。原生事件中如果执行了 stopPropagation方法，则会导致其他 React事件失效。因为所有元素的事件将无法冒泡到 document上，导致所有的 React事件都将无法被触发。。

# 为何 React事件要自己绑定 this？
类的方法内部如果含有this，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错。
```bash
class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }

  print(text) {
    console.log(text);
  }
}

const logger = new Logger();
const { printName } = logger;
printName(); // TypeError: Cannot read property 'print' of undefined
```
上面代码中，printName方法中的this，默认指向Logger类的实例。但是，如果将这个方法提取出来单独使用，this会指向该方法运行时所在的环境（由于 class 内部是严格模式，所以 this 实际指向的是undefined），从而导致找不到print方法而报错。

**一个比较简单的解决方法是，在构造方法中绑定this**，这样就不会找不到print方法了。
```bash
class Logger {
  constructor() {
    this.printName = this.printName.bind(this);
  }

  // ...
}
```
**另一种解决方法是使用箭头函数。**  
箭头函数内部的this总是指向定义时所在的对象。上面代码中，箭头函数位于构造函数内部，它的定义生效的时候，是在构造函数执行的时候。这时，箭头函数所在的运行环境，肯定是实例对象，所以this会总是指向实例对象。

# 为什么代码中一定要引入React？
JSX只是为 React.createElement(component,props,...children)方法提供的语法糖。

所有的 JSX代码最后都会转换成 React.createElement(...)， Babel帮助我们完成了这个转换的过程。

所以使用了 JSX的代码都必须引入 React。

# 为什么React组件首字母必须大写？
babel在编译时会判断 JSX中组件的首字母，当首字母为小写时，其被认定为原生 DOM标签， createElement的第一个变量被编译为字符串；当首字母为大写时，其被认定为自定义组件， createElement的第一个变量被编译为对象；

# redux的三大原则
  + 单一数据源
  + 状态只读
  + 状态修改只能由纯函数完成

# (组件的)状态(state)和属性(props)之间有何不同
State 是一种数据结构，用于组件挂载时所需数据的默认值。State 可能会随着时间的推移而发生突变，但多数时候是作为用户事件行为的结果。
Props(properties 的简写)则是组件的配置。props 由父组件传递给子组件，并且就子组件而言，props 是不可变的(immutable)。组件不能改变自身的 props，但是可以把其子组件的 props 放在一起(统一管理)。Props 也不仅仅是数据--回调函数也可以通过 props 传递。

# 调用 super(props) 的目的是什么
子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用super方法，子类就得不到this对象。
参考《es6标准入门教程》：https://es6.ruanyifeng.com/#docs/class-extends