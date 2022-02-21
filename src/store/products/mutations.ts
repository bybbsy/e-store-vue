import { Mutations, MutationTypes } from "@/types/store/products/mutation-types";
import { State } from "@/types/store/products/state-types";
import { MutationTree } from "vuex";



export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.setProducts](state, payload) {
    state.products = payload;
  },
  [MutationTypes.toggleDetails](state) {
    state.productDetails = !state.productDetails
  }
}
