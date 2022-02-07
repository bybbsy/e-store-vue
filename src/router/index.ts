import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import { Route, NavigationGuardNext } from 'vue-router';

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
    path: '/sign-up',
    name: 'sign-up',
    meta: { layout: 'empty' },
    component: () => import('../views/signupPage.vue')
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    meta: { layout: 'empty' },
    component: () => import('../views/signinPage.vue')
  },
  {
    path: '/coupons',
    name: 'Coupons',
    meta: { layout: 'default', authRequired: true },
    component: () => import('../views/CouponsPage.vue'),
    beforeEnter: checkForAuth
  },
  {
    path: '/products',
    name: 'Products',
    meta: { layout: 'default' },
    component: () => import('../views/ProductsPage.vue'),
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

function checkForAuth(to: Route, from: Route, next: NavigationGuardNext<Vue>): void {
  if(to.meta?.authRequired) {
    next({ name: 'sign-up'})
  }
}
export default router
