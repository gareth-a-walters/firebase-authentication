import { yupResolver } from '@hookform/resolvers/yup'
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
import * as yup from 'yup'

import type { RegisterFormValues } from 'entities/Forms'
import type { RegisterScreenProps } from 'navigation/navigators/loggedOut/types'

import PasswordInput from 'components/PasswordInput'
import { useUserContext } from 'context/user'
import Button from 'elements/Button'
import Icon from 'elements/Icon'
import Input from 'elements/Input'
import Separator from 'elements/Separator'
import theme from 'theme'
import { passwordValidations } from 'utils/formUtils'

const {
  lowercase,
  uppercase,
  number,
  symbol
} = passwordValidations

const Register = ({ navigation }: RegisterScreenProps) => {
  const { register } = useUserContext()

  const schema = yup.object({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(lowercase.regex, lowercase.message)
      .matches(uppercase.regex, uppercase.message)
      .matches(number.regex, number.message)
      .matches(symbol.regex, symbol.message)
  })

  const { control, handleSubmit, clearErrors } = useForm<RegisterFormValues>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(schema)
  })

  const onRegisterPressed: SubmitHandler<RegisterFormValues> = useCallback(data => {
    const { username, email, password } = data
    register(username, email, password)
  }, [register])

  const navigateToLogin = useCallback(() => {
    clearErrors()
    navigation.navigate('Login')
  }, [clearErrors, navigation])

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <Text style={styles.header}>Firebase Auth</Text>
          <Text style={styles.title}>Register for an account</Text>
          <View style={styles.inputContainer}>
            <Input
              name='username'
              placeholder='Username'
              control={control}
              iconLeft={<Icon name='profile' />}
            />
            <View style={styles.spacer} />
            <Input
              name='email'
              placeholder='Email'
              control={control}
              iconLeft={<Icon name='email' />}
              keyboardType='email-address'
              autoCompleteType='off'
              autoCorrect={false}
              autoCapitalize='none'
            />
            <View style={styles.spacer} />
            <PasswordInput
              name='password'
              placeholder='Password'
              control={control}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title='Create account'
              variant='primary'
              onPress={handleSubmit(onRegisterPressed)}
            />
          </View>
          <Separator text='OR' color='grey300' />
          <View style={styles.linkContainer}>
            <Text style={styles.preLink}>
              Already have an account?
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
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%'
  },
  header: {
    fontSize: 36,
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 40
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

export default Register
