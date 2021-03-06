import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { useUserContext } from 'context/user'
import theme from 'theme'

const Home = () => {
  const { userDetails } = useUserContext()

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeMessage}>
        Welcome
        {' '}
        {userDetails?.displayName}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeMessage: {
    textAlign: 'center',
    fontSize: 20,
  }
})

export default Home
