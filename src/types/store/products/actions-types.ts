import { RootState } from "@/store";
import { ActionContext } from "vuex";
import { State } from "./state-types";

export enum ActionTypes {
  fetchProducts = "FETCH_PRODUCTS"
}

export type Actions = {
  [ActionTypes.fetchProducts]({commit}: ActionContext<State, RootState>): void
}
