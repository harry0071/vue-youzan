//商品详情页
import "./goods_common.css"
import "./goods_custom.css"
import "./goods.css"
import "./goods_theme.css"
import "./goods_mars.css"
import "./goods_sku.css"
import "./goods_transition.css"

import Vue from 'vue'
import axios from 'axios'
import Swipe from 'cp/Swipe.vue'
import url from 'js/api.js'

import qs from 'qs'
let {id} = qs.parse(location.search.substring(1));//提取查询参数中的id

new Vue({
	el:'#app',
	components:{
		Swipe,
	},
	data:{
		data:null,
		dealLists:[],
		tabber:0,
		bannerLists:[],
		skuType:1,//1:选择规格参数,2:加入购物车,3:立即购买
		popSeen:false,
		skuNumber:1,//购买数量
		cart:[],
		cartAdded:false,
		showMsg:false,
	},
	watch:{
		popSeen(newVal,oldVal){//监听popSeen的变化
			document.body.style.overflow = newVal ? 'hidden' : 'auto';
			document.querySelector('html').style.overflow = newVal ? 'hidden' : 'auto';
			document.body.style.height = newVal ? '100%' : 'auto';
			document.querySelector('html').style.height = newVal ? '100%' : 'auto';
			document.querySelector('.body-fixed-bottom').style.paddingBottom = newVal ? 0 : '50px';
		},
	},
	created(){
		this.getGoodsDetail();
	},
	methods:{
		getGoodsDetail(){
			axios.get(url.goodsDetail,{params:{id}})
			.then(({data})=>{
				this.data = data;
				data.imgs.forEach(item => {
					//需要给Swipe组件传link和img，但是商品详情页的轮播图不需要跳转链接，因此需要手动改造link
					this.bannerLists.push({
						link:'javascript:;',
						img:item
					});
				});
			})
			.catch(error=>document.write(error));
		},
		getGoodsDeal(){
			axios.get(url.goodsDeal,{params:{id}})
			.then(({data})=>this.dealLists = data.lists)
			.catch(error=>document.write(error));
		},
		chooseSku(skuType){
			this.skuType = skuType;
			this.popSeen = true;
		},
		changeSkuNumber(num){
			if (this.skuNumber==1 && num==-1 || this.skuNumber==this.data.remain && num==1) return;
			this.skuNumber += num;
		},
		addCart(){
			this.cart.push({
				id,
				img:this.data.imgs[0],
				storeName:this.data.storeName,
				title:this.data.title,
				price:this.data.price,
				skuNumber:this.skuNumber,
				sku:this.data.sku,
			});
			this.popSeen = false;
			this.cartAdded = true;
			this.showMsg = true;
			setTimeout(()=>{this.showMsg=false},1000);
		},
	},
});