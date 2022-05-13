import { State } from "@/types/store/auth/state-types";

export const state: State = {
  user: {
    email: '',
    password: '',
  },
  userFull: {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  },
  userData: {
    imgLink: 'https://cdn.iconscout.com/icon/free/png-256/profile-417-1163876.png',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    coupons: [],
    cart: []
  }
}
