import React, { useCallback, useState } from 'react'
import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet, Text, View
} from 'react-native'

import type { User as FirebaseUser } from 'firebase/auth'

import ProfileImage from 'components/ProfileImage'
import { useUserContext } from 'context/user'
import Button from 'elements/Button'
import Icon from 'elements/Icon'
import Input from 'elements/Input'
import theme from 'theme'

const Profile = () => {
  const { user, logout, updateUserProfile } = useUserContext()
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [username, setUsername] = useState<string>(user?.displayName || '')
  const [userImage, setUserImage] = useState<string>(user?.photoURL || '')

  const updateProfile = useCallback((
    user: FirebaseUser,
    username: string,
    photo: string
  ) => {
    updateUserProfile(user, username, photo)
    setIsEditing(false)
  }, [updateUserProfile])

  const cancelEditing = useCallback(() => {
    setUsername(user?.displayName || '')
    setUserImage(user?.photoURL || '')
    setIsEditing(false)
  }, [user?.displayName, user?.photoURL])

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.headerIconWrapper}>
          <View style={styles.iconWrapper} />
          <View style={styles.headerWrapper}>
            <Text style={styles.header}>Profile</Text>
          </View>
          <View style={styles.iconWrapper}>
            {!isEditing && (
              <Pressable onPress={() => setIsEditing(x => !x)}>
                <Icon name='edit' width={26} height={26} color='black' />
              </Pressable>
            )}
          </View>
        </View>
        <ProfileImage
          disabled={!isEditing}
          userImage={userImage}
          setUserImage={setUserImage}
        />
        <View style={styles.detailsContainer}>
          <Input
            placeholder='Username'
            value={username}
            onChangeText={text => setUsername(text)}
            iconLeft={<Icon name='profile' />}
            editable={isEditing}
            style={{ color: !isEditing ? theme.colors.grey300 : theme.colors.black }}
          />
          <View style={styles.spacer} />
          <Input
            placeholder={user?.email || ''}
            iconLeft={<Icon name='email' />}
            editable={false}
          />
        </View>
        <View style={styles.buttonContainer}>
          {!isEditing ? (
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
                  onPress={cancelEditing}
                />
              </View>
              <View style={styles.spacer} />
              <View style={styles.button}>
                <Button
                  title='Save'
                  variant='primary'
                  onPress={user ? () => updateProfile(user, username, userImage) : () => null}
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
    width: '80%',
  },
  headerIconWrapper: {
    flexDirection: 'row',
    marginTop: 50,
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
