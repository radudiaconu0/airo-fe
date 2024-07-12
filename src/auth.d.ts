export interface Credentials {
  email: string
  password: string
}

export interface User {
  id: number
  name: string
  email: string
}

export interface Auth {
  login(credentials: Credentials): Promise<void>
  logout(): Promise<void>
  getUser(): User
  isAuthenticated(): boolean
}
