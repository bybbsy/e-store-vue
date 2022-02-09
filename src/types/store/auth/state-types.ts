interface User {
  email: string,
  password: string
}

interface UserFull extends User {
  firstName: string,
  lastName: string
}

interface State {
  user: User,
  userFull: UserFull
}

export { User, UserFull, State }
