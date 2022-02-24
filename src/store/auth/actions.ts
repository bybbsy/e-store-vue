import { ActionTypes, Actions } from "@/types/store/auth/actions-types";
import { State } from "@/types/store/auth/state-types";
import { ActionTree } from "vuex";
import { RootState } from "..";
import firebase from "firebase/compat";
import { userIsAuthorized } from "@/helpers/auth";

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.login]({commit}, {email, password}) {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  },
  async [ActionTypes.logout]({commit}) {
    await firebase.auth().signOut();
  },

  async [ActionTypes.register]({commit}, {email, password, firstName, lastName}) {
    await firebase.auth().createUserWithEmailAndPassword(email, password);

    const uid = userIsAuthorized();

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
  [ActionTypes.setUserData]({commit}, payload) {
    commit('SET_USER_DATA', payload);
  }
}
