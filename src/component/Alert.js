import React, { useContext, useState } from 'react'
import styled from 'styled-components/native'
import { ModalStyle, FlexWrap, TextSmall } from '../component/Styled'
import Button from '../component/Button'
import TextInputWithTitle from '../component/TextInputWithTitle'
import {isDesktop} from '../helper/DeviceHelper'
import {ModalControlContext} from '../context/ModalControlContext'

const Alert = ({alertMessage}) => {
  const [value, setValue] = useState('')
  const {action, inputTitle, setInputTitle, setAlertMessage} = useContext(ModalControlContext)
  
  console.log(value )
  console.log(value )
  const close = () => {
    setValue('')
    setInputTitle('')
    setAlertMessage('')
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
        />
      }
      <FlexWrap>
        <Button 
          title='Cancel' 
          onPress={() => close()} 
          background={false}
          width='50%'
        />
        <Button
          title='Ok'
          onPress={() => {
            action(value)
            close()
          }}
          background={false}
          width='50%'
          disabled={!(!inputTitle || (value && inputTitle))}
        />
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
