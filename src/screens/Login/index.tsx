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

import type { LoginFormValues } from 'entities/Forms'
import type { LoginScreenProps } from 'navigation/navigators/loggedOut/types'

import { useUserContext } from 'context/user'
import Button from 'elements/Button'
import Icon from 'elements/Icon'
import Input from 'elements/Input'
import PasswordInput from 'elements/PasswordInput'
import Separator from 'elements/Separator'
import theme from 'theme'

const Login = ({ navigation }: LoginScreenProps) => {
  const { login } = useUserContext()

  const { control, handleSubmit, clearErrors } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const onSignInPressed: SubmitHandler<LoginFormValues> = useCallback(data => {
    const { email, password } = data
    login(email, password)
  }, [login])

  const navigateToRegister = useCallback(() => {
    clearErrors()
    navigation.navigate('Register')
  }, [clearErrors, navigation])

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <Text style={styles.header}>Firebase Auth</Text>
          <Text style={styles.title}>Login to your account</Text>
          <View style={styles.inputContainer}>
            <Input
              name='email'
              placeholder='Email'
              control={control}
              rules={{ required: 'Username is required' }}
              iconLeft={<Icon name='email' />}
              keyboardType='email-address'
              autoCapitalize='none'
            />
            <View style={styles.spacer} />
            <PasswordInput
              name='password'
              placeholder='Password'
              control={control}
              rules={{ required: 'Password is required' }}
            />
          </View>
          <View style={styles.testContainer}>
            <View style={styles.buttonContainer}>
              <Button
                title='Login'
                variant='primary'
                onPress={handleSubmit(onSignInPressed)}
              />
            </View>
            <Separator text='OR' color='grey300' />
            <View style={styles.linkContainer}>
              <Text style={styles.preLink}>
                Don&apos;t have an account?
              </Text>
              <Pressable onPress={navigateToRegister}>
                <Text style={styles.link}> Register here</Text>
              </Pressable>
            </View>
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
  testContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 40,
  },
  spacer: {
    height: 10
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

export default Login
