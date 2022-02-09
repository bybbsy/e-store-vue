import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import i18n from './plugins/lang/i18n';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

import { firebaseConfig } from '../firebase.config';

Vue.config.productionTip = false

firebase.initializeApp(firebaseConfig);

let app: Vue;

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      i18n,
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
