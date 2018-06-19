//个人中心

//使用vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//定义组件
import Member from './components/Member.vue'
import Address from './components/Address.vue'
import ChooseAddress from './components/ChooseAddress.vue'
import AddressForm from './components/AddressForm.vue'

// 配置路由
const routes = [{
		path: '/',
		component: Member
	},
	{
		path: '/address',//记得给父路由router-view
		component: Address,
		children: [{
			path: 'choose',
			name:'choose',
			component: ChooseAddress,
		},
		{
			path: '',
			redirect: 'choose',//如果没有子路由路径,就重定向到choose这个子路由
		},
		{
			path: 'form',
			name:'form',
			component: AddressForm,
		},
		],

	},
]


//创建 router 实例，然后将配置 `routes` 传入
const router = new VueRouter({
	routes // （缩写）相当于 routes: routes
})

// 将router传给new实例
new Vue({
	el: '#app',
	router,
});
