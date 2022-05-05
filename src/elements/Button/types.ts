import type { TextStyle, ViewStyle } from 'react-native'

export type ButtonProps = {
  title: string
  variant: 'primary' | 'secondary'
  disabled?: boolean
  loading?: boolean
}

export type Style = {
  button: ViewStyle
  text: TextStyle
}
