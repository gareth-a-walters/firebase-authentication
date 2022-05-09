import React from 'react'
import {
  Animated, Pressable, StyleSheet, Text
} from 'react-native'

import type { ButtonProps, Style } from 'elements/Button/types'

import theme from 'theme'

const Button = ({
  title,
  variant = 'primary',
  ...props
}: ButtonProps) => {
  const animated = new Animated.Value(1)
  const fadeIn = () => {
    Animated.timing(animated, {
      toValue: 0.1,
      duration: 100,
      useNativeDriver: true,
    }).start()
  }
  const fadeOut = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }

  const styles: Style = {
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      padding: 10,
      borderRadius: 10,
    },
    text: {
      fontSize: 16,
      fontFamily: theme.fonts.medium
    }
  }

  if (variant === 'primary') {
    styles.button.backgroundColor = theme.colors.lightBlue600
    styles.button.borderColor = theme.colors.lightBlue600
    styles.button.borderWidth = 2
    styles.text.color = theme.colors.white
  } else if (variant === 'secondary') {
    styles.button.backgroundColor = theme.colors.white
    styles.button.borderColor = theme.colors.amber700
    styles.button.borderWidth = 2
    styles.text.color = theme.colors.orange700
  } else if (variant === 'tertiary') {
    styles.button.backgroundColor = theme.colors.deepOrange300
    styles.button.borderColor = theme.colors.deepOrange300
    styles.button.borderWidth = 2
    styles.text.color = theme.colors.white
  }

  const parsedStyles = StyleSheet.create<Style>(styles)

  return (
    <Pressable
      onPressIn={fadeIn}
      onPressOut={fadeOut}
      style={parsedStyles.button}
      {...props}
    >
      <Text style={parsedStyles.text}>{title}</Text>
    </Pressable>
  )
}

export default Button
