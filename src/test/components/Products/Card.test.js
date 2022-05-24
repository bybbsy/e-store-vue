import Vue from "vue";
import Vuex from 'vuex';

import { render, screen, fireEvent, cleanup, findByTestId, findByText } from "@testing-library/vue";

import Card from '../../../components/Products/Card.vue'
import { getters } from '../../../store/products/getters'
import { actions } from '../../../store/products/actions'
import { mutations } from "../../../store/products/mutations";

import { productBackgroundColors } from '../../../variables';
import { mockProduct, emptyDetailProduct, addBtnRole, rmBtnRole, cardImageRole, createStore  } from "../../variables";

Vue.use(Vuex);

// OK
test('Can add and remove item from cart', async () => {

  const store = createStore();

  const { getByRole } = render(Card, {
    store,
    props: {
      product: mockProduct
    }
  })

  // Gets cart length/size
  const cartSize = () => store.getters.getProductsCartLength;

  const addButton = getByRole(addBtnRole);
  await fireEvent.click(addButton);
  expect(cartSize()).toBe(1);



  const removeButton = getByRole(rmBtnRole);
  await fireEvent.click(removeButton);

  expect(cartSize()).toBe(0);

  cleanup();

  // Will fail because cartSize is 0
  // expect(cartSize()).toBe(1);

  // screen.debug();
})

// OK
test('Cant add a product twice', async () => {
  const store = createStore();

  const { getByRole } = render(Card, {
    store,
    props: {
      product: mockProduct
    }
  })

  const prevCart = store.getters.getProductsCartLength;

  const addButton = getByRole(addBtnRole);

  expect(addButton).toBeTruthy();

  await fireEvent.click(addButton);
  await fireEvent.click(addButton);

  const updatedCart = store.getters.getProductsCartLength;

  expect(prevCart === updatedCart);

  cleanup();
})

// OK
test('Add button is not displayed after it was clicked', async () => {
  const store = createStore();

  const { getByRole, queryByRole } = render(Card, {
    store,
    props: {
      product: mockProduct
    }
  })

  let addButton = getByRole(addBtnRole);

  await fireEvent.click(addButton);

  addButton = queryByRole(addBtnRole)

  expect(addButton).toBeFalsy();
})

// OK
test('Remove button is displayed after add button was clicked', async () => {
  const store = createStore();

  const { getByRole, container } = render(Card, {
    store,
    props: {
      product: mockProduct
    }
  })

  const addButton = getByRole(addBtnRole)

  await fireEvent.click(addButton)

  const removeButton = getByRole(rmBtnRole);

  expect(removeButton).toBeTruthy();
  cleanup();
})

// OK
test('Image is displayed', async () => {
  const store = createStore();

  const { getByRole } = render(Card, {
    store,
    props: {
      product: mockProduct
    }
  })

  const image = getByRole(cardImageRole);

  // screen.debug(image);

  expect(image).toBeTruthy();
})

// test('getClass returns class for food category', () => {
//   const store = createStore();

//   const { container } = render(Card, {
//     store,
//     props: {
//       product: mockProduct
//     }
//   })

//   console.warn(container.firstChild.className)
//   const cardClassList = container.firstChild.className.split(' ');

//   expect(cardClassList.includes(productBackgroundColors['food'])).toBeTruthy();
// })

// test('getClass returns class for health category', () => {
//   const store = createStore();

//   const { container } = render(Card, {
//     store,
//     props: {
//       product: (() => {
//         mockProduct.category = 'health'
//         return mockProduct;
//       })()
//     }
//   })

//   const cardClassList = container.firstChild.className.split(' ');

//   // console.log(cardClassList.includes(productBackgroundColors['food']))
//   expect(cardClassList.includes(productBackgroundColors['health'])).toBeTruthy();

//   // screen.debug()
// })

// test('getClass returns class for toys category', () => {

//   const store = createStore();

//   const { container } = render(Card, {
//     store,
//     props: {
//       product: (() => {
//         mockProduct.category = 'toys'
//         return mockProduct;
//       })()
//     }
//   })

//   const cardClassList = container.firstChild.className.split(' ');

//   // console.log(cardClassList.includes(productBackgroundColors['food']))
//   expect(cardClassList.includes(productBackgroundColors['toys'])).toBeTruthy();

//   // screen.debug()
// })

// test('getClass doesnt return class for other category', () => {
//   const store = createStore();

//   const { container } = render(Card, {
//     store,
//     props: {
//       product: (() => {
//         mockProduct.category = 'new category'
//         return mockProduct;
//       })()
//     }
//   })

//   const cardClassList = container.firstChild.className.split(' ');

//   // console.log(cardClassList.includes(productBackgroundColors['food']))
//   expect(cardClassList.includes(productBackgroundColors['new category'])).toBeFalsy();

//   // screen.debug()
// })
