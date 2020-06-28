# react高阶组件——《深入react技术栈》读书笔记
参考：https://blog.csdn.net/weixin_34227447/article/details/87953929
+ 什么是高阶组件
+ 高阶组件的实现原理
+高阶组件存在的问题
+高阶组件的约定

## 什么是高阶组件
**高阶组件**
<table><tr><td bgcolor=#eee>如果一个函数 接受一个或多个组件作为参数并且返回一个组件 就可称之为 高阶组件。</td></tr></table>

高阶函数和高阶组件有点相似

**高阶函数**
<table><tr><td bgcolor=#eee>如果一个函数 接受一个或多个函数作为参数并且返回一个函数 就可称之为 高阶组件。</td></tr></table>

一道有关高阶函数的经典面试题 [面试题3+1第57天](https://github.com/haizlin/fe-interview/issues/238)

## 高阶函数的实现原理

### 属性代理

属性代理的简单实现

 ```C
function HigherOrderComponent(WrappedComponent) {
    return class extends React.Component {
        render() {
            return <WrappedComponent {...this.props} />;
        }
    }
```

利用属性代理的高阶组件的应用
 + 操作 props
 + 抽离 state
 + 通过 ref 访问到组件实例
 + 用其他元素包裹传入的组件 WrappedComponent

**操作 props**

为 WrappedComponent 添加新的属性：
```C
function HigherOrderComponent(WrappedComponent) {
    return class extends React.Component {
        render() {
            const newProps = {
                name: '大板栗',
                age: 18,
            };
            return <WrappedComponent {...this.props} {...newProps} />;
        }
    };
}
```
**抽离 state**(这个我没太懂)  
利用 props 和回调函数把 state 抽离出来：
```C
function withOnChange(WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                name: '',
            };
        }
        onChange = () => {
            this.setState({
                name: '大板栗',
            });
        }
        render() {
            const newProps = {
                name: {
                    value: this.state.name,
                    onChange: this.onChange,
                },
            };
            return <WrappedComponent {...this.props} {...newProps} />;
        }
    };
```
**通过 ref 访问到组件实例**

如何在 高阶组件 中获取到 WrappedComponent 组件的实例呢？答案就是可以通过 WrappedComponent 组件的 ref 属性，**该属性会在组件 componentDidMount 的时候执行 ref 的回调函数并传入该组件的实例：**
```C
function HigherOrderComponent(WrappedComponent) {
    return class extends React.Component {
        executeInstanceMethod = (wrappedComponentInstance) => {
            wrappedComponentInstance.someMethod();
        }
        render() {
            return <WrappedComponent {...this.props} ref={this.executeInstanceMethod} />;
        }
    };
```
注意：不能在无状态组件（函数类型组件）上使用 ref 属性，因为无状态组件没有实例。

**用其他元素包裹传入的组件 WrappedComponent**  

给 WrappedComponent 组件包一层背景色为 #fafafa 的 div 元素：
```C
function withBackgroundColor(WrappedComponent) {
    return class extends React.Component {
        render() {
            return (
                <div style={{ backgroundColor: '#fafafa' }}>
                    <WrappedComponent {...this.props} {...newProps} />
                </div>
            );
        }
    };
```

### 反向继承（Inheritance Inversion)
反向继承不能保证完整的子组件书被解析
最简单的反向继承实现：
```C
function HigherOrderComponent(WrappedComponent) {
    return class extends WrappedComponent {
        render() {
            return super.render();
        }
    };
}
```
反向继承可以用来做什么：
+ 渲染劫持（Render Highjacking）
+ 操作 state

**渲染劫持**  
之所以称之为 渲染劫持 是因为高阶组件控制着 WrappedComponent 组件的渲染输出，通过渲染劫持我们可以：

+ 有条件地展示元素树（element tree）
+ 操作由 render() 输出的 React 元素树
+ 在任何由 render() 输出的 React 元素中操作 props
+ 用其他元素包裹传入的组件 WrappedComponent （同 属性代理）

**1) 条件渲染**  
通过 props.isLoading 这个条件来判断渲染哪个组件。
```C
function withLoading(WrappedComponent) {
    return class extends WrappedComponent {
        render() {
            if(this.props.isLoading) {
                return <Loading />;
            } else {
                return super.render();
            }
        }
    };
}
```

