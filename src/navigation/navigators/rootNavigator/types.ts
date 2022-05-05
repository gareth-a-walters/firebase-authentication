import type { NativeStackScreenProps } from '@react-navigation/native-stack'

export type RootStackParamList = {
  Root: undefined
}

export type RootScreenProps = NativeStackScreenProps<RootStackParamList, 'Root'>

export type AllRootScreensProps =
  RootScreenProps
