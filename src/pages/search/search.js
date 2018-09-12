import 'css/common.css'
import './search.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

import qs from 'qs'
let {keyword,id} = qs.parse(location.search.substring(1));//提取查询参数中的keyword和id

new Vue({
	el:'#app',
	data:{
		keyword,
		id,
		lists:[],
		toTopSeen:false,
	},
	created(){
		this.searchHotItems();
	},
	methods:{
		searchHotItems(){
			axios.get(url.searchHotItems,{params:{keyword,id}}).then(({data})=>this.lists=data.lists);
		},
		move(){
			if (pageYOffset>100) {
				this.toTopSeen = true;
			}else{
				this.toTopSeen = false;
			}
		},
		toTop(){
			window.scrollTo(0,0);
			this.toTopSeen = false;
		},
	},
});