**2) 修改由 render() 输出的 React 元素树**  
修改元素树：
```C
function HigherOrderComponent(WrappedComponent) {
    return class extends WrappedComponent {
        render() {
            const tree = super.render();
            const newProps = {};
            if (tree && tree.type === 'input') {
                newProps.value = 'something here';
            }
            const props = {
                ...tree.props,
                ...newProps,
            };
            const newTree = React.cloneElement(tree, props, tree.props.children);
            return newTree;
        }
    };
}
```
**操作 state**  
高阶组件中可以读取、编辑和删除 WrappedComponent 组件实例中的 state。甚至可以增加更多的 state 项，但是 非常不建议这么做 因为这可能会导致 state 难以维护及管理。
```C
function withLogging(WrappedComponent) {
    return class extends WrappedComponent {
        render() {
            return (
                <div>
                    <h2>Debugger Component Logging...</h2>
                    <p>state:</p>
                    <pre>{JSON.stringify(this.state, null, 4)}</pre>
                    <p>props:</p>
                    <pre>{JSON.stringify(this.props, null, 4)}</pre>
                    {super.render()}
                </div>
            );
        }
    };
```
## 高阶组件存在的问题
+ 静态方法丢失
+ refs 属性不能透传
+ 反向继承不能保证完整的子组件树被解析

### 静态方法丢失
因为原始组件被包裹于一个容器组件内，也就意味着新组件会没有原始组件的任何静态方法：
```C
// 定义静态方法
WrappedComponent.staticMethod = function() {}
// 使用高阶组件
const EnhancedComponent = HigherOrderComponent(WrappedComponent);
// 增强型组件没有静态方法
typeof EnhancedComponent.staticMethod === 'undefined' // true
```
所以必须将静态方法做拷贝：
```C
function HigherOrderComponent(WrappedComponent) {
    class Enhance extends React.Component {}
    // 必须得知道要拷贝的方法
    Enhance.staticMethod = WrappedComponent.staticMethod;
    return Enhance;
}
```
但是这么做的一个缺点就是必须知道要拷贝的方法是什么，不过 React 社区实现了一个库 hoist-non-react-statics 来自动处理，它会 自动拷贝所有非 React 的静态方法：
```C
import hoistNonReactStatic from 'hoist-non-react-statics';

function HigherOrderComponent(WrappedComponent) {
    class Enhance extends React.Component {}
    hoistNonReactStatic(Enhance, WrappedComponent);
    return Enhance;
```

### refs 属性不能透传

一般来说高阶组件可以传递所有的 props 给包裹的组件 WrappedComponent，但是有一种属性不能传递，它就是 ref。与其他属性不同的地方在于 React 对其进行了特殊的处理。

如果你向一个由高阶组件创建的组件的元素添加 ref 引用，那么 ref 指向的是最外层容器组件实例的，而不是被包裹的 WrappedComponent 组件。

那如果有一定要传递 ref 的需求呢，别急，React 为我们提供了一个名为 React.forwardRef 的 API 来解决这一问题（在 React 16.3 版本中被添加）：
```C
function logProps(Component) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }

    render() {
      const {forwardedRef, ...rest} = this.props;

      // 将自定义的 prop 属性 “forwardedRef” 定义为 ref
      return <Component ref={forwardedRef} {...rest} />;
    }
  }

  // 注意 React.forwardRef 回调的第二个参数 “ref”。
  // 我们可以将其作为常规 prop 属性传递给 LogProps，例如 “forwardedRef”
  // 然后它就可以被挂载到被 LogProps 包裹的子组件上。
  return React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardedRef={ref} />;
  });
}
```

### 反向继承不能保证完整的子组件树被解析
React 组件有两种形式，分别是 class 类型和 function 类型（无状态组件）。

我们知道反向继承的渲染劫持可以控制 WrappedComponent 的渲染过程，也就是说这个过程中我们可以对 elements tree、state、props 或 render() 的结果做各种操作。

但是如果渲染 elements tree 中包含了 function 类型的组件的话，这时候就不能操作组件的子组件了。

### 高阶组件的约定
高阶组件带给我们极大方便的同时，我们也要遵循一些 约定：

