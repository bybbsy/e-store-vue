import { RootState } from "@/store";
import { ActionContext } from "vuex";
import { CartProduct, Product, State, AnyProduct } from "./state-types";

type ActionCtx = ActionContext<State, RootState>;

export enum ActionTypes {
  fetchProducts = "fetchProducts",
  toggleDetails = "toggleDetails",
  setDetails = "setDetails",
  addToCart = "addToCart",
  removeFromCart = "removeFromCart",
  setUserCart = "setUserCart",
  setProducts = "setProducts"
}

export type Actions = {
  [ActionTypes.fetchProducts]({commit}: ActionCtx, category: string): void
  [ActionTypes.toggleDetails]({commit}: ActionCtx): void
  [ActionTypes.setDetails]({commit}: ActionCtx, payload: Product): void,
  [ActionTypes.addToCart]({commit, state}: ActionCtx, payload: AnyProduct): void,
  [ActionTypes.removeFromCart]({commit, state}: ActionCtx, payload: CartProduct): void
  [ActionTypes.setUserCart]({commit}: ActionCtx, payload: Array<CartProduct>): void
  [ActionTypes.setProducts]({commit}: ActionCtx, payload: Array<Product>): void
}

