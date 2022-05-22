import { useFonts } from 'expo-font'
import React from 'react'
import Toast from 'react-native-toast-message'

import { UserProvider } from 'context/user'
import Navigation from 'navigation'

const App = () => {
  const [loaded] = useFonts({
    'inter-light': require('assets/fonts/Inter-Light.ttf'),
    'inter-regular': require('assets/fonts/Inter-Regular.ttf'),
    'inter-medium': require('assets/fonts/Inter-Medium.ttf'),
  })

  if (!loaded) {
    return null
  }

  return (
    <UserProvider>
      <Navigation />
      <Toast />
    </UserProvider>
  )
}

export default App
