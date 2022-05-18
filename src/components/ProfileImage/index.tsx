import * as ImagePicker from 'expo-image-picker'
import React, { useCallback, useState } from 'react'
import {
  // eslint-disable-next-line react-native/split-platform-components
  ActionSheetIOS,
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  View
} from 'react-native'

import type { ProfileImageProps } from 'components/ProfileImage/types'

import Icon from 'elements/Icon'
import theme from 'theme'

const ProfileImage = ({
  disabled,
  userImage,
  imageToUpload,
  setImageToUpload
}: ProfileImageProps) => {
  const [loading, setLoading] = useState<boolean>(true)

  const selectPhoto = useCallback(async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 0.001,
      })
      if (result.cancelled) return
      setImageToUpload(result.uri)
    } catch {
      console.error('Failed to fetch photo')
    }
  }, [setImageToUpload])

  const takePhoto = useCallback(async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync()
      if (status !== 'granted') {
        console.error('Permission to access camera was denied')
        return
      }
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 0.001,
      })
      if (result.cancelled) return
      setImageToUpload(result.uri)
    } catch {
      console.error('Failed to fetch taken photo')
    }
  }, [setImageToUpload])

  const addPhotoOptions = useCallback(() => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Add from Photos', 'Take a Photo'],
        cancelButtonIndex: 0
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          selectPhoto()
        } else if (buttonIndex === 2) {
          takePhoto()
        }
      }
    )
  }, [selectPhoto, takePhoto])

  return (
    <View style={styles.imageIconWrapper}>
      <View style={styles.iconWrapper} />
      <View style={styles.imageContainer}>
        {imageToUpload !== ''
          ? (
            <Image
              source={{ uri: imageToUpload }}
              style={styles.image}
              onLoadStart={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
            />
          )
          : userImage
            ? (
              <Image
                source={{ uri: userImage }}
                style={styles.image}
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
              />
            )
            : <Icon name='profile' width={40} height={40} />}
        {loading && (
          <View style={styles.spinnerContainer}>
            <ActivityIndicator color={theme.colors.black} />
          </View>
        )}
      </View>
      <View style={styles.iconWrapper}>
        {!disabled && (
        <Pressable onPress={addPhotoOptions}>
          <Icon name='upload' width={30} height={30} />
        </Pressable>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  imageIconWrapper: {
    flexDirection: 'row',
  },
  iconWrapper: {
    width: 30,
    justifyContent: 'flex-end',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.orange700,
    borderWidth: 2,
    borderRadius: 100,
    width: 200,
    height: 200,
  },
  image: {
    borderRadius: 100,
    width: '100%',
    height: '100%',
  },
  spinnerContainer: {
    position: 'absolute',
  }
})

export default ProfileImage
