# React-router-dom(react-router v4)
原文链接：https://juejin.im/post/5995a2506fb9a0249975a1a4#heading-1
1. react-router v3的思想

## react-router v3的思想（v4中没有的)
+ 路由集中在一个地方。
+ 布局和页面嵌套是通过 <Route> 组件的嵌套而来的。
+ 布局和页面组件是完全纯粹的，它们是路由的一部分。

例如如下v3的路由：
```bash
import { Router, Route, IndexRoute } from 'react-router'

const PrimaryLayout = props => (
  <div className="primary-layout">
    <header>
      Our React Router 3 App
    </header>
    <main>
      {props.children}
    </main>
  </div>
)

const HomePage =() => <div>Home Page</div>
const UsersPage = () => <div>Users Page</div>

const App = () => (
  <Router history={browserHistory}>
    <Route path="/" component={PrimaryLayout}>
      <IndexRoute component={HomePage} />
      <Route path="/users" component={UsersPage} />
    </Route>
  </Router>
)

render(<App />, document.getElementById('root'))

```
v3使用 {props.children} 来嵌套组件。在v4 中，<Route> 组件在何处编写，如果路由匹配，子组件将在那里渲染。
在v4中的实现：
```bash
import { BrowserRouter, Route } from 'react-router-dom'

const PrimaryLayout = () => (
  <div className="primary-layout">
    <header>
      Our React Router 4 App
    </header>
    <main>
      <Route path="/" exact component={HomePage} />
      <Route path="/users" component={UsersPage} />
    </main>
  </div>
)

const HomePage =() => <div>Home Page</div>
const UsersPage = () => <div>Users Page</div>

const App = () => (
  <BrowserRouter>
    <PrimaryLayout />
  </BrowserRouter>
)

render(<App />, document.getElementById('root'))
```

## 包容性路由
在前面的例子中，你可能已经注意到了 `exact` 这个属性。那么它是什么呢？V3 的路由规则是“排他性”的，这意味着只有一条路由将获胜。V4 的路由默认为“包含”的，这意味着多个 <Route> 可以同时进行匹配和渲染。

在上一个例子中，我们试图根据路径渲染 `HomePage` 或者` UsersPage`。如果从示例中删除了 exact 属性，那么在浏览器中访问 /users 时，HomePage 和 UsersPage 组件将同时被渲染。  

