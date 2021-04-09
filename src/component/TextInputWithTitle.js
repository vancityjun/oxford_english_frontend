import React, {useState} from 'react'
import { Inner, TextSmall, globalStyles, TextInput, TextInputTitle } from './Styled'

const TextInputWithTitle = ({
  title, 
  onChangeText, 
  value = '', 
  maxLength, 
  secureTextEntry = false,
  multiline,
  autoFocus,
  width
}) => {
  const [focus, setFocus] = useState(false)

  return (
    <Inner width={width}>
      <TextInputTitle focus={focus}>{title}</TextInputTitle>
      <TextInput
        onChangeText={value => onChangeText(value)}
        value={value}
        maxLength={maxLength}
        style={globalStyles.content}
        secureTextEntry={secureTextEntry}
        focus={focus}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        multiline={multiline}
        autoFocus={autoFocus}
      />
    </Inner>
  )
}

export default TextInputWithTitle
