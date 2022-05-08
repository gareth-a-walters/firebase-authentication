import type { ColorValue } from 'react-native'
import type { ColorType } from 'theme/types'

import { iconList } from 'elements/Icon'

export type IconType = keyof typeof iconList

export type IconProps = {
  name: IconType
  color?: ColorType | ColorValue
  width?: number
  height?: number
}
