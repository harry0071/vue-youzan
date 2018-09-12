//个人中心

import Vue from 'vue'
import router from './router/index.js';
import store from './vuex/index.js';

// 将router传给new实例
new Vue({
    el: '#app',
    router,
    store,
});