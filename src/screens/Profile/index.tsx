import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { useUserContext } from 'context/user'
import Button from 'elements/Button'

const Profile = () => {
  const { logout } = useUserContext()
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
      <Button
        title='Logout'
        variant='primary'
        onPress={logout}
      />
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

export default Profile
