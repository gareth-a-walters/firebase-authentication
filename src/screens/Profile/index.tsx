import React, { useCallback, useState } from 'react'
import {
  StyleSheet, Text, TextInput, View
} from 'react-native'

import type { User as FirebaseUser } from 'firebase/auth'

import { useUserContext } from 'context/user'
import Button from 'elements/Button'

const Profile = () => {
  const { user, logout, updateUserProfile } = useUserContext()
  const [disabled, setDisabled] = useState<boolean>(true)
  const [username, setUsername] = useState<string>(user?.displayName || '')

  const updateProfile = useCallback((user: FirebaseUser, username: string) => {
    updateUserProfile(user, username)
    setDisabled(true)
  }, [updateUserProfile])

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile Screen</Text>
      <View style={styles.detailsContainer}>
        <Text>Username:</Text>
        <TextInput
          value={username}
          style={styles.input}
          editable={!disabled}
          onChangeText={text => setUsername(text)}
        />
        <View style={styles.spacer} />
        <Text>Email:</Text>
        <TextInput
          placeholder={user?.email || ''}
          style={styles.input}
          editable={false}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={disabled === false ? 'Save details' : 'Edit details'}
          variant='primary'
          onPress={
            disabled === false
              ? user
                ? () => updateProfile(user, username)
                : () => setDisabled(x => !x)
              : () => setDisabled(x => !x)
          }
        />
        <View style={styles.spacer} />
        <Button
          title='Logout'
          variant='tertiary'
          onPress={logout}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECEFF1',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 100,
    fontSize: 20,
  },
  detailsContainer: {

    width: '80%',
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    width: '60%',
    alignItems: 'center',
    marginBottom: 30
  },
  spacer: {
    height: 20
  }
})

export default Profile
