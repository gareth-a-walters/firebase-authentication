import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import type { SeparatorProps } from 'elements/Separator/types'

import theme from 'theme'

const Separator = ({ text, color, line }: SeparatorProps) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 20,
    },
    separator: {
      flex: 1,
      borderBottomWidth: 1,
      borderColor: theme.colors[color],
    },
    textWrapper: {
      paddingLeft: 15,
      paddingRight: 15,
    },
    text: {
      fontFamily: theme.fonts.medium,
    }
  })
  return (
    <View style={styles.container}>
      <View style={styles.separator} />
      {Boolean(text) && !line && (
        <View style={styles.textWrapper}>
          <Text style={styles.text}>{text}</Text>
        </View>
      )}
      <View style={styles.separator} />
    </View>
  )
}

export default Separator
