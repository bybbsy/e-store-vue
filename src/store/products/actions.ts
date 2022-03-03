import { Actions, ActionTypes } from "@/types/store/products/actions-types";
import { CardComment, CartProduct, State } from "@/types/store/products/state-types";
import { ActionTree } from "vuex";
import { RootState } from "..";
import firebase from "firebase/compat";
import _ from 'lodash';
import { isProductInACart } from '@/helpers/useProducts';

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.fetchProducts]({commit}, category) {
    const collectionRef = firebase.firestore().collection('products');

    let snapshot;

    if(category) {
      snapshot = await collectionRef.where('category', '==', category).get();
    } else {
      snapshot = await collectionRef.get();
    }


    const receivedProducts = snapshot.docs.map(doc => {
      return {
        productID: doc.id,
        ...doc.data()
      }
    });

    commit('SET_PRODUCTS', receivedProducts);
  },

  [ActionTypes.toggleDetails]({commit}) {
    commit('TOGGLE_DETAILS');
  },
  async [ActionTypes.setDetails]({commit}, payload) {
    const commentsRaw = await firebase.database().ref('/comments').get();

    const commentData = await commentsRaw.val().filter((el: CardComment) => el.productID ===  payload.productID)

    // const usersRaw = await (await firebase.database().ref('/users').get()).val()

    // const userData = await commentData.forEach(async (el: CardComment) => {
    //   return await (await firebase.database().ref(`/users/${el.userID}/info`).get()).val();
    // })


    _.assign(payload, {
      comments: commentData
    })

    commit('SET_DETAILS', payload)
  },
  [ActionTypes.addToCart]({commit, state, getters}, payload) {
    // TODO Implement as a helper, to use it in other components
    const inACart = isProductInACart(state.productsCart, payload);

    if(!inACart) {
      const cartProduct = _.assign(payload, {
        count: 1
      })
      commit('ADD_TO_CART', cartProduct)
    } else {

      commit('INCREASE_AMOUNT', inACart)
    }
  },
  [ActionTypes.removeFromCart]({commit, state}, payload) {
    const inACart = isProductInACart(state.productsCart, payload);

    if(inACart && payload.count > 1) {
      commit('DECREASE_AMOUNT', inACart)
    } else {
      commit('DELETE_FROM_CART', inACart)
    }
  },
  [ActionTypes.setUserCart]({commit}, payload) {
    commit('SET_USER_CART', payload)
  }
}
