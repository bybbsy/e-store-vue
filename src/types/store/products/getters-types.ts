import { Product, State } from "./state-types";


export type Getters = {
  getProducts(state: State): Array<Product>,
  getDetailsExpanded(state: State): boolean
}
