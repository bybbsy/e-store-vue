import { CardProduct, State } from "./state-types";

export enum MutationTypes {
  setProducts = 'SET_PRODUCTS',
  toggleDetails = "TOGGLE_DETAILS"
}

export type Mutations = {
  [MutationTypes.setProducts](state: State, payload: Array<CardProduct>): void
  [MutationTypes.toggleDetails](state: State): void
}
