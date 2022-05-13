import { CartProduct, Product, DetailProduct, AnyProduct } from "@/types/store/products/state-types";
import { ProductOrNot } from "@/types/products";
import store from '@/store/index';
import { userIsAuthorized } from "./auth";
import firebase from "firebase/compat";
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import _ from "lodash";

function isProductInACart(productsCart: Array<CartProduct>, payload: CartProduct | Product): ProductOrNot {
  return productsCart.find((el) => el.productID === payload.productID) ?? false;
}

function getProductIndex(productsCart: Array<CartProduct>, payload: CartProduct) {
  return productsCart.indexOf(payload);
}

function getProductMutateData(productsCart: Array<CartProduct>, payload: AnyProduct) {
  const index = getProductIndex(productsCart, payload as CartProduct);
  const product = <CartProduct>payload;

  return {
    index,
    product
  }
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

async function findByField(field: string, value: string) {
  const collectionRef = firebase.firestore().collection('products');
  const filteredRaw = await collectionRef.where(field, '==', value).get();
  return filteredRaw.docs.map(item => {
    return {
      productID: item.id,
      ...item.data()
    }
  })
}

async function findById(value: string) {
  if(value.length) {
    const db = getFirestore();

    const snap = await getDoc(doc(db, 'products', value ));

    if(snap.exists()) {
      return [{
        productID: snap.id,
        ...snap.data()
      }]
    }

    return [];
  }
}

export {
  isProductInACart,
  toggleDetails,
  sendCartToFirebase,
  getProductIndex,
  getProductMutateData,
  findByField,
  findById
};

