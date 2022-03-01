import { CartProduct, Product } from "@/types/store/products/state-types";
import { ProductOrNot } from "@/types/products";

function isProductInACart(productsCart: Array<CartProduct>, payload: CartProduct | Product): ProductOrNot {
  return productsCart.find((el) => el.productID === payload.productID) ?? false;
}

export { isProductInACart };
