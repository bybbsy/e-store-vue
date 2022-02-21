import { RootState } from "@/store";
import { ActionContext } from "vuex";
import { State } from "./state-types";

export enum ActionTypes {
  fetchProducts = "fetchProducts",
  toggleDetails = "toggleDetails",
  fecthComments = "fetchComments"
}

export type Actions = {
  [ActionTypes.fetchProducts]({commit}: ActionContext<State, RootState>): void
  [ActionTypes.toggleDetails]({commit}: ActionContext<State, RootState>): void
  [ActionTypes.fecthComments]({commit}: ActionContext<State, RootState>, producitId: string): void
}
