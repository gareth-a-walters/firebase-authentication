import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'

import type { IconType } from 'elements/icon/types'
import type { RootTabParamList, TabsDataParams } from 'navigation/navigators/bottomTab/types'

import Icon from 'elements/Icon'
import HomeStack from 'navigation/navigators/home'
import ProfileStack from 'navigation/navigators/profile'

const Tab = createBottomTabNavigator<RootTabParamList>()

const tabs: TabsDataParams = [
  {
    name: 'HomeStack',
    component: HomeStack,
    options: {
      tabBarIcon: ({ focused }) => getTabIcon(focused, 'home'),
      tabBarLabel: 'Home',
      tabBarShowLabel: false,
      tabBarAccessibilityLabel: 'Home',
    }
  },
  {
    name: 'ProfileStack',
    component: ProfileStack,
    options: {
      tabBarIcon: ({ focused }) => getTabIcon(focused, 'profile'),
      tabBarLabel: 'Profile',
      tabBarShowLabel: false,
      tabBarAccessibilityLabel: 'Profile',
    }
  },
]

const getTabIcon = (f: boolean, n: IconType) => (
  <Icon
    name={n}
    width={30}
    height={30}
    color={f ? 'primary' : 'grey300'}
  />
)

const screenOptions = {
  headerShown: false,
  tabBarshowLabel: false,
  tabBarStyle: {
    height: 54,
    paddingBottom: 5,
    paddingTop: 5,
  },
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
