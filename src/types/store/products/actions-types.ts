import { RootState } from "@/store";
import { ActionContext } from "vuex";
import { CardComment, CartProduct, Product, State } from "./state-types";

export enum ActionTypes {
  fetchProducts = "fetchProducts",
  toggleDetails = "toggleDetails",
  setDetails = "setDetails",
  addToCart = "addToCart",
  removeFromCart = "removeFromCart"
}

export type Actions = {
  [ActionTypes.fetchProducts]({commit}: ActionContext<State, RootState>): void
  [ActionTypes.toggleDetails]({commit}: ActionContext<State, RootState>): void
  [ActionTypes.setDetails]({commit}: ActionContext<State, RootState>, payload: Product): void,
  [ActionTypes.addToCart]({commit, state, getters}: ActionContext<State, RootState>, payload: Product): void,
  [ActionTypes.removeFromCart]({commit, state, getters}: ActionContext<State, RootState>, payload: CartProduct): void
}
