import { CardProduct, State } from "./state-types";


export type Getters = {
  getProducts(state: State): Array<CardProduct>,
  getDetailsExpanded(state: State): boolean
}
