import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'

import type { RootTabParamList, TabsDataParams } from 'navigation/navigators/bottomTab/types'

import HomeStack from 'navigation/navigators/home'
import ProfileStack from 'navigation/navigators/profile'

const Tab = createBottomTabNavigator<RootTabParamList>()

const tabs: TabsDataParams = [
  {
    name: 'HomeStack',
    component: HomeStack,
    options: {
      tabBarLabel: 'Home',
    }
  },
  {
    name: 'ProfileStack',
    component: ProfileStack,
    options: {
      tabBarLabel: 'Profile',
    }
  },
]

const screenOptions = {
  headerShown: false
}

const BottomTabNavigator = () => (
  <Tab.Navigator
    initialRouteName='HomeStack'
    screenOptions={screenOptions}
  >
    {tabs.map(tab => (
      <Tab.Screen
        key={tab.name}
        name={tab.name}
        component={tab.component}
        options={tab.options}
      />
    ))}
  </Tab.Navigator>
)

export default BottomTabNavigator
