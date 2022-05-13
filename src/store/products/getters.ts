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
  },
  getDetails(state) {
    return state.currentProduct;
  },
  getProductsCartLength(state) {
    return state.productsCart.reduce((previous, current) => {
      return previous += current.count
    }, 0)
  },
  getProductsCart(state) {
    return state.productsCart;
  },
  getProductsCategories(state) {
    return state.productCategories;
  },
  getCurrencyTypes(state) {
    return state.currencyTypes;
  }
}
