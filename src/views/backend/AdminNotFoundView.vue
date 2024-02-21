<!-- eslint-disable max-len -->
<template>
  <div
    class="d-flex flex-column justify-content-center align-items-center position-absolute top-50 start-50 translate-middle"
  >
    <h2 class="fs-1">404</h2>
    <h3 class="fs-2">很抱歉，找不到此頁面</h3>
    <button class="btn btn-outline-dpgray fs-5 mt-3" @click="this.$router.go(-1)">返回上一頁</button>
  </div>
</template>
