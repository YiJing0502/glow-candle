<template>
  <div class="col-2 bg-main-medium vh-100 px-3">
    <div class="d-flex justify-content-center my-3">
      <router-link :to="{name: 'front'}">
        <img
          src="/glow-logo.png"
          alt="" width="70">
      </router-link>
    </div>
    <ul class="list-group">
      <li class="list-group-item">
        <router-link class="list-group-item" :to="{name: 'adminOrders'}">訂單管理</router-link>
      </li>
      <li class="list-group-item">
        <router-link class="list-group-item" :to="{name: 'adminProducts'}">產品管理</router-link>
      </li>
      <li class="list-group-item">
        <router-link class="list-group-item" :to="{name: 'adminCoupons'}">優惠券管理</router-link>
      </li>
    </ul>
  </div>
</template>
