# redux异步操作与中间件

异步操作怎么办？Action 发出以后，Reducer 立即算出 State，这叫做同步；Action 发出以后，过一段时间再执行 Reducer，这就是**异步**。

## 中间件的概念
中间件就是一个函数，对store.dispatch方法进行了改造，在发出 Action 和执行 Reducer 这两步之间，添加了其他功能。

## 中间件的用法
本教程不涉及如何编写中间件，因为常用的中间件都有现成的，只要引用别人写好的模块即可。比如，上一节的日志中间件，就有现成的redux-logger模块。这里只介绍怎么使用中间件。
```bash
import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
const logger = createLogger();

const store = createStore(
  reducer,
  applyMiddleware(logger)
);
```

上面代码中，redux-logger提供一个生成器createLogger，可以生成日志中间件logger。然后，将它放在applyMiddleware方法之中，传入createStore方法，就完成了store.dispatch()的功能增强。


这里有两点需要注意：

（1）createStore方法可以接受整个应用的初始状态作为参数，那样的话，applyMiddleware就是第三个参数了。
```
const store = createStore(
  reducer,
  initial_state,
  applyMiddleware(logger)
);
```
（2）中间件的次序有讲究。
```
const store = createStore(
  reducer,
  applyMiddleware(thunk, promise, logger)
);
```
上面代码中，applyMiddleware方法的三个参数，就是三个中间件。有的中间件有次序要求，使用前要查一下文档。比如，logger就一定要放在最后，否则输出结果会不正确。

**applyMiddlewares这个方法到底是干什么的？**

它是 Redux 的原生方法，作用是将所有中间件组成一个数组，依次执行。

## redux-thunk 中间件
下面一个异步组件的例子。加载成功后（componentDidMount方法），它送出了（dispatch方法）一个 Action，向服务器要求数据 fetchPosts(selectedSubreddit)。
```bash
class AsyncApp extends Component {
  componentDidMount() {
    const { dispatch, url  } = this.props
    dispatch(fetchPosts(url))
  }

```

下面就是fetchPosts的代码，关键之处就在里面。
```bash
const fetchPosts = url => (dispatch, getState) => {
  //先发出一个 Action，表示操作开始
  dispatch({
    type:'POST_START',
    isFetching:true
  })
  return fetch(url)
    .then(response => response.json())
    .then(json =>
     //异步操作结束之后，再发出一个 Action，表示操作结束。
     dispatch({
       type:'POST_SUCCEED',
       isFetching:false,
       payload:json
     })
  };
};
```
```bash
// 使用方法一
store.dispatch(fetchPosts('reactjs'));
// 使用方法二
store.dispatch(fetchPosts('reactjs')).then(() =>
  console.log(store.getState())
);
```
这里的fetchPosts就是 Action Creator。普通的 Action Creator 默认返回一个对象。而这里fetchPosts返回了一个函数。  (store.dispatch方法正常情况下，参数只能是对象，不能是函数。)

这时，就要使用中间件redux-thunk。
```
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);
```
上面代码使用redux-thunk中间件，改造store.dispatch，使得后者可以接受函数作为参数。

**异步操作的第一种解决方案** 也是redux-thunk最重要的思想，就是可以接受一个返回函数的action creator。如果这个action creator 返回的是一个函数，就执行它，如果不是，就按照原来的next(action)执行。

## redux-promise 中间件
既然 Action Creator 可以返回函数，当然也可以返回其他值。另一种异步操作的解决方案，就是让 Action Creator 返回一个 Promise 对象。

这就需要使用redux-promise中间件。
```bash
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import reducer from './reducers';

const store = createStore(
  reducer,
  applyMiddleware(promiseMiddleware)
);
```
这个中间件使得store.dispatch方法可以接受 Promise 对象作为参数。这时，Action Creator 有两种写法。


**写法一**，返回值是一个 Promise 对象。
```bash
const fetchPosts =
  (dispatch, url) => new Promise((resolve,reject)=>{
    dispatch({
      type:'POST_START',
      isFetching:true
    })
    return fetch(url)
    .then(res=>res.json())
    .then(json=>
      dispatch({
        type:'POST_SUCCEED',
        isFetching:false,
        payload:json
      }
      ))
      .catch(err=>dispatch(
      {
          type:"POST_FAILED",
          isFetching:false
        }
        ))
      });

```
**写法二**，Action 对象的payload属性是一个 Promise 对象。这需要从redux-actions模块引入createAction方法，并且写法也要变成下面这样。

```bash
import { createAction } from 'redux-actions';

class AsyncApp extends Component {
  componentDidMount() {
    const { dispatch, url } = this.props
    // 发出同步 Action
    dispatch({
      type:'POST_START',
      isFetching:true
    })
    // 发出异步 Action
    dispatch(createAction(
      'POST_SUCCEED',
      fetch(`url`)
        .then(response => response.json())
    ));
  }
  ```
上面代码中，第二个dispatch方法发出的是异步 Action，只有等到操作结束，这个 Action 才会实际发出。注意，createAction的第二个参数必须是一个 Promise 对象。

如果 Action 对象的payload属性是一个 Promise 对象，那么无论 resolve 和 reject，dispatch方法都会发出 Action。