+ props 保持一致
+ 你不能在函数式（无状态）组件上使用 ref 属性，因为它没有实例
+ 不要以任何方式改变原始组件 WrappedComponent
+ 透传不相关 props 属性给被包裹的组件 WrappedComponent
+ 不要再 render() 方法中使用高阶组件
+ 使用 compose 组合高阶组件
+ 包装显示名字以便于调试

**props 保持一致**  
高阶组件在为子组件添加特性的同时，要尽量保持原有组件的 props 不受影响，也就是说传入的组件和返回的组件在 props 上尽量保持一致。

**不要改变原始组件 WrappedComponent**
不要在高阶组件内以任何方式修改一个组件的原型，思考一下下面的代码：
```C
function withLogging(WrappedComponent) {
    WrappedComponent.prototype.componentWillReceiveProps = function(nextProps) {
        console.log('Current props', this.props);
        console.log('Next props', nextProps);
    }
    return WrappedComponent;
}
const EnhancedComponent = withLogging(SomeComponent);
```

会发现在高阶组件的内部对 WrappedComponent 进行了修改，一旦对原组件进行了修改，那么就失去了组件复用的意义，所以请通过 纯函数（相同的输入总有相同的输出） 返回新的组件：
```C
function withLogging(WrappedComponent) {
    return class extends React.Component {
        componentWillReceiveProps() {
            console.log('Current props', this.props);
            console.log('Next props', nextProps);
        }
        render() {
            // 透传参数，不要修改它
            return <WrappedComponent {...this.props} />;
        }
    };
}
```
这样优化之后的 withLogging 是一个 纯函数，并不会修改 WrappedComponent 组件，所以不需要担心有什么副作用，进而达到组件复用的目的。

**透传不相关 props 属性给被包裹的组件 WrappedComponent**
```C
function HigherOrderComponent(WrappedComponent) {
    return class extends React.Component {
        render() {
            return <WrappedComponent name="name" {...this.props} />;
        }
    };
}
```

**不要在 render() 方法中使用高阶组件**  
```C
class SomeComponent extends React.Component {
    render() {
        // 调用高阶函数的时候每次都会返回一个新的组件
        const EnchancedComponent = enhance(WrappedComponent);
        // 每次 render 的时候，都会使子对象树完全被卸载和重新
        // 重新加载一个组件会引起原有组件的状态和它的所有子组件丢失
        return <EnchancedComponent />;
    }
}
```

**使用 compose 组合高阶组件**
```c
// 不要这么使用
const EnhancedComponent = withRouter(connect(commentSelector)(WrappedComponent))；
// 可以使用一个 compose 函数组合这些高阶组件
// lodash, redux, ramda 等第三方库都提供了类似 `compose` 功能的函数
const enhance = compose(withRouter, connect(commentSelector))；
const EnhancedComponent = enhance(WrappedComponent)；
```

因为按照 约定 实现的高阶组件其实就是一个纯函数，如果多个函数的参数一样（在这里 withRouter 函数和 connect(commentSelector) 所返回的函数所需的参数都是 WrappedComponent），所以就可以通过 compose 方法来组合这些函数。

使用 compose 组合高阶组件使用，可以显著提高代码的可读性和逻辑的清晰度。

***包装显示名字以便于调试***  
高阶组件创建的容器组件在 React Developer Tools 中的表现和其它的普通组件是一样的。为了便于调试，可以选择一个显示名字，传达它是一个高阶组件的结果。
```c
const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component';
function HigherOrderComponent(WrappedComponent) {
    class HigherOrderComponent extends React.Component {/* ... */}
    HigherOrderComponent.displayName = `HigherOrderComponent(${getDisplayName(WrappedComponent)})`;
    return HigherOrderComponent;
}
```

实际上 recompose 库实现了类似的功能，懒的话可以不用自己写：
```c
import getDisplayName from 'recompose/getDisplayName';
HigherOrderComponent.displayName = `HigherOrderComponent(${getDisplayName(BaseComponent)})`;
```
// Or, even better:
```c
import wrapDisplayName from 'recompose/wrapDisplayName';
HigherOrderComponent.displayName = wrapDisplayName(BaseComponent, 'HigherOrderComponent');
```
