# redux-saga [参考](jianshu.com/p/7cac18e8d870)
 官网：http://leonshi.com/redux-saga-in-chinese/index.html

个人觉得看demo会学习的比较好

CounterApp

https://github.com/guangqiang-liu/redux-saga-counterApp

todoList

https://github.com/guangqiang-liu/redux-saga-todoListDemo

Sagas是通过Generator函数来创建的

Sagas 不同于thunks，thunks 是在action被创建时调用，而 Sagas只会在应用启动时调用（但初始启动的 Sagas 可能会动态调用其他 Sagas），Sagas 可以被看作是在后台运行的进程，Sagas 监听发起的action，然后决定基于这个 action来做什么：是发起一个异步调用（比如一个 fetch 请求），还是发起其他的action到Store，甚至是调用其他的 Sagas

在 redux-saga 的世界里，所有的任务都通用 yield Effects 来完成（Effect 可以看作是 redux-saga 的任务单元）。 redux-saga 为各项任务提供了各种Effect创建器，比如调用一个异步函数，发起一个action到Store，启动一个后台任务或者等待一个满足某些条件的未来的 action

## redux-saga框架核心API
### 一、Saga 辅助函数

redux-saga提供了一些辅助函数，用来在一些特定的action 被发起到Store时派生任务，下面我先来讲解两个辅助函数：`takeEvery` 和 `takeLatest`

**takeEvery**  
例如：每次点击 Fetch 按钮时，我们发起一个 FETCH_REQUESTED 的 action。 我们想通过启动一个任务从服务器获取一些数据，来处理这个action

首先我们创建一个将执行异步 action 的任务：
```
import { call, put } from 'redux-saga/effects'

export function* fetchData(action) {
   try {
      const data = yield call(Api.fetchUser, action.payload.url);
      yield put({type: "FETCH_SUCCEEDED", data});
   } catch (error) {
      yield put({type: "FETCH_FAILED", error});
   }
}
```
然后在每次 FETCH_REQUESTED action 被发起时启动上面的任务
```
//可以当作rootsaga
import { takeEvery } from 'redux-saga'

function* watchFetchData() {

  yield* takeEvery("FETCH_REQUESTED", fetchData)
}
```
注意：上面的 takeEvery 函数可以使用下面的写法替换

function* watchFetchData() {

   while(true){
     yield take('FETCH_REQUESTED');
     yield fork(fetchData);
   }
}

**takeLatest**

在上面的例子中，`takeEvery` 允许多个 `fetchData` 实例同时启动，在某个特定时刻，我们可以启动一个新的 `fetchData` 任务， 尽管之前还有一个或多个 `fetchData` 尚未结束

如果我们只想得到最新那个请求的响应（例如，始终显示最新版本的数据），我们可以使用 takeLatest 辅助函数
```
import { takeLatest } from 'redux-saga'

function* watchFetchData() {
  yield* takeLatest('FETCH_REQUESTED', fetchData)
}
```
和takeEvery不同，在任何时刻 takeLatest 只允许执行一个 fetchData 任务，并且这个任务是最后被启动的那个，如果之前已经有一个任务在执行，那之前的这个任务会自动被取消

### 二、Effect Creators

redux-saga框架提供了很多创建effect的函数，下面我们就来简单的介绍下开发中最常用的几种
```
take(pattern)
put(action)
call(fn, ...args)
fork(fn, ...args)
select(selector, ...args)
take(pattern)
```
**take**   

函数可以理解为监听未来的action，它创建了一个命令对象，告诉middleware等待一个特定的action， Generator会暂停，直到一个与pattern匹配的action被发起，才会继续执行下面的语句，也就是说，take是一个阻塞的 effect（阻塞）

用法：
```
function* watchFetchData() {
   while(true) {
     // 监听一个type为 'FETCH_REQUESTED' 的action的执行，直到等到这个Action被触发，才会接着执行下面的 yield fork(fetchData)  语句
     yield take('FETCH_REQUESTED');
     yield fork(fetchData);
   }
}
```
**put(action)**

put函数是用来发送action的 effect，你可以简单的把它理解成为redux框架中的dispatch函数，当put一个action后，reducer中就会计算新的state并返回，注意： put 也是阻塞 effect

用法：
```
export function* toggleItemFlow() {
    let list = []
    // 发送一个type为 'UPDATE_DATA' 的Action，用来更新数据，参数为 `data：list`
    yield put({
      type: actionTypes.UPDATE_DATA,
      data: list
    })
}
```
**call(fn, ...args)**

call函数你可以把它简单的理解为就是可以调用其他函数的函数，它命令 middleware 来调用fn 函数， args为函数的参数，注意： fn 函数可以是一个 Generator 函数，也可以是一个返回 Promise 的普通函数，call 函数也是阻塞 effect

用法：
```bash
export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export function* removeItem() {
  try {
    // 这里call 函数就调用了 delay 函数，delay 函数为一个返回promise 的函数
    return yield call(delay, 500)
  } catch (err) {
    yield put({type: actionTypes.ERROR})
  }
}
```
**fork(fn, ...args)**

fork 函数和 call 函数很像，都是用来调用其他函数的，但是fork函数是非阻塞函数，也就是说，程序执行完 yield fork(fn， args) 这一行代码后，会立即接着执行下一行代码语句，而不会等待fn函数返回结果后，在执行下面的语句

用法：
```
import { fork } from 'redux-saga/effects'

export default function* rootSaga() {
  // 下面的四个 Generator 函数会一次执行，不会阻塞执行
  yield fork(addItemFlow)
  yield fork(removeItemFlow)
  yield fork(toggleItemFlow)
  yield fork(modifyItem)
}

```
**select(selector, ...args)**

select 函数是用来指示 middleware调用提供的选择器获取Store上的state数据，你也可以简单的把它理解为redux框架中获取store上的 state数据一样的功能 ：store.getState()

用法：
```bash
export function* toggleItemFlow() {
     // 通过 select effect 来获取 全局 state上的 `getTodoList` 中的 list
     let tempList = yield select(state => state.getTodoList.list)
}
```

### 三、createSagaMiddleware()

createSagaMiddleware 函数是用来创建一个 Redux 中间件，将 Sagas 与 Redux Store 链接起来

sagas 中的每个函数都必须返回一个 Generator 对象，middleware 会迭代这个 Generator 并执行所有 yield 后的 Effect（Effect 可以看作是 redux-saga 的任务单元）

用法：
```bash
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import rootSaga from './rootSaga'

// 创建一个saga中间件
const sagaMiddleware = createSagaMiddleware()

// 创建store
const store = createStore(
  reducers,
  将sagaMiddleware 中间件传入到 applyMiddleware 函数中
  applyMiddleware(sagaMiddleware)
)

// 动态执行saga，注意：run函数只能在store创建好之后调用
sagaMiddleware.run(rootSaga)

export default store
```
### 四、middleware.run(sagas, ...args)

动态执行sagas，用于applyMiddleware阶段之后执行sagas

+ sagas: Function: 一个 Generator 函数
+ args: Array: 提供给 saga 的参数 (除了 Store 的 getState 方法)
注意：动态执行saga语句 middleware.run(sagas) 必须要在store创建好之后才能执行，在 store 之前执行，程序会报错
