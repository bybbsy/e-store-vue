import { ActionTypes, Actions } from "@/types/store/auth/actions-types";
import { State } from "@/types/store/auth/state-types";
import { ActionTree } from "vuex";
import { RootState } from "..";
import firebase from "firebase/compat";

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionTypes.login]({commit}, {email, password}) {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      console.error(e);
    }
  },
  async [ActionTypes.logout]() {
    await firebase.auth().signOut();
  },
  async [ActionTypes.register]({commit}, {email, password, firstName, lastName}) {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      const uid = firebase.auth().currentUser?.uid ?? '1';
      await firebase.database().ref(`/users/${uid}/info`).set({
        firstName,
        lastName
      })
    } catch(e) {
      console.log(e);
    }
  },
  [ActionTypes.getUid]() {
    const user = firebase.auth().currentUser;
    return user ? user.uid : null;
  }
}
