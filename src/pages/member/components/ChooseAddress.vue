<template class="container-bottom-menu" style="cursor:pointer;">
  <div class="container " style="min-height: 597px;">
    <div
    v-if="lists.length"
    class="block-list address-list section section-first js-no-webview-block">
      <router-link
      v-for="list in lists"
      :to="{name: 'form', query: { type: 'edit', obj: list}}"
      :key="list.id"
      :class="{'address-item-default':list.isDefault}"
      class="block-item js-address-item address-item">
        <div class="address-title">{{list.name}} {{list.tel}}</div>
        <p>{{list.province + list.city + list.county + list.address}}</p>
        <a class="edit">修改</a>
      </router-link>
    </div>
    <div
    v-else
    >请添加地址</div>
    <div class="block stick-bottom-row center">
      <router-link
      :to="{name: 'form', query: { type: 'add' }}"
      class="btn btn-blue js-no-webview-block js-add-address-btn">
            新增地址
        </router-link>
    </div>
  </div>
</template>

<script>
  import url from 'js/api.js';
  import axios from 'axios';

  export default {
    data() {
      return {
        lists:[]
      }
    },
    created(){
      this.getMyAddress();
    },
    methods:{
      getMyAddress(){
        axios.get(url.mylists).then(({data})=> this.lists=data.lists).catch(error => document.write(error));
      },
    },
    
  }
</script>

