import Vue from 'vue';
import Vuex from 'vuex';

import { render, screen } from "@testing-library/vue";

import CardDetail from '../../../components/Products/CardDetail.vue';

import { getters } from '../../../store/products/getters'
import { actions } from '../../../store/products/actions'
import { mutations } from "../../../store/products/mutations";

Vue.use(Vuex);

const emptyDetailProduct = {
  productID: '',
  name: 'no-name',
  imgLink: '',
  category: '',
  rate: 0,
  price: 0,
  comments: []
}

const mockProduct = {
  productID: '1',
  name: 'Mock product',
  imgLink: 'link',
  category: 'food',
  subcategory: 'bars',
  currency: '$',
  price: 10,
  rate: 1,
  description: 'Description',
  comments: []
}

const store = new Vuex.Store({
  modules: {
    moduleProducts: {
      state: {
        products: [],
        currentProduct: mockProduct,
        productsCart: [ ],
        productDetails: false
      },
      getters: {
        getProductsCart: getters.getProductsCart,
        getDetails: getters.getDetails,
      },
      actions: {
        setDetails: actions.setDetails,
        addToCart: actions.addToCart,
        removeFromCart: actions.removeFromCart,
      },
      mutations: {
        ADD_TO_CART: mutations.ADD_TO_CART,
        DELETE_FROM_CART: mutations.DELETE_FROM_CART,
        SET_DETAILS: mutations.SET_DETAILS,
        CHANGE_PRODUCT_AMOUNT: mutations.CHANGE_PRODUCT_AMOUNT
      }
    }
  }
})

const addBtnText = 'Add to cart';
const rmBtnText = 'Remove item';

test('Check if the comments render', () => {
  render(CardDetail, {
    store
  });

  expect(store.getters.getDetails.comments.length).toBe(0);
  expect(store.getters.getDetails.comments.length).not.toBeGreaterThan(0);

})

// test('Can add and remove item from cart', async () => {

//   const { getByText } = render(CardDetail, {
//     store
//   })

//   // Gets cart length/size
//   const cartSize = () => store.getters.getProductsCartLength;

//   const addButton = getByText(addBtnText);

//   expect(addButton).toBeTruthy();

//   await fireEvent.click(addButton);

//   expect(cartSize()).toBe(1);



//   const removeButton = getByText(rmBtnText);

//   expect(removeButton).toBeTruthy();

//   await fireEvent.click(removeButton);

//   expect(cartSize()).toBe(0);

//   // Will fail because cartSize is 0
//   // expect(cartSize()).toBe(1);

//   // screen.debug();
// })

// test('Cant add a product twice', async () => {
//   const { getByText } = render(CardDetail, {
//     store
//   })

//   const addButton = getByText(addBtnText);

//   expect(addButton).toBeTruthy();

//   await fireEvent.click(addButton);

//   expect(addButton).toBeTruthy();
// })

// test('Cant remove a product if add button wasnt clicked', async () => {
//   const { getByText } = render(CardDetail, {
//     store
//   })

//   const removeButton = getByText(rmBtnText);

//   expect(removeButton).toBeTruthy();

//   await fireEvent.click(removeButton);

//   expect(removeButton).toBeTruthy();
// })