要更好地了解匹配逻辑，请查看 [path-to-regexp](https://www.npmjs.com/package/path-to-regexp)，这是 v4 现在正在使用的，以确定路由是否匹配 URL。
为了演示包容性路由是有帮助的，我们在标题中包含一个 UserMenu，但前提是我们在应用程序的用户部分：
```bash
const PrimaryLayout = () => (
  <div className="primary-layout">
    <header>
      Our React Router 4 App
      <Route path="/users" component={UsersMenu} />
    </header>
    <main>
      <Route path="/" exact component={HomePage} />
      <Route path="/users" component={UsersPage} />
    </main>
  </div>
)


```
在，当用户访问 /users 时，两个组件都会渲染。类似这样的事情在 v3 中通过特定的匹配模式也是可行的，但它更复杂。得益于 v4 的包容性路由，现在能够很轻松地实现。

## 排他性路由
如果你只需要在路由列表里匹配一个路由，则使用 <Switch> 来启用排他路由：
```bash
const PrimaryLayout = () => (
  <div className="primary-layout">
    <PrimaryHeader />
    <main>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/users/add" component={UserAddPage} />
        <Route path="/users" component={UsersPage} />
        <Redirect to="/" />
      </Switch>
    </main>
  </div>
)
```
在给定的 <Switch> 路由中只有一条将渲染。在 HomePage 路由上，我们仍然需要 exact 属性，尽管我们会先把它列出来。否则，当访问诸如 /users 或 /users/add 的路径时，主页路由也将匹配。事实上，战略布局是使用排他路由策略（因为它总是像传统路由那样使用）时的关键。请注意，我们在 /users 之前策略性地放置了 /users/add 的路由，以确保正确匹配。由于路径 /users/add 将匹配 /users 和 /users/add，所以最好先把 /users/add 放在前面。

当然，如果我们以某种方式使用 exact，我们可以把它们放在任何顺序上，但至少我们有选择。

如果遇到，`<Redirect>`组件将会始终执行浏览器重定向，但是当它位于 `<Switch> `语句中时，只有在其他路由不匹配的情况下，才会渲染重定向组件。想了解在非切换环境下如何使用 `<Redirect>`，请参阅下面的授权路由。

## “默认路由”和“未找到”
尽管在 v4 中已经没有 `<IndexRoute>` 了，但可以使用 `<Route exact>` 来达到同样的效果。如果没有路由解析，则可以使用 `<Switch>` 与 `<Redirect>` 重定向到具有有效路径的默认页面（如同我对本示例中的 HomePage 所做的），甚至可以是一个“未找到页面”。


## 嵌套布局
第二种方法要好很多。  

第一种方法，我们修改 PrimaryLayout，以适应用户和产品对应的列表及详情页面：
```bash
const PrimaryLayout = props => {
  return (
    <div className="primary-layout">
      <PrimaryHeader />
      <main>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/users" exact component={BrowseUsersPage} />
          <Route path="/users/:userId" component={UserProfilePage} />
          <Route path="/products" exact component={BrowseProductsPage} />
          <Route path="/products/:productId" component={ProductProfilePage} />
          <Redirect to="/" />
        </Switch>
      </main>
    </div>
  )
}
```
虽然这在技术上可行的，但仔细观察这两个用户页面就会发现问题：
```bash
const BrowseUsersPage = () => (
  <div className="user-sub-layout">
    <aside>
      <UserNav />
    </aside>
    <div className="primary-content">
      <BrowseUserTable />
    </div>
  </div>
)

const UserProfilePage = props => (
  <div className="user-sub-layout">
    <aside>
      <UserNav />
    </aside>
    <div className="primary-content">
      <UserProfile userId={props.match.params.userId} />
    </div>
  </div>
  )
  ```
**新 API 概念**：props.match 被赋到由 <Route> 渲染的任何组件。你可以看到，userId 是由 props.match.params 提供的，了解更多请参阅 [v4](https://reactrouter.com/web/example/url-params) 文档。或者，如果任何组件需要访问 props.match，而这个组件没有由 <Route> 直接渲染，那么我们可以使用 withRouter() 高阶组件。

每个用户页面不仅要渲染其各自的内容，而且还必须关注子布局本身（并且每个子布局都是重复的）。虽然这个例子很小，可能看起来微不足道，但重复的代码在一个真正的应用程序中可能是一个问题。更不用说，每次 BrowseUsersPage 或 UserProfilePage 被渲染时，它将创建一个新的 UserNav 实例，这意味着所有的生命周期方法都将重新开始。如果导航标签需要初始网络流量，这将导致不必要的请求 —— 这都是我们决定使用路由的方式造成的。

这里有另一种更好的方法：
```bash
const PrimaryLayout = props => {
  return (
    <div className="primary-layout">
      <PrimaryHeader />
      <main>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/users" component={UserSubLayout} />
          <Route path="/products" component={ProductSubLayout} />
          <Redirect to="/" />
        </Switch>
      </main>
    </div>
  )
}
```
与每个用户和产品页面相对应的四条路由不同，我们为每个部分的布局提供了两条路由

请注意，上述示例没有使用 exact 属性，因为我们希望 /users 匹配任何以 /users 开头的路由，同样适用于产品。

通过这种策略，渲染其它路由将成为子布局的任务。UserSubLayout 可能如下所示：
```bash
const UserSubLayout = () => (
  <div className="user-sub-layout">
    <aside>
      <UserNav />
    </aside>
    <div className="primary-content">
      <Switch>
        <Route path="/users" exact component={BrowseUsersPage} />
        <Route path="/users/:userId" component={UserProfilePage} />
      </Switch>
    </div>
  </div>
)
```
新策略中最明显的胜出在于所有用户页面之间的不重复布局。这是一个双赢，因为它不会像第一个示例那样具有相同生命周期的问题。

有一点需要注意的是，即使我们在布局结构中深入嵌套，路由仍然需要识别它们的完整路径才能匹配。为了节省重复输入（以防你决定将“用户”改为其他内容），请改用 props.match.path：
```bash
const UserSubLayout = props => (
  <div className="user-sub-layout">
    <aside>
      <UserNav />
    </aside>
    <div className="primary-content">
      <Switch>
        <Route path={props.match.path} exact component={BrowseUsersPage} />
        <Route path={`${props.match.path}/:userId`} component={UserProfilePage} />
      </Switch>
    </div>
  </div>
)
```
## 匹配
到目前为止，props.match 对于知道详情页面渲染的 userId 以及如何编写我们的路由是很有用的。match 对象给我们提供了几个属性，包括 match.params、match.path、match.url 和其他几个。

**match.path vs match.url**

起初这两者之间的区别似乎并不清楚。控制台日志有时会显示相同的输出，这使得它们之间的差异更加模糊。例如，当浏览器路径为 /users 时，它们在控制台日志将输出相同的值：
```bash
const UserSubLayout = ({ match }) => {
  console.log(match.url)   // 输出："/users"
  console.log(match.path)  // 输出："/users"
  return (
    <div className="user-sub-layout">
      <aside>
        <UserNav />
      </aside>
      <div className="primary-content">
        <Switch>
          <Route path={match.path} exact component={BrowseUsersPage} />
          <Route path={`${match.path}/:userId`} component={UserProfilePage} />
        </Switch>
      </div>
    </div>
  )
}
```
虽然我们看不到差异，但 match.url 是浏览器 URL 中的实际路径，而 match.path 是为路由编写的路径。这就是为什么它们是一样的，至少到目前为止。但是，如果我们更进一步，在 UserProfilePage 中进行同样的控制台日志操作，并在浏览器中访问 /users/5，那么 match.url 将是 "/users/5" 而 match.path 将是 "/users/:userId"。  

选择哪一个？  

如果你要使用其中一个来帮助你构建路由路径，我建议你选择 match.path。使用 match.url 来构建路由路径最终会导致你不想看到的场景。下面是我遇到的一个情景。在一个像 UserProfilePage（当用户访问 /users/5 时渲染）的组件中，我渲染了如下这些子组件：
```bash
const UserComments = ({ match }) => (
  <div>UserId: {match.params.userId}</div>
)

const UserSettings = ({ match }) => (
  <div>UserId: {match.params.userId}</div>
)

const UserProfilePage = ({ match }) => (
  <div>
    User Profile:
    <Route path={`${match.url}/comments`} component={UserComments} />
    <Route path={`${match.path}/settings`} component={UserSettings} />
  </div>
)
```
为了说明问题，我渲染了两个子组件，一个路由路径来自于 match.url，另一个来自 match.path。以下是在浏览器中访问这些页面时所发生的事情:


访问 /users/5/comments 渲染 "UserId: undefined"。  
访问 /users/5/settings 渲染 "UserId: 5"。


那么为什么 match.path 可以帮助我们构建路径 而 match.url 则不可以呢？答案就是这样一个事实：{${match.url}/comments} 基本上就像和硬编码的 {'/users/5/comments'} 一样。这样做意味着后续组件将无法正确地填充 match.params，因为路径中没有参数，只有硬编码的 5。
直到后来我看到文档的这一部分，才意识到它有多重要：

match:

path - (string) 用于匹配路径模式。用于构建嵌套的 <Route>
url - (string) URL 匹配的部分。 用于构建嵌套的 <Link>


## 避免匹配冲突
假设我们制作的应用程序是一个仪表版，所以我们希望能够通过访问 /users/add 和 /users/5/edit 来新增和编辑用户。但是在前面的例子中，users/:userId 已经指向了 UserProfilePage。那么这是否意味着带有users/:userId 的路由现在需要指向另一个子子布局来容纳编辑页面和详情页面？我不这么认为，因为编辑和详情页面共享相同的用户子布局，所以这个策略是可行的：
```bash
const UserSubLayout = ({ match }) => (
  <div className="user-sub-layout">
    <aside>
      <UserNav />
    </aside>
    <div className="primary-content">
      <Switch>
        <Route exact path={props.match.path} component={BrowseUsersPage} />
        <Route path={`${match.path}/add`} component={AddUserPage} />
        <Route path={`${match.path}/:userId/edit`} component={EditUserPage} />
        <Route path={`${match.path}/:userId`} component={UserProfilePage} />
      </Switch>
    </div>
  </div>
)
```
请注意，为了确保进行适当的匹配，新增和编辑路由需要战略性地放在详情路由之前。如果详情路径在前面，那么访问 /users/add 时将匹配详情（因为 "add" 将匹配 :userId）。  
或者，如果我们这样创建路径 ${match.path}/:userId(\\d+)，来确保 :userId 必须是一个数字，那么我们可以先放置详情路由。然后访问 /users/add 将不会产生冲突。这是我在 path-to-regexp 的文档中学到的技巧。

## 授权路由

在应用程序中，通常会根据用户的登录状态来限制用户访问某些路由。对于未经授权的页面（如“登录”和“忘记密码”）与已授权的页面（应用程序的主要部分）看起来不一样也是常见的。为了解决这些需求，需要考虑一个应用程序的主要入口点：
```bash
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/auth" component={UnauthorizedLayout} />
            <AuthorizedRoute path="/app" component={PrimaryLayout} />
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}
```
通过这种方法可以得到一些启发。第一个是根据我们所在的应用程序的哪个部分，在两个顶层布局之间进行选择。像访问 /auth/login 或 /auth/forgot-password 这样的路径会使用 `UnauthorizedLayout` —— 一个看起来适于这种情况的布局。当用户登录时，我们将确保所有路径都有一个 /app 前缀，它使用 AuthorizedRoute 来确定用户是否登录。如果用户在没有登录的情况下，尝试访问以 /app 开头的页面，那么将被重定向到登录页面。  

虽然 AuthorizedRoute 不是 v4 的一部分，但是我在 v4 文档的帮助下自己写了。v4 中一个惊人的新功能是能够为特定的目的创建你自己的路由。它不是将 component 的属性传递给` <Route>`，而是传递一个 render 回调函数：
```bash
class AuthorizedRoute extends React.Component {
  componentWillMount() {
    getLoggedUser()
  }

  render() {
    const { component: Component, pending, logged, ...rest } = this.props
    return (
      <Route {...rest} render={props => {
        if (pending) return <div>Loading...</div>
        return logged
          ? <Component {...this.props} />
          : <Redirect to="/auth/login" />
      }} />
    )
  }
}

const stateToProps = ({ loggedUserState }) => ({
  pending: loggedUserState.pending,
  logged: loggedUserState.logged
})

export default connect(stateToProps)(AuthorizedRoute)
```
可能你的登录策略与我的不同，我是使用网络请求来 getLoggedUser()，并将 pending 和 logged 插入 Redux 的状态中。pending 仅表示在路由中请求仍在继续。

## `<Link>` vs `<NavLink>`
在 v4 中，有两种方法可以将锚标签与路由集成：<Link> 和 <NavLink>
<NavLink> 与 <Link> 一样，但如果 <NavLink> 匹配浏览器的 URL，那么它可以提供一些额外的样式能力。例如，在示例应用程序中，有一个<PrimaryHeader> 组件看起来像这样：
```bash
const PrimaryHeader = () => (
  <header className="primary-header">
    <h1>Welcome to our app!</h1>
    <nav>
      <NavLink to="/app" exact activeClassName="active">Home</NavLink>
      <NavLink to="/app/users" activeClassName="active">Users</NavLink>
      <NavLink to="/app/products" activeClassName="active">Products</NavLink>
    </nav>
  </header>
)
```
使用 `<NavLink>` 可以让我给任何一个激活的链接设置一个 active 样式。而且，需要注意的是，我也可以给它们添加 exact 属性。如果没有 exact，由于 v4 的包容性匹配策略，那么在访问 /app/users 时，主页的链接将处于激活中。就个人经历而言，NavLink 带 exact 属性等价于 v3 的 <link>，而且更稳定。
## URL 查询字符串
再也无法从 React Router v4 中获取 URL 的查询字符串了。在我看来，做这个决定是因为没有关于如何处理复杂查询字符串的标准。所以，他们决定让开发者去选择如何处理查询字符串，而不是将其作为一个选项嵌入到 v4 的模块中。这是一件好事。

就个人而言，我使用的是 query-string，它是由 sindresorhus 大神写的。
动态路由

关于 v4 最好的部分之一是几乎所有的东西（包括 <Route>）只是一个 React 组件。路由不再是神奇的东西了。我们可以随时随地渲染它们。想象一下，当满足某些条件时，你的应用程序的整个部分都可以路由到。当这些条件不满足时，我们可以移除路由。甚至我们可以做一些疯狂而且很酷的递归路由。
