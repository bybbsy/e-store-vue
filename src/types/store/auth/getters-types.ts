import { State, UserData, } from "./state-types";

export type Getters = {
  getUserData(state: State): UserData
}
