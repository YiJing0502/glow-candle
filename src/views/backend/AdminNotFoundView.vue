<!-- eslint-disable max-len -->
<template>
  <div class="d-flex flex-column justify-content-center align-items-center vh-100 vw-100">
    <span class="fs-1 material-icons mb-3">error</span>
    <h3 class="fs-2">很抱歉，找不到此頁面</h3>
    <button class="btn btn-outline-dpgray fs-5 mt-3" @click="this.$router.go(-1)">
      返回上一頁
    </button>
  </div>
</template>
