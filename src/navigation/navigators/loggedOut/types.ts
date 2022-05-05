import type { NativeStackScreenProps } from '@react-navigation/native-stack'

export type LoggedOutStackParamList = {
  Login: undefined
}

export type LoggedOutScreenProps = NativeStackScreenProps<LoggedOutStackParamList, 'Login'>
