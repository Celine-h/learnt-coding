# react,vue,angular之间的路由传参比较
## react

1.params
```bash
<Route path='/path/:name' component={Path}/>

<link to="/path/2">xxx</Link>

this.props.history.push({pathname:"/path/" + name});
```
**读取参数用**:this.props.match.params.name  
**优势** ： 刷新地址栏，参数依然存在  
**缺点**:只能传字符串，并且，如果传的值太多的话，url会变得长而丑陋。

2.query
```bash
<Route path='/query' component={Query}/>

<Link to={{ path : ' /query' , query : { name : 'sunny' }}}>

this.props.history.push({pathname:"/query",query: { name : 'sunny' }});
```
**读取参数用**: this.props.location.query.name  
**优势**：传参优雅，传递参数可传对象；  
**缺点**：刷新地址栏，参数丢失  

3.state
```bash
<Route path='/sort ' component={Sort}/>
<Link to={{ path : ' /sort ' , state : { name : 'sunny' }}}> 
this.props.history.push({pathname:"/sort ",state : { name : 'sunny' }});
```
**读取参数用**: this.props.location.query.state   
**优缺点**同query

4.search
```bash
<Route path='/web/departManange ' component={DepartManange}/>

<link to="web/departManange?tenantId=12121212">xxx</Link>

this.props.history.push({pathname:"/web/departManange?tenantId" + row.tenantId});
```
**读取参数用**: this.props.location.search  
**优缺点**同params

----

## Vue

1.param
```bash
//在路由中配置path
 {
      name:"Blog",
      component:Blog,
      path:"/blog/:id"
    }
//
 <router-link :to="'blog/'+(i+1)">

this.$router.push({
    path:`/blog/${id}`
})
```
**参数取读**：this.$route.params.id  
**优点**：参数显示在地址栏上

注意和第二种params对象区分

2. params对象
```bash
//: 注意这里不能使用:/id来传递参数了，因为组件中，已经使用params来携带参数了
{
     path: '/blog',
     name: 'Blog',
     component: Blog
   }

   this.$router.push({
          name: 'Blog',// 注意这里用name
          params: {
            id: id
          }
        })
```
**参数取读**：this.$route.params.id  
**特点**：参数不会显示到路径上  
**缺点**： 页面刷新数据会丢失

3.query
```bash
{
     path: '/blog',
     name: 'Blog',
     component: Blog
}

this.$router.push({
          name: '/blog',
          query: {
            id: id
          }
        })
```
**参数取读**：his.$route.query.id  
**特点**：uery传递的参数会显示在url后面?id=？, 强制刷新也会获得参数
**缺点**： 

---
## Angular
1.queryParams:查询参数中传递数据
```bash
//路由配置
const routes: Routes = [
  {path: 'product', component: ProductComponent},
  {path: '**', component: HomeComponent},
];

//HTML
 <a routerLink="/product" [queryParams]="{id:1}">商品详情</a>
 //
 this.router.navigate(['/product'], {queryParams: {id:1}});

// 参数取读
 export class ProductComponent implements OnInit {
   private productId: number;
  constructor(private activatedRoute: ActivatedRoute) { }
    ngOnInit() {
    this.productId = this.activatedRoute.snapshot.queryParams['id'];
    //或者
    this.activatedRoute.queryParams.subscribe(params=> {
  this.productId = params[id];
})
   }
 }
```

2.param
```bash
//路由配置
const routes: Routes = [
  {path: 'product/:id', component: ProductComponent},
  {path: '**', component: HomeComponent},
];

// HTML
<a [routerLink]="['product', 1]">商品详情</a>

// js方式
 this.router.navigate(['/product', 2]);

// 取读参数
this.productId = this.activatedRoute.snapshot.params['id'];
// 或者以下方式取读参数
this.activatedRoute.params.subscribe((params: Params) => this.productId = params['id']);

```

!!ps: [可以通过this.router.navigate(['../'], { relativeTo: this.route })这种方式返回上级菜单](https://segmentfault.com/q/1010000012245278)


参考  
链接：https://www.jianshu.com/p/ad8cc02b9e6c
