import type { TextStyle, ViewStyle } from 'react-native'

export type ButtonProps = {
  title: string
  variant: 'primary' | 'secondary' | 'tertiary'
  disabled?: boolean
  loading?: boolean
  onPress: () => void
}

export type Style = {
  button: ViewStyle
  text: TextStyle
}
