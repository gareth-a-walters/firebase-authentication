import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { useUserContext } from 'context/user'

const Home = () => {
  const { user } = useUserContext()

  console.log(user)
  return (
    <View style={styles.container}>
      <Text>
        Hello
        {' '}
        {user?.displayName}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Home
