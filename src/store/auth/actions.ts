import { ActionTypes, Actions } from "@/types/store/auth/actions-types";
import { State } from "@/types/store/auth/state-types";
import { ActionTree } from "vuex";
import { RootState } from "..";
import firebase from "firebase/compat";

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.login]({commit}, {email, password}) {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  },
  async [ActionTypes.logout]({commit}) {
    await firebase.auth().signOut();
  },

  async [ActionTypes.register]({commit}, {email, password, firstName, lastName}) {
    await firebase.auth().createUserWithEmailAndPassword(email, password);

    const uid = firebase.auth().currentUser?.uid ?? null;

    await firebase.database().ref(`/users/${uid}/info`).set({
      coupons: [],
      cart: [],
      firstName,
      lastName,
      email,
    })

    commit('SET_USER_DATA', {
      firsname: firstName,
      lastname: lastName,
      email: email,
      coupons: [],
      cart: []
    })
  },
  [ActionTypes.getUid]() {
    return firebase.auth().currentUser?.uid ?? null;
  },
  [ActionTypes.setUserData]({commit}, payload) {
    commit('SET_USER_DATA', payload);
  }
}
