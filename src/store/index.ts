import Vue from 'vue'
import Vuex from 'vuex'

import { State as AuthState } from '@/types/store/auth/state-types';
import { State as ProductsState } from '@/types/store/products/state-types';
import { State as NavbarState } from '@/types/store/navbar/state-types';

import { moduleAuth } from './auth';
import { moduleProducts } from './products'
import { moduleNavbar } from './navbar';
export type RootState = {
  auth: AuthState,
  products: ProductsState,
  navbar: NavbarState
}
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    moduleAuth,
    moduleProducts,
    moduleNavbar
  }
})
