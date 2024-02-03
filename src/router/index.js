import { createRouter, createWebHashHistory } from 'vue-router'


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    // 前台 frontend routes
    {
      path: '/',
      name: 'front',
      component: () => import('../views/frontend/FrontLayoutView.vue'),
      children: [
        {
          path: '/products',
          name: 'products',
          component: () => import('../views/frontend/ProductListView.vue'),
        }
      ],
    },
    // 後台 backend routes
    {
      path: '/admin',
      name: 'back',
      component: () => import('../views/backend/BackLayoutView.vue'),
      children: [
        {
          path: 'products',
          name: 'products',
          component: () => import(''),
        },
      ],
    },
    // admin login
    {
      path: '/myGlowLogin',
      name: 'login',
      component: () => import('../views/backend/LoginView.vue')
    },
    // 404 route
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('../views/NotFoundView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
