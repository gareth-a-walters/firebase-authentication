import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import type { ProfileScreensProps, ProfileStackParamList } from 'navigation/navigators/profile/types'
import type { StackScreensDataParams } from 'navigation/types'

import Profile from 'screens/Profile'

const profileScreens: StackScreensDataParams<
ProfileStackParamList,
ProfileScreensProps
> = [
  { name: 'Profile', component: Profile }
]

const profileStackOptions = {
  initialRouteName: 'Profile',
  screenOptions: {
    headerShown: false
  }
}

const ProfileStackNavigator = createNativeStackNavigator()

const ProfileStack = () => (
  <ProfileStackNavigator.Navigator {...profileStackOptions}>
    {profileScreens.map(screen => (
      <ProfileStackNavigator.Screen key={screen.name} {...screen} />
    ))}
  </ProfileStackNavigator.Navigator>
)

export default ProfileStack
