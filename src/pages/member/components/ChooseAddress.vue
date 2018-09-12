<template>
  <div class="container-bottom-menu" style="cursor:pointer;">
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
  </div>
</template>

<script>
  export default {
    computed:{
      lists(){
        //member.js中，已经将store注入到new Vue的配置里了，所以可以使用this.$store
        return this.$store.state.lists;
      },
    },
    created(){
      if (!this.lists.length) {//为了避免每次返回到该页面时都会在生命周期触发，只有当lists为空时才触发actions里的方法，当获取到lists后就不再触发
        this.$store.dispatch('getMyAddress');
      }
    }
  }
</script>

<style scoped>
  @import './address_base.css';
  @import './address.css';
</style>
