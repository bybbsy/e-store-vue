import { RootState } from "@/store";
import { State } from '@/types/store/navbar/state-types';
import { ActionContext } from "vuex";

type ActionCtx = ActionContext<State, RootState>;

export enum ActionsTypes {
  toggleNavbar = 'toggleNavbar'
}

export type Actions = {
  [ActionsTypes.toggleNavbar]({ commit }: ActionCtx): void
}
