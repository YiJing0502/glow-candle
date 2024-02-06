<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container">
      <router-link :to="{name: 'front'}" class="navbar-brand" ><img src="/glow-logo.png" alt="glow-logo" width="50"></router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
        <ul class="navbar-nav align-items-lg-center">
          <li class="nav-item">
            <router-link :to="{name: 'front'}" class="nav-link" aria-current="page">首頁</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              產品類別
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              從系列選擇
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              從調性選擇
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'front'}" class="nav-link" aria-current="page">關於GLOW</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <span class="material-icons-outlined fs-3 mt-1">search</span>
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'front'}" class="nav-link" aria-current="page">
              <span class="material-icons fs-4 mt-1">forum</span>
            </router-link>
          </li>
         
          <li class="nav-item">
            <router-link :to="{name: 'front'}" class="nav-link" aria-current="page">
              <span class="material-icons-outlined fs-3 mt-1">shopping_bag</span>
            </router-link>
          </li>
          
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
  export default {
    
  }
</script>