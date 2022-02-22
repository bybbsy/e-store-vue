import { ActionContext } from "vuex";
import { State, User, UserData, UserFull } from './state-types';
import { RootState } from '@/store/index';

export enum ActionTypes {
  login = 'LOGIN',
  logout = "LOGOUT",
  register = "REGISTER",
  getUid = "getUid",
  setUserData = "setUserData"
}

export interface Actions {
  [ActionTypes.login]({commit}: ActionContext<State, RootState>, payload: User): void,
  [ActionTypes.logout]({commit}: ActionContext<State, RootState>): void,
  [ActionTypes.register]({commit}: ActionContext<State, RootState>, payload: UserFull): void
  [ActionTypes.getUid](): ( string | null)
  [ActionTypes.setUserData]({commit}: ActionContext<State, RootState>, payload: UserData): void
}
