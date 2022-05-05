import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import type { HomeScreensProps, HomeStackParamList } from 'navigation/navigators/home/types'
import type { StackScreensDataParams } from 'navigation/types'

import Home from 'screens/Home'

const homeScreens: StackScreensDataParams<
HomeStackParamList,
HomeScreensProps
> = [
  { name: 'Home', component: Home }
]

const homeStackOptions = {
  initialRouteName: 'Home',
  screenOptions: {
    headerShown: false
  }
}

const HomeStackNavigator = createNativeStackNavigator()

const HomeStack = () => (
  <HomeStackNavigator.Navigator {...homeStackOptions}>
    {homeScreens.map(screen => (
      <HomeStackNavigator.Screen key={screen.name} {...screen} />
    ))}
  </HomeStackNavigator.Navigator>
)

export default HomeStack
