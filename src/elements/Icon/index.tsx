import React from 'react'
import { SvgProps } from 'react-native-svg'

import type { IconProps, IconType } from 'elements/Icon/types'
import type { ColorType } from 'theme/types'

import Edit from 'assets/icons/create-outline.svg'
import EyeClosed from 'assets/icons/eye-off-outline.svg'
import EyeOpen from 'assets/icons/eye-open-outline.svg'
import Home from 'assets/icons/home-outline.svg'
import Lock from 'assets/icons/lock-closed-outline.svg'
import Email from 'assets/icons/mail-outline.svg'
import Profile from 'assets/icons/person-outline.svg'
import theme from 'theme'

export const iconList = {
  edit: ({ ...props }: SvgProps) => <Edit {...props} />,
  email: ({ ...props }: SvgProps) => <Email {...props} />,
  eyeClosed: ({ ...props }: SvgProps) => <EyeClosed {...props} />,
  eyeOpen: ({ ...props }: SvgProps) => <EyeOpen {...props} />,
  home: ({ ...props }: SvgProps) => <Home {...props} />,
  lock: ({ ...props }: SvgProps) => <Lock {...props} />,
  profile: ({ ...props }: SvgProps) => <Profile {...props} />,
}

const Icon = ({
  name, color, width, height
}: IconProps) => {
  const localColor = color
    && Object.keys(theme.colors).includes(color as string)
    && theme.colors[color as ColorType]

  const iconProps = {
    color: (localColor || color || theme.colors.grey300) as string,
    width: width || 20,
    height: height || 20,
  }

  const IconToRender = iconList[name as IconType]
  return (
    <IconToRender {...iconProps} />
  )
}

export default Icon
