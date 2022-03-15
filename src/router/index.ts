import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import { Route, NavigationGuardNext } from 'vue-router';
import { userIsAuthorized } from '@/helpers/auth';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/home',
    name: 'home',
    meta: { layout: 'default' },
    component: Home
  },
  {
    path: '/about',
    name: 'about',
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
    path: '/personal',
    name: 'personal',
    meta: { layout: 'default', authRequired: true },
    component: () => import('../views/PersonalPage.vue'),
    beforeEnter: checkForAuth,
    children: [
      {
        path: '/',
        name: 'personal-settings',
        meta: { layout: 'default', authRequired: true},
        component: () => import('../views/SettingsPage.vue'),
        beforeEnter: checkForAuth,
      },
      {
        path: 'coupons',
        name: 'coupons',
        meta: { layout: 'default', authRequired: true},
        component: () => import('../views/CouponsPage.vue'),
        beforeEnter: checkForAuth,
      },
      {
        path: 'cart',
        name: 'cart',
        meta: { layout: 'default', authRequired: true },
        component: () => import('../views/CartPage.vue'),
        beforeEnter: checkForAuth,
      }
    ]
  },
  {
    path: '/products/:category?',
    name: 'products',
    meta: { layout: 'default' },
    component: () => import('../views/ProductsPage.vue')
  },
  {
    path: '*',
    name: 'error',
    meta: { layout: 'empty' },
    component: () => import(/* webpackChunkName: "error" */ '../views/ErrorPage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

function checkForAuth(to: Route, from: Route, next: NavigationGuardNext<Vue>): void {
  if(to.meta?.authRequired && !userIsAuthorized()) {
    next({ name: 'sign-up'})
  } else {
    next()
  }
}

export default router
