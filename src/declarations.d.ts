declare module 'react-native-mime-types' {
  export default class MimeTypes {
    static lookup(mimeType: string): string
  }
}
declare module '*.svg' {
  import React from 'react'
  import { SvgProps } from 'react-native-svg'

  const content: React.FC<SvgProps>
  export default content
}
