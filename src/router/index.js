import { createRouter, createWebHashHistory } from 'vue-router';

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
          path: '',
          name: 'home',
          component: () => import('../views/frontend/HomeView.vue'),
        },
        {
          path: '/:pathMatch(.*)*',
          name: 'front404',
          component: () => import('../views/NotFoundView.vue'),
        },
        {
          path: 'products',
          name: 'products',
          component: () => import('../views/frontend/ProductListView.vue'),
        },
        {
          path: 'product/:id',
          name: 'product',
          component: () => import('../views/frontend/ProductDetailView.vue'),
        },
        {
          path: 'checkout',
          name: 'checkout',
          component: () => import('../views/frontend/CheckoutView.vue'),
        },
        {
          path: 'payment/:id',
          name: 'payment',
          component: () => import('../views/frontend/PaymentView.vue'),
        },
        {
          path: 'orders',
          name: 'orders',
          component: () => import('../views/frontend/OrderSearch.vue'),
        },
        {
          path: 'order/:id',
          name: 'order',
          component: () => import('../views/frontend/OrderDetail.vue'),
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/frontend/AboutView.vue'),
        },
        {
          path: 'contact',
          name: 'contact',
          component: () => import('../views/frontend/ContactView.vue'),
        },
        {
          path: 'collaborate',
          name: 'collaborate',
          component: () => import('../views/frontend/CollaborateView.vue'),
        },
        {
          path: 'return',
          name: 'return',
          component: () => import('../views/frontend/ReturnView.vue'),
        },
        {
          path: 'shopping',
          name: 'shopping',
          component: () => import('../views/frontend/ShoppingView.vue'),
        },
        {
          path: 'usage',
          name: 'usage',
          component: () => import('../views/frontend/UsageView.vue'),
        },
        {
          path: 'articles',
          name: 'articles',
          component: () => import('../views/frontend/ArticleListView.vue'),
        },
        {
          path: 'article/:id',
          name: 'article',
          component: () => import('../views/frontend/ArticleDetail.vue'),
        },
      ],
    },
    // 後台 backend routes
    {
      path: '/admin',
      name: 'back',
      component: () => import('../views/backend/BackLayoutView.vue'),
      children: [
        {
          path: '',
          name: 'admin',
          component: () => import('../views/backend/AdminView.vue'),
        },
        {
          path: 'orders',
          name: 'adminOrders',
          component: () => import('../views/backend/AdminOrdersView.vue'),
        },
        {
          path: 'products',
          name: 'adminProducts',
          component: () => import('../views/backend/AdminProductsView.vue'),
        },
        {
          path: 'coupons',
          name: 'adminCoupons',
          component: () => import('../views/backend/AdminCouponsView.vue'),
        },
        {
          path: 'articles',
          name: 'adminArticles',
          component: () => import('../views/backend/AdminArticlesView.vue'),
        },
        // 404 route
        {
          path: ':pathMatch(.*)*',
          name: 'admin404',
          component: () => import('../views/backend/AdminNotFoundView.vue'),
        },
      ],
    },
    // admin login
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/backend/LoginView.vue'),
    },
    // 404 route
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('../views/NotFoundView.vue'),
    },
    {
      path: '/about2',
      name: 'about2',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
  scrollBehavior() {
    return {
      top: 0,
    };
  },
});

export default router;
