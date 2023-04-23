// 页面路径：store/index.js 
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);//vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state:{//存放状态
		"systemInfo":{},
		"KeyboardHeight":0
	},
	mutations: {
		updateSystemInfo(state,obj) {
			console.log("已获取系统信息：",JSON.parse(JSON.stringify(obj)));
			state.systemInfo = obj
		},
		updateKeyboardHeight(state,height){
			state.KeyboardHeight = height
		}
	}
})
export default store