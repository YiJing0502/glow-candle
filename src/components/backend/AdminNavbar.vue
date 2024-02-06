<template>
  <div class="col-2 bg-main-medium vh-100 px-3">
    <div class="d-flex justify-content-center my-3">
      <img
        src="https://storage.googleapis.com/vue-course-api.appspot.com/orli-hexschool/1705540904165.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=IoVxYU9seiRBD6INQsp3uctsnTewV9snKd%2FzjWQ4bkJLOSFmwIeImy2glNTf6hVHgKH2DwA6NMWfkgr%2Fm4Jw8cEVB1ZqX%2BReWi3mFMSJC0D%2FsLIzNmYYwm%2Bquk4txAb4yFX%2FSDrMRviJYu2bpfIRWeC2JlEECvHG3krC4E%2BBxBaHaVZtbO8fpewJVo1k2dUEeYGsGUN3jmfBEJ%2B7GuLROlsz5NC25Y1fZER%2BiOoIwB47GlWp55SV8XCSaUp%2F0d6FnKYhvW3NE1zfkfOxpJ7o2ZcULT0vgxBsman45C6Qn1yAYGvkrjKgpowMLXX9erkDy45eOV8td8HZ5%2Fe0hz24lQ%3D%3D"
        alt="" width="70">
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
      <li class="list-group-item">A third item</li>
      <li class="list-group-item">A fourth item</li>
      <li class="list-group-item">And a fifth one</li>
    </ul>
  </div>
</template>