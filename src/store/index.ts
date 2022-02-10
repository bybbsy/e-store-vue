import Vue from 'vue'
import Vuex from 'vuex'

import { State as AuthState } from '@/types/store/auth/state-types';
import { State as ProductsState } from '@/types/store/products/state-types';

import { moduleAuth } from './auth';
import { moduleProducts } from './products'

export type RootState = {
  auth: AuthState,
  products: ProductsState
}
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    moduleAuth,
    moduleProducts
  }
})
