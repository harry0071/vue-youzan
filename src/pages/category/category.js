//分类页
import 'css/common.css';
import './category.css';

import Vue from 'vue';
import axios from 'axios';
import url from 'js/api.js';
import mixin from 'js/mixin.js';

const app = new Vue({
	el:'#app',
	mixins:[mixin],
	data:{
		kinds:[],
		items:[],
		clickIndex:0,
	},
	mixins:[mixin],
	created(){
		this.getKinds();
		this.getItems(1,0);
	},
	methods:{
		getKinds(){
			axios.get(url.kinds).then(({data})=>this.kinds=data.kinds).catch(res=>document.write(res));
		},
		getItems(cid,index){
			this.clickIndex = index;
			axios.get(url.items,{params:{cid}}).then(({data})=>this.items=data).catch(res=>document.write(res));
		},
		goTo(arg){
			open(`search.html?keyword=${arg.name}&id=${arg.id}`,'_self');
		},
	},

});
