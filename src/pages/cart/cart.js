//购物车
import './cart_base.css'
import './cart_trade.css'
import './cart.css'

import Vue from 'vue';
import axios from 'axios';
import url from 'js/api.js';

import {
	MessageBox,
	Toast
} from 'mint-ui';

let startX = 0;
let endX = 0;

new Vue({
	el: ".container",
	data: {
		lists: null,
		totalPrice: 0,
		editShop: null,
		editShopIndex: -1,
	},
	computed: {
		allChoose: {
			get() {
				const attr = this.editShop ? 'removeChecked' : 'checked';
				if (this.lists && this.lists.length) {
					//如果店铺都选中，那么就全选
					return this.lists.every(list => list[attr]);
				} else {
					return false;
				}
			},
			set(newVal) {
				const attr = this.editShop ? 'removeChecked' : 'checked';
				this.lists.forEach(list => {
					list[attr] = newVal;
					list.goodsLists.forEach(good => good[attr] = newVal);
				});
			}
		},
		chooseData() {
			let arr = [];
			let totalPrice = 0;
			if (this.lists && this.lists.length) {
				this.lists.forEach(list => {
					list.goodsLists.forEach(good => {
						if (good.checked) {
							arr.push(good);
							totalPrice += good.price * good.skuNumber;
						}
					});
				});
				this.totalPrice = totalPrice;
				return arr;
			} else {
				return [];
			}
		},
		removeData() {
			let arr = [];
			let totalPrice = 0;
			if (this.editShop) {
				this.lists.forEach(list => {
					list.goodsLists.forEach(good => {
						if (good.removeChecked) {
							arr.push(good);
						}
					});
				});
				return arr;
			} else {
				return [];
			}
		},
	},
	created() {
		this.getLists();
	},
	methods: {
		getLists() {
			axios.get(url.cartLists).then(({
				data
			}) => {
				const lists = data.lists;
				lists.forEach(list => {
					list.checked = true;
					list.removeChecked = false;
					list.editable = false;
					list.editMsg = '编辑';
					list.editSeen = true;
					list.goodsLists.forEach(good => {
						good.checked = true;
						good.removeChecked = false;
					});
				});
				this.lists = lists;
			}).catch(error => document.write(error));
		},
		chooseGood(list, good) {
			const attr = this.editShop ? 'removeChecked' : 'checked';
			good[attr] = !good[attr];
			//通过数组的every方法,当所有good选中时，店铺也选中
			list[attr] = list.goodsLists.every(good => good[attr]);
		},
		chooseShop(list) {
			const attr = this.editShop ? 'removeChecked' : 'checked';
			list[attr] = !list[attr];
			//店铺选中，则所有商品选中;店铺没有选中,则所有商品不选中
			list.goodsLists.forEach(good => good[attr] = list[attr]);
		},
		chooseAll() {
			this.allChoose = !this.allChoose;
		},
		edit(list, shopIndex) {
			list.editable = !list.editable;
			list.editMsg = list.editable ? '完成' : '编辑';
			//这个店铺处于编辑状态时，其余店铺的状态
			this.lists.forEach((shop, index) => {
				//进入编辑状态时，清空之前的remove勾选记录
				shop.removeChecked = false;
				shop.goodsLists.forEach(good => {
					good.removeChecked = false;
					let ele = this.$refs[`good-${good.id}`][0];
					ele.style.transform = 'translateX(0)';
				});
				//如果不是当前这个店铺
				if (shopIndex != index) {
					shop.editSeen = !shop.editSeen;
				}
			});
			this.editShop = list.editable ? list : null;
			this.editShopIndex = list.editable ? shopIndex : -1;
		},
		minusGood(good) {
			if (good.skuNumber == 1) return;
			good.skuNumber--;
		},
		plusGood(good) {
			if (good.skuNumber >= good.remain) {
				good.skuNumber = good.remain;
				Toast({
					message: '超出最大库存！',
					duration: 1200,
				});
				return;
			}
			//axios.post(url.xxx,{id:good.id,num:good.skuNumber+1}).then(res=>good.skuNumber++)
			good.skuNumber++;

		},
		removeGood(shop, shopIndex, good, goodIndex) {
			MessageBox.confirm('确定要删除该商品吗?').then(yes => {
					//axios.post(url.xxx,{id:good.id}).then(res=>{删除本地商品});
					shop.goodsLists.splice(goodIndex, 1);
					if (!shop.goodsLists.length) {
						this.lists.splice(shopIndex, 1);
						this.afterShopRemoved();
					}
				},
				cancel => {
					return;
				}
			);
		},
		afterShopRemoved() {
			this.editShop = null;
			this.editShopIndex = -1;
			this.lists.forEach(list => {
				list.editSeen = true;
			});
		},
		gotoAddress(){
			location.href = 'member.html#/address/choose'
		},
		removeList() {
			MessageBox.confirm(`确定删除这些商品?`).then(yes => {
				let ids = [];
				this.removeData.forEach(good => {
					ids.push(good.id);
				});
				//axios.post(xxx,{ids}).then(res=>{本地删除})
				//本地删除代码
				let arr = [];
				this.editShop.goodsLists.forEach(good => {
					let index = this.removeData.findIndex(item => item.id == good.id);
					//将没有被勾选删除的商品存入arr
					if (index == -1) {
						arr.push(good);
					}
				});
				if (arr.length) {
					//将arr替代原来的goodsLists
					this.editShop.goodsLists = arr;
				} else {
					//当空数组时，说明商品全部删光
					this.editShop.goodsLists = [];
					this.lists.splice(this.editShopIndex, 1);
					this.afterShopRemoved();
				}
			});
		},
		start(ev) {
			startX = ev.changedTouches[0].clientX;

		},
		end(ev, good) {
			endX = ev.changedTouches[0].clientX;
			if (!this.editShop) {
				let ele = this.$refs[`good-${good.id}`][0];
				if (startX - endX > 100) {
					ele.style.transform = 'translateX(-60px)';
				} else if (endX - startX > 100) {
					ele.style.transform = 'translateX(0)';
				}
			}
		},
	},
})
