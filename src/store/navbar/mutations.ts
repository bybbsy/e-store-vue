import { Mutations, MutationsTypes } from "@/types/store/navbar/mutations-types";
import { State } from "@/types/store/navbar/state-types";
import { MutationTree } from "vuex";

export const mutations: MutationTree<State> & Mutations = {
  [MutationsTypes.TOGGLE_NAVBAR](state) {
    state.navbarExpanded = !state.navbarExpanded;
  }
}
