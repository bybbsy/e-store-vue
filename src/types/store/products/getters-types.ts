import { DetailProduct, Product, State } from "./state-types";


export type Getters = {
  getProducts(state: State): Array<Product>,
  getDetailsExpanded(state: State): boolean,
  getDetails(state: State): DetailProduct
}
