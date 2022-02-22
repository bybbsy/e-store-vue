import { MutationsTypes, Mutations } from "@/types/store/auth/mutations-types";
import { State } from "@/types/store/auth/state-types";
import { MutationTree } from "vuex";


export const mutations: MutationTree<State> & Mutations = {
  [MutationsTypes.setUserData](state, payload) {
    state.userData = payload;
  }
}
