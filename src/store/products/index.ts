import { State } from "@/types/store/products/state-types";
import { Module } from "vuex";
import { RootState } from "..";
import { state } from "./state";


export const moduleProducts: Module<State, RootState> = {
  state
}
