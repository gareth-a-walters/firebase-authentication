import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import type { LoggedOutScreenProps, LoggedOutStackParamList } from 'navigation/navigators/loggedOut/types'
import type { StackScreensDataParams } from 'navigation/types'

import Login from 'screens/Login'

const loggedOutScreens: StackScreensDataParams<
LoggedOutStackParamList,
LoggedOutScreenProps
> = [
  { name: 'Login', component: Login }
]

const loggedOutStackOptions = {
  initialRouteName: 'Login',
  screenOptions: {
    headerShown: false
  }
}

const LoggedOutStackNavigator = createNativeStackNavigator()

const LoggedOutStack = () => (
  <LoggedOutStackNavigator.Navigator {...loggedOutStackOptions}>
    {loggedOutScreens.map(screen => (
      <LoggedOutStackNavigator.Screen key={screen.name} {...screen} />
    ))}
  </LoggedOutStackNavigator.Navigator>
)

export default LoggedOutStack
