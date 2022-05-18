import type { UserDetails } from 'entities/UserDetails'
import type { User as FirebaseUser } from 'firebase/auth'

export type UserContextValues = {
  isLoggedIn: boolean
  user: FirebaseUser | null
  userDetails: UserDetails | null
  loading: boolean
  updateUserDetails: (user: FirebaseUser, displayName: string) => Promise<void>
  uploadUserPhoto: (user: FirebaseUser, uri: string) => Promise<void>
  register: (username: string, email: string, password:string) => Promise<void>
  login: (email: string, password: string) => Promise<null>
  logout: () => Promise<void>
}
