import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Firebase imports
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

// Firebase config
import { firebaseConfig } from '../firebase.config';

// Plugin imports
import '@/plugins/fontAwesomeIcons';
import i18n from './plugins/lang/i18n';
import { errorHandlerPlugin } from '@/plugins/load';
import Vuelidate from 'vuelidate';
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

firebase.initializeApp(firebaseConfig);

Vue.use(errorHandlerPlugin);
Vue.use(Vuelidate);

let app: Vue;

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      i18n,
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
})
