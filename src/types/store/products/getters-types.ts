import { CardProduct, State } from "./state-types";


export type getters = {
  getProducts(state: State): Array<CardProduct>
}
