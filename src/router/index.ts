import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import { Route, NavigationGuardNext } from 'vue-router';
import { userIsAllowed, userIsAuthorized } from '@/helpers/auth';
import store from '@/store/index';
import { UserData } from '@/types/store/auth/state-types';
import { allowedUsers } from '@/variables';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    meta: { layout: 'default' },
    redirect: to => 'products'
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
    component: () => import('../views/SignupPage.vue')
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    meta: { layout: 'empty' },
    component: () => import('../views/SigninPage.vue')
  },
  {
    path: '/personal',
    // name: 'personal',
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
    component: () => import(/* webpackChunkName: "about" */ '../views/ErrorPage.vue')
  },
  {
    path: '/admin',
    component: () => import('../views/Admin/AdminPage.vue'),
    redirect: { name: 'admin-main'},
    children: [
      {
        path: 'dashboard',
        name: 'admin-main',
        component: () => import('../views/Admin/AdminMainPage.vue'),
      },
      {
        path: 'crud',
        name: 'admin-crud',
        component: () => import('../views/Admin/AdminCrudPage.vue'),
        redirect: { name: 'crud-create'},
        children: [
          {
            path: 'create',
            name: 'crud-create',
            component: () => import('../views/Admin/Crud/CreateItemsPage.vue')
          },
          {
            path: 'all',
            name: 'crud-all',
            component: () => import('../views/Admin/Crud/EditDeletePage.vue')
          }
        ]
      }
    ]
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


function checkIfAllowed(to: Route, from: Route, next: NavigationGuardNext<Vue>) {
  if(userIsAllowed()) {
    next();
  } else {
    next({ name: 'products'})
  }
}
export default router
