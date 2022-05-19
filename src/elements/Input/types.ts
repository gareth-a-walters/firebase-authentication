import type { ReactNode } from 'react'
import type { UseControllerProps, Control, FieldValue } from 'react-hook-form'
import type { TextInputProps } from 'react-native'

export interface CustomInputProps extends UseControllerProps {
  control: Control<FieldValue<any>>
  name: string
  placeholder: string
  iconLeft?: ReactNode
  iconRight?: ReactNode
  onPressIconRight?: () => void
  additionalStyle?: object
}

export type InputProps = TextInputProps & CustomInputProps
