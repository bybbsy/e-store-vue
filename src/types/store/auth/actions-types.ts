import { ActionContext } from "vuex";
import { State, User, UserFull } from './state-types';
import { RootState } from '@/store/index';

export enum ActionTypes {
  login = 'LOGIN',
  logout = "LOGOUT",
  register = "REGISTER"
}

export interface Actions {
  [ActionTypes.login]({commit}: ActionContext<State, RootState>, payload: User): void,
  [ActionTypes.logout](): void,
  [ActionTypes.register]({commit}: ActionContext<State, RootState>, payload: UserFull): void
}
