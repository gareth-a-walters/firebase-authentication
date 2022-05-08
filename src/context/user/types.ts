import type { User as FirebaseUser } from 'firebase/auth'

export type UserContextValues = {
  isLoggedIn: boolean
  user: FirebaseUser | null
  loading: boolean
  updateUserProfile: (user: FirebaseUser, username: string) => void
  register: (username: string, email: string, password:string) => Promise<void>
  login: (email: string, password: string) => Promise<null>
  logout: () => Promise<void>
}
