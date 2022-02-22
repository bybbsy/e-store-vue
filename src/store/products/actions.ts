import { Actions, ActionTypes } from "@/types/store/products/actions-types";
import { State } from "@/types/store/products/state-types";
import { ActionTree } from "vuex";
import { RootState } from "..";
import firebase from "firebase/compat";
import _ from 'lodash';

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.fetchProducts]({commit}) {
    const snapshot = await firebase.firestore().collection('products').get();
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
    const commentsRaw = await (await firebase.database().ref('/comments').get()).val();
    const comments = _.toArray(commentsRaw).filter(el => el?.productId === payload.productID);

    // const users = comments.forEach( async (el) => {
    //   if(payload.productID === el.productId) {
    //     const usernameRaw =  await firebase.database().ref(`/users/${el.userId}/info`).get();
    //     const usernameR =  usernameRaw.val()

    //     const username = await usernameR.firstName;
    //     el.username = username;
    //     console.log(el)
    //     return el;
    //   }
    // })

    _.assign(payload, {
      comments: comments
    })

    commit('SET_DETAILS', payload)
  }
}
