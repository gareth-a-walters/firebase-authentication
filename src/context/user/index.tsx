import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUser,
  updateProfile,
  UserCredential,
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

  console.log(user)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
      setUser(firebaseUser)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const updateUserProfile = useCallback(async (
    user: FirebaseUser,
    username: string,
    photo: string
  ) => {
    setLoading(true)
    try {
      await updateProfile(user, { displayName: username, photoURL: photo })
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }, [])

  const register = useCallback(async (
    username: string,
    email: string,
    password: string,
    photo: string
  ) => {
    setLoading(true)
    try {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential: UserCredential) => {
          await updateUserProfile(userCredential.user, username, photo)
        })
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }, [updateUserProfile])

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
    isLoggedIn: !!user,
    loading,
    user,
    updateUserProfile,
    register,
    login,
    logout
  }), [
    loading,
    user,
    updateUserProfile,
    register,
    login,
    logout
  ])

  return (
    <Provider value={value}>
      {!loading && children}
    </Provider>
  )
}

export const useUserContext = () => useContext(UserContext)
