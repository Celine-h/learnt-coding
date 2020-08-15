# vue angular react父子组件之间的通信
>旨在用最简单的例子回忆各框架之间的区别，在使用是能一下记起来

## 父====》子

**vue:**
```
父组件：<child :msg="datamsg" ></child> //子组件的msg属性上加数据,datamsg是数据
子组件：export default {
			props:["datamsg"] //子组件得到的数据，保存在props中
		}
		html:
			<p>{{msg}}</p> //在组件的html页面进行渲染
```
将父组件中的数据以属性形式放在父组件里面的子组件上，然后子组件再在vue的实例中通过props:[]去得到父组件传的数据。

**react:**
```
父组件：<Child msg={datamsg}></Child> //子组件 传输的数据为datamsg
子组件：<p>{this.props.msg}<p> //子组件页面上渲染
```
将父组件中的值放在子组件上，子组件就可以通过this.props.属性名得到。

**angular:**
```
父组件：
js:
<app-child [msg]="msg"></app-child> //放在子组件的属性上
子组件：
js:引入Input模块
	export class child{
		@Input() msg; //子组件得到数据
	}
html:<p>{{msg}}</p> //子组件进行页面渲染
```
在父组件的类里面吧数据写好，然后在父组件里面的子组件标签上写上动态属性，子组件通过引入Input模块，写上@Input()这个装饰器。然后就可以得到数据。

## 子===》父
**vue:**

```
父组件：<child v-on:give-data="showData"></child> //在父组件的子组件标签上面添加自定义的方法
export default{
  methods:{
    showData(data){
      console.log(data) //得到子组件传递过来的数据
    }
  }
}

子组件：<button @click="clickBtn"></button>//在子组件的button按钮上添加点击事件
export default {
	data(){
		return{
			msg:"我是子组件的数据"
		}
	}
	methods:{
		clickBtn(){
			this.emit("give-data",msg)//添加自定义事件
		}
	}
}
```


vue的子父通信是通过自定义事件emit完成的。需要在子组件上添加事件，然后在事件的方法里面创建一个自定义事件，并把数据放上去，然后在父组件里面的子组件标签上面使用自定义事件得到数据。

**react:**
```
父组件：
<Child visibleHandler={this.visibleHandler} />

let visibleHandler = (visibleFromChild)=>{
  //通过子组件调用，传递visible信息
  this.setState({
    visible:visibleFromChild
    })
}

子组件：
<button onClick={this.ClickBtn}></button>

clickBtn=()=>{
  const {visibleHandler} = this.props  
  visibleHandler(false)
}
```

**angular:**
```
使用emit自定义事件

父组件：
	html:
	<Child (constmEventToApp)="handleData($event)"></Child>//将子组件中的自定义事件绑定到父组件下面的子组件标签上。
	ts:
	export class Father{
		handleDate(ev){
			console.log(ev);//ev就是子组件所传递过来的数据
		}
	}


子组件：
	ts:
		导入Output和EventEmitter两个模块
		export class Child{
			@Output() constmEventToApp=new EventEmitter();//创建emit事件
			ngInit(){
				this.constmEventToApp.emit("数据") //在dom挂载时将数据放入自定义事件中
			}
		}

```
angular中的子父通信是通过emit自定义事件，需要引入output和eventEmitter两个模块，然后在父组件里面将子组件绑定自定义事件。自定义事件必须要写上$event，这是子组件的数据。

参考：https://www.cnblogs.com/xiaojianwei/p/10087838.html
