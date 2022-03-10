import { Actions, ActionTypes } from "@/types/store/products/actions-types";
import { CardComment, CartProduct, State } from "@/types/store/products/state-types";
import { ActionTree } from "vuex";
import { RootState } from "..";
import firebase from "firebase/compat";
import _ from 'lodash';
import { isProductInACart, getProductIndex, getProductMutateData } from '@/helpers/useProducts';

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

    for(let i = 0; i < commentData.length; i++) {
      const userRaw = await firebase.database().ref('/users/' + <CardComment>commentData[i].userID).get();
      const userData = await userRaw.val();
      commentData[i].username = `${userData.info.firstName} ${userData.info.lastName}`;
      commentData[i].userImage = userData.info.imgLink;
    }


    console.log(commentData)

    _.assign(payload, {
      comments: commentData
    })

    commit('SET_DETAILS', payload)
  },
  [ActionTypes.addToCart]({commit, state, getters}, payload) {
    // TODO Implement as a helper, to use it in other components
    // Checks whether the product in a cart
    const inACart = isProductInACart(state.productsCart, payload);

    // If not, creates base cart product object and then adds to cart
    if(!inACart) {
      const cartProduct = Object.assign(payload, {
        count: 1
      })
      commit('ADD_TO_CART', cartProduct)
    }
    // Else increases amount of current product in cart
    else {
      const { index, product } = getProductMutateData(state.productsCart, payload);

      product.count++;

      commit('CHANGE_PRODUCT_AMOUNT', { index, product })
    }
  },
  [ActionTypes.removeFromCart]({commit, state}, payload) {
    const inACart = isProductInACart(state.productsCart, payload);

    if(inACart && payload.count > 1) {
      const { index, product } = getProductMutateData(state.productsCart, payload);

      product.count--;

      commit('CHANGE_PRODUCT_AMOUNT', { index, product })
    } else {
      commit('DELETE_FROM_CART', inACart)
    }
  },
  [ActionTypes.setUserCart]({commit}, payload) {
    commit('SET_USER_CART', payload)
  }
}
