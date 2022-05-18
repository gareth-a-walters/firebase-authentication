import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUser,
  UserCredential,
} from 'firebase/auth'
import {
  setDoc, doc, getDoc, updateDoc
} from 'firebase/firestore'
import {
  getDownloadURL, ref, uploadBytesResumable
} from 'firebase/storage'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import type { UserContextValues } from 'context/user/types'
import type { UserDetails } from 'entities/UserDetails'

import { auth, firestore, storage } from '../../firebaseConfig'

const UserContext = createContext({} as UserContextValues)
const { Provider } = UserContext

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const getUserDocument = useCallback(async (user: FirebaseUser) => {
    setLoading(true)
    const userRef = doc(firestore, 'users', user.uid)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      setUserDetails(userSnap.data() as UserDetails)
    } else {
      console.log('User does not exist')
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    setLoading(true)
    const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
      setUser(firebaseUser)
      if (firebaseUser) {
        getUserDocument(firebaseUser)
      } else {
        setUserDetails(null)
      }
    })
    setLoading(false)
    return unsubscribe
  }, [getUserDocument])

  const updateUserDetails = useCallback(async (user: FirebaseUser, displayName: string) => {
    const userRef = doc(firestore, 'users', user.uid)

    await updateDoc(userRef, {
      displayName,
    })
    getUserDocument(user)
  }, [getUserDocument])

  const createUserDocument = useCallback(async (
    userCredential: UserCredential,
    displayName: string,
    email: string
  ) => {
    const userRef = userCredential.user.uid
    try {
      await setDoc(doc(firestore, 'users', userRef), {
        displayName,
        email
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  const uploadUserPhoto = useCallback(async (user: FirebaseUser, uri: string) => {
    const response = await fetch(uri)
    const blob = await response.blob()

    const storageRef = ref(storage, `users/${user.uid}`)
    const userRef = doc(firestore, 'users', user.uid)

    const uploadTask = uploadBytesResumable(storageRef, blob)

    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log(`Upload is ${progress}% done`)
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused')
            break
          case 'running':
            console.log('Upload is running')
            break
        }
      },
      error => {
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break
          case 'storage/canceled':
            // User canceled the upload
            break
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
          await updateDoc(userRef, {
            photoURL: downloadURL
          })
        })
      }
    )
  }, [])

  const register = useCallback(async (
    displayName: string,
    email: string,
    password: string,
  ) => {
    setLoading(true)
    try {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential: UserCredential) => {
          await createUserDocument(userCredential, displayName, email)
        })
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }, [createUserDocument])

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
    userDetails,
    updateUserDetails,
    uploadUserPhoto,
    register,
    login,
    logout
  }), [
    loading,
    user,
    userDetails,
    updateUserDetails,
    uploadUserPhoto,
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
