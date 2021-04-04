import React from 'react'
import { TextInput } from 'react-native'
import { Inner, TextSmall, globalStyles } from './Styled'

const TextInputWithTitle = ({title, onChangeText, value = '', maxLength, secureTextEntry = false}) => {
  return (
    <Inner>
      <TextSmall>{title}</TextSmall>
      <TextInput
        onChangeText={value => onChangeText(value)}
        value={value}
        maxLength={maxLength}
        style={globalStyles.content}
        secureTextEntry={secureTextEntry}
      />
    </Inner>
  )
}

export default TextInputWithTitle
