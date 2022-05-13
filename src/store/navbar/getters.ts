import { Getters } from "@/types/store/navbar/getters-types";
import { State } from "@/types/store/navbar/state-types";
import { GetterTree } from "vuex";
import { RootState } from "..";

export const getters: GetterTree<State, RootState> & Getters = {
  navbarIsExpanded(state) {
    return state.navbarExpanded;
  }
}
