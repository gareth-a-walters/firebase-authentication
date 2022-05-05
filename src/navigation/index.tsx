import { NavigationContainer } from '@react-navigation/native'
import React from 'react'

import { useUserContext } from 'context/user'
import RootNavigator from 'navigation/navigators/rootNavigator'
import Login from 'screens/Login'

const Navigation = () => {
  const { isLoggedIn } = useUserContext()

  return (
    <NavigationContainer>
      {isLoggedIn ? <RootNavigator /> : <Login />}
    </NavigationContainer>
  )
}

export default Navigation
