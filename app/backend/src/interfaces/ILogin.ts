export interface ILogin {
  email: string,
  password: string,
}

export interface IUser {
  id: number,
  username: string,
  email: string,
  role: string,
}

export interface IUserWithPassword extends IUser {
  password: string
}
