import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { useUserContext } from 'context/user'

const Home = () => {
  const { user } = useUserContext()

  console.log(user)
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeMessage}>
        Welcome
        {' '}
        {user?.displayName}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECEFF1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeMessage: {
    textAlign: 'center',
    fontSize: 20,
  }
})

export default Home
