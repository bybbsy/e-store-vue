import { RootState } from "@/store";
import { ActionContext } from "vuex";
import { CardComment, Product, State } from "./state-types";

export enum ActionTypes {
  fetchProducts = "fetchProducts",
  toggleDetails = "toggleDetails",
  setDetails = "setDetails"
}

export type Actions = {
  [ActionTypes.fetchProducts]({commit}: ActionContext<State, RootState>): void
  [ActionTypes.toggleDetails]({commit}: ActionContext<State, RootState>): void
  [ActionTypes.setDetails]({commit}: ActionContext<State, RootState>, payload: Product): void
}
