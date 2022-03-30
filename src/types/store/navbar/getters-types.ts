import { navbarState, State } from "./state-types";

export type Getters = {
  navbarIsExpanded(state: State): navbarState
}
