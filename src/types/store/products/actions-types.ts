import { RootState } from "@/store";
import { ActionContext } from "vuex";
import { CardComment, CartProduct, DetailProduct, Product, State } from "./state-types";

export enum ActionTypes {
  fetchProducts = "fetchProducts",
  toggleDetails = "toggleDetails",
  setDetails = "setDetails",
  addToCart = "addToCart",
  removeFromCart = "removeFromCart",
  setUserCart = "setUserCart"
}

type ActionCtx = ActionContext<State, RootState>;

export type Actions = {
  [ActionTypes.fetchProducts]({commit}: ActionCtx, category: string): void
  [ActionTypes.toggleDetails]({commit}: ActionCtx): void
  [ActionTypes.setDetails]({commit}: ActionCtx, payload: Product): void,
  [ActionTypes.addToCart]({commit, state}: ActionCtx, payload: Product | DetailProduct | CartProduct): void,
  [ActionTypes.removeFromCart]({commit, state}: ActionCtx, payload: CartProduct): void
  [ActionTypes.setUserCart]({commit}: ActionCtx, payload: Array<CartProduct>): void
}
