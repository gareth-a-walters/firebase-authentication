import React, { useState } from 'react'
import {
  NativeSyntheticEvent, Pressable, StyleSheet, TextInput, TextInputFocusEventData, View
} from 'react-native'

import type { InputProps } from 'elements/Input/types'

import theme from 'theme'

const Input = ({
  onFocus,
  onBlur,
  iconLeft,
  iconRight,
  onPressIconRight,
  style,
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false)

  const onFocusHandler = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true)
    onFocus && onFocus(e)
  }
  const onBlurHandler = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false)
    onBlur && onBlur(e)
  }

  const styles = StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: isFocused ? theme.colors.grey400 : theme.colors.grey100,
    },
    input: {
      flex: 1,
      paddingHorizontal: 10,
      paddingVertical: 10,
      fontFamily: theme.fonts.regular,
    },
  })

  return (
    <View style={styles.inputContainer}>
      {iconLeft}
      <TextInput
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
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
  )
}

export default Input
