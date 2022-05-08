import React, { useCallback, useState } from 'react'
import {
  KeyboardAvoidingView,
  StyleSheet, Text, View
} from 'react-native'

import type { User as FirebaseUser } from 'firebase/auth'

import { useUserContext } from 'context/user'
import Button from 'elements/Button'
import Icon from 'elements/Icon'
import Input from 'elements/Input'
import theme from 'theme'

const Profile = () => {
  const { user, logout, updateUserProfile } = useUserContext()
  const [disabled, setDisabled] = useState<boolean>(true)
  const [username, setUsername] = useState<string>(user?.displayName || '')

  const updateProfile = useCallback((user: FirebaseUser, username: string) => {
    updateUserProfile(user, username)
    setDisabled(true)
  }, [updateUserProfile])

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.header}>Profile</Text>
        <View style={styles.detailsContainer}>
          <Input
            placeholder='Username'
            value={username}
            selectionColor={theme.colors.primary}
            onChangeText={text => setUsername(text)}
            iconLeft={<Icon name='profile' />}
            editable={!disabled}
            style={{ color: disabled ? theme.colors.grey300 : theme.colors.black }}
          />
          <View style={styles.spacer} />
          <Input
            placeholder={user?.email || ''}
            iconLeft={<Icon name='email' />}
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
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColor,
    alignItems: 'center',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%'
  },
  header: {
    marginTop: 100,
    fontSize: 20,
  },
  detailsContainer: {
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30
  },
  spacer: {
    height: 20
  }
})

export default Profile
