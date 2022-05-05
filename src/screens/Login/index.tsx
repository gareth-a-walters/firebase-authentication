import React, { useState } from 'react'
import {
  KeyboardAvoidingView, StyleSheet, Text, TextInput, View
} from 'react-native'

import { useUserContext } from 'context/user'
import Button from 'elements/Button'

const Login = () => {
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
            title='Login'
            variant='primary'
            onPress={() => login(email, password)}
          />
          <View style={styles.spacer} />
          <Button
            title='Register'
            variant='secondary'
            onPress={() => console.log('Navigate to Registration screen')}
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

export default Login
