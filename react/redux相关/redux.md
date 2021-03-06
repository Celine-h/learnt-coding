# redux——阮一峰
![redux](../../images/redux.jpg)

## Store
Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。(单一数据源)

Redux 提供createStore这个函数，用来生成 Store。
```
import { createStore } from 'redux';
const store = createStore(fn);
```
上面代码中，createStore函数接受另一个函数作为参数，返回新生成的 Store 对象。

## State
Store对象包含所有数据。如果想得到某个时点的数据，就要对 Store 生成快照。这种时点的数据集合，就叫做 State。

当前时刻的 State，可以通过store.getState()拿到。
```

import { createStore } from 'redux';
const store = createStore(fn);

const state = store.getState();
```
Redux 规定， 一个 State 对应一个 View。只要 State 相同，View 就相同。你知道 State，就知道 View 是什么样，反之亦然。

## store.subscribe()
Store 允许使用store.subscribe方法设置**监听函数**，一旦 State 发生变化，就自动执行这个函数。
```
import { createStore } from 'redux';
const store = createStore(reducer);

store.subscribe(listener);
```
显然，只要把 View 的更新函数（对于 React 项目，就是组件的render方法或setState方法）放入listen，就会实现 View 的自动渲染。

store.subscribe方法返回一个函数，调用这个函数就可以**解除监听**。
```

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

unsubscribe();
```

## store.dispatch(action)
view不能直接接触state，view通过store.dispatch（）发起action来改变state、
#### 1.action
Action 是一个对象。其中的type属性是必须的，表示 Action 的名称。其他属性可以自由设置，社区有一个规范可以[参考](https://github.com/redux-utilities/flux-standard-action)。
```

const action = {
  type: 'ADD_TODO',
  payload: 'Learn Redux'
};
```
上面代码中，Action 的名称是ADD_TODO，它携带的信息是字符串Learn Redux。

可以这样理解，Action 描述当前发生的事情。改变 State 的唯一办法，就是使用 Action。它会运送数据到 Store。

#### 2. Action Creator
View 要发送多少种消息，就会有多少种 Action。如果都手写，会很麻烦。可以定义一个函数来生成 Action，这个函数就叫 Action Creator。
```
const ADD_TODO = '添加 TODO';

function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}

const action = addTodo('Learn Redux');
```
上面代码中，addTodo函数就是一个 Action Creator。

#### 3.store.dispatch()
store.dispatch()是 View 发出 Action 的唯一方法。

```
import { createStore } from 'redux';
const store = createStore(fn);

store.dispatch({
  type: 'ADD_TODO',
  payload: 'Learn Redux'
});
```
上面代码中，store.dispatch接受一个 Action 对象作为参数，将它发送出去。

结合 Action Creator，这段代码可以改写如下。
```
store.dispatch(addTodo('Learn Redux'));
```

## Reducer
#### 1.Reducer的应用
Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。

Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。

```
const reducer = function (state, action) {
  // ...
  return new_state;
};
```

实际应用中，Reducer 会.dispatch方法会触发 Reducer 的自动执行。为此，Store 需要知道 Reducer 函数，做法就是在生成 Store 的时候，将 Reducer 传入createStore方法。
```
import { createStore } from 'redux';
const store = createStore(reducer);

const defaultState = 0;
const addreducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD':
      return state + action.payload;
    default:
      return state;
  }
};
```


上面代码中，createStore接受 Reducer 作为参数，生成一个新的 Store。以后每当store.dispatch发送过来一个新的 Action，就会自动调用 Reducer，得到新的 State。  
#### 2.reducer的特性
Reducer 函数最重要的特征是，它是一个纯函数。也就是说，只要是同样的输入，必定得到同样的输出。
#### 3.Reducer 的拆分
Reducer 函数负责生成 State。由于整个应用只有一个 State 对象，包含所有数据，对于大型应用来说，这个 State 必然十分庞大，导致 Reducer 函数也十分庞大。

Redux 提供了一个combineReducers方法，用于 Reducer 的拆分。你只要定义各个子 Reducer 函数，然后用这个方法，将它们合成一个大的 Reducer。

比如定义一个couter的reducer和一个add的reducer
```
//reducers/counter.js

export default function counter(state = 0, action) {
switch (action.type) {
case 'INCREMENT':
return state + 1
case 'DECREMENT':
return state - 1
default:
return state
}
}

```
```
//reducers/todos.js

export default function todos(state = [], action) {
switch (action.type) {
case 'ADD_TODO':
return state.concat([action.text])
default:
return state
}
}

```
通过combineReducers方法将两个子 Reducer 合并成一个大的函数。

```
//reducers/index.js

import { combineReducers } from 'redux'
import todos from './todos'
import counter from './counter'

export default combineReducers({
todos,
counter
})
```

这种写法有一个前提，就是 State 的属性名必须与子 Reducer 同名。如果不同名，就要采用下面的写法。

```
const reducer = combineReducers({
  a: doSomethingWithA,
  b: processB,
  c: c
})
```

## 最简单的实例——计时器
```
const Counter = ({ value, onIncrement, onDecrement }) => (
  <div>
  <h1>{value}</h1>
  <button onClick={onIncrement}>+</button>
  <button onClick={onDecrement}>-</button>
  </div>
);

const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT': return state + 1;
    case 'DECREMENT': return state - 1;
    default: return state;
  }
};

const store = createStore(reducer);

const render = () => {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => store.dispatch({type: 'INCREMENT'})}
      onDecrement={() => store.dispatch({type: 'DECREMENT'})}
    />,
    document.getElementById('root')
  );
};

render();
store.subscribe(render);
```
