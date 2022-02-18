import { CardProduct, State } from "./state-types";

export enum MutationTypes {
  setProducts = 'SET_PRODUCTS'
}

export type Mutations = {
  [MutationTypes.setProducts](state: State, payload: Array<CardProduct>): void
}
