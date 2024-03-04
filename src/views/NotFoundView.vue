<!-- eslint-disable max-len -->
<template>
  <div
    class="d-flex flex-column justify-content-center align-items-center py-5 bg-main-medium container-rounded container my-5"
  >
    <span class="fs-1 material-icons mb-3">error</span>
    <h3 class="fs-2">找不到此頁面</h3>
    <button class="btn btn-outline-dpgray fs-5 mt-3" @click="this.$router.go(-2)">
      返回上一頁
    </button>
  </div>
</template>
<script></script>
