import React, { useCallback, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'

import type { ProfileFormValues } from 'entities/Forms'

import ProfileImage from 'components/ProfileImage'
import { useUserContext } from 'context/user'
import Button from 'elements/Button'
import Icon from 'elements/Icon'
import Input from 'elements/Input'
import theme from 'theme'

const Profile = () => {
  const {
    user, userDetails, logout, updateUserDetails, uploadUserPhoto
  } = useUserContext()
  const [userImage, setUserImage] = useState<string>(userDetails?.photoURL || '')
  const [imageToUpload, setImageToUpload] = useState<string>('')
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const { control, handleSubmit, reset } = useForm<ProfileFormValues>({
    defaultValues: {
      username: userDetails?.displayName,
      email: userDetails?.email,
    }
  })

  const onSaveProfile: SubmitHandler<ProfileFormValues> = useCallback(
    async data => {
      const { username } = data
      if (user && imageToUpload !== '') {
        await uploadUserPhoto(user, imageToUpload)
      }
      if (user && username !== userDetails?.displayName) {
        await updateUserDetails(user, username)
      }
      setIsEditing(false)
    },
    [
      imageToUpload,
      updateUserDetails,
      uploadUserPhoto,
      user,
      userDetails?.displayName
    ]
  )

  const cancelEditing = useCallback(() => {
    reset()
    setImageToUpload('')
    setUserImage(userImage)
    setIsEditing(false)
  }, [reset, userImage])

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            imageToUpload={imageToUpload}
            setImageToUpload={setImageToUpload}
            userImage={userImage}
          />
          <View style={styles.detailsContainer}>
            <Input
              name='username'
              placeholder='Username'
              control={control}
              rules={{ required: 'Username is required' }}
              iconLeft={<Icon name='profile' />}
              editable={isEditing}
              style={{ color: !isEditing ? theme.colors.grey300 : theme.colors.black }}
            />
            <View style={styles.spacer} />
            <Input
              name='email'
              control={control}
              placeholder='Email'
              iconLeft={<Icon name='email' />}
              style={{ color: theme.colors.grey300 }}
              editable={false}
            />
          </View>
          <View style={styles.buttonContainer}>
            {!isEditing ? (
              <Button
                title='Logout'
                variant='tertiary'
                onPress={() => logout()}
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
                    onPress={handleSubmit(onSaveProfile)}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
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
