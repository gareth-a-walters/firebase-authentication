import { NavigationContainer } from '@react-navigation/native'
import React from 'react'

import { useUserContext } from 'context/user'
import LoggedOutStack from 'navigation/navigators/loggedOut'
import RootNavigator from 'navigation/navigators/rootNavigator'

const Navigation = () => {
  const { isLoggedIn } = useUserContext()

  return (
    <NavigationContainer>
      {isLoggedIn ? <RootNavigator /> : <LoggedOutStack />}
    </NavigationContainer>
  )
}

export default Navigation
