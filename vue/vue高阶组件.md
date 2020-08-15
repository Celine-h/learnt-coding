# vue高阶组件
>觉得在vue中mixins比高阶组件好用
>详细原理解释参考：https://www.jianshu.com/p/6b149189e035

```bash
function Console (Base) {
  return {
    mounted () {
      console.log('haha')
    },
    props: Base.props,
    render (h) {
    // 将 this.$slots 格式化为数组，因为 h 函数第三个参数是子节点，是一个数组
      const slots = Object.keys(this.$slots)
        .reduce((arr, key) => arr.concat(this.$slots[key]), [])
        // 手动更正 context
        .map(vnode => {
          vnode.context = this._self //绑定到高阶组件上(默认 子组件找的是父组件)
          return vnode
        })

      return h(WrappedComponent, {
        on: this.$listeners,
        props: this.$props,
        attrs: this.$attrs
      }, slots)
    }
  }
}

```

```bash
<template>
  <div>
    <Base>
      <h2 slot="slot1">BaseComponent slot</h2>
      <p>default slot</p>
    </Base>
    <wrapBase>
      <h2 slot="slot1">EnhancedComponent slot</h2>
      <p>default slot</p>
    </wrapBase>
  </div>
</template>

<script>
  import Base from './Base.vue'
  import hoc from './Console.js'

  const wrapBase = Console(Base)

  export default {
    components: {
      Base,
      wrapBase
    }
  }
</script>

```
