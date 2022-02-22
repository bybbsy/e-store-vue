import { CardComment, DetailProduct, State } from "./state-types";

export enum MutationTypes {
  setProducts = 'SET_PRODUCTS',
  toggleDetails = "TOGGLE_DETAILS",
  setDetails = "SET_DETAILS",
  setComments = "SET_COMMENTS"
}

export type Mutations = {
  [MutationTypes.setProducts](state: State, payload: Array<DetailProduct>): void
  [MutationTypes.toggleDetails](state: State): void
  [MutationTypes.setDetails](state: State, payload: DetailProduct): void
}
