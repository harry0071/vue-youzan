//购物车
import './cart_base.css'
import './cart_trade.css'
import './cart.css'

import Vue from 'vue';
import axios from 'axios';
import url from 'js/api.js';

new Vue({
	el: ".container",
	data : {
		lists:[],
		totalPrice:0,
	},
	computed:{
		allChoose:{
			get(){
				if(this.lists && this.lists.length){
					//如果店铺都选中，那么就全选
					return this.lists.every(list => list.checked);
				}else{
					return false;
				}
			},
			set(newVal){
				this.lists.forEach(list => {
					list.checked = newVal;
					list.goodsLists.forEach(good => good.checked = newVal);
				});
			}
		},
		chooseData(){
			if(this.lists && this.lists.length){
				let arr = [];
				let totalPrice = 0;
				this.lists.forEach(list => {
					list.goodsLists.forEach(good => {
						if(good.checked){
							arr.push(good);
							totalPrice += good.price * good.skuNumber;
						}
					});
				});
				this.totalPrice = totalPrice;
				return arr;
			}else{
				return [];
			}
		}

	},
	created(){
		this.getLists();
	},
	methods : {
		getLists(){
			axios.get(url.cartLists).then(({data})=>{
				//this.lists = data.lists;
				let lists = data.lists;
				lists.forEach(list => {
					list.checked = true;
					list.goodsLists.forEach(good => {
						good.checked = true;
					});
				});
				this.lists = lists;
			}).catch(error=>document.write(error));
		},
		chooseGood(list,good){
			good.checked = !good.checked;
			list.checked = list.goodsLists.every(good => good.checked);
		},
		chooseShop(list){
			list.checked = !list.checked;
			//店铺选中，则所有商品选中;店铺没有选中,则所有商品不选中
			list.goodsLists.forEach(good => good.checked = list.checked);
		},
		chooseAll(){
			this.allChoose = !this.allChoose;
		}
	},
})
