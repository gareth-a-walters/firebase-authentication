import React, { useCallback, useState } from 'react'
import {
  KeyboardAvoidingView,
  Pressable,
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
        <View style={styles.headerIconWrapper}>
          <View style={styles.iconWrapper} />
          <View style={styles.headerWrapper}>
            <Text style={styles.header}>Profile</Text>
          </View>
          <View style={styles.iconWrapper}>
            {disabled && (
              <Pressable onPress={() => setDisabled(x => !x)}>
                <Icon name='edit' width={26} height={26} color='black' />
              </Pressable>
            )}
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <Input
            placeholder='Username'
            value={username}
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
          {disabled ? (
            <Button
              title='Logout'
              variant='tertiary'
              onPress={logout}
            />
          ) : (
            <View style={styles.buttonsContainer}>
              <View style={styles.button}>
                <Button
                  title='Cancel'
                  variant='secondary'
                  onPress={() => setDisabled(x => !x)}
                />
              </View>
              <View style={styles.spacer} />
              <View style={styles.button}>
                <Button
                  title='Save'
                  variant='primary'
                  onPress={user ? () => updateProfile(user, username) : () => null}
                />
              </View>
            </View>
          )}
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
  headerIconWrapper: {
    flexDirection: 'row',
    marginTop: 100,
  },
  iconWrapper: {
    width: 26,
  },
  headerWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  header: {
    fontSize: 20,
    fontFamily: theme.fonts.regular,
  },
  detailsContainer: {
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 30
  },
  buttonsContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button: {
    flex: 1,
  },
  spacer: {
    height: 20,
    width: 20
  }
})

export default Profile
