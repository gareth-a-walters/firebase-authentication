import React, { useState } from 'react'
import { Keyboard } from 'react-native'

import type { InputProps } from 'elements/Input/types'

import Icon from 'elements/Icon'
import Input from 'elements/Input'

const PasswordInput = ({ ...props }: InputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const toggleShowPassword = () => {
    setShowPassword(x => !x)
  }

  return (
    <Input
      secureTextEntry={!showPassword}
      textContentType='newPassword'
      onPressIconRight={toggleShowPassword}
      iconLeft={<Icon name='lock' />}
      iconRight={<Icon name={showPassword ? 'eyeClosed' : 'eyeOpen'} />}
      blurOnSubmit={false}
      onSubmitEditing={() => Keyboard.dismiss()}
      {...props}
    />
  )
}

export default PasswordInput
