import React, { useState } from 'react'
import {
  KeyboardAvoidingView, StyleSheet, Text, TextInput, View
} from 'react-native'

import type { RegisterScreenProps } from 'navigation/navigators/loggedOut/types'

import { useUserContext } from 'context/user'
import Button from 'elements/Button'

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
          <TextInput
            placeholder='Username'
            value={username}
            onChangeText={text => setUsername(text)}
            style={styles.input}
          />
          <TextInput
            placeholder='Email'
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.input}
            keyboardType='email-address'
            autoCapitalize='none'
          />
          <TextInput
            placeholder='Password'
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.input}
            secureTextEntry
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
    backgroundColor: '#ECEFF1',
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
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
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
