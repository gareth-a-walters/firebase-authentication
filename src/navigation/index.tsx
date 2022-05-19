import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import {
  ActivityIndicator, View, StyleSheet, TouchableWithoutFeedback, Keyboard
} from 'react-native'

import { useUserContext } from 'context/user'
import LoggedOutStack from 'navigation/navigators/loggedOut'
import RootNavigator from 'navigation/navigators/rootNavigator'

const Navigation = () => {
  const { loading, isLoggedIn } = useUserContext()

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <NavigationContainer>
        {isLoggedIn
          ? <RootNavigator />
          : <LoggedOutStack />}
      </NavigationContainer>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Navigation
