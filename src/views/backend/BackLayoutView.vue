<template>
  <div class="d-flex">
    <AdminNavbar></AdminNavbar>
    <router-view></router-view>
  </div>
</template>
<script>
import AdminNavbar from '@/components/backend/AdminNavbar.vue';
export default {
  components: {
    AdminNavbar,
  }
}
</script>