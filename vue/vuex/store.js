import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
export default new Vuex.Store({
	//状态数据
	state: {
		list:['默认为空']
	},
	//getters可以认为是store的计算属性
	getters: {
		list(state) {
			return state.list
		}
	},
	//存放同步函数方法
	mutations: {
		updateState(state,payload){
			state.list = payload
		},
		setState(state,payload){
			state.list = payload
		}
	},
	//存放异步函数方法
	actions: {
		//async异步
		async getTodos({commit}) {
			const result = await axios.get('http://jsonplaceholder.typicode.com/todos?_limit=10');
			commit('updateState', result.data);
		},
		//Promise异步
		fetchTodos({commit}, params) {
			return new Promise((resolve, reject) => {
				fetch('http://jsonplaceholder.typicode.com/todos?_limit=5')
					.then(res => res.json())
					.then(data => {
						commit('setState', data)
						reject(data)
					})
					.catch(err => reject(err));	//抛出错误回调
			});
		}

	}
})
