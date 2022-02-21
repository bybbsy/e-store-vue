import { Actions, ActionTypes } from "@/types/store/products/actions-types";
import { State } from "@/types/store/products/state-types";
import { ActionTree } from "vuex";
import { RootState } from "..";
import firebase from "firebase/compat";

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.fetchProducts]({commit}) {
    const snapshot = await firebase.firestore().collection('products').get();
    const receivedProducts = snapshot.docs.map(doc => doc.data());

    const comments = await firebase.database().ref('/comments').get().then(snap => snap.val())

    console.log(comments)

    commit('SET_PRODUCTS', receivedProducts);
  },
  [ActionTypes.toggleDetails]({commit}) {
    commit('TOGGLE_DETAILS');
  },
  [ActionTypes.fecthComments]({commit}, producitId) {
    console.log(producitId);
  }
}
