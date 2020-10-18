+ React生命周期有哪些，16版本生命周期发生了哪些变化？  
+ setState是同步的还是异步的？
+ 为什么有时连续多次 setState只有一次生效？
+ React如何实现自己的事件机制？
+ 为何 React事件要自己绑定 this？
+ 原生事件和 React事件的区别？
+ React的合成事件是什么？
+ React和原生事件的执行顺序是什么？可以混用吗？
+ 虚拟Dom是什么？
+ 虚拟Dom比 普通Dom更快吗？
+ 虚拟Dom中的 $$typeof属性的作用是什么？
+ React组件的渲染流程是什么？
+ 为什么代码中一定要引入 React？
+ 为什么 React组件首字母必须大写？
+ React在渲染 真实Dom时做了哪些性能优化？
+ 什么是高阶组件？如何实现？
+ HOC在业务场景中有哪些实际应用场景？
+ 高阶组件( HOC)和 Mixin的异同点是什么？
+ Hook有哪些优势？

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