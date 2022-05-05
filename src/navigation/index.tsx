import { NavigationContainer } from '@react-navigation/native'
import React from 'react'

import RootNavigator from 'navigation/navigators/rootNavigator'

const Navigation = () => (
  <NavigationContainer>
    <RootNavigator />
  </NavigationContainer>
)

export default Navigation
