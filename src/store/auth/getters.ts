import { State } from "@/types/store/auth/state-types";
import { Getters } from "@/types/store/auth/getters-types";
import { GetterTree } from "vuex";
import { RootState } from "..";
import firebase from "firebase/compat";

export const getters: GetterTree<State, RootState> & Getters = {
  getUserData(state) {
    return state.userData;
  }
}
