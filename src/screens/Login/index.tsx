import React, { useState } from 'react'
import {
  KeyboardAvoidingView, Pressable, StyleSheet, Text, View
} from 'react-native'

import type { LoginScreenProps } from 'navigation/navigators/loggedOut/types'

import { useUserContext } from 'context/user'
import Button from 'elements/Button'
import Icon from 'elements/Icon'
import Input from 'elements/Input'
import PasswordInput from 'elements/PasswordInput'
import Separator from 'elements/Separator'
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
        </View>
        <Separator text='OR' color='grey300' />
        <View style={styles.registrationContainer}>
          <Text>
            Don&apos;t have an account?
          </Text>
          <Pressable onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}> Register here</Text>
          </Pressable>
        </View>
      </View>
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
    marginBottom: 48,
  },
  title: {
    fontSize: 18,
    marginBottom: 24,
  },
  inputContainer: {
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 50,
  },
  spacer: {
    height: 20
  },

  registrationContainer: {
    flexDirection: 'row',
  },
  link: {
    color: theme.colors.secondary
  }
})

export default Login
