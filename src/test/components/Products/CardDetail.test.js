import Vue from 'vue';
import Vuex from 'vuex';

import { render, screen } from "@testing-library/vue";

import CardDetail from '../../../components/Products/CardDetail.vue';
import { createStore, mockDetails } from '../../variables';

Vue.use(Vuex);

// test('Check if the comments render', () => {
//   const store = createStore();

//   render(CardDetail, {
//     store
//   });

//   expect(store.getters.getDetails.comments.length).toBe(0);
//   expect(store.getters.getDetails.comments.length).not.toBeGreaterThan(0);
// })

test('Click on close button closes card', () => {
  const store = createStore(mockDetails);


  const { getByRole, container } = render(CardDetail, {
    store,
  });



  // expect()
})
