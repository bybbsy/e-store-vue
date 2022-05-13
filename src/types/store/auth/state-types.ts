
interface Email {
  email: string
}

interface Password {
  password: string
}

interface UserName {
  firstName: string,
  lastName: string
}

interface UserAvatar {
  imgLink: string
}

interface UserRole {
  role: string
}

interface User extends Email, Password {}

interface UserFull extends User, UserName {}

interface UserData extends UserName, Email, UserAvatar, UserRole {
  coupons: [],
  cart: []
}

interface State {
  user: User,
  userFull: UserFull,
  userData: UserData
}

export { User, UserFull, UserData, State }
