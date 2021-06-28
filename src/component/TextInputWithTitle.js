import React, {useState} from 'react'
import { Inner, globalStyles, TextInput, TextInputTitle, TextSmall } from './Styled'
import { isDesktop } from '../helper/DeviceHelper'

const TextInputWithTitle = ({
  title, 
  onChangeText, 
  value = '', 
  maxLength, 
  secureTextEntry = false,
  multiline,
  autoFocus,
  width,
  errorMessage,
  numberOfLines,
  autoCompleteType = null,
  editable = true,
  keyboardType = 'default',
  textContentType = 'none'
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
        isDesktop={isDesktop}
        numberOfLines={numberOfLines}
        autoCompleteType={autoCompleteType}
        editable={editable}
        keyboardType={keyboardType}
        textContentType={textContentType}
        blurOnSubmit
      />
      {!!errorMessage && <TextSmall warn>{errorMessage}</TextSmall>}
    </Inner>
  )
}

export default TextInputWithTitle
