import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    meta: { layout: 'default' },
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    meta: { layout: 'default' },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/auth',
    name: 'Auth',
    meta: { layout: 'default' },
    component: () => import('../views/AuthPage.vue')
  },
  {
    path: '/coupons',
    name: 'Coupons',
    meta: { layout: 'default' },
    component: () => import('../views/CouponsPage.vue')
  },
  {
    path: '/products',
    name: 'Products',
    meta: { layout: 'default' },
    component: () => import('../views/ProductsPage.vue')
  },
  {
    path: '*',
    name: 'Error',
    meta: { layout: 'empty' },
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
