import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import type { RootStackParamList } from 'navigation/navigators/rootNavigator/types'

import BottomTabNavigator from 'navigation/navigators/bottomTab'

const RootStack = createNativeStackNavigator<RootStackParamList>()

const RootNavigator = () => (
  <RootStack.Navigator>
    <RootStack.Screen
      name='Root'
      component={BottomTabNavigator}
      options={{ headerShown: false }}
    />
  </RootStack.Navigator>
)

export default RootNavigator
