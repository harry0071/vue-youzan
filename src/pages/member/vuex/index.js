//使用Vuex
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import axios from 'axios';
import url from 'js/api.js';

//创建store实例
const store = new Vuex.Store({
  state: {
    lists: [],
  },
  mutations: {
    getMyAddress(state,lists){
    	//变更状态
    	state.lists = lists;
    },
    addAddress(state,data){
      state.lists.push(data);
    },
    removeAddress(state,id){//根据id删除
      let lists = state.lists;
      lists.forEach((item,index) => {
        if (item.id == id) {
          lists.splice(index,1);
        }
      });
    },
    editAddress(state,obj){
      let lists = state.lists;
      lists.forEach((item,index) => {
        if (item.id == obj.id) {
          Object.assign(item,obj);
        }
      });      
    },
    setDefault(state,id){
      let lists = state.lists;
      lists.forEach((item,index) => {
        item.isDefault = false;
        if (item.id == id) {
          item.isDefault = true;
        }
      });
    }
  },
  actions: {
      getMyAddress({commit}){
        axios.get(url.mylists).then(({data})=> {
        	//触发mutations里的init方法，并将data.lists作为参数传过去
        	commit('getMyAddress',data.lists);
        })
        .catch(error => document.write(error));
      },
      addAddress({commit},data){
        //axios.post()保存到后台
        //后台返回一个id
        //↓本地模拟id
        data.id = Math.random();
        commit('addAddress',data)
      },
      removeAddress({commit},id){
        //传给后台id进行删除
        commit('removeAddress',id);
      },
      editAddress({commit},obj){
        //编辑后传给后台
        commit('editAddress',obj);
      },
      setDefault({commit},id){
        //传给后台id，将这个设为默认
        commit('setDefault',id);
      },
  }
})

export default store;