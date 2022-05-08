import React from 'react'
import {
  Animated, Pressable, StyleSheet, Text
} from 'react-native'

import type { ButtonProps, Style } from 'elements/Button/types'

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
    }
  }

  if (variant === 'primary') {
    styles.button.backgroundColor = '#039BE5'
    styles.button.borderColor = '#039BE5'
    styles.button.borderWidth = 2
    styles.text.color = '#fff'
  } else if (variant === 'secondary') {
    styles.button.backgroundColor = '#fff'
    styles.button.borderColor = '#FFA000'
    styles.button.borderWidth = 2
    styles.text.color = '#F57C00'
  } else if (variant === 'tertiary') {
    styles.button.backgroundColor = '#FF8A65'
    styles.button.borderColor = '#FF8A65'
    styles.button.borderWidth = 2
    styles.text.color = '#fff'
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
