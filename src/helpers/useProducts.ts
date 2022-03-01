import { CartProduct, Product, DetailProduct } from "@/types/store/products/state-types";
import { ProductOrNot } from "@/types/products";
import store from '@/store/index';

function isProductInACart(productsCart: Array<CartProduct>, payload: CartProduct | Product): ProductOrNot {
  return productsCart.find((el) => el.productID === payload.productID) ?? false;
}
async function toggleDetails(toggle: boolean, payload: (DetailProduct | Product)) {
  if(toggle) {
    store.dispatch('toggleDetails');
  }
  await store.dispatch('setDetails', payload);
}

export { isProductInACart, toggleDetails };
