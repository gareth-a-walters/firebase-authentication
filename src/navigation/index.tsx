import { NavigationContainer } from '@react-navigation/native'
import React from 'react'

// import RootNavigator from 'navigation/navigators/rootNavigator'
import Login from 'screens/Login'

const Navigation = () => (
  <NavigationContainer>
    <Login />
    {/* <RootNavigator /> */}
  </NavigationContainer>
)

export default Navigation
