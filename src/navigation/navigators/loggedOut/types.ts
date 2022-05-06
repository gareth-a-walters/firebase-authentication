import type { NativeStackScreenProps } from '@react-navigation/native-stack'

export type LoggedOutStackParamList = {
  Login: undefined
  Register: undefined
}

export type LoginScreenProps = NativeStackScreenProps<LoggedOutStackParamList, 'Login'>
export type RegisterScreenProps = NativeStackScreenProps<LoggedOutStackParamList, 'Register'>

export type AllLoggedOutScreensProps =
LoginScreenProps &
RegisterScreenProps
