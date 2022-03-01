import { CartProduct, DetailProduct, Product, State } from "./state-types";


export type Getters = {
  getProducts(state: State): Array<Product>,
  getDetailsExpanded(state: State): boolean,
  getDetails(state: State): DetailProduct,
  getProductsCartLength(state: State): number,
  getProductsCart(state: State): Array<CartProduct>
}
