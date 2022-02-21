import { Getters } from "@/types/store/products/getters-types";
import { State } from "@/types/store/products/state-types";
import { GetterTree } from "vuex";
import { RootState } from "..";

export const getters: GetterTree<State, RootState> & Getters = {
  getProducts(state) {
    return state.products;
  },
  getDetailsExpanded(state) {
    return state.productDetails;
  }
}
