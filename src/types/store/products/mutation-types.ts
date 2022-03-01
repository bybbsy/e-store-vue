import { CardComment, DetailProduct, Product, CartProduct, State } from "./state-types";

export enum MutationTypes {
  setProducts = 'SET_PRODUCTS',
  toggleDetails = "TOGGLE_DETAILS",
  setDetails = "SET_DETAILS",
  setComments = "SET_COMMENTS",
  addToCart = "ADD_TO_CART",
  increaseAmount = "INCREASE_AMOUNT",
  decreaseAmount = "DECREASE_AMOUNT",
  deleteFromCart = "DELETE_FROM_CART",
  setUserCart = "SET_USER_CART"
}

export type Mutations = {
  [MutationTypes.setProducts](state: State, payload: Array<DetailProduct>): void
  [MutationTypes.toggleDetails](state: State): void
  [MutationTypes.setDetails](state: State, payload: DetailProduct): void
  [MutationTypes.addToCart](state: State, payload: CartProduct): void
  [MutationTypes.increaseAmount](state: State, payload: CartProduct): void,
  [MutationTypes.decreaseAmount](state: State, payload: CartProduct): void,
  [MutationTypes.deleteFromCart](state: State, payload: CartProduct): void,
  [MutationTypes.setUserCart](state: State, payload: Array<CartProduct>): void
}
