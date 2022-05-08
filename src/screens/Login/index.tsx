import React, { useState } from 'react'
import {
  KeyboardAvoidingView, StyleSheet, Text, View
} from 'react-native'

import type { LoginScreenProps } from 'navigation/navigators/loggedOut/types'

import { useUserContext } from 'context/user'
import Button from 'elements/Button'
import Icon from 'elements/Icon'
import Input from 'elements/Input'
import PasswordInput from 'elements/PasswordInput'
import theme from 'theme'

const Login = ({ navigation }: LoginScreenProps) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const { login } = useUserContext()

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior='padding'
    >
      <View style={styles.innerContainer}>
        <Text style={styles.header}>Firebase Auth</Text>
        <Text style={styles.title}>Login to your account</Text>
        <View style={styles.inputContainer}>
          <Input
            value={email}
            placeholder='Email'
            onChangeText={text => setEmail(text)}
            iconLeft={<Icon name='email' />}
            keyboardType='email-address'
            autoCapitalize='none'
          />
          <View style={styles.spacer} />
          <PasswordInput
            value={password}
            placeholder='Password'
            onChangeText={text => setPassword(text)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title='Login'
            variant='primary'
            onPress={() => login(email, password)}
          />
          <View style={styles.spacer} />
          <Button
            title='Register'
            variant='secondary'
            onPress={() => navigation.navigate('Register')}
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
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  title: {
    fontSize: 18,
    marginBottom: 24,
  },
  inputContainer: {
    width: '80%',
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    width: '60%',
    alignItems: 'center',
    marginTop: 50
  },
  spacer: {
    height: 20
  }
})

export default Login
