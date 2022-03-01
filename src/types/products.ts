import { CartProduct, Product } from "./store/products/state-types";

type ProductOrNot = Product | CartProduct | boolean

export { ProductOrNot };
