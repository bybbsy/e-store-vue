import { CartProduct, Product, DetailProduct } from "@/types/store/products/state-types";
import { ProductOrNot } from "@/types/products";
import store from '@/store/index';
import { userIsAuthorized } from "./auth";
import firebase from "firebase/compat";
import _ from "lodash";

function isProductInACart(productsCart: Array<CartProduct>, payload: CartProduct | Product): ProductOrNot {
  return productsCart.find((el) => el.productID === payload.productID) ?? false;
}
async function toggleDetails(toggle: boolean, payload: (DetailProduct | Product)) {
  if(toggle) {
    store.dispatch('toggleDetails');
  }
  await store.dispatch('setDetails', payload);
}

function sendCartToFirebase(currentCart: Array<CartProduct>) {
  const deb = _.debounce(async () => {
    const userID = userIsAuthorized();

    if(userID) {
      const cart = JSON.stringify(currentCart);
      await firebase.database().ref(`/users/${userID}/info/cart`).set(cart);
    }
  }, 250)

  return deb()
}

export { isProductInACart, toggleDetails, sendCartToFirebase };
