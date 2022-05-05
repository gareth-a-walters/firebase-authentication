import type { User as FirebaseUser } from 'firebase/auth'

export type UserContextValues = {
  user: FirebaseUser | null
  loading: boolean
  isLoggedIn: boolean
  login: (email: string, password: string) => Promise<null>
  logout: () => Promise<void>
}
