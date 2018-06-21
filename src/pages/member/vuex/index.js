//使用Vuex
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

//创建store实例
const store = new Vuex.Store({
  state: {
    lists: [],
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})