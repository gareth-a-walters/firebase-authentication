import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUser
} from 'firebase/auth'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import type { UserContextValues } from 'context/user/types'

import { auth } from '../../firebaseConfig'

const UserContext = createContext({} as UserContextValues)
const { Provider } = UserContext

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
      setUser(firebaseUser)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.log(error)
    }
    return null
  }, [])

  const logout = useCallback(async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const value = useMemo(() => ({
    loading,
    isLoggedIn: !!user,
    user,
    login,
    logout
  }), [loading, user, login, logout])

  return (
    <Provider value={value}>
      {children}
    </Provider>
  )
}

export const useUserContext = () => useContext(UserContext)
