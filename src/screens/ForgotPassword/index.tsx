import { sendPasswordResetEmail } from 'firebase/auth'
import React, { useCallback } from 'react'
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
import Toast from 'react-native-toast-message'

import type { ForgotPasswordFormValues } from 'entities/Forms'
import type { ForgotPasswordScreenProps } from 'navigation/navigators/loggedOut/types'

import { auth } from '../../firebaseConfig'

import Button from 'elements/Button'
import Icon from 'elements/Icon'
import Input from 'elements/Input'
import Separator from 'elements/Separator'
import theme from 'theme'

const ForgotPassword = ({ navigation }: ForgotPasswordScreenProps) => {
  const {
    control, handleSubmit, clearErrors
  } = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      email: '',
    }
  })

  const recoverPassword = useCallback(async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email)
      Toast.show({
        type: 'success',
        text1: 'Password recovery email sent',
        text2: 'Please check your inbox',
      })
      navigation.navigate('Login')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        Toast.show({
          type: 'error',
          text1: 'Could not find an account with that email',
          text2: 'Please check provided email address',
        })
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error sending password recovery email',
          text2: 'Please try again later',
        })
      }
    }
  }, [navigation])

  const onSubmitPressed: SubmitHandler<ForgotPasswordFormValues> = useCallback(data => {
    const { email } = data
    recoverPassword(email)
  }, [recoverPassword])

  const navigateToLogin = useCallback(() => {
    clearErrors()
    navigation.navigate('Login')
  }, [clearErrors, navigation])

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <Text style={styles.header}>Firebase Auth</Text>
          <Text style={styles.title}>Forgot your password?</Text>
          <View style={styles.inputContainer}>
            <Input
              name='email'
              placeholder='Email'
              control={control}
              rules={{ required: 'Email is required' }}
              iconLeft={<Icon name='email' />}
              keyboardType='email-address'
              autoCapitalize='none'
              autoCorrect={false}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title='Recover Password'
              variant='primary'
              onPress={handleSubmit(onSubmitPressed)}
            />
          </View>
          <Separator text='OR' color='grey300' />
          <View style={styles.linkContainer}>
            <Text style={styles.preLink}>
              Remember your password?
            </Text>
            <Pressable onPress={navigateToLogin}>
              <Text style={styles.link}> Login here</Text>
            </Pressable>
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
    alignItems: 'center'
  },
  innerContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%'
  },
  header: {
    fontSize: 36,
    marginBottom: 36,
    fontFamily: theme.fonts.regular
  },
  title: {
    fontSize: 18,
    marginBottom: 40,
    fontFamily: theme.fonts.regular
  },
  inputContainer: {
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 40
  },
  linkContainer: {
    flexDirection: 'row',
  },
  preLink: {
    fontFamily: theme.fonts.light,
  },
  link: {
    color: theme.colors.orange700,
    fontFamily: theme.fonts.medium,
  }
})

export default ForgotPassword
