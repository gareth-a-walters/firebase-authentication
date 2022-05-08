import React, { useState } from 'react'
import {
  KeyboardAvoidingView, StyleSheet, Text, View
} from 'react-native'

import type { RegisterScreenProps } from 'navigation/navigators/loggedOut/types'

import { useUserContext } from 'context/user'
import Button from 'elements/Button'
import Icon from 'elements/Icon'
import Input from 'elements/Input'
import PasswordInput from 'elements/PasswordInput'
import theme from 'theme'

const Register = ({ navigation }: RegisterScreenProps) => {
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const { register } = useUserContext()

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior='padding'
    >
      <View style={styles.innerContainer}>
        <Text style={styles.header}>Firebase Auth</Text>
        <Text style={styles.title}>Register for an account</Text>
        <View style={styles.inputContainer}>
          <Input
            placeholder='Username'
            value={username}
            onChangeText={text => setUsername(text)}
            iconLeft={<Icon name='profile' />}
          />
          <View style={styles.spacer} />
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
            title='Create account'
            variant='primary'
            onPress={() => register(username, email, password)}
          />
          <View style={styles.spacer} />
          <Button
            title='Back to login'
            variant='secondary'
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColor
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

export default Register
