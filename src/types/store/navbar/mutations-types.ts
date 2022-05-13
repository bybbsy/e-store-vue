import { State } from "./state-types";

export enum MutationsTypes {
  TOGGLE_NAVBAR = 'TOGGLE_NAVBAR'
}

export type Mutations = {
  [MutationsTypes.TOGGLE_NAVBAR](state: State): void
}
