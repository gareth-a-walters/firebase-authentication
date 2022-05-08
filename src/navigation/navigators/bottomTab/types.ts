import type { NavigatorScreenParams } from '@react-navigation/native'
import type { ComponentType, ReactNode } from 'react'

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList>
}

export type RootTabParamList = {
  HomeStack: undefined
  ProfileStack: undefined
}

export type TabsDataParams = {
  name: keyof RootTabParamList
  component: ComponentType<unknown>
  options: {
    tabBarIcon: (props: { focused: boolean }) => ReactNode,
    tabBarLabel: string
    tabBarShowLabel: boolean
    tabBarAccessibilityLabel: string
  }
}[]
