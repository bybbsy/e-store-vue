import { State, UserData } from "./state-types";

export enum MutationsTypes {
  setUserData = "SET_USER_DATA"
}

export interface Mutations {
  [MutationsTypes.setUserData](state: State, payload: UserData): void
}
