import { State } from "@/types/store/auth/state-types";

export const state: State = {
  user: {
    email: '',
    password: ''
  },
  userFull: {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  },
  userData: {
    firstName: '',
    lastName: '',
    email: '',
    coupons: [],
    cart: []
  }
}
