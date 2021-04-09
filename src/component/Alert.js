import React, {useContext} from 'react'
import styled from 'styled-components/native'
import { Modal, FlexWrap, TextSmall } from '../component/Styled'
import Button from '../component/Button'
import TextInputWithTitle from '../component/TextInputWithTitle'
import {ModalControlContext} from '../context/ModalControlContext'

const Alert = ({alertMessage}) => {
  const {setAlertMessage, action, input, onChange} = useContext(ModalControlContext)

  return (
    <Wrap>
      <TextSmall>{alertMessage}</TextSmall>
      {input &&
        <TextInputWithTitle
          title={input.title}
          onChangeText={(value) => input.onChange(value)}
          value={input.value}
          autoFocus
        />
      }
      <FlexWrap>
        <Button 
          title='Cancel' 
          onPress={() => setAlertMessage('')} 
          background={false}
          width='50%'
        />
        <Button
          title='Ok'
          onPress={() => {
            action()
            setAlertMessage('')
          }}
          background={false}
          width='50%'
        />
      </FlexWrap>
    </Wrap>
  )
}

const Wrap = styled(Modal)`
  display: flex
  flex-flow: column
  padding: 10px
  width: 270px
  border-radius: 4px
  position: fixed
  top: 30%
`

export default Alert
