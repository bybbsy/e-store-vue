import { State } from "@/types/store/navbar/state-types";
import { Actions, ActionsTypes } from "@/types/store/navbar/actions-types";
import { ActionTree } from "vuex";
import { RootState } from "..";

export const actions: ActionTree<State, RootState> & Actions = {
  [ActionsTypes.toggleNavbar]({ commit }) {
    commit('TOGGLE_NAVBAR')
  }
}
