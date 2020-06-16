# React hook ——渐进式的向下兼容的
1.什么是react_hook?  
2.引入react hook的动机？  
3.state hook  
4.使用 Effect Hook  
5.Hook使用规则


## 1.什么是react hook？
Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数；可以在不适用class的情况下使用state和其他特性。(hook是react16.8特性)

## 2.引入react hook的动机？
+ Hook 使你在无需修改组件结构的情况下复用状态逻辑。
+ Hook 将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据），而并非强制按照生命周期划分。
+ 解决难以理解的class编写

## 3.state hook
**示例**
```C
import React, { useState } from 'react';

function Example() {
  // 声明一个叫 "count" 的 state 变量
  const [count,setState]=useState(0)

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
**调用 useState 方法的时候做了什么?**  
 它定义一个 “state 变量”。我们的变量叫 count， 但是我们可以叫他任何名字，比如 banana。这是一种在函数调用时保存变量的方式 —— useState 是一种新方法，它与 class 里面的 this.state 提供的功能完全相同。一般来说，在函数退出后变量就会”消失”，而 state 中的变量会被 React 保留。

 **useState 需要哪些参数？**  
  useState() 方法里面唯一的参数就是初始 state。不同于 class 的是，我们可以按照需要使用数字或字符串对其进行赋值，而不一定是对象。这个初始 state 参数只有在第一次渲染时会被用到。

**useState 方法的返回值是什么？**  
 返回值为：当前 state 以及更新 state 的函数


**声明多个 state 变量**  
 你可以在一个组件中多次使用 State Hook:
 ```
 function ExampleWithManyStates() {
   // 声明多个 state 变量！
   const [age, setAge] = useState(42);
   const [fruit, setFruit] = useState('banana');
   const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
   // ...
 }
 ```
 数组解构的语法让我们在调用 useState 时可以给 state 变量取不同的名字。这些名字并不是 useState API 的一部分。*React 假设当你多次调用 useState 的时候，你能保证每次渲染时它们的调用顺序是不变的。*


## 4.使用 Effect Hook
**无需清除的 effect**  
有时候，我们只想在 React 更新 DOM 之后运行一些额外的代码。比如发送网络请求，手动变更 DOM，记录日志，这些都是常见的无需清除的操作。因为我们在执行完这些操作之后，就可以忽略他们了。
```
useEffect(() => {
api.get()
})
```

**需要清除的 effect**  
一些副作用是需要清除的。例如订阅外部数据源。这种情况下，清除工作是非常重要的，可以防止引起内存泄露！  

**示例**  
```C
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // Specify how to clean up after this effect:
    return function cleanup() {//可不用命名直接返回箭头函数
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```
你可能认为需要单独的 effect 来执行清除操作。但由于添加和删除订阅的代码的紧密性，所以 useEffect 的设计是在同一个地方执行。**如果你的 effect 返回一个函数，React 将会在执行清除操作时调用它：**,而在class编写中，订阅卸载componentDidMount，而取消订阅则写在componentwillUnmount；

**为什么要在 effect 中返回一个函数？**  
 这是 effect 可选的清除机制。

**React 何时清除 effect？**  
 React 会在组件卸载的时候执行清除操作。(为什么这将助于避免 bug以及如何在遇到性能问题时跳过此行为。)


## 5.Hook使用规则  

**只在最顶层使用Hook**  
不要在循环，条件或嵌套函数中调用 Hook， 确保总是在你的 React 函数的最顶层调用他们。**遵守这条规则，你就能确保 Hook 在每一次渲染中都按照同样的顺序被调用**。这让 React 能够在多次的 useState 和 useEffect 调用之间保持 hook 状态的正确

**只在 React 函数中调用 Hook**  
不要在普通的 JavaScript 函数中调用 Hook。你可以：  
✅ 在 React 的函数组件中调用 Hook  
✅ 在自定义 Hook 中调用其他 Hook

## 6.自定义组件

**复用逻辑组件**
```C
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  // ...

  return isOnline;
}
```

**使用了复用逻辑组建的两个组件**  
```C
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

```C
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

**自定义 Hook 必须以 “use” 开头吗？**  
必须如此。这个约定非常重要。不遵循的话，由于无法判断某个函数是否包含对其内部 Hook 的调用，React 将无法自动检查你的 Hook 是否违反了 Hook 的规则。

**在两个组件中使用相同的 Hook 会共享 state 吗？**   
不会。自定义 Hook 是一种重用状态逻辑的机制(例如设置为订阅并存储当前值)，所以每次使用自定义 Hook 时，其中的所有 state 和副作用都是完全隔离的。

**自定义 Hook 如何获取独立的 state？**  
每次调用 Hook，它都会获取独立的 state。由于我们直接调用了 useFriendStatus，从 React 的角度来看，我们的组件只是调用了 useState 和 useEffect。我们可以在一个组件中多次调用 useState 和 useEffect，它们是完全独立的。





[react文档](https://react.docschina.org/docs/hooks-intro.html)
