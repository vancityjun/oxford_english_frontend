import React, { useContext, useState } from 'react'
import styled from 'styled-components/native'
import { ModalStyle, FlexWrap, TextSmall } from '../component/Styled'
import Button from '../component/Button'
import TextInputWithTitle from '../component/TextInputWithTitle'
import {isDesktop} from '../helper/DeviceHelper'
import {ModalControlContext} from '../context/ModalControlContext'

const Alert = ({alertMessage}) => {
  const [value, setValue] = useState('')
  const {action, inputTitle, setInputTitle, setAlertMessage, setAction} = useContext(ModalControlContext)
  
  const close = () => {
    setValue('')
    setInputTitle('')
    setAlertMessage('')
    setAction(null)
  }
  return (
    <Wrap isDesktop={isDesktop} >
      <TextSmall>{alertMessage}</TextSmall>
      {!!inputTitle &&
        <TextInputWithTitle
          title={inputTitle}
          onChangeText={(value) => setValue(value)}
          value={value}
          autoFocus
          secureTextEntry
        />
      }
      <FlexWrap>
        <Button
          title={action ? 'Cancel' : 'Ok'}
          onPress={() => close()}
          width={action ? '50%' : '100%'}
        />
        {!!action && <Button
          title='Ok'
          onPress={() => {
            action(value)
            close()
          }}
          width='50%'
          active
          disabled={!(!inputTitle || (value && inputTitle))}
        />}
      </FlexWrap>
    </Wrap>
  )
}

const Wrap = styled(ModalStyle)`
  display: flex
  flex-flow: column
  padding: 10px
  width: 270px
  border-radius: 4px
  top: 30%
  position: absolute
`

export default Alert
