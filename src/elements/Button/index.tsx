import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

import type { ButtonProps, Style } from 'elements/Button/types'

const Button = ({
  title,
  variant = 'primary',
  ...props
}: ButtonProps) => {
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
  }

  const parsedStyles = StyleSheet.create<Style>(styles)

  return (
    <Pressable style={parsedStyles.button} {...props}>
      <Text style={parsedStyles.text}>{title}</Text>
    </Pressable>
  )
}

export default Button
