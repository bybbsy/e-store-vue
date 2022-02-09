import Vue from 'vue'
import Vuex from 'vuex'

import { State as AuthState } from '@/types/store/auth/state-types';

import { moduleAuth } from './auth';

export type RootState = {
  auth: AuthState
}

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    moduleAuth
  }
})
