//index.html的入口文件
//通过import引入css和js

import { MessageBox } from 'mint-ui';
if (document.documentElement.clientWidth > 768) {
  MessageBox.confirm('您似乎正在使用PC端，是否跳转到手机预览模式?').then(action => {
    location.href = 'http://harry0071.coding.me/device-mock?color=yellow&site=http://harry0071.coding.me/youzan'
  });
}


import 'css/common.css';//已配置css表示src/modules/css
import './index.css';

import Vue from 'vue';
import axios from 'axios';
import url from 'js/api.js';//已配置js表示src/modules/js

import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);

import mixin from 'js/mixin.js';
import Swipe from 'cp/Swipe.vue';

const app = new Vue({
	el:'#app',
	components:{
		Swipe,
	},
	data:{
		lists:null,
		pageNum:1,
		notloading:false,
		allLoaded:false,
		bannerLists:null,
	},
	mixins:[mixin],
	created(){
		this.getBannerLists();
	},
	methods:{
		getHotLists(){
			if (this.notloading) return;
			this.notloading = true;//加把锁，防止重复请求
			axios.get(url.hotLists,{
				params:{
					pageNum:this.pageNum,
					limit:8,
				},
			}).then(({data})=>{
				let newLists = data.lists;
				if (this.lists) {
					//数组和合并不能用+，而要用concar
					this.lists = this.lists.concat(newLists);
				}else {
					//第一次请求
					this.lists = newLists;
				}
				this.pageNum++;
				if (this.pageNum>5){
					this.allLoaded=true;
					return;
				}
				this.notloading = false;
			}).catch(res=>{
				//异常处理
				document.write(res);
			});
		},
		getBannerLists(){
			axios.get(url.bannerLists).then(({data})=>this.bannerLists = data.lists)
			.catch(res=>{
				//异常处理
				document.write(res);
			});
		}
	},
});