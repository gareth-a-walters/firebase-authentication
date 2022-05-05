import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyChvILBLSeDj29MiD9JXZv0wmeagOkrooI',
  authDomain: 'fir-authentication-8360a.firebaseapp.com',
  projectId: 'fir-authentication-8360a',
  storageBucket: 'fir-authentication-8360a.appspot.com',
  messagingSenderId: '981881982113',
  appId: '1:981881982113:web:6af2d87c13222f9cdbb4e0'
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export default app
