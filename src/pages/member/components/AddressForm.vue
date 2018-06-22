<template>
  <div style="cursor:pointer;">
    <div class="container " style="min-height: 597px;">
      <div class="section section-first">
        <div class="block form js-form">
          <input class="js-id" name="id" type="hidden" value="">
          <div class="block-item" style="border-top:0;">
            <label>收货人</label>
            <input
            v-model.trim="name"
            type="text" placeholder="请输入姓名" name="user_name" maxlength="20" required>
          </div>
          <div class="block-item">
            <label>联系电话</label>
            <input
            v-model.trim="tel"
            type="tel" placeholder="联系电话" name="tel" maxlength="11" required>
          </div>
          <div class="block-item">
            <label>选择地区</label>
            <div class="select-group">
              <select
              v-model.trim="pValue"
              class="js-province-selector" required>
                <option value="-1">选择省份</option>
                <option v-for="p in addressData.list" :value="p.value">{{p.label}}</option>
              </select>
              <select
              v-model.trim="cValue"
              class="js-city-selector" required>
                <option value="-1">选择城市</option>
                <option v-for="city in cityList" :value="city.value">{{city.label}}</option>
              </select>
              <select
              v-model.trim="ctValue"
              class="js-county-selector" name="area_code" required>
                <option value="-1">选择地区</option>
                <option v-for="county in countyList" :value="county.value">{{county.label}}</option>
              </select>
            </div>
          </div>
          <div class="block-item">
            <label>详细地址</label>
            <input v-model="address" type="text" placeholder="街道门牌信息" name="address_detail" maxlength="100" required>
          </div>
        </div>
      </div>
      <div class="block section js-save block-control-btn">
        <div
        @click="saveAddress()"
        class="block-item c-blue center">保存</div>
      </div>
      <div
      v-show="type=='edit'"
      class="block section js-delete block-control-btn">
        <div
        @click="removeAddress()"
        class="block-item c-red center">删除</div>
      </div>
      <div
      @click="setDefault()"
      v-show="type=='edit'"
      class="block stick-bottom-row center js-save-default">
        <button class="btn btn-standard js-save-default-btn">设为默认收货地址</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  @import './address_base.css';
  @import './address.css';
</style>

<script src="./form.js"></script>
