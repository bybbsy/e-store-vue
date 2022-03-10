import { Mutations, MutationTypes } from "@/types/store/products/mutation-types";
import { State } from "@/types/store/products/state-types";
import { MutationTree } from "vuex";

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.setProducts](state, payload) {
    state.products = payload;
  },
  [MutationTypes.toggleDetails](state) {
    state.productDetails = !state.productDetails;
  },
  [MutationTypes.setDetails](state, payload) {
    state.currentProduct = payload;
  },
  [MutationTypes.addToCart](state, payload) {
    state.productsCart.unshift(payload);
  },
  [MutationTypes.increaseAmount](state, payload) {
    state.productsCart.splice(payload.index, 1, payload.product);
  },
  [MutationTypes.decreaseAmount](state, payload) {
    state.productsCart.splice(payload.index, 1, payload.product);
  },
  [MutationTypes.deleteFromCart](state, payload) {
    const index = state.productsCart.indexOf(payload);
    state.productsCart.splice(index, 1);
  },
  [MutationTypes.setUserCart](state, payload) {
    state.productsCart = payload;
  }
}
