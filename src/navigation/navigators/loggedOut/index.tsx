import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import type { AllLoggedOutScreensProps, LoggedOutStackParamList } from 'navigation/navigators/loggedOut/types'
import type { StackScreensDataParams } from 'navigation/types'

import Login from 'screens/Login'
import Register from 'screens/Register'

const loggedOutScreens: StackScreensDataParams<
LoggedOutStackParamList,
AllLoggedOutScreensProps
> = [
  { name: 'Login', component: Login },
  { name: 'Register', component: Register },
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
