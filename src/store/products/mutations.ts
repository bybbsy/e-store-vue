import { Mutations, MutationTypes } from "@/types/store/products/mutation-types";
import { State } from "@/types/store/products/state-types";
import _ from "lodash";
import { MutationTree } from "vuex";

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.setProducts](state, payload) {
    state.products = payload;
  },
  [MutationTypes.toggleDetails](state) {
    state.productDetails = !state.productDetails
  },
  [MutationTypes.setDetails](state, payload) {
    state.currentProduct = payload;
  },
  [MutationTypes.addToCart](state, payload) {
    state.productsCart.unshift(payload);
  },
  [MutationTypes.increaseAmount](state, payload) {
    payload.count += 1;
  },
  [MutationTypes.decreaseAmount](state, payload) {
    payload.count -= 1;
  },
  [MutationTypes.deleteFromCart](state, payload) {
    _.remove(state.productsCart, payload)
  }
}
