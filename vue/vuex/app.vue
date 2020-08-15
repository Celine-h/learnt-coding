/*
需要在main.js
*/
<template>
  <div id="app">
		<!-- 匹配到的路由组件 -->
		<!-- <router-view /> -->
		<h1>下面是store内异步获取的数据</h1>
		<h2>{{list}}</h2>
		<h1>
			<input type="button" value="同步方法改变数据1" @click="updateState(11111)">
			<input type="button" value="同步方法改变数据2" @click="setState(2222222)">
			<input type="button" value="异步方法获取数据1" @click="getTodos()">
			<input type="button" value="异步方法获取数据2" @click="fetchTodos()">
		</h1>
  </div>
</template>

<script>
//导入vuex辅助函数
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
  name: 'app',
	//这里面存放数据
	data(){
		return{
		}
	},
	//获取计算数据
	computed: mapGetters(['list']), //等同于list(){ return this.$store.getters.list}
	methods:{
		//获取store内同步方法
		...mapMutations(['updateState','setState']),
		//获取store内异步方法
		...mapActions(['getTodos','fetchTodos'])
	},
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
