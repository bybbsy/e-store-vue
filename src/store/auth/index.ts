import { State } from "@/types/store/auth/state-types";
import { Module } from "vuex";
import { RootState } from "..";
import { state } from "./state";
import { actions } from "./actions";

export const moduleAuth: Module<State, RootState> = {
  state,
  actions
}
