import React from 'react'
import { Controller } from 'react-hook-form'
import {
  NativeSyntheticEvent, Pressable, StyleSheet, Text, TextInput, TextInputFocusEventData, View
} from 'react-native'

import type { InputProps } from 'elements/Input/types'

import theme from 'theme'

const Input = ({
  control,
  name,
  placeholder,
  rules = {},
  // onFocus,
  // onBlur,
  iconLeft,
  iconRight,
  onPressIconRight,
  style,
  ...props
}: InputProps) => {
  // const [isFocused, setIsFocused] = useState<boolean>(false)

  // const onFocusHandler = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
  //   setIsFocused(true)
  //   onFocus && onFocus(e)
  // }
  // const onBlurHandler = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
  //   setIsFocused(false)
  //   onBlur && onBlur(e)
  // }

  const styles = StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      // borderBottomColor: isFocused ? theme.colors.grey400 : theme.colors.grey100,
    },
    input: {
      flex: 1,
      paddingHorizontal: 10,
      paddingVertical: 10,
      fontFamily: theme.fonts.regular,
    },
    errorContainer: {
      height: 20,
    },
    error: {
      marginTop: 5,
      textAlign: 'right',
      color: theme.colors.error,
    }
  })

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
          <View
            style={[
              styles.inputContainer,
              { borderColor: error ? theme.colors.error : theme.colors.grey100 }
            ]}
          >
            {iconLeft}
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
            // onFocus={onFocusHandler}
            // onBlur={onBlurHandler}
              style={[styles.input, style]}
              placeholderTextColor={theme.colors.grey300}
              {...props}
            />
            {iconRight && (
            <Pressable onPress={onPressIconRight}>
              {iconRight}
            </Pressable>
            )}
          </View>
          <View style={styles.errorContainer}>
            {error && <Text style={styles.error}>{error.message || 'Error'}</Text>}
          </View>
        </>
      )}
    />
  )
}

export default Input
