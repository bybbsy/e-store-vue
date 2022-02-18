import { State } from "@/types/store/products/state-types";
import { GetterTree } from "vuex";
import { RootState } from "..";

export const getters: GetterTree<State, RootState> = {
  getProducts(state) {
    return state.products;
  }
}
