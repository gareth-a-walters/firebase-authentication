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
import { Alert } from 'react-native'
import Toast from 'react-native-toast-message'

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
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
        console.log(error)
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error)
    }
    setLoading(false)
  }, [createUserDocument])

  const login = useCallback(async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-email') {
        Toast.show({
          type: 'error',
          text1: 'Incorrect credentials',
          text2: 'Invalid email or password',
        })
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.message,
        })
      }
    }
    return null
  }, [])

  const logout = useCallback(() => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: async () => {
            try {
              await signOut(auth)
            } catch (error) {
              console.log(error)
            }
          }
        }],
    )
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
