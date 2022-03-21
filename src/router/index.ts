import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import { Route, NavigationGuardNext } from 'vue-router';
import { userIsAuthorized } from '@/helpers/auth';
import store from '@/store/index';
import { UserData } from '@/types/store/auth/state-types';

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
    component: () => import(/* webpackChunkName: "about" */ '../views/ErrorPage.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/Admin/adminWrapper.vue'),
    children: [
      {
        path: '/',
        name: 'admin-main',
        component: () => import('../views/Admin/mainPage.vue'),
      },
      {
        path: 'crud',
        name: 'admin-crud',
        component: () => import('../views/Admin/crudPage.vue'),
        children: [
          {
            path: 'create',
            name: 'crud-create',
            component: () => import('../views/Admin/Crud/createPage.vue')
          },
          {
            path: 'all',
            name: 'crud-all',
            component: () => import('../views/Admin/Crud/allProductsPage.vue')
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

// TODO Checks for user role. If admin then allows to enter, else redirects
function checkForRole(to: Route, from: Route, next: NavigationGuardNext<Vue>): void {

  // const userData = store.getters.getUserData as UserData;
  // if(userData.role !== 'admin') {
  //   // console.log(userData.role)
  //   next({ name: 'products'});
  // }
  // next({ name: 'admin-main' });

  // if(store.getters.getUserData) {
  //   Promise.all([
  //     store.getters.getUserData
  //   ])
  // } else {

  // }

}

export default router
