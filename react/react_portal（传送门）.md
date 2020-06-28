# react_portal传送门
## portal的概念
Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案  

  **语法**  

`ReactDOM.createPortal(child, container)`  

第一个参数（child）是任何可渲染的 React 子元素，例如一个元素，字符串或 fragment。第二个参数（container）是一个 DOM 元素。

**应用场景**  
一个 portal 的典型用例是当父组件有 overflow: hidden 或 z-index 样式时，但你需要子组件能够在视觉上“跳出”其容器。例如，对话框、悬浮卡以及提示框：

**通过 Portal 进行事件冒泡**  
尽管 portal 可以被放置在 DOM 树中的任何地方，但在任何其他方面，其行为和普通的 React 子节点行为一致。由于 portal 仍存在于 React 树， 且与 DOM 树 中的位置无关。

这包含事件冒泡。一个从 portal 内部触发的事件会一直冒泡至包含 React 树的祖先，即便这些元素并不是 DOM 树 中的祖先。

可参考[使用React高阶组件+createPortal写一个Modal吧](https://www.jianshu.com/p/810e8104f72f)
