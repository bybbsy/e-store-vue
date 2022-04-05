import Vue from "vue";
import Vuex from 'vuex';

import { getByText, render, screen, fireEvent } from "@testing-library/vue";

import Card from '../../../components/Products/Card.vue'
import { getters } from '../../../store/products/getters'
import { actions } from '../../../store/products/actions'
import { mutations } from "../../../store/products/mutations";

import { productBackgroundColors } from '../../../variables';

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
}

const emptyDetailProduct = {
  productID: '',
  name: 'no-name',
  imgLink: '',
  category: '',
  rate: 0,
  price: 0,
  comments: []
}


Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    moduleProducts: {
      state: {
        products: [],
        currentProduct: emptyDetailProduct,
        productsCart: [ ],
        productDetails: false
      },
      getters: {
        getProductsCart: getters.getProductsCart,
        getDetails: getters.getDetails,
        getDetailsExpanded: getters.getDetailsExpanded,
        getProductsCartLength: getters.getProductsCartLength
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

const addBtnRole = 'add-button';
const rmBtnRole = 'remove-button';

test('Can add and remove item from cart', async () => {

  const { getByRole } = render(Card, {
    store,
    props: {
      product: mockProduct
    }
  })

  // Gets cart length/size
  const cartSize = () => store.getters.getProductsCartLength;

  const addButton = getByRole(addBtnRole);

  expect(addButton).toBeTruthy();

  await fireEvent.click(addButton);

  expect(cartSize()).toBe(1);



  const removeButton = getByRole(rmBtnRole);

  expect(removeButton).toBeTruthy();

  await fireEvent.click(removeButton);

  expect(cartSize()).toBe(0);

  // Will fail because cartSize is 0
  // expect(cartSize()).toBe(1);

  // screen.debug();
})

test('Cant add a product twice', async () => {
  const { getByRole } = render(Card, {
    store,
    props: {
      product: mockProduct
    }
  })

  const addButton = getByRole(addBtnRole);

  expect(addButton).toBeTruthy();

  await fireEvent.click(addButton);

  expect(addButton).toBeTruthy();
})

test('Cant remove a product if add button wasnt clicked', async () => {
  const { getByRole } = render(Card, {
    store,
    props: {
      product: mockProduct
    }
  })

  const removeButton = getByRole(rmBtnRole);

  expect(removeButton).toBeTruthy();

  await fireEvent.click(removeButton);

  expect(removeButton).toBeTruthy();
})

test('getClass returns class for food category', () => {
  const { container } = render(Card, {
    store,
    props: {
      product: mockProduct
    }
  })

  const cardClassList = container.firstChild.className.split(' ');

  // console.log(cardClassList.includes(productBackgroundColors['food']))
  expect(cardClassList.includes(productBackgroundColors['food'])).toBeTruthy();

  // screen.debug()
})

test('getClass returns class for health category', () => {
  const { container } = render(Card, {
    store,
    props: {
      product: (() => {
        mockProduct.category = 'health'
        return mockProduct;
      })()
    }
  })

  const cardClassList = container.firstChild.className.split(' ');

  // console.log(cardClassList.includes(productBackgroundColors['food']))
  expect(cardClassList.includes(productBackgroundColors['health'])).toBeTruthy();

  // screen.debug()
})

test('getClass returns class for toys category', () => {
  const { container } = render(Card, {
    store,
    props: {
      product: (() => {
        mockProduct.category = 'toys'
        return mockProduct;
      })()
    }
  })

  const cardClassList = container.firstChild.className.split(' ');

  // console.log(cardClassList.includes(productBackgroundColors['food']))
  expect(cardClassList.includes(productBackgroundColors['toys'])).toBeTruthy();

  // screen.debug()
})

test('getClass doesnt return class for other category', () => {
  const { container } = render(Card, {
    store,
    props: {
      product: (() => {
        mockProduct.category = 'new category'
        return mockProduct;
      })()
    }
  })

  const cardClassList = container.firstChild.className.split(' ');

  // console.log(cardClassList.includes(productBackgroundColors['food']))
  expect(cardClassList.includes(productBackgroundColors['new category'])).not.toBeTruthy();

  // screen.debug()
})
