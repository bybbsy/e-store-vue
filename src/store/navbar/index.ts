import { State } from "@/types/store/navbar/state-types";
import { Module } from "vuex";
import { RootState } from "..";
import { state } from './state';
import { actions } from "./actions";
import { mutations } from "./mutations";
import { getters } from "./getters";

export const moduleNavbar: Module<State, RootState> = {
  state,
  actions,
  mutations,
  getters
}
