import { ActionTypes, Actions } from "@/types/store/auth/actions-types";
import { State } from "@/types/store/auth/state-types";
import { ActionTree } from "vuex";
import { RootState } from "..";
import firebase from "firebase/compat";
import Vue from "vue";

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.login]({commit}, {email, password}) {

    Vue.prototype.$load(async () => {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    });

  },
  async [ActionTypes.logout]() {
    await firebase.auth().signOut();
  },
  async [ActionTypes.register]({commit}, {email, password, firstName, lastName}) {
      Vue.prototype.$load(async () => {
        await firebase.auth().createUserWithEmailAndPassword(email, password);

        const uid = firebase.auth().currentUser?.uid ?? null;

        await firebase.database().ref(`/users/${uid}/info`).set({
          firstName,
          lastName
        })
      })
  }
}
