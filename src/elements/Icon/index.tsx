import React from 'react'
import { SvgProps } from 'react-native-svg'

import type { IconProps, IconType } from 'elements/Icon/types'
import type { ColorType } from 'theme/types'

import Home from 'assets/icons/home-outline.svg'
import Profile from 'assets/icons/person-outline.svg'
import theme from 'theme'

export const iconList = {
  home: ({ ...props }: SvgProps) => <Home {...props} />,
  profile: ({ ...props }: SvgProps) => <Profile {...props} />,
}

const Icon = ({
  name, color, width, height
}: IconProps) => {
  const localColor = color
    && Object.keys(theme.colors).includes(color as string)
    && theme.colors[color as ColorType]

  const iconProps = {
    color: (localColor || color || theme.colors.primary) as string,
    width: width || 24,
    height: height || 24,
  }

  const IconToRender = iconList[name as IconType]
  return (
    <IconToRender {...iconProps} />
  )
}

export default Icon
