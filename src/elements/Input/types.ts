import type { ReactNode } from 'react'
import type { TextInputProps } from 'react-native'

export type CustomInputProps = {
  iconLeft?: ReactNode
  iconRight?: ReactNode
  onPressIconRight?: () => void
  additionalStyle?: object
}

export type InputProps = TextInputProps & CustomInputProps
