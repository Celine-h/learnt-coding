# Vuex详解
![vuex](../../images/vuex.png)

### 主要包括以下几个模块

**State**：定义了应用状态的数据结构，可以在这里设置默认的初始状态  
**Getter**：允许组件从 Store 中获取数据的计算属性。  
**Mutation**：是唯一更改 store 中状态的方法，且必须是同步函数。接收当前state和一些参数payload，改变旧的state；
**Action**：通过commit提交 mutation，而不是直接变更状态，可以包含任意异步操作。组件通过diapatch来触发actions
**Module**：可以将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割


###  一个完整的store的结构是这样的
```bash
const store = new Vuex.Store({
  state: {
    // 存放状态
  },
  getters: {
    // state的计算属性
  },
  mutations: {
    // 更改state中状态的逻辑，同步操作
  },
  actions: {
    // 提交mutation，异步操作
  },
  // 如果将store分成一个个的模块的话，则需要用到modules。
   //然后在每一个module中写state, getters, mutations, actions等。
  modules: {
    a: moduleA,
    b: moduleB,
    // ...
  }
});
```
